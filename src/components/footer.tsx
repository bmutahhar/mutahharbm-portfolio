import { Mail, Linkedin, Github } from "lucide-react";
import { PROFILE_CONTENT } from "../data/portfolio-content";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30 py-12 px-6 md:px-12 lg:ml-64">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Name & Role */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-medium mb-1">{PROFILE_CONTENT.name}</h3>
            <p className="text-xs text-muted-foreground">{PROFILE_CONTENT.title}</p>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:mutahharbinmuzaffar@gmail.com"
              className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-foreground/5 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/mutahhar-bin-muzaffar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-foreground/5 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/bmutahhar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-foreground/5 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Tech Stack */}
          <div className="text-center md:text-right">
            <p className="text-xs text-muted-foreground">
              Built with Next.js, Tailwind CSS, and shadcn/ui
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © {currentYear} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
