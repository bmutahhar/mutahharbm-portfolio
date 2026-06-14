"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { IMPACT_METRICS } from "../../../data/portfolio-content";
import type { GraphNode } from "../graph";
import { NodeCard } from "../node-card";
import { NodePorts } from "../node-ports";

const PREVIEW_METRICS = IMPACT_METRICS.slice(0, 4);

const ImpactNodeComponent = ({ data }: NodeProps<GraphNode>) => (
  <NodeCard
    kind="impact"
    enterDelay={data.enterDelay}
    className="w-[300px]"
    ports={<NodePorts orientation={data.orientation} hasIn hasOut />}
  >
    <NodeCard.Eyebrow>output / impact</NodeCard.Eyebrow>
    <NodeCard.Title>Measured Impact</NodeCard.Title>
    <NodeCard.Body>
      <div className="grid grid-cols-2 gap-2">
        {PREVIEW_METRICS.map((metric) => (
          <NodeCard.Stat key={metric.id} value={metric.value} label={metric.label} />
        ))}
      </div>
    </NodeCard.Body>
    <NodeCard.Footer>
      <span>{IMPACT_METRICS.length} metrics</span>
      <NodeCard.InspectTrigger label="Inspect impact metrics" />
    </NodeCard.Footer>
  </NodeCard>
);

export const ImpactNode = memo(ImpactNodeComponent);
