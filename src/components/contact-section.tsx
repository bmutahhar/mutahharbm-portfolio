import { useState } from "react";
import { motion } from "motion/react";
import { CONTACT_LINKS } from "../data/portfolio-content";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! This is a demo form.");
    setFormData({ name: "", email: "", message: "" });
  };

  const iconByContact = {
    email: Mail,
    phone: Phone,
    linkedin: Linkedin,
    github: Github,
  } as const;

  return (
    <section id="contact" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-mono">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl tracking-tight mb-4">Let's Build Something Great</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Whether you have a question, want to discuss a project, or simply want to connect, feel
            free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Details</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Reach out directly using the resume-backed contact details below, or send a message
                through the form.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {CONTACT_LINKS.map((contact, index) => {
                const Icon = iconByContact[contact.id];
                const isExternal = contact.id === "linkedin" || contact.id === "github";

                return (
                  <motion.a
                    key={contact.id}
                    href={contact.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/10 transition-colors">
                            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">{contact.label}</p>
                            <p className="text-sm font-medium truncate">{contact.value}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or just say hi..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
