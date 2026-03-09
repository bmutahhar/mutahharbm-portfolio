import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please provide a valid email address.")
    .max(200, "Email must be 200 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(5000, "Message must be 5000 characters or fewer."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
