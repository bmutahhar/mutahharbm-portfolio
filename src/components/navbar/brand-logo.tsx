import { useId } from "react";
import { cn } from "../ui/utils";

type BrandLogoProps = {
  className?: string;
  size?: number;
};

export const BrandLogo = ({ className, size = 42 }: BrandLogoProps) => {
  const gradientId = useId().replace(/:/g, "");
  const svgWidth = Math.round(size * 0.82);
  const svgHeight = Math.round(size * 0.34);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-primary/40 bg-gradient-to-br from-primary/30 to-primary/10 shadow-lg",
        className,
      )}
      style={{ height: size, width: size }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 640 220"
        fill="none"
        role="img"
        aria-label="mbm logo"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="20"
            y1="20"
            x2="620"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7bb685" />
            <stop offset="1" stopColor="#4f7e57" />
          </linearGradient>
        </defs>

        <g
          stroke={`url(#${gradientId})`}
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M40 160V70C40 52 54 38 72 38C90 38 104 52 104 70V160" />
          <path d="M104 82C104 57 124 38 148 38C172 38 192 57 192 82V160" />

          <path d="M250 166V20" />
          <path d="M278 62C287 47 303 38 321 38C355 38 382 65 382 99C382 133 355 160 321 160C303 160 287 151 278 136" />

          <path d="M434 160V70C434 52 448 38 466 38C484 38 498 52 498 70V160" />
          <path d="M498 82C498 57 518 38 542 38C566 38 586 57 586 82V160" />
        </g>

      </svg>
    </div>
  );
};
