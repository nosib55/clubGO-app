import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero min-h-[70vh] bg-base-200 relative overflow-hidden">

      {/* BACKGROUND GRADIENT SHAPES */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-secondary/20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.4 }}
      />

      {/* CONTENT */}
      <div className="hero-content flex-col lg:flex-row-reverse gap-12 z-10">

        {/* RIGHT ILLUSTRATION */}
        <motion.img
          src="/hero-illustration.png"
          className="max-w-sm rounded-lg shadow-2xl"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        />

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h1 className="text-5xl font-bold leading-tight">
            Discover <span className="text-primary">Your Passion</span><br />
            Join Amazing Clubs.
          </h1>

          <p className="py-6 text-lg opacity-80">
            Explore hundreds of clubs and events. Find your community, learn new
            skills, and connect with people who share your interests.
          </p>

          {/* BUTTON GROUP */}
          <div className="flex gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary px-8 text-lg"
            >
              Explore Clubs
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline btn-primary px-8 text-lg"
            >
              Explore Events
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
