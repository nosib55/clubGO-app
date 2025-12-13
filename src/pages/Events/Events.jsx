import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../../assets/animated/Loding";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  }),
};

const Events = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      return res.data;
    },
  });

  if (isLoading) return <div className="flex justify-center items-center h-64">
            <Loading></Loading>
          </div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Upcoming Events</h1>

      {events.length === 0 && (
        <p className="text-center text-gray-500">No events available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event._id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 24px rgba(0,0,0,0.15)" }}
            className="rounded-xl p-5 shadow-md bg-white transition"
          >
            <h2 className="text-2xl font-bold">{event.title}</h2>

            <p className="mt-3">
              <strong>Date:</strong> {event.eventDate}
            </p>

            <p>
              <strong>Location:</strong> {event.location}
            </p>

            <p className="mt-2">
              <strong>Fee:</strong>{" "}
              {event.isPaid ? (
                <span className="text-red-600 font-semibold">${event.eventFee}</span>
              ) : (
                <span className="text-green-600 font-semibold">Free</span>
              )}
            </p>

            <Link
              to={`/events/${event._id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View / Join Event
            </Link>
          </motion.div>
        ))}
        
      </div>
      <div className="mt-6">
        <a
          href="/"
          className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-black transition inline-block"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
};

export default Events;
