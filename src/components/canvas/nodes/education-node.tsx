"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { EDUCATION_CONTENT } from "../../../data/portfolio-content";
import type { GraphNode } from "../graph";
import { NodeCard } from "../node-card";
import { NodePorts } from "../node-ports";

const EducationNodeComponent = ({ data }: NodeProps<GraphNode>) => (
  <NodeCard
    kind="education"
    enterDelay={data.enterDelay}
    className="w-[280px]"
    ports={<NodePorts orientation={data.orientation} hasOut />}
  >
    <NodeCard.Eyebrow>input / education</NodeCard.Eyebrow>
    <NodeCard.Title>Education</NodeCard.Title>
    <NodeCard.Body>
      <p className="text-[13px] font-semibold leading-snug">{EDUCATION_CONTENT.degree}</p>
      <p className="font-mono text-[11px] text-muted-foreground">{EDUCATION_CONTENT.institution}</p>
      <div className="grid grid-cols-2 gap-2">
        <NodeCard.Stat value={EDUCATION_CONTENT.graduationYear} label="graduated" />
        <NodeCard.Stat value={EDUCATION_CONTENT.cgpa} label="cgpa" />
      </div>
    </NodeCard.Body>
    <NodeCard.Footer>
      <span>comsats university</span>
      <NodeCard.InspectTrigger label="Inspect education" />
    </NodeCard.Footer>
  </NodeCard>
);

export const EducationNode = memo(EducationNodeComponent);
