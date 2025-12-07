import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import useRole from "../hooks/useRole";

const MemberRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <p>Checking role...</p>;

  if (role !== "member" && role !== "manager" && role !== "admin")
    return <Navigate to="/" />;

  return <PrivateRoute>{children}</PrivateRoute>;
};

export default MemberRoute;
