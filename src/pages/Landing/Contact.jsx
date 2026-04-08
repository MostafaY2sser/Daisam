// import  MainHero from "../../components/common/MainHero"
// import ContactSection from "../../components/landing/ContactSection"


// const Contact = () => {


//   return (
//     <div className="">
//       <MainHero
//         title="تواصل معنا"
//         description="لأي استفسار أو حجز موعد يمكنك التواصل معنا مباشرة أو إرسال رسالة من خلال النموذج."
//         bgImage="/images/main_bg_hero.png"
//       />

//       {/* ===== Middle Intro Section ===== */}
//       <section className="py-16 bg-gray-100 text-center">
//         <div className="max-w-3xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
//             نحن هنا لخدمتك دائمًا
//           </h2>

//           <p className="text-text-light leading-relaxed">
//             فريقنا الطبي مستعد للإجابة على جميع استفساراتك وتقديم أفضل رعاية صحية.
//             لا تتردد في التواصل معنا أو حجز موعدك الآن.
//           </p>

//           <div className="mt-6">
//             <a
//               href="#contact"
//               className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
//             >
//               تواصل الآن
//             </a>
//           </div>
//         </div>
//       </section>

//       <ContactSection />

//     </div>
//   );
// };

// export default Contact;









import MainHero from "../../components/common/MainHero";
import ContactSection from "../../components/landing/ContactSection";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div>

      {/* ===== Hero ===== */}
      <MainHero
        title="تواصل معنا"
        description="نحن هنا لمساعدتك في العثور على أفضل الحلول العقارية سواء للبيع أو الشراء أو التمويل."
        bgImage="/images/main_bg_hero.png"
      />

      {/* ===== Intro Section ===== */}
      <section className="py-16 bg-muted text-center bg-secondary">
        <div className="max-w-3xl mx-auto px-4">

          <h2
            className="text-2xl md:text-3xl font-bold text-text mb-4"
            data-aos="fade-up"
          >
            نحن هنا لخدمتك في كل خطوة
          </h2>

          <p
            className="text-gray-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            سواء كنت تبحث عن شراء او بيع عقار، أو الحصول على تمويل مناسب،
            فريق ديسم العقارية جاهز لدعمك وتقديم أفضل الحلول باحترافية وشفافية.
          </p>

          <div className="mt-6" data-aos="fade-up" data-aos-delay="150">
            <a
              href="#contact"
              className="bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              ابدأ الآن
            </a>
          </div>

        </div>
      </section>


      {/* ===== Contact Form Section ===== */}
      <ContactSection />

    </div>
  );
};

export default Contact;