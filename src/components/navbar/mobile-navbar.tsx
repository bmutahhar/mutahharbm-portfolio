import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { navItems, type NavItemId } from "./nav-items";
import { ThemeToggleButton } from "./theme-toggle-button";

type MobileNavbarProps = {
  isDark: boolean;
  onNavigate: (nodeId: NavItemId) => void;
  onToggleTheme: () => void;
};

export const MobileNavbar = ({ isDark, onNavigate, onToggleTheme }: MobileNavbarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavigate = (nodeId: NavItemId) => {
    onNavigate(nodeId);
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <ThemeToggleButton isDark={isDark} onToggleTheme={onToggleTheme} />

      <Drawer direction="right" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button type="button" variant="outline" size="icon" aria-label="Open navigation menu">
            <Menu className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="border-l border-primary/10 bg-background/95 backdrop-blur-xl">
          <DrawerHeader className="pb-2">
            <DrawerTitle>Navigate</DrawerTitle>
            <DrawerDescription>Jump to a section on the canvas.</DrawerDescription>
          </DrawerHeader>

          <div className="space-y-1 px-4 pb-6">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <DrawerClose asChild key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className="group flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-3 text-left text-sm text-foreground transition-colors hover:border-primary/20 hover:bg-accent"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                    <span>{item.label}</span>
                  </button>
                </DrawerClose>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
