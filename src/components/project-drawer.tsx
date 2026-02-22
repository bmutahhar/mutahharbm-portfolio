import { motion } from "motion/react";
import { X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export interface Project {
  id: string;
  title: string;
  company: string;
  outcome: string;
  description: string;
  problem: string;
  solution: string;
  whatIBuilt: string;
  tech: string[];
  roles: string[];
  metrics: Array<{ label: string; value: string }>;
}

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  if (!project) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        className="fixed right-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-background border-l border-border z-50 overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl tracking-tight">{project.title}</h2>
            <p className="text-sm text-muted-foreground">{project.company}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">
              Overview
            </h3>
            <p className="text-base leading-relaxed">{project.description}</p>
          </div>

          {/* Problem */}
          <div>
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">
              Problem
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">
              Solution
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.solution}
            </p>
          </div>

          {/* What I Built */}
          <div>
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">
              What I Built
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.whatIBuilt}
            </p>
          </div>

          {/* Roles */}
          <div>
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">
              Focus Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.roles.map((role) => (
                <Badge key={role} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="font-mono">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">
              Results & Impact
            </h3>
            <div className="grid gap-4">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="text-2xl font-medium tracking-tight mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
