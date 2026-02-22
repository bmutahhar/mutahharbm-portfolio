import { FileText } from "lucide-react";
import { memo, useCallback } from "react";
import type { FlowNodeProps } from "./node-types";
import { SectionNode } from "./section-node";

const RESUME_URL = "/mutahhar-bin-muzaffar-frontend-engineer-resume.pdf";
const RESUME_FILE_NAME = "mutahhar-bin-muzaffar-frontend-engineer-resume.pdf";

const ResumeNodeComponent = ({ id, data }: FlowNodeProps) => {
  const handleClick = useCallback(() => {
    const openedWindow = window.open(RESUME_URL, "_blank", "noopener,noreferrer");

    if (!openedWindow) {
      const link = document.createElement("a");
      link.href = RESUME_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = RESUME_FILE_NAME;
      link.click();
    }
  }, []);

  return (
    <SectionNode
      id={id}
      data={data}
      label="Resume"
      description="Open PDF"
      icon={FileText}
      onClick={handleClick}
    />
  );
};

export const ResumeNode = memo(ResumeNodeComponent);
ResumeNode.displayName = "ResumeNode";
