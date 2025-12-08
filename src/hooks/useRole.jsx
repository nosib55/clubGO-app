import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    // no user logged in
    if (!user?.email) {
      setRole("");
      setRoleLoading(false);
      return;
    }

    let isMounted = true;
    setRoleLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (isMounted) setRole(res.data.role);
      })
      .catch(() => {
        if (isMounted) setRole("");
      })
      .finally(() => {
        if (isMounted) setRoleLoading(false);
      });

    return () => {
      isMounted = false; // cleanup for safety
    };
  }, [user]);

  return { role, roleLoading };
};

export default useRole;
