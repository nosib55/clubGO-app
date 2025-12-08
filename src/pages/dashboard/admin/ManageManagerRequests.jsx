import { useEffect, useState } from "react";
import axios from "axios";

const ManageManagerRequests = () => {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/manager/requests`,
      { withCredentials: true }
    );
    setRequests(res.data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // APPROVE REQUEST
  const handleApprove = async (email) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/admin/manager/requests/approve/${email}`,
      {},
      { withCredentials: true }
    );
    loadRequests();
  };

  // REJECT REQUEST
  const handleReject = async (email) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/admin/manager/requests/reject/${email}`,
      {},
      { withCredentials: true }
    );
    loadRequests();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manager Requests</h2>

      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, idx) => (
              <tr key={req._id}>
                <td>{idx + 1}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>

                <td>
                  <span
                    className={`badge ${
                      req.status === "pending"
                        ? "badge-warning"
                        : req.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                <td>
                  <button
                    disabled={req.status !== "pending"}
                    onClick={() => handleApprove(req.email)}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                </td>

                <td>
                  <button
                    disabled={req.status !== "pending"}
                    onClick={() => handleReject(req.email)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageManagerRequests;
