import { motion } from "motion/react";
import { Award, Calendar, GraduationCap, MapPin } from "lucide-react";
import { EDUCATION_CONTENT } from "../data/portfolio-content";
import { Card, CardContent } from "./ui/card";

export function EducationSection() {
  return (
    <section id="education" className="py-20 px-6 md:px-12 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-mono">
            Academic Background
          </p>
          <h2 className="text-3xl md:text-4xl tracking-tight">Education</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/5 border border-border flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-foreground/60" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-medium mb-2">{EDUCATION_CONTENT.degree}</h3>
                  <p className="text-base text-foreground/90 mb-4">
                    {EDUCATION_CONTENT.institution}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Graduated {EDUCATION_CONTENT.graduationYear}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {EDUCATION_CONTENT.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      CGPA {EDUCATION_CONTENT.cgpa}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
