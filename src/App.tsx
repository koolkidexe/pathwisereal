import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "@/components/AppSidebar";
import { LevelUpOverlay } from "@/components/gamification/LevelUpOverlay";
import { LEVEL_TITLES } from "@/lib/constants";
import { useState, useEffect, useRef } from "react";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Diagnostic from "./pages/Diagnostic";
import StudyPlan from "./pages/StudyPlan";
import AllMaterial from "./pages/AllMaterial";
import LessonPage from "./pages/LessonPage";
import ProgressPage from "./pages/ProgressPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AuthenticatedLayout() {
  const { profile, updateProfile } = useAuth();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const prevLevel = useRef(profile.level);

  useEffect(() => {
    const newLevel = Math.floor(profile.xp / 500) + 1;
    if (newLevel !== profile.level) {
      updateProfile({ level: newLevel });
    }
    if (newLevel > prevLevel.current) {
      setShowLevelUp(true);
    }
    prevLevel.current = newLevel;
  }, [profile.xp, profile.level, updateProfile]);

  const levelTitle = LEVEL_TITLES[Math.min(profile.level - 1, LEVEL_TITLES.length - 1)];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar profile={profile} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
            <SidebarTrigger className="ml-3" />
          </header>
          <main className="flex-1">
            <Routes>
              <Route path="/dashboard" element={<Dashboard profile={profile} />} />
              <Route path="/diagnostic" element={<Diagnostic profile={profile} updateProfile={updateProfile} />} />
              <Route path="/study-plan" element={<StudyPlan profile={profile} />} />
              <Route path="/material" element={<AllMaterial />} />
              <Route path="/lesson/:lessonId" element={<LessonPage profile={profile} updateProfile={updateProfile} />} />
              <Route path="/progress" element={<ProgressPage profile={profile} />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <LevelUpOverlay show={showLevelUp} level={profile.level} title={levelTitle} onClose={() => setShowLevelUp(false)} />
    </SidebarProvider>
  );
}

function AppRoutes() {
  const { session, profile, updateProfile, isOnboarded, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <Routes>
        <Route path="*" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isOnboarded ? <Navigate to="/dashboard" replace /> : <Navigate to="/onboarding" replace />}
      />
      <Route
        path="/onboarding"
        element={isOnboarded ? <Navigate to="/dashboard" replace /> : <Onboarding onComplete={updateProfile} />}
      />
      {isOnboarded ? (
        <Route path="/*" element={<AuthenticatedLayout />} />
      ) : (
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      )}
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
