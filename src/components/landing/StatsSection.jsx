import { useEffect, useState } from "react";

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}</span>;
};

const StatsSection = () => {
  const stats = [
    { number: 48, label: "عدد المشاريع" },
    { number: 13, label: "عدد الأحياء" },
    { number: 212, label: "الوحدات المباعة" },
    { number: 73, label: "الوحدات المتاحة" },
  ];

  return (
        <section
            className="relative py-12 md:py-20 text-white overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/bg.webp')",
                backgroundAttachment: "fixed", 
            }}
            data-aos="fade-up"
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-text/60"></div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">

                    <h3 className="text-3xl md:text-5xl font-extrabold flex items-center gap-1">
                        <Counter end={stat.number} />
                        <span className="text-xl md:text-2xl">+</span>
                    </h3>

                    <p className="mt-2 text-sm md:text-base text-white/80">
                        {stat.label}
                    </p>

                    </div>
                ))}

                </div>

            </div>
        </section>
    );
};

export default StatsSection;