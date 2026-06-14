"use client";

import { useCallback, useEffect, useState } from "react";
import { useReactFlow, useViewport } from "@xyflow/react";
import { Crosshair, X } from "lucide-react";
import { useCamera } from "../canvas/use-camera";

const ONBOARDED_STORAGE_KEY = "signal-graph-onboarded";
const ONBOARDING_AUTO_HIDE_MS = 12_000;

const NODE_FALLBACK_WIDTH = 320;
const NODE_FALLBACK_HEIGHT = 240;

// The canvas tree renders client-only (dynamic ssr:false), so the initializer
// can read localStorage directly; the guard keeps it safe if that ever changes.
const readOnboarded = (): boolean => {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    return window.localStorage.getItem(ONBOARDED_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
};

/** One-time control hint shown until the visitor dismisses it or it times out. */
export const OnboardingHint = () => {
  const [visible, setVisible] = useState(() => !readOnboarded());

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      window.localStorage.setItem(ONBOARDED_STORAGE_KEY, "1");
    } catch {
      // Storage may be unavailable (private mode); the hint simply reappears next visit.
    }
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const timeout = window.setTimeout(dismiss, ONBOARDING_AUTO_HIDE_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [visible, dismiss]);

  if (!visible) {
    return null;
  }

  return (
    <div className="absolute left-1/2 top-16 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border bg-background/85 px-4 py-2 backdrop-blur-md">
      <p className="font-mono text-[11px] text-muted-foreground">
        drag to pan · scroll to zoom · click a node to inspect
      </p>
      <button
        type="button"
        aria-label="Dismiss hint"
        onClick={dismiss}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <X aria-hidden className="size-3.5" />
      </button>
    </div>
  );
};

/** Rescue affordance shown only when the visitor has panned every node off-screen. */
export const RecenterHint = () => {
  const { x, y, zoom } = useViewport();
  const { getNodes } = useReactFlow();
  const camera = useCamera();

  const nodes = getNodes();

  if (nodes.length === 0) {
    return null;
  }

  const safeZoom = Math.max(zoom, 0.01);
  const minX = -x / safeZoom;
  const minY = -y / safeZoom;
  const maxX = minX + window.innerWidth / safeZoom;
  const maxY = minY + window.innerHeight / safeZoom;

  const anyNodeVisible = nodes.some((node) => {
    const width = node.measured?.width ?? NODE_FALLBACK_WIDTH;
    const height = node.measured?.height ?? NODE_FALLBACK_HEIGHT;

    return (
      node.position.x < maxX &&
      node.position.x + width > minX &&
      node.position.y < maxY &&
      node.position.y + height > minY
    );
  });

  if (anyNodeVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => camera.fitGraph()}
      className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-background/90 px-4 py-2.5 font-mono text-[12px] shadow-md backdrop-blur-md transition-colors hover:border-primary/50"
    >
      <Crosshair aria-hidden className="size-4 text-primary" />
      re-center graph
    </button>
  );
};
