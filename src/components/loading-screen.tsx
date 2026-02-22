"use client";

import { AnimatePresence, motion } from "motion/react";

type LoadingScreenProps = {
  visible: boolean;
};

export const LoadingScreen = ({ visible }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="pointer-events-auto absolute inset-0 z-[40] flex items-center justify-center bg-background/95 backdrop-blur-md"
        >
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative h-16 w-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
                className="absolute inset-[10px] rounded-full border border-primary/30 border-b-primary/90"
              />
            </div>

            <motion.p
              className="text-sm tracking-wide text-muted-foreground"
            >
              Loading interactive portfolio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
