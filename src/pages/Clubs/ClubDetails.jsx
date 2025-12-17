import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../assets/animated/Loding";

const ClubDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [processing, setProcessing] = useState(false);

  const success = searchParams.get("success");
  const sessionId = searchParams.get("session_id");

  // 🔹 Ref to prevent double POST
  const checkoutProcessed = useRef(false);

  // =========================
  // LOAD CLUB + JOIN STATUS
  // =========================
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get club details
        const clubRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/clubs/${id}`,          { withCredentials: true }

        );
        setClub(clubRes.data);

        // 2️⃣ Check membership
        const memberRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/member/clubs`,
          { withCredentials: true }
        );
        const found = memberRes.data.find((c) => String(c._id) === String(id));
        if (found) setJoined(true);

        // 3️⃣ Stripe success handler (run only once)
        if (success === "true" && sessionId && !found && !checkoutProcessed.current) {
          checkoutProcessed.current = true;

          await axios.post(
            `${import.meta.env.VITE_API_URL}/clubs/checkout-success`,
            { clubId: id, sessionId },
            { withCredentials: true }
          );

          setJoined(true);
          Swal.fire("Success!", "Membership activated!", "success");

          // Remove query params to prevent re-trigger on refresh
          navigate(`/clubs/${id}`, { replace: true });
        }
      } catch (err) {
        Swal.fire("Error", "Club not found", "error");
        navigate("/clubs");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, success, sessionId, navigate]);

  // =========================
  // START STRIPE CHECKOUT
  // =========================
  const startCheckout = async () => {
    try {
      setProcessing(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/clubs/create-checkout-session`,
        { clubId: id },
        { withCredentials: true }
      );

      if (res.data?.message === "Already joined") {
        setJoined(true);
        return Swal.fire("Info", "Already a member", "info");
      }

      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Error", "Payment failed", "error");
    } finally {
      setProcessing(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (!club) return null;

  // =========================
  // UI
  // =========================
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <img
        src={club.bannerImage}
        alt="banner"
        className="w-full h-72 object-cover rounded-xl shadow"
      />

      <h1 className="text-4xl font-bold">{club.clubName}</h1>

      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
        {club.category}
      </span>

      <p className="text-gray-700">{club.description}</p>

      <div className="flex gap-4">
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full">
          Members: {club.memberCount || 0}
        </span>
        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
          Fee: {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
        </span>
      </div>

      {/* ✅ ALREADY JOINED */}
      {joined && (
        <div className="p-4 bg-green-100 text-green-700 rounded-xl font-semibold">
          ✔ You are already a member of this club
        </div>
      )}

      {/* ✅ JOIN BUTTON */}
      {!joined && (
        <button
          disabled={processing}
          onClick={startCheckout}
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-60"
        >
          {processing ? "Redirecting..." : "Pay & Join"}
        </button>
      )}
<br />
      <Link
        to="/clubs"
        className="inline-block px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-black"
      >
        ← Back to Clubs
      </Link>
    </div>
  );
};

export default ClubDetails;
