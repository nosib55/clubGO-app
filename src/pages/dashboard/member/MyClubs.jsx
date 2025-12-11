import { useEffect, useState } from "react";
import axios from "axios";

const MyClubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/member/clubs`, {
        withCredentials: true,
      })
      .then((res) => setClubs(res.data))
      .catch((err) => console.error("MY CLUBS ERROR:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Clubs</h1>

      {clubs.length === 0 ? (
        <p>You have not joined any club yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubs.map((club) => (
            <div key={club._id} className="border p-4 rounded shadow bg-white">
              <img src={club.bannerImage} alt="" className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{club.clubName}</h2>
              <p>{club.description}</p>
              <p className="text-sm opacity-70">Category: {club.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClubs;
