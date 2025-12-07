import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ErrorPage from "../layouts/ErrorPage";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Clubs from "../pages/Clubs/Clubs";
import ClubDetails from "../pages/Clubs/ClubDetails";
import Events from "../pages/Events/Events";
import EventDetails from "../pages/Events/EventDetails";

// Dashboard Pages
import AdminHome from "../pages/dashboard/admin/AdminHome";
import ManagerHome from "../pages/dashboard/manager/ManagerHome";
import MemberHome from "../pages/dashboard/member/MemberHome";

// Route Guards
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      { path: "/clubs", element: <Clubs /> },

      {
        path: "/clubs/:id",
        element: (
          <PrivateRoute>
            <ClubDetails />
          </PrivateRoute>
        ),
      },

      { path: "/events", element: <Events /> },

      {
        path: "/events/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  // DASHBOARD ROUTES (Private)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Default Dashboard → Member
      { index: true, element: <MemberHome /> },

      // Admin
      { path: "admin", element: <AdminHome /> },

      // Club Manager
      { path: "manager", element: <ManagerHome /> },

      // Member
      { path: "member", element: <MemberHome /> },
    ],
  },
]);

export default router;
