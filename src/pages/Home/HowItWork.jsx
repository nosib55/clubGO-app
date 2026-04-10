import { motion } from "framer-motion";
import { FaSearch, FaUsers, FaCalendarCheck, FaCreditCard } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    step: "01",
    title: "Explore Clubs",
    desc: "Browse local clubs by category, location, and interests to find your match.",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.3)",
  },
  {
    icon: <FaUsers />,
    step: "02",
    title: "Join a Club",
    desc: "Join free or paid clubs securely using Stripe payment integration.",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    icon: <FaCalendarCheck />,
    step: "03",
    title: "Register for Events",
    desc: "Discover upcoming events and register in just a few clicks.",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    icon: <FaCreditCard />,
    step: "04",
    title: "Manage Everything",
    desc: "Track memberships, payments, and events from your personal dashboard.",
    color: "#4f46e5",
    glow: "rgba(79,70,229,0.3)",
  },
];

const HowItWorks = () => {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0d0d1f 0%, #080818 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7c3aed" }}>
            ✦ Simple Process
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: "#f0f0ff" }}>
            How Club-GO Works
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: "rgba(180,180,210,0.65)" }}>
            Discover clubs, join communities, and attend events — in 4 simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-12 left-1/8 right-1/8"
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(99,102,241,0.3), transparent)",
              top: "3rem",
              left: "12.5%",
              right: "12.5%",
            }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(139,92,246,0.12)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Step number */}
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-extrabold px-3 py-1 rounded-full"
                style={{
                  background: s.color,
                  color: "#fff",
                  letterSpacing: "0.05em",
                }}
              >
                {s.step}
              </div>

              {/* Icon */}
              <div
                className="w-16 h-16 flex items-center justify-center rounded-2xl mb-5 text-2xl mt-4"
                style={{
                  background: `rgba(${s.glow.match(/\d+/g).slice(0, 3).join(",")},0.15)`,
                  color: s.color,
                  boxShadow: `0 0 20px ${s.glow}`,
                }}
              >
                {s.icon}
              </div>

              <h3 className="text-lg font-bold mb-3" style={{ color: "#e8e8ff" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(180,180,210,0.65)" }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
