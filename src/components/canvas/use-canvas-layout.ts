"use client";

import { useSyncExternalStore } from "react";
import type { GraphOrientation } from "./graph";
import { GRAPH_LAYOUTS } from "./graph";

const ROW_QUERY = "(min-width: 1024px)";

const subscribe = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(ROW_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
};

const getSnapshot = (): GraphOrientation => (window.matchMedia(ROW_QUERY).matches ? "row" : "column");

// The canvas renders client-only (dynamic ssr:false), but useSyncExternalStore
// still requires a server snapshot for the initial render pass.
const getServerSnapshot = (): GraphOrientation => "row";

export const useGraphOrientation = (): GraphOrientation =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export const useCanvasLayout = () => {
  const orientation = useGraphOrientation();

  return { orientation, ...GRAPH_LAYOUTS[orientation] };
};
