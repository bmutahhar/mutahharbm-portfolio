import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0 shadow-lg"
            >
              <span className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                MB
              </span>
            </motion.div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Mutahhar Bin Muzaffar
              </h2>
              <p className="text-lg text-muted-foreground mb-3">Frontend Engineer</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Islamabad, Pakistan
              </div>
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
            <p className="text-muted-foreground leading-relaxed">
              Accomplished frontend-focused engineer with 4+ years of experience building
              scalable, high-performance, SEO-friendly web applications. I specialize in
              JavaScript, React, and Next.js, and lead end-to-end product features using
              Tailwind CSS, Radix UI, shadcn/ui, Redux, and Zustand.
            </p>
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
              {[
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "HTML",
                "CSS/SCSS",
                "Tailwind CSS",
                "shadcn/ui",
                "Radix UI",
                "Redux",
                "Zustand",
                "Node.js",
                "Strapi CMS",
                "Firebase",
                "Socket.io",
                "Docker",
                "Kubernetes",
                "Jest",
                "Git",
                "REST APIs",
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.03 }}
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild className="group relative overflow-hidden">
                  <a
                    href="mailto:mutahharbinmuzaffar@gmail.com"
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Email
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild className="group relative overflow-hidden">
                  <a
                    href="tel:+923012498730"
                    className="flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Phone
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild className="group relative overflow-hidden">
                  <a
                    href="https://www.linkedin.com/in/mutahhar-bin-muzaffar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    LinkedIn
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild className="group relative overflow-hidden">
                  <a
                    href="https://github.com/bmutahhar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    GitHub
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
