import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

type ThemeToggleButtonProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export const ThemeToggleButton = ({ isDark, onToggleTheme }: ThemeToggleButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={onToggleTheme}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.65, y: 2 }}
            animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.65, y: -2 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.65, y: 2 }}
            animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.65, y: -2 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
