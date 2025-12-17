import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import "swiper/css";

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Photography Club Member",
    img: "https://i.pravatar.cc/100?img=11",
    rating: 5,
    text:
      "Club-Go helped me discover local communities effortlessly. The experience feels smooth and premium.",
  },
  {
    name: "Sarah Ahmed",
    role: "Book Club Organizer",
    img: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    text:
      "Managing members and events is incredibly easy with Club-Go. Everything stays organized.",
  },
  {
    name: "Daniel Lee",
    role: "Tech Meetup Member",
    img: "https://i.pravatar.cc/100?img=47",
    rating: 4,
    text:
      "Clean UI, fast performance, and intuitive flow. Club-Go delivers exactly what it promises.",
  },
  {
    name: "Emily Chen",
    role: "Fitness Club Member",
    img: "https://i.pravatar.cc/100?img=58",
    rating: 5,
    text:
      "Finding clubs and events nearby has never been this easy. Club-Go truly connects people.",
  },
];

const Testimonial = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Rated & Loved on Club-Go
          </h2>
          <p className="text-gray-600 text-lg">
            Real reviews from people using Club-Go every day.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl p-6 shadow-md h-full flex flex-col justify-between">
                
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-emerald-500"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  “{item.text}”
                </p>

                {/* User */}
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.role}
                    </p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Testimonial;
