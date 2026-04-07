
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    cover_image: null, gallery_images: [],
    features_ar: [], features_en: [],
    unit_features_ar: [], unit_features_en: [],
    guarantees: [],
    price: "",
    sold_units: "",
    available_units: "",
    nearby_places_ar: [],
    nearby_places_en: [],
  });

 
  const [inputFeatureAr, setInputFeatureAr] = useState("");
  const [inputFeatureEn, setInputFeatureEn] = useState("");
  const [unitAr, setUnitAr]                 = useState("");
  const [unitEn, setUnitEn]                 = useState("");
  const [gTitleAr, setGTitleAr]             = useState("");
  const [gTitleEn, setGTitleEn]             = useState("");
  const [gValue, setGValue]                 = useState("");
  const [nearAr, setNearAr]                 = useState("");
  const [nearEn, setNearEn]                 = useState("");


  // Function Handle Change Inputs :---------
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


  // Gallery Image :---------------
  const removeGalleryImage = (i) =>
    setForm((prev) => {
      const arr = [...prev.gallery_images];
      arr.splice(i, 1);
      return { ...prev, gallery_images: arr };
    });
  // Gallery Image :---------------

  // Upload Image :---------------
  const uploadImage = async (file, folder) => {
    const ext = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("projects").upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from("projects").getPublicUrl(fileName);
    return data.publicUrl;
  };
  // Upload Image :---------------


  // Nearby Place  :---------------
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
  // Nearby Place  :---------------



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let cover_image_url = "";
      if (form.cover_image) cover_image_url = await uploadImage(form.cover_image, "covers");
      const gallery_urls = await Promise.all(form.gallery_images.map((f) => uploadImage(f, "gallery")));

      const payload = {
        name_ar: form.name_ar, name_en: form.name_en,
        title_ar: form.title_ar, title_en: form.title_en,
        city_ar: form.city_ar, city_en: form.city_en,
        type_ar: form.type_ar, type_en: form.type_en,
        building_type_ar: form.building_type_ar, building_type_en: form.building_type_en,
        district_ar: form.district_ar, district_en: form.district_en,
        location_ar: form.location_ar, location_en: form.location_en,
        units_count: Number(form.units_count), status: form.status,
        description_ar: form.description_ar, description_en: form.description_en,
        area: form.area,
        cover_image: cover_image_url, gallery_images: gallery_urls,
        features_ar: form.features_ar, features_en: form.features_en,
        unit_features_ar: form.unit_features_ar, unit_features_en: form.unit_features_en,
        guarantees: form.guarantees,
        price: form.price,
        sold_units: Number(form.sold_units) || 0,
        available_units: Number(form.available_units) || 0,
        nearby_places_ar: form.nearby_places_ar,
        nearby_places_en: form.nearby_places_en,
      };

      const { error } = await supabase.from("projects").insert([payload]);
      if (error) throw error;
      alert("✅ Project Added Successfully!");
      navigate("/dashboard/projects-dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Add Project</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── Basic Info ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">Basic Info</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Project Name (AR)">
              <input name="name_ar" value={form.name_ar} placeholder="مثال: مشروع أدوار ديسم" onChange={handleChange} className="input" dir="rtl" required />
            </Field>
            <Field label="Project Name (EN)">
              <input name="name_en" value={form.name_en} placeholder="e.g. Adwar Deism" onChange={handleChange} className="input" required />
            </Field>

            <Field label="Title (AR)">
              <input name="title_ar" value={form.title_ar} placeholder="مثال: مشروع سكني عصري" onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label="Title (EN)">
              <input name="title_en" value={form.title_en} placeholder="e.g. Modern Residential Project" onChange={handleChange} className="input" />
            </Field>

            <Field label="City (AR)">
              <input name="city_ar" value={form.city_ar} placeholder="مثال: الرياض" onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label="City (EN)">
              <input name="city_en" value={form.city_en} placeholder="e.g. Riyadh" onChange={handleChange} className="input" />
            </Field>

            <Field label="Type (AR)">
              <input name="type_ar" value={form.type_ar} placeholder="مثال: سكني" onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label="Type (EN)">
              <input name="type_en" value={form.type_en} placeholder="e.g. Residential" onChange={handleChange} className="input" />
            </Field>

            <Field label="Building Type (AR)">
              <input name="building_type_ar" value={form.building_type_ar} placeholder="مثال: شقق" onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label="Building Type (EN)">
              <input name="building_type_en" value={form.building_type_en} placeholder="e.g. Apartments" onChange={handleChange} className="input" />
            </Field>

            <Field label="District (AR)">
              <input name="district_ar" value={form.district_ar} placeholder="مثال: حي الحزم" onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label="District (EN)">
              <input name="district_en" value={form.district_en} placeholder="e.g. Al Hazm District" onChange={handleChange} className="input" />
            </Field>

            <Field label="Location (AR)">
              <input name="location_ar" value={form.location_ar} placeholder="مثال: شارع الأمير محمد" onChange={handleChange} className="input" dir="rtl" />
            </Field>
            <Field label="Location (EN)">
              <input name="location_en" value={form.location_en} placeholder="e.g. Prince Mohammed Street" onChange={handleChange} className="input" />
            </Field>

            <Field label="Area (m²)">
              <input name="area" value={form.area} placeholder="e.g. 15000" onChange={handleChange} className="input" />
            </Field>
            <Field label="Units Count">
              <input name="units_count" value={form.units_count} placeholder="e.g. 120" onChange={handleChange} className="input" type="number" />
            </Field>
          </div>


          {/*  */}
          <div className="bg-white p-6 rounded-xl shadow mt-4">
            <h3 className="font-semibold text-lg mb-5 text-primary">Price & Units</h3>

            <div className="grid md:grid-cols-3 gap-5">
              <Field label="Price">
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="مثال: من 550,000 إلى 620,000 ريال"
                  className="input"
                  dir="rtl"
                />
              </Field>

              <Field label="Sold Units">
                <input
                  name="sold_units"
                  value={form.sold_units}
                  onChange={handleChange}
                  type="number"
                  className="input"
                />
              </Field>

              <Field label="Available Units">
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


          <div className="mt-5">
            <Field label="Status">
              <select name="status" value={form.status} onChange={handleChange} className="input">
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </Field>
          </div>
        </div>

        {/* ── Description ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">Description</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Description (AR)">
              <textarea name="description_ar" value={form.description_ar} placeholder="أدخل وصف المشروع بالعربية..." onChange={handleChange} className="input h-28" dir="rtl" />
            </Field>
            <Field label="Description (EN)">
              <textarea name="description_en" value={form.description_en} placeholder="Enter project description in English..." onChange={handleChange} className="input h-28" />
            </Field>
          </div>
        </div>

        {/* ── Unit Features ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">Unit Features</h3>
          <div className="flex gap-2 mb-3">
            <Field label="Unit Feature (AR)">
              <input value={unitAr} onChange={(e) => setUnitAr(e.target.value)} placeholder="مثال: 5 غرف نوم" className="input" dir="rtl" />
            </Field>
            <Field label="Unit Feature (EN)">
              <input value={unitEn} onChange={(e) => setUnitEn(e.target.value)} placeholder="e.g. 5 Bedrooms" className="input" />
            </Field>
            <div className="flex items-end">
              <button type="button" onClick={addUnitFeature} className="bg-primary text-white px-5 py-2.5 rounded-lg whitespace-nowrap">Add</button>
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

        {/* ── Features ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">Features</h3>
          <div className="flex gap-2 mb-3">
            <Field label="Feature (AR)">
              <input value={inputFeatureAr} onChange={(e) => setInputFeatureAr(e.target.value)} placeholder="مثال: مسبح" className="input" dir="rtl" />
            </Field>
            <Field label="Feature (EN)">
              <input value={inputFeatureEn} onChange={(e) => setInputFeatureEn(e.target.value)} placeholder="e.g. Swimming Pool" className="input" />
            </Field>
            <div className="flex items-end">
              <button type="button" onClick={addFeature} className="bg-primary text-white px-5 py-2.5 rounded-lg whitespace-nowrap">Add</button>
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


        {/*  Nearby Places  */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">
            Nearby Places
          </h3>

          <div className="flex gap-2 mb-3">
            <Field label="Nearby Place (AR)">
              <input
                value={nearAr}
                onChange={(e) => setNearAr(e.target.value)}
                placeholder="مثال: 5 دقائق من المول"
                className="input"
                dir="rtl"
              />
            </Field>

            <Field label="Nearby Place (EN)">
              <input
                value={nearEn}
                onChange={(e) => setNearEn(e.target.value)}
                placeholder="e.g. 5 minutes from mall"
                className="input"
              />
            </Field>

            <div className="flex items-end">
              <button
                type="button"
                onClick={addNearbyPlace}
                className="bg-primary text-white px-5 py-2.5 rounded-lg"
              >
                Add
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


        {/* ── Guarantees ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">Guarantees</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-3">
            <Field label="Guarantee Title (AR)">
              <input value={gTitleAr} onChange={(e) => setGTitleAr(e.target.value)} placeholder="مثال: الهيكل الإنشائي" className="input" dir="rtl" />
            </Field>
            <Field label="Guarantee Title (EN)">
              <input value={gTitleEn} onChange={(e) => setGTitleEn(e.target.value)} placeholder="e.g. Structural" className="input" />
            </Field>
            <Field label="Value">
              <input value={gValue} onChange={(e) => setGValue(e.target.value)} placeholder="e.g. 10 سنوات" className="input" />
            </Field>
          </div>
          <button type="button" onClick={addGuarantee} className="bg-primary text-white px-4 py-2 rounded-lg mb-3">
            Add Guarantee
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


        {/* ── Cover Image ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">Cover Image</h3>
          <Field label="Upload Cover Image">
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
              <img src={URL.createObjectURL(form.cover_image)} alt="cover preview" className="w-48 h-32 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, cover_image: null }))}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
              >✕</button>
            </div>
          )}
        </div>


        {/* ── Gallery ── */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-5 text-primary">Gallery Images</h3>
          <Field label="Upload Gallery Images (multiple)">
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
          <div className="grid grid-cols-3 gap-3 mt-3">
            {form.gallery_images.map((img, i) => (
              <div key={i} className="relative">
                <img src={URL.createObjectURL(img)} className="w-full h-24 object-cover rounded-lg" alt={`gallery-${i}`} />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                >✕</button>
              </div>
            ))}
          </div>
        </div>


        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-lg w-full font-semibold text-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Uploading...
            </>
          ) : "Add Project"}
        </button>

      </form>
    </div>
  );
};

export default AddProject;




// ── Reusable label+input wrapper ──────────────────────────────────────────
  const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</label>
      {children}
    </div>
  );