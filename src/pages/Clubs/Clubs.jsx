import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null); // modal club
  const [open, setOpen] = useState(false);

  // Fetch all approved clubs
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/clubs`)
      .then((res) => setClubs(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ==========================
  // ⭐ Join Club Handler
  // ==========================
  const handleJoin = async (clubId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/clubs/join`,
        { clubId },
        { withCredentials: true }
      );

      Swal.fire("Joined!", "You have successfully joined this club.", "success");

      setOpen(false);
    } catch (err) {
      Swal.fire("Error", "Failed to join club", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Clubs</h2>

      {/* Club Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={club.bannerImage}
                alt="banner"
                className="h-40 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{club.clubName}</h2>
              <p className="opacity-75">{club.category}</p>

              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => {
                  setSelectedClub(club);
                  setOpen(true);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ============================ */}
      {/* ⭐ DETAILS MODAL */}
      {/* ============================ */}

      {open && selectedClub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 grid place-items-center z-50">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-3">
              {selectedClub.clubName}
            </h2>

            <img
              src={selectedClub.bannerImage}
              className="w-full h-48 object-cover rounded mb-4"
            />

            <p><strong>Category:</strong> {selectedClub.category}</p>
            <p><strong>Location:</strong> {selectedClub.location}</p>
            <p className="mt-2 opacity-80">{selectedClub.description}</p>

            <div className="mt-4 flex justify-end gap-3">
              {/* CANCEL */}
              <button
                className="btn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

              {/* JOIN BUTTON */}
              <button
                className="btn btn-success"
                onClick={() => handleJoin(selectedClub._id)}
              >
                Join Club
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Clubs;
