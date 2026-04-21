

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useTranslation } from "react-i18next";
import { useProjects } from "../../hooks/useProjects";
import { useInView } from "../../hooks/useInView";


// Counter component for animating numbers :------
const Counter = ({ end, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const duration = 800;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, start]);

  return <span>{count}</span>;
};


// Component to display stats about projects :-------
const StatsSection = () => {
  const { t } = useTranslation(); 
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  // data fetching using custom hook :-
 const { data: projects = [], isLoading } = useProjects(); 

  //  calculating stats using useMemo to avoid unnecessary recalculations :-
  const stats = useMemo(() => {
    if (!projects.length) return [];

    const numberOfProjects = projects.length;

    const districts = new Set(projects.map(p => p.district_en));
    const numberOfDistricts = districts.size;

    const soldUnits = projects
      .filter(p => p.status === "sold")
      .reduce((sum, p) => sum + (p.units_count || 0), 0);

    const availableUnits = projects
      .filter(p => p.status !== "sold")
      .reduce((sum, p) => sum + (p.units_count || 0), 0);

    return [
      { id: 1, number: numberOfProjects, label: t("total_projects") },
      { id: 2, number: numberOfDistricts, label: t("total_neighborhoods") },
      { id: 3, number: soldUnits, label: t("sold_units") },
      { id: 4, number: availableUnits, label: t("available_units") },
    ];
  }, [projects, t]);

  if (isLoading) {
    return <p className="text-center py-10">{t("loading_projects")}</p>;
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20 text-white overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.webp')", backgroundAttachment: "fixed" }}
      data-aos="fade-up"
    >
      <div className="absolute inset-0 bg-text/60"></div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={stat.id} className="flex flex-col items-center">
              <h3 className="text-3xl md:text-5xl font-extrabold flex items-center gap-1">
                <Counter end={stat.number} start={isInView}/>
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