import { motion } from "framer-motion";
import { UserProfile } from "@/contexts/AuthContext";
import { SAMPLE_BADGES } from "@/lib/data";
import { SUBJECTS } from "@/lib/constants";
import { TrendingUp, Calendar, Award, Target, Flame, Zap, BarChart3 } from "lucide-react";

interface ProgressPageProps {
  profile: UserProfile;
}

export default function ProgressPage({ profile }: ProgressPageProps) {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  // Simulated weekly activity
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const activityData = [3, 5, 2, 7, 4, 1, 6];
  const maxActivity = Math.max(...activityData);

  // Simulated monthly heatmap
  const heatmapData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 5));

  const selectedSubjects = SUBJECTS.filter(s => profile.subjects.includes(s.value));

  const earnedBadges = SAMPLE_BADGES.filter(b => b.earned);
  const unearnedBadges = SAMPLE_BADGES.filter(b => !b.earned);

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto relative">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-40 w-80 h-80 rounded-full bg-glow-secondary/5 blur-[120px]" />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 space-y-6">
        <motion.div variants={item} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">Your Progress</h1>
            <p className="text-muted-foreground text-sm">Track your learning journey</p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total XP", value: profile.xp.toString(), icon: Zap, color: "text-primary" },
            { label: "Level", value: profile.level.toString(), icon: TrendingUp, color: "text-xp" },
            { label: "Streak", value: `${profile.streak} days`, icon: Flame, color: "text-streak" },
            { label: "Subjects", value: profile.subjects.length.toString(), icon: Target, color: "text-glow-secondary" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }} className="glass rounded-xl p-4 text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-display font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Weekly Activity */}
        <motion.div variants={item} className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Weekly Activity
          </h3>
          <div className="flex items-end gap-3 h-32">
            {weekDays.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(activityData[i] / maxActivity) * 100}%` }} transition={{ duration: 0.5, delay: i * 0.05 }} className="w-full rounded-t-lg bg-primary/60 min-h-[4px]" style={{ background: `linear-gradient(to top, hsl(187 92% 50% / 0.3), hsl(187 92% 50% / 0.8))` }} />
                <span className="text-xs text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Heatmap */}
        <motion.div variants={item} className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">30-Day Activity</h3>
          <div className="grid grid-cols-10 gap-1.5">
            {heatmapData.map((val, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.015 }} className="aspect-square rounded-sm" style={{ background: val === 0 ? "hsl(220 14% 14%)" : `hsl(187 92% 50% / ${0.15 + val * 0.2})` }} title={`Day ${i + 1}: ${val} activities`} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-xs text-muted-foreground">Less</span>
            {[0, 1, 2, 3, 4].map(v => (
              <div key={v} className="w-3 h-3 rounded-sm" style={{ background: v === 0 ? "hsl(220 14% 14%)" : `hsl(187 92% 50% / ${0.15 + v * 0.2})` }} />
            ))}
            <span className="text-xs text-muted-foreground">More</span>
          </div>
        </motion.div>

        {/* Subject Performance */}
        <motion.div variants={item} className="glass rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Subject Confidence</h3>
          <div className="space-y-3">
            {selectedSubjects.map((subject, i) => {
              const confidence = Math.floor(Math.random() * 60 + 30);
              return (
                <div key={subject.value} className="flex items-center gap-3">
                  <span className="text-lg w-8">{subject.icon}</span>
                  <span className="text-sm font-medium w-32 truncate">{subject.label}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${confidence}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full rounded-full" style={{ background: confidence >= 70 ? "hsl(140 70% 45%)" : confidence >= 40 ? "hsl(35 95% 55%)" : "hsl(0 72% 51%)" }} />
                  </div>
                  <span className="text-sm font-semibold w-12 text-right">{confidence}%</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div variants={item} className="glass rounded-xl p-6 space-y-4">
          <h3 className="font-display font-semibold flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> Achievements
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {earnedBadges.map((badge, i) => (
              <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center glow-primary-sm">
                <span className="text-3xl">{badge.icon}</span>
                <p className="text-xs font-semibold mt-2">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </motion.div>
            ))}
            {unearnedBadges.map(badge => (
              <div key={badge.id} className="p-4 rounded-lg bg-muted/20 border border-border/30 text-center opacity-50">
                <span className="text-3xl grayscale">{badge.icon}</span>
                <p className="text-xs font-semibold mt-2">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
