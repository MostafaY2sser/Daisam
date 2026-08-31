import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../components/common/Loader";
import { useAuctions } from "../../hooks/useAuctions";
import { useProjects } from "../../hooks/useProjects";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const {
    data: auctions = [],
    isLoading: auctionsLoading,
    error: auctionsError,
  } = useAuctions();
  const {data: projects = [], isLoading, error,} = useProjects();

  // ===== stats =====
  const stats = useMemo(() => {
    const totalProjects = projects.length;

    const totalUnits = projects.reduce(
      (acc, p) => acc + (p.units_count || 0),
      0
    );

    const availableUnits = projects.reduce(
      (acc, p) => acc + (p.available_units || 0),
      0
    );

    const soldUnits = projects.reduce(
      (acc, p) => acc + (p.sold_units || 0),
      0
    );

    return { totalProjects, totalUnits, availableUnits, soldUnits };
  }, [projects]);

  // ===== auctions stats =====
  const auctionStats = useMemo(() => {
    const totalAuctions = auctions.length;

    const availableAuctions = auctions.filter(
      (auction) => auction.status === "available"
    ).length;

    const endedAuctions = auctions.filter(
      (auction) => auction.status === "ended"
    ).length;

    const totalAuctionUnits = auctions.reduce(
      (acc, auction) => acc + (Number(auction.units_count) || 0),
      0
    );

    const soldAuctionUnits = auctions.reduce(
      (acc, auction) => acc + (Number(auction.sold_units) || 0),
      0
    );

    const availableAuctionUnits = auctions.reduce(
      (acc, auction) => acc + (Number(auction.available_units) || 0),
      0
    );

    return {
      totalAuctions,
      availableAuctions,
      endedAuctions,
      totalAuctionUnits,
      soldAuctionUnits,
      availableAuctionUnits,
    };
  }, [auctions]);


  // ===== cities =====
  const cities = useMemo(() => {
    const map = {};

    projects.forEach((p) => {
      const city = isAr ? p.city_ar : p.city_en;
      map[city] = (map[city] || 0) + 1;
    });

    return map;
  }, [projects, isAr]);


  // ===== top project =====
  const topProject = useMemo(() => {
    if (!projects.length) return null;

    return projects.reduce((prev, curr) =>
      (prev.units_count || 0) > (curr.units_count || 0) ? prev : curr
    );
  }, [projects]);


  if (isLoading) return <Loader />;

  
  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        {t("error_loading_data")}
      </p>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">

      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">
        {t("dashboard_welcome")}
      </h1>

          <h2 className="text-xl md:text-2xl font-bold text-text mb-5">
            المشاريع
          </h2>
      {/* Main Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">


        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-lg font-medium">
            {t("total_projects")}
          </p>
          <h2 className="text-2xl font-bold text-primary">
            {stats.totalProjects}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-lg font-medium">
            {t("total_units")}
          </p>
          <h2 className="text-2xl font-bold">
            {stats.totalUnits}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-lg font-medium">
            {t("available_units")}
          </p>
          <h2 className="text-2xl font-bold text-green-500">
            {stats.availableUnits}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-lg font-medium">
            {t("sold_units")}
          </p>
          <h2 className="text-2xl font-bold text-red-500">
            {stats.soldUnits}
          </h2>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        {/* Top Project */}
        {topProject && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">
              {t("top_project")}
            </h3>

            <p className="text-lg font-bold text-gray-600">
              {isAr ? topProject.name_ar : topProject.name_en}
            </p>

            <p className="text-base font-medium text-gray-500 mt-1">
              {isAr ? topProject.city_ar : topProject.city_en}
            </p>

            <p className="mt-2 text-lg">
              {t("units_count_label")} {topProject.units_count}
            </p>
          </div>
        )}

        {/* Cities */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4 text-lg">
            {t("projects_by_city")}
          </h3>

          {Object.entries(cities).map(([city, count]) => (
            <div key={city} className="flex justify-between mb-2 text-sm">
              <span className="font-medium">{city}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>


      {/* Auctions Stats */}
      <div className="mb-10">

            <h2 className="text-xl md:text-2xl font-bold text-text mb-5">
              المزادات
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

          {/* Total Auctions */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-lg font-medium">
              إجمالي المزادات
            </p>

            <h2 className="text-2xl font-bold text-primary">
              {auctionStats.totalAuctions}
            </h2>
          </div>

          {/* Available Auctions */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-lg font-medium">
              المزادات المتاحة
            </p>

            <h2 className="text-2xl font-bold text-green-500">
              {auctionStats.availableAuctions}
            </h2>
          </div>

          {/* Ended Auctions */}
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500 text-lg font-medium">
              المزادات المنتهية
            </p>

            <h2 className="text-2xl font-bold text-red-500">
              {auctionStats.endedAuctions}
            </h2>
          </div>

        </div>
      </div>


    {/* Auction Details */}
    <div className="grid md:grid-cols-2 gap-6 mb-10">

      {/* Auction Units */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="font-semibold text-lg mb-5">
          وحدات المزادات
        </h3>

        <div className="flex justify-between mb-3">
          <span className="text-gray-500">
            إجمالي الوحدات
          </span>

          <span className="font-bold">
            {auctionStats.totalAuctionUnits}
          </span>
        </div>

        <div className="flex justify-between mb-3">
          <span className="text-gray-500">
            الوحدات المتاحة
          </span>

          <span className="font-bold text-green-500">
            {auctionStats.availableAuctionUnits}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            الوحدات المباعة
          </span>

          <span className="font-bold text-red-500">
            {auctionStats.soldAuctionUnits}
          </span>
        </div>

      </div>


      {/* Latest Auctions */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="font-semibold text-lg mb-5">
          المزادات
        </h3>

        {auctions.slice(0, 5).map((auction) => (

          <div
            key={auction.id}
            className="flex items-center justify-between border-b last:border-0 py-3"
          >

            <div>
              <p className="font-semibold">
                {isAr
                  ? auction.name_ar
                  : auction.name_en}
              </p>

              <p className="text-sm text-gray-500">
                {isAr
                  ? auction.city_ar
                  : auction.city_en}
              </p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                auction.status === "available"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {auction.status === "available"
                ? "متاح"
                : "منتهي"}
            </span>

          </div>

        ))}

      </div>

    </div>


    </div>
  );
};

export default Dashboard;