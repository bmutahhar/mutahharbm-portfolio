import { motion } from "motion/react";
import { useCallback } from "react";
import { useTheme } from "next-themes";
import { PROFILE_CONTENT } from "../data/portfolio-content";
import { BrandLogo } from "./navbar/brand-logo";
import { DesktopNavbar } from "./navbar/desktop-navbar";
import { MobileNavbar } from "./navbar/mobile-navbar";
import type { NavItemId } from "./navbar/nav-items";

type PortfolioNavbarProps = {
  onNavigate: (nodeId: string) => void;
  onResetView: () => void;
  isCanvasEmpty: boolean;
};

export const PortfolioNavbar = ({ onNavigate, onResetView, isCanvasEmpty }: PortfolioNavbarProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handleToggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  const handleNavigate = useCallback(
    (nodeId: NavItemId) => {
      onNavigate(nodeId);
    },
    [onNavigate],
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-10 border-b border-primary/10 bg-background/60 shadow-lg backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onClick={onResetView}
            className="flex items-center gap-3"
            aria-label="Reset canvas view"
          >
            <BrandLogo isRippleActive={isCanvasEmpty} />
            <div>
              <h1 className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-sm font-semibold text-transparent">
                {PROFILE_CONTENT.name}
              </h1>
              <p className="text-xs text-muted-foreground">{PROFILE_CONTENT.title}</p>
            </div>
          </motion.button>

          <DesktopNavbar
            isDark={isDark}
            onNavigate={handleNavigate}
            onToggleTheme={handleToggleTheme}
          />
          <MobileNavbar
            isDark={isDark}
            onNavigate={handleNavigate}
            onToggleTheme={handleToggleTheme}
          />
        </div>
      </div>
    </motion.nav>
  );
};
