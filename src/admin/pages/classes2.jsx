import { useState } from "react";
import PortalLayout from "../layouts/PortalLayout";

import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaSchool,
  FaChalkboardTeacher,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

function Classes() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const classes = [
    {
      id: 1,
      name: "JSS1",
      arm: "A",
      classTeacher: "Mr. Johnson",
      students: 42,
      capacity: 60,
      status: "Active",
    },
    {
      id: 2,
      name: "JSS2",
      arm: "B",
      classTeacher: "Mrs. Williams",
      students: 38,
      capacity: 60,
      status: "Active",
    },
    {
      id: 3,
      name: "SS1",
      arm: "C",
      classTeacher: "Mr. David",
      students: 45,
      capacity: 50,
      status: "Active",
    },
  ];

  const filtered = classes.filter((c) =>
    `${c.name} ${c.arm}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PortalLayout>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Classes & Arms</h1>
          <p className="text-gray-500 mt-1">
            Manage school classes, arms, and allocations
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-700 text-white px-4 py-3 rounded-2xl flex items-center justify-center gap-2"
        >
          <FaPlus /> Add Class
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-3xl border shadow-sm mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            className="w-full border pl-12 pr-4 py-3 rounded-2xl"
            placeholder="Search classes..."
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
              <th className="text-left p-5">Class</th>
              <th className="text-left">Arm</th>
              <th className="text-left">Teacher</th>
              <th className="text-left">Students</th>
              <th className="text-left">Capacity</th>
              <th className="text-right p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-5 font-semibold flex items-center gap-2">
                  <FaSchool className="text-blue-600" />
                  {c.name}
                </td>

                <td>{c.arm}</td>

                <td className="flex items-center gap-2">
                  <FaChalkboardTeacher className="text-gray-500" />
                  {c.classTeacher}
                </td>

                <td>{c.students}</td>
                <td>{c.capacity}</td>

                <td className="p-5">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedClass(c)}
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
        {filtered.map((c) => (
          <motion.div
            key={c.id}
            className="bg-white border rounded-3xl p-5"
            whileHover={{ y: -2 }}
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <FaSchool className="text-blue-600 text-xl" />

                <div>
                  <h3 className="font-semibold">
                    {c.name} - {c.arm}
                  </h3>

                  <p className="text-sm text-gray-500">{c.classTeacher}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm space-y-2">
              <p>
                <b>Students:</b> {c.students}
              </p>
              <p>
                <b>Capacity:</b> {c.capacity}
              </p>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setSelectedClass(c)}
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
        {selectedClass && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedClass(null)}
          >
            <motion.div
              className="bg-white w-full max-w-lg rounded-3xl p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Class Details</h2>

              <div className="space-y-3 text-sm">
                <p>
                  <b>Class:</b> {selectedClass.name}
                </p>
                <p>
                  <b>Arm:</b> {selectedClass.arm}
                </p>
                <p>
                  <b>Teacher:</b> {selectedClass.classTeacher}
                </p>
                <p>
                  <b>Students:</b> {selectedClass.students}
                </p>
                <p>
                  <b>Capacity:</b> {selectedClass.capacity}
                </p>
              </div>

              <button
                onClick={() => setSelectedClass(null)}
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
              <h2 className="text-2xl font-bold mb-5">Add Class</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border p-3 rounded-2xl"
                  placeholder="Class (e.g JSS1)"
                />
                <input
                  className="border p-3 rounded-2xl"
                  placeholder="Arm (A, B, C)"
                />

                <input
                  className="border p-3 rounded-2xl md:col-span-2"
                  placeholder="Class Teacher"
                />

                <input
                  className="border p-3 rounded-2xl"
                  placeholder="Capacity"
                />
              </div>

              <button className="w-full mt-5 bg-blue-700 text-white py-3 rounded-2xl">
                Save Class
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalLayout>
  );
}

export default Classes;
