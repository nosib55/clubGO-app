import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Clubs from "../pages/Clubs/Clubs";
import Events from "../pages/Events/Events";
import Login from "../pages/login&reg/Login";
import Register from "../pages/login&reg/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/clubs", element: <Clubs /> },
      { path: "/events", element: <Events /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
