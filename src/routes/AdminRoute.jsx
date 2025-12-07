import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <p>Checking role...</p>;

  if (role !== "admin") return <Navigate to="/" />;

  return <PrivateRoute>{children}</PrivateRoute>;
};

export default AdminRoute;
