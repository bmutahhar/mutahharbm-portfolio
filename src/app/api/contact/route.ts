import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  email: string;
  message: string;
  name: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const trimString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const validatePayload = (payload: ContactPayload) => {
  if (!payload.name || !payload.email || !payload.message) {
    return "Please fill in all required fields.";
  }

  if (!emailRegex.test(payload.email)) {
    return "Please provide a valid email address.";
  }

  if (payload.name.length > 100 || payload.email.length > 200 || payload.message.length > 5000) {
    return "Your message is too long. Please shorten it and try again.";
  }

  return null;
};

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!resendApiKey || !toEmail) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 500 },
    );
  }

  let jsonBody: unknown;

  try {
    jsonBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: trimString((jsonBody as Record<string, unknown>)?.name),
    email: trimString((jsonBody as Record<string, unknown>)?.email),
    message: trimString((jsonBody as Record<string, unknown>)?.message),
  };

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const resend = new Resend(resendApiKey);
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");

  const sendPromise = resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: payload.email,
    subject: `Portfolio contact from ${payload.name}`,
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`,
    html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br />${safeMessage}</p>`,
  });

  const { error } = await sendPromise;
  if (error) {
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
