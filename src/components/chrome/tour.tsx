"use client";

import { useEffect } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCanvasActions, useCanvasState } from "../canvas/canvas-provider";
import { useCamera } from "../canvas/use-camera";
import { TOUR_ORDER } from "../canvas/graph";
import type { NodeKind } from "../canvas/graph";
import { cn } from "../ui/utils";

const TOUR_CAPTIONS: Record<NodeKind, string> = {
  profile: "Full stack engineer, frontend-leaning — four years of shipping canvas-heavy products.",
  education: "Computer science at COMSATS, class of 2021, 3.73 CGPA.",
  skills: "React, Next.js, and TypeScript at the core, with real backend delivery.",
  experience: "Four roles from R&D to product — currently building at ImagineArt.",
  work: "Workflows, Ideate, and other shipped canvas products.",
  impact: "Rollouts 60% faster, dashboards from 3 days to 1 hour, #1 retention feature.",
  contact: "The inbox is open — email, LinkedIn, or the form right here.",
  resume: "Everything above, compiled into one PDF.",
};

/** Drives the viewport to frame the active tour stop. Renders nothing. */
export const TourCamera = () => {
  const { tourIndex } = useCanvasState();
  const camera = useCamera();

  useEffect(() => {
    if (tourIndex === null) {
      return;
    }

    camera.focusNode(TOUR_ORDER[tourIndex]);
  }, [tourIndex, camera]);

  return null;
};

/** Bottom-center narration card shown while the tour runs; replaces the dock. */
export const TourCaption = () => {
  const { tourIndex } = useCanvasState();
  const { inspect, endTour, goToTourStop } = useCanvasActions();

  useEffect(() => {
    if (tourIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToTourStop(tourIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToTourStop(tourIndex - 1);
      } else if (event.key === "Escape") {
        endTour();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tourIndex, goToTourStop, endTour]);

  if (tourIndex === null) {
    return null;
  }

  const kind = TOUR_ORDER[tourIndex];
  const isFirst = tourIndex === 0;
  const isLast = tourIndex === TOUR_ORDER.length - 1;

  return (
    <section
      aria-label="Guided tour"
      style={{ "--node-accent": `var(--kind-${kind})` } as CSSProperties}
      className="absolute bottom-4 left-1/2 z-10 w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border bg-background/90 p-4 shadow-md backdrop-blur-md"
    >
      <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <span aria-hidden className="size-1.5 rounded-full bg-[color:var(--node-accent)]" />
        {String(tourIndex + 1).padStart(2, "0")} / {String(TOUR_ORDER.length).padStart(2, "0")}{" "}
        &middot; <span className="text-[color:var(--node-accent)]">{kind}</span>
      </p>
      <p className="mt-2 text-[13px] leading-snug">{TOUR_CAPTIONS[kind]}</p>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          aria-label={`Inspect the ${kind} node`}
          onClick={() => inspect(kind)}
          className="rounded-md border px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-[color:var(--node-accent)]/60 hover:text-[color:var(--node-accent)]"
        >
          inspect
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous tour stop"
            onClick={() => goToTourStop(tourIndex - 1)}
            className={cn(
              "grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
              isFirst && "opacity-40",
            )}
          >
            <ChevronLeft aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            aria-label={isLast ? "Finish tour" : "Next tour stop"}
            onClick={() => (isLast ? endTour() : goToTourStop(tourIndex + 1))}
            className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronRight aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            aria-label="End tour"
            onClick={endTour}
            className="flex h-8 items-center gap-1 rounded-md px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X aria-hidden className="size-3.5" />
            esc
          </button>
        </div>
      </div>
    </section>
  );
};
