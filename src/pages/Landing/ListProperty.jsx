
import { useState } from "react";
import { FaHome, FaPaperPlane } from "react-icons/fa";
import MainHero from "../../components/common/MainHero";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';


const ListProperty = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    otherType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        propertyType: formData.propertyType,
        otherType: formData.otherType,
        message: formData.message,
      };

      await emailjs.send(
        "service_99brxqw",       
        "template_mgktiud",      
        templateParams,
        "wTi9JTgbg-M2py7Oj"     
      );

      alert("تم إرسال الرسالة بنجاح!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        propertyType: "",
        otherType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء إرسال الرسالة");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {/* Hero Section */}
      <MainHero
        title={t("list_your_property")}
        description={t("list_property_hero_desc")}
        bgImage="/images/bg_list_your_property.png"
      />

      {/* Form Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-bold mb-6 text-text text-center">
              {t("fill_form_to_list")}
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("full_name_label_basic")}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("write_your_name")}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("phone_number")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("phone_placeholder")}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("email_optional")}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("property_type")}</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">{t("choose")}</option>
                  <option value="شقة">{t("apartment")}</option>
                  <option value="فيلا">{t("villa")}</option>
                  <option value="عمارة">{t("building")}</option>
                  <option value="other">{t("other")}</option>
                </select>
              </div>

              {formData.propertyType === "other" && (
                <div>
                  <label className="block mb-2 text-sm text-gray-600">{t("write_property_type")}</label>
                  <input
                    type="text"
                    name="otherType"
                    value={formData.otherType}
                    onChange={handleChange}
                    placeholder={t("write_property_type")}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm text-gray-600">{t("your_message")}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder={t("write_property_details")}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <FaPaperPlane />
                {loading ? t("sending...") : t("send")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListProperty;