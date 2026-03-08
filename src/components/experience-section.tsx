import { motion } from "motion/react";
import { EXPERIENCE_ENTRIES } from "../data/portfolio-content";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Calendar } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 md:px-12 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-mono">
            Career Journey
          </p>
          <h2 className="text-3xl md:text-4xl tracking-tight">Experience</h2>
        </motion.div>

        <div className="space-y-6">
          {EXPERIENCE_ENTRIES.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium mb-1">{exp.role}</h3>
                      <p className="text-base text-foreground/90 mb-2">{exp.company}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-3"
                      >
                        <span className="text-foreground/40 mt-1.5 flex-shrink-0">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {exp.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs font-mono">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
