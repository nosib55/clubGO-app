import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import EventPaymentForm from "../../components/EventPaymentForm";
import Loading from "../../assets/animated/Loding";
import Error from "../../assets/animated/error";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [regCount, setRegCount] = useState(0);

  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [alreadyPaid, setAlreadyPaid] = useState(false);

  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const joinFreeEvent = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/events/join`,
        { eventId: id },
        { withCredentials: true }
      );

      if (res.data.message === "Already registered") {
        setAlreadyJoined(true);
        return Swal.fire("Already Registered", "You are in the event!", "info");
      }

      Swal.fire("Success!", "You joined the event!", "success");
      setAlreadyJoined(true);
      setRegCount((c) => c + 1);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message, "error");
    }
  };

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

  if (loading) return <div className="flex justify-center items-center h-64">
            <Loading></Loading>
          </div>;
  if (!event) return
  <div> <h2>Event Not Found</h2>
    <div className="flex justify-center items-center h-64">
        <Error></Error>
         </div></div>
  ;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{event.title}</h1>

      <p className="mt-3 text-gray-600">{event.description}</p>

      <p className="mt-3 font-bold text-black">
        Max Attendees: {event.maxAttendees ?? "Unlimited"}
      </p>

      <p className="mt-3">
        <strong>Date:</strong> {event.eventDate}
      </p>

      <p className="mt-1">
        <strong>Location:</strong> {event.location}
      </p>

      <p className="mt-3">
        <strong>Fee:</strong>{" "}
        {event.isPaid ? (
          <span className="text-red-600 font-bold">${event.eventFee}</span>
        ) : (
          <span className="text-green-600 font-bold">Free</span>
        )}
      </p>

      <p className="mt-3 text-lg">
        <strong>Total Registered:</strong> {regCount}
      </p>

      <div className="mt-3 flex gap-3">
        {alreadyPaid && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            ✔ Payment Complete — You are in this event
          </span>
        )}

        {alreadyJoined && !alreadyPaid && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
            ✔ Registered
          </span>
        )}
      </div>

      {alreadyPaid ? (
        <p className="mt-4 text-green-700 font-semibold text-lg">
          🎉 You are fully registered for this event!
        </p>
      ) : clientSecret ? (
        <EventPaymentForm
          clientSecret={clientSecret}
          eventId={id}
          amount={event.eventFee * 100}
          onSuccess={() => {
            Swal.fire("Success!", "Payment complete!", "success");
            setAlreadyPaid(true);
            setAlreadyJoined(true);
            setRegCount((c) => c + 1);
            setClientSecret("");
          }}
        />
      ) : alreadyJoined ? (
        <button className="btn btn-disabled mt-4" disabled>
          Already Registered
        </button>
      ) : event.isPaid ? (
        <button onClick={startPayment} className="btn btn-success mt-4">
          Pay & Join Event
        </button>
      ) : (
        <button onClick={joinFreeEvent} className="btn btn-primary mt-4">
          Join Free Event
        </button>
      )}

      {/* ⭐ BACK BUTTON ADDED HERE */}
      <div className="mt-6">
        <a
          href="/events"
          className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-black transition inline-block"
        >
          ← Back to Events
        </a>
      </div>
    </div>
  );
};

export default EventDetails;
