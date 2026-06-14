"use client";

import { PROFILE_CONTENT } from "../../data/portfolio-content";

/** Shown while the canvas bundle loads — a quiet instrument boot. */
export const BootScreen = () => (
  <div className="grid h-dvh w-screen place-items-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <span className="grid size-12 place-items-center rounded-lg border bg-card font-mono text-sm font-semibold text-primary shadow-md">
        mb
      </span>
      <p className="text-sm font-semibold tracking-tight">{PROFILE_CONTENT.shortName}</p>
      <p aria-live="polite" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        initializing graph<span className="caret-blink">▮</span>
      </p>
    </div>
  </div>
);
