import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = ({ sidebarOpen , setSidebarOpen }) => {
    const { i18n } = useTranslation();
  
  return (
    <>
        <nav className="w-full shadow-md p-2 flex items-center justify-between bg-white fixed top-0 z-10">
          <div className="flex items-center">
            {/* Logo */}
            <Link to={"/"}>
              <img src="/images/logo_2.png" alt="logo" className="w-32 h-20 sm:w-40" />
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
    </>
  )
}

export default Navbar