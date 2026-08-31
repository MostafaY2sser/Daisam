import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../../../components/common/Loader";

const EditAuction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    const [form, setForm] = useState({
        name_ar: "",
        name_en: "",

        title_ar: "",
        title_en: "",

        city_ar: "",
        city_en: "",

        type_ar: "",
        type_en: "",

        building_type_ar: "",
        building_type_en: "",

        district_ar: "",
        district_en: "",

        location_ar: "",
        location_en: "",

        units_count: "",
        status: "available",

        description_ar: "",
        description_en: "",

        area: "",
        price: "",

        sold_units: "",
        available_units: "",

        cover_image: null,
        cover_image_url: "",

        gallery_images: [],
        gallery_images_urls: [],

        features_ar: [],
        features_en: [],

        unit_features_ar: [],
        unit_features_en: [],

        nearby_places_ar: [],
        nearby_places_en: [],

        guarantees: [],
    });

    // Inputs
    const [inputFeatureAr, setInputFeatureAr] = useState("");
    const [inputFeatureEn, setInputFeatureEn] = useState("");

    const [unitAr, setUnitAr] = useState("");
    const [unitEn, setUnitEn] = useState("");

    const [gTitleAr, setGTitleAr] = useState("");
    const [gTitleEn, setGTitleEn] = useState("");
    const [gValue, setGValue] = useState("");

    const [nearAr, setNearAr] = useState("");
    const [nearEn, setNearEn] = useState("");

    // =====================================
    // Fetch Auction
    // =====================================

    useEffect(() => {
        if (!id) return;

        const fetchAuction = async () => {
            setLoading(true);

            try {
                const { data, error } = await supabase
                    .from("Auctions")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;

                setForm({
                    name_ar: data.name_ar || "",
                    name_en: data.name_en || "",

                    title_ar: data.title_ar || "",
                    title_en: data.title_en || "",

                    city_ar: data.city_ar || "",
                    city_en: data.city_en || "",

                    type_ar: data.type_ar || "",
                    type_en: data.type_en || "",

                    building_type_ar: data.building_type_ar || "",
                    building_type_en: data.building_type_en || "",

                    district_ar: data.district_ar || "",
                    district_en: data.district_en || "",

                    location_ar: data.location_ar || "",
                    location_en: data.location_en || "",

                    units_count: data.units_count || "",
                    status: data.status || "available",

                    description_ar: data.description_ar || "",
                    description_en: data.description_en || "",

                    area: data.area || "",
                    price: data.price || "",

                    sold_units: data.sold_units || "",
                    available_units: data.available_units || "",

                    cover_image: null,
                    cover_image_url: data.cover_image || "",

                    gallery_images: [],
                    gallery_images_urls: Array.isArray(data.gallery_images)
                        ? data.gallery_images
                        : [],

                    features_ar: Array.isArray(data.features_ar)
                        ? data.features_ar
                        : [],

                    features_en: Array.isArray(data.features_en)
                        ? data.features_en
                        : [],

                    unit_features_ar: Array.isArray(data.unit_features_ar)
                        ? data.unit_features_ar
                        : [],

                    unit_features_en: Array.isArray(data.unit_features_en)
                        ? data.unit_features_en
                        : [],

                    nearby_places_ar: Array.isArray(data.nearby_places_ar)
                        ? data.nearby_places_ar
                        : [],

                    nearby_places_en: Array.isArray(data.nearby_places_en)
                        ? data.nearby_places_en
                        : [],

                    guarantees: Array.isArray(data.guarantees)
                        ? data.guarantees
                        : [],
                });
            } catch (err) {
                console.error(err);

                alert(
                    "حدث خطأ أثناء تحميل بيانات المزاد: " +
                    err.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, [id]);

    // =====================================
    // Handle Change
    // =====================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =====================================
    // Features
    // =====================================

    const addFeature = () => {
        if (!inputFeatureAr || !inputFeatureEn) return;

        setForm((prev) => ({
            ...prev,
            features_ar: [
                ...prev.features_ar,
                inputFeatureAr,
            ],
            features_en: [
                ...prev.features_en,
                inputFeatureEn,
            ],
        }));

        setInputFeatureAr("");
        setInputFeatureEn("");
    };

    const removeFeature = (i) => {
        setForm((prev) => ({
            ...prev,
            features_ar: prev.features_ar.filter(
                (_, idx) => idx !== i
            ),
            features_en: prev.features_en.filter(
                (_, idx) => idx !== i
            ),
        }));
    };

    // =====================================
    // Unit Features
    // =====================================

    const addUnitFeature = () => {
        if (!unitAr || !unitEn) return;

        setForm((prev) => ({
            ...prev,
            unit_features_ar: [
                ...prev.unit_features_ar,
                unitAr,
            ],
            unit_features_en: [
                ...prev.unit_features_en,
                unitEn,
            ],
        }));

        setUnitAr("");
        setUnitEn("");
    };

    const removeUnitFeature = (i) => {
        setForm((prev) => ({
            ...prev,
            unit_features_ar: prev.unit_features_ar.filter(
                (_, idx) => idx !== i
            ),
            unit_features_en: prev.unit_features_en.filter(
                (_, idx) => idx !== i
            ),
        }));
    };

    // =====================================
    // Guarantees
    // =====================================

    const addGuarantee = () => {
        if (!gTitleAr || !gTitleEn || !gValue) return;

        setForm((prev) => ({
            ...prev,
            guarantees: [
                ...prev.guarantees,
                {
                    name_ar: gTitleAr,
                    name_en: gTitleEn,
                    duration: gValue,
                },
            ],
        }));

        setGTitleAr("");
        setGTitleEn("");
        setGValue("");
    };

    const removeGuarantee = (i) => {
        setForm((prev) => ({
            ...prev,
            guarantees: prev.guarantees.filter(
                (_, idx) => idx !== i
            ),
        }));
    };

    // =====================================
    // Nearby Places
    // =====================================

    const addNearbyPlace = () => {
        if (!nearAr || !nearEn) return;

        setForm((prev) => ({
            ...prev,
            nearby_places_ar: [
                ...prev.nearby_places_ar,
                nearAr,
            ],
            nearby_places_en: [
                ...prev.nearby_places_en,
                nearEn,
            ],
        }));

        setNearAr("");
        setNearEn("");
    };

    const removeNearbyPlace = (i) => {
        setForm((prev) => ({
            ...prev,
            nearby_places_ar:
                prev.nearby_places_ar.filter(
                    (_, idx) => idx !== i
                ),

            nearby_places_en:
                prev.nearby_places_en.filter(
                    (_, idx) => idx !== i
                ),
        }));
    };

    // =====================================
    // Cover Image
    // =====================================

    const removeCurrentCover = () => {
        setForm((prev) => ({
            ...prev,
            cover_image_url: "",
        }));
    };

    // =====================================
    // Gallery
    // =====================================

    const removeExistingGalleryImage = (i) => {
        setForm((prev) => ({
            ...prev,
            gallery_images_urls:
                prev.gallery_images_urls.filter(
                    (_, idx) => idx !== i
                ),
        }));
    };

    const removeNewGalleryImage = (i) => {
        setForm((prev) => ({
            ...prev,
            gallery_images:
                prev.gallery_images.filter(
                    (_, idx) => idx !== i
                ),
        }));
    };

    // =====================================
    // Upload Image
    // =====================================

    const uploadImage = async (file, folder) => {
        const ext = file.name.split(".").pop();

        const fileName = `${folder}/${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}.${ext}`;

        const { error } = await supabase.storage
            .from("projects")
            .upload(fileName, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) throw error;

        const { data } = supabase.storage
            .from("projects")
            .getPublicUrl(fileName);

        return data.publicUrl;
    };

    // =====================================
    // Submit
    // =====================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitLoading(true);

        try {
            // ---------------------------------
            // Cover
            // ---------------------------------

            let finalCoverUrl = form.cover_image_url;

            if (form.cover_image) {
                finalCoverUrl = await uploadImage(
                    form.cover_image,
                    "auction-covers"
                );
            }

            // ---------------------------------
            // New Gallery
            // ---------------------------------

            const newGalleryUrls = await Promise.all(
                form.gallery_images.map((file) =>
                    uploadImage(
                        file,
                        "auction-gallery"
                    )
                )
            );

            // Existing + New
            const finalGalleryUrls = [
                ...form.gallery_images_urls,
                ...newGalleryUrls,
            ];

            // ---------------------------------
            // Payload
            // ---------------------------------

            const payload = {
                name_ar: form.name_ar,
                name_en: form.name_en,

                title_ar: form.title_ar,
                title_en: form.title_en,

                city_ar: form.city_ar,
                city_en: form.city_en,

                type_ar: form.type_ar,
                type_en: form.type_en,

                building_type_ar:
                    form.building_type_ar,

                building_type_en:
                    form.building_type_en,

                district_ar: form.district_ar,
                district_en: form.district_en,

                location_ar: form.location_ar,
                location_en: form.location_en,

                units_count:
                    Number(form.units_count) || 0,

                status: form.status,

                description_ar:
                    form.description_ar,

                description_en:
                    form.description_en,

                area: form.area,
                price: form.price,

                sold_units:
                    Number(form.sold_units) || 0,

                available_units:
                    Number(form.available_units) || 0,

                cover_image: finalCoverUrl,

                gallery_images:
                    finalGalleryUrls,

                features_ar:
                    form.features_ar,

                features_en:
                    form.features_en,

                unit_features_ar:
                    form.unit_features_ar,

                unit_features_en:
                    form.unit_features_en,

                nearby_places_ar:
                    form.nearby_places_ar,

                nearby_places_en:
                    form.nearby_places_en,

                guarantees:
                    form.guarantees,
            };

            const { error } = await supabase
                .from("Auctions")
                .update(payload)
                .eq("id", id);

            if (error) throw error;

            // Update React Query
            await queryClient.invalidateQueries({
                queryKey: ["auctions"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["auction", id],
            });

            alert("تم تعديل المزاد بنجاح");

            navigate(
                `/dashboard/admin/auctions`
            );
        } catch (err) {
            console.error(err);

            alert(
                "حدث خطأ أثناء تعديل المزاد: " +
                err.message
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    // =====================================
    // Loading
    // =====================================

    if (loading) {
        return <Loader />;
    }

    // =====================================
    // UI
    // =====================================

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">

            <div className="flex md:items-center justify-between mb-6 flex-col md:flex-row gap-3">

                <h2 className="text-2xl font-bold">
                    تعديل المزاد
                </h2>

                <div className="flex items-center gap-2 md:w-1/3">

                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                        حالة المزاد
                    </span>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="input"
                    >
                        <option value="available">
                            متاح
                        </option>

                        <option value="ended">
                            منتهي
                        </option>
                    </select>

                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* =====================================
                    Basic Info
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        البيانات الأساسية
                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">

                        <Field label="اسم المزاد بالعربي">
                            <input
                                name="name_ar"
                                value={form.name_ar}
                                placeholder="اسم المزاد"
                                onChange={handleChange}
                                className="input"
                                dir="rtl"
                                required
                            />
                        </Field>

                        <Field label="Auction Name English">
                            <input
                                name="name_en"
                                value={form.name_en}
                                placeholder="Auction name"
                                onChange={handleChange}
                                className="input"
                                required
                            />
                        </Field>

                        <Field label="عنوان المزاد بالعربي">
                            <input
                                name="title_ar"
                                value={form.title_ar}
                                placeholder="عنوان المزاد"
                                onChange={handleChange}
                                className="input"
                                dir="rtl"
                            />
                        </Field>

                        <Field label="Auction Title English">
                            <input
                                name="title_en"
                                value={form.title_en}
                                placeholder="Auction title"
                                onChange={handleChange}
                                className="input"
                            />
                        </Field>

                        <Field label="المدينة بالعربي">
                            <input
                                name="city_ar"
                                value={form.city_ar}
                                placeholder="الرياض"
                                onChange={handleChange}
                                className="input"
                                dir="rtl"
                            />
                        </Field>

                        <Field label="City English">
                            <input
                                name="city_en"
                                value={form.city_en}
                                placeholder="Riyadh"
                                onChange={handleChange}
                                className="input"
                            />
                        </Field>

                        <Field label="نوع العقار بالعربي">
                            <input
                                name="type_ar"
                                value={form.type_ar}
                                placeholder="سكني"
                                onChange={handleChange}
                                className="input"
                                dir="rtl"
                            />
                        </Field>

                        <Field label="Property Type English">
                            <input
                                name="type_en"
                                value={form.type_en}
                                placeholder="Residential"
                                onChange={handleChange}
                                className="input"
                            />
                        </Field>

                        <Field label="نوع المبنى بالعربي">
                            <input
                                name="building_type_ar"
                                value={form.building_type_ar}
                                placeholder="شقق"
                                onChange={handleChange}
                                className="input"
                                dir="rtl"
                            />
                        </Field>

                        <Field label="Building Type English">
                            <input
                                name="building_type_en"
                                value={form.building_type_en}
                                placeholder="Apartments"
                                onChange={handleChange}
                                className="input"
                            />
                        </Field>

                        <Field label="الحي بالعربي">
                            <input
                                name="district_ar"
                                value={form.district_ar}
                                placeholder="حي الحزم"
                                onChange={handleChange}
                                className="input"
                                dir="rtl"
                            />
                        </Field>

                        <Field label="District English">
                            <input
                                name="district_en"
                                value={form.district_en}
                                placeholder="Al Hazm District"
                                onChange={handleChange}
                                className="input"
                            />
                        </Field>

                        <Field label="الموقع بالعربي">
                            <input
                                name="location_ar"
                                value={form.location_ar}
                                placeholder="الرياض - حي الحزم"
                                onChange={handleChange}
                                className="input"
                                dir="rtl"
                            />
                        </Field>

                        <Field label="Location English">
                            <input
                                name="location_en"
                                value={form.location_en}
                                placeholder="Riyadh - Al Hazm District"
                                onChange={handleChange}
                                className="input"
                            />
                        </Field>

                        <Field label="المساحة">
                            <input
                                name="area"
                                value={form.area}
                                placeholder="360 - 238 m²"
                                onChange={handleChange}
                                className="input"
                            />
                        </Field>

                    </div>
                </div>

                {/* =====================================
                    Price & Units
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        السعر والوحدات
                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">

                        <Field label="عدد الوحدات">

                            <input
                                name="units_count"
                                value={form.units_count}
                                placeholder="عدد الوحدات"
                                onChange={handleChange}
                                className="input"
                                type="number"
                            />

                        </Field>

                        <Field label="السعر">

                            <input
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="بعد المعاينة"
                                className="input"
                                dir="rtl"
                            />

                        </Field>

                        <Field label="الوحدات المباعة">

                            <input
                                name="sold_units"
                                value={form.sold_units}
                                onChange={handleChange}
                                type="number"
                                className="input"
                            />

                        </Field>

                        <Field label="الوحدات المتاحة">

                            <input
                                name="available_units"
                                value={form.available_units}
                                onChange={handleChange}
                                type="number"
                                className="input"
                            />

                        </Field>

                    </div>

                </div>

                {/* =====================================
                    Description
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        الوصف
                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">

                        <Field label="الوصف بالعربي">

                            <textarea
                                name="description_ar"
                                value={form.description_ar}
                                placeholder="وصف المزاد"
                                onChange={handleChange}
                                className="input h-28"
                                dir="rtl"
                            />

                        </Field>

                        <Field label="Description English">

                            <textarea
                                name="description_en"
                                value={form.description_en}
                                placeholder="Auction description"
                                onChange={handleChange}
                                className="input h-28"
                            />

                        </Field>

                    </div>

                </div>

                {/* =====================================
                    Unit Features
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        مميزات الوحدات
                    </h3>

                    <div className="flex gap-2 mb-3">

                        <Field label="الميزة بالعربي">

                            <input
                                value={unitAr}
                                onChange={(e) =>
                                    setUnitAr(e.target.value)
                                }
                                placeholder="مثال: 3 غرف نوم"
                                className="input"
                                dir="rtl"
                            />

                        </Field>

                        <Field label="Unit Feature English">

                            <input
                                value={unitEn}
                                onChange={(e) =>
                                    setUnitEn(e.target.value)
                                }
                                placeholder="Example: 3 Master Bedrooms"
                                className="input"
                            />

                        </Field>

                        <div className="flex items-end">

                            <button
                                type="button"
                                onClick={addUnitFeature}
                                className="bg-primary text-white px-5 py-2.5 rounded-lg whitespace-nowrap"
                            >
                                إضافة
                            </button>

                        </div>

                    </div>

                    <ul className="space-y-2">

                        {form.unit_features_ar.map(
                            (f, i) => (
                                <li
                                    key={i}
                                    className="flex items-center bg-gray-50 border px-4 py-2 rounded-lg text-sm gap-3"
                                >

                                    <span
                                        dir="rtl"
                                        className="flex-1"
                                    >
                                        {f}
                                    </span>

                                    <span className="text-gray-300">
                                        |
                                    </span>

                                    <span className="flex-1">
                                        {form.unit_features_en[i]}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeUnitFeature(i)
                                        }
                                        className="text-red-400 hover:text-red-600 font-bold"
                                    >
                                        ✕
                                    </button>

                                </li>
                            )
                        )}

                    </ul>

                </div>

                {/* =====================================
                    Features
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        المميزات
                    </h3>

                    <div className="flex gap-2 mb-3">

                        <Field label="الميزة بالعربي">

                            <input
                                value={inputFeatureAr}
                                onChange={(e) =>
                                    setInputFeatureAr(
                                        e.target.value
                                    )
                                }
                                placeholder="مثال: تكييف"
                                className="input"
                                dir="rtl"
                            />

                        </Field>

                        <Field label="Feature English">

                            <input
                                value={inputFeatureEn}
                                onChange={(e) =>
                                    setInputFeatureEn(
                                        e.target.value
                                    )
                                }
                                placeholder="Example: Air Conditioning"
                                className="input"
                            />

                        </Field>

                        <div className="flex items-end">

                            <button
                                type="button"
                                onClick={addFeature}
                                className="bg-primary text-white px-5 py-2.5 rounded-lg whitespace-nowrap"
                            >
                                إضافة
                            </button>

                        </div>

                    </div>

                    <ul className="space-y-2">

                        {form.features_ar.map(
                            (f, i) => (
                                <li
                                    key={i}
                                    className="flex items-center bg-gray-50 border px-4 py-2 rounded-lg text-sm gap-3"
                                >

                                    <span
                                        dir="rtl"
                                        className="flex-1"
                                    >
                                        {f}
                                    </span>

                                    <span className="text-gray-300">
                                        |
                                    </span>

                                    <span className="flex-1">
                                        {form.features_en[i]}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFeature(i)
                                        }
                                        className="text-red-400 hover:text-red-600 font-bold"
                                    >
                                        ✕
                                    </button>

                                </li>
                            )
                        )}

                    </ul>

                </div>

                {/* =====================================
                    Nearby Places
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        الأماكن القريبة
                    </h3>

                    <div className="flex gap-2 mb-3">

                        <Field label="المكان بالعربي">

                            <input
                                value={nearAr}
                                onChange={(e) =>
                                    setNearAr(e.target.value)
                                }
                                placeholder="مثال: قريب من المطاعم"
                                className="input"
                                dir="rtl"
                            />

                        </Field>

                        <Field label="Nearby Place English">

                            <input
                                value={nearEn}
                                onChange={(e) =>
                                    setNearEn(e.target.value)
                                }
                                placeholder="Example: Close to restaurants"
                                className="input"
                            />

                        </Field>

                        <div className="flex items-end">

                            <button
                                type="button"
                                onClick={addNearbyPlace}
                                className="bg-primary text-white px-5 py-2.5 rounded-lg"
                            >
                                إضافة
                            </button>

                        </div>

                    </div>

                    <ul className="space-y-2">

                        {form.nearby_places_ar.map(
                            (p, i) => (
                                <li
                                    key={i}
                                    className="flex items-center bg-gray-50 border px-4 py-2 rounded-lg text-sm gap-3"
                                >

                                    <span
                                        dir="rtl"
                                        className="flex-1"
                                    >
                                        {p}
                                    </span>

                                    <span className="text-gray-300">
                                        |
                                    </span>

                                    <span className="flex-1">
                                        {form.nearby_places_en[i]}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeNearbyPlace(i)
                                        }
                                        className="text-red-400 hover:text-red-600 font-bold"
                                    >
                                        ✕
                                    </button>

                                </li>
                            )
                        )}

                    </ul>

                </div>

                {/* =====================================
                    Guarantees
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        الضمانات
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4 mb-3">

                        <Field label="الضمان بالعربي">

                            <input
                                value={gTitleAr}
                                onChange={(e) =>
                                    setGTitleAr(e.target.value)
                                }
                                placeholder="الهيكل الإنشائي"
                                className="input"
                                dir="rtl"
                            />

                        </Field>

                        <Field label="Guarantee English">

                            <input
                                value={gTitleEn}
                                onChange={(e) =>
                                    setGTitleEn(e.target.value)
                                }
                                placeholder="Structural Structure"
                                className="input"
                            />

                        </Field>

                        <Field label="المدة">

                            <input
                                value={gValue}
                                onChange={(e) =>
                                    setGValue(e.target.value)
                                }
                                placeholder="10 سنة"
                                className="input"
                            />

                        </Field>

                    </div>

                    <button
                        type="button"
                        onClick={addGuarantee}
                        className="bg-primary text-white px-4 py-2 rounded-lg mb-3"
                    >
                        إضافة ضمان
                    </button>

                    <ul className="space-y-2">

                        {form.guarantees.map(
                            (g, i) => (
                                <li
                                    key={i}
                                    className="flex items-center bg-gray-50 border px-4 py-2 rounded-lg text-sm gap-3"
                                >

                                    <span
                                        dir="rtl"
                                        className="flex-1"
                                    >
                                        {g.name_ar}
                                    </span>

                                    <span className="text-gray-300">
                                        |
                                    </span>

                                    <span className="flex-1">
                                        {g.name_en}
                                    </span>

                                    <span className="text-primary font-semibold">
                                        {g.duration}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeGuarantee(i)
                                        }
                                        className="text-red-400 hover:text-red-600 font-bold"
                                    >
                                        ✕
                                    </button>

                                </li>
                            )
                        )}

                    </ul>

                </div>

                {/* =====================================
                    Cover Image
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        الصورة الرئيسية
                    </h3>

                    {/* Current Cover */}

                    {form.cover_image_url && !form.cover_image && (

                        <div className="mb-5">

                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                                الصورة الحالية
                            </p>

                            <div className="relative w-fit">

                                <img
                                    src={form.cover_image_url}
                                    alt="current cover"
                                    className="w-48 h-32 object-cover rounded-lg"
                                />

                                <button
                                    type="button"
                                    onClick={removeCurrentCover}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                                >
                                    ✕
                                </button>

                            </div>

                        </div>

                    )}

                    <Field label="رفع صورة جديدة">

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {

                                const file =
                                    e.target.files[0];

                                if (file) {
                                    setForm((prev) => ({
                                        ...prev,
                                        cover_image: file,
                                    }));
                                }

                            }}
                            className="input"
                        />

                    </Field>

                    {/* New Cover */}

                    {form.cover_image && (

                        <div className="mt-3 relative w-fit">

                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                                الصورة الجديدة
                            </p>

                            <img
                                src={URL.createObjectURL(
                                    form.cover_image
                                )}
                                alt="new cover"
                                className="w-48 h-32 object-cover rounded-lg"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        cover_image: null,
                                    }))
                                }
                                className="absolute top-6 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                            >
                                ✕
                            </button>

                        </div>

                    )}

                </div>

                {/* =====================================
                    Gallery
                ====================================== */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="font-semibold text-lg mb-5 text-primary">
                        صور المعرض
                    </h3>

                    {/* Existing Gallery */}

                    {form.gallery_images_urls.length > 0 && (

                        <div className="mb-5">

                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                                الصور الحالية
                            </p>

                            <div className="grid grid-cols-3 gap-3">

                                {form.gallery_images_urls.map(
                                    (url, i) => (

                                        <div
                                            key={i}
                                            className="relative"
                                        >

                                            <img
                                                src={url}
                                                className="w-full h-24 object-cover rounded-lg"
                                                alt={`gallery-${i}`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeExistingGalleryImage(
                                                        i
                                                    )
                                                }
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                    <Field label="رفع صور جديدة">

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {

                                const files =
                                    Array.from(
                                        e.target.files
                                    );

                                setForm((prev) => ({
                                    ...prev,
                                    gallery_images: [
                                        ...prev.gallery_images,
                                        ...files,
                                    ],
                                }));

                            }}
                            className="input"
                        />

                    </Field>

                    {/* New Gallery */}

                    {form.gallery_images.length > 0 && (

                        <div className="mt-4">

                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                                الصور الجديدة
                            </p>

                            <div className="grid grid-cols-3 gap-3">

                                {form.gallery_images.map(
                                    (img, i) => (

                                        <div
                                            key={i}
                                            className="relative"
                                        >

                                            <img
                                                src={URL.createObjectURL(
                                                    img
                                                )}
                                                className="w-full h-24 object-cover rounded-lg"
                                                alt={`new-gallery-${i}`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeNewGalleryImage(
                                                        i
                                                    )
                                                }
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                </div>

                {/* =====================================
                    Submit
                ====================================== */}

                <button
                    type="submit"
                    disabled={submitLoading}
                    className="bg-primary text-white px-6 py-3 rounded-lg w-full font-semibold text-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >

                    {submitLoading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5"
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

                            جاري حفظ التعديلات...

                        </>
                    ) : (
                        "حفظ تعديلات المزاد"
                    )}

                </button>

            </form>
        </div>
    );
};


// =====================================
// Reusable Field
// =====================================

const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1 flex-1">

        <label className="text-base font-medium tracking-widest text-gray-700">
            {label}
        </label>

        {children}

    </div>
);

export default EditAuction;