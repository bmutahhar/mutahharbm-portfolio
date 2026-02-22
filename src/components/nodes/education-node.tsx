import { GraduationCap } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { EducationDialog } from "../dialogs/education-dialog";
import type { FlowNodeProps } from "./node-types";
import { SectionNode } from "./section-node";

const EducationNodeComponent = ({ id, data }: FlowNodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <>
      <SectionNode
        id={id}
        data={data}
        label="Education"
        description="Academic Background"
        icon={GraduationCap}
        onClick={handleClick}
      />
      <EducationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export const EducationNode = memo(EducationNodeComponent);
EducationNode.displayName = "EducationNode";
