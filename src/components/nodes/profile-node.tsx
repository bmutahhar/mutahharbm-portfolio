import { User } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { ProfileDialog } from "../dialogs/profile-dialog";
import type { FlowNodeProps } from "./node-types";
import { SectionNode } from "./section-node";

const ProfileNodeComponent = ({ id, data }: FlowNodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <>
      <SectionNode
        id={id}
        data={data}
        label="Mutahhar Bin Muzaffar"
        description="Frontend Engineer"
        icon={User}
        onClick={handleClick}
      />
      <ProfileDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export const ProfileNode = memo(ProfileNodeComponent);
ProfileNode.displayName = "ProfileNode";
