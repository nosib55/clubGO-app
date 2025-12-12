import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import ClubPaymentForm from "../../components/ClubPaymentForm";

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [joined, setJoined] = useState(false);
  const [membership, setMembership] = useState(null);

  // ⭐ Fullscreen banner viewer toggle
  const [viewBanner, setViewBanner] = useState(false);

  // ==========================
  // Fetch club + membership status
  // ==========================
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/clubs/${id}`).then((res) => {
      setClub(res.data);
    });

    axios
      .get(`${import.meta.env.VITE_API_URL}/member/clubs`, {
        withCredentials: true,
      })
      .then((res) => {
        const found = res.data.find((c) => c._id === id);
        if (found) {
          setJoined(true);
          setMembership(found);
        }
      });
  }, [id]);

  // ==========================
  // FREE JOIN FLOW
  // ==========================
  const joinFreeClub = async () => {
    try {
      const res = await axios.post(
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
  // PAID JOIN FLOW
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
        Swal.fire("Already Joined", "You are already a member!", "info");
        return;
      }

      setClientSecret(res.data.clientSecret);
    } catch (err) {
      Swal.fire(
        "Payment Error",
        err.response?.data?.message || "Could not start payment",
        "error"
      );
    }
  };

  if (!club) return <p>Loading...</p>;

  // ==========================
  // PAGE UI
  // ==========================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 sm:p-10 max-w-5xl mx-auto"
    >
      {/* ==========================
          FULLSCREEN BANNER VIEW
      ========================== */}
      <AnimatePresence>
        {viewBanner && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewBanner(false)}
          >
            <motion.img
              src={club.bannerImage}
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================
          Banner Image
      ========================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-72 rounded-3xl overflow-hidden shadow-xl cursor-pointer group"
        onClick={() => setViewBanner(true)}
      >
        <img
          src={club.bannerImage}
          className="w-full h-full object-cover transform group-hover:scale-105 transition"
          alt="Club Banner"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        <p className="absolute bottom-3 right-3 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
          Click to view full
        </p>
      </motion.div>

      {/* ==========================
          Main Content
      ========================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 space-y-5"
      >
        <h1 className="text-4xl font-bold text-gray-900">{club.clubName}</h1>

        <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
          {club.category}
        </span>

        <p className="text-gray-700 leading-relaxed">{club.description}</p>

        <div className="flex flex-wrap gap-4 mt-5">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
            Members: {club.memberCount ?? 0}
          </span>

          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
            Fee: {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
          </span>
        </div>

        {/* Already Joined */}
        {joined && (
          <p className="mt-4 text-green-600 font-semibold text-lg">
            ✔ You are already a member of this club!
          </p>
        )}

        {/* PAYMENT FORM */}
        {clientSecret && !joined && (
          <ClubPaymentForm
            clientSecret={clientSecret}
            clubId={id}
            amount={club.membershipFee * 100}
            onSuccess={() => {
              Swal.fire("Success!", "You are now a member!", "success");
              setJoined(true);
            }}
          />
        )}

        {/* JOIN BUTTONS */}
        {!joined && !clientSecret && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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

        {/* Back Button */}
        <Link
          to="/clubs"
          className="inline-block mt-6 px-6 py-3 bg-gray-800 text-white rounded-xl shadow hover:bg-black transition"
        >
          ← Back to Clubs
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ClubDetails;
