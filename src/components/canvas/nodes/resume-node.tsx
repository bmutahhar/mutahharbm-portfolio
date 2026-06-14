"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { FileText } from "lucide-react";
import type { GraphNode } from "../graph";
import { NodeCard } from "../node-card";
import { NodePorts } from "../node-ports";

/** Terminal artifact: the pipeline's compiled output, so it only has an in port. */
const ResumeNodeComponent = ({ data }: NodeProps<GraphNode>) => (
  <NodeCard
    kind="resume"
    enterDelay={data.enterDelay}
    className="w-[280px]"
    ports={<NodePorts orientation={data.orientation} hasIn />}
  >
    <NodeCard.Eyebrow>artifact / resume</NodeCard.Eyebrow>
    <NodeCard.Title>resume.pdf</NodeCard.Title>
    <NodeCard.Body>
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-md border bg-background/60 text-[color:var(--node-accent)]">
          <FileText aria-hidden className="size-5" />
        </span>
        <p className="text-[12px] leading-snug text-muted-foreground">
          The whole pipeline, compiled to a single document.
        </p>
      </div>
    </NodeCard.Body>
    <NodeCard.Footer>
      <span>pdf · a4</span>
      <NodeCard.InspectTrigger label="Inspect resume" />
    </NodeCard.Footer>
  </NodeCard>
);

export const ResumeNode = memo(ResumeNodeComponent);
