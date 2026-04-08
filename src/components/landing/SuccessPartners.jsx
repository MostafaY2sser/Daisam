import React, { useRef } from "react";
import { FaArrowRight ,FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";



const logos = [
  { src: "/images/alrajhi.png", name: "alrajhi" },
  { src: "/images/aqar.png", name: "aqar" },
  { src: "/images/general.png", name:"general" },
  { src: "/images/snb.png", name:"snb" },
  { src: "/images/wafy.png", name:"wafy" },
  { src: "/images/albilad.png", name:"albilad" },
  { src: "/images/riyad-bank.png", name: "riyad-bank" },
];

const SuccessPartners = () => {
  const { t } = useTranslation();
  const sliderRef = useRef();

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="py-6 md:py-10 bg-muted">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("success_partners")}
        </h2>

        {/* Description */}
        <p className="text-gray-600  max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {t("success_partners_desc")}
        </p>

        {/* Slider Container */}
        <div className="relative">
          
          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-full z-10 hover:bg-primary-dark transition"
          >
            <FaArrowRight />
          </button>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-full z-10 hover:bg-primary-dark transition"
          >
            <FaArrowLeft />
          </button>

          {/* Logos */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scroll-smooth gap-6 py-4 px-6 scrollbar-hide"
          >
            {logos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.name}
                  data-aos="zoom-in"
                  data-aos-delay={200 + index * 50}
                  className="w-36 sm:w-60 object-contain"
                  loading="lazy"
                /> 
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SuccessPartners;