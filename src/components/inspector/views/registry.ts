import type { ComponentType } from "react";
import type { NodeKind } from "../../canvas/graph";
import { ContactView } from "./contact-view";
import { EducationView } from "./education-view";
import { ExperienceView } from "./experience-view";
import { ImpactView } from "./impact-view";
import { ProfileView } from "./profile-view";
import { ResumeView } from "./resume-view";
import { SkillsView } from "./skills-view";
import { WorkView } from "./work-view";

export type InspectorViewEntry = {
  title: string;
  description: string;
  View: ComponentType;
};

export const INSPECTOR_VIEWS: Record<NodeKind, InspectorViewEntry> = {
  profile: {
    title: "Profile",
    description: "Who is behind the graph.",
    View: ProfileView,
  },
  skills: {
    title: "Technical Skills",
    description: "Languages, frameworks, and tooling across the stack.",
    View: SkillsView,
  },
  experience: {
    title: "Experience",
    description: "Four roles across product companies, agencies, and R&D.",
    View: ExperienceView,
  },
  work: {
    title: "Selected Work",
    description: "Canvas products, platform features, and shipped outcomes.",
    View: WorkView,
  },
  impact: {
    title: "Measured Impact",
    description: "Quantified outcomes behind the work.",
    View: ImpactView,
  },
  education: {
    title: "Education",
    description: "Academic background.",
    View: EducationView,
  },
  contact: {
    title: "Get In Touch",
    description: "Links and a direct line — messages land in my inbox.",
    View: ContactView,
  },
  resume: {
    title: "Resume",
    description: "The whole pipeline, compiled to a single PDF.",
    View: ResumeView,
  },
};
