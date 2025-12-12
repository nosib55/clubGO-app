import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Photography", "Hiking", "Books", "Technology", "Sports", "Music", "Art", "Wellness", "Gaming", "Film"];

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/clubs`)
      .then(res => setClubs(res.data));
  }, []);

  // FILTER + SEARCH
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.clubName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "All" || club.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-6 lg:px-10 py-10 max-w-7xl mx-auto">

      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Approved Clubs</h1>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full sm:w-64 bg-white shadow"
          />

          {/* Filter Dropdown */}
          <select
            className="select select-bordered bg-white shadow"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CLUBS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredClubs.length === 0 ? (
          <p className="text-gray-500 text-lg">No clubs found.</p>
        ) : (
          filteredClubs.map((club, i) => (
            <motion.div
              key={club._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 30px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl overflow-hidden shadow-lg bg-white transition"
            >
              {/* Banner Image */}
              <div className="h-44 w-full overflow-hidden">
                <motion.img
                  src={club.bannerImage}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900">{club.clubName}</h2>
                <p className="text-sm text-indigo-600">{club.category}</p>

                {/* Fee */}
                <p className="mt-1 text-gray-700">
                  <strong>Fee:</strong>
                  {club.membershipFee > 0 ? ` $${club.membershipFee}` : " Free"}
                </p>

                {/* View Details */}
                <Link
                  to={`/clubs/${club._id}`}
                  className="block mt-4 w-full text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clubs;
