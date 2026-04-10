import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #080818 0%, #050510 100%)",
        borderTop: "1px solid rgba(139,92,246,0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-2">
          <img src="/logo.png" alt="ClubGO" className="h-10 w-auto object-contain mb-4" />
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(180,180,210,0.6)" }}>
            A powerful platform for discovering clubs, managing memberships, and attending events — all in one place.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-6">
            {[
              { href: "https://www.facebook.com", icon: <FaFacebookF />, hover: "#3b82f6" },
              { href: "https://www.twitter.com", icon: <FaTwitter />, hover: "#38bdf8" },
              { href: "https://www.instagram.com", icon: <FaInstagram />, hover: "#ec4899" },
              { href: "https://www.linkedin.com", icon: <FaLinkedinIn />, hover: "#60a5fa" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl text-sm transition-all duration-200"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  color: "rgba(200,200,230,0.7)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(124,58,237,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(200,200,230,0.7)";
                  e.currentTarget.style.background = "rgba(139,92,246,0.1)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "#a78bfa" }}>
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/clubs", label: "Clubs" },
              { to: "/events", label: "Events" },
              { to: "/dashboard", label: "Dashboard" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="transition-colors duration-200"
                  style={{ color: "rgba(180,180,210,0.6)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#c4b5fd"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(180,180,210,0.6)"}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: "#a78bfa" }}>
            Support
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
              { to: "/", label: "Privacy Policy" },
              { to: "/", label: "Terms of Service" },
            ].map(({ to, label }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="transition-colors duration-200"
                  style={{ color: "rgba(180,180,210,0.6)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#c4b5fd"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(180,180,210,0.6)"}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div
        className="py-5 text-center text-xs"
        style={{
          borderTop: "1px solid rgba(139,92,246,0.1)",
          color: "rgba(150,150,180,0.5)",
        }}
      >
        © {new Date().getFullYear()} <span style={{ color: "#a78bfa" }}>ClubGO</span>. All rights reserved. Built with ❤️ for communities.
      </div>
    </footer>
  );
};

export default Footer;
