import { useState } from "react";
import MainHero from "../../components/common/MainHero";
import { FaMoneyCheckAlt, FaHome, FaTools, FaHandshake, FaPaperPlane } from "react-icons/fa";
import FeaturesSection from "../../components/landing/FeaturesSection";

const Financing = () => {
    const [productType, setProductType] = useState("الوحدات الجاهزة");

    const financingOptions = [
      {
        title: "حلول التمويل العقاري",
        desc: "نوفر برامج تمويل عقاري متكاملة تتيح لك شراء الوحدات السكنية الجاهزة بسهولة ومرونة، مع خيارات متعددة تناسب مختلف الشرائح. نعمل مع جهات تمويل معتمدة لتقديم أفضل العروض من حيث نسبة الفائدة وفترة السداد، مع دعم كامل خلال جميع مراحل التقديم وحتى استلام العقار، لضمان تجربة مريحة وآمنة.",
        img: "/images/one.jpg",
      },
      {
        title: "حلول الرهن العقاري",
        desc: "إذا كنت تمتلك عقارًا، يمكنك الاستفادة من قيمته للحصول على تمويل يساعدك في تلبية احتياجاتك المالية أو الاستثمارية. نوفر لك حلول رهن عقاري مرنة بإجراءات ميسرة وسريعة، مع استشارات متخصصة لمساعدتك في اختيار الخيار الأنسب لك وضمان تحقيق أفضل استفادة ممكنة من أصولك العقارية.",
        img: "/images/two.jpg",
      },
      {
        title: "تمويل استكمال البناء",
        desc: "نقدم حلول تمويل مخصصة للأفراد الراغبين في استكمال بناء منازلهم، حيث نساعدك في تغطية تكاليف الإنشاء على مراحل وفق خطة واضحة ومدروسة. نحرص على توفير خيارات تمويل مرنة تتيح لك الاستمرار في مشروعك دون ضغوط مالية، مع متابعة مستمرة لضمان تنفيذ البناء بالجودة المطلوبة وفي الوقت المحدد.",
        img: "/images/three.jpg",},
      {
        title: "استشارات تمويلية مجانية",
        desc: "نقدّم لك استشارات تمويلية احترافية مجانًا لمساعدتك في فهم جميع الخيارات المتاحة واتخاذ القرار الصحيح. فريقنا من الخبراء يعمل على تحليل وضعك المالي وتقديم توصيات مخصصة تناسب احتياجاتك وأهدافك، سواء كنت تبحث عن شراء عقار أو تمويل أو استثمار، لضمان أفضل النتائج بأقل المخاطر.",
        img: "/images/four.jpg",},
    ];


  return (
    <div>

      {/* ===== Hero ===== */}
      <MainHero
        title="التمويل العقاري"
        description="حلول تمويل عقاري مرنة تساعدك على امتلاك منزلك أو الاستثمار بثقة."
        bgImage="/images/main_bg_hero.png"
      />

      {/* ===== Intro Section ===== */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-6" data-aos="fade-up">
            شركة ديسم
          </h2>

          <h3 className="text-lg md:text-xl font-semibold text-primary mb-4" data-aos="fade-up" data-aos-delay="100">
            شريكك الموثوق لتحقيق حلم التملك
          </h3>

          <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="150">
            في ديسم العقارية، نمنحك المفاتيح الأولي لحلمك السكني، من خلال حلول تمويل عقاري مصممة لتناسب احتياجاتك وتلائم تطلعاتك.
            سواء كنت تبحث عن منزل العمر، أو فرصة استثمارية، فإننا نرافقك بخطى واثقة وخبرة راسخة.
            نحن لا نقدم تمويل فقط، بل نمنحك الطمأنينة والدعم الكامل في كل خطوة من رحلتك.
          </p>

        </div>
      </section>

      {/* ===== Financing Solutions ===== */}
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

                    {/* Image */}
                    <div className="">
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 ">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>

                </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection/>  

      {/* ===== Form Section ===== */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-4">

          <div className="bg-white p-8 rounded-2xl shadow-md" data-aos="fade-up">

            <h3 className="text-xl font-bold mb-4 text-text text-center">
              قدم طلبك الآن
            </h3>

            <p className="text-gray-600 text-center mb-6 text-sm">
              قدّم طلب إستشارة أو إستفسار مجاناً وسيتم التواصل معك في أقرب وقت.
            </p>

            <form className="space-y-5">

              {/* Name */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  الاسم رباعي
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="اكتب اسمك الكامل"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="05xxxxxxxx"
                />
              </div>

              {/* Work */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  جهة العمل
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="اسم جهة العمل"
                />
              </div>

              {/* Select */}
              <div>
                <label className="block mb-2 text-sm text-gray-600">
                  نوع المنتج المهتم به
                </label>

                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
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
                <label className="block mb-2 text-sm text-gray-600">
                  فضلاً اذكر طلبك
                </label>
                <textarea
                  rows="4"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="اكتب تفاصيل طلبك..."
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

    </div>
  );
};

export default Financing;