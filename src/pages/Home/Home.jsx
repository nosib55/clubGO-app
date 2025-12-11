import { motion } from "framer-motion";
import FeaturedClubs from "./FeaturedClubs"; // dynamic section
import Hero from "./Hero";

const Home = () => {
  return (
    <div>
      {/* ===================== HERO SECTION ===================== */}
      <Hero></Hero>

      {/* ===================== DYNAMIC SECTION ===================== */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          ⭐ Featured Clubs
        </h2>
        <FeaturedClubs />
      </section>

      {/* ===================== HOW CLUBSPHERE WORKS ===================== */}
      <section className="py-16 bg-base-100 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          How ClubSphere Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            { step: "1", title: "Browse Clubs", text: "Explore hundreds of student communities." },
            { step: "2", title: "Join Instantly", text: "Register for clubs with one click." },
            { step: "3", title: "Participate in Events", text: "Attend exciting club events & activities." },
            { step: "4", title: "Grow Your Network", text: "Connect with mentors & like-minded people." }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              className="p-6 rounded-lg shadow bg-white text-center border"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-primary mb-2">{item.step}</div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="opacity-70">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== WHY JOIN A CLUB ===================== */}
      <section className="py-16 px-6 md:px-16 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-10">Why Join a Club?</h2>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            {
              title: "Skill Development",
              text: "Improve leadership, teamwork, & creativity."
            },
            {
              title: "Networking",
              text: "Meet people who share your interests and goals."
            },
            {
              title: "Fun & Experience",
              text: "Participate in activities, competitions, and events."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white border rounded-lg shadow text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="opacity-70">{item.text}</p>
            </motion.div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Home;
