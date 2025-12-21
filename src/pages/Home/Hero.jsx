import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] bg-white overflow-hidden">
      
      {/* Soft Background Blobs (NOT behind image) */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-indigo-200 rounded-full blur-3xl opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.2 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Discover Clubs.<br />
            <span className="text-purple-600">Join Your Community.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Club-Go helps people explore clubs, join events, and connect with
            like-minded communities effortlessly.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-xl text-white font-semibold text-lg
                         bg-gradient-to-r from-purple-600 to-indigo-600
                         shadow-lg shadow-purple-500/30"
            ><Link
       to="/clubs">View All Clubs</Link>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-xl border border-gray-300
                         text-gray-800 font-semibold text-lg hover:bg-gray-50"
            ><Link to="/events">Browse Events</Link>
    
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE (NO BACKGROUND) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src="/hero-illustration.png"
            alt="Club community"
            className="max-w-md w-full"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
