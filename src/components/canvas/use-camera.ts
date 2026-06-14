"use client";

import { useMemo } from "react";
import { useReactFlow } from "@xyflow/react";
import type { Rect } from "@xyflow/react";

// Camera moves deliberately avoid react-flow's fitView/fitBounds: fitView is
// queue-based in v12 and never flushes while the controlled node array is
// static, and fitBounds breaks when the container is measured mid-mount. The
// canvas always fills the window, so the viewport math runs on window
// dimensions and applies through the direct setViewport/setCenter APIs.

export const FIT_GRAPH_PADDING = 0.15;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 1.6;
const FOCUS_MAX_ZOOM = 1.1;
const FOCUS_VIEWPORT_SHARE = 0.55;
const FALLBACK_NODE_WIDTH = 320;
const FALLBACK_NODE_HEIGHT = 240;

type CameraOptions = {
  duration?: number;
};

export type Camera = {
  /** Frame the whole graph, like an editor's "fit view". */
  fitGraph: (options?: CameraOptions) => void;
  /** Center one node at a readable zoom. */
  focusNode: (id: string, options?: CameraOptions) => void;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const useCamera = (): Camera => {
  const { getNodes, setViewport, setCenter } = useReactFlow();

  return useMemo<Camera>(() => {
    const nodeRect = (node: ReturnType<typeof getNodes>[number]): Rect => ({
      x: node.position.x,
      y: node.position.y,
      width: node.measured?.width ?? node.width ?? FALLBACK_NODE_WIDTH,
      height: node.measured?.height ?? node.height ?? FALLBACK_NODE_HEIGHT,
    });

    // A zero-sized window (preview iframes, headless rendering) would produce a
    // degenerate transform that d3 then pins permanently.
    const hasViewport = () => window.innerWidth > 0 && window.innerHeight > 0;

    return {
      fitGraph: (options) => {
        const nodes = getNodes();

        if (nodes.length === 0 || !hasViewport()) {
          return;
        }

        const rects = nodes.map(nodeRect);
        const minX = Math.min(...rects.map((rect) => rect.x));
        const minY = Math.min(...rects.map((rect) => rect.y));
        const maxX = Math.max(...rects.map((rect) => rect.x + rect.width));
        const maxY = Math.max(...rects.map((rect) => rect.y + rect.height));

        const usableWidth = window.innerWidth * (1 - FIT_GRAPH_PADDING * 2);
        const usableHeight = window.innerHeight * (1 - FIT_GRAPH_PADDING * 2);
        const zoom = clamp(
          Math.min(usableWidth / (maxX - minX), usableHeight / (maxY - minY)),
          MIN_ZOOM,
          MAX_ZOOM,
        );

        void setViewport(
          {
            x: window.innerWidth / 2 - ((minX + maxX) / 2) * zoom,
            y: window.innerHeight / 2 - ((minY + maxY) / 2) * zoom,
            zoom,
          },
          { duration: options?.duration ?? 800 },
        );
      },
      focusNode: (id, options) => {
        const node = getNodes().find((candidate) => candidate.id === id);

        if (node === undefined || !hasViewport()) {
          return;
        }

        const rect = nodeRect(node);
        const zoom = clamp(
          Math.min(
            (window.innerWidth * FOCUS_VIEWPORT_SHARE) / rect.width,
            (window.innerHeight * FOCUS_VIEWPORT_SHARE) / rect.height,
          ),
          MIN_ZOOM,
          FOCUS_MAX_ZOOM,
        );

        void setCenter(rect.x + rect.width / 2, rect.y + rect.height / 2, {
          zoom,
          duration: options?.duration ?? 750,
        });
      },
    };
  }, [getNodes, setViewport, setCenter]);
};
