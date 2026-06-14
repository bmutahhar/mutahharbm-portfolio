"use client";

import { Background, BackgroundVariant } from "@xyflow/react";

/**
 * Drafting-table surface: a fine dot lattice with major grid lines every fourth
 * step, both viewport-synced by react-flow, vignetted toward the edges.
 */
export const CanvasBackground = () => (
  <>
    <Background
      id="grid-dots"
      variant={BackgroundVariant.Dots}
      gap={26}
      size={1.25}
      color="var(--grid-dot)"
    />
    <Background
      id="grid-lines"
      variant={BackgroundVariant.Lines}
      gap={104}
      lineWidth={1}
      color="var(--grid-line)"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        background:
          "radial-gradient(ellipse 72% 64% at 50% 46%, transparent 58%, var(--canvas-vignette) 100%)",
      }}
    />
  </>
);
