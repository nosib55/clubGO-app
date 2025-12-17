import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../assets/animated/Loding";

const Events = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["member-events"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/member/events/available`,
        { withCredentials: true }
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <h2 className="text-2xl font-semibold">No events available</h2>
        <p>Join a club to see its events.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Club Events</h1>

      {events.map(event => (
        <div
          key={event._id}
          className="p-4 mb-4 bg-white shadow rounded-lg flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.location}</p>
            <p>{event.eventDate}</p>
          </div>

          {/* ✅ View Details Button */}
          <Link
            to={`/events/${event._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Events;
