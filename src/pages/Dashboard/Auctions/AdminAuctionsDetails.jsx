import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";


import {
    FaRulerCombined,
    FaCheckCircle,
    FaEdit,
    FaTrash,
    FaArrowRight,
    FaArrowLeft,
} from "react-icons/fa";

import { IoClose } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";

import { supabase } from "../../../lib/supabase";
import Loader from "../../../components/common/Loader";

const AdminAuctionsDetails = () => {
    const { t, i18n } = useTranslation();
    const queryClient = useQueryClient();

    const isRTL = i18n.language === "ar";

    const { id } = useParams();
    const navigate = useNavigate();

    const [auction, setAuction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [lightboxIndex, setLightboxIndex] = useState(null);

    // ==========================================
    // Fetch Auction
    // ==========================================

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
                console.error(
                    "Error fetching auction:",
                    err.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, [id]);

    // ==========================================
    // Loading / Not Found
    // ==========================================

    if (loading) {
        return <Loader />;
    }

    if (!auction) {
        return (
            <div className="text-center py-20">
                المزاد غير موجود
            </div>
        );
    }

    // ==========================================
    // Safe Arrays
    // ==========================================

    const safeArray = (value) =>
        Array.isArray(value) ? value : [];

    const galleryImages = safeArray(
        auction.gallery_images
    );

    const unitFeaturesAr = safeArray(
        auction.unit_features_ar
    );

    const unitFeaturesEn = safeArray(
        auction.unit_features_en
    );

    const featuresAr = safeArray(
        auction.features_ar
    );

    const featuresEn = safeArray(
        auction.features_en
    );

    const nearbyPlacesAr = safeArray(
        auction.nearby_places_ar
    );

    const nearbyPlacesEn = safeArray(
        auction.nearby_places_en
    );

    const guarantees = safeArray(
        auction.guarantees
    );

    // ==========================================
    // Date
    // ==========================================

    const formattedDate = auction.created_at
        ? new Date(
              auction.created_at
          ).toLocaleDateString(
              isRTL ? "ar-SA" : "en-GB",
              {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
              }
          )
        : "-";

    // ==========================================
    // Status
    // ==========================================

    const statusColor =
        auction.status === "available"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600";

    const statusLabel =
        auction.status === "available"
            ? isRTL
                ? "متاح"
                : "Available"
            : isRTL
                ? "منتهي"
                : "Ended";

    // ==========================================
    // Actions
    // ==========================================

    const handleEdit = () => {
        navigate(
            `/dashboard/edit-auction/${auction.id}`
        );
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            isRTL
                ? "هل أنت متأكد من حذف هذا المزاد؟"
                : "Are you sure you want to delete this auction?"
        );

        if (!confirmed) return;

        setDeleteLoading(true);

        try {
            const { error } = await supabase
                .from("Auctions")
                .delete()
                .eq("id", auction.id);

            if (error) throw error;

            await queryClient.invalidateQueries({
                queryKey: ["auctions"],
            });

            navigate(
                "/dashboard/admin/auctions"
            );
        } catch (err) {
            console.error(err);

            alert(
                "❌ " + err.message
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="bg-secondary min-h-screen">

            {/* =====================================
                Hero
            ====================================== */}

            <div className="relative h-[300px] md:h-[400px]">

                <img
                    src={auction.cover_image}
                    className="w-full h-full object-cover"
                    alt="auction cover"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">

                    <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
                        {isRTL
                            ? auction.name_ar
                            : auction.name_en}
                    </h1>

                    <span
                        className={`text-sm font-semibold px-4 py-1 rounded-full ${statusColor}`}
                    >
                        {statusLabel}
                    </span>

                </div>

            </div>

            <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">

                {/* =====================================
                    Admin Action Bar
                ====================================== */}

                <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow">

                    <div>

                        <p className="text-gray-400 uppercase tracking-widest mb-0.5">
                            {isRTL
                                ? "لوحة التحكم"
                                : "Admin Panel"}
                        </p>

                        <h2 className="text-lg md:text-xl font-bold text-gray-800">
                            {isRTL
                                ? auction.name_ar
                                : auction.name_en}
                        </h2>

                    </div>

                    <div className="flex gap-3">

                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
                        >
                            <FaEdit />

                            {isRTL
                                ? "تعديل"
                                : "Edit"}
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
                        >
                            {deleteLoading ? (
                                <svg
                                    className="animate-spin h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />

                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    />
                                </svg>
                            ) : (
                                <FaTrash />
                            )}

                            {isRTL
                                ? "حذف"
                                : "Delete"}
                        </button>

                    </div>

                </div>

                {/* =====================================
                    Basic Info
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl md:text-2xl font-bold mb-5">
                        {isRTL
                            ? "بيانات المزاد"
                            : "Auction Information"}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "اسم المزاد:"
                                    : "Auction Name:"}
                            </strong>{" "}
                            {isRTL
                                ? auction.name_ar
                                : auction.name_en}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "العنوان:"
                                    : "Title:"}
                            </strong>{" "}
                            {isRTL
                                ? auction.title_ar
                                : auction.title_en}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "الموقع:"
                                    : "Location:"}
                            </strong>{" "}
                            {isRTL
                                ? auction.location_ar
                                : auction.location_en}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "المدينة:"
                                    : "City:"}
                            </strong>{" "}
                            {isRTL
                                ? auction.city_ar
                                : auction.city_en}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "الحي:"
                                    : "District:"}
                            </strong>{" "}
                            {isRTL
                                ? auction.district_ar
                                : auction.district_en}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "نوع العقار:"
                                    : "Property Type:"}
                            </strong>{" "}
                            {isRTL
                                ? auction.type_ar
                                : auction.type_en}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "نوع المبنى:"
                                    : "Building Type:"}
                            </strong>{" "}
                            {isRTL
                                ? auction.building_type_ar
                                : auction.building_type_en}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "السعر:"
                                    : "Price:"}
                            </strong>{" "}
                            {auction.price || "-"}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "عدد الوحدات:"
                                    : "Units Count:"}
                            </strong>{" "}
                            {auction.units_count ?? 0}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "الوحدات المتاحة:"
                                    : "Available Units:"}
                            </strong>{" "}
                            {auction.available_units ?? 0}
                        </p>

                        <p className="md:text-lg">
                            <strong className="text-primary">
                                {isRTL
                                    ? "الوحدات المباعة:"
                                    : "Sold Units:"}
                            </strong>{" "}
                            {auction.sold_units ?? 0}
                        </p>

                        <p className="md:text-lg">

                            <strong className="text-primary">
                                {isRTL
                                    ? "الحالة:"
                                    : "Status:"}
                            </strong>{" "}

                            <span
                                className={`px-2 py-0.5 rounded-full text-base font-semibold ${statusColor}`}
                            >
                                {statusLabel}
                            </span>

                        </p>

                        <p className="md:text-lg">

                            <strong className="text-primary">
                                {isRTL
                                    ? "رقم المزاد:"
                                    : "Auction ID:"}
                            </strong>{" "}

                            #{auction.id}

                        </p>

                    </div>

                    {/* Date */}

                    <div
                        className={`flex items-center gap-2 mt-5 pt-5 border-t text-sm text-gray-500 ${
                            isRTL
                                ? "flex-row-reverse"
                                : ""
                        }`}
                    >

                        <FiCalendar className="text-primary text-base shrink-0" />

                        <span>
                            {isRTL
                                ? "تاريخ الإضافة:"
                                : "Added on:"}{" "}

                            <span className="font-semibold text-gray-700">
                                {formattedDate}
                            </span>
                        </span>

                    </div>

                </div>

                {/* =====================================
                    Description
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl md:text-2xl font-bold mb-5">
                        {isRTL
                            ? "وصف المزاد"
                            : "Auction Description"}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <p className="text-xs text-gray-400 mb-1 font-semibold uppercase">
                                AR
                            </p>

                            <p
                                className="text-gray-700 leading-relaxed text-sm"
                                dir="rtl"
                            >
                                {auction.description_ar ||
                                    "-"}
                            </p>

                        </div>

                        <div>

                            <p className="text-xs text-gray-400 mb-1 font-semibold uppercase">
                                EN
                            </p>

                            <p className="text-gray-700 leading-relaxed text-sm">
                                {auction.description_en ||
                                    "-"}
                            </p>

                        </div>

                    </div>

                </div>

                {/* =====================================
                    Unit Details
                ====================================== */}

                {(auction.area ||
                    unitFeaturesAr.length > 0) && (

                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <h2 className="text-xl md:text-2xl font-bold mb-6">
                            {isRTL
                                ? "تفاصيل الوحدات"
                                : "Unit Details"}
                        </h2>

                        {auction.area && (
                            <div className="flex items-center gap-3 bg-primary text-white p-4 rounded-xl mb-6 w-fit">

                                <FaRulerCombined className="text-lg" />

                                <span className="font-semibold">
                                    {isRTL
                                        ? "المساحة:"
                                        : "Area:"}{" "}
                                    {auction.area}
                                </span>

                            </div>
                        )}

                        {unitFeaturesAr.length > 0 && (

                            <div className="grid sm:grid-cols-2 gap-3">

                                {unitFeaturesAr.map(
                                    (feature, index) => (

                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-gray-50 border p-3 rounded-lg"
                                        >

                                            <div className="flex items-center gap-2">

                                                <FaCheckCircle className="text-primary text-base shrink-0" />

                                                <span
                                                    className="text-sm font-semibold text-gray-700"
                                                    dir="rtl"
                                                >
                                                    {feature}
                                                </span>

                                            </div>

                                            <span className="text-sm text-gray-500 ml-3">
                                                {unitFeaturesEn[index]}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>
                )}

                {/* =====================================
                    Features
                ====================================== */}

                {featuresAr.length > 0 && (

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl md:text-2xl font-bold mb-5">
                            {isRTL
                                ? "المميزات"
                                : "Features"}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-3">

                            {featuresAr.map(
                                (feature, index) => (

                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-100 p-3 rounded-lg text-sm"
                                    >

                                        <span
                                            dir="rtl"
                                            className="font-medium"
                                        >
                                            {feature}
                                        </span>

                                        <span className="text-gray-500">
                                            {featuresEn[index]}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </div>
                )}

                {/* =====================================
                    Nearby Places
                ====================================== */}

                {nearbyPlacesAr.length > 0 && (

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl md:text-2xl font-bold mb-5">
                            {isRTL
                                ? "الأماكن القريبة"
                                : "Nearby Places"}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-3">

                            {nearbyPlacesAr.map(
                                (place, index) => (

                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-100 p-3 rounded-lg text-sm"
                                    >

                                        <span
                                            dir="rtl"
                                            className="font-medium"
                                        >
                                            {place}
                                        </span>

                                        <span className="text-gray-500">
                                            {nearbyPlacesEn[index]}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </div>
                )}

                {/* =====================================
                    Guarantees
                ====================================== */}

                {guarantees.length > 0 && (

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl md:text-2xl font-bold mb-5">
                            {isRTL
                                ? "الضمانات"
                                : "Guarantees"}
                        </h2>

                        <div className="grid md:grid-cols-3 gap-4">

                            {guarantees.map(
                                (guarantee, index) => (

                                    <div
                                        key={index}
                                        className="border p-4 rounded-xl space-y-2"
                                    >

                                        <p
                                            className="font-semibold text-sm"
                                            dir="rtl"
                                        >
                                            {guarantee.name_ar}
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            {guarantee.name_en}
                                        </p>

                                        <p className="text-primary font-bold">
                                            {guarantee.duration}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </div>
                )}

                {/* =====================================
                    Gallery
                ====================================== */}

                {galleryImages.length > 0 && (

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl md:text-2xl font-bold mb-5">
                            {isRTL
                                ? "صور المزاد"
                                : "Auction Gallery"}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                            {galleryImages.map(
                                (image, index) => (

                                    <div
                                        key={index}
                                        className="relative group cursor-pointer"
                                        onClick={() =>
                                            setLightboxIndex(
                                                index
                                            )
                                        }
                                    >

                                        <img
                                            src={image}
                                            alt={`gallery-${index}`}
                                            className="rounded-lg w-full h-32 sm:h-48 object-cover transition group-hover:brightness-50"
                                            loading="lazy"
                                        />

                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition">

                                            <span className="text-white font-bold text-lg">
                                                {isRTL
                                                    ? "عرض الصورة"
                                                    : "View Image"}
                                            </span>

                                            <span className="text-white/70 text-sm">
                                                {index + 1} /{" "}
                                                {galleryImages.length}
                                            </span>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>
                )}

            </div>

            {/* =====================================
                Lightbox
            ====================================== */}

            {lightboxIndex !== null && (

                <div className="fixed inset-0 bg-black/80 z-[1111111] flex items-center justify-center">

                    {/* Previous */}

                    <button
                        className="absolute left-0 sm:left-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
                        onClick={() =>
                            setLightboxIndex(
                                (prev) =>
                                    prev === 0
                                        ? galleryImages.length - 1
                                        : prev - 1
                            )
                        }
                    >
                        <FaArrowLeft />
                    </button>

                    {/* Next */}

                    <button
                        className="absolute right-0 sm:right-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
                        onClick={() =>
                            setLightboxIndex(
                                (prev) =>
                                    prev ===
                                    galleryImages.length - 1
                                        ? 0
                                        : prev + 1
                            )
                        }
                    >
                        <FaArrowRight />
                    </button>

                    {/* Image */}

                    <img
                        src={
                            galleryImages[
                                lightboxIndex
                            ]
                        }
                        className="object-contain rounded-lg max-h-[90vh] md:max-w-[90vw]"
                        alt="lightbox"
                        loading="lazy"
                    />

                    {/* Counter */}

                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-1 rounded-full text-sm">
                        {lightboxIndex + 1} /{" "}
                        {galleryImages.length}
                    </span>

                    {/* Close */}

                    <button
                        className="absolute top-5 right-5 text-white bg-primary rounded-full p-4 md:text-3xl font-bold"
                        onClick={() =>
                            setLightboxIndex(null)
                        }
                    >
                        <IoClose />
                    </button>

                </div>
            )}

        </div>
    );
};

export default AdminAuctionsDetails;