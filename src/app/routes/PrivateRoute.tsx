import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export function PrivateRoute({ children }: any) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}