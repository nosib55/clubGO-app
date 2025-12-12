import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ClubPaymentForm from "../../components/ClubPaymentForm";

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [joined, setJoined] = useState(false);
  const [expiry, setExpiry] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/clubs/${id}`)
      .then(res => setClub(res.data));

    // check membership
    axios.get(`${import.meta.env.VITE_API_URL}/member/clubs`, { withCredentials: true })
      .then(res => {
        const found = res.data.find(c => c._id === id);
        if (found) {
          setJoined(true);
          setExpiry(found.expiryDate);
        }
      });
  }, [id]);

  const joinFree = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/clubs/join`,
      { clubId: id },
      { withCredentials: true }
    );

    Swal.fire("Success!", "You joined the club!", "success");
    setJoined(true);
  };

  const startPayment = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/clubs/create-payment-intent`,
      { clubId: id },
      { withCredentials: true }
    );

    if (res.data.alreadyJoined) {
      Swal.fire("Already Joined", "You are already a member!", "info");
      return;
    }

    setClientSecret(res.data.clientSecret);
  };

  if (!club) return <p>Loading...</p>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{club.clubName}</h1>

      <p className="mt-2">{club.description}</p>

      <p className="mt-2">Members: {club.memberCount ?? 0}</p>

      <p className="mt-2">
        Fee: {club.membershipFee > 0 ? `$${club.membershipFee}` : "Free"}
      </p>

      {joined && (
        <p className="mt-3 text-green-600 font-bold">
          ✔ You are a member {expiry && `(Expires: ${new Date(expiry).toLocaleDateString()})`}
        </p>
      )}

      {clientSecret && !joined ? (
        <ClubPaymentForm
          clientSecret={clientSecret}
          clubId={id}
          amount={club.membershipFee * 100}
          onSuccess={() => {
            Swal.fire("Success!", "Payment completed!", "success");
            setJoined(true);
          }}
        />
      ) : !joined ? (
        club.membershipFee === 0 ? (
          <button onClick={joinFree} className="btn btn-primary mt-4">
            Join Free
          </button>
        ) : (
          <button onClick={startPayment} className="btn btn-success mt-4">
            Pay & Join
          </button>
        )
      ) : null}
    </div>
  );
};

export default ClubDetails;
