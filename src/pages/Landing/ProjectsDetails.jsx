
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { FaRulerCombined, FaCheckCircle } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import Loader from "../../components/common/Loader";
import { supabase } from "../../lib/supabase";

const ProjectsDetails = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setProject(data);
      } catch (err) {
        console.log("Error fetching project:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <Loader />;
  if (!project) return <div className="text-center py-20">Project Not Found</div>;

  // ── Date ──────────────────────────────────────────────────────────────────
  const formattedDate = new Date(project.created_at).toLocaleDateString(
    isRTL ? "ar-SA" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // ── Safe array helpers ────────────────────────────────────────────────────
  const safeArray = (val) => (Array.isArray(val) ? val : []);

  const unitFeaturesAr  = safeArray(project.unit_features_ar);
  const unitFeaturesEn  = safeArray(project.unit_features_en);
  const featuresAr      = safeArray(project.features_ar);
  const featuresEn      = safeArray(project.features_en);
  const guaranteesList  = safeArray(project.guarantees);
  const galleryImages   = safeArray(project.gallery_images);

  // pick correct language arrays
  const unitFeaturesList = isRTL ? unitFeaturesAr : unitFeaturesEn;
  const featuresList     = isRTL ? featuresAr     : featuresEn;

  return (
    <div className="bg-secondary min-h-screen">

      {/* ===== Hero ===== */}
      <div className="relative h-[300px] md:h-[400px]">
        <img src={project.cover_image} className="w-full h-full object-cover" alt="cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
            {isRTL ? project.name_ar : project.name_en}
          </h1>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* Sold Banner */}
        {project.status === "sold" && (
          <img
            src="/images/sold.png"
            alt="sold"
            className={`absolute -top-16 sm:-top-20 ${isRTL ? "left-0" : "right-0"} w-36 sm:w-64`}
          />
        )}

        {/* ===== Basic Info ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? "معلومات المشروع" : "Project Info"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <p><strong className="text-primary">{isRTL ? "الاسم:" : "Name:"}</strong> {isRTL ? project.title_ar : project.title_en}</p>
            <p><strong className="text-primary">{isRTL ? "الموقع:" : "Location:"}</strong> {isRTL ? project.location_ar : project.location_en}</p>
            <p><strong className="text-primary">{isRTL ? "المدينة:" : "City:"}</strong> {isRTL ? project.city_ar : project.city_en}</p>
            <p><strong className="text-primary">{isRTL ? "الحي:" : "District:"}</strong> {isRTL ? project.district_ar : project.district_en}</p>
            <p><strong className="text-primary">{isRTL ? "نوع المشروع:" : "Type:"}</strong> {isRTL ? project.type_ar : project.type_en}</p>
            <p><strong className="text-primary">{isRTL ? "نوع البناء:" : "Building Type:"}</strong> {isRTL ? project.building_type_ar : project.building_type_en}</p>
            <p><strong className="text-primary">{isRTL ? "عدد الوحدات:" : "Units:"}</strong> {project.units_count}</p>
            <p>
              <strong className="text-primary">{isRTL ? "الحالة:" : "Status:"}</strong>{" "}
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${project.status === "available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {project.status === "available" ? (isRTL ? "متاح" : "Available") : (isRTL ? "مباع" : "Sold")}
              </span>
            </p>
          </div>

          {/* Date */}
          <div className={`flex items-center gap-2 mt-5 pt-5 border-t text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}>
            <FiCalendar className="text-primary text-base shrink-0" />
            <span>
              {isRTL ? "تاريخ الإضافة:" : "Added on:"}{" "}
              <span className="font-semibold text-gray-700">{formattedDate}</span>
            </span>
          </div>
        </div>

        {/* ===== Description ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? "نبذة عن المشروع" : "About Project"}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {isRTL ? project.description_ar : project.description_en}
          </p>
        </div>

        {/* ===== Unit Details ===== */}
        {(project.area || unitFeaturesList.length > 0) && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              {isRTL ? "تفاصيل الوحدة" : "Unit Details"}
            </h2>

            {project.area && (
              <div className="flex items-center gap-3 bg-primary text-white p-4 rounded-xl mb-6 w-fit">
                <FaRulerCombined className="text-lg" />
                <span className="font-semibold">
                  {isRTL ? "المساحة:" : "Area:"} {Number(project.area).toLocaleString()} m²
                </span>
              </div>
            )}

            {unitFeaturesList.length > 0 && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {unitFeaturesList.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 hover:bg-primary/5 transition p-3 rounded-lg border">
                    <FaCheckCircle className="text-primary text-base shrink-0" />
                    <span className="text-base font-semibold text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== Features ===== */}
        {featuresList.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">
              {isRTL ? "مميزات المشروع" : "Features"}
            </h2>
            <div className="grid md:grid-cols-3 gap-3">
              {featuresList.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                  <FaCheckCircle className="text-primary shrink-0" />
                  <span className="text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Guarantees ===== */}
        {guaranteesList.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">
              {isRTL ? "ضمانات المشروع" : "Guarantees"}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {guaranteesList.map((g, i) => (
                <div key={i} className="border p-4 rounded-xl space-y-1">
                  <p className="font-semibold text-sm">
                    {isRTL ? g.title_ar : g.title_en}
                  </p>
                  <p className="text-primary font-bold">{g.value} سنة </p> 
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Gallery ===== */}
        {galleryImages.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">
              {isRTL ? "صور المشروع" : "Gallery"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="relative group cursor-pointer"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={img}
                    className="rounded-lg w-full h-32 sm:h-48 object-cover transition group-hover:brightness-50"
                    alt={`gallery-${i}`}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <span className="text-white font-bold text-lg">عرض</span>
                    <span className="text-white/70 text-sm">{i + 1} / {galleryImages.length}</span>
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
            onClick={() => setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
          >
            <FaArrowLeft />
          </button>
          <button
            className="absolute right-0 sm:right-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
            onClick={() => setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
          >
            <FaArrowRight />
          </button>
          <img
            src={galleryImages[lightboxIndex]}
            className="object-contain rounded-lg max-h-[90vh] max-w-[90vw]"
            alt="lightbox"
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

export default ProjectsDetails;