import { useEffect, useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";

const AuctionsNotf = () => {
  const [show, setShow] = useState(false);

    useEffect(() => {
      const section = document.getElementById("auctions");

      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setShow(!entry.isIntersecting);
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(section);

      return () => observer.disconnect();
    }, []);

    if (!show) return null;

  return (
    <button
      onClick={() => {
        document.getElementById("auctions")?.scrollIntoView({
          behavior: "smooth",
        });
      }}
      className="
        fixed bottom-2  md:bottom-8 left-[17%] md:left-20
        z-50
        flex items-center gap-3
        px-5 py-3
        bg-primary text-white
        rounded-full
        shadow-lg
        hover:shadow-xl
        hover:scale-105
        transition-all duration-300
        animate-[fadeInUp_0.4s_ease-out]
      "
    >

      <span className="text-text">
        الاطلاع على المزادات المتاحة
      </span>

      <FaAnglesDown className="text-sm text-text animate-bounce" />
    </button>
  );
};

export default AuctionsNotf;