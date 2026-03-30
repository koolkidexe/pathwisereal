import { motion } from "framer-motion";
import { SAMPLE_TOPICS } from "@/lib/data";
import { SUBJECTS } from "@/lib/constants";
import { UserProfile } from "@/lib/store";
import { ChevronRight, BookOpen, CheckCircle2, Circle, Lock, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface StudyPlanProps {
  profile: UserProfile;
}

export default function StudyPlan({ profile }: StudyPlanProps) {
  const navigate = useNavigate();
  const topics = SAMPLE_TOPICS.filter(t => profile.subjects.includes(t.subject));
  const [expandedTopic, setExpandedTopic] = useState<string | null>(topics[0]?.id ?? null);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-4xl mx-auto relative">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-primary/5 blur-[120px]" />
      </div>
      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 space-y-6">
        <motion.div variants={item} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Map className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">Your Study Plan</h1>
            <p className="text-muted-foreground text-sm">Personalized roadmap based on your profile</p>
          </div>
        </motion.div>

        {/* Roadmap */}
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => {
            const subjectInfo = SUBJECTS.find(s => s.value === topic.subject);
            const isExpanded = expandedTopic === topic.id;
            const totalLessons = topic.subtopics.reduce((sum, st) => sum + st.lessons.length, 0);
            const completedLessons = topic.subtopics.reduce((sum, st) => sum + st.lessons.filter(l => l.completed).length, 0);
            const progressPct = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

            return (
              <motion.div key={topic.id} variants={item} className="glass rounded-xl overflow-hidden">
                <button onClick={() => setExpandedTopic(isExpanded ? null : topic.id)} className="w-full p-5 flex items-center gap-4 text-left hover:bg-muted/20 transition-colors">
                  {/* Timeline dot */}
                  <div className="relative flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${progressPct === 100 ? "bg-xp/20 text-xp" : "bg-primary/10 text-primary"}`}>
                      {progressPct === 100 ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-sm font-bold">{topicIdx + 1}</span>}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{subjectInfo?.icon}</span>
                      <span className="text-xs text-muted-foreground">{subjectInfo?.label}</span>
                    </div>
                    <h3 className="font-display font-semibold truncate">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{topic.description}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${progressPct}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{completedLessons}/{totalLessons}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </button>

                {/* Expanded subtopics */}
                <AnimatedExpand isOpen={isExpanded}>
                  <div className="px-5 pb-5 space-y-4 border-t border-border/50 pt-4">
                    {topic.subtopics.map(subtopic => (
                      <div key={subtopic.id} className="space-y-2">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{subtopic.title}</h4>
                        <div className="space-y-1.5">
                          {subtopic.lessons.map((lesson, li) => (
                            <motion.button key={lesson.id} whileHover={{ x: 4 }} onClick={() => navigate(`/lesson/${lesson.id}`)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors text-left">
                              {lesson.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-xp shrink-0" />
                              ) : li === 0 || subtopic.lessons[li - 1]?.completed ? (
                                <Circle className="w-5 h-5 text-primary shrink-0" />
                              ) : (
                                <Lock className="w-5 h-5 text-muted-foreground/50 shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{lesson.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{lesson.description}</p>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                                <span>{lesson.duration}</span>
                                <span className="text-primary">+{lesson.xpReward} XP</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedExpand>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedExpand({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  return (
    <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
      {children}
    </motion.div>
  );
}
