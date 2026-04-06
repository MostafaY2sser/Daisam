import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiMenu } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';
import { FaChevronDown } from 'react-icons/fa';

const Navbar = ({ sidebarOpen , setSidebarOpen }) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";
    const navigate = useNavigate();


  //  Logout function  
  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/login"); 
    } catch (err) {
      console.log("Logout error:", err.message);
    }
  };
  
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
            <div className={`relative group`}>
                {/* Button */}
                <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200
                  border-primary text-primary '
                  `}
                >
                  {/* Globe icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <span className="text-xs font-bold tracking-widest uppercase">
                    {i18n.language === "ar" ? "AR" : "EN"}
                  </span>
                  <FaChevronDown className="text-[10px] transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown */}
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden w-[130px] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">

                  <button
                    onClick={() => { i18n.changeLanguage("ar"); localStorage.setItem("lang", "ar"); }}
                    className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition hover:bg-primary/5
                      ${i18n.language === "ar" ? "text-primary font-semibold bg-primary/5" : "text-gray-600"}`}
                  >
                    <span>عربي</span>
                    <span className="text-xs text-gray-400 font-normal">AR</span>
                  </button>

                  <div className="h-px bg-gray-100" />

                  <button
                    onClick={() => { i18n.changeLanguage("en"); localStorage.setItem("lang", "en"); }}
                    className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition hover:bg-primary/5
                      ${i18n.language === "en" ? "text-primary font-semibold bg-primary/5" : "text-gray-600"}`}
                  >
                    <span>English</span>
                    <span className="text-xs text-gray-400 font-normal">EN</span>
                  </button>

                </div>
            </div>

            {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold border-2 border-red-600 p-1 sm:p-2 rounded-xl hover:bg-red-600 hover:text-white transition"
          >
            Logout
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