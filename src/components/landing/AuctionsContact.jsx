import { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

import {
    FaEnvelope,
    FaPaperPlane,
    FaPhoneAlt,
    FaUser,
    FaBuilding,
    FaMapMarkerAlt,
} from "react-icons/fa";

import { saudiCities } from "../../data/saudiCities";

const AuctionsContact = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess(false);
        setError(false);

        try {
            await emailjs.sendForm(
                "service_99brxqw",
                "template_9cy4v5d",
                e.target,
                "wTi9JTgbg-M2py7Oj"
            );

            setSuccess(true);
            e.target.reset();

        } catch (error) {
            console.error("EmailJS Error:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="list-property"
            className="py-12 md:py-20"
        >
            <div className="max-w-3xl mx-auto px-4">

                <div
                    className="bg-primary/10 p-8 rounded-2xl shadow-2xl transition"
                    data-aos="fade-up"
                >

                    {/* Header */}
                    <h3 className="text-2xl font-bold mb-3 text-text text-center">
                        {t("auction_contact_title")}
                    </h3>

                    <p className="text-gray-700 text-center mb-3 text-lg">
                        {t("auction_contact_subtitle")}
                    </p>

                    <p className="text-gray-500 text-center mb-0 text-base">
                        {t("auction_contact_country")}
                    </p>

                    <p className="text-gray-800 text-center mb-12">
                        __________________
                    </p>


                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Name */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-600">
                                {t("auction_contact_name_label")}
                            </label>

                            <div className="relative">
                                <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />

                                <input
                                    type="text"
                                    name="name"
                                    className="w-full border rounded-lg px-4 py-3 pr-11 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder={t("auction_contact_name_placeholder")}
                                    required
                                />
                            </div>
                        </div>


                        {/* Phone */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-600">
                                {t("auction_contact_phone_label")}
                            </label>

                            <div className="relative">
                                <FaPhoneAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />

                                <input
                                    type="tel"
                                    name="phone"
                                    inputMode="numeric"
                                    maxLength={10}
                                    pattern="05[0-9]{8}"
                                    className="w-full border rounded-lg px-4 py-3 pr-11 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="05XXXXXXXX"
                                    title={t("auction_contact_phone_title")}
                                    required
                                />
                            </div>
                        </div>


                        {/* Email */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-600">
                                {t("auction_contact_email_label")}
                            </label>

                            <div className="relative">
                                <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />

                                <input
                                    type="email"
                                    name="email"
                                    className="w-full border rounded-lg px-4 py-3 pr-11 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>
                        </div>


                        {/* Property Type */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-600">
                                {t("auction_contact_property_type_label")}
                            </label>

                            <div className="relative">
                                <FaBuilding className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />

                                <select
                                    name="propertyType"
                                    defaultValue=""
                                    className="w-full border rounded-lg px-4 py-3 pr-11 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                                    required
                                >
                                    <option value="" disabled>
                                        {t("auction_contact_property_type_placeholder")}
                                    </option>

                                    <option value={t("auction_contact_prop_villa")}>{t("auction_contact_prop_villa")}</option>
                                    <option value={t("auction_contact_prop_apt")}>{t("auction_contact_prop_apt")}</option>
                                    <option value={t("auction_contact_prop_land")}>{t("auction_contact_prop_land")}</option>
                                    <option value={t("auction_contact_prop_commercial")}>{t("auction_contact_prop_commercial")}</option>
                                    <option value={t("auction_contact_prop_building")}>{t("auction_contact_prop_building")}</option>
                                    <option value={t("auction_contact_prop_farm")}>{t("auction_contact_prop_farm")}</option>
                                    <option value={t("auction_contact_prop_palace")}>{t("auction_contact_prop_palace")}</option>
                                    <option value={t("auction_contact_prop_warehouse")}>{t("auction_contact_prop_warehouse")}</option>
                                    <option value={t("auction_contact_prop_office")}>{t("auction_contact_prop_office")}</option>
                                    <option value={t("auction_contact_prop_other")}>{t("auction_contact_prop_other")}</option>
                                </select>
                            </div>
                        </div>


                        {/* City */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-600">
                                {t("auction_contact_city_label")}
                            </label>

                            <div className="relative">
                                <FaMapMarkerAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />

                                <select
                                    name="city"
                                    defaultValue=""
                                    className="w-full border rounded-lg px-4 py-3 pr-11 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                                    required
                                >
                                    <option value="" disabled>
                                        {t("auction_contact_city_placeholder")}
                                    </option>

                                    {saudiCities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {/* Success */}
                        {success && (
                            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-center text-sm">
                                {t("auction_contact_success")}
                            </div>
                        )}


                        {/* Error */}
                        {error && (
                            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-center text-sm">
                                {t("auction_contact_error")}
                            </div>
                        )}


                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <FaPaperPlane />

                            {loading
                                ? t("auction_contact_submitting")
                                : t("auction_contact_submit")
                            }
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default AuctionsContact;