import { useState } from "react";
import PortalLayout from "../layouts/PortalLayout";

import {
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaBook,
  FaSchool,
  FaEye,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

function Timetable() {
  const [search, setSearch] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const timetable = [
    {
      id: 1,
      day: "Monday",
      period: "08:00 - 08:40",
      class: "JSS1A",
      subject: "Mathematics",
      teacher: "Mr. Johnson",
    },
    {
      id: 2,
      day: "Monday",
      period: "08:40 - 09:20",
      class: "JSS1A",
      subject: "English",
      teacher: "Mrs. Williams",
    },
    {
      id: 3,
      day: "Tuesday",
      period: "08:00 - 08:40",
      class: "SS1A",
      subject: "Economics",
      teacher: "Mr. David",
    },
  ];

  const filtered = timetable.filter((t) =>
    `${t.class} ${t.subject} ${t.teacher}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <PortalLayout>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Timetable Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage class schedules, teachers, and subjects
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-700 text-white px-4 py-3 rounded-2xl flex items-center gap-2"
        >
          <FaPlus /> Add Period
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-3xl border shadow-sm mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            className="w-full border pl-12 pr-4 py-3 rounded-2xl"
            placeholder="Search timetable..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white rounded-3xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-5">Day</th>
              <th className="text-left">Period</th>
              <th className="text-left">Class</th>
              <th className="text-left">Subject</th>
              <th className="text-left">Teacher</th>
              <th className="text-right p-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-t hover:bg-gray-50">
                <td className="p-5 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" />
                  {t.day}
                </td>

                <td>{t.period}</td>

                <td className="flex items-center gap-2">
                  <FaSchool className="text-gray-500" />
                  {t.class}
                </td>

                <td className="flex items-center gap-2">
                  <FaBook className="text-gray-500" />
                  {t.subject}
                </td>

                <td className="flex items-center gap-2">
                  <FaChalkboardTeacher className="text-gray-500" />
                  {t.teacher}
                </td>

                <td className="p-5 text-right">
                  <button
                    onClick={() => setSelectedSlot(t)}
                    className="w-9 h-9 bg-blue-100 text-blue-700 rounded-xl inline-flex items-center justify-center"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-4">
        {filtered.map((t) => (
          <motion.div
            key={t.id}
            className="bg-white border rounded-3xl p-5"
            whileHover={{ y: -2 }}
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" />
                  {t.day}
                </h3>

                <p className="text-sm text-gray-500">{t.period}</p>
              </div>
            </div>

            <div className="mt-4 text-sm space-y-2">
              <p>
                <b>Class:</b> {t.class}
              </p>
              <p>
                <b>Subject:</b> {t.subject}
              </p>
              <p>
                <b>Teacher:</b> {t.teacher}
              </p>
            </div>

            <div className="mt-4">
              <button
                onClick={() => setSelectedSlot(t)}
                className="w-full bg-blue-100 text-blue-700 py-2 rounded-xl"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* VIEW MODAL */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSlot(null)}
          >
            <motion.div
              className="bg-white w-full max-w-lg rounded-3xl p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Period Details</h2>

              <div className="space-y-3 text-sm">
                <p>
                  <b>Day:</b> {selectedSlot.day}
                </p>
                <p>
                  <b>Period:</b> {selectedSlot.period}
                </p>
                <p>
                  <b>Class:</b> {selectedSlot.class}
                </p>
                <p>
                  <b>Subject:</b> {selectedSlot.subject}
                </p>
                <p>
                  <b>Teacher:</b> {selectedSlot.teacher}
                </p>
              </div>

              <button
                onClick={() => setSelectedSlot(null)}
                className="mt-6 w-full bg-gray-100 py-3 rounded-2xl"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white w-full max-w-xl rounded-3xl p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-5">Add Timetable Slot</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="border p-3 rounded-2xl">
                  <option>Select Day</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                </select>

                <input
                  className="border p-3 rounded-2xl"
                  placeholder="Time (e.g 08:00 - 08:40)"
                />

                <input className="border p-3 rounded-2xl" placeholder="Class" />
                <input
                  className="border p-3 rounded-2xl"
                  placeholder="Subject"
                />

                <input
                  className="border p-3 rounded-2xl md:col-span-2"
                  placeholder="Teacher"
                />
              </div>

              <button className="w-full mt-5 bg-blue-700 text-white py-3 rounded-2xl">
                Save Period
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalLayout>
  );
}

export default Timetable;
