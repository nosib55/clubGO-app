import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("📤 Sending to Firebase:", data);

      // 1️⃣ Create Firebase User
      const { user } = await createUser(data.email, data.password);
      console.log("🔥 Firebase user created:", user.email);

      // 2️⃣ Update Firebase Profile
      await updateUserProfile(data.name, data.photo);

      // 3️⃣ Send user data to backend
      const res = await fetch("http://localhost:5000/auth", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          photo: data.photo, // backend accepts `photo` or `photoURL`
        }),
      });

      const result = await res.json();
      console.log("📥 Backend Response:", result);

      if (!result.success) {
        console.log("❌ Backend did not save user!");
        return;
      }

      reset();
      navigate("/");

    } catch (error) {
      console.log("❌ Registration Error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          className="input input-bordered w-full mb-3"
          placeholder="Name"
        />

        <input
          {...register("photo")}
          className="input input-bordered w-full mb-3"
          placeholder="Photo URL"
        />

        <input
          {...register("email", { required: true })}
          className="input input-bordered w-full mb-3"
          placeholder="Email"
        />

        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className="input input-bordered w-full mb-3"
          placeholder="Password"
        />

        <button className="btn btn-primary w-full">Register</button>
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary">Login</Link>
      </p>
    </div>
  );
};

export default Register;
