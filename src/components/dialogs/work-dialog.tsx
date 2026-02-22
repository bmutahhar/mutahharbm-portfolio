import { motion } from "motion/react";
import { useState } from "react";
import { AnimatedDialogWrapper } from "../animated-dialog-components";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface WorkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const projects = [
  {
    title: "Workflows Canvas (ImagineArt - Vyro.ai)",
    description:
      "Led a unified React Flow canvas for text, image, and video generation, designing scalable architecture, node interactions, and real-time execution flows.",
    impact: "Core platform feature delivery with scalable architecture and faster execution workflows",
    tech: ["React", "React Flow", "TypeScript", "Zustand", "Next.js", "Tailwind CSS"],
    highlights: [
      "Designed and implemented complex node/state architecture for production-scale workflows",
      "Integrated text, image, and video experiences into a single interaction model",
      "Built reusable UI and interaction patterns for faster team delivery",
    ],
  },
  {
    title: "Subscription Feature Gating",
    description:
      "Implemented subscription-based feature gating powered by Firebase Remote Config to enable real-time rollouts across product surfaces.",
    impact: "60% rollout efficiency improvement, 35% lower access-update overhead, 20% subscription growth contribution",
    tech: ["Firebase Remote Config", "React", "Next.js", "TypeScript"],
    highlights: [
      "Implemented controlled rollout logic for subscription tiers",
      "Reduced manual access operations and improved release reliability",
      "Enabled faster experimentation and safer progressive releases",
    ],
  },
  {
    title: "Healthcare Provider Dashboard (DevsInc)",
    description:
      "Built a healthcare dashboard with calendar workflows and Twilio-powered video interactions, then improved UX and performance across key journeys.",
    impact: "40% faster load time, 20% faster feature releases, 30% fewer support tickets",
    tech: ["React", "TypeScript", "Material UI", "Twilio", "Node.js"],
    highlights: [
      "Developed calendar and provider interaction workflows",
      "Improved data flow and query behavior for faster dashboard responsiveness",
      "Resolved 50+ production issues with measurable UX improvements",
    ],
  },
  {
    title: "eCommerce + Ops Platforms (Engiselle)",
    description:
      "Delivered eCommerce features (including online pharmacy and home-repair products), plus event and support workflows across the platform.",
    impact: "20% higher transaction volume and 35% higher engagement",
    tech: ["React", "Node.js", "Socket.io", "REST APIs"],
    highlights: [
      "Implemented real-time event notifications with Socket.io",
      "Added image annotation and ANPR webhook workflows",
      "Improved support-case accuracy and resolution speed",
    ],
  },
];

export function WorkDialog({ open, onOpenChange }: WorkDialogProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Selected Work
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Featured projects showcasing technical expertise and measurable impact.
          </DialogDescription>
        </DialogHeader>
        
        <AnimatedDialogWrapper>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Impact */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <div className="text-xs uppercase tracking-wider text-primary font-medium mb-1">
                          Impact
                        </div>
                        <div className="text-sm text-foreground">{project.impact}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="font-mono text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Highlights - Collapsible */}
                  {selectedProject === index ? (
                    <div className="space-y-3 pt-3 border-t border-border">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Key Highlights
                      </div>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{highlight}</p>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedProject(null)}
                        className="mt-2"
                      >
                        Show Less
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(index)}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedDialogWrapper>
      </DialogContent>
    </Dialog>
  );
}
