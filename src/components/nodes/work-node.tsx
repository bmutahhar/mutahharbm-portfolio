import { Briefcase } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { WorkDialog } from "../dialogs/work-dialog";
import type { FlowNodeProps } from "./node-types";
import { SectionNode } from "./section-node";

const WorkNodeComponent = ({ id, data }: FlowNodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <>
      <SectionNode
        id={id}
        data={data}
        label="Selected Work"
        description="Featured Projects"
        icon={Briefcase}
        onClick={handleClick}
      />
      <WorkDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export const WorkNode = memo(WorkNodeComponent);
WorkNode.displayName = "WorkNode";
