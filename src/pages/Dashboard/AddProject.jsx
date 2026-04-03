import React, { useState } from "react";

const AddProject = () => {
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
    cover_image: null,
    gallery_images: [],
  });

  const [inputFeatureAr, setInputFeatureAr] = useState("");
  const [inputFeatureEn, setInputFeatureEn] = useState("");
  const [unitAr, setUnitAr] = useState("");
    const [unitEn, setUnitEn] = useState("");

    const [gTitleAr, setGTitleAr] = useState("");
    const [gTitleEn, setGTitleEn] = useState("");
    const [gValue, setGValue] = useState("");

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // add feature
  const addFeature = () => {
    if (!inputFeatureAr || !inputFeatureEn) return;

    setForm({
      ...form,
      features_ar: [...form.features_ar, inputFeatureAr],
      features_en: [...form.features_en, inputFeatureEn],
    });

    setInputFeatureAr("");
    setInputFeatureEn("");
  };

  // remove feature
  const removeFeature = (index) => {
    const newAr = [...form.features_ar];
    const newEn = [...form.features_en];

    newAr.splice(index, 1);
    newEn.splice(index, 1);

    setForm({ ...form, features_ar: newAr, features_en: newEn });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      ...form,
      id: Date.now(),
      created_at: new Date().toISOString(),
      units_count: Number(form.units_count),
    };

    console.log("Project Data:", newProject);

    alert("Project Added Successfully ✅");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Add Project</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name_ar" placeholder="Name AR" onChange={handleChange} className="input" />
          <input name="name_en" placeholder="Name EN" onChange={handleChange} className="input" />

          <input name="title_ar" placeholder="Title AR" onChange={handleChange} className="input" />
          <input name="title_en" placeholder="Title EN" onChange={handleChange} className="input" />

          <input name="city_ar" placeholder="City AR" onChange={handleChange} className="input" />
          <input name="city_en" placeholder="City EN" onChange={handleChange} className="input" />

          <input name="type_ar" placeholder="Type AR" onChange={handleChange} className="input" />
          <input name="type_en" placeholder="Type EN" onChange={handleChange} className="input" />

          <input name="building_type_ar" placeholder="Building Type AR" onChange={handleChange} className="input" />
          <input name="building_type_en" placeholder="Building Type EN" onChange={handleChange} className="input" />

          <input name="district_ar" placeholder="District AR" onChange={handleChange} className="input" />
          <input name="district_en" placeholder="District EN" onChange={handleChange} className="input" />

          <input name="location_ar" placeholder="Location AR" onChange={handleChange} className="input" />
          <input name="location_en" placeholder="Location EN" onChange={handleChange} className="input" />

          <input name="area" placeholder="Area" onChange={handleChange} className="input" />
          <input name="units_count" type="number" placeholder="Units Count" onChange={handleChange} className="input" />
        </div>

        {/* Status */}
        <select name="status" onChange={handleChange} className="input">
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>

        {/* Description */}
        <textarea name="description_ar" placeholder="Description AR" onChange={handleChange} className="input h-28" />
        <textarea name="description_en" placeholder="Description EN" onChange={handleChange} className="input h-28" />



        {/* Features :---------------------*/}
        <div>
          <h3 className="font-semibold mb-2">Features</h3>

          <div className="flex gap-2 mb-2">
            <input
              value={inputFeatureAr}
              onChange={(e) => setInputFeatureAr(e.target.value)}
              placeholder="Feature AR"
              className="input"
            />
            <input
              value={inputFeatureEn}
              onChange={(e) => setInputFeatureEn(e.target.value)}
              placeholder="Feature EN"
              className="input"
            />
            <button type="button" onClick={addFeature} className="bg-primary text-white px-4 rounded">
              Add
            </button>
          </div>

          <ul>
            {form.features_ar.map((f, i) => (
              <li key={i} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
                {f} / {form.features_en[i]}
                <button type="button" onClick={() => removeFeature(i)} className="text-red-500">
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Features :---------------------*/}


        {/* Unit Features  :--------------------- */}
        <div>
            <h3 className="font-semibold mb-2">Unit Features</h3>

            <div className="flex gap-2 mb-2">
                <input
                value={unitAr}
                onChange={(e) => setUnitAr(e.target.value)}
                placeholder="Feature AR"
                className="input"
                />
                <input
                value={unitEn}
                onChange={(e) => setUnitEn(e.target.value)}
                placeholder="Feature EN"
                className="input"
                />
                <button
                type="button"
                onClick={() => {
                    if (!unitAr || !unitEn) return;

                    setForm({
                    ...form,
                    unit_features_ar: [...form.unit_features_ar, unitAr],
                    unit_features_en: [...form.unit_features_en, unitEn],
                    });

                    setUnitAr("");
                    setUnitEn("");
                }}
                className="bg-primary text-white px-4 rounded"
                >
                Add
                </button>
            </div>

            {form.unit_features_ar.map((item, i) => (
                <div key={i} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
                {item} / {form.unit_features_en[i]}
                <button
                    type="button"
                    onClick={() => {
                    const ar = [...form.unit_features_ar];
                    const en = [...form.unit_features_en];
                    ar.splice(i, 1);
                    en.splice(i, 1);
                    setForm({ ...form, unit_features_ar: ar, unit_features_en: en });
                    }}
                    className="text-red-500"
                >
                    X
                </button>
                </div>
            ))}
        </div>
        {/* Unit Features  :--------------------- */}


        {/* Guarantees  :---------------------*/}
        <div>
        <h3 className="font-semibold mb-2">Guarantees</h3>

        <div className="grid md:grid-cols-3 gap-2 mb-2">
            <input
            value={gTitleAr}
            onChange={(e) => setGTitleAr(e.target.value)}
            placeholder="Title AR"
            className="input"
            />
            <input
            value={gTitleEn}
            onChange={(e) => setGTitleEn(e.target.value)}
            placeholder="Title EN"
            className="input"
            />
            <input
            value={gValue}
            onChange={(e) => setGValue(e.target.value)}
            placeholder="Value (مثلا 10 سنوات)"
            className="input"
            />
        </div>

        <button
            type="button"
            onClick={() => {
            if (!gTitleAr || !gTitleEn || !gValue) return;

            setForm({
                ...form,
                guarantees: [
                ...form.guarantees,
                { title_ar: gTitleAr, title_en: gTitleEn, value: gValue },
                ],
            });

            setGTitleAr("");
            setGTitleEn("");
            setGValue("");
            }}
            className="bg-primary text-white px-4 py-2 rounded mb-2"
        >
            Add Guarantee
        </button>

        {form.guarantees.map((g, i) => (
            <div key={i} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
            {g.title_ar} / {g.title_en} - {g.value}
            <button
                type="button"
                onClick={() => {
                const arr = [...form.guarantees];
                arr.splice(i, 1);
                setForm({ ...form, guarantees: arr });
                }}
                className="text-red-500"
            >
                X
            </button>
            </div>
        ))}
        </div>
        {/* Guarantees  :---------------------*/}


        {/* Images :---------------------  */}
        <div>
        <h3 className="font-semibold mb-2">Cover Image</h3>

        <input
            type="file"
            accept="image/*"
            onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            setForm({
                ...form,
                cover_image: file,
            });
            }}
            className="input"
        />

        {/* Preview */}
        {form.cover_image && (
            <img
            src={URL.createObjectURL(form.cover_image)}
            alt="cover"
            className="w-40 mt-2 rounded"
            />
        )}
        </div>        
        {/* Images :---------------------  */}


        {/* Gallery :--------------------- */}
        <div>
            <h3 className="font-semibold mb-2">Gallery Images</h3>

            <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                const files = Array.from(e.target.files);

                setForm({
                    ...form,
                    gallery_images: [...form.gallery_images, ...files],
                });
                }}
                className="input mb-2"
            />

            <div className="grid grid-cols-3 gap-2">
                {form.gallery_images.map((img, i) => (
                <div key={i} className="relative">
                    <img
                    src={URL.createObjectURL(img)}
                    className="w-full h-24 object-cover rounded"
                    />
                    <button
                    type="button"
                    onClick={() => {
                        const arr = [...form.gallery_images];
                        arr.splice(i, 1);
                        setForm({ ...form, gallery_images: arr });
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 rounded"
                    >
                    X
                    </button>
                </div>
                ))}
            </div>
        </div>
        {/* Gallery :--------------------- */}



        {/* Submit */}
        <button className="bg-primary text-white px-6 py-3 rounded-lg w-full">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;