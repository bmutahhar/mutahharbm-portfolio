import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, Linkedin, Github, Send, Phone } from "lucide-react";
import { useState } from "react";
import { CONTACT_LINKS } from "../../data/portfolio-content";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const iconByContact = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
} as const;

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    message: string;
    status: "error" | "success";
  } | null>(null);
  const directContacts = CONTACT_LINKS.filter(
    (contact) => contact.id === "email" || contact.id === "phone",
  );
  const socialContacts = CONTACT_LINKS.filter(
    (contact) => contact.id === "linkedin" || contact.id === "github",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    setSubmitState(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitState({
        status: "error",
        message: "Network error while sending message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Get In Touch
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Reach out directly using the contact details below, or send a message through the form.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="flex h-full flex-col gap-4">
            <section className="rounded-2xl border border-border/80 bg-card/40 p-5">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="mt-4 space-y-3">
                {directContacts.map((contact) => {
                  const Icon = iconByContact[contact.id];
                  return (
                    <a
                      key={contact.id}
                      href={contact.href}
                      className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/50 px-3 py-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/70 transition-colors group-hover:bg-primary/10">
                        <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{contact.label}</p>
                        <p className="truncate text-sm text-foreground/90">{contact.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-border/80 bg-card/40 p-5">
              <h3 className="text-lg font-semibold">Social Links</h3>
              <div className="mt-4 space-y-3">
                {socialContacts.map((contact) => {
                  const Icon = iconByContact[contact.id];
                  return (
                    <a
                      key={contact.id}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-border/70 bg-background/50 px-3 py-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      <span className="truncate text-sm text-foreground/90">{contact.value}</span>
                    </a>
                  );
                })}
              </div>
            </section>

            <section className="mt-auto rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-sm text-muted-foreground">
                Prefer a quick response? Email is the fastest way to reach me.
              </p>
            </section>
          </div>

          <section className="h-full rounded-2xl border border-border/80 bg-card/40 p-5">
            <h3 className="text-lg font-semibold">Send a Message</h3>
            <form onSubmit={handleSubmit} className="mt-4 flex h-full flex-col gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-11"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={7}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="h-40"
                  disabled={isSubmitting}
                  required
                />
              </div>
              <Button type="submit" className="mt-1 w-full" size="lg" disabled={isSubmitting}>
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              {submitState ? (
                <p
                  aria-live="polite"
                  className={`text-sm ${
                    submitState.status === "success" ? "text-primary" : "text-destructive"
                  }`}
                >
                  {submitState.message}
                </p>
              ) : null}
            </form>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
