import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import EventPaymentForm from "../../components/EventPaymentForm";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [regCount, setRegCount] = useState(0);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  // Load event details + registration count
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`);
        setEvent(res.data);

        const regs = await axios.get(
          `${import.meta.env.VITE_API_URL}/manager/events/registrations/${id}`,
          { withCredentials: true }
        );

        setRegCount(regs.data.length);
      } catch (err) {
        console.log("EVENT DETAILS ERROR:", err);
      }
    };

    fetchData();
  }, [id]);

  // ⭐ Join free event
  const joinFreeEvent = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/events/join`,
        { eventId: id },
        { withCredentials: true }
      );

      if (res.data.message === "Already registered") {
        setAlreadyJoined(true);
        return Swal.fire("Already Joined", "You are already registered!", "info");
      }

      Swal.fire("Success!", "You joined this event!", "success");
      setRegCount((prev) => prev + 1);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Join failed", "error");
    }
  };

  // ⭐ Start Stripe payment
  const startPayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/events/create-payment-intent`,
        { eventId: id },
        { withCredentials: true }
      );

      setClientSecret(res.data.clientSecret);
    } catch (err) {
      Swal.fire("Payment Error", err.response?.data?.message, "error");
    }
  };

  if (!event) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{event.title}</h1>

      <p className="mt-3 text-gray-600">{event.description}</p>

      <p className="mt-3">
        <strong>Date:</strong> {event.eventDate}
      </p>

      <p className="mt-1">
        <strong>Location:</strong> {event.location}
      </p>

      <p className="mt-3">
        <strong>Registration Fee:</strong>{" "}
        {event.isPaid ? (
          <span className="text-red-600 font-bold">${event.eventFee}</span>
        ) : (
          <span className="text-green-600 font-bold">Free</span>
        )}
      </p>

      {/* ⭐ Total attendees */}
      <p className="mt-3 text-lg">
        <strong>Total Registered:</strong> {regCount}
      </p>

      {/* ⭐ Already joined message */}
      {alreadyJoined && (
        <p className="mt-2 text-green-600 font-semibold">
          ✔ You are already registered
        </p>
      )}

      {/* ⭐ Payment Form OR Join Button */}
      {clientSecret ? (
        <EventPaymentForm
          clientSecret={clientSecret}
          eventId={id}
          amount={event.eventFee * 100}
          onSuccess={() => {
            Swal.fire("Success", "You are registered!", "success");
            setRegCount((prev) => prev + 1);
          }}
        />
      ) : (
        <>
          {alreadyJoined ? null : event.isPaid ? (
            <button onClick={startPayment} className="btn btn-success mt-4">
              Pay & Join Event
            </button>
          ) : (
            <button onClick={joinFreeEvent} className="btn btn-primary mt-4">
              Join Free Event
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EventDetails;
