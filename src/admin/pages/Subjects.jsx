import { useState } from "react";
import PortalLayout from "../layouts/PortalLayout";

import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaBook,
  FaChalkboardTeacher,
  FaLayerGroup,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

function Subjects() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MTH101",
      category: "Core",
      teacher: "Mr. Johnson",
      classes: ["JSS1A", "JSS2B", "SS1A"],
      students: 180,
      status: "Active",
    },
    {
      id: 2,
      name: "English Language",
      code: "ENG101",
      category: "Core",
      teacher: "Mrs. Williams",
      classes: ["JSS1A", "JSS2A"],
      students: 160,
      status: "Active",
    },
    {
      id: 3,
      name: "Economics",
      code: "ECO201",
      category: "Commercial",
      teacher: "Mr. David",
      classes: ["SS2A", "SS3A"],
      students: 95,
      status: "Active",
    },
  ];

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PortalLayout>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Subjects Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage curriculum, teachers, and class mapping
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-700 text-white px-4 py-3 rounded-2xl flex items-center gap-2"
        >
          <FaPlus /> Add Subject
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-3xl border shadow-sm mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            className="w-full border pl-12 pr-4 py-3 rounded-2xl"
            placeholder="Search subjects..."
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
              <th className="text-left p-5">Subject</th>
              <th className="text-left">Code</th>
              <th className="text-left">Category</th>
              <th className="text-left">Teacher</th>
              <th className="text-left">Classes</th>
              <th className="text-right p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                {/* SUBJECT */}
                <td className="p-5 font-semibold flex items-center gap-2">
                  <FaBook className="text-blue-600" />
                  {s.name}
                </td>

                <td>{s.code}</td>

                <td>
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                    {s.category}
                  </span>
                </td>

                <td className="flex items-center gap-2">
                  <FaChalkboardTeacher className="text-gray-500" />
                  {s.teacher}
                </td>

                <td>
                  <span className="text-sm text-gray-600">
                    {s.classes.join(", ")}
                  </span>
                </td>

                <td className="p-5">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedSubject(s)}
                      className="w-9 h-9 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center"
                    >
                      <FaEye />
                    </button>

                    <button className="w-9 h-9 bg-green-100 text-green-700 rounded-xl flex items-center justify-center">
                      <FaEdit />
                    </button>

                    <button className="w-9 h-9 bg-red-100 text-red-700 rounded-xl flex items-center justify-center">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-4">
        {filtered.map((s) => (
          <motion.div
            key={s.id}
            className="bg-white border rounded-3xl p-5"
            whileHover={{ y: -2 }}
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <FaBook className="text-blue-600 text-xl" />

                <div>
                  <h3 className="font-semibold">{s.name}</h3>

                  <p className="text-sm text-gray-500">{s.code}</p>
                </div>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
                {s.category}
              </span>
            </div>

            <div className="mt-4 text-sm space-y-2">
              <p>
                <b>Teacher:</b> {s.teacher}
              </p>
              <p>
                <b>Classes:</b> {s.classes.join(", ")}
              </p>
              <p>
                <b>Students:</b> {s.students}
              </p>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setSelectedSubject(s)}
                className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-xl"
              >
                View
              </button>

              <button className="flex-1 bg-green-100 text-green-700 py-2 rounded-xl">
                Edit
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* VIEW MODAL */}
      <AnimatePresence>
        {selectedSubject && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSubject(null)}
          >
            <motion.div
              className="bg-white w-full max-w-lg rounded-3xl p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Subject Details</h2>

              <div className="space-y-3 text-sm">
                <p>
                  <b>Name:</b> {selectedSubject.name}
                </p>
                <p>
                  <b>Code:</b> {selectedSubject.code}
                </p>
                <p>
                  <b>Category:</b> {selectedSubject.category}
                </p>
                <p>
                  <b>Teacher:</b> {selectedSubject.teacher}
                </p>
                <p>
                  <b>Classes:</b> {selectedSubject.classes.join(", ")}
                </p>
                <p>
                  <b>Students:</b> {selectedSubject.students}
                </p>
              </div>

              <button
                onClick={() => setSelectedSubject(null)}
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
              <h2 className="text-2xl font-bold mb-5">Add Subject</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border p-3 rounded-2xl"
                  placeholder="Subject Name"
                />
                <input className="border p-3 rounded-2xl" placeholder="Code" />

                <select className="border p-3 rounded-2xl">
                  <option>Category</option>
                  <option>Core</option>
                  <option>Science</option>
                  <option>Commercial</option>
                  <option>Arts</option>
                </select>

                <input
                  className="border p-3 rounded-2xl"
                  placeholder="Assign Teacher"
                />

                <input
                  className="border p-3 rounded-2xl md:col-span-2"
                  placeholder="Assign Classes (comma separated)"
                />
              </div>

              <button className="w-full mt-5 bg-blue-700 text-white py-3 rounded-2xl">
                Save Subject
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalLayout>
  );
}

export default Subjects;
