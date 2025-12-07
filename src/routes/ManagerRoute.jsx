import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import useRole from "../hooks/useRole";

const ManagerRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <p>Checking role...</p>;

  if (role !== "manager" && role !== "admin") return <Navigate to="/" />;

  return <PrivateRoute>{children}</PrivateRoute>;
};

export default ManagerRoute;
