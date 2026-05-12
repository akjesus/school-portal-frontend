import { useEffect, useMemo, useState } from "react";
import PortalLayout from "../layouts/PortalLayout";
import Swal from "sweetalert2"

import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaFilter,
  FaUserGraduate,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import { getStudents, addStudent } from "../../api/students";
import { address } from "framer-motion/client";
import { GiDogBowl } from "react-icons/gi";

function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    admissionNo: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    address: "",
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleInputChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };
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
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getStudents();
        console.log("Fetched students:", data);
        setStudents(data.students || []); // Ensure we have an array
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const StudentSkeleton = () => {
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

  const filtered = students.filter(
    (s) =>
      s.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      s.lastName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );
  const handleAddStudent = async () => {
    try {
      console.log("Adding student:", newStudent);
      const res = await addStudent(newStudent);
      if (res.success) {
        await Swal.fire({
          icon: "success",
          title: "Student Added",
          text: res.message || "The student has been added successfully.",
        });
        setStudents((prev) => [...prev, res.student]);
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error adding student",
        text: error.message || "An error occurred while adding the student.",
      });
    }
    
    setShowAddModal(false);
  };
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginatedStudents = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <PortalLayout>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Students Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage student records and admissions
          </p>
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
            <FaPlus /> Add Student
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-3xl shadow-sm mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            className="w-full pl-12 pr-4 py-3 shadow focus:outline-none rounded-2xl"
            placeholder="Search students..."
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
      {/* DESKTOP TABLE */}
      {loading ? (
        <StudentSkeleton />
      ) : (
        <>
          <div className="hidden lg:block bg-white rounded-3xl shadow-sm  overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-5">Student</th>
                  <th className="text-left">Admission No</th>
                  <th className="text-left">Class</th>
                  <th className="text-left">Gender</th>
                  <th className="text-left">Status</th>
                  <th className="text-right p-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedStudents.map((s) => (
                  <tr key={s.id} className=" hover:bg-gray-50">
                    {/* STUDENT */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                          <FaUserGraduate className="text-blue-700" />
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {s.firstName} {s.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">{s.email}</p>
                        </div>
                      </div>
                    </td>

                    <td>{s.admissionNo}</td>
                    <td>{s.class}</td>
                    <td>{s.gender}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          s.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setSelectedStudent(s)}
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
            {paginatedStudents.map((s) => (
              <motion.div
                key={s.id}
                className="bg-white shadow rounded-3xl p-5"
                whileHover={{ y: -2 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <FaUserGraduate className="text-blue-700" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {s.firstName} {s.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">{s.admissionNo}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>

                <div className="mt-4 text-sm space-y-2">
                  <p>
                    <b>Class:</b> {s.class}
                  </p>
                  <p>
                    <b>Gender:</b> {s.gender}
                  </p>
                  <p>
                    <b>Email:</b> {s.email}
                  </p>
                  <p>
                    <b>Phone:</b> {s.phone}
                  </p>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setSelectedStudent(s)}
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
          {filtered.length} students
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
        {selectedStudent && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              className="bg-white w-full max-w-lg rounded-3xl p-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Student Profile</h2>

              <div className="space-y-3 text-sm">
                <p>
                  <b>Name:</b> {selectedStudent.firstName}{" "}
                  {selectedStudent.lastName}
                </p>
                <p>
                  <b>Admission No:</b> {selectedStudent.admissionNo}
                </p>
                <p>
                  <b>Class:</b> {selectedStudent.class}
                </p>
                <p>
                  <b>Gender:</b> {selectedStudent.gender}
                </p>
                <p>
                  <b>Email:</b> {selectedStudent.email}
                </p>
                <p>
                  <b>Phone:</b> {selectedStudent.phone}
                </p>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="mt-6 w-full bg-gray-100 py-3 rounded-2xl"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ADD STUDENT MODAL */}
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
                <h2 className="text-2xl font-bold">Add New Student</h2>

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
                  name="firstName"
                  value={newStudent.firstName}
                  onChange={handleInputChange}
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="First Name"
                />
                <input
                  name="lastName"
                  value={newStudent.lastName}
                  onChange={handleInputChange}
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Last Name"
                />

                <input
                  name="admissionNo"
                  value={newStudent.admissionNo}
                  onChange={handleInputChange}
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Admission No"
                />

                <select
                  name={"class"}
                  value={newStudent.class}
                  onChange={handleInputChange}
                  className="shadow p-3 rounded-2xl"
                >
                  <option>Select Class</option>
                  <option>JSS1</option>
                  <option>JSS2</option>
                  <option>SS1</option>
                </select>

                <select
                  name={"gender"}
                  value={newStudent.gender}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-2xl"
                >
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <input
                  name="dob"
                  value={newStudent.dob}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-2xl"
                  type="date"
                />

                <input
                  name="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-2xl "
                  placeholder="Email"
                />

                <input
                  name="phone"
                  value={newStudent.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-2xl "
                  placeholder="Phone"
                />
                <input
                  name="parentName"
                  value={newStudent.parentName}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-2xl "
                  placeholder="Parent Name"
                />

                <input
                  name="parentPhone"
                  value={newStudent.parentPhone }
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-2xl "
                  placeholder="Parent Phone"
                />

                <textarea
                  name="address"
                  value={newStudent.address}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-3 rounded-2xl md:col-span-2"
                  placeholder="Address"
                />
              </div>

              {/* ACTIONS */}
              <button
                disabled={
                  !newStudent.firstName ||
                  !newStudent.lastName ||
                  !newStudent.admissionNo ||
                  !newStudent.class ||
                  !newStudent.gender ||
                  !newStudent.dob ||
                  !newStudent.email ||
                  !newStudent.phone
                }
                onClick={handleAddStudent}
                className="w-full mt-6 bg-[#062E70] text-white py-3 rounded-2xl"
              >
                Save Student
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalLayout>
  );
}

export default Students;
