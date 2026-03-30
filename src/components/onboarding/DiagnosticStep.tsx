import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, SkipForward } from "lucide-react";

interface DiagnosticStepProps {
  onStart: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export function DiagnosticStep({ onStart, onSkip, onBack }: DiagnosticStepProps) {
  return (
    <div className="glass rounded-xl p-8 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold">Diagnostic Test</h2>
          <p className="text-muted-foreground text-sm">Discover your strengths & weaknesses</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-muted/30 rounded-lg p-4 space-y-3"
      >
        <p className="text-sm text-foreground/80">
          Take a quick adaptive test to help us build the <span className="text-primary font-medium">perfect study plan</span> for you.
        </p>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Adapts to your level in real-time
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Takes about 5-10 minutes
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Shows a personalized strengths report
          </li>
        </ul>
      </motion.div>

      <div className="space-y-3">
        <Button
          className="w-full h-12 font-semibold glow-primary-sm"
          onClick={onStart}
        >
          <Brain className="w-4 h-4 mr-2" />
          Take Diagnostic Test
        </Button>
        <Button
          variant="ghost"
          className="w-full h-10 text-muted-foreground"
          onClick={onSkip}
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip for now
        </Button>
        <Button variant="outline" className="w-full h-10" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
