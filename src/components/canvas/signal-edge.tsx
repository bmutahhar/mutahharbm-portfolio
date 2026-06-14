"use client";

import { memo } from "react";
import { BaseEdge, getBezierPath } from "@xyflow/react";
import type { EdgeProps } from "@xyflow/react";
import { useActiveTourKind } from "./canvas-provider";
import type { SignalEdge as SignalEdgeType } from "./graph";

const EDGE_CURVATURE = 0.32;

/**
 * Hairline bezier with an animated dash "signal" tinted by the source node's kind.
 * When the tour reaches an edge's target, the edge brightens as if executing.
 */
const SignalEdgeComponent = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<SignalEdgeType>) => {
  const activeTourKind = useActiveTourKind();
  const isExecuting = data !== undefined && activeTourKind === data.targetKind;
  const accent = data === undefined ? "var(--primary)" : `var(--kind-${data.sourceKind})`;

  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    curvature: EDGE_CURVATURE,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{ stroke: "var(--edge-rest)", strokeWidth: 1.25 }}
      />
      <path
        d={path}
        fill="none"
        className="signal-edge-flow"
        style={{
          stroke: accent,
          strokeWidth: isExecuting ? 2 : 1.25,
          opacity: isExecuting ? 1 : 0.55,
          transition: "opacity 0.3s, stroke-width 0.3s",
        }}
      />
      <circle r={isExecuting ? 3.5 : 2.5} fill={accent}>
        <animateMotion dur="3.2s" repeatCount="indefinite" path={path} />
      </circle>
    </>
  );
};

export const SignalEdge = memo(SignalEdgeComponent);
