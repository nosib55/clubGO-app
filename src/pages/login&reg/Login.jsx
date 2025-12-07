import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { register, handleSubmit } = useForm();

  // EMAIL/PASSWORD LOGIN
  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);

    try {
      await loginUser(data.email, data.password);
      navigate(from, { replace: true });
    } catch {
      setErrorMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch {
      setErrorMsg("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-3xl font-semibold mb-4">Login</h2>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {loading && <p className="text-blue-500 mb-3">Processing...</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("email")}
          className="w-full border p-2"
          placeholder="Email"
        />

        <input
          {...register("password")}
          className="w-full border p-2"
          type="password"
          placeholder="Password"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full border p-2 mt-4 rounded"
      >
        {loading ? "Please wait..." : "Continue with Google"}
      </button>

      <p className="mt-4">
        New here?{" "}
        <Link to="/register" className="text-blue-600">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;
