

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";


const LandingLayout = lazy(() => import("../layouts/LandingLayout"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));


// Lazy Pages
const Home = lazy(() => import("../pages/Landing/Home"));
const About = lazy(() => import("../pages/Landing/About"));
const Contact = lazy(() => import("../pages/Landing/Contact"));
const Financing = lazy(() => import("../pages/Landing/Financing"));
const ListProperty = lazy(() => import("../pages/Landing/ListProperty"));
const SoldProjects = lazy(() => import("../pages/Landing/SoldProjects"));
const ProjectsDetails = lazy(() => import("../pages/Landing/ProjectsDetails"));
const AvailableProjects = lazy(() => import("../pages/Landing/AvailableProjects"));

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../pages/Dashboard/AuthAdmin/Login"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

// Protected Route Component
import ProtectedRoute from "../components/dashboard/ProtectedRoute";

// Loading Component
import Loader from "../components/common/Loader";

const router = createBrowserRouter([

  // Public Routes
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: "about", element: <Suspense fallback={<Loader />}><About /></Suspense> },
      { path: "available-projects", element: <Suspense fallback={<Loader />}><AvailableProjects /></Suspense> },
      { path: "sold-projects", element: <Suspense fallback={<Loader />}><SoldProjects /></Suspense> },
      { path: "projects-details/:id", element: <Suspense fallback={<Loader />}><ProjectsDetails /></Suspense> },
      { path: "financing", element: <Suspense fallback={<Loader />}><Financing /></Suspense> },
      { path: "list-your-property", element: <Suspense fallback={<Loader />}><ListProperty /></Suspense> },
      { path: "contact", element: <Suspense fallback={<Loader />}><Contact /></Suspense> },
    ],
  },

  // Protected Routes - Dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        )
      },
    ],
  },

  // Auth 
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },

  // Not Found
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },

]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}