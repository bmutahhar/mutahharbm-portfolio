import { TrendingUp } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { ImpactDialog } from "../dialogs/impact-dialog";
import type { FlowNodeProps } from "./node-types";
import { SectionNode } from "./section-node";

const ImpactNodeComponent = ({ id, data }: FlowNodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <>
      <SectionNode
        id={id}
        data={data}
        label="Impact Metrics"
        description="Quantified Outcomes"
        icon={TrendingUp}
        onClick={handleClick}
      />
      <ImpactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export const ImpactNode = memo(ImpactNodeComponent);
ImpactNode.displayName = "ImpactNode";
