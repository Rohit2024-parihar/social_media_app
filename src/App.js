import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/home",
      element: <Home />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
