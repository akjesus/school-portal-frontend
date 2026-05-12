import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaNewspaper,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaFileAlt,
  FaCalendarAlt,
} from "react-icons/fa";

function PortalLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [staff, setStaff] = useState(
    JSON.parse(localStorage.getItem("staff")) || null,
  );
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("staff");
    navigate("/");
  };

  const menu = [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: FaHome,
          path: "/portal",
        },
      ],
    },

    {
      title: "ACADEMICS",
      items: [
        {
          name: "Students",
          icon: FaUsers,
          path: "/portal/students",
        },

        {
          name: "Staff",
          icon: FaChalkboardTeacher,
          path: "/portal/staff",
        },

        {
          name: "Classes",
          icon: FaSchool,
          path: "/portal/classes",
        },

        {
          name: "Subjects",
          icon: FaBook,
          path: "/portal/subjects",
        },
        {
          name: "Timetable",
          icon: FaCalendarAlt,
          path: "/portal/timetable",
        },

        {
          name: "Results",
          icon: FaFileAlt,
          path: "/portal/results",
        },
      ],
    },

    {
      title: "MANAGEMENT",
      items: [
        {
          name: "Attendance",
          icon: FaClipboardCheck,
          path: "/portal/attendance",
        },

        {
          name: "Payments",
          icon: FaMoneyBillWave,
          path: "/portal/payments",
        },

        {
          name: "News",
          icon: FaNewspaper,
          path: "/portal/news",
        },
        {
          name: "Applications",
          icon: FaNewspaper,
          path: "/portal/applications",
        },
        {
          name: "Settings",
          icon: FaCog,
          path: "/portal/settings",
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-gradient-to-b from-blue-950 to-blue-900 text-white z-50 transform transition-transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* LOGO */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-2xl font-bold">School Portal</h1>

              <p className="text-sm text-blue-200">Administration</p>
            </div>

            <button className="lg:hidden" onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* USER */}
          <div className="bg-white/10 rounded-2xl p-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-white mb-4"></div>
            <h2 className="font-bold text-lg">
              {staff?.role || "Super Admin"}
            </h2>
            <p className="text-blue-200 text-sm">{staff?.email}</p>
          </div>

          {/* MENU */}
          <div className="space-y-8">
            {menu.map((group, i) => (
              <div key={i}>
                <h3 className="text-xs uppercase tracking-widest text-blue-300 mb-3">
                  {group.title}
                </h3>

                <div className="space-y-2">
                  {group.items.map((item, index) => {
                    const Icon = item.icon;

                    const active = location.pathname === item.path;

                    return (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition ${
                          active
                            ? "bg-white text-[#062E70]"
                            : "hover:bg-blue-800"
                        }`}
                      >
                        <Icon />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="mt-10 flex items-center gap-3 text-red-300 hover:text-red-200"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="bg-white shadow-sm px-4 md:px-8 py-4 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-2xl"
              onClick={() => setOpen(true)}
            >
              <FaBars />
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <h3 className="font-semibold">
                {staff?.name || "Administrator"}
              </h3>

              <p className="text-xs text-gray-500">
                {staff?.role || "Super Admin"}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-700"></div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

export default PortalLayout;
