import { useEffect, useState } from "react";
import axios from "axios";

const MemberPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/member/payments`, {
        withCredentials: true,
      })
      .then((res) => setPayments(res.data))
      .catch((err) => console.log("PAYMENT FETCH ERROR:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Payments</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">You have no payment records yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th>Type</th>
                <th>Club / Event</th>
                <th>Amount</th>
                <th>Payment ID</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  {/* TYPE */}
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                        ${
                          p.type === "club"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {p.type === "club" ? "Club" : "Event"}
                    </span>
                  </td>

                  {/* NAME */}
                  <td>
                    {p.type === "club"
                      ? p.clubName || "Unknown Club"
                      : p.eventName || "Unknown Event"}
                  </td>

                  {/* AMOUNT */}
                  <td>${p.amount}</td>

                  {/* PAYMENT ID */}
                  <td className="text-blue-600 text-sm">
                    {p.paymentIntentId || "—"}
                  </td>

                  {/* DATE */}
                  <td>{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberPayments;
