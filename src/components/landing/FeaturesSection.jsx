import { FaMapMarkerAlt, FaPencilRuler, FaShieldAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* ===== Title ===== */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-4" 
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("why_choose_daisam")}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {t("why_choose_daisam_desc")}
          </p>
        </div>

        {/* ===== Features ===== */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition bg-primary" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-white text-primary rounded-full mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="font-bold text-lg mb-3 text-secondary">{t("feature_locations_title")}</h3>
            <p className="text-text text-sm leading-relaxed">
              {t("feature_locations_desc")}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition bg-primary" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-white text-primary rounded-full mb-4">
              <FaPencilRuler />
            </div>
            <h3 className="font-bold text-lg mb-3 text-secondary">{t("feature_designs_title")}</h3>
            <p className="text-text text-sm leading-relaxed">
              {t("feature_designs_desc")}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition bg-primary" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-white text-primary rounded-full mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="font-bold text-lg mb-3 text-white">{t("feature_sustainability_title")}</h3>
            <p className="text-text text-sm leading-relaxed">
              {t("feature_sustainability_desc")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;