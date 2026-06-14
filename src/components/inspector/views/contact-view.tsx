"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CONTACT_LINKS } from "../../../data/portfolio-content";
import { contactFormSchema, type ContactFormValues } from "../../../lib/contact-form-schema";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Section } from "../inspector-primitives";

type SubmitState = {
  status: "error" | "success";
  message: string;
};

export const ContactView = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const [submitState, setSubmitState] = useState<SubmitState | null>(null);
  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: ContactFormValues) => {
    setSubmitState(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const body = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setSubmitState({
          status: "error",
          message: body?.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        message: "Thanks for reaching out. Your message has been sent successfully.",
      });
      form.reset();
    } catch {
      setSubmitState({
        status: "error",
        message: "Network error while sending message. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Section label="channels">
        <ul className="flex flex-col gap-2">
          {CONTACT_LINKS.map((link) => {
            const isExternal = link.id === "linkedin" || link.id === "github";

            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="group flex items-center justify-between gap-3 rounded-md border bg-card px-3.5 py-2.5 transition-colors hover:border-[color:var(--node-accent)]/60"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {link.label}
                    </p>
                    <p className="truncate text-[13px] font-medium">{link.value}</p>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section label="send a message">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>
            {submitState ? (
              <p
                aria-live="polite"
                className={
                  submitState.status === "success"
                    ? "text-sm text-[color:var(--node-accent)]"
                    : "text-sm text-destructive"
                }
              >
                {submitState.message}
              </p>
            ) : null}
          </form>
        </Form>
      </Section>
    </div>
  );
};
