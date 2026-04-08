import React from "react";
import ButtonFill from "../common/ButtonFill";
import { FaBuilding, FaMapMarkerAlt, FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";


  return (
    <section className="py-8 md:py-16 bg-muted">
      <div className="max-w-5xl mx-auto px-4 text-center">

        {/* Badge */}
        <span className="inline-block mb-4 px-4 py-2 text-sm font-semibold text-text bg-primary/10 rounded-full">
          {t("about_us")}
        </span>

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-6 leading-tight" >
          {t("about_home_title")}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          {t("about_home_subtitle")}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 text-start">
          {/* Feature 1 */}
          <div data-aos="zoom-in" className="bg-secondary rounded-xl shadow-md p-5 hover:shadow-lg transition text-center flex flex-col items-center justify-center">
            <div className="text-primary text-2xl mb-3">
              <FaBuilding />
            </div>
            <p className="text-sm text-gray-700">
              {t("feature1_desc")}
            </p>
          </div>

          {/* Feature 2 */}
          <div data-aos="zoom-in" className="bg-secondary rounded-xl shadow-md p-5 hover:shadow-lg transition text-center flex flex-col items-center justify-center">
            <div className="text-primary text-2xl mb-3">
              <FaMapMarkerAlt />
            </div>
            <p className="text-sm text-gray-700">
              {t("feature2_desc")}
            </p>
          </div>

          {/* Feature 3 */}
          <div data-aos="zoom-in" className="bg-secondary rounded-xl shadow-md p-5 hover:shadow-lg transition text-center flex flex-col items-center justify-center">
            <div className="text-primary text-2xl mb-3">
              <FaWallet />
            </div>
            <p className="text-sm text-gray-700">
              {t("feature3_desc")}
            </p>
          </div>

        </div>

        {/* Button */}
        <Link
          to={"/about"}
          className="w-72 mx-auto text-white bg-primary  flex items-center justify-center font-normal text-sm md:text-lg py-2 px-3 md:px-6 rounded-lg">
          {t("know_more_btn")}
        </Link>

      </div>
    </section>
  );
};

export default AboutUs;