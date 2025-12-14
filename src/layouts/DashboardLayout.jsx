import { NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import { useState } from "react";
import Loading from "../assets/animated/Loding";

// Icons
import { FaUsers, FaHome, FaMoneyCheckAlt, FaUsersCog } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { GiOfficeChair } from "react-icons/gi";

const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200
   text-gray-200
   hover:bg-gray-700 hover:text-white
   ${isActive ? "bg-primary text-white font-semibold" : ""}`;

const DashboardLayout = () => {
  const { role, loading } = useRole();
  const [open, setOpen] = useState(false);

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-base-100">
      
      {/* SIDEBAR */}
      <aside
        className={`w-64 bg-gray-900 p-6 space-y-5 shadow-xl
        ${open ? "block" : "hidden"} md:block`}
      >
        <h2 className="font-bold text-xl text-white text-center mb-6 flex items-center justify-center gap-2">
          <MdDashboardCustomize />
          Dashboard
        </h2>

        {/* ADMIN */}
        {role === "admin" && (
          <ul className="space-y-1">
            <li><NavLink className={navClass} to="/dashboard/admin"><RiAdminLine /> Admin Home</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/admin/users"><FaUsers /> Manage Users</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/admin/clubs"><GiOfficeChair /> Manage Clubs</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/admin/payments"><FaMoneyCheckAlt /> Payments</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/admin/requests"><FaUsersCog /> Manager Requests</NavLink></li>
          </ul>
        )}

        {/* MANAGER */}
        {role === "manager" && (
          <ul className="space-y-1">
            <li><NavLink className={navClass} to="/dashboard/manager"><FaHome /> Manager Home</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/manager/clubs"><GiOfficeChair /> My Clubs</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/manager/events"><FaUsersCog /> Events</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/manager/registrations"><FaUsers /> Registrations</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/manager/create-club"><GiOfficeChair /> Create Club</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/manager/create-event">➕ Create Event</NavLink></li>
          </ul>
        )}

        {/* MEMBER */}
        {role === "member" && (
          <ul className="space-y-1">
            <li><NavLink className={navClass} to="/dashboard/member"><FaHome /> Member Home</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/member/clubs"><GiOfficeChair /> My Clubs</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/member/events"><FaUsersCog /> My Events</NavLink></li>
            <li><NavLink className={navClass} to="/dashboard/member/payments"><FaMoneyCheckAlt /> Payments</NavLink></li>
            <li>
              <NavLink className={navClass}to="/dashboard/member/request-manager"><FaUsersCog /> Request Manager Role</NavLink>

            </li>
          </ul>
        )}

        <hr className="border-gray-700 my-4" />

        {/* PUBLIC */}
        <ul className="space-y-1">
          <li><NavLink className={navClass} to="/"><FaHome /> Home</NavLink></li>
          <li><NavLink className={navClass} to="/clubs"><FaUsers /> Browse Clubs</NavLink></li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4">
        <button
          className="md:hidden btn btn-sm mb-4"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
