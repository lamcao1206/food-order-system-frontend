import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "@/lib/zustand/stores/useUserStore";

interface ProtectedRouteProps {
  allowedRole: 'normal' | 'restaurant';
}

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const user = useUserStore((state) => state.user);

  // If no user, redirect to landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user role doesn't match allowed role, redirect to landing page
  if (user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
