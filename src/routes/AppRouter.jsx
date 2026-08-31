

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";


const LandingLayout = lazy(() => import("../layouts/LandingLayout"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));


// Lazy Pages for Landing 
const Home = lazy(() => import("../pages/Landing/Home"));
const About = lazy(() => import("../pages/Landing/About"));
const Contact = lazy(() => import("../pages/Landing/Contact"));
const PrivacyPolicy = lazy(() => import("../pages/Landing/Privacy"));
const Financing = lazy(() => import("../pages/Landing/Financing"));
const ListProperty = lazy(() => import("../pages/Landing/ListProperty"));
const SoldProjects = lazy(() => import("../pages/Landing/SoldProjects"));
const ProjectsDetails = lazy(() => import("../pages/Landing/ProjectsDetails"));
const AvailableProjects = lazy(() => import("../pages/Landing/AvailableProjects"));
const Auctions = lazy(() => import("../pages/Landing/Auctions"));
const AuctionsDetails = lazy(() => import("../pages/Landing/AuctionsDetails"));

// Lazy Pages for Dashboard
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const ProjectsList = lazy(() => import("../pages/Dashboard/Projects/ProjectsList"));
const AddProject = lazy(() => import("../pages/Dashboard/Projects/AddProject"));
const EditProject = lazy(() => import("../pages/Dashboard/Projects/EditProject"));
const AdminProjectDetails = lazy(() => import("../pages/Dashboard/Projects/AdminProjectDetails"));
const AuctionsList = lazy(() => import("../pages/Dashboard/Auctions/AuctionsList"));
const AddAuction = lazy(() => import("../pages/Dashboard/Auctions/AddAuction"));
const AdminAuctionsDetails = lazy(() => import("../pages/Dashboard/Auctions/AdminAuctionsDetails"));
const EditAuction = lazy(() => import("../pages/Dashboard/Auctions/EditAuction"));


// Lazy Auth Page
const Login = lazy(() => import("../pages/Dashboard/AuthAdmin/Login"));

// Lazy Not Found Page
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
      {
        index: true,
        element:
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
      },
      {
        path: "about", 
        element: 
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
      },
      { 
        path: "available-projects", 
        element: 
          <Suspense fallback={<Loader />}>
            <AvailableProjects />
          </Suspense> 
      },
      { 
        path: "sold-projects", 
        element: 
          <Suspense fallback={<Loader />}>
            <SoldProjects />
          </Suspense> 
      },
      { 
        path: "projects-details/:id", 
        element: 
          <Suspense fallback={<Loader />}>
            <ProjectsDetails />
          </Suspense> 
      },
      { 
        path: "auctions", 
        element: 
          <Suspense fallback={<Loader />}>
            <Auctions />
          </Suspense> 
      },
      { 
        path: "auctions-details/:id", 
        element: 
          <Suspense fallback={<Loader />}>
            <AuctionsDetails />
          </Suspense> 
      },
      { 
        path: "financing", 
        element: 
          <Suspense fallback={<Loader />}>
            <Financing />
          </Suspense> 
      },
      { 
        path: "list-your-property", 
        element: 
          <Suspense fallback={<Loader />}>
            <ListProperty />
          </Suspense> 
      },
      { 
        path: "contact", 
        element: 
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
      },
      {
        path: "privacy-policy",
        element:
          <Suspense fallback={<Loader />}>
            <PrivacyPolicy />
          </Suspense>
      },
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
      {
        path: "admin/projects",
        element: (
          <Suspense fallback={<Loader />}>
            <ProjectsList />
          </Suspense>
        )
      },
      {
        path: "add-project",
        element: (
          <Suspense fallback={<Loader />}>
            <AddProject />
          </Suspense>
        )
      },
      {
        path: "project-details/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <AdminProjectDetails />
          </Suspense>
        )
      },
      {
        path: "edit-project/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <EditProject />
          </Suspense>
        )
      },
      {
        path: "admin/auctions",
        element: (
          <Suspense fallback={<Loader />}>
            <AuctionsList />
          </Suspense>
        )
      },
      {
        path: "add-auction",
        element: (
          <Suspense fallback={<Loader />}>
            <AddAuction />
          </Suspense>
        )
      },
      {
        path: "edit-auction/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <EditAuction />
          </Suspense>
        )
      },
      {
        path: "auctions-details/:id",
        element: (
            <Suspense fallback={<Loader />}>
                <AdminAuctionsDetails />
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