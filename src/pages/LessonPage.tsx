import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SAMPLE_TOPICS, Question } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, HelpCircle, Lightbulb, BookOpen, Brain, Video } from "lucide-react";
import { UserProfile } from "@/lib/store";
import { VideoLessonPlayer } from "@/components/video/VideoLessonPlayer";
import { SUBJECTS } from "@/lib/constants";

interface LessonProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export default function LessonPage({ profile, updateProfile }: LessonProps) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"learn" | "video" | "practice">("learn");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [stuckMode, setStuckMode] = useState(false);
  const [stuckStep, setStuckStep] = useState(0);

  let lesson = null;
  let lessonSubject = "";
  for (const topic of SAMPLE_TOPICS) {
    for (const st of topic.subtopics) {
      const found = st.lessons.find(l => l.id === lessonId);
      if (found) { lesson = found; lessonSubject = topic.subject; break; }
    }
    if (lesson) break;
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass rounded-xl p-8 text-center space-y-4 max-w-md">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto" />
          <h2 className="text-xl font-display font-semibold">Lesson not found</h2>
          <Button onClick={() => navigate("/study-plan")}>Back to Study Plan</Button>
        </div>
      </div>
    );
  }

  const questions = lesson.practiceQuestions;
  const currentQ = questions[currentQIndex];

  const handleAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === currentQ.correctIndex) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentQIndex + 1 >= questions.length) {
      setPracticeComplete(true);
      updateProfile({ xp: profile.xp + lesson!.xpReward });
      return;
    }
    setCurrentQIndex(prev => prev + 1);
    setSelected(null);
    setShowExplanation(false);
    setStuckMode(false);
    setStuckStep(0);
  };

  const stuckHints = currentQ ? [
    `Think about what the question is really asking. Focus on "${currentQ.question.split(" ").slice(0, 5).join(" ")}..."`,
    `Try to eliminate obviously wrong answers first. Look at each option carefully.`,
    `Here's a hint: The answer involves ${currentQ.explanation.split(" ").slice(0, 6).join(" ")}...`,
  ] : [];

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-display font-semibold mt-6 mb-2 text-primary">{line.slice(3)}</h2>;
      if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-display font-bold mt-6 mb-3">{line.slice(2)}</h1>;
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) return <li key={i} className="ml-4 mb-1"><span className="font-semibold text-foreground">{match[1]}</span>{match[2] && `: ${match[2]}`}</li>;
      }
      if (line.startsWith("- ")) return <li key={i} className="ml-4 mb-1 text-muted-foreground">{line.slice(2)}</li>;
      if (line.startsWith("|")) return null; // skip tables for simplicity
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return <p key={i} className="mb-2 text-muted-foreground leading-relaxed">{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-foreground">{p}</strong> : p)}</p>;
      }
      if (line.includes("`")) {
        const parts = line.split(/`(.*?)`/g);
        return <p key={i} className="mb-2 text-muted-foreground leading-relaxed">{parts.map((p, j) => j % 2 === 1 ? <code key={j} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-sm font-mono">{p}</code> : p)}</p>;
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="mb-2 text-muted-foreground leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-3xl mx-auto relative">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-primary/5 blur-[100px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-display font-bold">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground">{lesson.description} • {lesson.duration} • +{lesson.xpReward} XP</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-muted/30">
          {[{ key: "learn" as const, label: "Learn", icon: BookOpen }, { key: "practice" as const, label: "Practice", icon: Brain }].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setPracticeComplete(false); setCurrentQIndex(0); setSelected(null); setShowExplanation(false); setScore(0); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${tab === t.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              <t.icon className="w-4 h-4" />{t.label}{t.key === "practice" && questions.length > 0 && <span className="text-xs opacity-70">({questions.length})</span>}
            </button>
          ))}
        </div>

        {/* Learn Tab */}
        {tab === "learn" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-6 md:p-8">
            {renderMarkdown(lesson.content)}
            {questions.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border/50">
                <Button onClick={() => setTab("practice")} className="glow-primary-sm">
                  <Brain className="w-4 h-4 mr-2" /> Practice Questions <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Practice Tab */}
        {tab === "practice" && questions.length === 0 && (
          <div className="glass rounded-xl p-8 text-center space-y-3">
            <Brain className="w-10 h-10 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">No practice questions for this lesson yet.</p>
          </div>
        )}

        {tab === "practice" && questions.length > 0 && !practiceComplete && currentQ && (
          <AnimatePresence mode="wait">
            <motion.div key={currentQIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Question {currentQIndex + 1} of {questions.length}</span>
                <span className="text-primary font-medium">{score}/{currentQIndex + (showExplanation ? 1 : 0)} correct</span>
              </div>
              <h2 className="text-lg font-semibold">{currentQ.question}</h2>
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => {
                  let style = "border-border/50 bg-muted/30 hover:border-primary/50";
                  if (showExplanation) {
                    if (i === currentQ.correctIndex) style = "border-xp bg-xp/10";
                    else if (i === selected) style = "border-destructive bg-destructive/10";
                    else style = "border-border/30 bg-muted/20 opacity-50";
                  }
                  return (
                    <motion.button key={i} whileHover={!showExplanation ? { scale: 1.01 } : {}} onClick={() => handleAnswer(i)} className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${style}`}>
                      <span className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium shrink-0">{String.fromCharCode(65 + i)}</span>
                      <span className="text-sm flex-1">{opt}</span>
                      {showExplanation && i === currentQ.correctIndex && <CheckCircle2 className="w-5 h-5 text-xp shrink-0" />}
                      {showExplanation && i === selected && i !== currentQ.correctIndex && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Stuck Mode */}
              {!showExplanation && (
                <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setStuckMode(true)}>
                  <HelpCircle className="w-4 h-4 mr-1" /> I'm Stuck
                </Button>
              )}
              {stuckMode && !showExplanation && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-accent/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-accent-foreground">
                    <Lightbulb className="w-4 h-4 text-streak" /> Step-by-step help
                  </div>
                  {stuckHints.slice(0, stuckStep + 1).map((hint, i) => (
                    <motion.p key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-muted-foreground pl-6">{hint}</motion.p>
                  ))}
                  {stuckStep < stuckHints.length - 1 && (
                    <Button variant="ghost" size="sm" onClick={() => setStuckStep(prev => prev + 1)} className="text-xs text-primary">Show next hint</Button>
                  )}
                </motion.div>
              )}

              {showExplanation && (
                <>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground"><span className="text-foreground font-medium">Explanation:</span> {currentQ.explanation}</p>
                  </motion.div>
                  <Button className="w-full h-11 font-semibold" onClick={nextQuestion}>
                    {currentQIndex + 1 >= questions.length ? "Finish" : "Next Question"} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {tab === "practice" && practiceComplete && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-xl p-8 text-center space-y-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 8 }} className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-display font-bold">Practice Complete!</h2>
            <p className="text-lg">Score: <span className="text-primary font-bold">{score}/{questions.length}</span></p>
            <p className="text-sm text-primary font-medium">+{lesson.xpReward} XP earned!</p>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => { setCurrentQIndex(0); setSelected(null); setShowExplanation(false); setScore(0); setPracticeComplete(false); }}>Retry</Button>
              <Button className="flex-1 glow-primary-sm" onClick={() => navigate("/study-plan")}>Continue</Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
