import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/auth";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";


export default function Login() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); 
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-primary" />

          {/* <div className="p-8 md:p-10" dir={i18n.language === "ar" ? "rtl" : "ltr"}> */}
          <div className={`p-8 md:p-10" ${isRTL ? "rtl" : "ltr"}`}>

            {/* Header */}
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
                {t("admin_panel")}
              </p>
              <h1 className="text-3xl font-bold text-gray-800">{t("login_welcome")}</h1>
              <p className="text-gray-400 text-sm mt-1">{t("login_subtitle")}</p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  {t("email_label")}
                </label>
                <div className="relative">
                  <FiMail className={`absolute top-1/2 -translate-y-1/2 text-gray-300 text-base ${i18n.language === "ar" ? "right-4" : "left-4"}`} />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition ${i18n.language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"}`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  {t("password_label")}
                </label>
                <div className="relative">
                  <FiLock className={`absolute top-1/2 -translate-y-1/2 text-gray-300 text-base ${i18n.language === "ar" ? "right-4" : "left-4"}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition ${i18n.language === "ar" ? "pr-11 pl-12" : "pl-11 pr-12"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className={`absolute top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition ${i18n.language === "ar" ? "left-4" : "right-4"}`}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:opacity-90 active:scale-[.98] text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    {t("signing_in")}
                  </>
                ) : (
                  <>
                    <FiLogIn className={`text-base ${i18n.language === "ar" ? "rotate-180" : ""}`} />
                    {t("sign_in_btn")}
                  </>
                )}
              </button>

              <Link
                to="/"
                className="w-full flex items-center justify-center gap-2 bg-white text-primary border border-primary hover:opacity-90 active:scale-[.98] font-semibold py-3 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                  <IoHomeOutline />
                  {t("go_to_home")}
              </Link>

            </form>
          </div>

          

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          &copy; {new Date().getFullYear()} {t("admin_footer")}
        </p>
      </div>
    </div>
  );
}