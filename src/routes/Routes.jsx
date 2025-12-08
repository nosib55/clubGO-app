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
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageClubs from "../pages/dashboard/admin/ManageClubs";
import AdminPayments from "../pages/dashboard/admin/AdminPayments";
import ManageManagerRequests from "../pages/dashboard/admin/ManageManagerRequests";

// Manager Pages
import CreateClub from "../pages/dashboard/manager/CreateClub";
import MyClubs from "../pages/dashboard/manager/MyClubs";   

// Route Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import MemberRoute from "./MemberRoute";

const router = createBrowserRouter([
  // ================= PUBLIC ROUTES =================
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

  // ================= DASHBOARD ROUTES =================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      // Default dashboard → member
      { index: true, element: <MemberHome /> },

      // ========== ⭐ ADMIN ROUTES ==========
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
      {
        path: "admin/requests",
        element: (
          <AdminRoute>
            <ManageManagerRequests />
          </AdminRoute>
        ),
      },

      // ========== ⭐ MANAGER ROUTES ==========
      {
        path: "manager",
        element: (
          <ManagerRoute>
            <ManagerHome />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/create-club",
        element: (
          <ManagerRoute>
            <CreateClub />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/clubs",
        element: (
          <ManagerRoute>
            <MyClubs />
          </ManagerRoute>
        ),
      },

      // ========== ⭐ MEMBER ROUTES ==========
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
