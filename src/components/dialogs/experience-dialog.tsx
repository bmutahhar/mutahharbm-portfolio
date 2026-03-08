import { Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { EXPERIENCE_ENTRIES } from "../../data/portfolio-content";
import { AnimatedDialogWrapper } from "../animated-dialog-components";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface ExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

            {EXPERIENCE_ENTRIES.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
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
