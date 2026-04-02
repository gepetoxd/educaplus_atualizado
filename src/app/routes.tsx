import { createBrowserRouter, Navigate } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Diagnosis from "./pages/Diagnosis";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import LearningPaths from "./pages/LearningPaths";
import LearningPathDetail from "./pages/LearningPathDetail";
import Planner from "./pages/Planner";
import Library from "./pages/Library";
import Diary from "./pages/Diary";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/diagnosis",
    element: <Diagnosis />,
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "learning-paths",
        element: <LearningPaths />,
      },
      {
        path: "learning-paths/:id",
        element: <LearningPathDetail />,
      },
      {
        path: "planner",
        element: <Planner />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "diary",
        element: <Diary />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
