"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { EXPERIENCE_ENTRIES } from "../../../data/portfolio-content";
import type { GraphNode } from "../graph";
import { NodeCard } from "../node-card";
import { NodePorts } from "../node-ports";

const LATEST_ROLE = EXPERIENCE_ENTRIES[0];

const ExperienceNodeComponent = ({ data }: NodeProps<GraphNode>) => (
  <NodeCard
    kind="experience"
    enterDelay={data.enterDelay}
    className="w-[300px]"
    ports={<NodePorts orientation={data.orientation} hasIn hasOut />}
  >
    <NodeCard.Eyebrow>stage / experience</NodeCard.Eyebrow>
    <NodeCard.Title>Experience</NodeCard.Title>
    <NodeCard.Body>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold">{LATEST_ROLE.role}</p>
        <p className="truncate font-mono text-[11px] text-muted-foreground">
          {LATEST_ROLE.company} · {LATEST_ROLE.period}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <NodeCard.Stat value="4+" label="years" />
        <NodeCard.Stat value={String(EXPERIENCE_ENTRIES.length)} label="roles" />
      </div>
    </NodeCard.Body>
    <NodeCard.Footer>
      <span>2021 — present</span>
      <NodeCard.InspectTrigger label="Inspect experience timeline" />
    </NodeCard.Footer>
  </NodeCard>
);

export const ExperienceNode = memo(ExperienceNodeComponent);
