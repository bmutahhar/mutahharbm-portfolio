"use client";

import dynamic from "next/dynamic";
import { BootScreen } from "../chrome/boot-screen";

// react-flow (and everything canvas) stays out of the initial bundle and only
// renders client-side, where it can measure the viewport.
const CanvasRoot = dynamic(() => import("./canvas-root"), {
  ssr: false,
  loading: () => <BootScreen />,
});

export const CanvasClient = () => <CanvasRoot />;
