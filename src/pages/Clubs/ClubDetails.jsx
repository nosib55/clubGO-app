import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import ClubPaymentForm from "../../components/ClubPaymentForm";
import Loading from "../../assets/animated/Loding";

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [joined, setJoined] = useState(false);
  const [viewBanner, setViewBanner] = useState(false);

  // ==========================
  // LOAD CLUB + MEMBERSHIP
  // ==========================
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch club
        const clubRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/clubs/${id}`
        );
        setClub(clubRes.data);

        // Check membership
        const memberRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/member/clubs`,
          { withCredentials: true }
        );

        const found = memberRes.data.find((c) => c._id === id);
        if (found) setJoined(true);
      } catch (err) {
        Swal.fire(
          "Club Not Found",
          "This club does not exist or was removed.",
          "error"
        );
        navigate("/clubs");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  // ==========================
  // JOIN FREE CLUB
  // ==========================
  const joinFreeClub = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/clubs/join`,
        { clubId: id },
        { withCredentials: true }
      );

      Swal.fire("Success!", "You joined the club!", "success");
      setJoined(true);
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Join failed",
        "error"
      );
    }
  };

  // ==========================
  // START PAYMENT
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
        return Swal.fire("Info", "Already a member", "info");
      }

      setClientSecret(res.data.clientSecret);
    } catch (err) {
      Swal.fire(
        "Payment Error",
        err.response?.data?.message || "Payment failed",
        "error"
      );
    }
  };

  // ==========================
  // LOADING STATE
  // ==========================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (!club) return null;

  // ==========================
  // UI
  // ==========================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 sm:p-10 max-w-5xl mx-auto"
    >
      {/* FULLSCREEN BANNER */}
      <AnimatePresence>
        {viewBanner && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewBanner(false)}
          >
            <motion.img
              src={club.bannerImage}
              className="max-h-[90vh] max-w-[90vw] rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BANNER */}
      <div
        onClick={() => setViewBanner(true)}
        className="relative w-full h-72 rounded-3xl overflow-hidden shadow-xl cursor-pointer"
      >
        <img
          src={club.bannerImage}
          alt="Club Banner"
          className="w-full h-full object-cover hover:scale-105 transition"
        />
        <div className="absolute inset-0 bg-black/30" />
        <span className="absolute bottom-3 right-3 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
          Click to view
        </span>
      </div>

      {/* CONTENT */}
      <div className="mt-8 space-y-4">
        <h1 className="text-4xl font-bold">{club.clubName}</h1>

        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
          {club.category}
        </span>

        <p className="text-gray-700">{club.description}</p>

        <div className="flex gap-4 flex-wrap">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full">
            Members: {club.memberCount ?? 0}
          </span>

          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
            Fee: {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
          </span>
        </div>

        {joined && (
          <p className="text-green-600 font-semibold">
            ✔ You are already a member
          </p>
        )}

        {/* PAYMENT */}
        {clientSecret && !joined && (
          <ClubPaymentForm
            clientSecret={clientSecret}
            clubId={id}
            amount={club.membershipFee * 100}
            onSuccess={() => {
              Swal.fire("Success!", "Membership activated!", "success");
              setJoined(true);
            }}
          />
        )}

        {/* ACTION BUTTONS */}
        {!joined && !clientSecret && (
          <>
            {club.membershipFee === 0 ? (
              <button
                onClick={joinFreeClub}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                Join Free
              </button>
            ) : (
              <button
                onClick={startPayment}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Pay & Join
              </button>
            )}
          </>
        )}
        <br />

        {/* BACK BUTTON */}
        <Link
          to="/clubs"
          className="inline-block mt-2 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-black"
        >
          ← Back to Clubs
        </Link>
      </div>
    </motion.div>
  );
};

export default ClubDetails;
