import { Link } from "react-router-dom";

const ClubCard = ({ club }) => {
  return (
    <div className="border rounded-lg p-4 space-y-2 shadow-sm">
      <img
        src={club.bannerImage || "https://i.ibb.co/ZK4gT8h/default.jpg"}
        alt={club.clubName}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="text-xl font-semibold">{club.clubName}</h3>

      <p className="text-sm opacity-70">
        {club.description?.slice(0, 80)}...
      </p>

      <p className="text-xs opacity-60">
        Category: {club.category} • Location: {club.location}
      </p>

      <Link to={`/clubs/${club._id}`} className="btn btn-sm btn-primary w-full">
        View Details
      </Link>
    </div>
  );
};

export default ClubCard;
