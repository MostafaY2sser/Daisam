import { FaBullhorn, FaHome, FaUsers, FaMoneyCheckAlt, FaFileContract, FaUpload } from "react-icons/fa";

const ServicesSection = () => {
  return (
    <section
      className="relative py-12 md:py-20 text-white overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bg.webp')",
        backgroundAttachment: "fixed", 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-text/60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            خدماتنا
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-base"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            نقدم مجموعة متكاملة من الخدمات العقارية لتلبية احتياجات الأفراد والمستثمرين 
            بأعلى معايير الجودة والاحترافية.
          </p>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Service 1 */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition text-black" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <FaBullhorn />
            </div>

            <h3 className="font-bold text-lg mb-3">التسويق العقاري</h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              نُقدّم حلولًا متكاملة لعرض وتسويق العقارات عبر منصات رقمية متخصصة،
              وتصاميم احترافية، وإعلانات مستهدفة للوصول إلى العملاء المهتمين.
            </p>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><FaUsers className="text-primary mt-1" /> المطورين العقاريين</li>
              <li className="flex gap-2"><FaHome className="text-primary mt-1" /> أصحاب العقارات السكنية والتجارية</li>
              <li className="flex gap-2"><FaUsers className="text-primary mt-1" /> الباحثين عن بيع أو تأجير ممتلكاتهم</li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition text-black" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <FaMoneyCheckAlt />
            </div>

            <h3 className="font-bold text-lg mb-3">حلول التمويل العقاري</h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              نساعدك على الحصول على تمويل عقاري مناسب بالتعاون مع شركائنا المعتمدين.
            </p>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><FaFileContract className="text-primary mt-1" /> تمويل بدون تحويل راتب</li>
              <li className="flex gap-2"><FaFileContract className="text-primary mt-1" /> خيارات متوافقة مع الشريعة</li>
              <li className="flex gap-2"><FaFileContract className="text-primary mt-1" /> تسهيلات للمواطنين والمقيمين</li>
              <li className="flex gap-2"><FaFileContract className="text-primary mt-1" /> دعم كامل حتى توقيع العقد</li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition text-black" data-aos="zoom-in">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
              <FaUpload />
            </div>

            <h3 className="font-bold text-lg mb-3">اعرض عقارك</h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              سواء كنت فردًا أو مطورًا، يمكنك تسويق عقارك معنا بكل سهولة.
              فقط أرسل معلومات العقار، ونحن نتولى الباقي.
            </p>

            <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition">
              اعرض عقارك الآن
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;