"use client";

import { memo } from "react";
import type { NodeProps } from "@xyflow/react";
import { FLAT_TECH_STACK, SKILL_CATEGORIES } from "../../../data/portfolio-content";
import type { GraphNode } from "../graph";
import { NodeCard } from "../node-card";
import { NodePorts } from "../node-ports";

const PREVIEW_SKILLS = SKILL_CATEGORIES[1].skills.slice(0, 6);

const SkillsNodeComponent = ({ data }: NodeProps<GraphNode>) => (
  <NodeCard
    kind="skills"
    enterDelay={data.enterDelay}
    className="w-[300px]"
    ports={<NodePorts orientation={data.orientation} hasOut />}
  >
    <NodeCard.Eyebrow>input / skills</NodeCard.Eyebrow>
    <NodeCard.Title>Technical Skills</NodeCard.Title>
    <NodeCard.Body>
      <div className="grid grid-cols-2 gap-2">
        <NodeCard.Stat value={`${FLAT_TECH_STACK.length}+`} label="skills" />
        <NodeCard.Stat value={String(SKILL_CATEGORIES.length)} label="categories" />
      </div>
      <NodeCard.ChipRow>
        {PREVIEW_SKILLS.map((skill) => (
          <NodeCard.Chip key={skill}>{skill}</NodeCard.Chip>
        ))}
      </NodeCard.ChipRow>
    </NodeCard.Body>
    <NodeCard.Footer>
      <span>languages · frontend · backend</span>
      <NodeCard.InspectTrigger label="Inspect technical skills" />
    </NodeCard.Footer>
  </NodeCard>
);

export const SkillsNode = memo(SkillsNodeComponent);
