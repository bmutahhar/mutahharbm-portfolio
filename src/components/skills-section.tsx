import { motion } from "motion/react";
import { SKILL_CATEGORIES, SKILL_HIGHLIGHTS } from "../data/portfolio-content";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-mono">
            Technical Expertise
          </p>
          <h2 className="text-3xl md:text-4xl tracking-tight">Skills & Tools</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="font-mono text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-6"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-muted-foreground">
                Highlights
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {SKILL_HIGHLIGHTS.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
