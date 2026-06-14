"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { WORK_PROJECTS } from "../../../data/portfolio-content";
import type { GraphNode } from "../graph";
import { NodeCard } from "../node-card";
import { NodePorts } from "../node-ports";

const FEATURED_PROJECT = WORK_PROJECTS[0];

const WorkNodeComponent = ({ data }: NodeProps<GraphNode>) => (
  <NodeCard
    kind="work"
    enterDelay={data.enterDelay}
    className="w-[320px]"
    ports={<NodePorts orientation={data.orientation} hasIn hasOut />}
  >
    <NodeCard.Eyebrow>stage / work</NodeCard.Eyebrow>
    <NodeCard.Title>Selected Work</NodeCard.Title>
    <NodeCard.Body>
      <div>
        <p className="text-[13px] font-semibold leading-snug">{FEATURED_PROJECT.title}</p>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-muted-foreground">
          {FEATURED_PROJECT.outcome}
        </p>
      </div>
      <NodeCard.ChipRow>
        {FEATURED_PROJECT.tech.map((tech) => (
          <NodeCard.Chip key={tech}>{tech}</NodeCard.Chip>
        ))}
      </NodeCard.ChipRow>
    </NodeCard.Body>
    <NodeCard.Footer>
      <span>{WORK_PROJECTS.length} projects</span>
      <NodeCard.InspectTrigger label="Inspect selected work" />
    </NodeCard.Footer>
  </NodeCard>
);

export const WorkNode = memo(WorkNodeComponent);
