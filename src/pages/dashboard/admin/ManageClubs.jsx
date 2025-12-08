import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageClubs = () => {
  const [clubs, setClubs] = useState([]);

  const fetchClubs = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/clubs`,
      { withCredentials: true }
    );
    setClubs(res.data);
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  // Approve club
  const handleApprove = async (id) => {
    Swal.fire({
      title: "Approve this club?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/admin/clubs/approve/${id}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Approved!", "", "success");
        fetchClubs();
      }
    });
  };

  // Reject club
  const handleReject = async (id) => {
    Swal.fire({
      title: "Reject this club?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/admin/clubs/reject/${id}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Rejected!", "", "success");
        fetchClubs();
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Clubs</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Club Name</th>
              <th>Manager</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.map((club) => (
              <tr key={club._id}>
                <td>{club.clubName}</td>
                <td>{club.managerEmail}</td>
                <td>{club.category}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      club.status === "pending"
                        ? "bg-yellow-500"
                        : club.status === "approved"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {club.status}
                  </span>
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() => handleApprove(club._id)}
                    disabled={club.status === "approved"}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(club._id)}
                    disabled={club.status === "rejected"}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageClubs;
