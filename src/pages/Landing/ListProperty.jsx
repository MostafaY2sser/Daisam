
import { useState } from "react";
import { FaHome, FaPaperPlane } from "react-icons/fa";
import MainHero from "../../components/common/MainHero";

const ListProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    otherType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.sheety.co/c66fe777496213c5aed67f1401370644/daisamForms/showyourproperty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            showyourproperty: {
              name:         formData.name || "-",
              phone:        formData.phone || "-",
              email:        formData.email || "-",
              propertyType: formData.propertyType === "other"   
                ? formData.otherType || "-"
                : formData.propertyType || "-",
              message:      formData.message || "-",
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      alert("تم إرسال طلبك بنجاح ✅");
      setFormData({ name: "", phone: "", email: "", propertyType: "", otherType: "", message: "" });

    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ ❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {/* Hero Section */}
      <MainHero
        title="اعرض عقارك"
        description="سجّل عقارك الآن ودع فريق ديسم يساعدك في تسويقه والوصول لأفضل العملاء."
        bgImage="/images/bg_list_your_property.png"
      />

      {/* Form Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-bold mb-6 text-text text-center">
              املأ النموذج التالي لبدء عرض عقارك
            </h3>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm text-gray-600">الاسم بالكامل</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="اكتب اسمك"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="05xxxxxxxx"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">البريد الإلكتروني (اختياري)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">نوع العقار</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">اختر</option>
                  <option value="شقة">شقة</option>
                  <option value="فيلا">فيلا</option>
                  <option value="عمارة">عمارة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              {formData.propertyType === "other" && (
                <div>
                  <label className="block mb-2 text-sm text-gray-600">اكتب نوع العقار</label>
                  <input
                    type="text"
                    name="otherType"
                    value={formData.otherType}
                    onChange={handleChange}
                    placeholder="اكتب نوع العقار"
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm text-gray-600">رسالتك</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="اكتب تفاصيل العقار..."
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <FaPaperPlane />
                {loading ? "جاري الإرسال..." : "ارسال"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListProperty;