import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/clubs/${id}`);
      setClub(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!club) {
    return <p className="opacity-70 text-center">Club not found</p>;
  }

  return (
    <div className="space-y-6">
      <img
        src={club.bannerImage}
        alt={club.clubName}
        className="w-full h-64 object-cover rounded-xl"
      />

      <h2 className="text-4xl font-bold">{club.clubName}</h2>

      <p className="opacity-80 leading-relaxed">{club.description}</p>

      <div className="text-sm opacity-70 space-y-1">
        <p>Category: {club.category}</p>
        <p>Location: {club.location}</p>
        <p>Membership Fee: {club.membershipFee === 0 ? "Free" : "$" + club.membershipFee}</p>
      </div>

      <Link
        to={`/dashboard/member`}
        className="btn btn-primary w-full md:w-1/3"
      >
        Join Club
      </Link>
    </div>
  );
};

export default ClubDetails;
