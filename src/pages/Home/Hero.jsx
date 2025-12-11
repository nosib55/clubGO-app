import React from "react";

const Hero = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Join Communities <br /> That Move You
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            Discover local clubs, connect with passionate people, and participate in events—all through a beautifully simple platform built for members, managers, and admins.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
              Explore Clubs
            </button>

            <button className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition">
              Become a Club Manager
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center">
          <img
            src="/hero-illustration.png" 
            alt="Community illustration"
            className="w-full max-w-md lg:max-w-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
