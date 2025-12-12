import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminPayments = () => {
  const { data: payments = [] } = useQuery({
    queryKey: ["adminPayments"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/payments`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  // ===============================
  // 🔥 TOTAL PAYMENTS
  // ===============================
  const clubTotals = {};
  const eventTotals = {};

  payments.forEach((p) => {
    if (p.type === "club" && p.clubName) {
      clubTotals[p.clubName] = (clubTotals[p.clubName] || 0) + p.amount;
    }
    if (p.type === "event" && p.eventName) {
      eventTotals[p.eventName] = (eventTotals[p.eventName] || 0) + p.amount;
    }
  });

  const clubTotalAmount = Object.values(clubTotals).reduce((a, b) => a + b, 0);
  const eventTotalAmount = Object.values(eventTotals).reduce((a, b) => a + b, 0);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold flex items-center gap-3 mb-6">
        <span className="text-blue-600 text-5xl">💳</span>
        Admin Payments Dashboard
      </h1>

      {/* =========================== */}
      {/* 🟦 TOTAL PAYMENTS BY CLUB */}
      {/* =========================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        
        {/* CLUB CARD */}
        <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            🏆 Total Payments by Club
          </h2>

          <div className="mt-4 bg-blue-50 p-4 rounded-lg text-lg font-semibold">
            {clubTotalAmount > 0 ? (
              <>
                {Object.entries(clubTotals).map(([club, total]) => (
                  <p key={club} className="flex justify-between">
                    <span>{club}</span>
                    <span className="text-blue-700">${total}</span>
                  </p>
                ))}

                <p className="flex justify-between mt-3 pt-3 border-t font-bold text-xl">
                  <span>Total</span>
                  <span className="text-blue-700">${clubTotalAmount}</span>
                </p>
              </>
            ) : (
              <p className="text-gray-500">No club payments yet</p>
            )}
          </div>
        </div>

        {/* EVENT CARD */}
        <div className="bg-white rounded-2xl shadow p-6 border border-green-100">
          <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            🎉 Total Payments by Event
          </h2>

          <div className="mt-4 bg-green-50 p-4 rounded-lg text-lg font-semibold">
            {eventTotalAmount > 0 ? (
              <>
                {Object.entries(eventTotals).map(([event, total]) => (
                  <p key={event} className="flex justify-between">
                    <span>{event}</span>
                    <span className="text-green-700">${total}</span>
                  </p>
                ))}

                <p className="flex justify-between mt-3 pt-3 border-t font-bold text-xl">
                  <span>Total</span>
                  <span className="text-green-700">${eventTotalAmount}</span>
                </p>
              </>
            ) : (
              <p className="text-gray-500">No event payments yet</p>
            )}
          </div>
        </div>
      </div>

      {/* =========================== */}
      {/* 🗂 ALL PAYMENT RECORDS TABLE */}
      {/* =========================== */}
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
          📄 All Payment Records
        </h2>

        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">User</th>
              <th className="p-3">Type</th>
              <th className="p-3">Club/Event</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Payment ID</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{p.userEmail}</td>

                <td className="p-3 capitalize font-semibold text-blue-700">
                  {p.type}
                </td>

                <td className="p-3">
                  {p.type === "club" ? (
                    <span className="text-blue-600 font-medium">
                      {p.clubName}
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      {p.eventName}
                    </span>
                  )}
                </td>

                <td className="p-3 font-semibold">${p.amount}</td>

                <td className="p-3">
                  {new Date(p.createdAt).toLocaleString()}
                </td>

                <td className="p-3 text-gray-600">{p.paymentIntentId}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
