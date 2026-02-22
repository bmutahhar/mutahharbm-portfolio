import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectDrawer, Project } from "./project-drawer";

export function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "workflows",
      title: "Workflows Feature",
      company: "Vyro.ai",
      outcome:
        "Unified canvas for text, image, and video generation with complex node interactions",
      description:
        "Built the flagship Workflows feature at Vyro.ai - a unified canvas interface that brings together text, image, and video generation through an intuitive node-based system powered by React Flow.",
      problem:
        "Users needed a way to orchestrate complex AI generation workflows across different modalities (text, image, video) without switching between multiple tools or interfaces.",
      solution:
        "Designed and implemented a React Flow-based canvas that provides a visual programming interface where users can chain different AI operations, manage state across nodes, and execute workflows in real-time.",
      whatIBuilt:
        "Core architecture including state management with Zustand, node behavior systems, edge validation logic, real-time execution engine, and the complete interaction model. Handled complex scenarios like cyclic dependencies, parallel execution, and error propagation.",
      tech: [
        "React 18",
        "TypeScript",
        "React Flow",
        "Zustand",
        "Tailwind CSS",
      ],
      roles: ["Architecture", "State Management", "UI Systems", "Performance"],
      metrics: [
        { label: "Core feature driving product adoption", value: "Flagship" },
        { label: "Complex state interactions handled", value: "Multi-node" },
        { label: "Real-time execution engine", value: "Built" },
      ],
    },
    {
      id: "feature-gating",
      title: "Subscription-based Feature Gating",
      company: "Vyro.ai",
      outcome:
        "60% rollout efficiency gain and 35% less engineering overhead",
      description:
        "Implemented a tier-based access control system using Firebase Remote Config that enables real-time feature updates without deployments.",
      problem:
        "The team needed to control feature access based on subscription tiers but deployments for each change were slow and risky. No way to A/B test features or gradually roll out to user segments.",
      solution:
        "Built a comprehensive feature gating system using Firebase Remote Config that allows non-technical stakeholders to control feature visibility through a dashboard, with instant updates across all clients.",
      whatIBuilt:
        "Feature flag architecture, Firebase Remote Config integration, React hooks for feature checks, admin dashboard for flag management, and analytics integration to track feature adoption per tier.",
      tech: [
        "React",
        "Firebase",
        "Remote Config",
        "TypeScript",
        "Custom Hooks",
      ],
      roles: ["Architecture", "State Management", "Performance"],
      metrics: [
        { label: "Faster feature rollouts", value: "60%" },
        { label: "Reduced engineering overhead", value: "35%" },
        { label: "Contribution to subscription revenue growth", value: "20%" },
      ],
    },
    {
      id: "modular-dashboard",
      title: "Modular Dashboard System",
      company: "Vyro.ai",
      outcome: "40% lower maintenance, 25% faster development",
      description:
        "Redesigned and modularized the dashboard architecture into three standalone versions for separate product lines using the composite pattern.",
      problem:
        "Single monolithic dashboard served multiple product lines, making it difficult to customize features per product and creating high maintenance costs with frequent merge conflicts.",
      solution:
        "Decomposed the dashboard into reusable composite components with a plugin-based architecture. Each product line can now compose their own dashboard from shared building blocks while maintaining independence.",
      whatIBuilt:
        "Component library with 30+ reusable dashboard widgets, plugin system for feature composition, shared state management layer, and comprehensive documentation. New dashboards can now be created in under 10 minutes.",
      tech: [
        "React 18",
        "TypeScript",
        "Zustand",
        "Composite Pattern",
        "shadcn/ui",
      ],
      roles: ["Architecture", "UI Systems", "Performance"],
      metrics: [
        { label: "Reduced maintenance costs", value: "40%" },
        { label: "Faster development speed", value: "25%" },
        { label: "Time to create new dashboard", value: "<10 min" },
      ],
    },
    {
      id: "performance-seo",
      title: "Performance & SEO Landing + Blog",
      company: "Vyro.ai",
      outcome: "40% load time reduction, 25% PageSpeed increase",
      description:
        "Refactored the landing page and blog using Next.js SSR and static generation for optimal performance and SEO.",
      problem:
        "Client-rendered landing page had poor Core Web Vitals, slow initial load, and limited SEO visibility. Blog publishing workflow was slow and required developer intervention.",
      solution:
        "Migrated to Next.js 14 with SSR for dynamic content and ISR for blog posts. Implemented Strapi CMS for content management, enabling non-technical team members to publish instantly.",
      whatIBuilt:
        "Next.js app with optimized routing, image optimization pipeline, Strapi CMS integration, custom blog components, and comprehensive SEO meta tag system. Implemented proper code splitting and lazy loading.",
      tech: [
        "Next.js 14",
        "Strapi CMS",
        "TypeScript",
        "Tailwind CSS",
        "ISR",
      ],
      roles: ["Performance", "SEO", "Architecture"],
      metrics: [
        { label: "Load time improvement", value: "40%" },
        { label: "PageSpeed score increase", value: "25%" },
        { label: "Faster publishing time", value: "50%" },
      ],
    },
    {
      id: "health-dashboard",
      title: "Health Provider Dashboard",
      company: "DevsInc",
      outcome: "30% more patient interactions, 25% fewer admin tasks",
      description:
        "Built a comprehensive healthcare provider dashboard with calendar management, video calls, and patient communication using React, Material UI, and Twilio.",
      problem:
        "Healthcare providers needed a unified platform to manage appointments, conduct video consultations, and communicate with patients without juggling multiple tools.",
      solution:
        "Created an all-in-one dashboard with integrated calendar, Twilio-powered video calls, patient messaging, and appointment management. Designed with healthcare compliance and data privacy in mind.",
      whatIBuilt:
        "Full dashboard application with calendar views, Twilio Video integration, real-time messaging, patient records interface, and notification system. Implemented role-based access control for different healthcare staff.",
      tech: [
        "React",
        "Material UI",
        "Twilio",
        "Socket.io",
        "Node.js",
        "MongoDB",
      ],
      roles: ["Frontend", "UI Systems", "Integration"],
      metrics: [
        { label: "Increased patient interactions", value: "30%" },
        { label: "Reduced admin tasks", value: "25%" },
        { label: "Video consultations enabled", value: "Real-time" },
      ],
    },
    {
      id: "secure-deployments",
      title: "Secure Deployments Infrastructure",
      company: "Pakistan Air Force",
      outcome: "99.9% uptime, 50% faster deployments",
      description:
        "Architected and deployed 20+ Docker images on local Kubernetes clusters for secure, isolated application hosting.",
      problem:
        "Required secure, on-premises deployment infrastructure with high availability and fast deployment cycles for sensitive government applications.",
      solution:
        "Set up Kubernetes cluster infrastructure with automated CI/CD pipelines, monitoring, and rollback capabilities. Containerized all applications for consistent deployment across environments.",
      whatIBuilt:
        "Complete containerization strategy, Kubernetes manifests, Helm charts, CI/CD pipelines, monitoring dashboards with Prometheus and Grafana, and comprehensive deployment documentation.",
      tech: ["Docker", "Kubernetes", "Helm", "GitLab CI", "Prometheus"],
      roles: ["DevOps", "Architecture", "Security"],
      metrics: [
        { label: "System uptime achieved", value: "99.9%" },
        { label: "Deployment speed improvement", value: "50%" },
        { label: "Containerized applications", value: "20+" },
      ],
    },
  ];

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
            <h2 className="text-3xl md:text-4xl tracking-tight">
              Selected Work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
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
                          <h3 className="text-lg font-medium mb-1">
                            {project.title}
                          </h3>
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
                          <Badge
                            key={t}
                            variant="outline"
                            className="text-xs font-mono"
                          >
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
          <ProjectDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
