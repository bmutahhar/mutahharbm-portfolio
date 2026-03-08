import { Mail, Linkedin, Github, Phone } from "lucide-react";
import { motion } from "motion/react";
import {
  CONTACT_LINKS,
  FLAT_TECH_STACK,
  PROFILE_CONTENT,
  PROFILE_IMAGE,
} from "../../data/portfolio-content";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const iconByContact = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
} as const;

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Profile
          </DialogTitle>
          <DialogDescription>
            Learn more about my background, skills, and how to connect with me.
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, staggerChildren: 0.1 }}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-primary/30 shadow-lg"
            >
              <img
                src={PROFILE_IMAGE.dialog.src}
                alt={PROFILE_IMAGE.dialog.alt}
                width={PROFILE_IMAGE.dialog.width}
                height={PROFILE_IMAGE.dialog.height}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {PROFILE_CONTENT.name}
              </h2>
              <p className="text-lg text-muted-foreground">{PROFILE_CONTENT.title}</p>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              About
            </h3>
            <p className="text-muted-foreground leading-relaxed">{PROFILE_CONTENT.summary}</p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {FLAT_TECH_STACK.map((tech) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge
                    variant="outline"
                    className="font-mono text-xs hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {CONTACT_LINKS.map((contact) => {
                const Icon = iconByContact[contact.id];
                const isExternal = contact.id === "linkedin" || contact.id === "github";

                return (
                  <motion.div
                    key={contact.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" asChild className="group relative overflow-hidden">
                      <a
                        href={contact.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        {contact.label}
                      </a>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
