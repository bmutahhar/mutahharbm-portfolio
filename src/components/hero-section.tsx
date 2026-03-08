import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  addEdge,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Mail,
  Linkedin,
  Github,
  ArrowRight,
  User,
  Briefcase,
  Code2,
  Zap,
  Layers,
} from "lucide-react";
import { CONTACT_LINKS, PROFILE_CONTENT, SKILL_CATEGORIES } from "../data/portfolio-content";

const frontendSkills =
  SKILL_CATEGORIES.find((category) => category.category === "Frontend")?.skills ?? [];
const backendSkills =
  SKILL_CATEGORIES.find((category) => category.category === "Backend/Infra")?.skills ?? [];
const testingSkills =
  SKILL_CATEGORIES.find((category) => category.category === "Testing/Tools")?.skills ?? [];

const heroSocialLinks = CONTACT_LINKS.filter(
  (contact) => contact.id === "email" || contact.id === "linkedin" || contact.id === "github",
);

// Profile Header Node
function ProfileNode() {
  return (
    <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 shadow-xl min-w-[400px]">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 flex items-center justify-center">
          <span className="text-xl font-bold text-primary">MB</span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-mono">
            {PROFILE_CONTENT.title}
          </p>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{PROFILE_CONTENT.name}</h1>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {PROFILE_CONTENT.shortSummary}
      </p>
    </div>
  );
}

// CTA Node
function CTANode() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-card border-2 border-chart-2/30 rounded-xl p-6 shadow-lg min-w-[300px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-2/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-chart-2" />
        </div>
        <h3 className="font-semibold text-lg">Explore My Work</h3>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={() => scrollToSection("work")} size="lg" className="w-full">
          View Selected Work
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => scrollToSection("contact")}
          className="w-full"
        >
          Contact Me
        </Button>
      </div>
    </div>
  );
}

// Social Links Node
function SocialNode() {
  return (
    <div className="bg-card border-2 border-chart-3/30 rounded-xl p-6 shadow-lg min-w-[280px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-3/20 to-chart-3/10 flex items-center justify-center">
          <User className="w-5 h-5 text-chart-3" />
        </div>
        <h3 className="font-semibold text-lg">Connect</h3>
      </div>
      <div className="space-y-3">
        {heroSocialLinks.map((contact) => {
          const Icon =
            contact.id === "email" ? Mail : contact.id === "linkedin" ? Linkedin : Github;
          const isExternal = contact.id !== "email";

          return (
            <a
              key={contact.id}
              href={contact.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <span>{contact.value}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// Tech Stack Node
function TechStackNode({ data }: { data: { techs: string[] } }) {
  return (
    <div className="bg-card border-2 border-chart-4/30 rounded-xl p-6 shadow-lg min-w-[350px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-4/20 to-chart-4/10 flex items-center justify-center">
          <Code2 className="w-5 h-5 text-chart-4" />
        </div>
        <h3 className="font-semibold text-lg">Technology Stack</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.techs.map((tech) => (
          <Badge key={tech} variant="outline" className="font-mono text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}

// Expertise Node
function ExpertiseNode({ data }: { data: { title: string; items: string[] } }) {
  return (
    <div className="bg-card border-2 border-chart-5/30 rounded-xl p-6 shadow-lg min-w-[280px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-5/20 to-chart-5/10 flex items-center justify-center">
          <Layers className="w-5 h-5 text-chart-5" />
        </div>
        <h3 className="font-semibold text-lg">{data.title}</h3>
      </div>
      <ul className="space-y-2">
        {data.items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Specialization Node
function SpecializationNode() {
  return (
    <div className="bg-card border-2 border-primary/30 rounded-xl p-6 shadow-lg min-w-[280px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">Workflow Systems</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        Led a unified React Flow workflow canvas for text, image, and video generation with
        real-time execution.
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-chart-2" />
          Unified Workflows
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
          React Flow
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-chart-4" />
          Real-time Execution
        </div>
      </div>
    </div>
  );
}

const nodeTypes = {
  profile: ProfileNode,
  cta: CTANode,
  social: SocialNode,
  techStack: TechStackNode,
  expertise: ExpertiseNode,
  specialization: SpecializationNode,
};

const initialNodes: Node[] = [
  {
    id: "profile",
    type: "profile",
    position: { x: 50, y: 50 },
    data: {},
  },
  {
    id: "specialization",
    type: "specialization",
    position: { x: 520, y: 50 },
    data: {},
  },
  {
    id: "cta",
    type: "cta",
    position: { x: 50, y: 280 },
    data: {},
  },
  {
    id: "social",
    type: "social",
    position: { x: 400, y: 280 },
    data: {},
  },
  {
    id: "frontend",
    type: "expertise",
    position: { x: 50, y: 500 },
    data: {
      title: "Frontend",
      items: PROFILE_CONTENT.focusStack,
    },
  },
  {
    id: "backend",
    type: "expertise",
    position: { x: 380, y: 500 },
    data: {
      title: "Backend",
      items: backendSkills.slice(0, 4),
    },
  },
  {
    id: "techStack",
    type: "techStack",
    position: { x: 710, y: 280 },
    data: {
      techs: [...frontendSkills.slice(3), ...testingSkills, ...backendSkills.slice(4)],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "profile-specialization",
    source: "profile",
    target: "specialization",
    animated: true,
    style: { stroke: "#6b9f7f", strokeWidth: 3 },
    type: "smoothstep",
  },
  {
    id: "profile-cta",
    source: "profile",
    target: "cta",
    animated: true,
    style: { stroke: "#5ba88f", strokeWidth: 3 },
    type: "smoothstep",
  },
  {
    id: "profile-social",
    source: "profile",
    target: "social",
    animated: true,
    style: { stroke: "#7db59a", strokeWidth: 3 },
    type: "smoothstep",
  },
  {
    id: "specialization-techStack",
    source: "specialization",
    target: "techStack",
    animated: true,
    style: { stroke: "#8fc9ab", strokeWidth: 3 },
    type: "smoothstep",
  },
  {
    id: "cta-frontend",
    source: "cta",
    target: "frontend",
    animated: true,
    style: { stroke: "#a8d5ba", strokeWidth: 3 },
    type: "smoothstep",
  },
  {
    id: "social-backend",
    source: "social",
    target: "backend",
    animated: true,
    style: { stroke: "#a8d5ba", strokeWidth: 3 },
    type: "smoothstep",
  },
  {
    id: "techStack-backend",
    source: "techStack",
    target: "backend",
    animated: true,
    style: { stroke: "#7db59a", strokeWidth: 3 },
    type: "smoothstep",
  },
  {
    id: "frontend-backend",
    source: "frontend",
    target: "backend",
    animated: true,
    style: { stroke: "#6b9f7f", strokeWidth: 3 },
    type: "smoothstep",
  },
];

export function HeroSection() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <section id="home" className="h-screen w-full pt-16">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
        className="bg-gradient-to-br from-background to-accent/30"
      >
        <Background gap={20} size={1} color="rgba(107, 159, 127, 0.1)" />
        <Controls className="bg-card border border-border rounded-lg shadow-lg" />
        <MiniMap
          className="bg-card border border-border rounded-lg shadow-lg"
          nodeColor={(node) => {
            if (node.type === "profile") return "#6b9f7f";
            if (node.type === "cta") return "#5ba88f";
            if (node.type === "social") return "#7db59a";
            if (node.type === "techStack") return "#8fc9ab";
            if (node.type === "expertise") return "#a8d5ba";
            if (node.type === "specialization") return "#6b9f7f";
            return "#6b9f7f";
          }}
        />
      </ReactFlow>
    </section>
  );
}
