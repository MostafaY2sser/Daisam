import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  FaRulerCombined,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaArrowRight,
  FaArrowLeft,
  FaGavel,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import Loader from "../../components/common/Loader";
import { supabase } from "../../lib/supabase";
import useSnapViewContent from "../../hooks/useSnapViewContent";

const AuctionsDetails = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { id } = useParams();

  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useSnapViewContent({
    itemCategory: "auctionDetails",
  });

  useEffect(() => {
    const fetchAuction = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("Auctions")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setAuction(data);
      } catch (err) {
        console.log("Error fetching auction:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  if (loading) return <Loader />;

  if (!auction) {
    return (
      <div className="text-center py-20">
        {t("auction_not_found")}
      </div>
    );
  }

  // Date
  const formattedDate = new Date(auction.created_at).toLocaleDateString(
    isRTL ? "ar-SA" : "en-GB",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Safe arrays
  const safeArray = (value) =>
    Array.isArray(value) ? value : [];

  const unitFeaturesAr = safeArray(auction.unit_features_ar);
  const unitFeaturesEn = safeArray(auction.unit_features_en);

  const nearbyPlacesAr = safeArray(auction.nearby_places_ar);
  const nearbyPlacesEn = safeArray(auction.nearby_places_en);

  const featuresAr = safeArray(auction.features_ar);
  const featuresEn = safeArray(auction.features_en);

  const guaranteesList = safeArray(auction.guarantees);

  const galleryImages = safeArray(auction.gallery_images);

  // Current language arrays
  const unitFeaturesList = isRTL
    ? unitFeaturesAr
    : unitFeaturesEn;

  const featuresList = isRTL
    ? featuresAr
    : featuresEn;

  const nearbyPlacesList = isRTL
    ? nearbyPlacesAr
    : nearbyPlacesEn;

  return (
    <div className="bg-secondary min-h-screen">

      {/* ===== Hero ===== */}
      <div className="relative h-[400px] md:h-[500px]">

        <img
          src={auction.cover_image}
          className="w-full h-full object-cover"
          alt={isRTL ? auction.name_ar : auction.name_en}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
            {isRTL ? auction.name_ar : auction.name_en}
          </h1>
        </div>

      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* ===== Ended Banner ===== */}
        {auction.status === "ended" && (
          <img
            src="/images/ended.png"
            alt="ended"
            className={`absolute -top-16 sm:-top-20 ${
              isRTL ? "left-0" : "right-0"
            } w-36 sm:w-64`}
            loading="lazy"
          />
        )}

        {/* ===== Basic Info ===== */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg md:text-2xl font-bold mb-4">
            {isRTL ? "معلومات المزاد" : "Auction Information"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm">

            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "اسم المزاد:" : "Auction Name:"}
              </strong>{" "}
              {isRTL ? auction.title_ar : auction.title_en}
            </p>

            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "الموقع:" : "Location:"}
              </strong>{" "}
              {isRTL ? auction.location_ar : auction.location_en}
            </p>

            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "المدينة:" : "City:"}
              </strong>{" "}
              {isRTL ? auction.city_ar : auction.city_en}
            </p>

            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "الحي:" : "District:"}
              </strong>{" "}
              {isRTL ? auction.district_ar : auction.district_en}
            </p>

            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "نوع المشروع:" : "Project Type:"}
              </strong>{" "}
              {isRTL ? auction.type_ar : auction.type_en}
            </p>

            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "نوع البناء:" : "Building Type:"}
              </strong>{" "}
              {isRTL
                ? auction.building_type_ar
                : auction.building_type_en}
            </p>

            <p className="text-lg flex items-center gap-2">
              <strong className="text-primary">
                {isRTL ? "السعر:" : "Price:"}
              </strong>

              <FaGavel className="text-primary" />

              {auction.price}
            </p>

            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "عدد الوحدات:" : "Units Count:"}
              </strong>{" "}
              {auction.units_count}
            </p>

            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "الوحدات المتاحة:" : "Available Units:"}
              </strong>{" "}
              {auction.available_units}
            </p>

            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "الوحدات المباعة:" : "Sold Units:"}
              </strong>{" "}
              {auction.sold_units}
            </p>

            {/* Status */}
            <p className="text-lg">
              <strong className="text-primary">
                {isRTL ? "الحالة:" : "Status:"}
              </strong>{" "}

              <span
                className={`px-2 py-0.5 rounded-full text-base font-semibold ${
                  auction.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {auction.status === "Available"
                  ? isRTL
                    ? "متاح"
                    : "Available"
                  : isRTL
                  ? "منتهي"
                  : "Ended"}
              </span>
            </p>

          </div>

          {/* Date */}
          <div
            className={`flex items-center gap-2 mt-5 pt-5 border-t text-sm text-gray-500 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <FiCalendar className="text-primary text-base shrink-0" />

            <span>
              {isRTL ? "تاريخ الإضافة:" : "Added on:"}{" "}
              <span className="font-semibold text-gray-700">
                {formattedDate}
              </span>
            </span>
          </div>

        </div>

        {/* ===== Description ===== */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg md:text-2xl font-bold mb-4">
            {isRTL ? "نبذة عن المزاد" : "About the Auction"}
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {isRTL
              ? auction.description_ar
              : auction.description_en}
          </p>

        </div>

        {/* ===== Unit Details ===== */}
        {(auction.area || unitFeaturesList.length > 0) && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-lg md:text-2xl font-bold mb-6">
              {isRTL ? "تفاصيل الوحدة" : "Unit Details"}
            </h2>

            {auction.area && (
              <div className="flex items-center gap-3 bg-primary text-white p-4 rounded-xl mb-6 w-fit">

                <FaRulerCombined className="text-lg" />

                <span className="font-semibold">
                  {isRTL ? "المساحة: " : "Area: "}
                  {auction.area}
                </span>

              </div>
            )}

            {unitFeaturesList.length > 0 && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

                {unitFeaturesList.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 hover:bg-primary/5 transition p-3 rounded-lg border"
                  >
                    <FaCheckCircle className="text-primary text-base shrink-0" />

                    <span className="text-base font-semibold text-gray-700">
                      {feature}
                    </span>
                  </div>
                ))}

              </div>
            )}

          </div>
        )}

        {/* ===== Features ===== */}
        {featuresList.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-lg md:text-2xl font-bold mb-4">
              {isRTL ? "مميزات المزاد" : "Auction Features"}
            </h2>

            <div className="grid md:grid-cols-3 gap-3">

              {featuresList.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg"
                >
                  <FaCheckCircle className="text-primary shrink-0" />

                  <span className="text-sm md:text-base font-medium">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

          </div>
        )}

        {/* ===== Nearby Places ===== */}
        {nearbyPlacesList.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-lg md:text-2xl font-bold mb-6">
              {isRTL
                ? "أشهر المعالم القريبة"
                : "Nearby Landmarks"}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

              {nearbyPlacesList.map((place, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 px-4 py-2 rounded-xl border hover:shadow-lg transition"
                >

                  <div className="bg-primary/10 text-primary p-3 rounded-full group-hover:scale-110 transition">
                    <FaMapMarkerAlt />
                  </div>

                  <p className="text-base md:text-lg font-medium text-gray-700">
                    {place}
                  </p>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* ===== Guarantees ===== */}
        {guaranteesList.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-lg md:text-2xl font-bold mb-4">
              {isRTL ? "ضمانات المزاد" : "Auction Guarantees"}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {guaranteesList.map((guarantee, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-xl space-y-1"
                >

                  <p className="font-semibold text-sm md:text-base">
                    {isRTL
                      ? guarantee.name_ar
                      : guarantee.name_en}
                  </p>

                  <p className="text-primary font-bold">
                    {guarantee.duration}
                  </p>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* ===== Gallery ===== */}
        {galleryImages.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-lg md:text-2xl font-bold mb-4">
              {isRTL ? "صور المزاد" : "Auction Gallery"}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >

                  <img
                    src={image}
                    className="rounded-lg w-full h-32 sm:h-48 object-cover transition group-hover:brightness-50"
                    alt={`gallery-${index}`}
                    loading="lazy"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition">

                    <span className="text-white font-bold text-lg">
                      {isRTL ? "عرض الصورة" : "View Image"}
                    </span>

                    <span className="text-white/70 text-sm">
                      {index + 1} / {galleryImages.length}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>

      {/* ===== Lightbox ===== */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-[1111111] flex items-center justify-center">

          <button
            className="absolute left-0 sm:left-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
            onClick={() =>
              setLightboxIndex((prev) =>
                prev === 0
                  ? galleryImages.length - 1
                  : prev - 1
              )
            }
          >
            <FaArrowLeft />
          </button>

          <button
            className="absolute right-0 sm:right-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
            onClick={() =>
              setLightboxIndex((prev) =>
                prev === galleryImages.length - 1
                  ? 0
                  : prev + 1
              )
            }
          >
            <FaArrowRight />
          </button>

          <img
            src={galleryImages[lightboxIndex]}
            className="object-contain rounded-lg max-h-[90vh] max-w-[90vw]"
            alt="lightbox"
            loading="lazy"
          />

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-1 rounded-full text-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </span>

          <button
            className="absolute top-5 right-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
            onClick={() => setLightboxIndex(null)}
          >
            <IoClose />
          </button>

        </div>
      )}

    </div>
  );
};

export default AuctionsDetails;