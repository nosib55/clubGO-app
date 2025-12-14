import { useEffect, useState } from "react";
import Loading from "../../../assets/animated/Loding";

const ManagerHome = () => {
  const [loading, setLoading] = useState(true);
  const [managerName, setManagerName] = useState("");

  useEffect(() => {
    // 🔹 example: user stored after login
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.name) {
      setManagerName(user.name);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">
        👋 Welcome, {managerName || "Manager"}
      </h2>

      <p className="text-gray-600 text-lg">
        Here is an overview of manager activities and quick actions.
      </p>

      <div className="mt-6 p-6 bg-white rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-2">Quick Tips</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Create and manage clubs</li>
          <li>Organize events</li>
          <li>Track event registrations</li>
        </ul>
      </div>
    </div>
  );
};

export default ManagerHome;
