import { useState, useEffect, useMemo } from "react";
import PortalLayout from "../layouts/PortalLayout";
import { getAllStaff } from "../../api/staff";

import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaFilter,
  FaChalkboardTeacher,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    setLoading(true);

    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
      setLoading(false);
    }, 400); // 400ms delay

    return () => clearTimeout(handler);
  }, [search]);
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const data = await getAllStaff();
        setTeachers(data.staff)
        console.log("Fetched teachers:", data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginatedTeachers = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const TeacherSkeleton = () => {
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
            Staff Management
          </h1>
          <p className="text-gray-500 mt-1">Manage all Academic & Non Academic staff</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="w-full sm:w-auto shadow bg-white px-4 py-3 rounded-2xl flex items-center justify-center gap-2">
            <FaDownload /> Export
          </button>

          <button className="w-full sm:w-auto shadow bg-white px-4 py-3 rounded-2xl flex items-center justify-center gap-2">
            <FaFilter /> Filter
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto bg-[#062E70] text-white px-4 py-3 rounded-2xl flex items-center justify-center gap-2"
          >
            <FaPlus /> Add Staff
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-3xl shadow-sm  mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            className="w-full shadow focus:outline-none pl-12 pr-4 py-3 rounded-2xl"
            placeholder="Search teachers..."
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
        <TeacherSkeleton />
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden lg:block bg-white rounded-3xl shadow-sm  overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-5">Staff</th>
                  <th className="text-left">Staff ID</th>
                  <th className="text-left">Department</th>
                  <th className="text-left">Subject</th>
                  <th className="text-left">Status</th>
                  <th className="text-right p-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedTeachers.map((t) => (
                  <tr key={t.id} className=" hover:bg-gray-50">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                          <FaChalkboardTeacher className="text-blue-700" />
                        </div>

                        <div>
                          <h3 className="font-semibold">{t.name}</h3>
                          <p className="text-sm text-gray-500">{t.email}</p>
                        </div>
                      </div>
                    </td>

                    <td>{t.staffId}</td>
                    <td>{t.department}</td>
                    <td>{t.subject}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          t.teacher === "1"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {t.teacher === "1" ? "Teaching" : "Non-Teaching"}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setSelectedTeacher(t)}
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
            {filtered.map((t) => (
              <motion.div
                key={t.id}
                className="bg-white border rounded-3xl p-5"
                whileHover={{ y: -2 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <FaChalkboardTeacher className="text-blue-700" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{t.name}</h3>
                      <p className="text-sm text-gray-500">{t.staffId}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      t.teacher === "1"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.teacher === "1" ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-4 text-sm space-y-2">
                  <p>
                    <b>Dept:</b> {t.department}
                  </p>
                  <p>
                    <b>Subject:</b> {t.subject}
                  </p>
                  <p>
                    <b>Email:</b> {t.email}
                  </p>
                  <p>
                    <b>Phone:</b> {t.phone}
                  </p>
                  <p>
                    <b>Staff ID:</b> {t.staffId}
                  </p>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setSelectedTeacher(t)}
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
          {filtered.length} Teachers
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
        {selectedTeacher && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTeacher(null)}
          >
            <motion.div
              className="bg-white w-full max-w-lg rounded-3xl p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>

              <div className="space-y-3 text-sm">
                <p>
                  <b>Name:</b> {selectedTeacher.name}
                </p>
                <p>
                  <b>Staff ID:</b> {selectedTeacher.staffId}
                </p>
                <p>
                  <b>Department:</b> {selectedTeacher.department}
                </p>
                <p>
                  <b>Subject:</b> {selectedTeacher.subject}
                </p>
                <p>
                  <b>Email:</b> {selectedTeacher.email}
                </p>
                <p>
                  <b>Phone:</b> {selectedTeacher.phone}
                </p>
              </div>

              <button
                onClick={() => setSelectedTeacher(null)}
                className="mt-6 w-full bg-gray-100 py-3 rounded-2xl"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ADD TEACHER MODAL */}
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
                <h2 className="text-2xl font-bold">Add Teacher</h2>

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
                  className="border  border-gray-200 focus: outline-none p-3 rounded-2xl"
                  placeholder="Full Name"
                />
                <input
                  className="border border-gray-200 focus: outline-none p-3 rounded-2xl"
                  placeholder="Staff ID"
                />

                <select className="border  border-gray-200 focus: outline-none p-3 rounded-2xl">
                  <option>Department</option>
                  <option>Science</option>
                  <option>Arts</option>
                  <option>Commercial</option>
                </select>

                <select className="border  border-gray-200 focus: outline-none p-3 rounded-2xl">
                  <option>Subject-leave blank for non academic staff</option>
                  <option>Math</option>
                  <option>English</option>
                  <option>Economics</option>
                </select>

                <input
                  className="border border-gray-200 focus: outline-none p-3 rounded-2xl"
                  placeholder="Email"
                />
                <input
                  className="border border-gray-200 focus: outline-none p-3 rounded-2xl"
                  placeholder="Phone"
                />

                <textarea
                  className="border border-gray-200 focus: outline-none p-3 rounded-2xl md:col-span-2"
                  placeholder="Address"
                />
              </div>

              {/* ACTION */}
              <button className="w-full mt-6 bg-[#062E70] text-white py-3 rounded-2xl">
                Save Staff
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalLayout>
  );
}

export default Teachers;
