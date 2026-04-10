import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth() || {};

  const handleLogout = () => {
    logOut().catch(() => {});
  };

  const navLinks = (
    <>
      {[
        { path: "/", label: "Home" },
        { path: "/clubs", label: "Clubs" },
        { path: "/events", label: "Events" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
      ].map(({ path, label }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive
                ? "text-violet-400 font-semibold"
                : "text-slate-300 hover:text-white transition-colors duration-200"
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <div
      className="sticky top-0 z-50"
      style={{
        background: "rgba(10, 10, 26, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.15)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
      }}
    >
      <div className="navbar max-w-7xl mx-auto px-4 text-white">

        {/* LEFT — Logo */}
        <div className="navbar-start">
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost text-white text-xl">☰</label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-4 shadow-2xl rounded-2xl w-52 space-y-1"
              style={{ background: "rgba(15,15,40,0.97)", border: "1px solid rgba(139,92,246,0.2)" }}
            >
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
              <span className="text-white text-lg leading-none">✦</span>
            </div>
            <span className="text-xl font-bold tracking-wide text-white">
              Club<span className="text-violet-400">GO</span>
            </span>
          </Link>
        </div>

        {/* CENTER — Nav links */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-1 text-sm font-medium">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT — Actions */}
        <div className="navbar-end gap-2">
          <ThemeToggle />

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div
                  className="w-10 rounded-full"
                  style={{ ring: "2px solid #8b5cf6" }}
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/PGv8ZzG/user.png"}
                    alt="avatar"
                    className="rounded-full border-2 border-violet-500"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow-2xl rounded-2xl w-52 text-slate-800"
                style={{ background: "#fff" }}
              >
                <li className="px-2 py-1 text-xs text-gray-400 font-medium truncate">
                  {user.displayName || user.email}
                </li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 hover:bg-red-50">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm btn-ghost text-slate-200 hover:text-white border border-slate-600 hover:border-violet-500 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm text-white border-none font-semibold px-5"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
