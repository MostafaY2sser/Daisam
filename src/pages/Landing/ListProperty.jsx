import { useState } from "react";
import { FaHome, FaPaperPlane } from "react-icons/fa";
import MainHero from "../../components/common/MainHero";

const ListProperty = () => {
  const [propertyType, setPropertyType] = useState("");
  const [otherType, setOtherType] = useState("");

  return (
    <div>

      {/* ===== Hero ===== */}
      <MainHero
        title="اعرض عقارك"
        description="سجّل عقارك الآن ودع فريق ديسم يساعدك في تسويقه والوصول لأفضل العملاء."
        // bgImage="/images/main_bg_hero.png"
        bgImage="/images/bg_list_your_property.png"
      />

      {/* ===== Intro Section ===== */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2
            className="text-2xl md:text-4xl font-extrabold text-text mb-6"
            data-aos="fade-up"
          >
            سجّل عقارك بسهولة
          </h2>

          <p
            className="text-gray-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            سواء كنت مالك عقار أو مطور، يمكنك عرض عقارك معنا بسهولة.
            نحن نوفر لك أفضل حلول التسويق للوصول إلى العملاء المهتمين
            وتحقيق أفضل النتائج.
          </p>

        </div>
      </section>

      {/* ===== Form Section ===== */}
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">

          <div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-bold mb-6 text-text text-center">
                املأ النموذج التالي لبدء عرض عقارك
            </h3>

            <form className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  الاسم بالكامل
                </label>
                <input
                  type="text"
                  placeholder="اكتب اسمك"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  placeholder="05xxxxxxxx"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  البريد الإلكتروني (اختياري)
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  نوع العقار
                </label>

                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">اختر</option>
                  <option value="apartment">شقة</option>
                  <option value="villa">فيلا</option>
                  <option value="building">عمارة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              {/* Other Type (Conditional) */}
              {propertyType === "other" && (
                <div data-aos="fade-up">
                  <label className="block mb-2 text-sm text-gray-600">
                    نوع العقار
                  </label>
                  <input
                    type="text"
                    value={otherType}
                    onChange={(e) => setOtherType(e.target.value)}
                    placeholder="اكتب نوع العقار"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  رسالتك
                </label>
                <textarea
                  rows="4"
                  placeholder="اكتب تفاصيل العقار..."
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <FaPaperPlane />
                ارسال
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* ===== Features Section (Consistency) ===== */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2
            className="text-2xl md:text-4xl font-extrabold text-text mb-10"
            data-aos="fade-up"
          >
            لماذا تعرض عقارك معنا؟
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "وصول لعدد كبير من العملاء المهتمين",
              "تسويق احترافي عبر المنصات الرقمية",
              "دعم كامل حتى إتمام الصفقة",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
                data-aos="zoom-in"
                data-aos-delay={100 + index * 50}
              >
                <FaHome className="text-primary mx-auto mb-4" />
                <p className="text-gray-600 text-sm">{item}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
};


export default ListProperty;