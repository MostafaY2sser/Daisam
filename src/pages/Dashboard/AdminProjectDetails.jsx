import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { FaRulerCombined, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/common/Loader";

const AdminProjectDetails = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // ── Fetch from Supabase ───────────────────────────────────────────────────
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
        console.error("Error fetching project:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <Loader />;
  if (!project) return <div className="text-center py-20">Project Not Found</div>;

  // ── Safe arrays ───────────────────────────────────────────────────────────
  const safeArray     = (val) => (Array.isArray(val) ? val : []);
  const galleryImages = safeArray(project.gallery_images);
  const unitFeaturesAr = safeArray(project.unit_features_ar);
  const unitFeaturesEn = safeArray(project.unit_features_en);
  const featuresAr    = safeArray(project.features_ar);
  const featuresEn    = safeArray(project.features_en);
  const guarantees    = safeArray(project.guarantees);

  // ── Date ─────────────────────────────────────────────────────────────────
  const formattedDate = new Date(project.created_at).toLocaleDateString(
    isRTL ? "ar-SA" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // ── Status ────────────────────────────────────────────────────────────────
  const statusColor = project.status === "available"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-600";

  const statusLabel = project.status === "available"
    ? (isRTL ? "متاح" : "Available")
    : (isRTL ? "مباع" : "Sold");

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleEdit = () => navigate(`/dashboard/edit-project/${project.id}`);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      isRTL
        ? "هل أنت متأكد من حذف هذا المشروع؟"
        : "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;

    setDeleteLoading(true);
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (error) throw error;
      navigate("/dashboard/projects-dashboard");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="bg-secondary min-h-screen">

      {/* ===== Hero ===== */}
      <div className="relative h-[300px] md:h-[400px]">
        <img src={project.cover_image} className="w-full h-full object-cover" alt="cover" loading="lazy"/>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
            {isRTL ? project.name_ar : project.name_en}
          </h1>
          <span className={`text-sm font-semibold px-4 py-1 rounded-full ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {project.status === "sold" && (
          <img
            src="/images/sold.png"
            alt="sold"
            loading="lazy"
            className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} w-24 sm:w-36`}
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">

        {/* ===== Admin Action Bar ===== */}
        <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0 bg-white p-4 rounded-xl shadow">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
              {isRTL ? "لوحة التحكم" : "Admin Panel"}
            </p>
            <h2 className="text-lg font-bold text-gray-800">
              {isRTL ? project.name_ar : project.name_en}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
            >
              <FaEdit />
              {isRTL ? "تعديل" : "Edit"}
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
            >
              {deleteLoading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : <FaTrash />}
              {isRTL ? "حذف" : "Delete"}
            </button>
          </div>
        </div>

        {/* ===== Basic Info ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? "معلومات المشروع" : "Project Info"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <p><strong className="text-primary">{isRTL ? "الاسم:" : "Name:"}</strong> {isRTL ? project.name_ar : project.name_en}</p>
            <p><strong className="text-primary">{isRTL ? "العنوان:" : "Title:"}</strong> {isRTL ? project.title_ar : project.title_en}</p>
            <p><strong className="text-primary">{isRTL ? "الموقع:" : "Location:"}</strong> {isRTL ? project.location_ar : project.location_en}</p>
            <p><strong className="text-primary">{isRTL ? "المدينة:" : "City:"}</strong> {isRTL ? project.city_ar : project.city_en}</p>
            <p><strong className="text-primary">{isRTL ? "الحي:" : "District:"}</strong> {isRTL ? project.district_ar : project.district_en}</p>
            <p><strong className="text-primary">{isRTL ? "نوع المشروع:" : "Type:"}</strong> {isRTL ? project.type_ar : project.type_en}</p>
            <p><strong className="text-primary">{isRTL ? "نوع البناء:" : "Building Type:"}</strong> {isRTL ? project.building_type_ar : project.building_type_en}</p>
            <p><strong className="text-primary">{isRTL ? "عدد الوحدات:" : "Units:"}</strong> {project.units_count}</p>
            <p>
              <strong className="text-primary">{isRTL ? "الحالة:" : "Status:"}</strong>{" "}
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}>
                {statusLabel}
              </span>
            </p>
            <p><strong className="text-primary">{isRTL ? "المعرّف:" : "ID:"}</strong> #{project.id}</p>
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
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-400 mb-1 font-semibold uppercase">AR</p>
              <p className="text-gray-700 leading-relaxed text-sm" dir="rtl">{project.description_ar}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1 font-semibold uppercase">EN</p>
              <p className="text-gray-700 leading-relaxed text-sm">{project.description_en}</p>
            </div>
          </div>
        </div>

        {/* ===== Unit Details ===== */}
        {(project.area || unitFeaturesAr.length > 0) && (
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

            <div className="grid sm:grid-cols-2 gap-3">
              {unitFeaturesAr.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 border p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary text-base shrink-0" />
                    <span className="text-sm font-semibold text-gray-700" dir="rtl">{f}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-3">{unitFeaturesEn[i]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Features ===== */}
        {featuresAr.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">
              {isRTL ? "مميزات المشروع" : "Features"}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {featuresAr.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg text-sm">
                  <span dir="rtl" className="font-medium">{f}</span>
                  <span className="text-gray-500">{featuresEn[i]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Guarantees ===== */}
        {guarantees.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">
              {isRTL ? "ضمانات المشروع" : "Guarantees"}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {guarantees.map((g, i) => (
                <div key={i} className="border p-4 rounded-xl space-y-1">
                  <p className="font-semibold text-sm" dir="rtl">{g.title_ar}</p>
                  <p className="text-gray-500 text-sm">{g.title_en}</p>
                  <p className="text-primary font-bold">{g.value}</p>
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
                    alt={`gallery-${i}`}
                    className="rounded-lg w-full h-32 sm:h-48 object-cover transition group-hover:brightness-50"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <span className="text-white font-bold text-lg">{isRTL ? "عرض" : "View"}</span>
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
            className="object-contain rounded-lg max-h-[90vh] md:max-w-[90vw]"
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

export default AdminProjectDetails;