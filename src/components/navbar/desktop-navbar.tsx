import { motion } from "motion/react";
import { navItems, type NavItemId } from "./nav-items";
import { ThemeToggleButton } from "./theme-toggle-button";

type DesktopNavbarProps = {
  isDark: boolean;
  onNavigate: (nodeId: NavItemId) => void;
  onToggleTheme: () => void;
};

export const DesktopNavbar = ({ isDark, onNavigate, onToggleTheme }: DesktopNavbarProps) => {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <div className="flex items-center gap-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              onClick={() => onNavigate(item.id)}
              className="group relative flex items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-sm text-accent-foreground transition-colors"
            >
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-foreground/8 to-foreground/4 opacity-0 transition-opacity group-hover:opacity-100"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />

              <Icon className="relative z-10 h-4 w-4 transition-transform group-hover:rotate-12" />
              <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
                {item.label}
              </span>

              <motion.div
                className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-foreground/0 via-foreground/35 to-foreground/0"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          );
        })}
      </div>

      <ThemeToggleButton isDark={isDark} onToggleTheme={onToggleTheme} />
    </div>
  );
};
