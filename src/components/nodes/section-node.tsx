import { AnimatePresence, motion } from "motion/react";
import { Handle, Position, useNodeConnections } from "@xyflow/react";
import { memo, useCallback, useMemo, useState } from "react";
import type { ComponentType } from "react";
import type { FlowNodeData } from "../../data/flow-layout-data";
import { cn } from "../ui/utils";

type SectionNodeProps = {
  avatar?: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  id: string;
  data: FlowNodeData;
  description: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
};

type HandleGlowProps = {
  isConnected: boolean;
  position: Position.Left | Position.Right;
};

const FLOAT_Y_KEYFRAMES = [0, -20, 0, 20, 0];
const PULSE_INDICES = [0, 1, 2, 3, 4, 5] as const;

const HandleGlowComponent = ({ isConnected, position }: HandleGlowProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 z-20 h-24 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_12px_rgba(110,158,117,0.45)] transition-opacity duration-300",
        {
          "-left-px": position === Position.Left,
          "-right-px": position === Position.Right,
          "opacity-0": !isConnected,
          "opacity-100": isConnected,
        },
      )}
    />
  );
};

const HandleGlow = memo(HandleGlowComponent);

const SectionNodeComponent = ({
  avatar,
  id,
  data,
  description,
  icon: Icon,
  label,
  onClick,
}: SectionNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const leftConnections = useNodeConnections({ handleType: "target" });
  const rightConnections = useNodeConnections({ handleType: "source" });
  const isLeftConnected = useMemo(
    () => data.isDesktop && leftConnections.length > 0,
    [data.isDesktop, leftConnections.length],
  );
  const isRightConnected = useMemo(
    () => data.isDesktop && rightConnections.length > 0,
    [data.isDesktop, rightConnections.length],
  );
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);
  const floatTransition = useMemo(
    () => ({
      y: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: data.floatDelay,
      },
    }),
    [data.floatDelay],
  );

  return (
    <motion.button
      data-node-id={id}
      animate={{ y: FLOAT_Y_KEYFRAMES }}
      transition={floatTransition}
      whileHover={{ scale: 1.08 }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative min-h-[200px] min-w-[200px] cursor-pointer rounded-3xl border-2 border-primary/20 bg-card/80 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-2xl"
    >
      {data.isDesktop ? (
        <>
          <Handle
            id="target-left"
            type="target"
            position={Position.Left}
            className="opacity-0"
            style={{ top: "50%" }}
          />
          <Handle
            id="source-right"
            type="source"
            position={Position.Right}
            className="opacity-0"
            style={{ top: "50%" }}
          />
        </>
      ) : (
        <>
          <Handle id="target-top" type="target" position={Position.Top} className="opacity-0" />
          <Handle id="source-bottom" type="source" position={Position.Bottom} className="opacity-0" />
        </>
      )}
      <HandleGlow isConnected={isLeftConnected} position={Position.Left} />
      <HandleGlow isConnected={isRightConnected} position={Position.Right} />

      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/40 shadow-lg",
            avatar
              ? "overflow-hidden bg-card p-0"
              : "bg-gradient-to-br from-primary/30 to-primary/10",
          )}
        >
          {avatar ? (
            <img
              src={avatar.src}
              alt={avatar.alt}
              width={avatar.width}
              height={avatar.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <Icon className="h-10 w-10 text-primary drop-shadow-lg" />
          )}

          <AnimatePresence>
            {isHovered &&
              PULSE_INDICES.map((index) => (
                <motion.div
                  key={`pulse-${index}`}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((index * Math.PI * 2) / 6) * 40,
                    y: Math.sin((index * Math.PI * 2) / 6) * 40,
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                  className="absolute h-2 w-2 rounded-full bg-primary/60"
                />
              ))}
          </AnimatePresence>
        </motion.div>

        <div className="relative text-center">
          <h3 className="mb-1 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-lg font-semibold text-transparent">
            {label}
          </h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-xs font-medium text-transparent"
      >
        Click to explore
      </motion.div>
    </motion.button>
  );
};

HandleGlow.displayName = "HandleGlow";

export const SectionNode = memo(SectionNodeComponent);
SectionNode.displayName = "SectionNode";
