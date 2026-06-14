"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { CONTACT_LINKS } from "../../../data/portfolio-content";
import type { GraphNode } from "../graph";
import { NodeCard } from "../node-card";
import { NodePorts } from "../node-ports";

const EMAIL_LINK = CONTACT_LINKS.find((link) => link.id === "email");

const ContactNodeComponent = ({ data }: NodeProps<GraphNode>) => (
  <NodeCard
    kind="contact"
    enterDelay={data.enterDelay}
    className="w-[300px]"
    ports={<NodePorts orientation={data.orientation} hasIn />}
  >
    <NodeCard.Eyebrow>output / contact</NodeCard.Eyebrow>
    <NodeCard.Title>Get In Touch</NodeCard.Title>
    <NodeCard.Body>
      <p className="text-[13px] leading-snug text-muted-foreground">
        Have an interesting problem or a role in mind? The inbox is open.
      </p>
      {EMAIL_LINK ? (
        <p className="font-mono text-[11px] text-foreground/80">{EMAIL_LINK.value}</p>
      ) : null}
    </NodeCard.Body>
    <NodeCard.Footer>
      <span>email · linkedin · github</span>
      <NodeCard.InspectTrigger label="Inspect contact options" />
    </NodeCard.Footer>
  </NodeCard>
);

export const ContactNode = memo(ContactNodeComponent);
