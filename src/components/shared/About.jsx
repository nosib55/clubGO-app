import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
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
          About Club-GO
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Club-GO is a modern platform designed to simplify club management,
          event organization, and member engagement in one centralized system.
        </p>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Mission */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="bg-blue-50 shadow-md hover:shadow-xl rounded-xl p-6 transition-all"
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The mission is to empower communities, universities, and
            organizations by providing an easy-to-use platform for managing
            clubs, memberships, events, and payments efficiently.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="bg-green-50 shadow-md hover:shadow-xl rounded-xl p-6 transition-all"
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            ClubSphere aims to become a trusted digital hub where people can
            connect, collaborate, and grow through meaningful club activities
            and well-organized events worldwide.
          </p>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="bg-purple-50 shadow-md hover:shadow-xl rounded-xl p-6 md:col-span-2 transition-all"
        >
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            What We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Club creation and management tools</li>
            <li>Event scheduling and registrations</li>
            <li>Secure membership and event payments</li>
            <li>Role-based dashboards for admins, managers, and members</li>
            <li>Simple and responsive user experience</li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
