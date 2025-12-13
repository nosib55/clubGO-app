import useAuth from "../../../hooks/useAuth";
import Welcome from "../../../assets/animated/Wlcome";

const MemberHome = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      
      {/* TEXT */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Welcome, {user?.displayName || "Member"} 👋
      </h1>

      {/* LOTTIE ANIMATION */}
      <div className="w-full flex justify-center items-center h-[70vh]">
        <Welcome
          className="
            w-full
            max-w-[1200px]
            h-full
          "
        />
      </div>

    </div>
  );
};

export default MemberHome;
