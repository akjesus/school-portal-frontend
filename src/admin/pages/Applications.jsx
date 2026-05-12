import { useEffect, useState } from "react";
import PortalLayout from "../layouts/PortalLayout";
import moment from "moment";
import Swal from "sweetalert2";

import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaFilter,
  FaBook,
  FaCheck,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import { getApplications, reviewApplications } from "../../api/applications";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [applicant, setApplicant] = useState({
    fullName: "",
    email: "",
    dob: "",
    classApplied: "",
    parentName: "",
    parentPhone: "",
    address: "",
    paymentProof: null,
  });
  const [remark, setRemark] = useState("");

  useEffect(() => {
    setLoading(true);

    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
      setLoading(false);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getApplications();
      console.log(data);
      setApplications(data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  const ApplicationSkeleton = () => {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white p-5 rounded-3xl flex justify-between"
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

  const filtered = applications.filter(
    (a) =>
      a.fullName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      a.email?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      a.parentName?.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginatedApplications = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (file && !file.type.startsWith("image/")) {
      setApplicant((prev) => ({ ...prev, paymentProof: null }));
      return;
    }

    setApplicant((prev) => ({ ...prev, paymentProof: file }));
  };
  const handleRemark = (e) => {
    setRemark(e.target.value);
    console.log("Remark:", e.target.value);
  };
  const handleAddApplication = () => {
    // Logic to add a new application
    setShowAddModal(false);
  };
  const handleReviewApplication = async (application, status, remark) => {
    const result = await Swal.fire({
      title: "Review Application",
      text: `Are you sure you want to ${status === "approved" ? "approve" : "reject"} this application?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#047b2c",
      cancelButtonColor: "#e64c13",
      confirmButtonText: `Yes, ${status === "approved" ? "Approve" : "Reject"}`,
      cancelButtonText: "Cancel",
    });

    if (result) {
      try {
        const res = await reviewApplications(application.id, status, remark);
        console.log(`Application ${application.id} has been ${status}`);
        if (res.success) {
          Swal.fire("Success", `Application has been ${status}.`, "success");
        }
      } catch (error) {
        console.error("Error reviewing application:", error);
        Swal.fire("Error", `Failed to ${status} application.`, "error");
      }
    }
    setSelectedApplication(null);
    fetchApplications();
  };

  return (
    <PortalLayout>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Applications Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage application requests and statuses
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
            <FaPlus /> Add Applicant
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-sm mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            className="w-full pl-12 pr-4 py-3 shadow focus:outline-none rounded-2xl"
            placeholder="Search applications..."
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
        <ApplicationSkeleton />
      ) : (
        <>
          <div className="hidden lg:block bg-white rounded-3xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-5">Applicant </th>
                  <th className="text-left">Class Applied</th>
                  <th className="text-left">Application Date</th>
                  <th className="text-left">Status</th>
                  <th className="text-right p-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                          <FaBook className="text-blue-700" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {application.fullName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {application.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>{application.classApplied}</td>
                    <td>
                      {" "}
                      {moment(application.created_at).format("MM/DD/YYYY")}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          application.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {application.status || "Active"}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setSelectedApplicant(application)}
                          className="bg-green-100 text-green-700 px-4 py-2 rounded-xl"
                        >
                          <FaEye />
                        </button>
                        <button
                          disabled={application.status === "approved"}
                          onClick={() => setSelectedApplication(application)}
                          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-4">
            {paginatedApplications.map((application) => (
              <motion.div
                key={application.id}
                className="bg-white shadow rounded-3xl p-5"
                whileHover={{ y: -2 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <FaBook className="text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{application.fullName}</h3>
                      <p className="text-sm text-gray-500">
                        {application.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      application.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {application.status || "Active"}
                  </span>
                </div>

                <div className="mt-4 text-sm space-y-2">
                  <p>
                    <b>Phone:</b> {application.phone}
                  </p>
                  <p>
                    <b>Class:</b> {application.classApplied}
                  </p>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setSelectedApplicant(application)}
                    className="flex-1 bg-green-100 text-green-700 py-2 rounded-xl"
                  >
                    View
                  </button>

                  <button
                    onClick={() => setSelectedApplication(application)}
                    className=" flex-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl"
                  >
                    Review
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <p className="text-sm text-gray-500">
          Showing {(currentPage - 1) * pageSize + 1} -{" "}
          {Math.min(currentPage * pageSize, filtered.length)} of{" "}
          {filtered.length} applications
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-xl border ${currentPage === i + 1 ? "bg-blue-700 text-white" : "bg-white"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedApplicant && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedApplicant(null)}
          >
            <motion.div
              className="bg-white w-full max-w-lg rounded-3xl p-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-1">
                Application Details: {selectedApplicant.applicationNo}
              </h2>

              <div className="space-y-1 text-sm">
                <div class="flex gap-4">
                  <p>
                    <b>Name:</b> {selectedApplicant.fullName}
                  </p>
                  <p>
                    <b>Email:</b> {selectedApplicant.email}
                  </p>
                </div>
                <div class="flex gap-4">
                  <p>
                    <b>Date of Birth:</b>{" "}
                    {moment(selectedApplicant.dob).format("MM/DD/YYYY")}
                  </p>
                  <p>
                    <b>Class Applied:</b> {selectedApplicant.classApplied}
                  </p>
                </div>
                <div class="flex gap-4">
                  <p>
                    <b>Parent Name:</b> {selectedApplicant.parentName || "N/A"}
                  </p>
                  <p>
                    <b>Parent Phone:</b>{" "}
                    {selectedApplicant.parentPhone || "N/A"}
                  </p>
                </div>
                <div class="flex gap-4">
                  <p>
                    <b>Address:</b> {selectedApplicant.address || "N/A"}
                  </p>
                  <p>
                    <b>Status:</b> {selectedApplicant.status || "Active"}
                  </p>
                </div>
                <img
                  src={selectedApplicant.paymentProof}
                  alt="PaymentProof"
                  className="w-full h-auto rounded-lg mt-1"
                />
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="mt-3 w-full bg-blue-200 py-1 rounded-2xl"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Add New Applicant</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 bg-gray-100 rounded-xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Applicant Name"
                />
                <input
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Applicant Phone"
                />
                <input
                  type="email"
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Applicant Email"
                />
                <input
                  type="date"
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Date of Birth"
                />
                <input
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Applicant Address"
                />
                <select
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Class Applied"
                >
                  <option value="">Select Class</option>
                  <option value="JSS1">JSS 1</option>
                  <option value="JSS2">JSS 2</option>
                  <option value="SSS1">SSS 1</option>
                </select>
                <input
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Parent Name"
                />
                <input
                  className="focus:no-outline shadow p-3 rounded-2xl"
                  placeholder="Parent Phone"
                />
              </div>
              {/* PAYMENT PROOF UPLOAD */}
              <div className="bg-white p-4 rounded-xl border border-dashed border-gray-300">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Proof of Payment
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-3 w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#062E70] file:text-white hover:file:bg-[#044a49]"
                />
                {applicant.paymentProof && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected file: {applicant.paymentProof.name}
                  </p>
                )}
              </div>
              <button
                disabled={
                  !applicant.fullName ||
                  !applicant.email ||
                  !applicant.dob ||
                  !applicant.classApplied ||
                  !applicant.parentName ||
                  !applicant.parentPhone ||
                  !applicant.address ||
                  !applicant.paymentProof
                }
                onClick={handleAddApplication}
                className="w-full mt-6 bg-[#062E70] text-white py-3 rounded-2xl"
              >
                Save Application
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* modal to approve or reject application */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Application Review</h2>

                    <p className="text-blue-100 mt-1">
                      Review applicant details and make a decision
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* BODY */}
              <div className="p-2 md:p-3">
                {/* PROFILE */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                  <div className="w-24 h-24 rounded-3xl bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700">
                    {selectedApplication.fullName?.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedApplication.fullName}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Application No:{" "}
                      {selectedApplication.applicationNo || "N/A"}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                        {selectedApplication.class_name}
                      </span>

                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                        {selectedApplication.gender}
                      </span>
                    </div>
                  </div>
                </div>

                {/* DETAILS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <div className="bg-gray-50 rounded-2xl p-2">
                    <p className="text-sm text-gray-500 mb-1">Parent Name</p>

                    <h4 className="font-semibold text-gray-800">
                      {selectedApplication.parentName}
                    </h4>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-2">
                    <p className="text-sm text-gray-500 mb-1">Parent Phone</p>

                    <h4 className="font-semibold text-gray-800">
                      {selectedApplication.parentPhone}
                    </h4>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-2">
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>

                    <h4 className="font-semibold text-gray-800">
                      {selectedApplication.email}
                    </h4>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-2">
                    <p className="text-sm text-gray-500 mb-1">Date Applied</p>

                    <h4 className="font-semibold text-gray-800">
                      {selectedApplication.created_at
                        ? moment(selectedApplication.created_at).format(
                            "MM/DD/YYYY",
                          )
                        : "N/A"}
                    </h4>
                  </div>
                </div>

                {/* ADMIN NOTES */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Admin Remark
                  </label>

                  <textarea
                    name="remark"
                    onChange={handleRemark}
                    rows={3}
                    placeholder="Add approval or rejection note..."
                    className="w-full border rounded-2xl p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* APPROVE */}
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition"
                    onClick={() => {
                      handleReviewApplication(
                        selectedApplication,
                        "approved",
                        remark,
                      );
                    }}
                  >
                    Approve Application
                  </button>

                  {/* REJECT */}
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition"
                    onClick={() => {
                      handleReviewApplication(
                        selectedApplication,
                        "rejected",
                        remark,
                      );
                    }}
                  >
                    Reject Application
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortalLayout>
  );
}

export default Applications;
