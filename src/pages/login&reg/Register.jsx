import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { name, photoURL, email, password } = data;

    setErrorMsg("");

    // Password validation
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    if (!hasUpper || !hasLower || password.length < 6) {
      setErrorMsg("Password must contain uppercase, lowercase & 6 characters");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Firebase User
      const result = await registerUser(email, password);

      // 2. Update User Profile
      await updateUserProfile(name, photoURL);

      // 3. Save user to DB
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name,
        email,
        photoURL,
        role: "member",
      });

      navigate("/");
    } catch (err) {
      setErrorMsg("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-3xl font-semibold mb-4">Create Account</h2>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {loading && <p className="text-blue-500 mb-3">Processing...</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("name", { required: true })}
          className="w-full border p-2"
          placeholder="Full Name"
        />

        <input
          {...register("photoURL")}
          className="w-full border p-2"
          placeholder="Photo URL"
        />

        <input
          {...register("email", { required: true })}
          className="w-full border p-2"
          placeholder="Email"
        />

        <input
          {...register("password", { required: true })}
          className="w-full border p-2"
          type="password"
          placeholder="Password"
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
