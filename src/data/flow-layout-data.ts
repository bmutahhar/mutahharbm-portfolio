import { type Edge, type Node, Position } from "@xyflow/react";

export type FlowNodeKind =
  | "profile"
  | "impact"
  | "work"
  | "experience"
  | "skills"
  | "education"
  | "contact"
  | "resume";

export type FlowNodeData = {
  delay: number;
  floatDelay: number;
  isDesktop: boolean;
  kind: FlowNodeKind;
};

const SSR_NODE_DIMENSIONS = {
  initialWidth: 200,
  initialHeight: 200,
} as const;

const MOBILE_NODE_HANDLES = [
  { id: "target-top", type: "target" as const, position: Position.Top, x: 100, y: 0 },
  {
    id: "source-bottom",
    type: "source" as const,
    position: Position.Bottom,
    x: 100,
    y: 200,
  },
  { id: "target-left", type: "target" as const, position: Position.Left, x: 0, y: 100 },
  { id: "source-right", type: "source" as const, position: Position.Right, x: 200, y: 100 },
];

const DESKTOP_NODE_HANDLES = [
  { id: "target-left", type: "target" as const, position: Position.Left, x: 0, y: 100 },
  { id: "source-right", type: "source" as const, position: Position.Right, x: 200, y: 100 },
];

export const mobileNodes: Array<Node<FlowNodeData>> = [
  {
    id: "profile",
    type: "profile-node",
    position: { x: 800, y: 80 },
    handles: MOBILE_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "profile", delay: 0, floatDelay: 0, isDesktop: false },
  },
  {
    id: "impact",
    type: "impact-node",
    position: { x: 200, y: 350 },
    handles: MOBILE_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "impact", delay: 0.1, floatDelay: 0.2, isDesktop: false },
  },
  {
    id: "work",
    type: "work-node",
    position: { x: 800, y: 350 },
    handles: MOBILE_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "work", delay: 0.15, floatDelay: 0.35, isDesktop: false },
  },
  {
    id: "experience",
    type: "experience-node",
    position: { x: 1400, y: 350 },
    handles: MOBILE_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "experience", delay: 0.2, floatDelay: 0.5, isDesktop: false },
  },
  {
    id: "skills",
    type: "skills-node",
    position: { x: 500, y: 670 },
    handles: MOBILE_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "skills", delay: 0.25, floatDelay: 0.65, isDesktop: false },
  },
  {
    id: "education",
    type: "education-node",
    position: { x: 1100, y: 670 },
    handles: MOBILE_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "education", delay: 0.3, floatDelay: 0.8, isDesktop: false },
  },
  {
    id: "contact",
    type: "contact-node",
    position: { x: 800, y: 980 },
    handles: MOBILE_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "contact", delay: 0.35, floatDelay: 0.95, isDesktop: false },
  },
  {
    id: "resume",
    type: "resume-node",
    position: { x: 1400, y: 980 },
    handles: MOBILE_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "resume", delay: 0.4, floatDelay: 1.1, isDesktop: false },
  },
];

export const mobileEdges: Array<Edge> = [
  { id: "profile-impact", source: "profile", target: "impact", type: "glow", animated: true },
  { id: "profile-work", source: "profile", target: "work", type: "glow", animated: true },
  {
    id: "profile-experience",
    source: "profile",
    target: "experience",
    type: "glow",
    animated: true,
  },
  { id: "impact-skills", source: "impact", target: "skills", type: "glow", animated: true },
  { id: "work-skills", source: "work", target: "skills", type: "glow", animated: true },
  { id: "work-education", source: "work", target: "education", type: "glow", animated: true },
  {
    id: "experience-education",
    source: "experience",
    target: "education",
    type: "glow",
    animated: true,
  },
  { id: "skills-contact", source: "skills", target: "contact", type: "glow", animated: true },
  {
    id: "education-contact",
    source: "education",
    target: "contact",
    type: "glow",
    animated: true,
  },
  {
    id: "contact-resume",
    source: "contact",
    target: "resume",
    type: "glow",
    animated: true,
  },
];

export const desktopNodes: Array<Node<FlowNodeData>> = [
  {
    id: "profile",
    type: "profile-node",
    position: { x: 80, y: 430 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    handles: DESKTOP_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "profile", delay: 0, floatDelay: 0, isDesktop: true },
  },
  {
    id: "resume",
    type: "resume-node",
    position: { x: 760, y: 60 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    handles: DESKTOP_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "resume", delay: 0.1, floatDelay: 0.2, isDesktop: true },
  },
  {
    id: "work",
    type: "work-node",
    position: { x: 1510, y: 170 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    handles: DESKTOP_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "work", delay: 0.15, floatDelay: 0.35, isDesktop: true },
  },
  {
    id: "education",
    type: "education-node",
    position: { x: 1160, y: 420 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    handles: DESKTOP_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "education", delay: 0.2, floatDelay: 0.5, isDesktop: true },
  },
  {
    id: "experience",
    type: "experience-node",
    position: { x: 1580, y: 760 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    handles: DESKTOP_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: {
      kind: "experience",
      delay: 0.25,
      floatDelay: 0.65,
      isDesktop: true,
    },
  },
  {
    id: "impact",
    type: "impact-node",
    position: { x: 1350, y: 1140 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    handles: DESKTOP_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "impact", delay: 0.3, floatDelay: 0.8, isDesktop: true },
  },
  {
    id: "contact",
    type: "contact-node",
    position: { x: 860, y: 1240 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    handles: DESKTOP_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "contact", delay: 0.35, floatDelay: 0.95, isDesktop: true },
  },
  {
    id: "skills",
    type: "skills-node",
    position: { x: 430, y: 1170 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    handles: DESKTOP_NODE_HANDLES,
    ...SSR_NODE_DIMENSIONS,
    data: { kind: "skills", delay: 0.4, floatDelay: 1.1, isDesktop: true },
  },
];

export const desktopEdges: Array<Edge> = [
  {
    id: "profile-resume",
    source: "profile",
    target: "resume",
    sourceHandle: "source-right",
    targetHandle: "target-left",
    type: "glow",
    animated: true,
  },
  {
    id: "profile-work",
    source: "profile",
    target: "work",
    sourceHandle: "source-right",
    targetHandle: "target-left",
    type: "glow",
    animated: true,
  },
  {
    id: "profile-education",
    source: "profile",
    target: "education",
    sourceHandle: "source-right",
    targetHandle: "target-left",
    type: "glow",
    animated: true,
  },
  {
    id: "profile-experience",
    source: "profile",
    target: "experience",
    sourceHandle: "source-right",
    targetHandle: "target-left",
    type: "glow",
    animated: true,
  },
  {
    id: "profile-impact",
    source: "profile",
    target: "impact",
    sourceHandle: "source-right",
    targetHandle: "target-left",
    type: "glow",
    animated: true,
  },
  {
    id: "profile-contact",
    source: "profile",
    target: "contact",
    sourceHandle: "source-right",
    targetHandle: "target-left",
    type: "glow",
    animated: true,
  },
  {
    id: "profile-skills",
    source: "profile",
    target: "skills",
    sourceHandle: "source-right",
    targetHandle: "target-left",
    type: "glow",
    animated: true,
  },
];
