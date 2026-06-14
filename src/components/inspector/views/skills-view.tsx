"use client";

import { SKILL_CATEGORIES, SKILL_HIGHLIGHTS } from "../../../data/portfolio-content";
import { BulletList, Section, TechChips } from "../inspector-primitives";

export const SkillsView = () => (
  <div className="flex flex-col gap-6">
    {SKILL_CATEGORIES.map((category) => (
      <Section key={category.category} label={category.category.toLowerCase()}>
        <TechChips items={category.skills} />
      </Section>
    ))}

    <Section label="highlights">
      <BulletList items={SKILL_HIGHLIGHTS} />
    </Section>
  </div>
);
