import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SlideExercise } from "@/lib/ai-lesson";

interface ExerciseOverlayProps {
  exercise: SlideExercise;
  onComplete: () => void;
}

export function ExerciseOverlay({ exercise, onComplete }: ExerciseOverlayProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === exercise.correctIndex;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-full max-w-md mx-4 rounded-xl border border-border bg-card p-6 space-y-5 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <h3 className="font-display font-bold text-lg text-foreground">Quick Check</h3>
        </div>

        {/* Question */}
        <p className="text-sm text-foreground/90 leading-relaxed font-medium">
          {exercise.question}
        </p>

        {/* Options */}
        <div className="space-y-2">
          {exercise.options.map((option, i) => {
            let optionClass = "border-border bg-muted/30 hover:bg-muted/60";
            if (submitted) {
              if (i === exercise.correctIndex) {
                optionClass = "border-green-500/60 bg-green-500/10";
              } else if (i === selected && !isCorrect) {
                optionClass = "border-destructive/60 bg-destructive/10";
              } else {
                optionClass = "border-border bg-muted/20 opacity-50";
              }
            } else if (i === selected) {
              optionClass = "border-primary bg-primary/10";
            }

            return (
              <button
                key={i}
                onClick={() => !submitted && setSelected(i)}
                disabled={submitted}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm flex items-center gap-3 ${optionClass}`}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{option}</span>
                {submitted && i === exercise.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                )}
                {submitted && i === selected && !isCorrect && i !== exercise.correctIndex && (
                  <XCircle className="w-5 h-5 text-destructive shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm font-medium ${isCorrect ? "text-green-500" : "text-destructive"}`}
          >
            {isCorrect ? "🎉 Great job! That's correct!" : "Not quite — the correct answer is highlighted above."}
          </motion.p>
        )}

        {/* Action button */}
        <div className="flex justify-end">
          {!submitted ? (
            <Button onClick={handleSubmit} disabled={selected === null} className="glow-primary-sm">
              Submit
            </Button>
          ) : (
            <Button onClick={onComplete} className="glow-primary-sm">
              Move On <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}