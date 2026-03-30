import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface LevelUpOverlayProps {
  show: boolean;
  level: number;
  title: string;
  onClose: () => void;
}

export function LevelUpOverlay({ show, level, title, onClose }: LevelUpOverlayProps) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

          {/* Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: Math.cos((i * 30 * Math.PI) / 180) * 150,
                y: Math.sin((i * 30 * Math.PI) / 180) * 150,
              }}
              transition={{ duration: 1.5, delay: 0.2 + i * 0.05 }}
              className="absolute w-3 h-3 rounded-full bg-primary"
              style={{ filter: "blur(2px)" }}
            />
          ))}

          {/* Content */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", damping: 8, stiffness: 100 }}
            className="relative text-center space-y-3 z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: 2 }}
              className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center glow-primary"
            >
              <Zap className="w-12 h-12 text-primary" />
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-primary font-medium uppercase tracking-widest"
            >
              Level Up!
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-display font-bold glow-text text-primary"
            >
              Level {level}
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-foreground/80 font-display"
            >
              {title}
            </motion.p>

            {/* Floating XP numbers */}
            {["+50 XP", "+25 XP", "+10 XP"].map((text, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 0, x: (i - 1) * 60 }}
                animate={{ opacity: [0, 1, 0], y: -80 - i * 20 }}
                transition={{ duration: 1.5, delay: 0.8 + i * 0.2 }}
                className="absolute text-primary font-bold text-sm"
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                {text}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
