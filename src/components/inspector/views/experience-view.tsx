"use client";

import { EXPERIENCE_ENTRIES } from "../../../data/portfolio-content";
import { BulletList, Fact, TechChips } from "../inspector-primitives";

export const ExperienceView = () => (
  <div className="flex flex-col gap-6">
    {EXPERIENCE_ENTRIES.map((entry) => (
      <article
        key={entry.company}
        className="flex flex-col gap-2.5 border-t pt-5 first:border-t-0 first:pt-0"
      >
        <h3 className="text-[15px] font-bold tracking-tight">{entry.role}</h3>
        <Fact label="at">{entry.company}</Fact>
        <Fact label="when">
          {entry.period} · {entry.location}
        </Fact>
        <BulletList items={entry.achievements} />
        <TechChips items={entry.tech} />
      </article>
    ))}
  </div>
);
