"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
} from "../data/flow-layout-data";
import { CustomCursor } from "./custom-cursor";
import { DotBackground } from "./dot-background";
import { GlowingEdge } from "./glowing-edge";
import { LoadingScreen } from "./loading-screen";
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
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

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

const getIsDesktop = () =>
  typeof window !== "undefined" && window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

const FlowContent = () => {
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const hasBootstrappedRef = useRef(false);
  const loadingTimeoutRef = useRef<number | null>(null);

  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(cloneNodes(desktopNodes));
  const [edges, setEdges, onEdgesChange] = useEdgesState(cloneEdges(desktopEdges));

  const activeLayout = useMemo(
    () => ({
      nodes: isDesktop ? desktopNodes : mobileNodes,
      edges: isDesktop ? desktopEdges : mobileEdges,
    }),
    [isDesktop],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    setNodes(cloneNodes(activeLayout.nodes));
    setEdges(cloneEdges(activeLayout.edges));
    const frame = window.requestAnimationFrame(() => {
      fitView({
        nodes: activeLayout.nodes.map((node) => ({ id: node.id })),
        padding: FLOW_PADDING,
        duration: 0,
      });

      if (!hasBootstrappedRef.current) {
        hasBootstrappedRef.current = true;
        loadingTimeoutRef.current = window.setTimeout(() => {
          setShowLoadingScreen(false);
        }, 650);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [activeLayout, fitView, setEdges, setNodes]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current !== null) {
        window.clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

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

  return (
    <>
      <CustomCursor />
      <PortfolioNavbar onNavigate={handleNavigate} />

      <div className="relative h-screen w-screen overflow-hidden pt-[73px]">
        <DotBackground />
        <LoadingScreen visible={showLoadingScreen} />

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
