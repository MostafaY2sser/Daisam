// src/layouts/DashboardLayout.jsx
import { useTranslation } from "react-i18next";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function DashboardLayout() {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      {/* Navbar */}
      <nav className="w-full shadow-md p-2 flex items-center justify-between bg-white">
        <div className="flex items-center">

          {/* Logo */}
          <Link to={"/"}>
            <img src="/logo.png" alt="logo" className="w-32 sm:w-40" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Lang */}
          <button
            className={`text-text font-semibold sm:border-2 border-primary p-1 sm:p-2 rounded-xl`}
            onClick={() => {
              const newLang = i18n.language === "ar" ? "en" : "ar";
              i18n.changeLanguage(newLang);
              localStorage.setItem("lang", newLang);
            }}
          >
            {i18n.language === "ar" ? "EN" : "AR"}
          </button>

            {/* Toggle Sidebar button for small screens */}
            <button
              className="sm:hidden text-2xl mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>
        </div>

      </nav>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden sm:block w-64 bg-white shadow-lg">
          <nav className="p-4 space-y-2">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-primary text-text' : ''}`
              }
            >
              {t('home')}
            </NavLink>

          </nav>
        </aside>

        {/* Sidebar overlay for mobile */}
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity duration-300 sm:hidden ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Mobile Sidebar from RIGHT */}
        <aside
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 sm:hidden
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setSidebarOpen(false)} className="text-2xl">
              <FiX />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            <NavLink
              to="/dashboard"
              end
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-primary text-text' : ''}`
              }
            >
              {t('home')}
            </NavLink>

            <NavLink
              to="/dashboard/doctors"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-gray-300 hover:text-primary ${isActive ? 'bg-primary text-text' : ''}`
              }
            >
              {t('doctors')}
            </NavLink>

            <NavLink
              to="/dashboard/devices"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block p-2 rounded hover:bg-gray-300 hover:text-primary ${isActive ? 'bg-primary text-text' : ''}`
              }
            >
              {t('devices')}
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-2 md:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
