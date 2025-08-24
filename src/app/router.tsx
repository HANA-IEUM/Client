import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";

import LandingPage from "@/pages/LandingPage";
import HomePage from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "home", element: <HomePage /> },
    ],
  },
]);
