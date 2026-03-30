import { GRADE_LEVELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";

interface GradeStepProps {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
}

export function GradeStep({ value, onChange, onNext }: GradeStepProps) {
  return (
    <div className="glass rounded-xl p-8 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold">What's your grade level?</h2>
          <p className="text-muted-foreground text-sm">This helps us personalize your learning path</p>
        </div>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-muted/50 border-border/50 h-12">
          <SelectValue placeholder="Select your grade level" />
        </SelectTrigger>
        <SelectContent>
          {GRADE_LEVELS.map((g) => (
            <SelectItem key={g.value} value={g.value}>
              {g.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className="w-full h-12 font-semibold glow-primary-sm"
        disabled={!value}
        onClick={onNext}
      >
        Continue
      </Button>
    </div>
  );
}
