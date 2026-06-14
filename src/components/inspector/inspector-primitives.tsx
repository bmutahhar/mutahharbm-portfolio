"use client";

import type { ReactNode } from "react";
import { cn } from "../ui/utils";

type SectionProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/** Mono-labelled block — the inspector's basic unit of structure. */
export const Section = ({ label, children, className }: SectionProps) => (
  <section className={cn("flex flex-col gap-2.5", className)}>
    <h3 className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--node-accent)]">
      <span aria-hidden className="size-1.5 rounded-full bg-[color:var(--node-accent)]" />
      {label}
    </h3>
    {children}
  </section>
);

type BulletListProps = {
  items: readonly string[];
};

export const BulletList = ({ items }: BulletListProps) => (
  <ul className="flex flex-col gap-2">
    {items.map((item) => (
      <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
        <span aria-hidden className="mt-[7px] h-px w-3 shrink-0 bg-[color:var(--node-accent)]" />
        {item}
      </li>
    ))}
  </ul>
);

type MetricGridProps = {
  children: ReactNode;
};

export const MetricGrid = ({ children }: MetricGridProps) => (
  <dl className="grid grid-cols-2 gap-2">{children}</dl>
);

type MetricProps = {
  value: string;
  label: string;
};

export const Metric = ({ value, label }: MetricProps) => (
  <div className="rounded-md border bg-card px-3 py-2.5">
    <dd className="font-mono text-base font-semibold text-[color:var(--node-accent)]">{value}</dd>
    <dt className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
      {label}
    </dt>
  </div>
);

type TechChipsProps = {
  items: readonly string[];
};

export const TechChips = ({ items }: TechChipsProps) => (
  <ul className="flex flex-wrap gap-1.5">
    {items.map((item) => (
      <li
        key={item}
        className="rounded border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
      >
        {item}
      </li>
    ))}
  </ul>
);

type FactProps = {
  label: string;
  children: ReactNode;
};

/** Single key/value line in mono, e.g. "period — Jul 2023 - Present". */
export const Fact = ({ label, children }: FactProps) => (
  <p className="font-mono text-[11px] text-muted-foreground">
    <span className="uppercase tracking-[0.14em] text-foreground/70">{label}</span>
    <span aria-hidden> — </span>
    {children}
  </p>
);
