import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role, setRole] = useState("");

  // FETCH USER ROLE
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`)
        .then((res) => setRole(res.data.role))
        .catch(() => setRole("member"));
    }
  }, [user]);

  // DASHBOARD LINK BASED ON ROLE
  const dashboardPath = {
    admin: "/dashboard/admin",
    manager: "/dashboard/manager",
    member: "/dashboard/member",
  }[role];

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Brand Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        CLUB GO
      </Link>

      {/* Desktop Menu */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className="hover:text-blue-600 font-medium"
        >
          Home
        </NavLink>

        <NavLink
          to="/clubs"
          className="hover:text-blue-600 font-medium"
        >
          Clubs
        </NavLink>

        {/* If NOT logged in */}
        {!user && (
          <>
            <NavLink
              to="/login"
              className="hover:text-blue-600 font-medium"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="hover:text-blue-600 font-medium"
            >
              Register
            </NavLink>
          </>
        )}

        {/* If logged in */}
        {user && (
          <>
            {/* Dashboard Link */}
            <NavLink
              to={dashboardPath}
              className="hover:text-blue-600 font-medium"
            >
              Dashboard
            </NavLink>

            {/* Profile Image */}
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                className="w-10 h-10 rounded-full object-cover border"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            )}

            {/* Logout Button */}
            <button
              onClick={logOut}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
