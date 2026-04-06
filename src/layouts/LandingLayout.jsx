
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useTranslatin } from "react-i18next";
import WhatsappIcon from "../components/common/whatsappIcon";
import ScrollToTop from "../components/common/ScrollToTop";


export default function LandingLayout() {

    const { pathname } = useLocation();
    
    useEffect(() => {
      window.scrollTo(0, 0); 
    }, [pathname]);

  
  return (
    <div className="relative">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>

      <WhatsappIcon />


      <ScrollToTop/>

      <Footer />
    </div>
  );
}