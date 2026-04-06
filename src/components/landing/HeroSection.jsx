
import { useEffect, useTransition } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ButtonFill from "../common/ButtonFill";
import ButtonOutline from "../common/ButtonOutline";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HeroSection = () => {

  const { i18n, t } = useTranslation();

  useEffect(() => {
    AOS.init({ once: true, duration: 900, easing: "ease-out-cubic" });
  }, []);

  return (
      <section className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-gray-900 ">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            preload="none"
            className="absolute w-full h-full object-cover"
          >
            {/* <source src="/vedio.mp4" type="video/mp4" /> */}
            <source src="/new.mp4" type="video/mp4" />
          </video>
          {/* <img className="absolute w-full h-full object-cover" src="/images/hero_bg.png" alt="" /> */}

          {/* Overlay Dark Layer */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Content */}
          <div className="relative z-1 flex flex-col justify-center items-center  sm:items-center text-center sm:text-center h-full max-w-7xl mx-auto px-2 sm:px-4">

            {/* Title */}
            <h1
              data-aos="fade-up"
              className="text-gray-100 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center"
            >
              نحو مستقبل عقاري أكثر تطورًا
            </h1>

            {/* Description */}
            <p
              data-aos="fade-up"
              data-aos-delay="150"
              className="text-secondary  mt-8 text-lg md:text-xl max-w-2xl"
            >
              في ديسم، نعمل على تطوير مشاريع عقارية متكاملة تجمع بين الجودة العالية والتصميم العصري،
              مع تقديم حلول تمويلية مرنة لتلبية مختلف الاحتياجات.
            </p>

            {/* Buttons */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex flex-row gap-3 mt-6"
            >
              <a
                href="#projects"
                className="bg-primary flex items-center justify-center text-text font-normal text-sm md:text-lg py-2 px-3 md:px-6 rounded-lg transition-all duration-300"
              >
                  استكشف المشاريع   
              </a>
              <a
                href={"contact"}
                className="inline-block text-sm md:text-lg py-2 px-3 md:px-6 font-normal rounded-lg transition-all duration-300 border border-white/20 backdrop-blur-lg bg-white/40 text-text  shadow-lg"
              >
                تواصل معنا
              </a>
            </div>

          </div>
      </section>
  );
};

export default HeroSection;
