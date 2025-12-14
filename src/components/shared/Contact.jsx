import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Questions, feedback, or support requests are always welcome.
          Reach out and the team will respond as soon as possible.
        </p>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-50 rounded-xl p-8 shadow-md hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Get in Touch
          </h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <span>support@clubgo.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-600" />
              <span>+8809696560361</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-600" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Send a Message
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="4"
              placeholder="Message"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
