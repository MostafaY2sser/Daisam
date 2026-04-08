import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.sheety.co/c66fe777496213c5aed67f1401370644/daisamForms/contactus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contactus: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              message: formData.message,
            },
          }),
        }
      );

      const data = await response.json();

      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      alert(t('message_sent_successfully'));
    } catch (error) {
      console.error(error);
      alert(t('error_sending_message'));
    } finally {
      setLoading(false);
    }
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
      <div className="absolute inset-0 bg-text/40 "></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span
          className="inline-block mb-4 px-4 py-2 text-sm font-semibold text-white bg-primary/10 rounded-full"
        >
          {t("contact_tagline")}
        </span>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {t("contact_title_prefix")}{" "}
          <span className="text-white">
            {t("contact_title_highlight")}
          </span>{" "}
          {t("contact_title_suffix")}
        </h2>

        <p className="text-gray-50 text-sm sm:text-base max-w-2xl mx-auto mb-12">
          {t("contact_description")}
        </p>

        <div className="flex items-center flex-col md:flex-row gap-10">
          {/* Contact Info */}
          <div
            className={`space-y-6 sm:w-[35%] ${
              isRTL ? "md:pr-28" : "md:pl-28"
            }`}
          >
            <div className="flex flex-col justify-center items-center sm:items-start gap-2">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                {t("contact_location")}
              </h3>
              <p>
                <a 
                  href="https://maps.app.goo.gl/C3KL1FKRRbBJUZyN7?g_st=ic"
                  target="_blank"
                  className="md:text-lg flex text-white text-center sm:text-start sm:gap-2">
                  <FaMapMarkerAlt /> {t("الرياض - الملقا")}
                </a>
              </p>
            </div>

            <div className="flex flex-col justify-center items-center sm:items-start gap-2">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                {t("contact_phone")}
              </h3>
              <a
                href="tel:920020535"
                className="md:text-lg flex items-center text-white gap-2"
              >
                <FaPhoneAlt /> 920020535

              </a>
            </div>

            <div className="flex flex-col justify-center items-center sm:items-start gap-2">
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                {t("contact_email")}
              </h3>
              <a
                href="mailto:info@daisam.sa"
                className="md:text-lg flex items-center text-white gap-2"
              >
                <FaEnvelope /> info@daisam.sa
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/20 flex-1 backdrop-blur-xl rounded-2xl shadow-xl p-3 md:p-8 space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact_form_name")}
                className="w-full border border-primary rounded-lg p-3"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contact_form_email")}
                className="w-full border border-primary rounded-lg p-3"
                required
              />
            </div>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("contact_form_phone")}
              className="w-full border border-primary rounded-lg p-3"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("contact_form_message")}
              rows="5"
              className="w-full border border-primary rounded-lg p-3"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-xl"
            >
              {loading ? t('sending') : t("contact_form_submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;