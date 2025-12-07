import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth() || {};

  const handleLogout = () => {
    logOut().catch(() => {});
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/clubs">Clubs</NavLink>
      </li>
      <li>
        <NavLink to="/events">Events</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow">
      <div className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <Link to="/" className="font-bold text-xl">
            ClubSphere
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        <div className="navbar-end space-x-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/PGv8ZzG/user.png"}
                    alt="user"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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
              <Link to="/login" className="btn btn-sm btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
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
