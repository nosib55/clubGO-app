import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineUserAdd, AiOutlineGoogle } from "react-icons/ai";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // EMAIL PASSWORD REGISTER
  // ===============================
  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);

    try {
      // 1️⃣ Firebase Create User
      const { user } = await createUser(data.email, data.password);

      // 2️⃣ Update Firebase Profile
      await updateUserProfile(data.name, data.photo);

      // 3️⃣ Fire user to backend `/auth`
      const res = await fetch("http://localhost:5000/auth", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          photoURL: data.photo,
        }),
      });

      const result = await res.json();
      console.log("📥 Backend Response:", result);

      if (!result.success) {
        setErrorMsg("Failed to save user in database");
        return;
      }

      reset();
      navigate("/");

    } catch (err) {
      console.error("REGISTER ERROR:", err.message);
      setErrorMsg("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // GOOGLE REGISTER / LOGIN
  // ===============================
  const handleGoogleSignup = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      // 1️⃣ Firebase Google Login
      const { user } = await googleLogin();

      // 2️⃣ Send Google user to backend
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
      console.log("📥 Backend Response (Google):", result);

      if (!result.success) {
        setErrorMsg("Google user save failed!");
        return;
      }

      navigate("/");

    } catch (err) {
      console.error("GOOGLE SIGNUP ERROR:", err.message);
      setErrorMsg("Google signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <AiOutlineUserAdd /> Register
      </h2>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {loading && <p className="text-blue-500 mb-2">Processing...</p>}

      {/* =====================================================
          EMAIL PASSWORD SIGNUP FORM
      ===================================================== */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          className="input input-bordered w-full mb-3"
          placeholder="Full Name"
        />

        <input
          {...register("photo")}
          className="input input-bordered w-full mb-3"
          placeholder="Photo URL"
        />

        <input
          {...register("email", { required: true })}
          className="input input-bordered w-full mb-3"
          placeholder="Email Address"
        />

        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className="input input-bordered w-full mb-3"
          placeholder="Create Password"
        />

        <button
          disabled={loading}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? "Registering..." : <><AiOutlineUserAdd /> Register</>}
        </button>
      </form>

      {/* =====================================================
          GOOGLE SIGNUP BUTTON
      ===================================================== */}
      <button
        onClick={handleGoogleSignup}
        disabled={loading}
        className="btn w-full mt-4 border flex items-center justify-center gap-2"
      >
        <AiOutlineGoogle /> Continue with Google
      </button>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
