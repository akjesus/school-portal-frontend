import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGraduationCap } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // DUMMY AUTH
    localStorage.setItem("auth", "true");

    navigate("/portal");
  };

  return (
    <div className="min-h-screen bg-gray-100 grid lg:grid-cols-2">
      {/* LEFT */}
      <div className="hidden lg:flex bg-gradient-to-br from-blue-950 to-blue-700 text-white items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-lg"
        >
          <div className="flex items-center gap-4 mb-8">
            <img src="/logo.jpg" className="w-14 h-14" alt="MUC Logo" />
            <h1 className="text-5xl font-bold">MUC Portal</h1>
          </div>

          <p className="text-xl text-blue-100 leading-relaxed">
            Manage students, teachers, attendance, examinations, results, and
            school operations from one powerful platform.
          </p>

          <div className="mt-12 space-y-4">
            {[
              "Students Management",
              "Results & Report Cards",
              "Attendance Monitoring",
              "CBT Examination System",
            ].map((item, i) => (
              <div key={i} className="bg-white/10 p-4 rounded-xl">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8"
        >
          {/* MOBILE LOGO */}
          <div className="lg:hidden text-center mb-8">
            <img src="/logo.jpg" className="w-14 h-14 mx-auto mb-4" alt="MUC Logo" />

            <h1 className="text-3xl font-bold">MUC Portal</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold">Welcome Back</h2>

            <p className="text-gray-500 mt-2">Login to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* EMAIL */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full border pl-12 pr-4 py-4 rounded-xl"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full border pl-12 pr-4 py-4 rounded-xl"
              />
            </div>

            {/* REMEMBER */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button" className="text-blue-700">
                Forgot Password?
              </button>
            </div>

            {/* BUTTON */}
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold transition">
              Login
            </button>
          </form>

          {/* DUMMY LOGIN */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <h3 className="font-semibold text-blue-700 mb-2">
              Demo Credentials
            </h3>

            <p className="text-sm text-gray-600">Email: admin@school.com</p>

            <p className="text-sm text-gray-600">Password: password123</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
