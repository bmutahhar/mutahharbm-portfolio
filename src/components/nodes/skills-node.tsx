import { Code2 } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { SkillsDialog } from "../dialogs/skills-dialog";
import type { FlowNodeProps } from "./node-types";
import { SectionNode } from "./section-node";

const SkillsNodeComponent = ({ id, data }: FlowNodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <>
      <SectionNode
        id={id}
        data={data}
        label="Skills"
        description="Technical Expertise"
        icon={Code2}
        onClick={handleClick}
      />
      <SkillsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export const SkillsNode = memo(SkillsNodeComponent);
SkillsNode.displayName = "SkillsNode";
