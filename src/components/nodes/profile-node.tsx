import { User } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { PROFILE_CONTENT, PROFILE_IMAGE } from "../../data/portfolio-content";
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
        label={PROFILE_CONTENT.name}
        description={PROFILE_CONTENT.title}
        icon={User}
        avatar={PROFILE_IMAGE.node}
        onClick={handleClick}
      />
      <ProfileDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export const ProfileNode = memo(ProfileNodeComponent);
ProfileNode.displayName = "ProfileNode";
