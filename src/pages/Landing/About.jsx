import { FaBullseye, FaEye, FaCheckCircle, FaStar } from "react-icons/fa";
import MainHero from '../../components/common/MainHero'
import FeaturesSection from "../../components/landing/FeaturesSection";

const AboutContent = () => {
  return (
    <div>

      {/* ===== Hero Section ===== */}
      <MainHero
        title="من نحن"
        description="نقدم حلول عقارية متكاملة للبيع والتأجير مع خدمات تمويل مرنة تناسب جميع العملاء."
        bgImage="/images/main_bg_hero.png"
      />

      {/* ===== Philosophy ===== */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2
            className="text-2xl md:text-4xl font-extrabold text-text mb-6"
            data-aos="fade-up"
          >
            فلسفتنا
          </h2>

          <p
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            فلسفة ديسم العقارية تقوم على الجمع بين الرؤية المستقبلية والالتزام بالجودة،
            حيث نؤمن أن العقار ليس مجرد استثمار بل هو أسلوب حياة. نسعى لتقديم مشاريع
            عقارية مبتكرة تجمع بين الجودة والراحة، مع التركيز على الشفافية والمصداقية
            لبناء علاقات طويلة الأمد مع عملائنا.
          </p>

        </div>
      </section>

      {/* ===== Goals ===== */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-4xl font-extrabold text-text mb-4"
              data-aos="fade-up"
            >
              أهدافنا
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "تقديم حلول عقارية متكاملة تلبي احتياجات العملاء",
              "تعزيز الشفافية والمصداقية في جميع التعاملات",
              "تمكين الأفراد من امتلاك منازلهم بسهولة",
              "دعم المطورين العقاريين وزيادة عوائدهم",
              "المساهمة في تطوير القطاع العقاري",
              "التركيز على الجودة والابتكار لتحقيق رضا العملاء",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
              >
                <FaCheckCircle className="text-primary mt-1" />
                <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ===== Vision & Mission ===== */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">

          {/* Vision */}
          <div
            className="bg-primary p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            data-aos="fade-left"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-white text-primary rounded-full mb-4">
              <FaEye />
            </div>

            <h3 className="text-xl font-bold mb-3 text-white">رؤيتنا</h3>

            <p className="text-gray-50 leading-relaxed">
              أن نكون الخيار الأول للأفراد والمستثمرين الباحثين عن حلول عقارية
              وتسويقية وتمويلية متكاملة، من خلال تقديم خدمات تعتمد على الثقة والنتائج.
            </p>
          </div>

          {/* Mission */}
          <div
            className="bg-secondary p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            data-aos="fade-right"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-primary text-white rounded-full mb-4">
              <FaBullseye />
            </div>

            <h3 className="text-xl font-bold mb-3 text-text">رسالتنا</h3>

            <p className="text-gray-600 leading-relaxed">
              نعمل على ربط العملاء بأفضل الفرص العقارية، وتوفير خيارات تمويل
              مناسبة لهم بأسلوب احترافي وشفاف يضمن تجربة مميزة.
            </p>
          </div>

        </div>
      </section>

      {/* ===== Why Choose Us ===== */}
      {/* <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-4xl font-extrabold text-text mb-4"
              data-aos="fade-up"
            >
              لماذا تختار ديسم؟
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "خبرة قوية في السوق العقاري",
              "تسويق رقمي احترافي للعقارات",
              "شراكات موثوقة مع جهات التمويل",
              "دعم واستشارات حتى توقيع العقد",
              "سهولة في إجراءات التمويل",
              "حلول متكاملة للأفراد والمستثمرين",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center"
                data-aos="zoom-in"
                data-aos-delay={100 + index * 50}
              >
                <FaStar className="text-primary mx-auto mb-3" />
                <p className="text-gray-600 text-sm">{item}</p>
              </div>
            ))}

          </div>
        </div>
      </section> */}

      <FeaturesSection />

    </div>
  );
};

export default AboutContent;