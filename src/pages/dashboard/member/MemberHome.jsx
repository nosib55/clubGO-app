import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import axios from "axios";

const MemberHome = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const [message, setMessage] = useState("");

  const handleRequest = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/manager/request`,
        {
          email: user.email,
          name: user.displayName || "Unknown User"
        },
        { withCredentials: true }
      );

      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Member Dashboard</h2>

      <p className="mb-4">Welcome, {user?.displayName || user?.email}</p>

      {role === "member" && (
        <button
          onClick={handleRequest}
          className="btn btn-primary"
        >
          Request to Become Manager
        </button>
      )}

      {message && <p className="mt-3 text-blue-600">{message}</p>}
    </div>
  );
};

export default MemberHome;
