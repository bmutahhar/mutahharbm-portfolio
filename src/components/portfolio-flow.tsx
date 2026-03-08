"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Edge, Node } from "@xyflow/react";
import {
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useViewport,
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
const NAVBAR_HEIGHT = 73;
const CANVAS_MULTIPLIER = 3;
const FALLBACK_NODE_WIDTH = 200;
const FALLBACK_NODE_HEIGHT = 200;

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
type FlowExtent = [[number, number], [number, number]];
type ViewportSize = {
  width: number;
  height: number;
};

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

const getViewportSize = (): ViewportSize => {
  if (typeof window === "undefined") {
    return { width: DESKTOP_MIN_WIDTH, height: 900 - NAVBAR_HEIGHT };
  }

  return {
    width: window.innerWidth,
    height: Math.max(window.innerHeight - NAVBAR_HEIGHT, 0),
  };
};

const getFlowExtent = (
  layoutNodes: Array<Node<FlowNodeData>>,
  viewportSize: ViewportSize,
  zoom: number,
): FlowExtent => {
  const safeZoom = Math.max(zoom, 0.01);
  const visibleFlowWidth = viewportSize.width / safeZoom;
  const visibleFlowHeight = viewportSize.height / safeZoom;

  if (layoutNodes.length === 0) {
    return [
      [0, 0],
      [visibleFlowWidth * CANVAS_MULTIPLIER, visibleFlowHeight * CANVAS_MULTIPLIER],
    ];
  }

  const bounds = layoutNodes.reduce(
    (acc, node) => {
      const nodeWidth = node.measured?.width ?? node.width ?? FALLBACK_NODE_WIDTH;
      const nodeHeight = node.measured?.height ?? node.height ?? FALLBACK_NODE_HEIGHT;

      return {
        minX: Math.min(acc.minX, node.position.x),
        minY: Math.min(acc.minY, node.position.y),
        maxX: Math.max(acc.maxX, node.position.x + nodeWidth),
        maxY: Math.max(acc.maxY, node.position.y + nodeHeight),
      };
    },
    {
      minX: Number.POSITIVE_INFINITY,
      minY: Number.POSITIVE_INFINITY,
      maxX: Number.NEGATIVE_INFINITY,
      maxY: Number.NEGATIVE_INFINITY,
    },
  );

  const contentWidth = bounds.maxX - bounds.minX;
  const contentHeight = bounds.maxY - bounds.minY;
  const boundedWidth = Math.max(contentWidth, visibleFlowWidth * CANVAS_MULTIPLIER);
  const boundedHeight = Math.max(contentHeight, visibleFlowHeight * CANVAS_MULTIPLIER);
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;

  return [
    [centerX - boundedWidth / 2, centerY - boundedHeight / 2],
    [centerX + boundedWidth / 2, centerY + boundedHeight / 2],
  ];
};

const FlowContent = () => {
  const [viewportMode, setViewportMode] = useState<ViewportMode>(getViewportMode);
  const [viewportSize, setViewportSize] = useState<ViewportSize>(getViewportSize);

  const { fitView } = useReactFlow();
  const { zoom } = useViewport();
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
      edges:
        viewportMode === "desktop"
          ? desktopEdges
          : viewportMode === "tablet"
            ? tabletEdges
            : mobileEdges,
    }),
    [viewportMode],
  );
  const activeNodeIds = useMemo(
    () => activeLayout.nodes.map((node) => ({ id: node.id })),
    [activeLayout.nodes],
  );
  const flowExtent = useMemo(
    () => getFlowExtent(activeLayout.nodes, viewportSize, zoom),
    [activeLayout.nodes, viewportSize, zoom],
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportMode(getViewportMode());
      setViewportSize(getViewportSize());
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
          translateExtent={flowExtent}
          nodeExtent={flowExtent}
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
