import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import PortalDashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Staff from "../pages/Staff";
import Classes from "../pages/Classes";
import Subjects from "../pages/Subjects";
import Timetable from "../pages/TimeTable";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoutes";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/portal",
    element: (
      <ProtectedRoute>
        <PortalDashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/portal/students",
    element: (
      <ProtectedRoute>
        <Students />
      </ProtectedRoute>
    ),
  },

  {
    path: "/portal/staff",
    element: (
      <ProtectedRoute>
        <Staff />
      </ProtectedRoute>
    ),
  },

  {
    path: "/portal/classes",
    element: (
      <ProtectedRoute>
        <Classes />
      </ProtectedRoute>
    ),
  },

  {
    path: "/portal/subjects",
    element: (
      <ProtectedRoute>
        <Subjects />
      </ProtectedRoute>
    ),
  },
  {
    path: "/portal/timetable",
    element: (
      <ProtectedRoute>
        <Timetable />
      </ProtectedRoute>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default AppRouter;
