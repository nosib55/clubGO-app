import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ClubPaymentForm from "../../components/ClubPaymentForm";

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [joined, setJoined] = useState(false); // ⭐ already joined?
  const [membership, setMembership] = useState(null); // ⭐ full membership info

  // ===========================
  // Load club + membership status
  // ===========================
  useEffect(() => {
    // Load club details
    axios
      .get(`${import.meta.env.VITE_API_URL}/clubs/${id}`)
      .then(res => setClub(res.data))
      .catch(err => console.log("CLUB DETAILS ERROR:", err));

    // Load user's joined clubs (to check status)
    axios
      .get(`${import.meta.env.VITE_API_URL}/member/clubs`, { withCredentials: true })
      .then(res => {
        const found = res.data.find(c => c._id === id);
        if (found) {
          setJoined(true);
          setMembership(found);
        }
      })
      .catch(() => {});
  }, [id]);


  // ===========================
  // ⭐ Free Club Join
  // ===========================
  const joinFreeClub = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/clubs/join`,
        { clubId: id },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Joined Successfully!",
        text: res.data.message,
      });

      setJoined(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Join failed",
      });
    }
  };


  // ===========================
  // ⭐ Start Stripe Payment
  // ===========================
  const startPayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/clubs/create-payment-intent`,
        { clubId: id },
        { withCredentials: true }
      );

      if (res.data?.message === "Already joined") {
        setJoined(true);
        return Swal.fire({
          icon: "info",
          title: "Already Joined",
          text: "You are already a member of this club!",
        });
      }

      setClientSecret(res.data.clientSecret);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: err.response?.data?.message || "Could not start payment",
      });
    }
  };


  if (!club) return <p>Loading...</p>;


  return (
    <div className="p-10 max-w-4xl mx-auto">
      <img
        src={club.bannerImage}
        className="rounded-lg shadow w-full h-60 object-cover"
      />

      <h1 className="text-3xl font-bold mt-4">{club.clubName}</h1>
      <p className="mt-2">{club.description}</p>

      {/* ⭐ Member Count */}
      <p className="mt-3 text-lg">
        <strong>Total Members:</strong> {club.memberCount ?? 0}
      </p>

      {/* ⭐ Fee */}
      <p className="mt-2 text-lg">
        <strong>Membership Fee:</strong>{" "}
        {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
      </p>

      {/* ⭐ Show Membership Status */}
      {joined && (
        <p className="mt-4 text-green-600 font-semibold">
          ✔ You are already a member!
        </p>
      )}

      {/* ⭐ Show Paid / Unpaid info */}
      {joined && membership?.membershipFee > 0 && (
        <p className="mt-1 text-blue-600 font-medium">
          Payment: <strong>Paid</strong>
        </p>
      )}

      {/* ==============================
           SHOW PAYMENT FORM
      ================================= */}
      {clientSecret && !joined && (
        <ClubPaymentForm
          clientSecret={clientSecret}
          clubId={id}
          amount={club.membershipFee * 100}
          onSuccess={() => {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "You are now a member of this club.",
            });
            setJoined(true);
          }}
        />
      )}

      {/* ==============================
           SHOW JOIN BUTTONS
      ================================= */}
      {!joined && !clientSecret && (
        <>
          {club.membershipFee == 0 ? (
            <button
              onClick={joinFreeClub}
              className="btn btn-primary mt-4"
            >
              Join Free
            </button>
          ) : (
            <button
              onClick={startPayment}
              className="btn btn-success mt-4"
            >
              Pay & Join
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ClubDetails;
