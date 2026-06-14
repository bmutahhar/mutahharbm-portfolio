"use client";

import { ChevronDown } from "lucide-react";
import { WORK_PROJECTS } from "../../../data/portfolio-content";
import { BulletList, Metric, MetricGrid, Section, TechChips } from "../inspector-primitives";

export const WorkView = () => (
  <div className="flex flex-col gap-3">
    {WORK_PROJECTS.map((project, index) => (
      <details key={project.id} open={index === 0} className="group rounded-lg border bg-card">
        <summary className="flex cursor-pointer select-none items-start justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
          <div>
            <h3 className="text-[14px] font-bold tracking-tight">{project.title}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {project.company}
            </p>
          </div>
          <ChevronDown
            aria-hidden
            className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          />
        </summary>

        <div className="flex flex-col gap-4 border-t p-4">
          <p className="text-[12px] font-medium text-[color:var(--node-accent)]">
            {project.outcome}
          </p>
          <p className="text-[13px] leading-relaxed text-muted-foreground">{project.description}</p>

          <MetricGrid>
            {project.metrics.map((metric) => (
              <Metric key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </MetricGrid>

          <Section label="highlights">
            <BulletList items={project.highlights} />
          </Section>

          <TechChips items={project.tech} />
        </div>
      </details>
    ))}
  </div>
);
