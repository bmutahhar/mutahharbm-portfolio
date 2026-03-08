import { SKILL_CATEGORIES, SKILL_HIGHLIGHTS } from "../../data/portfolio-content";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface SkillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SkillsDialog({ open, onOpenChange }: SkillsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Skills & Expertise
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Frontend experience from the resume, expanded with current backend and delivery tooling.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.category} className="space-y-4">
              <h3 className="text-xl font-semibold">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="font-mono text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Highlights</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {SKILL_HIGHLIGHTS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
