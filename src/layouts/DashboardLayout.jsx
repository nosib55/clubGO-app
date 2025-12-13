import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { useState } from "react";

// Icons
import { FaUsers, FaHome, FaMoneyCheckAlt, FaUsersCog } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { GiOfficeChair } from "react-icons/gi";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR */}
      <aside
        className={`w-64 bg-base-200 p-6 space-y-5 shadow-md 
        ${open ? "block" : "hidden"} md:block`}
      >
        <h2 className="font-bold text-xl text-center mb-4 flex items-center justify-center gap-2">
          <MdDashboardCustomize />
          Dashboard
        </h2>

        {/* ================= ADMIN MENU ================= */}
        {role === "admin" && (
          <ul className="menu text-lg">
            <li><NavLink to="/dashboard/admin"><RiAdminLine /> Admin Home</NavLink></li>
            <li><NavLink to="/dashboard/admin/users"><FaUsers /> Manage Users</NavLink></li>
            <li><NavLink to="/dashboard/admin/clubs"><GiOfficeChair /> Manage Clubs</NavLink></li>
            <li><NavLink to="/dashboard/admin/payments"><FaMoneyCheckAlt /> Payments</NavLink></li>

            {/* ⭐ NEW: Manager Requests */}
            <li><NavLink to="/dashboard/admin/requests"><FaUsersCog /> Manager Requests</NavLink></li>
          </ul>
        )}

        {/* ================= MANAGER MENU ================= */}
        {role === "manager" && (
          <ul className="menu text-lg">
            <li><NavLink to="/dashboard/manager"><FaHome /> Manager Home</NavLink></li>
            <li><NavLink to="/dashboard/manager/clubs"><GiOfficeChair /> My Clubs</NavLink></li>
            <li><NavLink to="/dashboard/manager/events"><FaUsersCog /> Events</NavLink></li>
            <li><NavLink to="/dashboard/manager/registrations"><FaUsers /> Registrations</NavLink></li>
            <li><NavLink to="/dashboard/manager/create-club"><GiOfficeChair /> Create Club</NavLink></li>
            <li><NavLink to="/dashboard/manager/create-event"> ➕ Create Event</NavLink></li>
          </ul>
        )}

        {/* ================= MEMBER MENU ================= */}
        {role === "member" && (
          <ul className="menu text-lg">
            <li><NavLink to="/dashboard/member"><FaHome /> Member Home</NavLink></li>
            <li><NavLink to="/dashboard/member/clubs"><GiOfficeChair /> My Clubs</NavLink></li>
            <li><NavLink to="/dashboard/member/events"><FaUsersCog /> My Events</NavLink></li>
            <li><NavLink to="/dashboard/member/payments"><FaMoneyCheckAlt /> Payments</NavLink></li>

            {/* ⭐ MEMBER → Request Manager */}
            <li>
              <NavLink to="/dashboard/member?request=manager">
                <FaUsersCog /> Request Manager Role
              </NavLink>
            </li>
          </ul>
        )}

        <hr className="my-4" />

        {/* PUBLIC LINKS */}
        <ul className="menu text-lg">
          <li><NavLink to="/"><FaHome /> Home</NavLink></li>
          <li><NavLink to="/clubs"><FaUsers /> Browse Clubs</NavLink></li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden mb-4 btn btn-outline btn-sm"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>

        <p className="text-sm opacity-70 mb-2">
          Name : {user?.displayName || user?.email}
        </p>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
