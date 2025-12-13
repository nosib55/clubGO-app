import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loading from "../../assets/animated/Loding";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/clubs`)
      .then(res => setClubs(res.data))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Dynamic categories from API data
  const categories = ["All", ...new Set(clubs.map(club => club.category))];

  // 🔹 Filter logic
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.clubName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || club.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-6 lg:px-10 py-10 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Approved Clubs
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full sm:w-64"
          />

          {/* 🔹 Dynamic Category Dropdown */}
          <select
            className="select select-bordered"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loading></Loading>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredClubs.map((club, i) => (
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
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold">
                  {club.clubName}
                </h2>
                <p className="text-indigo-600">{club.category}</p>

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
