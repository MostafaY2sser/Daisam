import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { projects } from "../../data/projects";
import { useParams } from "react-router-dom";
import { FaRulerCombined, FaCheckCircle } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";



const ProjectsDetails = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) return <div className="text-center py-20">Project Not Found</div>;

  return (
    <div className="bg-secondary min-h-screen">

      {/* ===== Hero ===== */}
      <div className="relative h-[300px] md:h-[400px]">
        <img src={project.cover_image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold">
            {isRTL ? project.name_ar : project.name_en}
          </h1>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* Sold Banner */}
        {project.status === "sold" && (
            <img src="/images/sold.png" alt="sold" className={`absolute -top-16 sm:-top-20 ${isRTL ? "left-0" : "right-0"} w-36 sm:w-64`} />
        )}

        {/* ===== Basic Info ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? "معلومات المشروع" : "Project Info"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <p><strong className="text-primary">{isRTL ? "الاسم:" : "Name:"}</strong> {isRTL ? project.title_ar : project.title_en}</p>
            <p><strong className="text-primary">{isRTL ? "الموقع:" : "Location:"}</strong> {isRTL ? project.location_ar : project.location_en}</p>
            <p><strong className="text-primary">{isRTL ? "عدد الوحدات:" : "Units:"}</strong> {project.units_count}</p>
            <p><strong className="text-primary">{isRTL ? "الحالة:" : "Status:"}</strong> {project.status}</p>
          </div>
        </div>

        {/* ===== Description ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? "نبذة عن المشروع" : "About Project"}
          </h2>
          <p className="text-gray-700">
            {isRTL ? project.description_ar : project.description_en}
          </p>
        </div>

        {/* ===== Unit Details ===== */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold mb-6">
            {isRTL ? "تفاصيل الوحدة" : "Unit Details"}
        </h2>

        {/* Area Card */}
        <div className="flex items-center gap-3 bg-primary text-white p-4 rounded-xl mb-6 w-fit">
            <FaRulerCombined className="text-lg" />
            <span className="font-semibold">
            {isRTL ? "المساحة:" : "Area:"} {project.area} m²
            </span>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(isRTL ? project.unit_features_ar : project.unit_features_en).map((f, i) => (
            <div
                key={i}
                className="flex items-center gap-2 bg-gray-50 hover:bg-primary/5 transition p-3 rounded-lg border"
            >
                <FaCheckCircle className="text-primary text-base" />
                <span className="text-base font-semibold text-gray-700">
                    {f}
                </span>
            </div>
            ))}
        </div>

        </div>

        {/* ===== Features ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {isRTL ? "مميزات المشروع" : "Features"}
          </h2>

          <div className="grid md:grid-cols-3 gap-3">
            {(isRTL ? project.features_ar : project.features_en).map((f, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded">
                {f}
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
              <div key={i} className="border p-3 rounded">
                <p className="font-semibold">
                  {isRTL ? g.title_ar : g.title_en}
                </p>
                <p className="text-gray-600">{g.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Gallery ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">صور المشروع</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery_images.map((img, i) => (
              <div
                key={i}
                className="relative group cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={img}
                  className="rounded-lg w-full h-32 sm:h-48 object-cover transition group-hover:brightness-50"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white font-bold text-lg">عرض</span>
                  <span className="text-white/70 text-sm">{i + 1} / {project.gallery_images.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>


      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-[1111111]  flex items-center justify-center">
            
            {/* Previous Button */}
            <button
                className="absolute left-0 sm:left-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
                onClick={() =>
                    setLightboxIndex((prev) =>
                    prev === 0 ? project.gallery_images.length - 1 : prev - 1
                    )
                }
            >
            <FaArrowLeft/>
            </button>

            {/* Next Button */}
            <button
                className="absolute right-0 sm:right-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
                onClick={() =>
                    setLightboxIndex((prev) =>
                    prev === project.gallery_images.length - 1 ? 0 : prev + 1
                    )
            }
            >
            <FaArrowRight/>
            </button>

            {/* Image */}
            <img
                src={project.gallery_images[lightboxIndex]}
                className="object-contain rounded-lg max-h-[90vh] max-w-[90vw]  "
            />

            {/* Close Button */}
            <button
                className="absolute top-5 right-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
                onClick={() => setLightboxIndex(null)}
            >
                <IoClose/>
            </button>
        </div>
      )}


    </div>
  );
};

export default ProjectsDetails;