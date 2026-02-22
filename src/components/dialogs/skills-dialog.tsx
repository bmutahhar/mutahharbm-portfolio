import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

interface SkillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const skillCategories = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", level: 95, years: "4+ years" },
      { name: "TypeScript", level: 90, years: "3+ years" },
      { name: "HTML", level: 95, years: "4+ years" },
      { name: "CSS / SCSS", level: 90, years: "4+ years" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95, years: "4+ years" },
      { name: "Next.js", level: 92, years: "3+ years" },
      { name: "Tailwind CSS", level: 95, years: "3+ years" },
      { name: "shadcn/ui", level: 90, years: "2+ years" },
      { name: "Radix UI", level: 88, years: "2+ years" },
      { name: "Redux & Zustand", level: 88, years: "3+ years" },
    ],
  },
  {
    category: "Backend / Infra",
    skills: [
      { name: "Node.js", level: 85, years: "3+ years" },
      { name: "Strapi CMS", level: 80, years: "2+ years" },
      { name: "Firebase", level: 85, years: "2+ years" },
      { name: "Socket.io", level: 85, years: "2+ years" },
      { name: "Docker & Kubernetes", level: 80, years: "2+ years" },
      { name: "REST APIs", level: 90, years: "4+ years" },
    ],
  },
];

const highlights = [
  "Bar Riser Award at Vyro (2025)",
  "4+ years building scalable, SEO-friendly web apps",
  "Strong ownership of end-to-end frontend architecture",
  "Production experience across AI workflows, healthcare, and eCommerce",
];

export function SkillsDialog({ open, onOpenChange }: SkillsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Skills & Expertise
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Comprehensive technical skills developed through years of hands-on experience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Skill Categories */}
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold">{category.category}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {skill.years}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Career Highlights */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Career Highlights</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Professional Skills</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Technical Leadership & Mentoring",
                "Agile/Scrum Methodologies",
                "Code Review & Best Practices",
                "Problem Solving & Debugging",
                "Cross-functional Collaboration",
                "Documentation & Knowledge Sharing",
              ].map((skill, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
