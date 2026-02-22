import {
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";

export const navItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "impact", label: "Impact", icon: TrendingUp },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "experience", label: "Experience", icon: Sparkles },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export type NavItemId = (typeof navItems)[number]["id"];
