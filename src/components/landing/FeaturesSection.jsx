import { FaMapMarkerAlt, FaPencilRuler, FaShieldAlt } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* ===== Title ===== */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-4" 
            data-aos="fade-up"
            data-aos-delay="100"
          >
            لماذا تختار ديسم؟
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            نعمل على تقديم مشاريع عقارية متكاملة تجمع بين الجودة، الابتكار، 
            والمواقع المميزة لتوفير أفضل تجربة سكنية واستثمارية.
          </p>
        </div>

        {/* ===== Features ===== */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition bg-primary" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-white text-primary rounded-full mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="font-bold text-lg mb-3 text-secondary">مواقع استراتيجية</h3>
            <p className="text-text text-sm leading-relaxed">
              تقدم "ديسم" فرصًا استثمارية فريدة بمواقعها الاستراتيجية المثالية، 
              حيث تناسب هذه المواقع الأفراد الباحثين عن سكن مريح وحياة متكاملة.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition bg-primary" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-white text-primary rounded-full mb-4">
              <FaPencilRuler />
            </div>
            <h3 className="font-bold text-lg mb-3 text-secondary">تصاميم عصرية</h3>
            <p className="text-text text-sm leading-relaxed">
              تستند "ديسم" إلى خبرة تمتد لأكثر من خمسة أعوام لتقديم تصاميم عصرية مبتكرة 
              تتماشى مع التوجهات الحديثة، مع تحقيق التوازن بين الجمالية والوظيفية.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition bg-primary" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-white text-primary rounded-full mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="font-bold text-lg mb-3 text-white">أمان واستدامة</h3>
            <p className="text-text text-sm leading-relaxed">
              تسعى "ديسم" لتحقيق أعلى معايير الأمان والاستدامة في مشاريعها، 
              باستخدام تقنيات حديثة لضمان بيئات آمنة ومستدامة تعزز جودة الحياة.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;