import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DIAGNOSTIC_QUESTIONS, Question, DiagnosticResult } from "@/lib/data";
import { SUBJECTS } from "@/lib/constants";
import { Brain, CheckCircle2, XCircle, ArrowRight, BarChart3 } from "lucide-react";
import { UserProfile } from "@/contexts/AuthContext";

interface DiagnosticProps {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export default function Diagnostic({ profile, updateProfile }: DiagnosticProps) {
  const navigate = useNavigate();
  const relevantQuestions = DIAGNOSTIC_QUESTIONS.filter(q => profile.subjects.includes(q.subject));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ question: Question; selectedIndex: number; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const filteredByDifficulty = relevantQuestions.filter(q => q.difficulty === difficulty);
  const currentQuestion = filteredByDifficulty[currentIndex % Math.max(filteredByDifficulty.length, 1)];
  const totalToAsk = Math.min(relevantQuestions.length, 20);
  const progress = (answers.length / totalToAsk) * 100;

  const handleSelect = useCallback((optionIndex: number) => {
    if (showExplanation || transitioning) return;
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    const correct = optionIndex === currentQuestion.correctIndex;
    setAnswers(prev => [...prev, { question: currentQuestion, selectedIndex: optionIndex, correct }]);

    if (correct) {
      setConsecutiveCorrect(prev => prev + 1);
      setConsecutiveWrong(0);
      if (consecutiveCorrect >= 1 && difficulty === "easy") setDifficulty("medium");
      else if (consecutiveCorrect >= 1 && difficulty === "medium") setDifficulty("hard");
    } else {
      setConsecutiveWrong(prev => prev + 1);
      setConsecutiveCorrect(0);
      if (consecutiveWrong >= 1 && difficulty === "hard") setDifficulty("medium");
      else if (consecutiveWrong >= 1 && difficulty === "medium") setDifficulty("easy");
    }
  }, [showExplanation, transitioning, currentQuestion, consecutiveCorrect, consecutiveWrong, difficulty]);

  const handleNext = () => {
    if (transitioning) return;
    if (answers.length >= totalToAsk) {
      setFinished(true);
      updateProfile({ diagnosticCompleted: true, xp: profile.xp + 50 });
      return;
    }
    setTransitioning(true);
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setTransitioning(false), 600);
  };

  const getResults = (): DiagnosticResult[] => {
    const bySubject: Record<string, { correct: number; total: number; topics: Record<string, boolean[]> }> = {};
    answers.forEach(a => {
      if (!bySubject[a.question.subject]) bySubject[a.question.subject] = { correct: 0, total: 0, topics: {} };
      bySubject[a.question.subject].total++;
      if (a.correct) bySubject[a.question.subject].correct++;
      if (!bySubject[a.question.subject].topics[a.question.topic]) bySubject[a.question.subject].topics[a.question.topic] = [];
      bySubject[a.question.subject].topics[a.question.topic].push(a.correct);
    });
    return Object.entries(bySubject).map(([subject, data]) => {
      const strengths: string[] = [];
      const weaknesses: string[] = [];
      Object.entries(data.topics).forEach(([topic, results]) => {
        const rate = results.filter(Boolean).length / results.length;
        if (rate >= 0.7) strengths.push(topic);
        else weaknesses.push(topic);
      });
      return { subject, score: Math.round((data.correct / data.total) * 100), strengths, weaknesses };
    });
  };

  if (finished) {
    const results = getResults();
    return (
      <div className="min-h-screen p-6 md:p-10 max-w-3xl mx-auto">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="text-center space-y-2">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }} className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold">Diagnostic Complete!</h1>
            <p className="text-muted-foreground">Here's what we learned about you</p>
            <p className="text-sm text-primary font-medium">+50 XP earned!</p>
          </div>

          {results.map((result, i) => {
            const subjectInfo = SUBJECTS.find(s => s.value === result.subject);
            return (
              <motion.div key={result.subject} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="glass rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subjectInfo?.icon}</span>
                    <h3 className="font-display font-semibold text-lg">{subjectInfo?.label}</h3>
                  </div>
                  <div className={`text-2xl font-bold ${result.score >= 70 ? "text-xp" : result.score >= 40 ? "text-streak" : "text-destructive"}`}>
                    {result.score}%
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${result.score}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.15 }} className={`h-full rounded-full ${result.score >= 70 ? "bg-xp" : result.score >= 40 ? "bg-streak" : "bg-destructive"}`} />
                </div>
                {result.strengths.length > 0 && (
                  <div><p className="text-xs text-muted-foreground mb-1">Strengths</p><div className="flex flex-wrap gap-2">{result.strengths.map(s => <span key={s} className="px-2 py-1 rounded-full bg-xp/10 text-xp text-xs font-medium">{s}</span>)}</div></div>
                )}
                {result.weaknesses.length > 0 && (
                  <div><p className="text-xs text-muted-foreground mb-1">Needs Work</p><div className="flex flex-wrap gap-2">{result.weaknesses.map(w => <span key={w} className="px-2 py-1 rounded-full bg-streak/10 text-streak text-xs font-medium">{w}</span>)}</div></div>
                )}
              </motion.div>
            );
          })}

          <Button className="w-full h-12 font-semibold glow-primary-sm" onClick={() => navigate("/dashboard")}>
            <ArrowRight className="w-4 h-4 mr-2" />
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass rounded-xl p-8 text-center space-y-4 max-w-md">
          <Brain className="w-12 h-12 text-primary mx-auto" />
          <h2 className="text-xl font-display font-semibold">No questions available</h2>
          <p className="text-muted-foreground text-sm">We don't have diagnostic questions for your selected subjects yet.</p>
          <Button onClick={() => { updateProfile({ diagnosticCompleted: true }); navigate("/dashboard"); }}>Continue to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold"><span className="text-primary glow-text">Diagnostic</span> Test</h1>
          <p className="text-muted-foreground text-sm mt-1">Question {answers.length + 1} of {totalToAsk} • {difficulty.toUpperCase()}</p>
        </div>
        <Progress value={progress} className="h-2" />
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="glass rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{SUBJECTS.find(s => s.value === currentQuestion.subject)?.label}</span>
              <span>•</span>
              <span>{currentQuestion.topic}</span>
            </div>
            <h2 className="text-lg font-semibold">{currentQuestion.question}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, i) => {
                let style = "border-border/50 bg-muted/30 hover:border-primary/50";
                if (showExplanation) {
                  if (i === currentQuestion.correctIndex) style = "border-xp bg-xp/10";
                  else if (i === selectedOption) style = "border-destructive bg-destructive/10";
                  else style = "border-border/30 bg-muted/20 opacity-50";
                } else if (i === selectedOption) style = "border-primary bg-primary/10";
                return (
                  <motion.button key={i} whileHover={!showExplanation ? { scale: 1.01 } : {}} whileTap={!showExplanation ? { scale: 0.99 } : {}} onClick={() => handleSelect(i)} className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${style}`}>
                    <span className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-sm font-medium shrink-0">{String.fromCharCode(65 + i)}</span>
                    <span className="text-sm">{option}</span>
                    {showExplanation && i === currentQuestion.correctIndex && <CheckCircle2 className="w-5 h-5 text-xp ml-auto shrink-0" />}
                    {showExplanation && i === selectedOption && i !== currentQuestion.correctIndex && <XCircle className="w-5 h-5 text-destructive ml-auto shrink-0" />}
                  </motion.button>
                );
              })}
            </div>
            {showExplanation && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground"><span className="text-foreground font-medium">Explanation:</span> {currentQuestion.explanation}</p>
              </motion.div>
            )}
            {showExplanation && (
              <Button className="w-full h-11 font-semibold" onClick={handleNext}>
                {answers.length >= totalToAsk ? "See Results" : "Next Question"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
