import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { isOnboarded } = useAuth();
  return <Navigate to={isOnboarded ? "/dashboard" : "/onboarding"} replace />;
};

export default Index;
