import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import Swal from "sweetalert2";

const CreateClub = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { role } = useRole();

  // Only Manager can Create Clubs
  if (role !== "manager") {
    return (
      <div className="p-6 bg-base-100 shadow rounded text-center">
        <h2 className="text-xl font-bold text-red-500">Access Denied</h2>
        <p className="opacity-75">
          Only Managers can create clubs.  
          If you want to be a manager, request upgrade from your dashboard.
        </p>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        managerEmail: user.email, // auto attach manager
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/manager/clubs`,
        payload,
        { withCredentials: true }
      );

      Swal.fire("Success!", "Club submitted for admin approval.", "success");
      reset();

    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Failed to create club", "error");
    }
  };

  return (
    <div className="p-6 bg-base-100 shadow rounded max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Club</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <input
          {...register("clubName", { required: true })}
          className="input input-bordered w-full"
          placeholder="Club Name"
        />

        <textarea
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
          placeholder="Description"
        />

        <input
          {...register("category", { required: true })}
          className="input input-bordered w-full"
          placeholder="Category (Photography, Dance, Tech...)"
        />

        <input
          {...register("location", { required: true })}
          className="input input-bordered w-full"
          placeholder="Location (City/Area)"
        />

        <input
          {...register("bannerImage", { required: true })}
          className="input input-bordered w-full"
          placeholder="Banner Image URL"
        />

        <input
          type="number"
          {...register("membershipFee")}
          className="input input-bordered w-full"
          placeholder="Membership Fee (0 = Free)"
        />

        <button className="btn btn-primary w-full">Create Club</button>
      </form>
    </div>
  );
};

export default CreateClub;
