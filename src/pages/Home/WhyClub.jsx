import { motion } from "framer-motion";
import { FaUsers, FaHandshake, FaLightbulb, FaMapMarkedAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers />,
    title: "Like-Minded Communities",
    desc: "Find and join clubs that perfectly match your interests, hobbies, and passions with smart filtering.",
    color: "#7c3aed",
  },
  {
    icon: <FaHandshake />,
    title: "Meaningful Connections",
    desc: "Build real, lasting relationships through shared activities, workshops, and live events.",
    color: "#6366f1",
  },
  {
    icon: <FaLightbulb />,
    title: "Learn & Grow Together",
    desc: "Develop valuable skills and grow your confidence through engaging club-led programs and activities.",
    color: "#8b5cf6",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Discover Local Events",
    desc: "Stay connected with exclusive events and meetups happening near you, curated for your interests.",
    color: "#4f46e5",
  },
];

const WhyClub = () => {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a1a 0%, #0d0d20 100%)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(99,102,241,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
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
            ✦ Why Choose Us
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: "#f0f0ff" }}>
            Why Club-GO?
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "rgba(180,180,210,0.65)" }}>
            Everything clubs and communities need — in one simple, powerful platform.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="relative flex items-start gap-6 p-8 rounded-2xl overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(139,92,246,0.12)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ borderColor: "rgba(139,92,246,0.35)" }}
            >
              {/* Left accent line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ background: `linear-gradient(180deg, ${f.color}, transparent)` }}
              />

              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at left center, ${f.color}10 0%, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl text-xl"
                style={{
                  background: `${f.color}20`,
                  color: f.color,
                  boxShadow: `0 0 20px ${f.color}30`,
                }}
              >
                {f.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#e8e8ff" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(180,180,210,0.65)" }}>
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyClub;
