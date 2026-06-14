import type { Edge, Node } from "@xyflow/react";

export const NODE_KINDS = [
  "profile",
  "skills",
  "experience",
  "work",
  "impact",
  "education",
  "contact",
  "resume",
] as const;

export type NodeKind = (typeof NODE_KINDS)[number];

export type GraphOrientation = "row" | "column";

export type GraphNodeData = {
  kind: NodeKind;
  orientation: GraphOrientation;
  enterDelay: number;
  [key: string]: unknown;
};

export type GraphNode = Node<GraphNodeData>;

export type SignalEdgeData = {
  sourceKind: NodeKind;
  targetKind: NodeKind;
  [key: string]: unknown;
};

export type SignalEdge = Edge<SignalEdgeData>;

/** Story order used by the tour, the command menu, and entrance stagger. */
export const TOUR_ORDER: readonly NodeKind[] = [
  "profile",
  "education",
  "skills",
  "experience",
  "work",
  "impact",
  "contact",
  "resume",
];

/**
 * The career pipeline: inputs (education, skills) feed the profile, which compiles
 * through experience and work into impact; contact and resume are the outputs.
 */
const GRAPH_EDGES: ReadonlyArray<readonly [NodeKind, NodeKind]> = [
  ["education", "profile"],
  ["skills", "profile"],
  ["profile", "experience"],
  ["experience", "work"],
  ["work", "impact"],
  ["impact", "contact"],
  ["impact", "resume"],
];

/** Left-to-right pipeline for desktop viewports. */
const ROW_POSITIONS: Record<NodeKind, { x: number; y: number }> = {
  education: { x: 0, y: 40 },
  skills: { x: 0, y: 470 },
  profile: { x: 480, y: 190 },
  experience: { x: 1010, y: 80 },
  work: { x: 1530, y: 330 },
  impact: { x: 2050, y: 90 },
  contact: { x: 2580, y: 0 },
  resume: { x: 2580, y: 480 },
};

/** Top-to-bottom pipeline for compact viewports, with a slight weave. */
const COLUMN_POSITIONS: Record<NodeKind, { x: number; y: number }> = {
  education: { x: 0, y: 0 },
  skills: { x: 360, y: 110 },
  profile: { x: 130, y: 420 },
  experience: { x: 60, y: 950 },
  work: { x: 220, y: 1330 },
  impact: { x: 80, y: 1760 },
  contact: { x: 0, y: 2240 },
  resume: { x: 350, y: 2330 },
};

const ENTER_STAGGER_SECONDS = 0.07;

const buildNodes = (orientation: GraphOrientation): GraphNode[] => {
  const positions = orientation === "row" ? ROW_POSITIONS : COLUMN_POSITIONS;

  return TOUR_ORDER.map((kind, index) => ({
    id: kind,
    type: kind,
    position: positions[kind],
    data: { kind, orientation, enterDelay: index * ENTER_STAGGER_SECONDS },
  }));
};

const buildEdges = (): SignalEdge[] =>
  GRAPH_EDGES.map(([source, target]) => ({
    id: `${source}->${target}`,
    source,
    target,
    type: "signal",
    data: { sourceKind: source, targetKind: target },
  }));

export const GRAPH_LAYOUTS: Record<
  GraphOrientation,
  { nodes: GraphNode[]; edges: SignalEdge[] }
> = {
  row: { nodes: buildNodes("row"), edges: buildEdges() },
  column: { nodes: buildNodes("column"), edges: buildEdges() },
};
