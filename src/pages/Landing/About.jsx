import { FaBullseye, FaEye, FaCheckCircle, FaStar } from "react-icons/fa";
import MainHero from '../../components/common/MainHero'
import FeaturesSection from "../../components/landing/FeaturesSection";
import { useTranslation } from "react-i18next";

const AboutContent = () => {
  const { t } = useTranslation();
  return (
    <div>

      {/* ===== Hero Section ===== */}
      <MainHero
        title={t("about_us")}
        description={t("about_hero_desc")}
        bgImage="/images/main_bg_hero.png"
      />

      {/* ===== Vision ===== */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2
            className="text-2xl md:text-4xl font-extrabold text-text mb-6"
            data-aos="fade-up"
          >
            {t("our_vision")}
          </h2>

          <p
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("our_vision_desc")}
          </p>

        </div>
      </section>

      {/* ===== Goals ===== */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-4xl font-extrabold text-text mb-4"
              data-aos="fade-up"
            >
              {t("our_goals")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              t("goal_1"),
              t("goal_2"),
              t("goal_3"),
              t("goal_4"),
              t("goal_5"),
              t("goal_6"),
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
              >
                <FaCheckCircle className="text-primary mt-1" />
                <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ===== Vision & Mission ===== */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">

          {/* هدفنا  */}
          <div
            className="bg-primary p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            data-aos="fade-left"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-white text-primary rounded-full mb-4">
              <FaEye />
            </div>

            <h3 className="text-xl font-bold mb-3 text-white">{t("our_objective")}</h3>

            <p className="text-gray-50 leading-relaxed">
              {t("our_objective_desc")}
            </p>
          </div>

          {/* Mission */}
          <div
            className="bg-secondary p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            data-aos="fade-right"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-primary text-white rounded-full mb-4">
              <FaBullseye />
            </div>

            <h3 className="text-xl font-bold mb-3 text-text">{t("our_mission")}</h3>

            <p className="text-gray-600 leading-relaxed">
              {t("our_mission_desc")}
            </p>
          </div>

        </div>
      </section>

      {/* ===== Why Choose Us ===== */}
      <FeaturesSection />

    </div>
  );
};

export default AboutContent;