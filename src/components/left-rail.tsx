import { motion } from "motion/react";
import { Badge } from "./ui/badge";

interface LeftRailProps {
  activeSection: string;
}

export function LeftRail({ activeSection }: LeftRailProps) {
  const sections = [
    { id: "home", label: "Home" },
    { id: "metrics", label: "Impact" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const topTech = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ];

  return (
    <motion.aside
      className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 border-r border-border bg-background/50 backdrop-blur-sm p-8 overflow-y-auto"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Mini Profile */}
      <div className="mb-12">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 mb-4 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">MB</span>
        </div>
        <h3 className="text-sm font-medium mb-1">Mutahhar Bin Muzaffar</h3>
        <p className="text-xs text-muted-foreground mb-1">Frontend Engineer</p>
        <p className="text-xs text-muted-foreground">Islamabad, Pakistan</p>
      </div>

      {/* Section Indicator */}
      <div className="mb-12">
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
          Navigation
        </p>
        <div className="space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                const element = document.getElementById(section.id);
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-3 w-full group"
            >
              <div
                className={`w-1 h-6 rounded-full transition-all ${
                  activeSection === section.id
                    ? "bg-foreground"
                    : "bg-border group-hover:bg-foreground/30"
                }`}
              />
              <span
                className={`text-xs transition-colors ${
                  activeSection === section.id
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Tech */}
      <div>
        <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
          Focus Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {topTech.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs font-mono">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
