import { SUBJECTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface SubjectsStepProps {
  selected: string[];
  onChange: (subjects: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SubjectsStep({ selected, onChange, onNext, onBack }: SubjectsStepProps) {
  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((s) => s !== value)
        : [...selected, value]
    );
  };

  const selectAll = () => {
    onChange(selected.length === SUBJECTS.length ? [] : SUBJECTS.map((s) => s.value));
  };

  return (
    <div className="glass rounded-xl p-8 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold">Choose your subjects</h2>
          <p className="text-muted-foreground text-sm">Pick the subjects you want to study</p>
        </div>
      </div>

      <button
        onClick={selectAll}
        className="text-sm text-primary hover:text-primary/80 transition-colors"
      >
        {selected.length === SUBJECTS.length ? "Deselect All" : "Select All"}
      </button>

      <div className="grid grid-cols-2 gap-3">
        {SUBJECTS.map((subject) => {
          const isSelected = selected.includes(subject.value);
          return (
            <motion.button
              key={subject.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(subject.value)}
              className={`relative p-4 rounded-lg border text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary/10 glow-primary-sm"
                  : "border-border/50 bg-muted/30 hover:border-border"
              }`}
            >
              {isSelected && (
                <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-primary" />
              )}
              <span className="text-lg">{subject.icon}</span>
              <p className="text-sm font-medium mt-1">{subject.label}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 h-12" onClick={onBack}>
          Back
        </Button>
        <Button
          className="flex-1 h-12 font-semibold glow-primary-sm"
          disabled={selected.length === 0}
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
