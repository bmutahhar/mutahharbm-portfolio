"use client";

import type { CSSProperties } from "react";
import { X } from "lucide-react";
import { useCanvasActions, useCanvasState } from "../canvas/canvas-provider";
import { useGraphOrientation } from "../canvas/use-canvas-layout";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { INSPECTOR_VIEWS } from "./views/registry";

/**
 * The single detail surface for every node: a side panel on desktop, a bottom
 * sheet on compact viewports. Which view it shows is decided by the registry,
 * so adding a node kind never touches this shell.
 */
export const Inspector = () => {
  const { inspectedKind, isInspectorOpen } = useCanvasState();
  const { closeInspector } = useCanvasActions();
  const orientation = useGraphOrientation();
  const direction = orientation === "row" ? "right" : "bottom";

  // inspectedKind survives closing, so the view stays rendered during the exit animation.
  const kind = inspectedKind;
  const entry = kind === null ? null : INSPECTOR_VIEWS[kind];

  return (
    <Drawer
      key={direction}
      direction={direction}
      open={isInspectorOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeInspector();
        }
      }}
    >
      <DrawerContent
        style={kind === null ? undefined : ({ "--node-accent": `var(--kind-${kind})` } as CSSProperties)}
        className="data-[vaul-drawer-direction=bottom]:max-h-[86vh] data-[vaul-drawer-direction=right]:sm:max-w-md"
      >
        {entry !== null && kind !== null ? (
          <>
            <DrawerHeader className="border-b px-6 pb-4 pt-5">
              <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--node-accent)]">
                <span aria-hidden className="size-1.5 rounded-full bg-[color:var(--node-accent)]" />
                inspector / {kind}
              </p>
              <DrawerTitle className="text-xl font-bold tracking-tight">{entry.title}</DrawerTitle>
              <DrawerDescription className="text-[13px]">{entry.description}</DrawerDescription>
              <DrawerClose
                aria-label="Close inspector"
                className="absolute right-4 top-4 rounded-md border bg-card p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X aria-hidden className="size-4" />
              </DrawerClose>
            </DrawerHeader>
            <div className="overflow-y-auto px-6 py-5">
              <entry.View />
            </div>
          </>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};
