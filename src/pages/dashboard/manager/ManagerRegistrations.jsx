import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ManagerRegistrations = () => {
  const [events, setEvents] = useState([]); // All manager events
  const [regs, setRegs] = useState([]); // Registrations
  const [eventInfo, setEventInfo] = useState(null);

  const [params, setParams] = useSearchParams();
  const eventId = params.get("eventId");

  // ===============================
  //  Load manager's all events
  // ===============================
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/manager/events`, {
        withCredentials: true,
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("MANAGER EVENTS ERROR:", err));
  }, []);

  // ===============================
  // Load event details + registrations
  // ===============================
  useEffect(() => {
    if (!eventId) return;

    // Load registrations
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/manager/events/registrations/${eventId}`,
        { withCredentials: true }
      )
      .then((res) => setRegs(res.data))
      .catch((err) => console.error("REGISTRATION FETCH ERROR:", err));

    // Load event info
    axios
      .get(`${import.meta.env.VITE_API_URL}/events/${eventId}`)
      .then((res) => setEventInfo(res.data))
      .catch(() => {});
  }, [eventId]);

  // ===============================
  // Handle event dropdown change
  // ===============================
  const handleEventChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      setParams({ eventId: selected });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Event Registrations</h2>

      {/* ================= EVENT DROPDOWN ================= */}
      <div className="mb-6">
        <label className="font-semibold text-lg">Select Event:</label>
        <select
          className="select select-bordered w-full mt-2"
          value={eventId || ""}
          onChange={handleEventChange}
        >
          <option value="">-- Choose an Event --</option>

          {events.map((ev) => (
            <option key={ev._id} value={ev._id}>
              {ev.title} — {ev.eventDate}
            </option>
          ))}
        </select>
      </div>

      {!eventId && (
        <p className="text-red-500 text-lg">
          ⚠️ Please select an event to view registrations.
        </p>
      )}

      {/* ================= EVENT INFO ================= */}
      {eventInfo && (
        <div className="mb-4 p-5 border rounded-lg bg-gray-50 shadow">
          <h3 className="text-2xl font-semibold">{eventInfo.title}</h3>
          <p className="text-gray-600">{eventInfo.description}</p>

          <p className="mt-2 text-sm">
            <strong>Date:</strong> {eventInfo.eventDate}
          </p>
          <p className="text-sm">
            <strong>Location:</strong> {eventInfo.location}
          </p>

          <p className="mt-1 text-sm">
            <strong>Total Registrations:</strong> {regs.length}
          </p>
        </div>
      )}

      {/* ================= REGISTRATIONS TABLE ================= */}
      {eventId && regs.length === 0 && (
        <p className="text-gray-500 text-lg">No one has registered yet.</p>
      )}

      {regs.length > 0 && (
        <table className="table w-full border rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Paid</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {regs.map((r) => (
              <tr key={r._id}>
                <td>{r.userEmail}</td>
                <td className="capitalize">{r.status}</td>
                <td>${r.paidAmount || 0}</td>
                <td>{new Date(r.joinedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagerRegistrations;
