import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  // future: role from backend → useRole hook
  const role = "member"; // temporary, later replace

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 bg-base-200 p-4 space-y-4 hidden md:block">
        <h2 className="font-bold text-lg mb-4">Dashboard</h2>

        {role === "admin" && (
          <ul className="menu">
            <li>
              <NavLink to="/dashboard/admin">Admin Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/users">Manage Users</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/clubs">Manage Clubs</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/payments">Payments</NavLink>
            </li>
          </ul>
        )}

        {role === "clubManager" && (
          <ul className="menu">
            <li>
              <NavLink to="/dashboard/manager">Manager Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manager/clubs">My Clubs</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manager/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manager/registrations">
                Registrations
              </NavLink>
            </li>
          </ul>
        )}

        {role === "member" && (
          <ul className="menu">
            <li>
              <NavLink to="/dashboard/member">Member Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/member/clubs">My Clubs</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/member/events">My Events</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/member/payments">
                Payment History
              </NavLink>
            </li>
          </ul>
        )}

        <hr className="my-4" />

        <ul className="menu">
          <li>
            <NavLink to="/">Back to Home</NavLink>
          </li>
          <li>
            <NavLink to="/clubs">Browse Clubs</NavLink>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="mb-4">
          <p className="text-sm opacity-70">
            Logged in as: {user?.displayName || user?.email}
          </p>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
