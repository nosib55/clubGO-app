import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FeaturedClubs from "./FeaturedClubs";
import Hero from "./Hero";
import HowItWorks from "./HowItWork";
import Testimonial from "./Testimonial";
import WhyClub from "./WhyClub";

/** Mid-page CTA Banner */
const CTABanner = () => (
  <section
    className="py-24 px-6 relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #0f0a2e 0%, #1a0a3e 50%, #0f0a2e 100%)",
    }}
  >
    {/* Glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: "radial-gradient(ellipse at center, rgba(124,58,237,0.18) 0%, transparent 65%)",
      }}
    />
    {/* Grid dots */}
    <div
      className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#a78bfa" }}>
          ✦ Join Today
        </p>
        <h2 className="text-3xl lg:text-5xl font-extrabold mb-6" style={{ color: "#f0f0ff" }}>
          Ready to Find Your
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #a78bfa, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Community?
          </span>
        </h2>
        <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: "rgba(200,200,230,0.7)" }}>
          Join thousands of members already using Club-GO to discover clubs, attend events, and build meaningful connections.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-white font-bold text-base"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                boxShadow: "0 10px 40px rgba(124,58,237,0.5)",
              }}
            >
              Get Started — It's Free
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/clubs"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-base"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(139,92,246,0.35)",
                color: "#c4b5fd",
              }}
            >
              Browse Clubs
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div style={{ background: "#070714" }}>
      {/* Hero */}
      <Hero />

      {/* Featured Clubs */}
      <FeaturedClubs />

      {/* How It Works */}
      <HowItWorks />

      {/* Why Club-GO */}
      <WhyClub />

      {/* Testimonials */}
      <Testimonial />

      {/* CTA Banner */}
      <CTABanner />
    </div>
  );
};

export default Home;
