import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
import { GradeStep } from "@/components/onboarding/GradeStep";
import { SubjectsStep } from "@/components/onboarding/SubjectsStep";
import { DiagnosticStep } from "@/components/onboarding/DiagnosticStep";
import { UserProfile } from "@/lib/store";

interface OnboardingProps {
  onComplete: (updates: Partial<UserProfile>) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const finish = (withDiagnostic: boolean) => {
    onComplete({ gradeLevel: grade, subjects, diagnosticCompleted: withDiagnostic });
    navigate("/dashboard");
  };

  return (
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
          onStart={() => finish(true)}
          onSkip={() => finish(false)}
          onBack={() => setStep(1)}
        />
      )}
    </OnboardingLayout>
  );
}
