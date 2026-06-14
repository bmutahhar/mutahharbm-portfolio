"use client";

import { IMPACT_ACHIEVEMENTS, IMPACT_METRICS } from "../../../data/portfolio-content";
import { BulletList, Section } from "../inspector-primitives";

export const ImpactView = () => (
  <div className="flex flex-col gap-6">
    <Section label="metrics">
      <div className="flex flex-col gap-3">
        {IMPACT_METRICS.map((metric) => (
          <div key={metric.id} className="rounded-lg border bg-card p-4">
            <p className="font-mono text-xl font-semibold text-[color:var(--node-accent)]">
              {metric.value}
            </p>
            <p className="mt-0.5 text-[13px] font-semibold">{metric.label}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
              {metric.description}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground/80">
              {metric.context}
            </p>
          </div>
        ))}
      </div>
    </Section>

    <Section label="achievements">
      <BulletList items={IMPACT_ACHIEVEMENTS} />
    </Section>
  </div>
);
