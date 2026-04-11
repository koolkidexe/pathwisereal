import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

export interface UserProfile {
  gradeLevel: string;
  subjects: string[];
  diagnosticCompleted: boolean;
  xp: number;
  level: number;
  streak: number;
  coins: number;
  lastStreakDate: string | null;
  dailyGoalCompleted: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  gradeLevel: "",
  subjects: [],
  diagnosticCompleted: false,
  xp: 0,
  level: 1,
  streak: 0,
  coins: 0,
  lastStreakDate: null,
  dailyGoalCompleted: false,
};

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  isOnboarded: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data && !error) {
      setProfile({
        gradeLevel: data.grade_level || "",
        subjects: data.subjects || [],
        diagnosticCompleted: data.diagnostic_completed || false,
        xp: data.xp || 0,
        level: data.level || 1,
        streak: data.streak || 0,
        coins: data.coins || 0,
        lastStreakDate: data.last_streak_date || null,
        dailyGoalCompleted: data.daily_goal_completed || false,
      });
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => fetchProfile(session.user.id), 0);
        } else {
          setProfile(DEFAULT_PROFILE);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);

    if (!user) return;

    const dbUpdates: { [key: string]: string | number | boolean | string[] | null } = {};
    if (updates.gradeLevel !== undefined) dbUpdates.grade_level = updates.gradeLevel;
    if (updates.subjects !== undefined) dbUpdates.subjects = updates.subjects;
    if (updates.diagnosticCompleted !== undefined) dbUpdates.diagnostic_completed = updates.diagnosticCompleted;
    if (updates.xp !== undefined) dbUpdates.xp = updates.xp;
    if (updates.level !== undefined) dbUpdates.level = updates.level;
    if (updates.streak !== undefined) dbUpdates.streak = updates.streak;
    if (updates.coins !== undefined) dbUpdates.coins = updates.coins;
    if (updates.lastStreakDate !== undefined) dbUpdates.last_streak_date = updates.lastStreakDate;
    if (updates.dailyGoalCompleted !== undefined) dbUpdates.daily_goal_completed = updates.dailyGoalCompleted;
    dbUpdates.updated_at = new Date().toISOString();

    await supabase.from("profiles").update(dbUpdates as any).eq("id", user.id);
  }, [profile, user]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const isOnboarded = profile.gradeLevel !== "" && profile.subjects.length > 0;

  return (
    <AuthContext.Provider value={{ session, user, profile, updateProfile, isOnboarded, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
