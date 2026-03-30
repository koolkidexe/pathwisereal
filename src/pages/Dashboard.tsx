import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Map, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { XPBar } from "@/components/dashboard/XPBar";
import { DailyMissions } from "@/components/dashboard/DailyMissions";
import { UserProfile } from "@/lib/store";
import { SUBJECTS } from "@/lib/constants";

interface DashboardProps {
  profile: UserProfile;
}

export default function Dashboard({ profile }: DashboardProps) {
  const navigate = useNavigate();
  const selectedSubjects = SUBJECTS.filter((s) => profile.subjects.includes(s.value));

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto relative">
      {/* Background effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-glow-secondary/5 blur-[100px]" />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-primary glow-text">Path</span>wise
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back! Let's keep learning.</p>
          </div>
        </motion.div>

        {/* XP Bar */}
        <motion.div variants={item}>
          <XPBar xp={profile.xp} level={profile.level} streak={profile.streak} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            className="h-14 text-base font-semibold glow-primary-sm gap-2"
            onClick={() => {}}
          >
            <Play className="w-5 h-5" />
            Resume Learning
          </Button>
          <Button
            variant="outline"
            className="h-14 text-base font-medium gap-2 glass-hover"
            onClick={() => {}}
          >
            <Map className="w-5 h-5" />
            View Study Plan
          </Button>
          <Button
            variant="outline"
            className="h-14 text-base font-medium gap-2 glass-hover"
            onClick={() => {}}
          >
            <BookOpen className="w-5 h-5" />
            All Material
          </Button>
        </motion.div>

        {/* Next Recommended */}
        <motion.div variants={item}>
          <div className="glass rounded-xl p-5 border-primary/20 border glow-primary-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                  Recommended Next
                </p>
                <h3 className="font-display font-semibold text-lg">
                  Introduction to Algebra
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Learn the fundamentals of variables and equations
                </p>
              </div>
              <Button size="icon" className="shrink-0 glow-primary-sm">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Missions */}
          <DailyMissions />

          {/* Subjects */}
          <div className="glass rounded-xl p-5 space-y-4">
            <h3 className="font-display font-semibold">Your Subjects</h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedSubjects.map((subject, i) => (
                <motion.div
                  key={subject.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
                >
                  <span className="text-lg">{subject.icon}</span>
                  <p className="text-sm font-medium mt-1 group-hover:text-primary transition-colors">
                    {subject.label}
                  </p>
                  <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/50"
                      style={{ width: `${Math.random() * 60 + 10}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
