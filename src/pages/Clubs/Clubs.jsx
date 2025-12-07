import { useEffect, useState } from "react";
import axios from "axios";
import ClubCard from "./ClubCard";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs`);
      setClubs(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  // FILTER + SEARCH (frontend)
  const filtered = clubs.filter((club) => {
    const matchesSearch = club.clubName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ? true : club.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">All Clubs</h2>

      {/* SEARCH + FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search clubs..."
          className="input input-bordered w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Photography">Photography</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
          <option value="Hiking">Hiking</option>
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* CLUB LIST */}
      {!loading && (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((club) => (
            <ClubCard key={club._id} club={club} />
          ))}
        </div>
      )}

      {/* IF NO MATCH */}
      {!loading && filtered.length === 0 && (
        <p className="text-center opacity-70">No clubs found.</p>
      )}
    </div>
  );
};

export default Clubs;
