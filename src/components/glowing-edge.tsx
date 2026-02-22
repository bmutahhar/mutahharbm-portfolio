import { BaseEdge, type EdgeProps, Position, getBezierPath } from "@xyflow/react";
import { memo } from "react";

export const GlowingEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) => {
  const flowDuration = "3.4s";
  const halfOffset = "-1.7s";

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: sourcePosition ?? Position.Right,
    targetPosition: targetPosition ?? Position.Left,
    curvature: 0.28,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "var(--primary)",
          strokeOpacity: 0.32,
          strokeWidth: 2.2,
          filter: "drop-shadow(0 0 6px rgb(110 158 117 / 0.32))",
        }}
      />

      <path
        d={edgePath}
        fill="none"
        stroke="var(--primary)"
        strokeOpacity={0.4}
        strokeWidth={1.2}
        strokeLinecap="round"
      />

      <circle r="2.1" fill="var(--primary)" opacity="0">
        <animateMotion
          path={edgePath}
          dur={flowDuration}
          repeatCount="indefinite"
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.1;0.9;1"
          dur={flowDuration}
          repeatCount="indefinite"
        />
      </circle>

      <circle r="2.1" fill="var(--primary)" opacity="0">
        <animateMotion
          path={edgePath}
          dur={flowDuration}
          repeatCount="indefinite"
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
          begin={halfOffset}
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.1;0.9;1"
          dur={flowDuration}
          repeatCount="indefinite"
          begin={halfOffset}
        />
      </circle>
    </>
  );
});

GlowingEdge.displayName = "GlowingEdge";
