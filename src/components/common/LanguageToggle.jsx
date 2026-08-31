import { useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const LanguageToggle = ({ scrolled, isRTL, isOpen, setIsOpen }) => {
    const { i18n } = useTranslation();
    const langRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
            isOpen &&
            langRef.current &&
            !langRef.current.contains(event.target)
            ) {
            setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsOpen]);


  return (
    <div
      ref={langRef}
      className={`relative ${
        isRTL ? "ml-14 md:ml-0" : "mr-14 md:mr-0"
      }`}
    >
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-200 ${
          scrolled
            ? "border-primary text-primary hover:bg-primary hover:text-white"
            : "border-white/60 text-white hover:border-white hover:bg-white/10"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>

        <span className="text-xs font-bold tracking-widest uppercase">
          {i18n.language === "ar" ? "AR" : "EN"}
        </span>

        <FaChevronDown
          className={`text-[10px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full mt-2 right-0 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden w-[130px] z-50 transition-all duration-200 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Arabic */}
        <button
          onClick={() => {
            i18n.changeLanguage("ar");
            localStorage.setItem("lang", "ar");
            setIsOpen(false);
          }}
          className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition hover:bg-primary/5 ${
            i18n.language === "ar"
              ? "text-primary font-semibold bg-primary/5"
              : "text-gray-600"
          }`}
        >
          <span>عربي</span>
          <span className="text-xs text-gray-400 font-normal">AR</span>
        </button>

        <div className="h-px bg-gray-100" />

        {/* English */}
        <button
          onClick={() => {
            i18n.changeLanguage("en");
            localStorage.setItem("lang", "en");
            setIsOpen(false);
          }}
          className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition hover:bg-primary/5 ${
            i18n.language === "en"
              ? "text-primary font-semibold bg-primary/5"
              : "text-gray-600"
          }`}
        >
          <span>English</span>
          <span className="text-xs text-gray-400 font-normal">EN</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;