import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function SkillsSection() {
  const skillGroups = [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 95 },
      ],
    },
    {
      category: "Styling & UI",
      skills: [
        { name: "Tailwind CSS", level: 95 },
        { name: "shadcn/ui", level: 90 },
        { name: "Radix UI", level: 85 },
        { name: "Material UI", level: 85 },
      ],
    },
    {
      category: "State & Forms",
      skills: [
        { name: "Zustand", level: 90 },
        { name: "Redux", level: 85 },
        { name: "React Hook Form", level: 90 },
        { name: "React Flow", level: 85 },
      ],
    },
    {
      category: "Backend & CMS",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Strapi CMS", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "MongoDB", level: 75 },
      ],
    },
  ];

  const tools = [
    "Docker",
    "Kubernetes",
    "Git",
    "GitLab CI/CD",
    "Next.js App Router",
    "Webpack",
    "Jest",
    "React Testing Library",
    "Mapbox",
    "Socket.io",
    "Twilio",
    "Firebase",
    "Vercel",
    "Prometheus",
    "Grafana",
  ];

  const practices = [
    "Next.js SSR & SSG",
    "Performance Optimization",
    "SEO Best Practices",
    "Responsive Design",
    "Component Architecture",
    "State Management Patterns",
    "API Integration",
    "Real-time Features",
    "CI/CD Pipelines",
    "Container Orchestration",
  ];

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
          <h2 className="text-3xl md:text-4xl tracking-tight">
            Skills & Tools
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Skill Groups */}
          <div className="space-y-8">
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              >
                <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-muted-foreground">
                  {group.category}
                </h3>
                <div className="space-y-4">
                  {group.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{skill.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-foreground rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: groupIndex * 0.1 + skillIndex * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Tools & Practices */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-muted-foreground">
                    Tools & Libraries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool, index) => (
                      <motion.div
                        key={tool}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3 + index * 0.03,
                        }}
                      >
                        <Badge variant="secondary" className="font-mono text-xs">
                          {tool}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium mb-4 uppercase tracking-wider text-muted-foreground">
                    Practices & Patterns
                  </h3>
                  <ul className="space-y-2">
                    {practices.map((practice, index) => (
                      <motion.li
                        key={practice}
                        className="text-sm text-muted-foreground flex gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 0.4 + index * 0.05,
                        }}
                      >
                        <span className="text-foreground/40 flex-shrink-0">
                          •
                        </span>
                        <span>{practice}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
