import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WORK_PROJECTS, type ProjectContent } from "../data/portfolio-content";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectDrawer } from "./project-drawer";

export function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectContent | null>(null);

  return (
    <>
      <section id="work" className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-mono">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl tracking-tight">Selected Work</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {WORK_PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium mb-1">{project.title}</h3>
                          <p className="text-xs text-muted-foreground font-mono">
                            {project.company}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {project.outcome}
                      </p>

                      {/* Roles */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>

                      {/* Tech */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 4).map((t) => (
                          <Badge key={t} variant="outline" className="text-xs font-mono">
                            {t}
                          </Badge>
                        ))}
                        {project.tech.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tech.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full justify-between group-hover:bg-accent transition-colors"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
