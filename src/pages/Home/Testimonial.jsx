import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import "swiper/css";

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Photography Club Member",
    img: "https://i.pravatar.cc/100?img=11",
    rating: 5,
    text: "Club-GO helped me discover local communities effortlessly. The experience feels smooth and incredibly premium.",
  },
  {
    name: "Sarah Ahmed",
    role: "Book Club Organizer",
    img: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    text: "Managing members and events is incredibly easy with Club-GO. Everything stays organized beautifully.",
  },
  {
    name: "Daniel Lee",
    role: "Tech Meetup Member",
    img: "https://i.pravatar.cc/100?img=47",
    rating: 4,
    text: "Clean UI, blazing performance, and intuitive flow. Club-GO delivers exactly what a community platform should.",
  },
  {
    name: "Emily Chen",
    role: "Fitness Club Member",
    img: "https://i.pravatar.cc/100?img=58",
    rating: 5,
    text: "Finding clubs near me has never been this easy. Club-GO truly connects people with shared passions.",
  },
];

const Testimonial = () => {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080818 0%, #0a0a1a 100%)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[20rem] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(124,58,237,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#7c3aed" }}>
            ✦ Testimonials
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: "#f0f0ff" }}>
            Loved by Our Community
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: "rgba(180,180,210,0.65)" }}>
            Real stories from real members who found their community through Club-GO.
          </p>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="flex flex-col gap-4 p-7 rounded-2xl h-full"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(139,92,246,0.15)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
                whileHover={{ borderColor: "rgba(139,92,246,0.35)", y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote icon */}
                <FaQuoteLeft className="text-2xl" style={{ color: "rgba(124,58,237,0.5)" }} />

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      style={{ color: i < item.rating ? "#a78bfa" : "rgba(139,92,246,0.2)" }}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(200,200,230,0.75)" }}>
                  "{item.text}"
                </p>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(139,92,246,0.12)" }} />

                {/* User */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-11 h-11 rounded-full"
                    style={{ border: "2px solid rgba(124,58,237,0.5)" }}
                  />
                  <div>
                    <h4 className="font-bold text-sm" style={{ color: "#e8e8ff" }}>
                      {item.name}
                    </h4>
                    <p className="text-xs" style={{ color: "rgba(180,180,210,0.55)" }}>
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
