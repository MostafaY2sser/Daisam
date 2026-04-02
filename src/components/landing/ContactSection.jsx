
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactSection = () => {

  const { t , i18n } = useTranslation();
  const isRTL = i18n.language === "ar";


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = "https://api.sheety.co/a7a71a57c2972ffac923691f94c95be5/opalMessagessss/sheet1";

    const now = new Date();
    const formattedDate =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      " " +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0");


    const body = {
      sheet1: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        date: formattedDate,
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);

      alert(t('message_sent_successfully'));

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert(t('error_sending_message'));
    }

    setLoading(false);
  };


  return (
    <section
      className="py-6 md:py-8 pb-4 md:pb-8 relative w-full "
      id="contact"
      style={{
        backgroundImage: `url(/images/bg_contact.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-text/40 "></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Tagline */}
        <span className="inline-block mb-4 px-4 py-2 text-sm font-semibold text-white bg-primary/10 rounded-full"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {t("contact_tagline")}
        </span>

        {/* Title */}
        <h2
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-2xl md:text-3xl font-bold text-white mb-4"
        >
          {t("contact_title_prefix")}{" "}
          <span className="text-white">{t("contact_title_highlight")}</span>{" "}
          {t("contact_title_suffix")}
        </h2>

        {/* Description */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-gray-50 text-sm sm:text-base max-w-2xl mx-auto mb-12"
        >
          {t("contact_description")}
        </p>

        <div className="flex items-center flex-col md:flex-row gap-10">
          {/* Contact Info */}
          <div className={`space-y-6 sm:w-[35%]   ${isRTL? 'md:pr-28' : 'md:pl-28'}`} data-aos="zoom-in">
            <div className="flex flex-col justify-center items-center sm:items-start gap-2">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">{t("contact_location")}</h3>
              <p>
                <a
                  href="#"
                  className="md:text-lg flex text-white text-center sm:text-start sm:gap-2"
                >
                  <FaMapMarkerAlt className="text-white" /> {t("الرياض - الملقا")}
                </a>
              </p>
            </div>

            <div className="flex flex-col justify-center items-center sm:items-start gap-2" data-aos-delay="100">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">{t("contact_phone")}</h3>
              <a href="tel:966920020535" className="md:text-lg flex items-center text-white gap-2">
                <FaPhoneAlt className="text-white" /> 966920020535
              </a>
            </div>

            <div className="flex flex-col justify-center items-center sm:items-start gap-2" data-aos-delay="200">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">{t("contact_email")}</h3>
              <a 
                href="mailto:info@daisam.sa" 
                className="md:text-lg flex items-center text-white gap-2"
              >
                <FaEnvelope className="text-white" /> info@daisam.sa
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/20 flex-1 backdrop-blur-xl rounded-2xl shadow-xl p-3 md:p-8 space-y-4"
            data-aos="zoom-in"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact_form_name")}
                className="w-full border border-primary rounded-lg p-3 "
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contact_form_email")}
                className="w-full border border-primary rounded-lg p-3 "
                required
              />
            </div>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("contact_form_phone")}
              className="w-full border border-primary rounded-lg p-3 "
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("contact_form_message")}
              rows="5"
              className="w-full border border-primary rounded-lg p-3 "
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              {loading ? t("sending") : t("contact_form_submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;



















