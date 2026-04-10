import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Loading from "../../assets/animated/Loding";

const FeaturedClubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featured-clubs"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/featured-clubs`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loading />
      </div>
    );

  return (
    <section
      className="py-24 px-6"
      style={{
        background: "linear-gradient(180deg, #070714 0%, #0d0d1f 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7c3aed" }}>
              ✦ Featured
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ color: "#f0f0ff" }}>
              Top Clubs to Join
            </h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(180,180,210,0.6)" }}>
              Handpicked communities that are thriving and welcoming.
            </p>
          </div>
          <Link
            to="/clubs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "#a78bfa",
            }}
          >
            View All Clubs <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {clubs.map((club, i) => (
            <motion.div
              key={club._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(139,92,246,0.15)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={club.bannerImage}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  alt={club.clubName}
                />
                {/* Category badge */}
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: "rgba(124,58,237,0.85)",
                    color: "#fff",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {club.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <h3 className="text-lg font-bold" style={{ color: "#e8e8ff" }}>
                  {club.clubName}
                </h3>
                <p className="text-sm flex-1 leading-relaxed" style={{ color: "rgba(180,180,210,0.65)" }}>
                  {club.description.slice(0, 90)}...
                </p>

                <Link
                  to={`/clubs/${club._id}`}
                  className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold self-start transition-all"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                  }}
                >
                  View Details <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClubs;
