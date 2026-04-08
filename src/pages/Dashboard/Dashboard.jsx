
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/common/Loader";

const Dashboard = () => {
  const { t , i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalUnits: 0,
    availableUnits: 0,
    soldUnits: 0,
  });

  const [cities, setCities] = useState({});
  const [types, setTypes] = useState({});
  const [topProject, setTopProject] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*");

        if (error) throw error;

        setProjects(data);

        // Stats
        const totalProjects = data.length;
        const totalUnits = data.reduce((acc, p) => acc + (p.units_count || 0), 0);
        const availableUnits = data.reduce((acc, p) => acc + (p.available_units || 0), 0);
        const soldUnits = data.reduce((acc, p) => acc + (p.sold_units || 0), 0);

        setStats({ totalProjects, totalUnits, availableUnits, soldUnits });

        // Cities
        const cityMap = {};
        data.forEach(p => {
          const city = isAr ? p.city_ar : p.city_en;
          cityMap[city] = (cityMap[city] || 0) + 1;
        });
        setCities(cityMap);

        // Types
        const typeMap = {};
        data.forEach(p => {
          const type = isAr ? p.building_type_ar : p.building_type_en;
          typeMap[type] = (typeMap[type] || 0) + 1;
        });
        setTypes(typeMap);

        // Top Project (most units)
        const top = data.reduce((prev, current) =>
          (prev.units_count || 0) > (current.units_count || 0) ? prev : current
        , {});
        setTopProject(top);

      } catch (err) {
        console.log(err);
        setError("حدث خطأ أثناء تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isAr]);

  if (loading) return <Loader />;

  


  return (
    <div className="p-4 max-w-7xl mx-auto">

      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">
         {t("dashboard_welcome")}
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {!error && (
        <>

          {/* Main Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500 text-lg md:text-xl font-medium">
                {isAr ? "عدد المشاريع" : "Projects"}
              </p>
              <h2 className="text-2xl font-bold text-primary">
                {stats.totalProjects}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500 text-lg md:text-xl font-medium">
                {isAr ? "إجمالي الوحدات" : "Total Units"}
              </p>
              <h2 className="text-2xl font-bold">
                {stats.totalUnits}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500 text-lg md:text-xl font-medium">
                {isAr ? "الوحدات المتاحة" : "Available Units"}
              </p>
              <h2 className="text-2xl font-bold text-green-500">
                {stats.availableUnits}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500 text-lg md:text-xl font-medium">
                {isAr ? "الوحدات المباعة" : "Sold Units"}
              </p>
              <h2 className="text-2xl font-bold text-red-500">
                {stats.soldUnits}
              </h2>
            </div>

          </div>

          {/* Cities & Types */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">

            {/* Top Project */}
            {topProject && (
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold text-lg md:text-xl   mb-4">
                  {isAr ? "أكبر مشروع" : "Top Project"}
                </h3>

                <p className="text-lg font-bold text-gray-600">
                  {isAr ? topProject.name_ar : topProject.name_en}
                </p>

                <p className="text-base font-medium text-gray-500 mt-1">
                  {isAr ? topProject.city_ar : topProject.city_en}
                </p>

                <p className="mt-2 text-lg md:text-xl">
                  {isAr ? "عدد الوحدات:" : "Units:"} {topProject.units_count}
                </p>
              </div>
            )}

             {/* Cities */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4 text-lg md:text-xl ">
                {isAr ? "المشاريع حسب المدينة" : "Projects by City"}
              </h3>

              {Object.entries(cities).map(([city, count]) => (
                <div key={city} className="flex justify-between mb-2 text-sm">
                  <span className="text-base font-medium">{city}</span>
                  <span className="text-base font-medium">{count}</span>
                </div>
              ))}
            </div>

          </div>


        </>
      )}
    </div>
  );
};

export default Dashboard;