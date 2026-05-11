import PortalLayout from "../layouts/PortalLayout";

import {
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaBook,
} from "react-icons/fa";

import { motion } from "framer-motion";

function PortalDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,245",
      icon: FaUsers,
    },

    {
      title: "Teachers",
      value: "58",
      icon: FaChalkboardTeacher,
    },

    {
      title: "Subjects",
      value: "34",
      icon: FaBook,
    },

    {
      title: "Revenue",
      value: "₦12.4M",
      icon: FaMoneyBillWave,
    },
  ];

  return (
    <PortalLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back, Administrator.</p>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
        {stats.map((card, i) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-6 rounded-3xl shadow-sm text-center"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Icon className="text-[#062E70] text-xl" />
              </div>

              <h3 className="font-bold text-lg mb-2">{card.title}</h3>

              <p className="text-gray-600 text-sm">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 grid xl:grid-cols-3 gap-6 mt-8">
        {/* RECENT ACTIVITIES */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Activities</h2>

            <button className="text-blue-700">View All</button>
          </div>

          <div className="space-y-4">
            {[
              "New student admitted to SS2",
              "Second term results uploaded",
              "School fees payment received",
              "Teacher attendance updated",
              "New CBT exam created",
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between shadow-sm rounded-2xl p-4"
              >
                <div>
                  <h3 className="font-semibold">{activity}</h3>

                  <p className="text-sm text-gray-500">Today</p>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

          <div className="space-y-4">
            {[
              "Add Student",
              "Add Teacher",
              "Upload Results",
              "Create Announcement",
              "Generate Reports",
            ].map((action, i) => (
              <button
                key={i}
                className="w-full bg-[#062E70] hover:bg-blue-800 text-white py-4 rounded-2xl transition"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

export default PortalDashboard;
