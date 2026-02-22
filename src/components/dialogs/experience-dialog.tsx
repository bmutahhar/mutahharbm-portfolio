import { Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedDialogWrapper } from "../animated-dialog-components";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const experiences = [
  {
    company: "ImagineArt - Vyro.ai",
    role: "Frontend Engineer",
    period: "Jul 2023 - Present",
    location: "Islamabad, Pakistan",
    description:
      "Owning core frontend architecture for AI product workflows and dashboard experiences.",
    achievements: [
      "Led Workflows: a unified React Flow canvas for text, image, and video generation with scalable node/state architecture",
      "Built subscription-based feature gating via Firebase Remote Config, improving rollout efficiency by 60%",
      "Reduced access update overhead by 35% and contributed to 20% subscription growth",
      "Modularized dashboards and improved SEO via Next.js SSR/SSG, reducing load time by 40% and improving PageSpeed by 25%",
    ],
    tech: ["React", "Next.js", "TypeScript", "React Flow", "Firebase", "Zustand"],
  },
  {
    company: "Engiselle",
    role: "Full Stack Developer",
    period: "Mar 2022 - Mar 2025",
    location: "Singapore",
    description:
      "Delivered production features across eCommerce and operations platforms.",
    achievements: [
      "Delivered eCommerce products including online pharmacy and home-repair platforms, increasing transaction volume by 20%",
      "Implemented real-time event notifications with Socket.io, increasing user engagement by 35%",
      "Added image annotation and ANPR webhook workflows, improving support-case accuracy and resolution speed",
    ],
    tech: ["React", "Node.js", "Socket.io", "JavaScript", "REST APIs"],
  },
  {
    company: "DevsInc",
    role: "Software Engineer",
    period: "Jun 2022 - Jun 2023",
    location: "Islamabad, Pakistan",
    description:
      "Built healthcare and marketplace features focused on UX, reliability, and delivery speed.",
    achievements: [
      "Built a healthcare provider dashboard with React, Material UI, calendar workflows, and Twilio video",
      "Improved dashboard UX and query performance, reducing load time by 40% and accelerating feature releases by 20%",
      "Resolved 50+ production issues and improved marketplace UX with React and TypeScript, reducing support tickets by 30%",
    ],
    tech: ["React", "TypeScript", "Material UI", "Twilio", "Node.js"],
  },
  {
    company: "Pakistan Air Force",
    role: "Software Engineer",
    period: "Oct 2021 - Jun 2022",
    location: "Islamabad, Pakistan",
    description:
      "Contributed to R&D and delivery initiatives for geospatial and deployment systems.",
    achievements: [
      "Conducted 10+ feasibility studies, improving decision-making speed by 30%",
      "Developed interactive geospatial interfaces with Mapbox",
      "Deployed 20+ Docker images on local Kubernetes, reducing deployment time by 50% with 99.9% uptime",
    ],
    tech: ["Mapbox", "Docker", "Kubernetes", "JavaScript", "DevOps"],
  },
];

export function ExperienceDialog({ open, onOpenChange }: ExperienceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Experience
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Professional journey and key contributions across leading tech companies.
          </DialogDescription>
        </DialogHeader>
        
        <AnimatedDialogWrapper>
          <div className="relative space-y-8">
            {/* Timeline line */}
            <div className="absolute left-[15px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  className="absolute left-0 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 flex items-center justify-center shadow-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="border border-border rounded-2xl p-6 space-y-4 hover:border-primary/30 hover:shadow-lg transition-all bg-card/50 backdrop-blur-sm"
                >
                  {/* Header */}
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                    <div className="text-lg text-primary mb-3">{exp.company}</div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                      Key Achievements
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{achievement}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Technologies Used
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="font-mono text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </AnimatedDialogWrapper>
      </DialogContent>
    </Dialog>
  );
}
