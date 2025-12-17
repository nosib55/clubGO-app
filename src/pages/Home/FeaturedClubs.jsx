import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loading from "../../assets/animated/Loding";

const FeaturedClubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featured-clubs"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/featured-clubs`);
      return res.data;
    }
  });

  if (isLoading) return <div className="items-center flex justify-center"><Loading></Loading></div>;

  return (
    <div className="my-16">

      {/* Heading + View All Button */}
      <div className="flex justify-between items-center mb-8">
        

        <Link
          to="/clubs"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow transition"
        >
          View All Clubs
        </Link>
      </div>

      {/* CLUB GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {clubs.map((club, i) => (
          <motion.div
            key={club._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl shadow-lg bg-white overflow-hidden hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={club.bannerImage}
                className="w-full h-full object-cover"
                alt={club.clubName}
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold">{club.clubName}</h3>
              <p className="text-sm text-indigo-600 font-medium">
                {club.category}
              </p>

              <p className="text-sm text-gray-600">
                {club.description.slice(0, 85)}...
              </p>

              {/* BUTTON */}
              <div className="pt-3">
                <Link
                  to={`/clubs/${club._id}`}
                  className="inline-block px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClubs;
