import { useEffect, useState } from "react";
import axios from "axios";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/clubs`)
      .then(res => setClubs(res.data));
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Approved Clubs</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clubs.map(club => (
          <div key={club._id} className="border rounded-lg p-4 shadow bg-white">
            <img src={club.bannerImage} className="h-40 w-full object-cover rounded" />

            <h2 className="text-xl font-semibold mt-3">{club.clubName}</h2>
            <p className="text-sm text-gray-600">{club.category}</p>

            <p><strong>Fee:</strong>  
              {club.membershipFee > 0 
                ? ` $${club.membershipFee}` 
                : " Free"}
            </p>

            <a 
              href={`/clubs/${club._id}`} 
              className="btn btn-primary btn-sm w-full mt-3"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
