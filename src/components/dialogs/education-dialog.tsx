import { Award, Calendar, GraduationCap, MapPin } from "lucide-react";
import { EDUCATION_CONTENT } from "../../data/portfolio-content";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

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
            Formal education details reflected directly from the resume.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border border-border rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{EDUCATION_CONTENT.degree}</h3>
                <div className="text-lg text-primary mb-3">{EDUCATION_CONTENT.institution}</div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Graduated {EDUCATION_CONTENT.graduationYear}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {EDUCATION_CONTENT.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    CGPA: {EDUCATION_CONTENT.cgpa}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {EDUCATION_CONTENT.highSchool ? (
            <div className="border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">High School</h3>
                  <div className="text-lg text-primary mb-3">
                    {EDUCATION_CONTENT.highSchool.institution}
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Graduated {EDUCATION_CONTENT.highSchool.graduationYear}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {EDUCATION_CONTENT.highSchool.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
