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
        <table className="table w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th>Club</th>
              <th>Amount</th>
              <th>Payment ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>{p.clubName}</td>
                <td>${p.amount}</td>
                <td className="text-blue-600">{p.paymentIntentId}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MemberPayments;
