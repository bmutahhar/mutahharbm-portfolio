"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { ReactFlow, ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import type { CoordinateExtent } from "@xyflow/react";
import { CommandMenu } from "../chrome/command-menu";
import { Dock } from "../chrome/dock";
import { OnboardingHint, RecenterHint } from "../chrome/hints";
import { StatusReadout } from "../chrome/status-readout";
import { TopBar } from "../chrome/top-bar";
import { TourCaption, TourCamera } from "../chrome/tour";
import { Inspector } from "../inspector/inspector";
import { CanvasBackground } from "./canvas-background";
import { CanvasProvider } from "./canvas-provider";
import type { GraphNode, SignalEdge as SignalEdgeType } from "./graph";
import { ContactNode } from "./nodes/contact-node";
import { EducationNode } from "./nodes/education-node";
import { ExperienceNode } from "./nodes/experience-node";
import { ImpactNode } from "./nodes/impact-node";
import { ProfileNode } from "./nodes/profile-node";
import { ResumeNode } from "./nodes/resume-node";
import { SkillsNode } from "./nodes/skills-node";
import { WorkNode } from "./nodes/work-node";
import { SignalEdge } from "./signal-edge";
import { useCamera } from "./use-camera";
import { useCanvasLayout } from "./use-canvas-layout";

const nodeTypes = {
  profile: ProfileNode,
  skills: SkillsNode,
  experience: ExperienceNode,
  work: WorkNode,
  impact: ImpactNode,
  education: EducationNode,
  contact: ContactNode,
  resume: ResumeNode,
};

const edgeTypes = {
  signal: SignalEdge,
};

const BOOT_PULLBACK_DELAY_MS = 700;
const BOOT_PULLBACK_DURATION_MS = 1100;
// Must comfortably exceed the visible flow area at minZoom on large screens,
// or d3 pins the viewport against the extent and camera moves stop applying.
const EXTENT_MARGIN = 4000;

const cloneNodes = (nodes: GraphNode[]): GraphNode[] =>
  nodes.map((node) => ({ ...node, position: { ...node.position }, data: { ...node.data } }));

const cloneEdges = (edges: SignalEdgeType[]): SignalEdgeType[] => edges.map((edge) => ({ ...edge }));

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const CanvasFlow = () => {
  const { orientation, nodes: layoutNodes, edges: layoutEdges } = useCanvasLayout();
  const [nodes, setNodes, onNodesChange] = useNodesState(cloneNodes(layoutNodes));
  const [edges, setEdges, onEdgesChange] = useEdgesState(cloneEdges(layoutEdges));
  const camera = useCamera();
  const pullbackTimeout = useRef<number | null>(null);

  // Bounds the pannable area so visitors cannot scroll the graph out of reach.
  const translateExtent = useMemo<CoordinateExtent>(() => {
    const xs = layoutNodes.map((node) => node.position.x);
    const ys = layoutNodes.map((node) => node.position.y);

    return [
      [Math.min(...xs) - EXTENT_MARGIN, Math.min(...ys) - EXTENT_MARGIN],
      [Math.max(...xs) + EXTENT_MARGIN, Math.max(...ys) + EXTENT_MARGIN],
    ];
  }, [layoutNodes]);

  // Boot move: open on the profile module, then pull back to reveal the pipeline.
  const handleInit = useCallback(() => {
    if (prefersReducedMotion()) {
      camera.fitGraph({ duration: 0 });

      return;
    }

    camera.focusNode("profile", { duration: 0 });
    pullbackTimeout.current = window.setTimeout(() => {
      camera.fitGraph({ duration: BOOT_PULLBACK_DURATION_MS });
    }, BOOT_PULLBACK_DELAY_MS);
  }, [camera]);

  useEffect(
    () => () => {
      if (pullbackTimeout.current !== null) {
        window.clearTimeout(pullbackTimeout.current);
      }
    },
    [],
  );

  // Swap layouts when the viewport crosses the row/column breakpoint.
  const isFirstLayout = useRef(true);
  useEffect(() => {
    if (isFirstLayout.current) {
      isFirstLayout.current = false;

      return;
    }

    setNodes(cloneNodes(layoutNodes));
    setEdges(cloneEdges(layoutEdges));
    // Wait a frame so the swapped layout is measured before framing it.
    const frame = window.requestAnimationFrame(() => {
      camera.fitGraph({ duration: 0 });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [orientation, layoutNodes, layoutEdges, setNodes, setEdges, camera]);

  return (
    <ReactFlow
      aria-label="Interactive portfolio graph"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onInit={handleInit}
      translateExtent={translateExtent}
      minZoom={0.2}
      maxZoom={1.6}
      panOnDrag={[0, 1, 2]}
      panOnScroll
      zoomOnPinch
      selectionOnDrag={false}
      nodesDraggable
      nodesConnectable={false}
      deleteKeyCode={null}
      defaultEdgeOptions={{ zIndex: 0 }}
      proOptions={{ hideAttribution: true }}
    >
      <CanvasBackground />
    </ReactFlow>
  );
};

const CanvasRoot = () => (
  <ReactFlowProvider>
    <CanvasProvider>
      <div className="relative h-dvh w-screen overflow-hidden">
        <CanvasFlow />
        <TopBar />
        <Dock />
        <StatusReadout />
        <RecenterHint />
        <OnboardingHint />
        <TourCamera />
        <TourCaption />
        <CommandMenu />
        <Inspector />
      </div>
    </CanvasProvider>
  </ReactFlowProvider>
);

export default CanvasRoot;
