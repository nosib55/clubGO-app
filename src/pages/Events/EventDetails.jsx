import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../assets/animated/Loding";
import Error from "../../assets/animated/error";

const EventDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const processedRef = useRef(false);

  const [event, setEvent] = useState(null);
  const [regCount, setRegCount] = useState(0);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  const success = searchParams.get("success");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const eventRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/${id}`
        );
        setEvent(eventRes.data);

        try {
          const regs = await axios.get(
            `${import.meta.env.VITE_API_URL}/manager/events/registrations/${id}`,
            { withCredentials: true }
          );
          setRegCount(regs.data.length);
        } catch {
          setRegCount(0);
        }

        const statusRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/${id}/my-status`,
          { withCredentials: true }
        );

        setAlreadyJoined(statusRes.data.joined);
        setAlreadyPaid(statusRes.data.paid);

        // ✅ STRIPE SUCCESS HANDLER (ONCE)
        if (
          success === "true" &&
          sessionId &&
          !statusRes.data.paid &&
          !processedRef.current
        ) {
          processedRef.current = true;

          await axios.post(
            `${import.meta.env.VITE_API_URL}/events/checkout-success`,
            { eventId: id, sessionId },
            { withCredentials: true }
          );

          Swal.fire("Success!", "Payment complete!", "success");
          setAlreadyPaid(true);
          setAlreadyJoined(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, success, sessionId]);

  // ✅ FREE EVENT JOIN
  const joinFreeEvent = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/events/join`,
        { eventId: id },
        { withCredentials: true }
      );

      if (res.data.message === "Already registered") {
        setAlreadyJoined(true);
        return Swal.fire("Info", "Already registered", "info");
      }

      Swal.fire("Success!", "Joined the event!", "success");
      setAlreadyJoined(true);
      setRegCount((c) => c + 1);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message, "error");
    }
  };

  // ✅ PAID EVENT — STRIPE CHECKOUT
  const startCheckout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/events/create-checkout-session`,
        { eventId: id },
        { withCredentials: true }
      );

      if (res.data?.message === "Already paid") {
        setAlreadyPaid(true);
        return Swal.fire("Info", "Already registered", "info");
      }

      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Payment Error", err.response?.data?.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center">
        <h2>Event Not Found</h2>
        <Error />
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{event.title}</h1>

      <p className="mt-3 text-gray-600">{event.description}</p>

      <p className="mt-3 font-bold">
        Max Attendees: {event.maxAttendees ?? "Unlimited"}
      </p>

      <p className="mt-2"><strong>Date:</strong> {event.eventDate}</p>
      <p className="mt-1"><strong>Location:</strong> {event.location}</p>

      <p className="mt-3">
        <strong>Fee:</strong>{" "}
        {event.isPaid ? (
          <span className="text-red-600 font-bold">${event.eventFee}</span>
        ) : (
          <span className="text-green-600 font-bold">Free</span>
        )}
      </p>

      <p className="mt-3">
        <strong>Total Registered:</strong> {regCount}
      </p>

      {alreadyPaid && (
        <p className="mt-4 text-green-700 font-semibold">
          ✔ Payment Complete — Registered
        </p>
      )}

      {!alreadyPaid && alreadyJoined && (
        <p className="mt-4 text-blue-700 font-semibold">
          ✔ Registered (Free Event)
        </p>
      )}

      {!alreadyJoined && event.isPaid && (
        <button onClick={startCheckout} className="btn btn-success mt-4">
          Pay & Join Event
        </button>
      )}

      {!alreadyJoined && !event.isPaid && (
        <button onClick={joinFreeEvent} className="btn btn-primary mt-4">
          Join Free Event
        </button>
      )}

      <div className="mt-6">
        <a
          href="/events"
          className="px-6 py-3 bg-gray-800 text-white rounded-lg"
        >
          ← Back to Events
        </a>
      </div>
    </div>
  );
};

export default EventDetails;
