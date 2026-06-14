"use client";

import { ArrowUpRight } from "lucide-react";
import { CONTACT_LINKS, PROFILE_CONTENT, PROFILE_IMAGE, SKILL_HIGHLIGHTS } from "../../../data/portfolio-content";
import { BulletList, Section, TechChips } from "../inspector-primitives";

const SOCIAL_LINKS = CONTACT_LINKS.filter((link) => link.id === "github" || link.id === "linkedin");

export const ProfileView = () => (
  <div className="flex flex-col gap-6">
    <div className="flex items-start gap-4">
      <img
        src={PROFILE_IMAGE.node.src}
        alt={PROFILE_IMAGE.node.alt}
        width={88}
        height={88}
        className="size-22 shrink-0 rounded-lg border object-cover"
      />
      <div className="min-w-0 pt-1">
        <p className="text-lg font-bold leading-tight tracking-tight">{PROFILE_CONTENT.name}</p>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">{PROFILE_CONTENT.title}</p>
        <div className="mt-2.5 flex gap-2">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded border bg-card px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-[color:var(--node-accent)]/60 hover:text-foreground"
            >
              {link.label}
              <ArrowUpRight aria-hidden className="size-3" />
            </a>
          ))}
        </div>
      </div>
    </div>

    <Section label="summary">
      <p className="text-[13px] leading-relaxed text-muted-foreground">{PROFILE_CONTENT.summary}</p>
    </Section>

    <Section label="focus stack">
      <TechChips items={PROFILE_CONTENT.focusStack} />
    </Section>

    <Section label="highlights">
      <BulletList items={SKILL_HIGHLIGHTS} />
    </Section>
  </div>
);
