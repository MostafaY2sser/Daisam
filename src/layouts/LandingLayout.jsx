// import { Outlet } from "react-router-dom";
// import Navbar from "../components/common/Navbar";
// import Footer from "../components/common/Footer";
// import { FaWhatsapp } from "react-icons/fa";
// import { useTranslation } from "react-i18next";

// export default function LandingLayout() {

//   const { i18n } = useTranslation();
//   const isRTL = i18n.language === "ar";

  

//   return (
//     <div className="relative">
//       <Navbar />
//       <main className="min-h-screen ">
//         <Outlet />
//       </main>

//       {/* Whatsapp */}

//       <Footer />
//       <a
//         href="https://wa.me/920020535"
//         aria-label="Whatsapp"
//         target="_blank"
//         rel="noopener noreferrer"
//         className={`fixed 
//               bottom-2 md:bottom-6  
//               ${isRTL ? 'right-2 md:right-8' : 'left-2 md:left-8' }
//               text-5xl bg-green-600 hover:scale-110 transition p-2 md:p-3 rounded-full shadow-md`
//             }
//       >
//         <FaWhatsapp className="w-6 sm:w-8 h-6 md:h-8  text-white" />
//       </a>
//     </div>
//   );
// }




import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function LandingLayout() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [showScroll, setShowScroll] = useState(false);

  // تابع لتحديد متى يظهر زر العودة للأعلى
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
    <div className="relative">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Whatsapp */}
      <a
        href="https://wa.me/920020535"
        aria-label="Whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed 
              bottom-2 md:bottom-6  
              ${isRTL ? 'right-2 md:right-8' : 'left-2 md:left-8' }
              text-5xl bg-green-600 hover:scale-110 transition p-2 md:p-3 rounded-full shadow-md z-50`
        }
      >
        <FaWhatsapp className="w-6 sm:w-8 h-6 md:h-8 text-white" />
      </a>

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

      <Footer />
    </div>
  );
}