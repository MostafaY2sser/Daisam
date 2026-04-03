import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaMapMarkerAlt,
  FaHome,
  FaLayerGroup,
  FaDoorOpen,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectCardAdmin = ({
  id,
  name_ar,
  name_en,
  city_ar,
  city_en,
  units_count,
  type_ar,
  type_en,
  building_type_ar,
  building_type_en,
  description_ar,
  description_en,
  cover_image,
  status,
  onDelete,
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const title = isRTL ? name_ar : name_en;
  const city = isRTL ? city_ar : city_en;
  const type = isRTL ? type_ar : type_en;
  const building_type = isRTL ? building_type_ar : building_type_en;
  const description = isRTL ? description_ar : description_en;

  return (
   <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border bg-white">

  {/* Image */}
  <div className="h-64 md:h-72 relative">
    <img
      src={
        typeof cover_image === "string"
          ? cover_image
          : URL.createObjectURL(cover_image)
      }
      alt={title}
      className="w-full h-full object-cover"
    />

    {/* Sold Banner */}
    {status === "sold" && (
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
        <img className="w-24" src="/images/sold.png" alt="sold" />
      </div>
    )}
  </div>

  {/* Info */}
  <div className="p-4">
    <h3 className="text-lg md:text-xl font-semibold text-text mb-2 line-clamp-1">
      {title}
    </h3>

    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
      <span className="flex items-center gap-1">
        <FaMapMarkerAlt className="text-primary" /> {city}
      </span>

      <span className="flex items-center gap-1">
        <FaHome className="text-primary" /> {type}
      </span>

      <span className="flex items-center gap-1">
        <FaLayerGroup className="text-primary" /> {building_type}
      </span>

      <span className="flex items-center gap-1">
        <FaDoorOpen className="text-primary" />
        {units_count || 0} {isRTL ? "وحدات" : "Units"}
      </span>
    </div>
  </div>

  {/* Description */}
  <div className="px-4 pb-4">
    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
      {description}
    </p>

    {/* Actions */}
    <div className="flex items-center gap-2">

      {/* View */}
      <Link
        to={`/dashboard/project-details/${id}`}
        className="flex-1 bg-primary text-white text-center py-2 rounded-lg hover:bg-primary-dark transition text-sm font-medium"
      >
        {isRTL ? "عرض التفاصيل" : "View Details"}
      </Link>

      {/* Edit */}
      <Link
        to={`/dashboard/edit-project/${id}`}
        className="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
      >
        <FaEdit size={14} />
      </Link>

      {/* Delete */}
      <button
        onClick={() => {
          if (confirm("Are you sure?")) onDelete(id);
        }}
        className="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        <FaTrash size={14} />
      </button>
    </div>
  </div>
</div>
  );
};

export default ProjectCardAdmin;