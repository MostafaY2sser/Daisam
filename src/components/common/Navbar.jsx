import { useState, useEffect } from "react";
import { NavLink  } from "react-router-dom";
import { FaBars, FaInstagram,FaChevronDown, FaSnapchat, FaTiktok, FaTimes } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import MobileDropdown from "../common/MobileDropdown";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";


  const menuLinks = [
  { path: "/", label: t("home") },
    { path: "/about", label: t("about") },
    {
      label: t("projects"),
      children: [
        { path: "/available-projects", label: t('available_projects') },
        { path: "/sold-projects", label: t('sold_projects') },
      ],
    },
    // { path: "/services", label: t("services") },
    { path: "/financing", label: t("financing") },
    { path: "/list-your-property", label: t("اعرض عقارك") },
    { path: "/contact", label: t("contact") },
  ];

  const socialLinks = [
    { href: "https://x.com/daisamrealestat", icon: <FaXTwitter   /> },
    { href: "https://www.tiktok.com/@daisamrealestate", icon: <FaTiktok /> },
    { href: "https://www.instagram.com/daisamrealestate/", icon: <FaInstagram /> },
    { href: "https://www.snapchat.com/@daisamrealestat?share_id=yaKvZQlbmX0&locale=en-US", icon: <FaSnapchat /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
        className={` fixed w-full top-0 z-50 transition-colors duration-200 ${
          scrolled
            ? "bg-white shadow-md py-0"
            : "py-2"
        }`}
      >

      <nav className="relative  flex justify-between items-center max-w-7xl mx-auto">

        <div className="flex items-center gap-6">
        {/* Logo */}
          <NavLink  to="/">
            <img 
              src={`/images/${scrolled? 'logo_2' : 'logo'}.png`}
              alt="logo" 
              className={`w-28 sm:w-36 ${scrolled ? '' : 'mr-2 sm:mr-0'} `}
            />
          </NavLink >

          {/* Desktop Menu */}
            <ul
              className={`hidden md:flex gap-6 font-normal text-base transition-colors duration-200 py-2 ${
                scrolled ? "text-gray-700" : "text-text"
              }`}
            >
              {menuLinks.map((link, index) => (
                <li key={index} className="relative group">
                  
                  {/* Normal Link */}
                  {!link.children ? (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        ` text-lg  transition ${scrolled?'hover:text-primary':'hover:text-white'} ${
                          isActive
                            ? "text-white bg-primary px-4 rounded-full py-1 hover:text-text"
                            : ""
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <>
                      {/* Parent */}
                      <span className={`cursor-pointer ${scrolled? 'hover:text-primary' : 'hover:text-white'}  text-lg transition flex items-center gap-1`}>
                        {link.label}
                        <FaChevronDown className="text-xs mt-1 group-hover:rotate-180 transition-transform duration-200" />
                      </span>

                      {/* Dropdown */}
                      <ul className="absolute top-full mt-2 left-0 bg-primary shadow-lg rounded-lg overflow-hidden min-w-[180px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                        {link.children.map((child, i) => (
                          <li key={i}>
                            <NavLink
                              to={child.path}
                              className="block px-4 py-2 hover:bg-secondary transition text-base"
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

        <div className="flex gap-5 items-center">
          
          {/* Toggle Lang */}
          <div className={`relative group ${isRTL ? 'ml-14 md:ml-0' : 'mr-14 md:mr-0'}`}>
              {/* Button */}
              <button
                className={`flex items-center gap-1 sm:gap-2 text-text font-semibold sm:border-2 border-primary sm:p-2 rounded-xl cursor-pointer ${ scrolled? 'hover:text-primary' : 'hover:text-white' }  transition-colors duration-200 `}
              >
                {i18n.language === "ar" ? "AR" : "EN"}
                <FaChevronDown className="text-xs transition group-hover:rotate-180 " />
              </button>

              {/* Dropdown */}
              <div
                className="absolute mt-2 right-0 bg-primary text-text shadow-lg rounded-lg overflow-hidden w-[100px] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200"
              >
                <button
                  onClick={() => {
                    i18n.changeLanguage("ar");
                    localStorage.setItem("lang", "ar");
                  }}
                  className="block w-full text-right px-4 py-2 hover:bg-secondary"
                >
                  عربي
                </button>

                <button
                  onClick={() => {
                    i18n.changeLanguage("en");
                    localStorage.setItem("lang", "en");
                  }}
                  className="block w-full text-right px-4 py-2 hover:bg-gray-100"
                >
                  إنجليزي
                </button>
              </div>
          </div>

          {/* Social Media Links */}
          <div className="hidden md:flex justify-center md:justify-start gap-2">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="bg-primary p-3 rounded-full text-white hover:bg-primary-dark transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
          
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`absolute md:hidden top-[15%] ${ isRTL ? 'left-2' : 'right-2' }  z-20 text-2xl transition-colors duration-200 
          ${ scrolled ? "text-primary" : "text-white"}
          `}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes className="text-primary hidden" /> : <FaBars className={`w-10 h-10 p-2 ${scrolled ? 'text-primary' : 'text-white bg-primary rounded-md '}`} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black/40 flex flex-col items-end justify-end text-xl font-semibold text-gray-700 transition-transform duration-200 ${
            isOpen ? "translate-x-0" : `${isRTL ? '-translate-x-full' : 'translate-x-full'}`
          }`}
        >
          <div className={`relative bg-white w-2/3 h-full pt-32 overflow-hidden ${isRTL ? 'rounded-r-3xl' : 'rounded-l-3xl'} `}>
            <ul className="flex flex-col items-center gap-4">
              {menuLinks.map((link, index) => (
                <li key={index} className="w-full text-center relative">
                  {!link.children ? (
                    <NavLink
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block w-full px-4 py-2 transition text-sm font-normal ${
                          isActive ? "bg-primary text-white rounded-lg" : "hover:bg-gray-100"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <MobileDropdown link={link} />
                  )}
                </li>
              ))}
            </ul>

            {/* Social Media Links */}
            <div className="flex justify-center gap-3 mt-10">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="bg-primary p-2 rounded-full text-white hover:bg-primary-dark transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>

              {/* Close  Menu Button */}
              <button
                onClick={closeMenu}
                className={`absolute top-0 ${isRTL ? 'right-0 rounded-bl-2xl' : 'left-0 rounded-br-2xl'} text-xl bg-primary  text-white p-2  transition-colors duration-200 hover:text-primary`}
                aria-label="Close Menu"
              >
                <FaTimes />
              </button>
              {/* Close  Menu Button */}

          </div>

        </div>

        
      </nav>
    </header>
  );
};

export default Navbar;
