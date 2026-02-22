import { Sparkles } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { ExperienceDialog } from "../dialogs/experience-dialog";
import type { FlowNodeProps } from "./node-types";
import { SectionNode } from "./section-node";

const ExperienceNodeComponent = ({ id, data }: FlowNodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <>
      <SectionNode
        id={id}
        data={data}
        label="Experience"
        description="Career Timeline"
        icon={Sparkles}
        onClick={handleClick}
      />
      <ExperienceDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export const ExperienceNode = memo(ExperienceNodeComponent);
ExperienceNode.displayName = "ExperienceNode";
