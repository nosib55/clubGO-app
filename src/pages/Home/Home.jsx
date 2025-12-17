import FeaturedClubs from "./FeaturedClubs"; // dynamic section
import Hero from "./Hero";
import HowItWorks from "./HowItWork";
import Testimonial from "./Testimonial";
import WhyClub from "./WhyClub";

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
    <HowItWorks></HowItWorks>
    <Testimonial></Testimonial>
     <WhyClub></WhyClub>
     
    </div>
  );
};

export default Home;
