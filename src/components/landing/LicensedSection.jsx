import { useTranslation } from "react-i18next";

const LicensedSection = () => {
  const { t } = useTranslation();
  const logos = [
    { src: "/images/shaon.png", name: t("وزراة الشؤون البلدية و القروية والاسكان") },
    { src: "/images/moshaat.png", name: t("moshaat") },
    { src: "/images/etmam.png", name: t("etmam") },
    { src: "/images/Untitled.png", name: t("Untitled") },
    { src: "/images/images-2.png", name: t("real_estate_general_authority") },
    { src: "/images/balady.png", name: t("خدمات بلدي") },
    { src: "/images/images.png", name: "Fal" },
    { src: "/images/images-1.png", name: t("saudi_business_center") },
  ];

  return (
    <section className="py-8 md:py-16 bg-muted mb-10">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("licensed_by")}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {t("licensed_by_desc")}
        </p>

        {/* Logos */}
       <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.name}
              data-aos="zoom-in"
              data-aos-delay={200 + index * 50}
              className="h-20 object-contain mx-auto"
              loading="lazy"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LicensedSection;