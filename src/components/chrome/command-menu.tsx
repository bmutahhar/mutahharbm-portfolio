"use client";

import { useCallback, useEffect } from "react";
import { Copy, Download, Github, Linkedin, Maximize, Play, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCanvasActions, useCanvasState } from "../canvas/canvas-provider";
import { TOUR_ORDER } from "../canvas/graph";
import { useCamera } from "../canvas/use-camera";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { CONTACT_LINKS, RESUME_PDF } from "../../data/portfolio-content";

const EMAIL_LINK = CONTACT_LINKS.find((link) => link.id === "email");
const GITHUB_LINK = CONTACT_LINKS.find((link) => link.id === "github");
const LINKEDIN_LINK = CONTACT_LINKS.find((link) => link.id === "linkedin");

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

/** Cmd+K palette: jump to any module or run a canvas-level action. */
export const CommandMenu = () => {
  const { isCommandMenuOpen } = useCanvasState();
  const { setCommandMenuOpen, inspect, startTour } = useCanvasActions();
  const camera = useCamera();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setCommandMenuOpen(!isCommandMenuOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCommandMenuOpen, setCommandMenuOpen]);

  const runCommand = useCallback(
    (action: () => void) => {
      setCommandMenuOpen(false);
      action();
    },
    [setCommandMenuOpen],
  );

  return (
    <CommandDialog
      open={isCommandMenuOpen}
      onOpenChange={setCommandMenuOpen}
      title="Command menu"
      description="Jump anywhere in the graph"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Modules">
          {TOUR_ORDER.map((kind) => (
            <CommandItem
              key={kind}
              onSelect={() =>
                runCommand(() => {
                  camera.focusNode(kind, { duration: 600 });
                  inspect(kind);
                })
              }
            >
              <span
                aria-hidden
                style={{ background: `var(--kind-${kind})` }}
                className="size-1.5 rounded-full"
              />
              {capitalize(kind)}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(startTour)}>
            <Play aria-hidden />
            Run guided tour
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                camera.fitGraph();
              })
            }
          >
            <Maximize aria-hidden />
            Reset view
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
              })
            }
          >
            <SunMoon aria-hidden />
            Toggle theme
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                if (EMAIL_LINK) {
                  void navigator.clipboard.writeText(EMAIL_LINK.value);
                }
              })
            }
          >
            <Copy aria-hidden />
            Copy email
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                const a = document.createElement("a");
                a.href = RESUME_PDF.href;
                a.download = RESUME_PDF.fileName;
                a.click();
              })
            }
          >
            <Download aria-hidden />
            Download resume
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                if (GITHUB_LINK) {
                  window.open(GITHUB_LINK.href, "_blank", "noreferrer");
                }
              })
            }
          >
            <Github aria-hidden />
            Open GitHub
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                if (LINKEDIN_LINK) {
                  window.open(LINKEDIN_LINK.href, "_blank", "noreferrer");
                }
              })
            }
          >
            <Linkedin aria-hidden />
            Open LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
