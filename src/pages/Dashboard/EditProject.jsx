import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Loader from "../../components/common/Loader";
import { useTranslation } from "react-i18next";

const EditProject = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading]       = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [form, setForm] = useState({
    name_ar: "", name_en: "",
    title_ar: "", title_en: "",
    city_ar: "", city_en: "",
    type_ar: "", type_en: "",
    building_type_ar: "", building_type_en: "",
    district_ar: "", district_en: "",
    location_ar: "", location_en: "",
    units_count: "", status: "available",
    description_ar: "", description_en: "",
    area: "",
    features_ar: [], features_en: [],
    unit_features_ar: [], unit_features_en: [],
    guarantees: [],
    cover_image: null,
    cover_image_url: "",
    gallery_images: [],
    gallery_images_urls: [],
    price: "",
    sold_units: "",
    available_units: "",
    nearby_places_ar: [],
    nearby_places_en: [],
  });

  // ── input states for dynamic lists ────────────────────────────────────────
  const [inputFeatureAr, setInputFeatureAr] = useState("");
  const [inputFeatureEn, setInputFeatureEn] = useState("");
  const [unitAr, setUnitAr]                 = useState("");
  const [unitEn, setUnitEn]                 = useState("");
  const [gTitleAr, setGTitleAr]             = useState("");
  const [gTitleEn, setGTitleEn]             = useState("");
  const [gValue, setGValue]                 = useState("");
  const [nearAr, setNearAr] = useState("");
  const [nearEn, setNearEn] = useState("");


  // ── Fetch project from Supabase ───────────────────────────────────────────
  useEffect(() => {
  if (!id) return;

  const fetchProject = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setForm((prev) => ({
        ...prev,
        ...data,
        features_ar: Array.isArray(data.features_ar) ? data.features_ar : [],
        features_en: Array.isArray(data.features_en) ? data.features_en : [],
        unit_features_ar: Array.isArray(data.unit_features_ar) ? data.unit_features_ar : [],
        unit_features_en: Array.isArray(data.unit_features_en) ? data.unit_features_en : [],
        guarantees: Array.isArray(data.guarantees) ? data.guarantees : [],
        nearby_places_ar: Array.isArray(data.nearby_places_ar) ? data.nearby_places_ar : [],
        nearby_places_en: Array.isArray(data.nearby_places_en) ? data.nearby_places_en : [],
        price: data.price || "",
        sold_units: data.sold_units || "",
        available_units: data.available_units || "",
        cover_image: null,
        cover_image_url: data.cover_image ?? "",
        gallery_images: [],
        gallery_images_urls: Array.isArray(data.gallery_images) ? data.gallery_images : [],
      }));

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProject();
}, [id]);



  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };



  // Features :---------------
  const addFeature = () => {
    if (!inputFeatureAr || !inputFeatureEn) return;
    setForm((prev) => ({
      ...prev,
      features_ar: [...prev.features_ar, inputFeatureAr],
      features_en: [...prev.features_en, inputFeatureEn],
    }));
    setInputFeatureAr(""); setInputFeatureEn("");
  };
  const removeFeature = (i) =>
    setForm((prev) => ({
      ...prev,
      features_ar: prev.features_ar.filter((_, idx) => idx !== i),
      features_en: prev.features_en.filter((_, idx) => idx !== i),
    }));
  // Features :---------------


    // Unit Features :---------------
    const addUnitFeature = () => {
      if (!unitAr || !unitEn) return;
      setForm((prev) => ({
        ...prev,
        unit_features_ar: [...prev.unit_features_ar, unitAr],
        unit_features_en: [...prev.unit_features_en, unitEn],
      }));
      setUnitAr(""); setUnitEn("");
    };
    const removeUnitFeature = (i) =>
      setForm((prev) => ({
        ...prev,
        unit_features_ar: prev.unit_features_ar.filter((_, idx) => idx !== i),
        unit_features_en: prev.unit_features_en.filter((_, idx) => idx !== i),
      }));
    // Unit Features :---------------

    //  Nearby Place :---------------
    const addNearbyPlace = () => {
      if (!nearAr || !nearEn) return;
      setForm((prev) => ({
        ...prev,
        nearby_places_ar: [...prev.nearby_places_ar, nearAr],
        nearby_places_en: [...prev.nearby_places_en, nearEn],
      }));
      setNearAr("");
      setNearEn("");
    };
    const removeNearbyPlace = (i) => {
      setForm((prev) => ({
        ...prev,
        nearby_places_ar: prev.nearby_places_ar.filter((_, idx) => idx !== i),
        nearby_places_en: prev.nearby_places_en.filter((_, idx) => idx !== i),
      }));
    };
    //  Nearby Place :---------------


  // Guarantees :---------------
  const addGuarantee = () => {
    if (!gTitleAr || !gTitleEn || !gValue) return;
    setForm((prev) => ({
      ...prev,
      guarantees: [...prev.guarantees, { title_ar: gTitleAr, title_en: gTitleEn, value: gValue }],
    }));
    setGTitleAr(""); setGTitleEn(""); setGValue("");
  };
  const removeGuarantee = (i) =>
    setForm((prev) => ({ ...prev, guarantees: prev.guarantees.filter((_, idx) => idx !== i) }));
  // Guarantees :---------------


  // Gallery :---------------
  const removeExistingGalleryImage = (i) =>
    setForm((prev) => ({ ...prev, gallery_images_urls: prev.gallery_images_urls.filter((_, idx) => idx !== i) }));
  const removeNewGalleryImage = (i) =>
    setForm((prev) => ({ ...prev, gallery_images: prev.gallery_images.filter((_, idx) => idx !== i) }));
  // Gallery :---------------


  // ── Upload helper ─────────────────────────────────────────────────────────
  const uploadImage = async (file, folder) => {
    const ext      = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("projects")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from("projects").getPublicUrl(fileName);
    return data.publicUrl;
  };



  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      // 1. Upload new cover if changed
      let finalCoverUrl = form.cover_image_url;
      if (form.cover_image) {
        finalCoverUrl = await uploadImage(form.cover_image, "covers");
      }

      // 2. Upload new gallery images
      const newGalleryUrls = await Promise.all(
        form.gallery_images.map((file) => uploadImage(file, "gallery"))
      );

      // 3. Merge existing + new gallery URLs
      const finalGalleryUrls = [...form.gallery_images_urls, ...newGalleryUrls];

      // 4. Build payload
      const payload = {
        name_ar:          form.name_ar,
        name_en:          form.name_en,
        title_ar:         form.title_ar,
        title_en:         form.title_en,
        city_ar:          form.city_ar,
        city_en:          form.city_en,
        type_ar:          form.type_ar,
        type_en:          form.type_en,
        building_type_ar: form.building_type_ar,
        building_type_en: form.building_type_en,
        district_ar:      form.district_ar,
        district_en:      form.district_en,
        location_ar:      form.location_ar,
        location_en:      form.location_en,
        units_count:      Number(form.units_count),
        status:           form.status,
        description_ar:   form.description_ar,
        description_en:   form.description_en,
        area:             form.area,
        features_ar:      form.features_ar,
        features_en:      form.features_en,
        unit_features_ar: form.unit_features_ar,
        unit_features_en: form.unit_features_en,
        guarantees:       form.guarantees,
        cover_image:      finalCoverUrl,
        gallery_images:   finalGalleryUrls,
        price: form.price,
        sold_units: Number(form.sold_units) || 0,
        available_units: Number(form.available_units) || 0,
        nearby_places_ar: form.nearby_places_ar,
        nearby_places_en: form.nearby_places_en,
      };

      const { error } = await supabase.from("projects").update(payload).eq("id", id);
      if (error) throw error;

      alert(t("project_updated_success"));
      navigate(`/dashboard/project-details/${id}`);
    } catch (err) {
      console.error(err);
      alert(t("project_add_error") + err.message);
    } finally {
      setSubmitLoading(false);
    }
  };


  if (loading) return <Loader />;

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      <div className="flex md:items-center justify-between mb-6 flex-col md:flex-row gap-2">
        <h2 className="text-2xl font-bold">{t("edit_project_title")}</h2>
        <div className="flex items-center gap-2 md:w-1/3">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{t("status_label_inline")}</span>
          <select name="status" value={form.status} onChange={handleChange} className="input">
            <option value="available">{t("status_available")}</option>
            <option value="sold">{t("status_sold")}</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── Basic Info ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">{t("basic_info")}</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label={t("project_name_ar")}>
              <input name="name_ar" value={form.name_ar} placeholder={t("ph_project_name_ar")} onChange={handleChange} className="input" dir="rtl" required />
            </Field>
            <Field label={t("project_name_en")}>
              <input name="name_en" value={form.name_en} placeholder={t("ph_project_name_en")} onChange={handleChange} className="input" required />
            </Field>

            <Field label={t("project_title_ar")}>
              <input name="title_ar" value={form.title_ar} placeholder={t("ph_title_ar")} onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label={t("project_title_en")}>
              <input name="title_en" value={form.title_en} placeholder={t("ph_title_en")} onChange={handleChange} className="input" />
            </Field>

            <Field label={t("city_ar_label")}>
              <input name="city_ar" value={form.city_ar} placeholder={t("ph_city_ar")} onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label={t("city_en_label")}>
              <input name="city_en" value={form.city_en} placeholder={t("ph_city_en")} onChange={handleChange} className="input" />
            </Field>

            <Field label={t("type_ar_label")}>
              <input name="type_ar" value={form.type_ar} placeholder={t("ph_type_ar")} onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label={t("type_en_label")}>
              <input name="type_en" value={form.type_en} placeholder={t("ph_type_en")} onChange={handleChange} className="input" />
            </Field>

            <Field label={t("building_type_ar_label")}>
              <input name="building_type_ar" value={form.building_type_ar} placeholder={t("ph_building_type_ar")} onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label={t("building_type_en_label")}>
              <input name="building_type_en" value={form.building_type_en} placeholder={t("ph_building_type_en")} onChange={handleChange} className="input" />
            </Field>

            <Field label={t("district_ar_label")}>
              <input name="district_ar" value={form.district_ar} placeholder={t("ph_district_ar")} onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label={t("district_en_label")}>
              <input name="district_en" value={form.district_en} placeholder={t("ph_district_en")} onChange={handleChange} className="input" />
            </Field>

            <Field label={t("location_ar_label")}>
              <input name="location_ar" value={form.location_ar} placeholder={t("ph_location_ar")} onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label={t("location_en_label")}>
              <input name="location_en" value={form.location_en} placeholder={t("ph_location_en")} onChange={handleChange} className="input" />
            </Field>

            <Field label={t("area_label")}>
              <input name="area" value={form.area} placeholder={t("ph_area")} onChange={handleChange} className="input" />
            </Field>
            <Field label={t("units_count_label_input")}>
              <input name="units_count" value={form.units_count} type="number" placeholder={t("ph_units_count")} onChange={handleChange} className="input" />
            </Field>
          </div>

          {/*  Price & Units */}
          <div className="bg-white  mt-4">
            {/* <h3 className="font-semibold text-base mb-3 text-text">Price & Units</h3> */}

            <div className="grid md:grid-cols-3 gap-5">
              <Field label={t("price_label")}>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="input"
                  dir="rtl"
                />
              </Field>

              <Field label={t("sold_units_input")}>
                <input
                  name="sold_units"
                  value={form.sold_units}
                  onChange={handleChange}
                  type="number"
                  className="input"
                />
              </Field>

              <Field label={t("available_units_input")}>
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
          {/*  Price & Units */}
        </div>
        {/* ── Basic Info ── */}


        {/* ── Description ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">{t("description_title")}</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label={t("description_ar_label")}>
              <textarea name="description_ar" value={form.description_ar} placeholder={t("ph_desc_ar")} onChange={handleChange} className="input h-64" dir="rtl" />
            </Field>
            <Field label={t("description_en_label")}>
              <textarea name="description_en" value={form.description_en} placeholder={t("ph_desc_en")} onChange={handleChange} className="input h-64" />
            </Field>
          </div>
        </div>
        {/* ── Description ── */}


        {/* ── Features ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">{t("features_title")}</h3>
          <div className="flex gap-2 mb-3">
            <Field label={t("feature_ar_label")}>
              <input value={inputFeatureAr} onChange={(e) => setInputFeatureAr(e.target.value)} placeholder={t("ph_feature_ar")} className="input" dir="rtl" />
            </Field>
            <Field label={t("feature_en_label")}>
              <input value={inputFeatureEn} onChange={(e) => setInputFeatureEn(e.target.value)} placeholder={t("ph_feature_en")} className="input" />
            </Field>
            <div className="flex items-end">
              <button type="button" onClick={addFeature} className="bg-primary text-white px-5 py-2.5 rounded-lg whitespace-nowrap">{t("add_btn")}</button>
            </div>
          </div>
          <ul className="space-y-2">
            {form.features_ar.map((f, i) => (
              <li key={i} className="flex items-center bg-gray-50 border px-4 py-2 rounded-lg text-sm gap-3">
                <span dir="rtl" className="flex-1">{f}</span>
                <span className="text-gray-300">|</span>
                <span className="flex-1">{form.features_en[i]}</span>
                <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600 font-bold">✕</button>
              </li>
            ))}
          </ul>
        </div>
        {/* ── Features ── */}


        {/* ── Unit Features ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">{t("unit_features_title")}</h3>
          <div className="flex gap-2 mb-3">
            <Field label={t("unit_feature_ar_label")}>
              <input value={unitAr} onChange={(e) => setUnitAr(e.target.value)} placeholder={t("ph_unit_feature_ar")} className="input" dir="rtl" />
            </Field>
            <Field label={t("unit_feature_en_label")}>
              <input value={unitEn} onChange={(e) => setUnitEn(e.target.value)} placeholder={t("ph_unit_feature_en")} className="input" />
            </Field>
            <div className="flex items-end">
              <button type="button" onClick={addUnitFeature} className="bg-primary text-white px-5 py-2.5 rounded-lg whitespace-nowrap">{t("add_btn")}</button>
            </div>
          </div>
          <ul className="space-y-2">
            {form.unit_features_ar.map((f, i) => (
              <li key={i} className="flex items-center bg-gray-50 border px-4 py-2 rounded-lg text-sm gap-3">
                <span dir="rtl" className="flex-1">{f}</span>
                <span className="text-gray-300">|</span>
                <span className="flex-1">{form.unit_features_en[i]}</span>
                <button type="button" onClick={() => removeUnitFeature(i)} className="text-red-400 hover:text-red-600 font-bold">✕</button>
              </li>
            ))}
          </ul>
        </div>
         {/* ── Unit Features ── */}


        {/* ────── Nearby Places  ────── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">
            {t("nearby_places_title")}
          </h3>

          <div className="flex gap-2 mb-3">
            <Field label={t("nearby_place_ar_label")}>
              <input
                value={nearAr}
                onChange={(e) => setNearAr(e.target.value)}
                className="input"
                dir="rtl"
              />
            </Field>

            <Field label={t("nearby_place_en_label")}>
              <input
                value={nearEn}
                onChange={(e) => setNearEn(e.target.value)}
                className="input"
              />
            </Field>

            <div className="flex items-end">
              <button
                type="button"
                onClick={addNearbyPlace}
                className="bg-primary text-white px-5 py-2.5 rounded-lg"
              >
                {t("add_btn")}
              </button>
            </div>
          </div>

          <ul className="space-y-2">
            {form.nearby_places_ar.map((p, i) => (
              <li
                key={i}
                className="flex items-center bg-gray-50 border px-4 py-2 rounded-lg text-sm gap-3"
              >
                <span dir="rtl" className="flex-1">{p}</span>
                <span className="text-gray-300">|</span>
                <span className="flex-1">{form.nearby_places_en[i]}</span>

                <button
                  type="button"
                  onClick={() => removeNearbyPlace(i)}
                  className="text-red-400 hover:text-red-600 font-bold"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* ────── Nearby Places  ────── */}


        {/* ── Guarantees ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">{t("guarantees_title")}</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-3">
            <Field label={t("guarantee_title_ar_label")}>
              <input value={gTitleAr} onChange={(e) => setGTitleAr(e.target.value)} placeholder={t("ph_guarantee_ar")} className="input" dir="rtl" />
            </Field>
            <Field label={t("guarantee_title_en_label")}>
              <input value={gTitleEn} onChange={(e) => setGTitleEn(e.target.value)} placeholder={t("ph_guarantee_en")} className="input" />
            </Field>
            <Field label={t("value_label")}>
              <input value={gValue} onChange={(e) => setGValue(e.target.value)} placeholder={t("ph_g_value")} className="input" />
            </Field>
          </div>
          <button type="button" onClick={addGuarantee} className="bg-primary text-white px-4 py-2 rounded-lg mb-3">
            {t("add_guarantee_btn")}
          </button>
          <ul className="space-y-2">
            {form.guarantees.map((g, i) => (
              <li key={i} className="flex items-center bg-gray-50 border px-4 py-2 rounded-lg text-sm gap-3">
                <span dir="rtl" className="flex-1">{g.title_ar}</span>
                <span className="text-gray-300">|</span>
                <span className="flex-1">{g.title_en}</span>
                <span className="text-primary font-semibold">{g.value}</span>
                <button type="button" onClick={() => removeGuarantee(i)} className="text-red-400 hover:text-red-600 font-bold">✕</button>
              </li>
            ))}
          </ul>
        </div>
        {/* ── Guarantees ── */}


        {/* ── Cover Image ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">{t("cover_image_title")}</h3>

          {/* Current cover */}
          {form.cover_image_url && !form.cover_image && (
            <div className="mb-3">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t("current_cover")}</p>
              <div className="relative w-fit">
                <img src={form.cover_image_url} alt="current cover" className="w-48 h-32 object-cover rounded-lg" loading="lazy" />
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, cover_image_url: "" }))}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                >✕</button>
              </div>
            </div>
          )}

          <Field label={t("upload_new_cover_image")}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setForm((prev) => ({ ...prev, cover_image: file }));
              }}
              className="input"
            />
          </Field>

          {form.cover_image && (
            <div className="mt-3 relative w-fit">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t("new_cover_preview")}</p>
              <img src={URL.createObjectURL(form.cover_image)} alt="new cover" className="w-48 h-32 object-cover rounded-lg" loading="lazy" />
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, cover_image: null }))}
                className="absolute top-6 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
              >✕</button>
            </div>
          )}
        </div>
        {/* ── Cover Image ── */}


        {/* ── Gallery ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">{t("gallery_images_title")}</h3>

          {/* Existing gallery */}
          {form.gallery_images_urls.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t("current_gallery")}</p>
              <div className="grid grid-cols-3 gap-3">
                {form.gallery_images_urls.map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} className="w-full h-24 object-cover rounded-lg" alt={`gallery-${i}`} loading="lazy" />
                    <button
                      type="button"
                      onClick={() => removeExistingGalleryImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                    >✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Field label={t("upload_new_gallery_images")}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setForm((prev) => ({ ...prev, gallery_images: [...prev.gallery_images, ...files] }));
              }}
              className="input"
            />
          </Field>

          {form.gallery_images.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{t("new_images_preview")}</p>
              <div className="grid grid-cols-3 gap-3">
                {form.gallery_images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={URL.createObjectURL(img)} className="w-full h-24 object-cover rounded-lg" alt={`new-${i}`} loading="lazy" />
                    <button
                      type="button"
                      onClick={() => removeNewGalleryImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                    >✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* ── Gallery ── */}


        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={submitLoading}
          className="bg-primary text-white px-6 py-3 rounded-lg w-full font-semibold text-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {t("saving_btn")}
            </>
          ) : t("update_project_btn")}
        </button>
        {/* ── Submit ── */}

      </form>
    </div>
  );
};

export default EditProject;





 const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-base font-medium  tracking-widest text-gray-700">{label}</label>
      {children}
    </div>
  );