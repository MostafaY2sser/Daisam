// src/layouts/DashboardLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import { useTranslation } from "react-i18next";

export default function DashboardLayout() {

  const { t , i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
    
    useEffect(() => {
      window.scrollTo(0, 0); 
    }, [pathname]); 


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />


      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />  

          {/* Main Content */}
          <main className={`flex-1 p-2 md:p-6 mt-24 mr-0  ${isRtl ? 'sm:mr-64' :'sm:ml-64'} `}>
            <Outlet />
          </main>
      </div>

    </div>
  );
}
