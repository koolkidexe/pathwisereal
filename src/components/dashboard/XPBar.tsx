import { motion } from "framer-motion";
import { Flame, Zap, Trophy, Target } from "lucide-react";
import { LEVEL_TITLES } from "@/lib/constants";

interface XPBarProps {
  xp: number;
  level: number;
  streak: number;
}

const XP_PER_LEVEL = 500;

export function XPBar({ xp, level, streak }: XPBarProps) {
  const progress = (xp % XP_PER_LEVEL) / XP_PER_LEVEL;
  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];

  return (
    <div className="glass rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Level {level}</p>
            <p className="text-xs text-muted-foreground">{title}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-streak" />
            <span className="text-sm font-semibold">{streak}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">{xp} XP</span>
          </div>
        </div>
      </div>

      <div className="relative h-3 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(140 70% 45%), hsl(187 92% 50%))" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-right">
        {xp % XP_PER_LEVEL} / {XP_PER_LEVEL} XP to Level {level + 1}
      </p>
    </div>
  );
}
