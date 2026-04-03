import React, { useState, useEffect } from "react";

/**
 * EditProject
 *
 * Props:
 *  - project  : the existing project object to edit
 *  - onUpdate : callback(updatedProject) called on submit
 */
const EditProject = ({ project = {}, onUpdate }) => {
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
    unit_features_ar: [],
    unit_features_en: [],
    features_ar: [],
    features_en: [],
    guarantees: [],
    cover_image: null,          // File object (new upload) or null
    cover_image_url: "",        // existing URL from server
    gallery_images: [],         // new File objects
    gallery_images_urls: [],    // existing URLs from server
  });

  // ── Seed form from the incoming project prop ──────────────────────────────
  useEffect(() => {
    if (!project || !Object.keys(project).length) return;

    setForm({
      name_ar:           project.name_ar           ?? "",
      name_en:           project.name_en           ?? "",
      title_ar:          project.title_ar          ?? "",
      title_en:          project.title_en          ?? "",
      city_ar:           project.city_ar           ?? "",
      city_en:           project.city_en           ?? "",
      type_ar:           project.type_ar           ?? "",
      type_en:           project.type_en           ?? "",
      building_type_ar:  project.building_type_ar  ?? "",
      building_type_en:  project.building_type_en  ?? "",
      district_ar:       project.district_ar       ?? "",
      district_en:       project.district_en       ?? "",
      location_ar:       project.location_ar       ?? "",
      location_en:       project.location_en       ?? "",
      units_count:       project.units_count       ?? "",
      status:            project.status            ?? "available",
      description_ar:    project.description_ar    ?? "",
      description_en:    project.description_en    ?? "",
      area:              project.area              ?? "",
      unit_features_ar:  project.unit_features_ar  ?? [],
      unit_features_en:  project.unit_features_en  ?? [],
      features_ar:       project.features_ar       ?? [],
      features_en:       project.features_en       ?? [],
      guarantees:        project.guarantees        ?? [],
      cover_image:       null,
      cover_image_url:   project.cover_image       ?? "",
      gallery_images:    [],
      gallery_images_urls: project.gallery_images  ?? [],
    });
  }, [project]);

  // ── Local input states ────────────────────────────────────────────────────
  const [inputFeatureAr, setInputFeatureAr] = useState("");
  const [inputFeatureEn, setInputFeatureEn] = useState("");

  const [unitAr, setUnitAr] = useState("");
  const [unitEn, setUnitEn] = useState("");

  const [gTitleAr, setGTitleAr] = useState("");
  const [gTitleEn, setGTitleEn] = useState("");
  const [gValue,   setGValue]   = useState("");


  // ── Helpers ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Features
  const addFeature = () => {
    if (!inputFeatureAr || !inputFeatureEn) return;
    setForm((prev) => ({
      ...prev,
      features_ar: [...prev.features_ar, inputFeatureAr],
      features_en: [...prev.features_en, inputFeatureEn],
    }));
    setInputFeatureAr("");
    setInputFeatureEn("");
  };

  const removeFeature = (index) => {
    setForm((prev) => {
      const ar = [...prev.features_ar];
      const en = [...prev.features_en];
      ar.splice(index, 1);
      en.splice(index, 1);
      return { ...prev, features_ar: ar, features_en: en };
    });
  };

  // Unit Features
  const addUnitFeature = () => {
    if (!unitAr || !unitEn) return;
    setForm((prev) => ({
      ...prev,
      unit_features_ar: [...prev.unit_features_ar, unitAr],
      unit_features_en: [...prev.unit_features_en, unitEn],
    }));
    setUnitAr("");
    setUnitEn("");
  };

  const removeUnitFeature = (index) => {
    setForm((prev) => {
      const ar = [...prev.unit_features_ar];
      const en = [...prev.unit_features_en];
      ar.splice(index, 1);
      en.splice(index, 1);
      return { ...prev, unit_features_ar: ar, unit_features_en: en };
    });
  };

  // Guarantees
  const addGuarantee = () => {
    if (!gTitleAr || !gTitleEn || !gValue) return;
    setForm((prev) => ({
      ...prev,
      guarantees: [
        ...prev.guarantees,
        { title_ar: gTitleAr, title_en: gTitleEn, value: gValue },
      ],
    }));
    setGTitleAr("");
    setGTitleEn("");
    setGValue("");
  };

  const removeGuarantee = (index) => {
    setForm((prev) => {
      const arr = [...prev.guarantees];
      arr.splice(index, 1);
      return { ...prev, guarantees: arr };
    });
  };

  // Gallery – remove an existing (server) image
  const removeExistingGalleryImage = (index) => {
    setForm((prev) => {
      const arr = [...prev.gallery_images_urls];
      arr.splice(index, 1);
      return { ...prev, gallery_images_urls: arr };
    });
  };

  // Gallery – remove a newly added (local) image
  const removeNewGalleryImage = (index) => {
    setForm((prev) => {
      const arr = [...prev.gallery_images];
      arr.splice(index, 1);
      return { ...prev, gallery_images: arr };
    });
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProject = {
      ...project,               // keep original id, created_at, etc.
      ...form,
      units_count: Number(form.units_count),
      updated_at: new Date().toISOString(),
    };

    console.log("Updated Project:", updatedProject);

    if (typeof onUpdate === "function") {
      onUpdate(updatedProject);
    }

    alert("Project Updated Successfully ✅");
  };


  
  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      <div className="flex md:items-center justify-between mb-6 flex-col md:flex-row gap-2">
        <h2 className=" text-2xl font-bold mb-6">Edit Project</h2>

        {/* Status */}
        <div className="flex items-center gap-2  md:w-1/3">
          <span className="w-1/2  md:text-lg ">تغيير الحالة :</span>
          <select name="status" value={form.status} onChange={handleChange} className="input">
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name_ar"          value={form.name_ar}          placeholder="Name AR"          onChange={handleChange} className="input" />
          <input name="name_en"          value={form.name_en}          placeholder="Name EN"          onChange={handleChange} className="input" />

          <input name="title_ar"         value={form.title_ar}         placeholder="Title AR"         onChange={handleChange} className="input" />
          <input name="title_en"         value={form.title_en}         placeholder="Title EN"         onChange={handleChange} className="input" />

          <input name="city_ar"          value={form.city_ar}          placeholder="City AR"          onChange={handleChange} className="input" />
          <input name="city_en"          value={form.city_en}          placeholder="City EN"          onChange={handleChange} className="input" />

          <input name="type_ar"          value={form.type_ar}          placeholder="Type AR"          onChange={handleChange} className="input" />
          <input name="type_en"          value={form.type_en}          placeholder="Type EN"          onChange={handleChange} className="input" />

          <input name="building_type_ar" value={form.building_type_ar} placeholder="Building Type AR" onChange={handleChange} className="input" />
          <input name="building_type_en" value={form.building_type_en} placeholder="Building Type EN" onChange={handleChange} className="input" />

          <input name="district_ar"      value={form.district_ar}      placeholder="District AR"      onChange={handleChange} className="input" />
          <input name="district_en"      value={form.district_en}      placeholder="District EN"      onChange={handleChange} className="input" />

          <input name="location_ar"      value={form.location_ar}      placeholder="Location AR"      onChange={handleChange} className="input" />
          <input name="location_en"      value={form.location_en}      placeholder="Location EN"      onChange={handleChange} className="input" />

          <input name="area"             value={form.area}             placeholder="Area"             onChange={handleChange} className="input" />
          <input name="units_count"      value={form.units_count}      type="number" placeholder="Units Count" onChange={handleChange} className="input" />
        </div>


        {/* Description */}
        <textarea name="description_ar" value={form.description_ar} placeholder="Description AR" onChange={handleChange} className="input h-28" />
        <textarea name="description_en" value={form.description_en} placeholder="Description EN" onChange={handleChange} className="input h-28" />

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-2">Features</h3>

          <div className="flex gap-2 mb-2">
            <input value={inputFeatureAr} onChange={(e) => setInputFeatureAr(e.target.value)} placeholder="Feature AR" className="input" />
            <input value={inputFeatureEn} onChange={(e) => setInputFeatureEn(e.target.value)} placeholder="Feature EN" className="input" />
            <button type="button" onClick={addFeature} className="bg-primary text-white px-4 rounded">
              Add
            </button>
          </div>

          <ul>
            {form.features_ar.map((f, i) => (
              <li key={i} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
                {f} / {form.features_en[i]}
                <button type="button" onClick={() => removeFeature(i)} className="text-red-500">X</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Unit Features */}
        <div>
          <h3 className="font-semibold mb-2">Unit Features</h3>

          <div className="flex gap-2 mb-2">
            <input value={unitAr} onChange={(e) => setUnitAr(e.target.value)} placeholder="Feature AR" className="input" />
            <input value={unitEn} onChange={(e) => setUnitEn(e.target.value)} placeholder="Feature EN" className="input" />
            <button type="button" onClick={addUnitFeature} className="bg-primary text-white px-4 rounded">
              Add
            </button>
          </div>

          {form.unit_features_ar.map((item, i) => (
            <div key={i} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
              {item} / {form.unit_features_en[i]}
              <button type="button" onClick={() => removeUnitFeature(i)} className="text-red-500">X</button>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div>
          <h3 className="font-semibold mb-2">Guarantees</h3>

          <div className="grid md:grid-cols-3 gap-2 mb-2">
            <input value={gTitleAr} onChange={(e) => setGTitleAr(e.target.value)} placeholder="Title AR"                   className="input" />
            <input value={gTitleEn} onChange={(e) => setGTitleEn(e.target.value)} placeholder="Title EN"                   className="input" />
            <input value={gValue}   onChange={(e) => setGValue(e.target.value)}   placeholder="Value (e.g. 10 سنوات)"      className="input" />
          </div>

          <button type="button" onClick={addGuarantee} className="bg-primary text-white px-4 py-2 rounded mb-2">
            Add Guarantee
          </button>

          {form.guarantees.map((g, i) => (
            <div key={i} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
              {g.title_ar} / {g.title_en} — {g.value}
              <button type="button" onClick={() => removeGuarantee(i)} className="text-red-500">X</button>
            </div>
          ))}
        </div>

        {/* Cover Image */}
        <div>
          <h3 className="font-semibold mb-2">Cover Image</h3>

          {/* Show existing cover */}
          {form.cover_image_url && !form.cover_image && (
            <div className="mb-2">
              <p className="text-xs text-gray-500 mb-1">Current cover:</p>
              <img src={form.cover_image_url} alt="current cover" className="w-40 rounded" />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setForm((prev) => ({ ...prev, cover_image: file }));
            }}
            className="input"
          />

          {/* Preview new upload */}
          {form.cover_image && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">New cover preview:</p>
              <img src={URL.createObjectURL(form.cover_image)} alt="new cover" className="w-40 rounded" />
            </div>
          )}
        </div>

        {/* Gallery */}
        <div>
          <h3 className="font-semibold mb-2">Gallery Images</h3>

          {/* Existing gallery images */}
          {form.gallery_images_urls.length > 0 && (
            <>
              <p className="text-xs text-gray-500 mb-1">Current gallery:</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {form.gallery_images_urls.map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} className="w-full h-24 object-cover rounded" alt={`gallery-${i}`} />
                    <button
                      type="button"
                      onClick={() => removeExistingGalleryImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* New gallery upload */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setForm((prev) => ({
                ...prev,
                gallery_images: [...prev.gallery_images, ...files],
              }));
            }}
            className="input mb-2"
          />

          {/* New gallery previews */}
          {form.gallery_images.length > 0 && (
            <>
              <p className="text-xs text-gray-500 mb-1">New images:</p>
              <div className="grid grid-cols-3 gap-2">
                {form.gallery_images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={URL.createObjectURL(img)} className="w-full h-24 object-cover rounded" alt={`new-${i}`} />
                    <button
                      type="button"
                      onClick={() => removeNewGalleryImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg w-full">
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProject;