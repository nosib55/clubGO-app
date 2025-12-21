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
      {["/", "/clubs", "/events", "/about", "/contact"].map((path, index) => {
        const labels = ["Home", "Clubs", "Events", "About", "Contact"];
        return (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-400 font-semibold border-b-2 border-indigo-400"
                  : "text-gray-300 hover:text-white"
              }
            >
              {labels[index]}
            </NavLink>
          </li>
        );
      })}
    </>
  );

  return (
    <div className="sticky top-0 z-50 shadow bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="navbar max-w-6xl mx-auto text-white">

        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost text-white">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-slate-800 rounded-box w-52 space-y-2"
            >
              {navLinks}
            </ul>
          </div>

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-36" />
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 space-x-6">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end space-x-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-indigo-400 ring-offset-2">
                  <img
                    src={user.photoURL || "https://i.ibb.co/PGv8ZzG/user.png"}
                    alt="user"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-white text-slate-800 rounded-box w-52"
              >
                <li className="px-2 py-1 text-xs text-gray-500">
                  {user.displayName || user.email}
                </li>

                <li>
                  <Link to="/profile">Profile</Link>
                </li>

                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm bg-slate-700 text-white hover:bg-slate-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-sm bg-indigo-500 border-none text-white hover:bg-indigo-600"
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
