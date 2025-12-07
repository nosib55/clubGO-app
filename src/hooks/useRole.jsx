import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) {
      // No user → no need to fetch
      setRole("");
      setRoleLoading(false);
      return;
    }

    // Start loading only when a request is actually needed
    setRoleLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`)
      .then((res) => setRole(res.data.role))
      .finally(() => setRoleLoading(false));
  }, [user]);

  return { role, roleLoading };
};

export default useRole;
