import { createBrowserRouter, Navigate } from "react-router-dom";

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
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageClubs from "../pages/dashboard/admin/ManageClubs";
import AdminPayments from "../pages/dashboard/admin/AdminPayments";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import MemberRoute from "./MemberRoute";

const router = createBrowserRouter([
  // PUBLIC
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

  // DASHBOARD (Private)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      // Default
      { index: true, element: <Navigate to="member" replace /> },

      // ADMIN ROUTES
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/clubs",
        element: (
          <AdminRoute>
            <ManageClubs />
          </AdminRoute>
        ),
      },
      {
        path: "admin/payments",
        element: (
          <AdminRoute>
            <AdminPayments />
          </AdminRoute>
        ),
      },

      // MANAGER ROUTES
      {
        path: "manager",
        element: (
          <ManagerRoute>
            <ManagerHome />
          </ManagerRoute>
        ),
      },

      // MEMBER ROUTES
      {
        path: "member",
        element: (
          <MemberRoute>
            <MemberHome />
          </MemberRoute>
        ),
      },
    ],
  },
]);

export default router;
