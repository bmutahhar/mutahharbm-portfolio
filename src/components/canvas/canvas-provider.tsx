"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { NodeKind } from "./graph";
import { TOUR_ORDER } from "./graph";

type CanvasState = {
  /**
   * Kind whose detail view the inspector shows. Deliberately retained after
   * closing so the view stays rendered through the drawer's exit animation.
   */
  inspectedKind: NodeKind | null;
  isInspectorOpen: boolean;
  /** Current tour stop index into meta.tourOrder, or null when no tour is running. */
  tourIndex: number | null;
  isCommandMenuOpen: boolean;
};

type CanvasActions = {
  inspect: (kind: NodeKind) => void;
  closeInspector: () => void;
  startTour: () => void;
  endTour: () => void;
  goToTourStop: (index: number) => void;
  setCommandMenuOpen: (open: boolean) => void;
};

type CanvasMeta = {
  tourOrder: readonly NodeKind[];
};

const CanvasStateContext = createContext<CanvasState | null>(null);
const CanvasActionsContext = createContext<CanvasActions | null>(null);

const CANVAS_META: CanvasMeta = { tourOrder: TOUR_ORDER };

type CanvasProviderProps = {
  children: ReactNode;
};

/**
 * Owns all canvas UI state. Consumers only ever see the state/actions interfaces,
 * never how the state is stored, so the implementation can change freely.
 */
export const CanvasProvider = ({ children }: CanvasProviderProps) => {
  const [inspectedKind, setInspectedKind] = useState<NodeKind | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [tourIndex, setTourIndex] = useState<number | null>(null);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  const inspect = useCallback((kind: NodeKind) => {
    setInspectedKind(kind);
    setIsInspectorOpen(true);
    setTourIndex(null);
    setIsCommandMenuOpen(false);
  }, []);

  const closeInspector = useCallback(() => {
    setIsInspectorOpen(false);
  }, []);

  const startTour = useCallback(() => {
    setIsInspectorOpen(false);
    setIsCommandMenuOpen(false);
    setTourIndex(0);
  }, []);

  const setCommandMenuOpen = useCallback((open: boolean) => {
    setIsCommandMenuOpen(open);
  }, []);

  const endTour = useCallback(() => {
    setTourIndex(null);
  }, []);

  const goToTourStop = useCallback((index: number) => {
    setTourIndex((current) => {
      if (current === null) {
        return current;
      }

      return Math.min(Math.max(index, 0), TOUR_ORDER.length - 1);
    });
  }, []);

  const state = useMemo<CanvasState>(
    () => ({ inspectedKind, isInspectorOpen, tourIndex, isCommandMenuOpen }),
    [inspectedKind, isInspectorOpen, tourIndex, isCommandMenuOpen],
  );
  const actions = useMemo<CanvasActions>(
    () => ({ inspect, closeInspector, startTour, endTour, goToTourStop, setCommandMenuOpen }),
    [inspect, closeInspector, startTour, endTour, goToTourStop, setCommandMenuOpen],
  );

  return (
    <CanvasActionsContext.Provider value={actions}>
      <CanvasStateContext.Provider value={state}>{children}</CanvasStateContext.Provider>
    </CanvasActionsContext.Provider>
  );
};

export const useCanvasState = (): CanvasState => {
  const state = useContext(CanvasStateContext);

  if (state === null) {
    throw new Error("useCanvasState must be used within a CanvasProvider");
  }

  return state;
};

export const useCanvasActions = (): CanvasActions => {
  const actions = useContext(CanvasActionsContext);

  if (actions === null) {
    throw new Error("useCanvasActions must be used within a CanvasProvider");
  }

  return actions;
};

export const useCanvasMeta = (): CanvasMeta => CANVAS_META;

/** Kind currently highlighted by the tour, or null. */
export const useActiveTourKind = (): NodeKind | null => {
  const { tourIndex } = useCanvasState();

  return tourIndex === null ? null : TOUR_ORDER[tourIndex];
};
