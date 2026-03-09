import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const isValidUrlOrDomain = (value: string) => {
  try {
    const normalizedValue =
      value.startsWith("http://") || value.startsWith("https://")
        ? value
        : `https://${value}`;
    new URL(normalizedValue);
    return true;
  } catch {
    return false;
  }
};

const urlOrDomainSchema = z
  .string()
  .min(1, "Value cannot be empty.")
  .refine(isValidUrlOrDomain, "Expected a valid URL or domain.");

const emailSenderSchema = z
  .string()
  .min(1, "Sender email cannot be empty.")
  .refine((value) => value.includes("@"), "Sender must include an email address.");

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY cannot be empty.").optional(),
    RESEND_FROM_EMAIL: emailSenderSchema.optional(),
    CONTACT_TO_EMAIL: z.string().email("CONTACT_TO_EMAIL must be a valid email.").optional(),
    SITE_URL: urlOrDomainSchema.optional(),
    VERCEL_PROJECT_PRODUCTION_URL: urlOrDomainSchema.optional(),
    VERCEL_URL: urlOrDomainSchema.optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: urlOrDomainSchema.optional(),
  },
  clientPrefix: "NEXT_PUBLIC_",
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    SITE_URL: process.env.SITE_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  emptyStringAsUndefined: true,
});
