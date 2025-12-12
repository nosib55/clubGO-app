import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden w-full bg-gradient-to-br from-[#EEF2FF] via-white to-[#F8FAFC]">

      {/* ABSTRACT BACKGROUND SHAPES */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-400/20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* MAIN CONTAINER */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Heading Accent */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.6 }}
            className="h-2 bg-indigo-600 rounded-full"
          ></motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Discover <span className="text-indigo-600">Passion.</span>  
            <br />
            Join Meaningful Clubs.
          </h1>

          {/* Subtext */}
          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
            Explore a growing community of clubs designed to inspire creativity, learning, 
            and connection. Whether you want to join an activity or discover new interests, 
            ClubSphere brings passionate people together.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-4">

            {/* Explore Clubs */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-8 py-3 bg-indigo-600 text-white text-lg rounded-xl
                shadow-lg hover:bg-indigo-700 hover:shadow-xl
                transition-all duration-200
              "
            >
              Explore Clubs
            </motion.button>

            {/* Explore Events */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="
                px-8 py-3 border border-indigo-300 text-indigo-600 text-lg
                rounded-xl bg-white hover:bg-indigo-50 shadow-sm
                transition duration-200
              "
            >
              Explore Events
            </motion.button>

          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.img
            src="/hero-illustration.png"
            alt="Community Illustration"
            className="w-full max-w-lg drop-shadow-2xl"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
