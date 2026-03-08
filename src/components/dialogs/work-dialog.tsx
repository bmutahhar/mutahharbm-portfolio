import { motion } from "motion/react";
import { useState } from "react";
import { WORK_PROJECTS } from "../../data/portfolio-content";
import { AnimatedDialogWrapper } from "../animated-dialog-components";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface WorkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
            {WORK_PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
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
                    <p className="text-xs text-muted-foreground font-mono mb-2">
                      {project.company}
                    </p>
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
                        <div className="text-sm text-foreground">{project.outcome}</div>
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
                    <Button variant="ghost" size="sm" onClick={() => setSelectedProject(index)}>
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
