import { Mail } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { ContactDialog } from "../dialogs/contact-dialog";
import type { FlowNodeProps } from "./node-types";
import { SectionNode } from "./section-node";

const ContactNodeComponent = ({ id, data }: FlowNodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <>
      <SectionNode
        id={id}
        data={data}
        label="Get In Touch"
        description="Let's Connect"
        icon={Mail}
        onClick={handleClick}
      />
      <ContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export const ContactNode = memo(ContactNodeComponent);
ContactNode.displayName = "ContactNode";
