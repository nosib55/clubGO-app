import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManagerEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/manager/events`, {
        withCredentials: true,
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("EVENT FETCH ERROR:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">You have not created any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div key={ev._id} className="border rounded-xl shadow p-4 bg-white">
              <h3 className="text-xl font-semibold">{ev.title}</h3>

              <p className="text-sm mt-2">
                <strong>Date:</strong> {ev.eventDate}
              </p>

              <p className="text-sm">
                <strong>Location:</strong> {ev.location}
              </p>

              <p className="text-sm">
                <strong>Fee:</strong> {ev.isPaid ? `$${ev.eventFee}` : "Free"}
              </p>

              {/* ⭐ Button to View Registrations */}
              <Link
                to={`/dashboard/manager/registrations?eventId=${ev._id}`}
                className="btn btn-outline btn-sm w-full mt-3"
              >
                View Registrations
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerEvents;
