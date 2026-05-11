import { useState, useEffect, useMemo } from "react";
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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    setLoading(true);

    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
      setLoading(false);
    }, 400); // 400ms delay

    return () => clearTimeout(handler);
  }, [search]);

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
    `${c.name} ${c.arm}`.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginatedClasses= filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const ClassesSkeleton = () => {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white p-5 rounded-3xl  flex justify-between"
          >
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>

              <div className="space-y-2">
                <div className="w-40 h-4 bg-gray-200 rounded"></div>
                <div className="w-24 h-3 bg-gray-100 rounded"></div>
              </div>
            </div>

            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <PortalLayout>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Classes Management
          </h1>
          <p className="text-gray-500 mt-1">
            {" "}
            Manage school classes, arms, and allocations
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto bg-[#062E70] text-white px-4 py-3 rounded-2xl flex items-center justify-center gap-2"
          >
            <FaPlus /> Add Class
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-3xl shadow-sm  mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            className="w-full shadow focus:outline-none pl-12 pr-4 py-3 rounded-2xl"
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="bg-white shadow px-4 py-2 rounded-xl"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
      {loading ? (
        <ClassesSkeleton />
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden lg:block bg-white rounded-3xl shadow-sm  overflow-hidden">
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
                {paginatedClasses.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
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
                className="bg-white rounded-3xl p-5"
                whileHover={{ y: -2 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <FaChalkboardTeacher className="text-blue-700" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{c.name}</h3>
                      <p className="text-sm text-gray-500">{c.arm}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="mt-4 text-sm space-y-2">
                  <p>
                    <b>Dept:</b> {c.department}
                  </p>
                  <p>
                    <b>Subject:</b> {c.subject}
                  </p>
                  <p>
                    <b>Email:</b> {c.email}
                  </p>
                  <p>
                    <b>Phone:</b> {c.phone}
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
        </>
      )}
      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <p className="text-sm text-gray-500">
          Showing {(currentPage - 1) * pageSize + 1} -{" "}
          {Math.min(currentPage * pageSize, filtered.length)} of{" "}
          {filtered.length} Classes
        </p>

        <div className="flex items-center gap-2">
          {/* PREVIOUS */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-xl border ${
                currentPage === i + 1 ? "bg-blue-700 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
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
              <h2 className="text-2xl font-bold mb-4">Class Profile</h2>

              <div className="space-y-3 text-sm">
                <p>
                  <b>Name:</b> {selectedClass.name}
                </p>
                <p>
                  <b>Arm:</b> {selectedClass.arm}
                </p>
                <p>
                  <b>Class Teacher:</b> {selectedClass.classTeacher}
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
      {/* ADD CLASS MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="bg-white w-full max-w-2xl rounded-3xl p-5 md:p-8 overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Add Class</h2>

                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 bg-gray-100 rounded-xl"
                >
                  ✕
                </button>
              </div>

              {/* FORM */}
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

              {/* ACTION */}
              <button className="w-full mt-6 bg-[#062E70] text-white py-3 rounded-2xl">
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
