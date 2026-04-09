
import { useState } from "react";
import MainHero from "../../components/common/MainHero";
import { FaMoneyCheckAlt, FaHome, FaTools, FaHandshake, FaPaperPlane } from "react-icons/fa";
import FeaturesSection from "../../components/landing/FeaturesSection";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';




const Financing = () => {
  const  { t} = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    employer: "",
    propertyType: t("property_ready_units"),
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const financingOptions = [
    {
      title: t("financing_opt1_title"),
      desc: t("financing_opt1_desc"),
      img: "/images/two.png",
    },
    {
      title: t("financing_opt2_title"),
      desc: t("financing_opt2_desc"),
      img: "/images/one.png",
    },
    {
      title: t("financing_opt3_title"),
      desc: t("financing_opt3_desc"),
      img: "/images/four.png",
    },
    {
      title: t("financing_opt4_title"),
      desc: t("financing_opt4_desc"),
      img: "/images/three.png",
    },
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const response = await fetch(
  //       "https://api.sheety.co/c66fe777496213c5aed67f1401370644/daisamForms/financing",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           financing: {
  //             name: formData.name,
  //             phone: formData.phone,
  //             employer: formData.employer,
  //             propertyType: formData.propertyType,
  //             message: formData.message,
  //           },
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log("DATA:", data);

  //     alert(t('message_sent_successfully'));

  //     // Reset form
  //     setFormData({
  //       name: "",
  //       phone: "",
  //       employer: "",
  //       propertyType: t("property_ready_units"),
  //       message: "",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     alert(t('error_sending_message'));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        name: formData.name,
        phone: formData.phone,
        employer: formData.employer,
        propertyType: formData.propertyType,
        message: formData.message,
        email: formData.email || '',
      };

      await emailjs.send(
        "service_99brxqw",    
        "template_pxwpt4h",   
        templateParams,
        "wTi9JTgbg-M2py7Oj"    
      );

      alert(t('message_sent_successfully'));

      setFormData({
        name: "",
        phone: "",
        employer: "",
        propertyType: t("property_ready_units"),
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert(t('error_sending_message'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <MainHero
        title={t("financing_hero_title")}
        description={t("financing_hero_desc")}
        bgImage="/images/main_bg_hero.png"
      />

      {/* Intro Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-6" data-aos="fade-up">
            {t("daisam_company")}
          </h2>
          <h3 className="text-lg md:text-xl font-semibold text-primary mb-4" data-aos="fade-up" data-aos-delay="100">
            {t("your_trusted_partner")}
          </h3>
          <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="150">
            {t("financing_intro_desc")}
          </p>
        </div>
      </section>

      {/* Financing Solutions */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
              {t("financing_options_title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {financingOptions.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* Form Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white p-8 rounded-2xl shadow-md" data-aos="fade-up">
            <h3 className="text-xl font-bold mb-4 text-text text-center">{t("submit_your_request")}</h3>
            <p className="text-gray-600 text-center mb-6 text-sm">
              {t("submit_request_desc")}
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("full_name_label")}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder={t("full_name_placeholder")}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("phone_label")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder={t("phone_placeholder")}
                  required
                />
              </div>

              {/* Employer */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("employer_label")}</label>
                <input
                  type="text"
                  name="employer"
                  value={formData.employer}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder={t("employer_placeholder")}
                  required
                />
              </div>

              {/* Product Type */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("product_type_label")}</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value={t("property_ready_units")}>{t("property_ready_units")}</option>
                  <option value={t("property_self_build")}>{t("property_self_build")}</option>
                  <option value={t("property_mortgage")}>{t("property_mortgage")}</option>
                  <option value={t("property_commercial_mortgage")}>{t("property_commercial_mortgage")}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("message_label")}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder={t("message_placeholder")}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <FaPaperPlane />
                {loading ? t('sending...') : t('contact_form_submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Financing;