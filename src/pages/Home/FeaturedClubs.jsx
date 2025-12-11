import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

const FeaturedClubs = () => {
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["featured-clubs"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/featured-clubs`);
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold mb-6">Featured Clubs</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clubs.map((club, i) => (
          <motion.div
            key={club._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border rounded-lg shadow p-4 bg-white"
          >
            <img src={club.bannerImage} className="rounded-lg mb-3" />

            <h3 className="text-xl font-semibold">{club.clubName}</h3>
            <p className="text-sm opacity-70">{club.category}</p>

            <p className="mt-2 text-sm">{club.description.slice(0, 80)}...</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClubs;
