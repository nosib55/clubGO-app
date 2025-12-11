import { useEffect, useState } from "react";
import axios from "axios";

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/member/events`, {
        withCredentials: true,
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.log("MY EVENTS ERROR:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Joined Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">You have not joined any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div
              key={ev._id}
              className="border rounded-xl shadow p-4 bg-white space-y-2"
            >
              <h3 className="text-xl font-semibold">{ev.title}</h3>

              <p className="text-gray-600 text-sm">{ev.description}</p>

              <div className="text-sm space-y-1">
                <p><strong>Date:</strong> {ev.eventDate}</p>
                <p><strong>Location:</strong> {ev.location}</p>
                <p><strong>Fee:</strong> {ev.isPaid ? `৳${ev.eventFee}` : "Free"}</p>
              </div>

              <p className="text-xs opacity-60">Managed by: {ev.managerEmail}</p>

              <button className="btn btn-outline btn-sm w-full mt-2">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
