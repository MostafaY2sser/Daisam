
import React from "react";
import { useTranslation } from "react-i18next";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaTrash,
    FaEdit,
    FaHome,
    FaLayerGroup,
    FaDoorOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AuctionCardAdmin = ({
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
    cover_image,
    status,
    onDelete,
}) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

     const title = isRTL ? name_ar : name_en;
    const city = isRTL ? city_ar : city_en;
    const type = isRTL ? type_ar : type_en;
    const building_type = isRTL ? building_type_ar : building_type_en;

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            isRTL ? "ar-EG" : "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    };

    return (
        <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border bg-white">

            {/* Image */}
            <div className="h-64 md:h-72 relative">

                <img
                    src={
                        typeof cover_image === "string"
                            ? cover_image
                            : cover_image
                                ? URL.createObjectURL(cover_image)
                                : "/images/placeholder.jpg"
                    }
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Status */}
                <div className="absolute top-3 right-3 z-10">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            status === "available"
                                ? "bg-green-700 text-white"
                                : "bg-red-500 text-white"
                        }`}
                    >
                        {status === "available"
                            ? "متاح"
                            : "منتهي"}
                    </span>
                </div>

            </div>

            {/* Info */}
            <div className="p-4">

                {/* Title */}
                <h3 className="text-md md:text-base font-semibold text-text mb-3 ">
                    {title}
                </h3>

                {/* Location */}
                <div className="flex flex-wrap gap-3 text-sm text-gray-600 ">
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
                        {units_count || 0} {t("units_label_short")}
                      </span>
                    </div>

            </div>



            {/* Actions */}
            <div className="flex items-center gap-2 p-2">

                {/* View */}
                <Link
                    to={`/dashboard/auctions-details/${id}`}
                    className="flex-1 bg-primary text-white text-center py-2 rounded-lg hover:bg-primary-dark transition text-sm font-medium"
                >
                    عرض التفاصيل
                </Link>

                {/* Edit */}
                <Link
                    to={`/dashboard/edit-auction/${id}`}
                    className="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                >
                    <FaEdit size={14} />
                </Link>

                {/* Delete */}
                <button
                    onClick={() => {
                        if (confirm("هل أنت متأكد من حذف هذا المزاد؟")) {
                            onDelete(id);
                        }
                    }}
                    className="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                    <FaTrash size={14} />
                </button>

            </div>

        </div>
    );
};

export default AuctionCardAdmin;

