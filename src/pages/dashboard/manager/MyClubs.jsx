import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MyClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [editingClub, setEditingClub] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/manager/clubs`, { withCredentials: true })
      .then((res) => setClubs(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ===========================
  // ⭐ DELETE CLUB
  // ===========================
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This club will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/manager/clubs/${id}`, {
            withCredentials: true,
          });

          setClubs(clubs.filter((club) => club._id !== id));

          Swal.fire("Deleted!", "Club has been removed.", "success");
        } catch (err) {
          Swal.fire("Error!", "Failed to delete club.", "error");
        }
      }
    });
  };

  // ===========================
  // ⭐ UPDATE CLUB (MODAL FORM SUBMIT)
  // ===========================
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      clubName: form.clubName.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      bannerImage: form.bannerImage.value,
      membershipFee: Number(form.membershipFee.value),
    };

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/manager/clubs/${editingClub._id}`,
        updatedData,
        { withCredentials: true }
      );

      // update UI without reload
      setClubs(
        clubs.map((club) =>
          club._id === editingClub._id ? { ...club, ...updatedData } : club
        )
      );

      setModalOpen(false);
      Swal.fire("Updated!", "Club updated successfully!", "success");
    } catch (err) {
      Swal.fire("Error!", "Update failed.", "error");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Clubs</h2>

      {clubs.length === 0 && (
        <p className="opacity-70">You have not created any clubs yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clubs.map((club) => (
          <div key={club._id} className="card bg-base-100 shadow p-4">
            <img src={club.bannerImage} className="h-40 w-full object-cover rounded" />

            <h3 className="font-bold text-xl mt-2">{club.clubName}</h3>

            <p>
              Status:{" "}
              <span
                className={`font-bold ${
                  club.status === "pending"
                    ? "text-yellow-500"
                    : club.status === "approved"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {club.status}
              </span>
            </p>

            <p className="opacity-70">{club.category} • {club.location}</p>

            <div className="mt-3 flex gap-2">
              <button
                className="btn btn-sm btn-info"
                onClick={() => {
                  setEditingClub(club);
                  setModalOpen(true);
                }}
              >
                Edit
              </button>

              <button className="btn btn-sm btn-error" onClick={() => handleDelete(club._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===========================
          ⭐ EDIT MODAL
      =========================== */}
      {modalOpen && editingClub && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-xl">

            <h3 className="font-bold text-lg mb-3">Edit Club</h3>

            <form onSubmit={handleUpdate} className="space-y-3">

              <input
                name="clubName"
                defaultValue={editingClub.clubName}
                className="input input-bordered w-full"
              />

              <textarea
                name="description"
                defaultValue={editingClub.description}
                className="textarea textarea-bordered w-full"
              />

              <input
                name="category"
                defaultValue={editingClub.category}
                className="input input-bordered w-full"
              />

              <input
                name="location"
                defaultValue={editingClub.location}
                className="input input-bordered w-full"
              />

              <input
                name="bannerImage"
                defaultValue={editingClub.bannerImage}
                className="input input-bordered w-full"
              />

              <input
                type="number"
                name="membershipFee"
                defaultValue={editingClub.membershipFee}
                className="input input-bordered w-full"
              />

              <div className="modal-action">
                <button className="btn btn-primary" type="submit">Save</button>
                <button className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </form>

          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyClubs;
