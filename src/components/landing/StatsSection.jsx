

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(); 
  const [stats, setStats] = useState([
    { number: 0, label: "عدد المشاريع" },
    { number: 0, label: "عدد الأحياء" },
    { number: 0, label: "الوحدات المباعة" },
    { number: 0, label: "الوحدات المتاحة" },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: projects, error } = await supabase
          .from("projects")
          .select("*");

        if (error) throw error;

        const numberOfProjects = projects.length;
        const districts = new Set(projects.map(p => p.district_en));
        const numberOfDistricts = districts.size;

        const soldUnits = projects
          .filter(p => p.status === "sold")
          .reduce((sum, p) => sum + (p.units_count || 0), 0);

        const availableUnits = projects
          .filter(p => p.status !== "sold")
          .reduce((sum, p) => sum + (p.units_count || 0), 0);

        setStats([
          { number: numberOfProjects, label: t('total_projects') },
          { number: numberOfDistricts, label: t('total_neighborhoods') },
          { number: soldUnits, label: t('sold_units') },
          { number: availableUnits, label: t('available_units') },
        ]);

      } catch (err) {
        console.log("Error fetching stats:", err.message);
      }
    };

    fetchStats();
  }, [t]);

  return (
    <section
      className="relative py-12 md:py-20 text-white overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.webp')", backgroundAttachment: "fixed" }}
      data-aos="fade-up"
    >
      <div className="absolute inset-0 bg-text/60"></div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-3xl md:text-5xl font-extrabold flex items-center gap-1">
                <Counter end={stat.number} />
                <span className="text-xl md:text-2xl">+</span>
              </h3>
              <p className="mt-2 text-sm md:text-base text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;