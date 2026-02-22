import { useViewport } from "@xyflow/react";

export function DotBackground() {
  const { x, y, zoom } = useViewport();
  const baseDotSize = 22;
  const scaledDotSize = baseDotSize * zoom;
  const offsetX = ((x % scaledDotSize) + scaledDotSize) % scaledDotSize;
  const offsetY = ((y % scaledDotSize) + scaledDotSize) % scaledDotSize;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgb(var(--dot-grid-color) / var(--dot-grid-opacity)) 1px, transparent 1px)",
          backgroundSize: `${scaledDotSize}px ${scaledDotSize}px`,
          backgroundPosition: `${offsetX}px ${offsetY}px`,
          maskImage:
            "radial-gradient(ellipse 68% 54% at 50% 50%, black 0%, black 58%, transparent 84%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 68% 54% at 50% 50%, black 0%, black 58%, transparent 84%)",
        }}
      />
    </div>
  );
}
