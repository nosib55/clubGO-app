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

// Admin Pages
import AdminHome from "../pages/dashboard/admin/AdminHome";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageClubs from "../pages/dashboard/admin/ManageClubs";
import ManageManagerRequests from "../pages/dashboard/admin/ManageManagerRequests";
import AdminPayments from "../pages/dashboard/admin/AdminPayments";

// Manager Pages
import ManagerHome from "../pages/dashboard/manager/ManagerHome";
import CreateClub from "../pages/dashboard/manager/CreateClub";
import ManagerClubs from "../pages/dashboard/manager/MyClubs";
import CreateEvent from "../pages/dashboard/manager/CreateEvent";
import ManagerEvents from "../pages/dashboard/manager/ManagerEvents";
import ManagerRegistrations from "../pages/dashboard/manager/ManagerRegistrations";

// Member Pages
import MemberHome from "../pages/dashboard/member/MemberHome";
import MemberClubs from "../pages/dashboard/member/MyClubs";
import MemberEvents from "../pages/dashboard/member/MyEvents";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import MemberRoute from "./MemberRoute";
import MemberPayments from "../pages/dashboard/member/MemberPayments";

const router = createBrowserRouter([
  // ================= PUBLIC ROUTES =================
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Clubs
      { path: "clubs", element: <Clubs /> },
      {
        path: "clubs/:id",
        element: (
          <PrivateRoute>
            <ClubDetails />
          </PrivateRoute>
        ),
      },

      // Events
      { path: "events", element: <Events /> },
      {
        path: "events/:id",
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
      // Default dashboard = Member
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
        path: "admin/requests",
        element: (
          <AdminRoute>
            <ManageManagerRequests />
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
            <ManagerClubs />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/events",
        element: (
          <ManagerRoute>
            <ManagerEvents />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/create-event",
        element: (
          <ManagerRoute>
            <CreateEvent />
          </ManagerRoute>
        ),
      },
      {
        path: "manager/registrations",
        element: (
          <ManagerRoute>
            <ManagerRegistrations />
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
      {
        path: "member/clubs",
        element: (
          <MemberRoute>
            <MemberClubs />
          </MemberRoute>
        ),
      },
      {
        path: "member/events",
        element: (
          <MemberRoute>
            <MemberEvents />
          </MemberRoute>
        ),
      },
      {
  path: "member/payments",
  element: (
    <MemberRoute>
      <MemberPayments />
    </MemberRoute>
  )
}

    ],
  },
  
]);

export default router;
