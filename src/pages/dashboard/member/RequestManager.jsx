import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const RequestManager = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!user?.email) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/manager/request`,
        {
          email: user.email,
          name: user.displayName || "Member",
        },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Request Sent!",
        text: res.data.message || "Your manager request was submitted.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text:
          err.response?.data?.message ||
          "You have already submitted a request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow"
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Request Manager Role
      </h1>

      <p className="text-gray-600 mb-6">
        As a manager, you can create clubs, manage events, and oversee member
        activities. Submit a request below for admin approval.
      </p>

      <div className="bg-gray-100 p-4 rounded-xl mb-6">
        <p className="text-sm text-gray-700">
          <strong>Name:</strong> {user?.displayName || "N/A"}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <button
        onClick={handleRequest}
        disabled={loading}
        className={`btn btn-primary w-full ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting Request..." : "Request Manager Role"}
      </button>
    </motion.div>
  );
};

export default RequestManager;

