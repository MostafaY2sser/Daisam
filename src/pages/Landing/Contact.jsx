
import MainHero from "../../components/common/MainHero";
import ContactSection from "../../components/landing/ContactSection";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div>

      {/* ===== Hero ===== */}
      <MainHero
        title={t("contact_us")}
        description={t("contact_hero_desc")}
        bgImage="/images/main_bg_hero.png"
      />

      {/* ===== Intro Section ===== */}
      <section className="py-16 bg-muted text-center bg-secondary">
        <div className="max-w-3xl mx-auto px-4">

          <h2
            className="text-2xl md:text-3xl font-bold text-text mb-4"
            data-aos="fade-up"
          >
            {t("we_are_here")}
          </h2>

          <p
            className="text-gray-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("we_are_here_desc")}
          </p>

          <div className="mt-6" data-aos="fade-up" data-aos-delay="150">
            <a
              href="#contact"
              className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              {t("start_now")}
            </a>
          </div>

        </div>
      </section>


      {/* ===== Contact Form Section ===== */}
      <ContactSection />

    </div>
  );
};

export default Contact;