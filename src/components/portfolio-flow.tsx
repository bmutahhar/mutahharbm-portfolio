"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Edge, Node } from "@xyflow/react";
import {
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import {
  desktopEdges,
  desktopNodes,
  type FlowNodeData,
  mobileEdges,
  mobileNodes,
  tabletEdges,
  tabletNodes,
} from "../data/flow-layout-data";
import { CustomCursor } from "./custom-cursor";
import { DotBackground } from "./dot-background";
import { GlowingEdge } from "./glowing-edge";
import { ContactNode } from "./nodes/contact-node";
import { EducationNode } from "./nodes/education-node";
import { ExperienceNode } from "./nodes/experience-node";
import { ImpactNode } from "./nodes/impact-node";
import { ProfileNode } from "./nodes/profile-node";
import { ResumeNode } from "./nodes/resume-node";
import { SkillsNode } from "./nodes/skills-node";
import { WorkNode } from "./nodes/work-node";
import { PortfolioNavbar } from "./portfolio-navbar";

const FLOW_PADDING = 0.24;
const DESKTOP_MIN_WIDTH = 1024;
const TABLET_MIN_WIDTH = 768;

const nodeTypes = {
  "profile-node": ProfileNode,
  "impact-node": ImpactNode,
  "work-node": WorkNode,
  "experience-node": ExperienceNode,
  "skills-node": SkillsNode,
  "education-node": EducationNode,
  "contact-node": ContactNode,
  "resume-node": ResumeNode,
};

const edgeTypes = {
  glow: GlowingEdge,
};

const cloneNodes = (nodes: Array<Node<FlowNodeData>>) =>
  nodes.map((node) => ({
    ...node,
    position: { ...node.position },
    data: { ...node.data },
  }));

const cloneEdges = (edges: Array<Edge>) => edges.map((edge) => ({ ...edge }));

type ViewportMode = "desktop" | "tablet" | "mobile";

const getViewportMode = (): ViewportMode => {
  if (typeof window === "undefined") {
    return "desktop";
  }

  if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
    return "desktop";
  }

  if (window.innerWidth >= TABLET_MIN_WIDTH) {
    return "tablet";
  }

  return "mobile";
};

const FlowContent = () => {
  const [viewportMode, setViewportMode] = useState<ViewportMode>(getViewportMode);

  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(cloneNodes(desktopNodes));
  const [edges, setEdges, onEdgesChange] = useEdgesState(cloneEdges(desktopEdges));

  const activeLayout = useMemo(
    () => ({
      nodes:
        viewportMode === "desktop"
          ? desktopNodes
          : viewportMode === "tablet"
            ? tabletNodes
            : mobileNodes,
      edges: viewportMode === "desktop" ? desktopEdges : viewportMode === "tablet" ? tabletEdges : mobileEdges,
    }),
    [viewportMode],
  );
  const activeNodeIds = useMemo(
    () => activeLayout.nodes.map((node) => ({ id: node.id })),
    [activeLayout.nodes],
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportMode(getViewportMode());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setNodes(cloneNodes(activeLayout.nodes));
    setEdges(cloneEdges(activeLayout.edges));
    const frame = window.requestAnimationFrame(() => {
      fitView({
        nodes: activeNodeIds,
        padding: FLOW_PADDING,
        duration: 0,
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [activeLayout, activeNodeIds, fitView, setEdges, setNodes]);

  const handleNavigate = useCallback(
    (nodeId: string) => {
      fitView({
        nodes: [{ id: nodeId }],
        duration: 800,
        padding: 0.5,
      });
    },
    [fitView],
  );
  const handleResetView = useCallback(() => {
    fitView({
      nodes: activeNodeIds,
      duration: 800,
      padding: FLOW_PADDING,
    });
  }, [activeNodeIds, fitView]);

  return (
    <>
      <CustomCursor />
      <PortfolioNavbar onNavigate={handleNavigate} onResetView={handleResetView} />

      <div className="relative h-screen w-screen overflow-hidden pt-[73px]">
        <DotBackground />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={{ zIndex: 0 }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: FLOW_PADDING }}
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
          className="relative z-[2]"
          nodesDraggable={true}
          nodesConnectable={false}
          panOnDrag={[0, 1, 2]}
          panOnScroll={true}
          selectionOnDrag={false}
          zoomOnScroll={true}
        />
      </div>
    </>
  );
};

const App = () => {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
};

export default App;
