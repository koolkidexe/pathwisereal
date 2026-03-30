import { useUserProfile } from "@/lib/store";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { isOnboarded } = useUserProfile();
  return <Navigate to={isOnboarded ? "/dashboard" : "/onboarding"} replace />;
};

export default Index;
