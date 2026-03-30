import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
}

export function OnboardingLayout({ children, step, totalSteps }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-glow-secondary/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
          <span className="text-primary glow-text">Path</span>
          <span className="text-foreground">wise</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">Your AI-powered learning journey</p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
