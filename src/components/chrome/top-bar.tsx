"use client";

import { useSyncExternalStore } from "react";
import { Command, Github, Linkedin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCanvasActions } from "../canvas/canvas-provider";
import { useCamera } from "../canvas/use-camera";
import { CONTACT_LINKS, PROFILE_CONTENT } from "../../data/portfolio-content";

const ICON_BUTTON_CLASS =
  "grid size-8 place-items-center rounded-md border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground";

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
} as const;

const SOCIAL_LINKS = CONTACT_LINKS.filter(
  (link): link is (typeof CONTACT_LINKS)[number] & { id: keyof typeof SOCIAL_ICONS } =>
    link.id === "github" || link.id === "linkedin",
);

const emptySubscribe = () => () => {};

// True after hydration only — the lint-clean replacement for a mounted flag.
const useIsHydrated = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isMounted = useIsHydrated();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={ICON_BUTTON_CLASS}
    >
      {/* Render a stable icon until mounted to avoid a hydration mismatch. */}
      {isMounted && !isDark ? (
        <Moon aria-hidden className="size-4" />
      ) : (
        <Sun aria-hidden className="size-4" />
      )}
    </button>
  );
};

export const TopBar = () => {
  const camera = useCamera();
  const { setCommandMenuOpen } = useCanvasActions();

  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b bg-background/75 px-4 py-2.5 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={() => camera.fitGraph()}
        aria-label="Reset view to show the full graph"
        className="group flex items-center gap-3"
      >
        <span className="grid size-9 place-items-center rounded-md border bg-card font-mono text-[11px] font-semibold text-primary shadow-sm transition-colors group-hover:border-primary/50">
          mb
        </span>
        <span className="flex flex-col text-left">
          <span className="text-[13px] font-bold leading-tight tracking-tight">
            {PROFILE_CONTENT.shortName}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            full stack engineer
          </span>
        </span>
      </button>

      <nav aria-label="Site actions" className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCommandMenuOpen(true)}
          className="hidden items-center gap-1.5 rounded-md border bg-card px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:flex"
        >
          <Command aria-hidden className="size-3" />K
          <span className="sr-only">Open command menu</span>
        </button>
        {SOCIAL_LINKS.map((link) => {
          const Icon = SOCIAL_ICONS[link.id];

          return (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className={ICON_BUTTON_CLASS}
            >
              <Icon aria-hidden className="size-4" />
            </a>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
};
