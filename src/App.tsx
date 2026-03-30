import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUserProfile } from "@/lib/store";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { profile, updateProfile, isOnboarded } = useUserProfile();

  return (
    <Routes>
      <Route
        path="/"
        element={isOnboarded ? <Navigate to="/dashboard" replace /> : <Navigate to="/onboarding" replace />}
      />
      <Route
        path="/onboarding"
        element={
          isOnboarded ? <Navigate to="/dashboard" replace /> : <Onboarding onComplete={updateProfile} />
        }
      />
      <Route
        path="/dashboard"
        element={
          isOnboarded ? <Dashboard profile={profile} /> : <Navigate to="/onboarding" replace />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
