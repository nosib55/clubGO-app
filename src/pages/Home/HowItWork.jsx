import { FaSearch, FaUsers, FaCalendarCheck, FaCreditCard } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-base-content mb-3">
            How Club-GO Works
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover clubs, join communities, and participate in events — all in one place.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Step 1 */}
          <div className="bg-base-100 rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl">
              <FaSearch />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Explore Clubs
            </h3>
            <p className="text-sm text-base-content/70">
              Browse local clubs by category, location, and interests.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-base-100 rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl">
              <FaUsers />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Join a Club
            </h3>
            <p className="text-sm text-base-content/70">
              Join free or paid clubs securely using Stripe payment.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-base-100 rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl">
              <FaCalendarCheck />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Register for Events
            </h3>
            <p className="text-sm text-base-content/70">
              Discover upcoming events and register instantly.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-base-100 rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl">
              <FaCreditCard />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Manage Everything
            </h3>
            <p className="text-sm text-base-content/70">
              Track memberships, payments, and events from your dashboard.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
