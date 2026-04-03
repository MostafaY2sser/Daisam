import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "../../data/projects";
import { useParams, useNavigate } from "react-router-dom";
import { FaRulerCombined, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ProjectDetailsAdmin = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === Number(id));

  if (!project) return <div className="text-center py-20">Project Not Found</div>;

  // ── Admin Actions ──────────────────────────────────────────────────────────
  const handleEdit = () => {
    navigate(`/dashboard/edit-project/${project.id}`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      isRTL
        ? "هل أنت متأكد من حذف هذا المشروع؟"
        : "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;
    // TODO: dispatch delete action / call API
    console.log("Delete project:", project.id);
    navigate("/admin/projects");
  };

  // ── Status badge helper ────────────────────────────────────────────────────
  const statusColor =
    project.status === "available"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-600";

  const statusLabel =
    project.status === "available"
      ? isRTL ? "متاح" : "Available"
      : isRTL ? "مباع" : "Sold";

  return (
    <div className="bg-secondary min-h-screen">

      {/* ===== Hero ===== */}
      <div className="relative h-[300px] md:h-[400px]">
        <img src={project.cover_image} className="w-full h-full object-cover" alt="cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
          <h1 className="text-white text-2xl md:text-4xl font-bold">
            {isRTL ? project.name_ar : project.name_en}
          </h1>
          <span className={`text-sm font-semibold px-4 py-1 rounded-full ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {/* Sold Banner */}
        {project.status === "sold" && (
          <img
            src="/images/sold.png"
            alt="sold"
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
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
            >
              <FaTrash />
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
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            {isRTL ? "تفاصيل الوحدة" : "Unit Details"}
          </h2>

          <div className="flex items-center gap-3 bg-primary text-white p-4 rounded-xl mb-6 w-fit">
            <FaRulerCombined className="text-lg" />
            <span className="font-semibold">
              {isRTL ? "المساحة:" : "Area:"} {project.area} m²
            </span>
          </div>

          {/* Bilingual unit features */}
          <div className="grid sm:grid-cols-2 gap-3">
            {project.unit_features_ar.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-primary text-base shrink-0" />
                  <span className="text-sm font-semibold text-gray-700" dir="rtl">{f}</span>
                </div>
                <span className="text-sm text-gray-500 ml-3">{project.unit_features_en[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Features ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? "مميزات المشروع" : "Features"}
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            {project.features_ar.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg text-sm">
                <span dir="rtl" className="font-medium">{f}</span>
                <span className="text-gray-500">{project.features_en[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Guarantees ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? "ضمانات المشروع" : "Guarantees"}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {project.guarantees.map((g, i) => (
              <div key={i} className="border p-4 rounded-xl space-y-1">
                <p className="font-semibold text-sm" dir="rtl">{g.title_ar}</p>
                <p className="text-gray-500 text-sm">{g.title_en}</p>
                <p className="text-primary font-bold">{g.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Gallery ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? "صور المشروع" : "Gallery"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery_images.map((img, i) => (
              <div
                key={i}
                className="relative group cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img}
                  alt={`gallery-${i}`}
                  className="rounded-lg w-full h-32 sm:h-48 object-cover transition group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-xs bg-black/50 px-3 py-1 rounded-full">
                    {isRTL ? "عرض" : "View"}
                  </span>
                </div>
                <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                  {i + 1} / {project.gallery_images.length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Bottom Action Bar ===== */}
        <div className="flex justify-end gap-3 pb-6 flex-wrap">
          <button
            onClick={() => navigate("/dashboard/projects-dashboard")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
          >
            {isRTL ? "رجوع" : "Back"}
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            <FaEdit />
            {isRTL ? "تعديل المشروع" : "Edit Project"}
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            <FaTrash />
            {isRTL ? "حذف المشروع" : "Delete Project"}
          </button>
        </div>
      </div>

        {/* ===== Lightbox ===== */}
        {lightboxIndex !== null && (
            <div className="fixed inset-0 bg-black/80 z-[1111111] flex items-center justify-center">

            {/* Previous */}
            <button
                className="absolute left-0 sm:left-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
                onClick={() =>
                setLightboxIndex((prev) =>
                    prev === 0 ? project.gallery_images.length - 1 : prev - 1
                )
                }
            >
                <FaArrowLeft />
            </button>

            {/* Next */}
            <button
                className="absolute right-0 sm:right-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
                onClick={() =>
                setLightboxIndex((prev) =>
                    prev === project.gallery_images.length - 1 ? 0 : prev + 1
                )
                }
            >
                <FaArrowRight />
            </button>

            {/* Image */}
            <img
                src={project.gallery_images[lightboxIndex]}
                className="object-contain rounded-lg max-h-[90vh] md:max-w-[90vw]"
                alt="lightbox"
            />

            {/* Counter */}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-1 rounded-full text-sm">
                {lightboxIndex + 1} / {project.gallery_images.length}
            </span>

            {/* Close */}
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

export default ProjectDetailsAdmin;