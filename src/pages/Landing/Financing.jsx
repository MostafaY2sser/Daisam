
import { useState } from "react";
import MainHero from "../../components/common/MainHero";
import { FaMoneyCheckAlt, FaHome, FaTools, FaHandshake, FaPaperPlane } from "react-icons/fa";
import FeaturesSection from "../../components/landing/FeaturesSection";
import { useTranslation } from "react-i18next";

const Financing = () => {
  const  { t} = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    employer: "",
    propertyType: "الوحدات الجاهزة",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const financingOptions = [
    {
      title: "حلول التمويل العقاري",
      desc: "نوفر برامج تمويل عقاري متكاملة تتيح لك شراء الوحدات السكنية الجاهزة بسهولة ومرونة بالتعاون مع شركائنا من الجهات التمويلية ",
      img: "/images/one.jpg",
    },
    {
      title: "حلول الرهن العقاري",
      desc: "إذا كنت تمتلك عقارًا، يمكنك الاستفادة من قيمته للحصول على تمويل يساعدك...",
      img: "/images/two.jpg",
    },
    {
      title: "تمويل البناء الذاتي ",
      desc: "نقدم حلول تمويل للافراد عن طريق شركائنا من الجهات التمويلية للعملاء الراغبين بالمنتج",
      img: "/images/three.jpg",
    },
    {
      title: "استشارات تمويلية مجانية",
      desc: "نقدّم لك استشارات تمويلية احترافية مجانًا لمساعدتك في فهم جميع الخيارات...",
      img: "/images/four.jpg",
    },
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.sheety.co/c66fe777496213c5aed67f1401370644/daisamForms/financing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            financing: {
              name: formData.name,
              phone: formData.phone,
              employer: formData.employer,
              propertyType: formData.propertyType,
              message: formData.message,
            },
          }),
        }
      );

      const data = await response.json();
      console.log("DATA:", data);

      alert(t('message_sent_successfully'));

      // Reset form
      setFormData({
        name: "",
        phone: "",
        employer: "",
        propertyType: "الوحدات الجاهزة",
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
        title="التمويل العقاري"
        description="حلول تمويل عقاري مرنة تساعدك على امتلاك منزلك أو الاستثمار بثقة."
        bgImage="/images/main_bg_hero.png"
      />

      {/* Intro Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-6" data-aos="fade-up">
            شركة ديسم
          </h2>
          <h3 className="text-lg md:text-xl font-semibold text-primary mb-4" data-aos="fade-up" data-aos-delay="100">
            شريكك الموثوق لتحقيق حلم التملك
          </h3>
          <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="150">
            في ديسم العقارية، نمنحك المفاتيح الأولي لحلمك السكني، من خلال حلول تمويل عقاري مصممة لتناسب احتياجاتك.
            سواء كنت تبحث عن منزل العمر، أو فرصة استثمارية، فإننا نرافقك بخطى واثقه  وخبرة راسخة.
           و نمنحك الطمأنينة و الدعم في كل خطوة من رحلتك لإتخاذ القرار المناسب 
          </p>
        </div>
      </section>

      {/* Financing Solutions */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
              حلول تمويلية متنوعة لجميع احتياجاتك العقارية
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
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
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
            <h3 className="text-xl font-bold mb-4 text-text text-center">قدم طلبك الآن</h3>
            <p className="text-gray-600 text-center mb-6 text-sm">
              قدّم طلب إستشارة أو إستفسار مجاناً وسيتم التواصل معك في أقرب وقت.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">الاسم رباعي</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="اكتب اسمك الكامل"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">رقم الجوال</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="05xxxxxxxx"
                  required
                />
              </div>

              {/* Employer */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">جهة العمل</label>
                <input
                  type="text"
                  name="employer"
                  value={formData.employer}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="اسم جهة العمل"
                  required
                />
              </div>

              {/* Product Type */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">نوع المنتج المهتم به</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                >
                  <option>الوحدات الجاهزة</option>
                  <option>البناء الذاتي</option>
                  <option>الرهن العقاري</option>
                  <option>الرهن التجاري للعقارات المؤجرة</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">فضلاً اذكر طلبك</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="اكتب تفاصيل طلبك..."
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