import { useState } from "react";
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
                        اعرض عقارك في المزاد
                    </h3>

                    <p className="text-gray-700 text-center mb-3 text-lg">
                        نُدير الفرصة… نُوسّع المنافسة… ونصنع القيمة.
                    </p>

                    <p className="text-gray-500 text-center mb-0 text-base">
                        المملكة العربية السعودية
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
                                الاسم
                            </label>

                            <div className="relative">
                                <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />

                                <input
                                    type="text"
                                    name="name"
                                    className="w-full border rounded-lg px-4 py-3 pr-11 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="أدخل الاسم"
                                    required
                                />
                            </div>
                        </div>


                        {/* Phone */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-600">
                                رقم الهاتف
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
                                    title="يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 ويتكون من 10 أرقام"
                                    required
                                />
                            </div>
                        </div>


                        {/* Email */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-600">
                                البريد الإلكتروني
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
                                نوع العقار
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
                                        اختر نوع العقار
                                    </option>

                                    <option value="فيلا">فيلا</option>
                                    <option value="شقة">شقة</option>
                                    <option value="أرض">أرض</option>
                                    <option value="عقار تجاري">عقار تجاري</option>
                                    <option value="عمارة">عمارة</option>
                                    <option value="مزرعة">مزرعة</option>
                                    <option value="قصر">قصر</option>
                                    <option value="مستودع">مستودع</option>
                                    <option value="مكتب">مكتب</option>
                                    <option value="أخرى">أخرى</option>
                                </select>
                            </div>
                        </div>


                        {/* City */}
                        <div>
                            <label className="block mb-2 text-sm text-gray-600">
                                المدينة
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
                                        اختر المدينة
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
                                تم إرسال طلبك بنجاح، سنتواصل معك قريبًا.
                            </div>
                        )}


                        {/* Error */}
                        {error && (
                            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-center text-sm">
                                حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى.
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
                                ? "جاري إرسال الطلب..."
                                : "إرسال الطلب"
                            }
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default AuctionsContact;