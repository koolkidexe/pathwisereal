import { motion } from "framer-motion";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";

interface Mission {
  id: string;
  title: string;
  completed: boolean;
  xpReward: number;
}

const SAMPLE_MISSIONS: Mission[] = [
  { id: "1", title: "Complete 1 Math lesson", completed: true, xpReward: 25 },
  { id: "2", title: "Practice 10 questions", completed: false, xpReward: 30 },
  { id: "3", title: "Review yesterday's mistakes", completed: false, xpReward: 20 },
  { id: "4", title: "Explore a new topic", completed: false, xpReward: 15 },
];

export function DailyMissions() {
  const completed = SAMPLE_MISSIONS.filter((m) => m.completed).length;

  return (
    <div className="glass rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold">Daily Missions</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {completed}/{SAMPLE_MISSIONS.length} complete
        </span>
      </div>

      <div className="space-y-2">
        {SAMPLE_MISSIONS.map((mission, i) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              mission.completed ? "bg-primary/5" : "bg-muted/30 hover:bg-muted/50"
            }`}
          >
            {mission.completed ? (
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
            )}
            <span className={`text-sm flex-1 ${mission.completed ? "line-through text-muted-foreground" : ""}`}>
              {mission.title}
            </span>
            <span className="text-xs text-primary font-medium">+{mission.xpReward} XP</span>
          </motion.div>
        ))}
      </div>

      {completed > 0 && (
        <p className="text-xs text-primary text-center font-medium animate-pulse-glow">
          🎉 Keep going, you're doing great!
        </p>
      )}
    </div>
  );
}
