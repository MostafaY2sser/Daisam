import { useState } from "react";
import { faqs } from "../../data/faqs";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);
  const { t } = useTranslation();

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      className="py-6 md:py-24 bg-secondary/80"
      id="faq"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Tagline */}
        <span className="inline-block mb-6 px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-full" data-aos="fade-up" data-aos-delay="100">
          {t("faq_tagline")}
        </span>

        {/* Title */}
        <h2 className="text-xl md:text-4xl font-extrabold text-text mb-6 md:mb-12" data-aos="fade-up" data-aos-delay="150">
          {t("faq_title")}  
        </h2>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-white/20 rounded-2xl bg-white/10 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={200 + faq.id * 50}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 flex justify-between items-center font-semibold text-text text-lg md:text-xl hover:text-primary transition-colors duration-300"
              >
                <span className="text-start text-sm sm:text-base">{t(faq.questionKey)}</span>
                <span className="text-2xl">{openId === faq.id ? "−" : "+"}</span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 px-6 ${
                  openId === faq.id ? "max-h-96 py-4" : "max-h-0"
                } text-text/80 text-base`}
              >
                {t(faq.answerKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;