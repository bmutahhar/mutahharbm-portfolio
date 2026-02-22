"use client";

import { lazy, Suspense, useState, useCallback } from "react";
import type { ComponentType } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  NodeProps,
  Handle,
  Position,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import {
  User,
  Briefcase,
  TrendingUp,
  Code2,
  GraduationCap,
  Mail,
  Sparkles,
} from "lucide-react";
import { PortfolioNavbar } from "./portfolio-navbar";
import { CustomCursor } from "./custom-cursor";

type SectionNodeData = {
  delay?: number;
  description: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
};

const ImpactDialog = lazy(() =>
  import("./dialogs/impact-dialog").then((module) => ({ default: module.ImpactDialog })),
);
const WorkDialog = lazy(() =>
  import("./dialogs/work-dialog").then((module) => ({ default: module.WorkDialog })),
);
const ExperienceDialog = lazy(() =>
  import("./dialogs/experience-dialog").then((module) => ({
    default: module.ExperienceDialog,
  })),
);
const SkillsDialog = lazy(() =>
  import("./dialogs/skills-dialog").then((module) => ({ default: module.SkillsDialog })),
);
const EducationDialog = lazy(() =>
  import("./dialogs/education-dialog").then((module) => ({
    default: module.EducationDialog,
  })),
);
const ContactDialog = lazy(() =>
  import("./dialogs/contact-dialog").then((module) => ({ default: module.ContactDialog })),
);
const ProfileDialog = lazy(() =>
  import("./dialogs/profile-dialog").then((module) => ({ default: module.ProfileDialog })),
);

// Section Node Component with enhanced animations
function SectionNode({ data }: NodeProps<Node<SectionNodeData>>) {
  const Icon = data.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{
        delay: data.delay || 0,
        duration: 0.8,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ 
        scale: 1.08,
        transition: { duration: 0.3 }
      }}
      onClick={() => data.onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-card/80 backdrop-blur-md border-2 border-primary/20 hover:border-primary/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[200px] min-h-[200px] flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden"
    >
      {/* Handles for connecting edges */}
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <Handle type="source" position={Position.Right} className="opacity-0" />
      
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.4 }}
      />
      
      
      
      
        {/* Icon with rotation on hover */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center shadow-lg"
        >
          <Icon className="w-10 h-10 text-primary drop-shadow-lg" />
          
          {/* Particle effect on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * Math.PI * 2) / 6) * 40,
                      y: Math.sin((i * Math.PI * 2) / 6) * 40,
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    className="absolute w-2 h-2 rounded-full bg-primary/60"
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Label with gradient text */}
        <div className="relative text-center">
          <h3 className="text-lg font-semibold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent mb-1">
            {data.label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {data.description}
          </p>
        </div>
     
      
      {/* Ripple effect on click */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 3, opacity: 0 }}
        className="absolute inset-0 rounded-3xl border-2 border-primary pointer-events-none"
      />
      
      {/* Hover indicator with shimmer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
      >
        Click to explore
      </motion.div>
    </motion.button>
  );
}

const nodeTypes = {
  section: SectionNode,
};

function FlowContent() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const { fitView } = useReactFlow();
  const handleDialogOpenChange = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      setOpenDialog(null);
    }
  }, []);

  const handleNavigate = useCallback((nodeId: string) => {
    fitView({
      nodes: [{ id: nodeId }],
      duration: 800,
      padding: 0.5,
    });
  }, [fitView]);

  const initialNodes: Node<SectionNodeData>[] = [
    {
      id: "profile",
      type: "section",
      position: { x: 800, y: 50 },
      data: {
        label: "Mutahhar Bin Muzaffar",
        description: "Frontend Engineer",
        icon: User,
        onClick: () => setOpenDialog("profile"),
        delay: 0,
      },
    },
    {
      id: "impact",
      type: "section",
      position: { x: 200, y: 350 },
      data: {
        label: "Impact Metrics",
        description: "Quantified Outcomes",
        icon: TrendingUp,
        onClick: () => setOpenDialog("impact"),
        delay: 0.1,
      },
    },
    {
      id: "work",
      type: "section",
      position: { x: 800, y: 350 },
      data: {
        label: "Selected Work",
        description: "Featured Projects",
        icon: Briefcase,
        onClick: () => setOpenDialog("work"),
        delay: 0.15,
      },
    },
    {
      id: "experience",
      type: "section",
      position: { x: 1400, y: 350 },
      data: {
        label: "Experience",
        description: "Career Timeline",
        icon: Sparkles,
        onClick: () => setOpenDialog("experience"),
        delay: 0.2,
      },
    },
    {
      id: "skills",
      type: "section",
      position: { x: 500, y: 650 },
      data: {
        label: "Skills",
        description: "Technical Expertise",
        icon: Code2,
        onClick: () => setOpenDialog("skills"),
        delay: 0.25,
      },
    },
    {
      id: "education",
      type: "section",
      position: { x: 1100, y: 650 },
      data: {
        label: "Education",
        description: "Academic Background",
        icon: GraduationCap,
        onClick: () => setOpenDialog("education"),
        delay: 0.3,
      },
    },
    {
      id: "contact",
      type: "section",
      position: { x: 800, y: 950 },
      data: {
        label: "Get In Touch",
        description: "Let's Connect",
        icon: Mail,
        onClick: () => setOpenDialog("contact"),
        delay: 0.35,
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: "profile-impact",
      source: "profile",
      target: "impact",
      animated: true,
      style: { 
        stroke: "url(#gradient1)",
        strokeWidth: 2.5,
        filter: "drop-shadow(0 0 4px rgba(107, 159, 127, 0.5))",
      },
      type: "smoothstep",
    },
    {
      id: "profile-work",
      source: "profile",
      target: "work",
      animated: true,
      style: { 
        stroke: "url(#gradient2)",
        strokeWidth: 2.5,
        filter: "drop-shadow(0 0 4px rgba(107, 159, 127, 0.5))",
      },
      type: "smoothstep",
    },
    {
      id: "profile-experience",
      source: "profile",
      target: "experience",
      animated: true,
      style: { 
        stroke: "url(#gradient3)",
        strokeWidth: 2.5,
        filter: "drop-shadow(0 0 4px rgba(107, 159, 127, 0.5))",
      },
      type: "smoothstep",
    },
    {
      id: "impact-skills",
      source: "impact",
      target: "skills",
      animated: true,
      style: { 
        stroke: "url(#gradient4)",
        strokeWidth: 2,
        filter: "drop-shadow(0 0 3px rgba(125, 181, 154, 0.5))",
      },
      type: "smoothstep",
    },
    {
      id: "work-skills",
      source: "work",
      target: "skills",
      animated: true,
      style: { 
        stroke: "url(#gradient5)",
        strokeWidth: 2,
        filter: "drop-shadow(0 0 3px rgba(125, 181, 154, 0.5))",
      },
      type: "smoothstep",
    },
    {
      id: "work-education",
      source: "work",
      target: "education",
      animated: true,
      style: { 
        stroke: "url(#gradient6)",
        strokeWidth: 2,
        filter: "drop-shadow(0 0 3px rgba(125, 181, 154, 0.5))",
      },
      type: "smoothstep",
    },
    {
      id: "experience-education",
      source: "experience",
      target: "education",
      animated: true,
      style: { 
        stroke: "url(#gradient7)",
        strokeWidth: 2,
        filter: "drop-shadow(0 0 3px rgba(125, 181, 154, 0.5))",
      },
      type: "smoothstep",
    },
    {
      id: "skills-contact",
      source: "skills",
      target: "contact",
      animated: true,
      style: { 
        stroke: "url(#gradient8)",
        strokeWidth: 2,
        filter: "drop-shadow(0 0 3px rgba(168, 213, 186, 0.5))",
      },
      type: "smoothstep",
    },
    {
      id: "education-contact",
      source: "education",
      target: "contact",
      animated: true,
      style: { 
        stroke: "url(#gradient9)",
        strokeWidth: 2,
        filter: "drop-shadow(0 0 3px rgba(168, 213, 186, 0.5))",
      },
      type: "smoothstep",
    },
  ];

  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  return (
    <>
      <CustomCursor />
      <PortfolioNavbar onNavigate={handleNavigate} />
      
      <div className="w-screen h-screen pt-[73px] relative overflow-hidden">
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
          className="relative z-[2]"
          nodesDraggable={true}
          panOnDrag={true}
          zoomOnScroll={true}
        >
          <Background gap={24} size={1.5} color="rgba(107, 159, 127, 0.06)" />
          
          {/* SVG Gradients for edges */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6b9f7f" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7db59a" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7db59a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6b9f7f" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6b9f7f" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a8d5ba" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7db59a" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#a8d5ba" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6b9f7f" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7db59a" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7db59a" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#6b9f7f" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a8d5ba" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7db59a" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7db59a" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#a8d5ba" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gradient9" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a8d5ba" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6b9f7f" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </ReactFlow>
      </div>

      {/* Dialogs */}
      <Suspense fallback={null}>
        {openDialog === "profile" && (
          <ProfileDialog
            open={true}
            onOpenChange={handleDialogOpenChange}
          />
        )}
        {openDialog === "impact" && (
          <ImpactDialog
            open={true}
            onOpenChange={handleDialogOpenChange}
          />
        )}
        {openDialog === "work" && (
          <WorkDialog
            open={true}
            onOpenChange={handleDialogOpenChange}
          />
        )}
        {openDialog === "experience" && (
          <ExperienceDialog
            open={true}
            onOpenChange={handleDialogOpenChange}
          />
        )}
        {openDialog === "skills" && (
          <SkillsDialog
            open={true}
            onOpenChange={handleDialogOpenChange}
          />
        )}
        {openDialog === "education" && (
          <EducationDialog
            open={true}
            onOpenChange={handleDialogOpenChange}
          />
        )}
        {openDialog === "contact" && (
          <ContactDialog
            open={true}
            onOpenChange={handleDialogOpenChange}
          />
        )}
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowContent />
    </ReactFlowProvider>
  );
}
