import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { AiOutlineLogin, AiOutlineGoogle } from "react-icons/ai";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);

    try {
      const { user } = await loginUser(data.email, data.password);

      await fetch("http://localhost:5000/auth", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: user.displayName || "User",
          email: user.email,
          photoURL: user.photoURL || "",
        }),
      });

      navigate(from, { replace: true });
    } catch (error) {
      setErrorMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const { user } = await googleLogin();

      await fetch("http://localhost:5000/auth", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      });

      navigate(from, { replace: true });
    } catch {
      setErrorMsg("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded bg-white shadow">
      <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
        <AiOutlineLogin /> Login
      </h2>

      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      {loading && <p className="text-blue-500 mb-3">Processing...</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("email", { required: true })}
          className="w-full border p-2 rounded"
          placeholder="Email"
        />

        <input
          {...register("password", { required: true })}
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          {loading ? "Logging in..." : <><AiOutlineLogin /> Login</>}
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full border p-2 mt-4 rounded flex items-center justify-center gap-2"
      >
        <AiOutlineGoogle /> Continue with Google
      </button>

      <p className="mt-4 text-center">
        New here?{" "}
        <Link to="/register" className="text-blue-600 font-semibold">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;
