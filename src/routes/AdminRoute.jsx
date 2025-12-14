import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <p>...</p>;

  if (user && role === "admin") return children;

  return <Navigate to="/" replace />;
};

export default AdminRoute;
