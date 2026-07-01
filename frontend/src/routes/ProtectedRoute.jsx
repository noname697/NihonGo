import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoadingUser } = useAuth();

  if (isLoadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-ink dark:bg-ink dark:text-paper">
        Loading NihonGo!...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
