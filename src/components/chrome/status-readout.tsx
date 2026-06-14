"use client";

import { useViewport } from "@xyflow/react";
import { GRAPH_LAYOUTS } from "../canvas/graph";

const MODULE_COUNT = GRAPH_LAYOUTS.row.nodes.length;
const SIGNAL_COUNT = GRAPH_LAYOUTS.row.edges.length;

const READOUT_CLASSES =
  "absolute bottom-4 z-10 hidden items-center gap-3 rounded-md border bg-background/75 px-3 py-1.5 font-mono text-[10px] tabular-nums text-muted-foreground backdrop-blur-md lg:flex";

/** CAD-style corner readouts: viewport coordinates and graph stats. Desktop only. */
export const StatusReadout = () => {
  const { x, y, zoom } = useViewport();

  return (
    <>
      <div aria-hidden="true" className={`${READOUT_CLASSES} left-4`}>
        <span>x {Math.round(-x / Math.max(zoom, 0.01))}</span>
        <span>y {Math.round(-y / Math.max(zoom, 0.01))}</span>
        <span>z {zoom.toFixed(2)}</span>
      </div>
      <div aria-hidden="true" className={`${READOUT_CLASSES} right-4`}>
        <span>
          {MODULE_COUNT} modules &middot; {SIGNAL_COUNT} signals
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          live
        </span>
      </div>
    </>
  );
};
