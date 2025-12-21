import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Profile = () => {
  const { user, logOut, updateUserProfile } = useAuth();
  const { role, roleLoading } = useRole();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">No user logged in</h2>
      </div>
    );
  }

  // UPDATE PROFILE
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await updateUserProfile(name, photo);
      setMessage("Profile updated successfully");
      setIsEditing(false);
    } catch {
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <div className="flex flex-col items-center gap-4">

        {/* PROFILE IMAGE */}
        {photo ? (
          <img
            src={photo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300" />
        )}

        {/* VIEW MODE */}
        {!isEditing && (
          <>
            <h2 className="text-2xl font-bold">
              {user.displayName || "No Name"}
            </h2>

            <p className="text-gray-600">{user.email}</p>

            <p className="text-sm">
              <span className="font-semibold">Role:</span>{" "}
              {roleLoading ? "Loading..." : role}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
            >
              Edit Profile
            </button>
          </>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <form onSubmit={handleUpdate} className="w-full space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display Name"
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Photo URL"
              className="w-full border p-2 rounded"
            />

            {message && (
              <p className="text-sm text-center text-green-600">{message}</p>
            )}

            <div className="flex gap-3">
              <button
                disabled={loading}
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* LOGOUT */}
        <button
          onClick={logOut}
          className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
