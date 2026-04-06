

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope , FaInstagram, FaSnapchat, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdArrowDropleft } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const socialLinks = [
    { href: "https://x.com/daisamrealestat", icon: <FaXTwitter   /> },
    { href: "https://www.tiktok.com/@daisamrealestate", icon: <FaTiktok /> },
    { href: "https://www.instagram.com/daisamrealestate/", icon: <FaInstagram /> },
    { href: "https://www.snapchat.com/@daisamrealestat?share_id=yaKvZQlbmX0&locale=en-US", icon: <FaSnapchat /> },
  ];


  return (
    <footer className="bg-secondary backdrop-blur-xl text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-center md:text-right">

        {/* Logo & Description */}
        <div className="md:col-span-6">
          <img 
            src="/images/logo_2.png" 
            alt="logo" 
            className={`w-2/3 mx-auto ${isRTL ? 'mr-10 sm:mr-0' : 'ml-10 sm:ml-0'} sm:w-1/3`}
          />
          <p className={`text-text mb-4 text-center py-6 ${isRTL ? 'sm:text-right pl-0 md:pl-20' : 'sm:text-left pr-0 md:pr-20'}`}>
            {t("footer_description")}
          </p>

          {/* Social Media */}
          <div className="flex justify-center md:justify-start gap-4">
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

        {/* Quick Links */}
        <div className={`md:col-span-3 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h3 className="text-xl font-semibold text-primary mb-2 text-center sm:text-start">{t("quick_links")}</h3>
          <ul className="text-text space-y-2 text-center sm:text-start ">
            <li className="flex items-center gap-1 justify-center sm:justify-start "><IoMdArrowDropleft className="text-primary w-8 h-8" /> <a href="/about" className="hover:text-primary transition">{t("نبذة عنا")}</a></li>
            <li className="flex items-center gap-1 justify-center sm:justify-start "><IoMdArrowDropleft className="text-primary w-8 h-8" /> <a href="#projects" className="hover:text-primary transition">{t("مشاريعنا")}</a></li>
            <li className="flex items-center gap-1 justify-center sm:justify-start "><IoMdArrowDropleft className="text-primary w-8 h-8" /> <a href="/financing" className="hover:text-primary transition">{t("حلول تميلية")}</a></li>
            <li className="flex items-center gap-1 justify-center sm:justify-start "><IoMdArrowDropleft className="text-primary w-8 h-8" /> <a href="/list-your-property" className="hover:text-primary transition">{t("عرض عقارك")}</a></li>
            {/* <li className="flex items-center gap-1 justify-center sm:justify-start "><IoMdArrowDropleft className="text-primary w-8 h-8" /> <a href="/contact" className="hover:text-primary transition">{t("contact_us")}</a></li> */}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-3 space-y-4">
          <h3 className={`text-xl font-semibold text-primary mb-2 text-center ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}>
            {t("contact_us")}
          </h3>
          <p>
            <a href={"#"} target="_blank" className="flex justify-center md:justify-start gap-2 text-text">
              <FaMapMarkerAlt className="text-primary w-4 h-6" /> <span className="text-start">{t("الرياض - الملقا")}</span>
            </a>
          </p>
          <a href="tel:920020535"  className="flex items-center justify-center md:justify-start gap-2 text-text">
            <FaPhoneAlt className="text-primary w-4 h-6" />  920020535
          </a>
          <a  
            href="mailto:info@daisam.sa"  
            className="flex items-center justify-center md:justify-start gap-2 text-text"
          >
            <FaEnvelope className="text-primary w-4 h-6" /> info@daisam.sa
          </a>
        </div>

        

      </div>

      <div className="mt-12 border-t border-primary pt-6 text-center text-text text-sm sm:text-base">
        © {new Date().getFullYear()} {t("footer_rights")}
      </div>
    </footer>
  );
};

export default Footer;
