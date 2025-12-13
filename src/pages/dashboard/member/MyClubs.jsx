import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  // ⏳ Calculate days left
  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return null;
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Clubs</h1>

      {clubs.length === 0 ? (
        <p className="text-gray-500">You have not joined any club yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => {
            const daysLeft = getDaysLeft(club.expiryDate);

            return (
              <div
                key={club._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                {/* Banner */}
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="w-full h-40 object-cover"
                />

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h2 className="text-xl font-semibold">
                    {club.clubName}
                  </h2>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {club.description}
                  </p>

                  <p className="text-sm text-gray-500">
                    Category: <span className="font-medium">{club.category}</span>
                  </p>

                  {/* Expiry Countdown */}
                  {daysLeft !== null ? (
                    daysLeft > 0 ? (
                      <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                        ⏳ {daysLeft} days left
                      </span>
                    ) : (
                      <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                        ❌ Membership expired
                      </span>
                    )
                  ) : (
                    <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600">
                      No expiry
                    </span>
                  )}

                  {/* Action */}
                  <div className="pt-4">
                    <Link
                      to={`/clubs/${club._id}`}
                      className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white w-full rounded-xl"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyClubs;
