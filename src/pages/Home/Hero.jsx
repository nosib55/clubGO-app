import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaUsers, FaCalendarCheck, FaStar } from "react-icons/fa";

const stats = [
  { icon: <FaUsers />, value: "12K+", label: "Active Members" },
  { icon: <FaCalendarCheck />, value: "820+", label: "Events Hosted" },
  { icon: <FaStar />, value: "300+", label: "Clubs Listed" },
];

const Hero = () => {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0f0a2e 40%, #120827 70%, #0a0a1a 100%)",
      }}
    >
      {/* Animated glow blobs */}
      <motion.div
        className="absolute top-[-10rem] left-[-8rem] w-[35rem] h-[35rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-8rem] right-[-6rem] w-[40rem] h-[40rem] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Grid dot overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-semibold"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(139,92,246,0.35)",
              color: "#c4b5fd",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            🚀 The #1 Club Management Platform
          </motion.div>

          <h1
            className="text-5xl lg:text-[3.8rem] font-extrabold leading-tight mb-6"
            style={{ color: "#f0f0ff" }}
          >
            Discover Clubs.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa, #818cf8, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Connect. Grow.
            </span>
          </h1>

          <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "rgba(200,200,230,0.75)" }}>
            Club-GO is your all-in-one platform for exploring local clubs, booking events,
            and connecting with passionate communities — effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/clubs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  boxShadow: "0 8px 32px rgba(124,58,237,0.45)",
                }}
              >
                Explore Clubs <FaArrowRight className="text-sm" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(139,92,246,0.35)",
                  color: "#c4b5fd",
                  backdropFilter: "blur(8px)",
                }}
              >
                Browse Events
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-lg"
                  style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}
                >
                  {s.icon}
                </div>
                <div>
                  <div className="text-xl font-bold" style={{ color: "#e0e0ff" }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "rgba(180,180,210,0.7)" }}>{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Hero image with glow frame */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center items-center"
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, transparent 70%)",
              filter: "blur(30px)",
              transform: "scale(0.9)",
            }}
          />

          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(139,92,246,0.25)",
              boxShadow: "0 25px 80px rgba(79,70,229,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(4px)",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src="/hero-illustration.png"
              alt="Club community"
              className="w-full max-w-lg object-cover"
              style={{ display: "block" }}
            />
          </motion.div>

          {/* Floating badge 1 */}
          <motion.div
            className="absolute -top-4 -right-4 px-4 py-2 rounded-2xl text-sm font-semibold"
            style={{
              background: "rgba(15,15,40,0.9)",
              border: "1px solid rgba(139,92,246,0.4)",
              color: "#a78bfa",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🎉 300+ Active Clubs
          </motion.div>

          {/* Floating badge 2 */}
          <motion.div
            className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl text-sm font-semibold"
            style={{
              background: "rgba(15,15,40,0.9)",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#818cf8",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            ⚡ Events Booked Instantly
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
