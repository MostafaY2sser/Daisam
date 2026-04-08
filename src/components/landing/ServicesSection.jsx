import { FaBullhorn, FaHome, FaUsers, FaMoneyCheckAlt, FaFileContract, FaUpload } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ServicesSection = () => {
  const { t } = useTranslation();
  return (
    <section
      className="relative py-12 md:py-20 text-white overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bg.webp')",
        backgroundAttachment: "fixed", 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-text/60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("our_services")}
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-base"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {t("our_services_desc")}
          </p>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Service 1 */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition text-black" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <FaBullhorn />
            </div>

            <h3 className="font-bold text-lg mb-3">{t("real_estate_marketing")}</h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {t("real_estate_marketing_desc")}
            </p>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><FaUsers className="text-primary mt-1" /> {t("service_marketing_1")}</li>
              <li className="flex gap-2"><FaHome className="text-primary mt-1" /> {t("service_marketing_2")}</li>
              <li className="flex gap-2"><FaUsers className="text-primary mt-1" /> {t("service_marketing_3")}</li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition text-black" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <FaMoneyCheckAlt />
            </div>

            <h3 className="font-bold text-lg mb-3">{t("real_estate_finance")}</h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {t("real_estate_finance_desc")}
            </p>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><FaFileContract className="text-primary mt-1" /> {t("service_finance_1")}</li>
              <li className="flex gap-2"><FaFileContract className="text-primary mt-1" /> {t("service_finance_2")}</li>
              <li className="flex gap-2"><FaFileContract className="text-primary mt-1" /> {t("service_finance_3")}</li>
              <li className="flex gap-2"><FaFileContract className="text-primary mt-1" /> {t("service_finance_4")}</li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition text-black" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <FaUpload />
            </div>

            <h3 className="font-bold text-lg mb-3">{t("list_your_property")}</h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {t("list_your_property_desc")}
            </p>

            <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition">
              {t("list_your_property_btn")}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;