import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { TrendingUp, Zap, Clock, Users } from "lucide-react";
import { IMPACT_METRICS } from "../data/portfolio-content";

export function MetricsSection() {
  const iconByMetric = {
    "rollout-efficiency": { icon: Zap, color: "text-chart-1" },
    "development-cost": { icon: Clock, color: "text-chart-2" },
    engagement: { icon: TrendingUp, color: "text-chart-3" },
    "workflow-retention": { icon: Users, color: "text-chart-4" },
  } as const;

  return (
    <section id="metrics" className="py-20 px-6 md:px-12 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-mono">
            Quantified Impact
          </p>
          <h2 className="text-3xl md:text-4xl tracking-tight">Proven Results</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {IMPACT_METRICS.map((metric, index) => {
            const style = iconByMetric[metric.id as keyof typeof iconByMetric];

            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} from-current/10 to-current/5 flex items-center justify-center flex-shrink-0`}
                      >
                        <style.icon className={`w-5 h-5 ${style.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-3xl font-medium tracking-tight mb-1">
                          {metric.value}
                        </div>
                        <h3 className="text-sm font-medium mb-2">{metric.label}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {metric.context}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
