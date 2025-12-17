import { FaUsers, FaHandshake, FaLightbulb, FaMapMarkedAlt } from "react-icons/fa";

const WhyClub = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Club-Go?
          </h2>
          <p className="text-gray-600 text-lg">
            Everything clubs and communities need — in one simple platform.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card */}
          <div className="relative bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
            <span className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-emerald-400 to-emerald-600" />
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 text-xl">
                <FaUsers />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Like-Minded Communities
                </h3>
                <p className="text-gray-600">
                  Find and join clubs that match interests and passions easily.
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
            <span className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-emerald-400 to-emerald-600" />
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 text-xl">
                <FaHandshake />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Meaningful Connections
                </h3>
                <p className="text-gray-600">
                  Build real relationships through shared activities and events.
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
            <span className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-emerald-400 to-emerald-600" />
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 text-xl">
                <FaLightbulb />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Learn & Grow Together
                </h3>
                <p className="text-gray-600">
                  Develop skills and confidence through club-led activities.
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
            <span className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-emerald-400 to-emerald-600" />
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 text-xl">
                <FaMapMarkedAlt />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Discover Local Events
                </h3>
                <p className="text-gray-600">
                  Stay connected with events happening near the location.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyClub;
