import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Coins, X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StreakRewardProps {
  streak: number;
  coins: number;
  lastStreakDate: string | null;
  onClaim: (newStreak: number, coinsEarned: number) => void;
}

const STREAK_REWARDS = [
  { day: 1, coins: 10 },
  { day: 2, coins: 15 },
  { day: 3, coins: 20 },
  { day: 4, coins: 25 },
  { day: 5, coins: 35 },
  { day: 6, coins: 40 },
  { day: 7, coins: 75 },
];

function getRewardForStreak(streak: number) {
  const dayInWeek = ((streak - 1) % 7);
  return STREAK_REWARDS[dayInWeek]?.coins || 10;
}

export function StreakReward({ streak, coins, lastStreakDate, onClaim }: StreakRewardProps) {
  const [showReward, setShowReward] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const canClaim = lastStreakDate !== today;

  useEffect(() => {
    if (canClaim && !claimed) {
      const timer = setTimeout(() => setShowReward(true), 800);
      return () => clearTimeout(timer);
    }
  }, [canClaim, claimed]);

  const handleClaim = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const isConsecutive = lastStreakDate === yesterdayStr;
    const newStreak = isConsecutive ? streak + 1 : 1;
    const coinsEarned = getRewardForStreak(newStreak);

    onClaim(newStreak, coinsEarned);
    setClaimed(true);
    setTimeout(() => setShowReward(false), 1500);
  };

  if (!canClaim || claimed) {
    return (
      <div className="glass rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-streak/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-streak" />
            </div>
            <div>
              <p className="text-sm font-medium">{streak} Day Streak</p>
              <p className="text-xs text-muted-foreground">
                {claimed ? "Reward claimed today! 🎉" : "Come back tomorrow for more!"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-400">{coins}</span>
          </div>
        </div>

        {/* Weekly progress */}
        <div className="flex gap-1.5">
          {STREAK_REWARDS.map((r, i) => {
            const dayInWeek = (streak % 7) || 7;
            const isCompleted = i < dayInWeek;
            const isCurrent = i === dayInWeek - 1;
            return (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  isCompleted
                    ? isCurrent
                      ? "bg-streak"
                      : "bg-streak/60"
                    : "bg-muted/30"
                }`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          {STREAK_REWARDS.map((r, i) => (
            <span key={i}>{r.coins}🪙</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Inline teaser */}
      <button
        onClick={() => setShowReward(true)}
        className="glass rounded-xl p-5 w-full text-left hover:border-streak/50 transition-all border border-streak/20 glow-primary-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-streak/10 flex items-center justify-center animate-pulse">
            <Gift className="w-5 h-5 text-streak" />
          </div>
          <div>
            <p className="text-sm font-semibold text-streak">Daily Reward Available!</p>
            <p className="text-xs text-muted-foreground">Tap to claim your streak bonus</p>
          </div>
        </div>
      </button>

      {/* Reward Modal */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowReward(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-8 max-w-sm w-full border border-streak/30 text-center relative"
            >
              <button
                onClick={() => setShowReward(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-streak/10 flex items-center justify-center mx-auto mb-4"
              >
                <Flame className="w-10 h-10 text-streak" />
              </motion.div>

              <h2 className="font-display font-bold text-2xl mb-1">
                {streak > 0 ? `${streak + 1} Day Streak!` : "Start Your Streak!"}
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Claim your daily reward
              </p>

              <div className="flex items-center justify-center gap-2 mb-6">
                <Coins className="w-6 h-6 text-amber-400" />
                <span className="text-3xl font-bold text-amber-400">
                  +{getRewardForStreak(streak > 0 ? streak + 1 : 1)}
                </span>
                <span className="text-muted-foreground text-sm">coins</span>
              </div>

              <Button
                onClick={handleClaim}
                className="w-full h-12 text-base font-semibold gap-2"
                style={{ background: "linear-gradient(135deg, hsl(var(--streak)), hsl(25 95% 53%))" }}
              >
                <Gift className="w-5 h-5" />
                Claim Reward
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
