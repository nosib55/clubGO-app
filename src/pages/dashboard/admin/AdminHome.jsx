import {
  FaUsers,
  FaClipboardList,
  FaRegCalendarAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../assets/animated/Loding";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a"];

const AdminHome = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/stats`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Failed to load admin dashboard data
      </div>
    );
  }

  const pieData = [
    { name: "Club Revenue", value: data.clubRevenue },
    { name: "Event Revenue", value: data.eventRevenue },
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaUsers className="text-4xl text-blue-600" />}
          title="Total Users"
          value={data.totalUsers}
        />

        <StatCard
          icon={<FaClipboardList className="text-4xl text-green-600" />}
          title="Total Clubs"
          value={data.totalClubs}
        />

        <StatCard
          icon={<FaRegCalendarAlt className="text-4xl text-purple-600" />}
          title="Total Events"
          value={data.totalEvents}
        />

        <StatCard
          icon={<FaMoneyBill className="text-4xl text-red-600" />}
          title="Total Revenue"
          value={`$${data.totalRevenue}`}
        />
      </div>

      {/* ================= PIE CHART ================= */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">
          💰 Revenue Distribution
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="p-6 bg-white shadow rounded-xl flex items-center gap-4">
    {icon}
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminHome;
