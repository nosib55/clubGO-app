import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => navigate("/"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="input input-bordered w-full mb-3" {...register("email")} placeholder="Email" />
        <input className="input input-bordered w-full mb-3" {...register("password")} placeholder="Password" />

        <button className="btn btn-primary w-full">Login</button>
      </form>

      <button onClick={handleGoogle} className="btn btn-outline w-full mt-3">Login with Google</button>

      <p className="mt-4">
        New user? <Link to="/register" className="text-primary">Register</Link>
      </p>
    </div>
  );
};

export default Login;
