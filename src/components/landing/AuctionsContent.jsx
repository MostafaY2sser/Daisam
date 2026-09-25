import {
  FaGavel,
  FaBullhorn,
  FaPhotoVideo,
  FaUsers,
  FaClipboardCheck,
  FaHandshake,
  FaShieldAlt,
  FaChartBar,
  FaBuilding,
  FaLandmark,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AuctionsContent = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <FaGavel />,
      title: t("auctions_service1_title"),
      desc: t("auctions_service1_desc"),
    },
    {
      icon: <FaChartLine />,
      title: t("auctions_service2_title"),
      desc: t("auctions_service2_desc"),
    },
    {
      icon: <FaBullhorn />,
      title: t("auctions_service3_title"),
      desc: t("auctions_service3_desc"),
    },
    {
      icon: <FaPhotoVideo />,
      title: t("auctions_service4_title"),
      desc: t("auctions_service4_desc"),
    },
    {
      icon: <FaUsers />,
      title: t("auctions_service5_title"),
      desc: t("auctions_service5_desc"),
    },
    {
      icon: <FaHandshake />,
      title: t("auctions_service6_title"),
      desc: t("auctions_service6_desc"),
    },
    {
      icon: <FaClipboardCheck />,
      title: t("auctions_service7_title"),
      desc: t("auctions_service7_desc"),
    },
  ];

  const methodology = [
    { step: "1", title: t("auctions_step1_title"), desc: t("auctions_step1_desc") },
    { step: "2", title: t("auctions_step2_title"), desc: t("auctions_step2_desc") },
    { step: "3", title: t("auctions_step3_title"), desc: t("auctions_step3_desc") },
    { step: "4", title: t("auctions_step4_title"), desc: t("auctions_step4_desc") },
    { step: "5", title: t("auctions_step5_title"), desc: t("auctions_step5_desc") },
  ];

  const marketingChannels = [
    t("auctions_channel1"),
    t("auctions_channel2"),
    t("auctions_channel3"),
    t("auctions_channel4"),
    t("auctions_channel5"),
    t("auctions_channel6"),
    t("auctions_channel7"),
    t("auctions_channel8"),
    t("auctions_channel9"),
  ];

  const whyUs = [
    { icon: <FaLandmark />, title: t("auctions_why1_title"), desc: t("auctions_why1_desc") },
    { icon: <FaBullhorn />, title: t("auctions_why2_title"), desc: t("auctions_why2_desc") },
    { icon: <FaUsers />, title: t("auctions_why3_title"), desc: t("auctions_why3_desc") },
    { icon: <FaClipboardCheck />, title: t("auctions_why4_title"), desc: t("auctions_why4_desc") },
    { icon: <FaChartBar />, title: t("auctions_why5_title"), desc: t("auctions_why5_desc") },
    { icon: <FaShieldAlt />, title: t("auctions_why6_title"), desc: t("auctions_why6_desc") },
  ];

  const whoWeServe = [
    { title: t("auctions_serve1_title"), desc: t("auctions_serve1_desc") },
    { title: t("auctions_serve2_title"), desc: t("auctions_serve2_desc") },
    { title: t("auctions_serve3_title"), desc: t("auctions_serve3_desc") },
    { title: t("auctions_serve4_title"), desc: t("auctions_serve4_desc") },
    { title: t("auctions_serve5_title"), desc: t("auctions_serve5_desc") },
  ];

  const values = [
    t("auctions_value1"),
    t("auctions_value2"),
    t("auctions_value3"),
    t("auctions_value4"),
    t("auctions_value5"),
    t("auctions_value6"),
  ];

  return (
    <>
      {/* Intro Section */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-6" data-aos="fade-up">
            {t("auctions_who_we_are_title")}
          </h2>
          <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="150">
            {t("auctions_who_we_are_desc")}
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <div
            className="bg-white rounded-xl shadow-md p-8 text-center"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-bold text-primary mb-4">{t("auctions_vision_title")}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t("auctions_vision_desc")}
            </p>
          </div>
          <div
            className="bg-white rounded-xl shadow-md p-8 text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-xl font-bold text-primary mb-4">{t("auctions_mission_title")}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t("auctions_mission_desc")}
            </p>
          </div>
        </div>
      </section>


      {/* What We Offer */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
              {t("auctions_what_we_offer_title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
              >
                <div className="text-primary text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Methodology */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
              {t("auctions_methodology_title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {methodology.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 text-center"
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
              >
                <div className="text-primary text-3xl font-extrabold mb-3">{item.step}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Power */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
            {t("auctions_marketing_title")}
          </h2>
          <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            {t("auctions_marketing_desc")}
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {marketingChannels.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4"
              data-aos="fade-up"
              data-aos-delay={100 + index * 30}
            >
              <FaCheckCircle className="text-primary mt-1 shrink-0" />
              <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
            {t("auctions_why_us_title")}
          </h2>
          <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            {t("auctions_why_us_desc")}
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {whyUs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center"
              data-aos="fade-up"
              data-aos-delay={100 + index * 50}
            >
              <div className="text-primary text-3xl mb-4 flex justify-center">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
              {t("auctions_who_serve_title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoWeServe.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6"
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
              >
                <div className="text-primary text-2xl mb-3">
                  <FaBuilding />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Types */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-6" data-aos="fade-up">
            {t("auctions_asset_types_title")}
          </h2>
          <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="150">
            {t("auctions_asset_types_desc")}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-6" data-aos="fade-up">
            {t("auctions_values_title")}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8" data-aos="fade-up" data-aos-delay="100">
            {values.map((value, index) => (
              <span
                key={index}
                className="px-5 py-2 rounded-full bg-white shadow-sm text-primary font-semibold text-sm"
              >
                {value}
              </span>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="150">
            {t("auctions_values_desc")}
          </p>
        </div>
      </section>
    </>
  );
};

export default AuctionsContent;