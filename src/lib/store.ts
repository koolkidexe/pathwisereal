import { useState, useCallback } from "react";

export interface UserProfile {
  gradeLevel: string;
  subjects: string[];
  diagnosticCompleted: boolean;
  xp: number;
  level: number;
  streak: number;
  dailyGoalCompleted: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  gradeLevel: "",
  subjects: [],
  diagnosticCompleted: false,
  xp: 0,
  level: 1,
  streak: 0,
  dailyGoalCompleted: false,
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("pathwise-profile");
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem("pathwise-profile", JSON.stringify(next));
      return next;
    });
  }, []);

  const isOnboarded = profile.gradeLevel !== "" && profile.subjects.length > 0;

  return { profile, updateProfile, isOnboarded };
}
