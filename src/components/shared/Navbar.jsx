import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        ClubSphere
      </Link>

      <div className="flex gap-6">
        <Link to="/clubs">Clubs</Link>
        <Link to="/events">Events</Link>
        <Link to="/login" className="font-semibold">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
