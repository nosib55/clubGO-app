import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const CreateEvent = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const [clubs, setClubs] = useState([]);

  // Load manager's clubs
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/manager/clubs`, {
        withCredentials: true,
      })
      .then((res) => setClubs(res.data));
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("EVENT FORM DATA:", data);

      const payload = {
        clubId: data.clubId,
        title: data.title,
        description: data.description,
        eventDate: data.eventDate,
        location: data.location,
        isPaid: data.isPaid === "yes",
        eventFee: data.eventFee || 0,
        maxAttendees: data.maxAttendees || null,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/manager/events`,
        payload,
        { withCredentials: true }
      );

      alert("Event Created!");
      reset();
    } catch (err) {
      console.error("CREATE EVENT ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* CLUB SELECT */}
        <select {...register("clubId", { required: true })} className="input input-bordered w-full mb-3">
          <option value="">Select Club</option>
          {clubs.map((club) => (
            <option key={club._id} value={club._id}>
              {club.clubName}
            </option>
          ))}
        </select>

        <input
          {...register("title", { required: true })}
          className="input input-bordered w-full mb-3"
          placeholder="Event Title"
        />

        <textarea
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full mb-3"
          placeholder="Description"
        />

        <input
          type="date"
          {...register("eventDate", { required: true })}
          className="input input-bordered w-full mb-3"
        />

        <input
          {...register("location", { required: true })}
          className="input input-bordered w-full mb-3"
          placeholder="Location"
        />

        {/* Paid or Free event */}
        <select {...register("isPaid")} className="input input-bordered w-full mb-3">
          <option value="no">Free Event</option>
          <option value="yes">Paid Event</option>
        </select>

        <input
          type="number"
          {...register("eventFee")}
          className="input input-bordered w-full mb-3"
          placeholder="Event Fee (if paid)"
        />

        <input
          type="number"
          {...register("maxAttendees")}
          className="input input-bordered w-full mb-3"
          placeholder="Max Attendees (optional)"
        />

        <button className="btn btn-primary w-full">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
