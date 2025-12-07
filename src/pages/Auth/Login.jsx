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

  // ===============================
  // EMAIL LOGIN (Firebase + Backend)
  // ===============================
  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);

    try {
      // 1️⃣ Firebase Login
      const { user } = await loginUser(data.email, data.password);

      // 2️⃣ Send Firebase User To Backend
      const res = await fetch("http://localhost:5000/auth", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: user.displayName || "User",
          email: user.email,
          photoURL: user.photoURL || "",
        }),
      });

      const result = await res.json();
      console.log("Backend Auth Response:", result);

      if (!res.ok) {
        setErrorMsg(result.message || "Authentication failed");
        return;
      }

      // 3️⃣ Redirect user
      navigate(from, { replace: true });

    } catch (err) {
      console.log(err);
      setErrorMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // GOOGLE LOGIN (Firebase + Backend)
  // ===============================
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      // 1️⃣ Google login (Firebase)
      const { user } = await googleLogin();

      // 2️⃣ Send user to backend
      const res = await fetch("http://localhost:5000/auth", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      });

      const result = await res.json();
      console.log("Google Auth Response:", result);

      if (!res.ok) {
        setErrorMsg(result.message || "Google login failed");
        return;
      }

      // 3️⃣ Redirect
      navigate(from, { replace: true });

    } catch (err) {
      console.log(err);
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

      {/* ERROR MESSAGE */}
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {loading && <p className="text-blue-500 mb-3">Processing...</p>}

      {/* EMAIL LOGIN FORM */}
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
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          {loading ? "Logging in..." : <> <AiOutlineLogin /> Login </>}
        </button>
      </form>

      {/* GOOGLE LOGIN */}
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
