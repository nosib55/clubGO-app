import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "/logo.svg";

const Navbar = () => {
  const { user, logOut } = useAuth() || {};

  const handleLogout = () => {
    logOut().catch(() => {});
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 font-semibold border-b-2 border-green-400"
              : "text-gray-200 hover:text-white"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/clubs"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 font-semibold border-b-2 border-green-400"
              : "text-gray-200 hover:text-white"
          }
        >
          Clubs
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 font-semibold border-b-2 border-green-400"
              : "text-gray-200 hover:text-white"
          }
        >
          Events
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 shadow bg-[#0F172A]">
      <div className="navbar max-w-6xl mx-auto text-white">

        {/* LEFT: LOGO */}
        <div className="navbar-start flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-40" />
            
          </Link>
        </div>

        {/* CENTER LINKS */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end space-x-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-offset-2 ring-white">
                  <img
                    src={user.photoURL || "https://i.ibb.co/PGv8ZzG/user.png"}
                    alt="user"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52"
              >
                <li className="px-2 py-1 text-xs opacity-70">
                  {user.displayName || user.email}
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm border-gray-300 text-white hover:bg-gray-200 hover:text-[#0F172A]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-sm bg-[#3B82F6] border-none text-white hover:bg-[#2563EB]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
