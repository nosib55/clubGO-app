import { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // modal event
  const [loadingJoin, setLoadingJoin] = useState(false);

  // ========= Get all events =========
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("EVENT FETCH ERROR:", err));
  }, []);

  // ========= Join Event =========
  const handleJoin = async () => {
    if (!selectedEvent) return;

    setLoadingJoin(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/events/join`,
        { eventId: selectedEvent._id },
        { withCredentials: true }
      );

      alert(res.data.message || "Joined Successfully!");
      setSelectedEvent(null); // close modal
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Join Failed");
    } finally {
      setLoadingJoin(false);
    }
  };

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
                <p>
                  <strong>Date:</strong> {ev.eventDate}
                </p>
                <p>
                  <strong>Location:</strong> {ev.location}
                </p>
                <p>
                  <strong>Fee:</strong> {ev.isPaid ? `৳${ev.eventFee}` : "Free"}
                </p>
              </div>

              <p className="text-xs opacity-70">
                Managed by: {ev.managerEmail}
              </p>

              <button
                className="btn btn-sm btn-primary w-full mt-2"
                onClick={() => setSelectedEvent(ev)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ====================== MODAL ====================== */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">

            <h2 className="text-xl font-bold mb-2">
              {selectedEvent.title}
            </h2>

            <p className="mb-2">{selectedEvent.description}</p>

            <div className="text-sm space-y-1 mb-4">
              <p><strong>Date:</strong> {selectedEvent.eventDate}</p>
              <p><strong>Location:</strong> {selectedEvent.location}</p>
              <p>
                <strong>Fee:</strong>{" "}
                {selectedEvent.isPaid ? `৳${selectedEvent.eventFee}` : "Free"}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setSelectedEvent(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-sm btn-primary"
                onClick={handleJoin}
                disabled={loadingJoin}
              >
                {loadingJoin ? "Joining..." : "Join Event"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
