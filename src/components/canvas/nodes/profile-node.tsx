"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { PROFILE_CONTENT, PROFILE_IMAGE } from "../../../data/portfolio-content";
import type { GraphNode } from "../graph";
import { NodeCard } from "../node-card";
import { NodePorts } from "../node-ports";

/** The hub module: larger than standard nodes, carries the avatar and focus stack. */
const ProfileNodeComponent = ({ data }: NodeProps<GraphNode>) => (
  <NodeCard
    kind="profile"
    enterDelay={data.enterDelay}
    className="w-[340px]"
    ports={<NodePorts orientation={data.orientation} hasIn hasOut />}
  >
    <NodeCard.Eyebrow>core / profile</NodeCard.Eyebrow>
    <div className="flex items-center gap-4 px-5 pt-3">
      <img
        src={PROFILE_IMAGE.node.src}
        alt={PROFILE_IMAGE.node.alt}
        width={64}
        height={64}
        loading="eager"
        className="size-16 shrink-0 rounded-lg border object-cover"
      />
      <div className="min-w-0">
        <h2 className="text-xl font-bold leading-tight tracking-tight">
          {PROFILE_CONTENT.name}
        </h2>
        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
          {PROFILE_CONTENT.title}
        </p>
      </div>
    </div>
    <NodeCard.Body>
      <p className="text-[13px] leading-snug text-muted-foreground">
        {PROFILE_CONTENT.shortSummary}
      </p>
      <NodeCard.ChipRow>
        {PROFILE_CONTENT.focusStack.map((tech) => (
          <NodeCard.Chip key={tech}>{tech}</NodeCard.Chip>
        ))}
      </NodeCard.ChipRow>
    </NodeCard.Body>
    <NodeCard.Footer>
      <span>islamabad · utc+5</span>
      <NodeCard.InspectTrigger label="Inspect profile details" />
    </NodeCard.Footer>
  </NodeCard>
);

export const ProfileNode = memo(ProfileNodeComponent);
