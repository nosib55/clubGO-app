import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../assets/animated/Loding";

const Clubs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");

  // =========================
  // FETCH CLUBS (SERVER SIDE)
  // =========================
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", search, category, sort],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/clubs`,
        {
          params: {
            search,
            category,
            sort,
          },
        }
      );
      return res.data;
    },
  });

  // dynamic categories
  const categories = ["", ...new Set(clubs.map(c => c.category))];

  // =========================
  // UI
  // =========================
  return (
    <div className="px-6 lg:px-10 py-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Approved Clubs
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full sm:w-64"
          />

          {/* CATEGORY */}
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories
              .filter(Boolean)
              .map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>

          {/* SORT */}
          <select
            className="select select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="fee_high">Highest Fee</option>
            <option value="fee_low">Lowest Fee</option>
          </select>

        </div>
      </div>

      {/* LOADING */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clubs.map((club, i) => (
            <motion.div
              key={club._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl shadow"
            >
              <img
                src={club.bannerImage}
                className="h-44 w-full object-cover"
                alt={club.clubName}
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {club.clubName}
                </h2>
                <p className="text-indigo-600">
                  {club.category}
                </p>
                <p className="text-black text-lg">Fee: $
                  {club.membershipFee}
                </p>

                <Link
                  to={`/clubs/${club._id}`}
                  className="block mt-4 bg-indigo-600 text-white text-center py-2 rounded-lg"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clubs;
