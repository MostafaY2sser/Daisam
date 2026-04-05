import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/common/Loader";

const Dashboard = () => {
  const { t } = useTranslation();

  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("projects")
          .select("status");

        if (error) throw error;

        const total = data.length;
        const available = data.filter(p => p.status === "available").length;
        const sold = data.filter(p => p.status === "sold").length;

        setStats({ total, available, sold });

      } catch (err) {
        console.log(err);
        setError("حدث خطأ أثناء تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
        {t("dashboard_welcome")}
      </h1>

      {/* Error */}
      {error && (
        <p className="text-red-500 mb-4 text-center">
          {error}
        </p>
      )}

      {/* Stats */}
      {!error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Total */}
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 text-sm mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-primary">{stats.total}</p>
          </div>

          {/* Available */}
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 text-sm mb-2">Available Projects</h3>
            <p className="text-3xl font-bold text-green-500">{stats.available}</p>
          </div>

          {/* Sold */}
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-gray-500 text-sm mb-2">Sold Projects</h3>
            <p className="text-3xl font-bold text-red-500">{stats.sold}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default Dashboard;