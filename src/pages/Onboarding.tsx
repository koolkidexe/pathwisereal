import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { GradeStep } from "@/components/onboarding/GradeStep";
import { SubjectsStep } from "@/components/onboarding/SubjectsStep";
import { DiagnosticStep } from "@/components/onboarding/DiagnosticStep";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Diagnostic from "./Diagnostic";
import { UserProfile } from "@/lib/store";

interface OnboardingProps {
  onComplete: (updates: Partial<UserProfile>) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  const tempProfile: UserProfile = {
    gradeLevel: grade,
    subjects,
    xp: 0,
    level: 1,
    streak: 0,
    lastStudyDate: null,
    diagnosticCompleted: false,
    completedLessons: [],
  };

  const finish = (withDiagnostic: boolean) => {
    onComplete({ gradeLevel: grade, subjects, diagnosticCompleted: withDiagnostic });
    navigate("/dashboard");
  };

  return (
    <>
      <OnboardingLayout step={step} totalSteps={3}>
        {step === 0 && (
          <GradeStep value={grade} onChange={setGrade} onNext={() => setStep(1)} />
        )}
        {step === 1 && (
          <SubjectsStep
            selected={subjects}
            onChange={setSubjects}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <DiagnosticStep
            onStart={() => setShowDiagnostic(true)}
            onSkip={() => finish(false)}
            onBack={() => setStep(1)}
          />
        )}
      </OnboardingLayout>

      <Dialog open={showDiagnostic} onOpenChange={setShowDiagnostic}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-border/50">
          <Diagnostic
            profile={tempProfile}
            updateProfile={(updates) => {
              onComplete({ gradeLevel: grade, subjects, ...updates });
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
