import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "../../../env";
import { contactFormSchema } from "../../../lib/contact-form-schema";

export const runtime = "nodejs";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(request: Request) {
  const resendApiKey = env.RESEND_API_KEY;
  const fromEmail = env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";
  const toEmail = env.CONTACT_TO_EMAIL;

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

  const parsedPayload = contactFormSchema.safeParse(jsonBody);

  if (!parsedPayload.success) {
    const firstIssueMessage =
      parsedPayload.error.issues[0]?.message ?? "Please check your form values and try again.";
    return NextResponse.json({ error: firstIssueMessage }, { status: 400 });
  }
  const payload = parsedPayload.data;

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
