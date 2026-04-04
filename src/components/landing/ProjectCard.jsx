

import React from "react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt, FaHome, FaLayerGroup, FaDoorOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProjectCard = ({ 
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
    models, 
    status 
  }) => {
  
  
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    const title = isRTL ? name_ar : name_en;
    const city = isRTL ? city_ar : city_en;
    const type = isRTL ? type_ar : type_en;
    const building_type = isRTL ? building_type_ar : building_type_en;
    const description = isRTL ? description_ar : description_en;


    return (
      <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1" data-aos="zoom-in">
        {/* Image */}
        <div className="h-64 md:h-72">
          <img src={cover_image} alt={title} className="w-full h-full object-cover" />
        </div> 

        {/* Info */}
        <div className="text-text p-2 sm:p-4 bg-white">
          <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
          <div className="flex flex-wrap gap-4 mt-4 text-sm md:text-base">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-primary" /> {city}
            </span>
            <span className="flex items-center gap-1">
              <FaHome className="text-primary" /> {type}
            </span>
            <span className="flex items-center gap-1">
              <FaLayerGroup  className="text-primary" /> {building_type}
            </span>
            <span className="flex items-center gap-1">
              <FaDoorOpen  className="text-primary" /> {units_count || 0} {isRTL ? "وحدات" : "Units"}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 bg-white">
            <p className="text-gray-700 text-base leading-relaxed line-clamp-3">{description}</p>
            <Link to={`/projects-details/${id}`} className="mt-8 block w-full bg-primary text-white text-center  py-2 rounded-lg hover:bg-primary-dark transition">
                {isRTL ? "عرض التفاصيل" : "View Details"}
            </Link>
        </div>

        {/* Sold Banner */} 
        {status === "sold" && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 ">
              <img className="bg" src="/images/sold.png" alt="" />
            </div>
          )}

      </div>
    );
};

export default ProjectCard;