import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Calendar } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      company: "Vyro.ai",
      role: "Frontend Engineer",
      period: "July 2023 - Present",
      location: "Islamabad, Pakistan",
      achievements: [
        "Architected and delivered the flagship Workflows feature using React Flow, enabling unified text, image, and video generation through a visual canvas interface",
        "Implemented subscription-based feature gating with Firebase Remote Config, improving rollout efficiency by 60% and reducing engineering overhead by 35%",
        "Redesigned dashboard architecture into three modular versions using composite pattern, reducing maintenance costs by 40% and increasing dev speed by 25%",
        "Led performance optimization initiative for landing page and blog using Next.js SSR/ISR and Strapi CMS, achieving 40% load time reduction and 25% PageSpeed increase",
        "Established component library standards using shadcn/ui and Radix UI, improving UI consistency and development velocity across the team",
      ],
      tech: [
        "React",
        "Next.js",
        "TypeScript",
        "Zustand",
        "React Flow",
        "Tailwind CSS",
        "shadcn/ui",
      ],
    },
    {
      company: "DevsInc",
      role: "Software Engineer",
      period: "June 2022 - June 2023",
      location: "Islamabad, Pakistan",
      achievements: [
        "Built comprehensive health provider dashboard with integrated calendar, video calls, and patient management using React and Material UI",
        "Implemented Twilio Video integration for real-time consultations, increasing patient interactions by 30% and reducing admin tasks by 25%",
        "Developed real-time notification system using Socket.io, improving user engagement by 35%",
        "Created image annotation tool for medical records, improving accuracy by 40% and reducing resolution time by 25%",
        "Designed webhook integration for ANPR access control system, reducing unauthorized entries and speeding up check-ins by 30%",
      ],
      tech: [
        "React",
        "Material UI",
        "Twilio",
        "Socket.io",
        "Node.js",
        "MongoDB",
      ],
    },
    {
      company: "Pakistan Air Force",
      role: "Software Engineer",
      period: "October 2021 - June 2022",
      location: "Islamabad, Pakistan",
      achievements: [
        "Architected secure deployment infrastructure with 20+ Docker images on local Kubernetes clusters",
        "Achieved 99.9% uptime and 50% faster deployment cycles through automated CI/CD pipelines",
        "Implemented monitoring and alerting system using Prometheus and Grafana for proactive issue detection",
        "Developed comprehensive deployment documentation and established DevOps best practices for the team",
      ],
      tech: [
        "Docker",
        "Kubernetes",
        "Helm",
        "GitLab CI",
        "Prometheus",
        "Grafana",
      ],
    },
    {
      company: "Engiselle",
      role: "Full Stack Developer",
      period: "March 2022 - March 2025",
      location: "Singapore (Remote)",
      achievements: [
        "Implemented geospatial analysis features using Mapbox for interactive mapping, improving analysis accuracy by 40%",
        "Built real-time notification system with Socket.io, boosting user engagement by 35%",
        "Developed full-stack features using React, Node.js, and PostgreSQL with focus on scalability",
        "Collaborated with distributed team across time zones, maintaining high code quality and delivery standards",
      ],
      tech: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Mapbox",
        "Socket.io",
        "Docker",
      ],
    },
  ];

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
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
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
                      <p className="text-base text-foreground/90 mb-2">
                        {exp.company}
                      </p>
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
                        <span className="text-foreground/40 mt-1.5 flex-shrink-0">
                          •
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                    {exp.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="text-xs font-mono"
                      >
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
