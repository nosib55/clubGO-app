import { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("EVENT FETCH ERROR:", err));
  }, []);

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div
              key={ev._id}
              className="border rounded-lg p-4 shadow bg-white space-y-2"
            >
              <h2 className="text-xl font-semibold">{ev.title}</h2>

              <p className="text-sm text-gray-600">{ev.description}</p>

              <div className="text-sm">
                <p><strong>Date:</strong> {ev.eventDate}</p>
                <p><strong>Location:</strong> {ev.location}</p>
                <p>
                  <strong>Fee:</strong>{" "}
                  {ev.isPaid ? `৳${ev.eventFee}` : "Free"}
                </p>
              </div>

              <p className="text-xs opacity-70">
                Managed by: {ev.managerEmail}
              </p>

              <button className="btn btn-sm btn-primary w-full mt-2">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
