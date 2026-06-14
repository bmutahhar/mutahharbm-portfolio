"use client";

import { createContext, useContext } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "../ui/utils";
import { useActiveTourKind, useCanvasActions } from "./canvas-provider";
import type { NodeKind } from "./graph";

type NodeCardContextValue = {
  kind: NodeKind;
};

const NodeCardContext = createContext<NodeCardContextValue | null>(null);

const useNodeCard = (): NodeCardContextValue => {
  const context = useContext(NodeCardContext);

  if (context === null) {
    throw new Error("NodeCard.* components must be rendered inside <NodeCard>");
  }

  return context;
};

type NodeCardProps = {
  kind: NodeKind;
  enterDelay: number;
  /** Typed ports for the node; kept on the static root so handle bounds measure true. */
  ports?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * Instrument-module shell for a canvas node. Provides its kind to subcomponents
 * via context and exposes the kind's accent hue as `--node-accent` so children
 * (ports, eyebrows, chips) tint themselves without prop drilling.
 *
 * The outer <article> is the element React Flow measures handle bounds from, so
 * it must never carry a transform. The entrance and hover transforms live on the
 * inner visual card instead — otherwise React Flow caches handle positions taken
 * mid-transform and edges attach toward the node middle rather than the ports.
 */
const NodeCardRoot = ({ kind, enterDelay, ports, className, children }: NodeCardProps) => {
  const activeTourKind = useActiveTourKind();
  const isTourStop = activeTourKind === kind;

  return (
    <NodeCardContext.Provider value={NODE_CARD_CONTEXTS[kind]}>
      <article
        data-kind={kind}
        style={
          {
            "--node-accent": `var(--kind-${kind})`,
            "--enter-delay": `${enterDelay}s`,
          } as CSSProperties
        }
        className={cn("group relative", className)}
      >
        {ports}
        <div
          className={cn(
            "node-enter relative flex w-full flex-col rounded-lg border bg-card shadow-md",
            "transition-[border-color,box-shadow] duration-300",
            "group-hover:border-[color:var(--node-accent)]/60 group-hover:shadow-lg",
            isTourStop &&
              "border-[color:var(--node-accent)] shadow-lg ring-2 ring-[color:var(--node-accent)]/35 ring-offset-2 ring-offset-background",
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-lg bg-gradient-to-r from-transparent via-[color:var(--node-sheen)] to-transparent"
          />
          {children}
        </div>
      </article>
    </NodeCardContext.Provider>
  );
};

const NODE_CARD_CONTEXTS = {
  profile: { kind: "profile" },
  skills: { kind: "skills" },
  experience: { kind: "experience" },
  work: { kind: "work" },
  impact: { kind: "impact" },
  education: { kind: "education" },
  contact: { kind: "contact" },
  resume: { kind: "resume" },
} satisfies Record<NodeKind, NodeCardContextValue>;

type EyebrowProps = {
  children: ReactNode;
};

/** Mono micro-label with the kind's port dot — the "module type" line. */
const Eyebrow = ({ children }: EyebrowProps) => (
  <p className="flex items-center gap-2 px-5 pt-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--node-accent)]">
    <span aria-hidden className="size-1.5 rounded-full bg-[color:var(--node-accent)]" />
    {children}
  </p>
);

type TitleProps = {
  children: ReactNode;
  className?: string;
};

const Title = ({ children, className }: TitleProps) => (
  <h2 className={cn("px-5 pt-1.5 text-lg font-semibold leading-tight tracking-tight", className)}>
    {children}
  </h2>
);

type BodyProps = {
  children: ReactNode;
  className?: string;
};

const Body = ({ children, className }: BodyProps) => (
  <div className={cn("flex flex-col gap-3 px-5 pb-4 pt-3", className)}>{children}</div>
);

type StatProps = {
  value: string;
  label: string;
};

/** Compact value/label readout used in node previews. */
const Stat = ({ value, label }: StatProps) => (
  <div className="min-w-0 rounded-md border bg-background/60 px-2.5 py-2">
    <p className="truncate font-mono text-sm font-semibold text-[color:var(--node-accent)]">
      {value}
    </p>
    <p className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
      {label}
    </p>
  </div>
);

type ChipRowProps = {
  children: ReactNode;
};

const ChipRow = ({ children }: ChipRowProps) => (
  <ul className="flex flex-wrap gap-1.5">{children}</ul>
);

type ChipProps = {
  children: ReactNode;
};

const Chip = ({ children }: ChipProps) => (
  <li className="rounded border bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
    {children}
  </li>
);

type FooterProps = {
  children: ReactNode;
};

/** Hairline-separated bottom strip; hosts the inspect affordance or custom actions. */
const Footer = ({ children }: FooterProps) => (
  <footer className="flex items-center justify-between gap-2 border-t px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
    {children}
  </footer>
);

type InspectTriggerProps = {
  label: string;
};

/**
 * Stretched primary action: a real button covering the whole card so any click
 * inspects the node, while staying valid HTML (the card itself is an <article>,
 * not a button). Other interactive children must sit above it via `relative z-10`.
 */
const InspectTrigger = ({ label }: InspectTriggerProps) => {
  const { kind } = useNodeCard();
  const { inspect } = useCanvasActions();

  return (
    <>
      <button
        type="button"
        onClick={() => inspect(kind)}
        className="absolute inset-0 z-0 cursor-pointer rounded-lg"
      >
        <span className="sr-only">{label}</span>
      </button>
      <span
        aria-hidden
        className="pointer-events-none flex items-center gap-1 text-[color:var(--node-accent)] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      >
        inspect
        <span className="caret-blink">▮</span>
      </span>
    </>
  );
};

export const NodeCard = Object.assign(NodeCardRoot, {
  Eyebrow,
  Title,
  Body,
  Stat,
  ChipRow,
  Chip,
  Footer,
  InspectTrigger,
});
