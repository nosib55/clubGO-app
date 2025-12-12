import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import ClubPaymentForm from "../../components/ClubPaymentForm";

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [joined, setJoined] = useState(false);
  const [membership, setMembership] = useState(null);

  // ==========================
  // Fetch club + membership status
  // ==========================
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/clubs/${id}`)
      .then(res => setClub(res.data));

    axios
      .get(`${import.meta.env.VITE_API_URL}/member/clubs`, { withCredentials: true })
      .then(res => {
        const found = res.data.find(c => c._id === id);
        if (found) {
          setJoined(true);
          setMembership(found);
        }
      });
  }, [id]);

  // ==========================
  // Join free club
  // ==========================
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

  // ==========================
  // Start payment
  // ==========================
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

  // ==========================
  // MAIN DESIGN
  // ==========================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-10 max-w-5xl mx-auto"
    >
      {/* Banner Image */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-72 rounded-3xl overflow-hidden shadow-xl"
      >
        <img
          src={club.bannerImage}
          className="w-full h-full object-cover"
          alt="club banner"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </motion.div>

      {/* Main Info */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6"
      >
        <h1 className="text-4xl font-bold text-gray-900">{club.clubName}</h1>

        {/* Category */}
        <p className="mt-1 inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
          {club.category}
        </p>

        {/* Description */}
        <p className="mt-4 text-gray-700 leading-relaxed">
          {club.description}
        </p>

        {/* Member Count + Fee */}
        <div className="flex items-center gap-4 mt-5">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
            Members: {club.memberCount ?? 0}
          </span>

          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
            Fee: {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
          </span>
        </div>

        {/* Already Joined Status */}
        {joined && (
          <p className="mt-4 text-green-600 font-semibold text-lg">
            ✔ You are already a member of this club!
          </p>
        )}

        {/* Payment Badge */}
        {joined && membership?.membershipFee > 0 && (
          <p className="mt-1 text-blue-600 font-medium">
            Payment Status: <strong>Paid</strong>
          </p>
        )}

        {/* PAYMENT FORM */}
        {clientSecret && !joined && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
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
          </motion.div>
        )}

        {/* JOIN BUTTONS */}
        {!joined && !clientSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            {club.membershipFee === 0 ? (
              <button
                onClick={joinFreeClub}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
              >
                Join Free
              </button>
            ) : (
              <button
                onClick={startPayment}
                className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
              >
                Pay & Join
              </button>
            )}
          </motion.div>
          
        )}
        <Link
          to="/clubs"
          className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
        >
            Back to Clubs
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ClubDetails;
