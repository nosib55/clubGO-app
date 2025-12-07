import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photo);
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="input input-bordered w-full mb-3" {...register("name")} placeholder="Name" />
        <input className="input input-bordered w-full mb-3" {...register("photo")} placeholder="Photo URL" />
        <input className="input input-bordered w-full mb-3" {...register("email")} placeholder="Email" />
        <input className="input input-bordered w-full mb-3" {...register("password")} placeholder="Password" />

        <button className="btn btn-primary w-full">Register</button>
      </form>

      <p className="mt-4">
        Already have an account? <Link to="/login" className="text-primary">Login</Link>
      </p>
    </div>
  );
};

export default Register;
