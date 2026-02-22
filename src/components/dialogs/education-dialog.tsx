import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { GraduationCap, Award, Calendar } from "lucide-react";

interface EducationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EducationDialog({ open, onOpenChange }: EducationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Education
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Academic background and continuous learning journey.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Formal Education */}
          <div className="border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">
                  Bachelor of Computer Science
                </h3>
                <div className="text-lg text-primary mb-3">
                  COMSATS University, Islamabad
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  Graduated 2021
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Award className="w-4 h-4" />
                  CGPA: 3.73 / 4.00
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Built a strong foundation in computer science fundamentals, software engineering,
                  and practical application development that directly supports modern frontend and
                  full-stack product delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Core Areas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Core Areas</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Data Structures & Algorithms",
                "Software Engineering",
                "Database Systems",
                "Web Development",
                "Computer Networks",
                "Problem Solving",
              ].map((course) => (
                <Badge key={course} variant="outline">
                  {course}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievement */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Achievement</h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Bar Riser Award",
                  platform: "ImagineArt - Vyro.ai",
                  year: "2025",
                },
              ].map((cert, index) => (
                <div
                  key={index}
                  className="border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium mb-1">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground">{cert.platform}</p>
                    </div>
                    <Badge variant="outline">{cert.year}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continuous Learning */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Continuous Learning</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Ongoing focus areas that support product quality and delivery:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Frontend architecture at scale",
                "Performance optimization and Web Vitals",
                "SEO-friendly rendering patterns",
                "Reusable design systems and UI patterns",
                "Real-time product features",
                "Deployment and release workflows",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
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
