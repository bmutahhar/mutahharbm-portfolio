"use client";

import { Handle, Position } from "@xyflow/react";
import { cn } from "../ui/utils";
import type { GraphOrientation } from "./graph";

type NodePortsProps = {
  orientation: GraphOrientation;
  hasIn?: boolean;
  hasOut?: boolean;
};

const PORT_CLASS = cn(
  "!size-2.5 !rounded-full !border-[1.5px] !border-[color:var(--node-accent)] !bg-background",
  "port-pulse",
);

/**
 * Typed in/out sockets for a node. Connections are static, so the handles are
 * presentation only — they exist to look and behave like real editor ports.
 * Renders inside <NodeCard> to inherit the kind accent via --node-accent.
 */
export const NodePorts = ({ orientation, hasIn = false, hasOut = false }: NodePortsProps) => {
  const inPosition = orientation === "row" ? Position.Left : Position.Top;
  const outPosition = orientation === "row" ? Position.Right : Position.Bottom;

  return (
    <>
      {hasIn ? (
        <Handle type="target" position={inPosition} isConnectable={false} className={PORT_CLASS} />
      ) : null}
      {hasOut ? (
        <Handle type="source" position={outPosition} isConnectable={false} className={PORT_CLASS} />
      ) : null}
    </>
  );
};
