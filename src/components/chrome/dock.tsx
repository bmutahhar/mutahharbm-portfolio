"use client";

import type { ReactNode } from "react";
import { useReactFlow, useViewport } from "@xyflow/react";
import { Download, Maximize, Minus, Play, Plus } from "lucide-react";
import { useCanvasActions, useCanvasState } from "../canvas/canvas-provider";
import { useCamera } from "../canvas/use-camera";
import { RESUME_PDF } from "../../data/portfolio-content";

type DockButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
};

const DockButton = ({ label, onClick, children }: DockButtonProps) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={onClick}
    className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
  >
    {children}
  </button>
);

const DockDivider = () => <span aria-hidden className="mx-0.5 h-5 w-px bg-border" />;

/** Editor-style control strip: zoom, framing, tour, and the resume artifact. */
export const Dock = () => {
  const { zoomIn, zoomOut } = useReactFlow();
  const camera = useCamera();
  const { zoom } = useViewport();
  const { tourIndex } = useCanvasState();
  const { startTour } = useCanvasActions();

  // The tour caption takes over the bottom-center slot while running.
  if (tourIndex !== null) {
    return null;
  }

  return (
    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border bg-background/85 p-1 shadow-md backdrop-blur-md">
      <DockButton label="Zoom out" onClick={() => void zoomOut()}>
        <Minus aria-hidden className="size-4" />
      </DockButton>
      <span className="w-12 text-center font-mono text-[11px] tabular-nums text-muted-foreground">
        {Math.round(zoom * 100)}%
      </span>
      <DockButton label="Zoom in" onClick={() => void zoomIn()}>
        <Plus aria-hidden className="size-4" />
      </DockButton>
      <DockDivider />
      <DockButton label="Fit graph in view" onClick={() => camera.fitGraph()}>
        <Maximize aria-hidden className="size-4" />
      </DockButton>
      <DockButton label="Run the guided tour" onClick={startTour}>
        <Play aria-hidden className="size-4" />
      </DockButton>
      <DockDivider />
      <a
        href={RESUME_PDF.href}
        download={RESUME_PDF.fileName}
        aria-label="Download resume PDF"
        title="Download resume PDF"
        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <Download aria-hidden className="size-4" />
      </a>
    </div>
  );
};
