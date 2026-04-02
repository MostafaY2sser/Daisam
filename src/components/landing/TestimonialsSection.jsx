

import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { testimonials } from "../../data/testimonials";

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = testimonials.length - visibleCards;

  const handlePrev = () => setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));

  return (
    <section className="py-10 md:py-20" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span
          className="inline-block mb-4 px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-full"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("testimonials_tagline")}
        </span>

        <h2
          className="text-xl md:text-3xl font-extrabold text-text mb-8 lg:mb-14"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {t("testimonials_title")}
        </h2>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${(current * 100) / visibleCards}%)` }}
          >
            {testimonials.map((item) => (
              <div key={item.id} className="px-4 flex-shrink-0 py-2" style={{ width: `${100 / visibleCards}%` }}>
                <div className="h-full backdrop-blur-xl border border-white/30 rounded-xl shadow-md p-6" data-aos="zoom-in" data-aos-delay={200 + item.id * 100}>
                  <div className="flex flex-col items-center mb-6">
                    <h4 className="font-semibold text-primary">{t(item.nameKey)}</h4>
                    {/* <span className="text-sm text-text-light">{t(item.roleKey)}</span> */}
                  </div>
                  <p className="text-text-light leading-relaxed">"{t(item.commentKey)}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-primary hover:bg-secondary text-white hover:text-primary p-3 rounded-full shadow-md"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-primary hover:bg-secondary text-white  hover:text-primary p-3 rounded-full shadow-md"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
