import { TrendingUp, Zap, Users, Target } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedDialogWrapper, AnimatedSection } from "../animated-dialog-components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ImpactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImpactDialog({ open, onOpenChange }: ImpactDialogProps) {
  const metrics = [
    {
      icon: Zap,
      value: "60%",
      label: "Feature Rollout Efficiency",
      description: "Improved rollout efficiency with subscription-based feature gating",
      color: "from-chart-2/20 to-chart-2/10 border-chart-2/30",
      iconColor: "text-chart-2",
    },
    {
      icon: Target,
      value: "40%",
      label: "Faster Load Performance",
      description: "Reduced dashboard and landing page load times through Next.js SSR/SSG and modularization",
      color: "from-chart-3/20 to-chart-3/10 border-chart-3/30",
      iconColor: "text-chart-3",
    },
    {
      icon: TrendingUp,
      value: "35%",
      label: "Higher Engagement",
      description: "Increased user engagement with real-time event notifications using Socket.io",
      color: "from-chart-4/20 to-chart-4/10 border-chart-4/30",
      iconColor: "text-chart-4",
    },
    {
      icon: Users,
      value: "20%",
      label: "Subscription Growth",
      description: "Contributed to subscription growth through feature delivery and controlled rollouts",
      color: "from-primary/20 to-primary/10 border-primary/30",
      iconColor: "text-primary",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Impact Metrics
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Quantified outcomes and measurable improvements delivered across projects.
          </DialogDescription>
        </DialogHeader>
        
        <AnimatedDialogWrapper>
          <div className="grid md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className={`bg-gradient-to-br ${metric.color} border rounded-2xl p-6 space-y-4 cursor-default shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 rounded-xl bg-background flex items-center justify-center shadow-md`}
                    >
                      <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                    </motion.div>
                    <div className="text-right">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.6, type: "spring" }}
                        className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                      >
                        {metric.value}
                      </motion.div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                        Improvement
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{metric.label}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatedSection delay={0.5}>
            <div className="bg-muted/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10">
              <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {[
                  "Reduced access update overhead by 35% with Firebase Remote Config based gating",
                  "Increased transaction volume by 20% by delivering production eCommerce features",
                  "Reduced support tickets by 30% after resolving 50+ production issues and UX gaps",
                  "Achieved 99.9% uptime while reducing deployment time by 50% on Docker + Kubernetes",
                ].map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 + 0.2, type: "spring" }}
                      className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"
                    />
                    <p className="text-sm text-muted-foreground">
                      {achievement}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </AnimatedDialogWrapper>
      </DialogContent>
    </Dialog>
  );
}
