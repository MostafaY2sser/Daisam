import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {

    const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <>
        {/* Scroll to Top */}
        {showScroll && (
            <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={`fixed bottom-2 md:bottom-8 
                    ${isRTL ? "left-2 md:left-8" : "right-2 md:right-8"}
                bg-primary hover:bg-primary-dark p-3 rounded-full shadow-lg text-white transition-transform hover:scale-110 z-50`}
            >
                <FaArrowUp className="w-5 h-5 md:w-6 md:h-6" />
            </button>
        )}
    </>
  )
}

export default ScrollToTop