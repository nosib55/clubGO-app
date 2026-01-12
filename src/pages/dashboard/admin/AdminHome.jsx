import {
  FaUsers,
  FaClipboardList,
  FaRegCalendarAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../assets/animated/Loding";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

/* ================= KPI CARD ================= */
const KpiCard = ({ icon, label, value }) => (
  <div className="bg-base-100 rounded-2xl shadow p-6 flex flex-col gap-2">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-base-content/60 text-sm">{label}</span>
    </div>
    <h2 className="text-3xl font-bold">{value}</h2>
  </div>
);

/* ================= D3 DONUT ================= */
const DonutChart = ({ value, max, label, color }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 180;
    const height = 180;
    const radius = width / 2;
    const thickness = 18;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${radius}, ${radius})`);

    const arc = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);

    const background = arc({
      startAngle: 0,
      endAngle: 2 * Math.PI,
    });

    g.append("path")
      .attr("d", background)
      .attr("fill", "#e5e7eb");

    const foreground = arc({
      startAngle: 0,
      endAngle: (value / max) * 2 * Math.PI,
    });

    g.append("path")
      .attr("d", foreground)
      .attr("fill", color);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("class", "text-xl font-bold")
      .text(`${Math.round((value / max) * 100)}%`);
  }, [value, max, color]);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg ref={ref} />
      <span className="text-sm text-base-content/70">{label}</span>
    </div>
  );
};

/* ================= ADMIN HOME ================= */
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

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Admin Overview</h1>

      {/* ================= KPI ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          icon={<FaUsers className="text-blue-600 text-xl" />}
          label="Users"
          value={data.totalUsers}
        />
        <KpiCard
          icon={<FaClipboardList className="text-green-600 text-xl" />}
          label="Clubs"
          value={data.totalClubs}
        />
        <KpiCard
          icon={<FaRegCalendarAlt className="text-purple-600 text-xl" />}
          label="Events"
          value={data.totalEvents}
        />
        <KpiCard
          icon={<FaMoneyBill className="text-red-600 text-xl" />}
          label="Revenue"
          value={`$${data.totalRevenue}`}
        />
      </div>

      {/* ================= DONUT METRICS ================= */}
      <div className="bg-base-100 rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">Revenue Performance</h2>

        <div className="flex flex-wrap gap-10 justify-center">
          <DonutChart
            value={data.clubRevenue}
            max={data.totalRevenue}
            label="Club Revenue"
            color="#2563eb"
          />
          <DonutChart
            value={data.eventRevenue}
            max={data.totalRevenue}
            label="Event Revenue"
            color="#16a34a"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
