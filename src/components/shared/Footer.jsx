import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          
            <img src="/logo.svg" alt=""  className="w-40"/>
          
          <p className="text-sm mt-3 leading-relaxed">
            A simple and powerful platform for managing clubs, memberships,
            and events with ease.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/clubs" className="hover:text-white transition">
                Clubs
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-white transition">
                Events
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Follow Us
          </h3>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-white" />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-4 text-center text-xs">
        © {new Date().getFullYear()} ClubSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
