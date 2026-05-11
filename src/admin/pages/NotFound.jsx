import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-700 flex items-center justify-center px-6">
      <div className="text-center text-white max-w-2xl">
        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[120px] md:text-[180px] font-extrabold leading-none"
        >
          404
        </motion.h1>

        {/* MESSAGE */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-blue-100 text-lg mb-8 leading-relaxed"
        >
          The page you are looking for may have been removed, renamed, or is
          temporarily unavailable.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Back Home
          </Link>

          <Link
            to="/contact"
            className="border border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-900 transition"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;
