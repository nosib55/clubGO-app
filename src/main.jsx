import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const queryClient = new QueryClient();

function Root() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>
            <RouterProvider router={router} />
          </Elements>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
