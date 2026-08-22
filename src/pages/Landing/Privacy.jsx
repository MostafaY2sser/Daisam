import React from "react";
import { useTranslation } from "react-i18next";
import MainHero from "../../components/common/MainHero";

const Privacy = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    return (
        <div className="bg-secondary min-h-screen">
            {/* ===== Hero ===== */}
           <MainHero
                title={t("privacy_policy")}
                description={t("privacy_hero_desc")}
                bgImage="/images/main_bg_hero.png"
            />

            <div className="max-w-5xl mx-auto px-4 py-12">
                <div
                    className={`bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-10 ${isRTL ? "text-right" : "text-left"
                        }`}
                >
                    <div>
                        <p className="text-gray-500 font-medium font-semibold">
                            {t("privacy_effective_date")}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">
                            {t("privacy_welcome_title")}
                        </h2>

                        <p className="text-gray-700 leading-8">
                            {t("privacy_welcome_text")}
                        </p>
                    </div>

                    {/* 1 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">
                            {t("privacy_sec1_title")}
                        </h2>

                        <p className="text-gray-700">
                            {t("privacy_sec1_intro")}
                        </p>

                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>{t("privacy_sec1_item1")}</li>
                            <li>{t("privacy_sec1_item2")}</li>
                            <li>{t("privacy_sec1_item3")}</li>
                            <li>{t("privacy_sec1_item4")}</li>
                            <li>{t("privacy_sec1_item5")}</li>
                            <li>{t("privacy_sec1_item6")}</li>
                            <li>{t("privacy_sec1_item7")}</li>
                        </ul>
                    </section>

                    {/* 2 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">
                            {t("privacy_sec2_title")}
                        </h2>

                        <p className="text-gray-700">
                            {t("privacy_sec2_intro")}
                        </p>

                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>{t("privacy_sec2_item1")}</li>
                            <li>{t("privacy_sec2_item2")}</li>
                            <li>{t("privacy_sec2_item3")}</li>
                            <li>{t("privacy_sec2_item4")}</li>
                            <li>{t("privacy_sec2_item5")}</li>
                        </ul>

                        <div className="bg-primary/10 border-r-4 border-primary rounded-lg p-4">
                            <p className="text-gray-700 font-medium leading-8">
                                {t("privacy_sec2_warning")}
                            </p>
                        </div>
                    </section>

                    {/* 3 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">
                            {t("privacy_sec3_title")}
                        </h2>

                        <p className="text-gray-700 leading-8">
                            {t("privacy_sec3_p1")}
                        </p>

                        <p className="text-gray-700 leading-8">
                            {t("privacy_sec3_p2")}
                        </p>

                        <p className="text-gray-700 leading-8">
                            {t("privacy_sec3_p3")}
                        </p>
                    </section>

                    {/* 4 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">
                            {t("privacy_sec4_title")}
                        </h2>

                        <p className="text-gray-700 leading-8">
                            {t("privacy_sec4_p1")}
                        </p>
                    </section>

                    {/* 5 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">
                            {t("privacy_sec5_title")}
                        </h2>

                        <p className="text-gray-700">
                            {t("privacy_sec5_intro")}
                        </p>

                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>{t("privacy_sec5_item1")}</li>
                            <li>{t("privacy_sec5_item2")}</li>
                            <li>{t("privacy_sec5_item3")}</li>
                        </ul>
                    </section>

                    {/* 6 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">{t("privacy_sec6_title")}</h2>

                        <p className="text-gray-700 leading-8">
                            {t("privacy_sec6_p1")}
                        </p>
                    </section>

                    {/* 7 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">
                            {t("privacy_sec7_title")}
                        </h2>

                        <p className="text-gray-700 leading-8">
                            {t("privacy_sec7_p1")}
                        </p>
                    </section>

                    {/* 8 */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">
                            {t("privacy_sec8_title")}
                        </h2>

                        <p className="text-gray-700">
                            {t("privacy_sec8_intro")}
                        </p>

                        <div className="bg-gray-50 rounded-xl p-6 space-y-4 border">
                            <h3 className="text-xl font-bold text-primary">
                                {t("privacy_company_name")}
                            </h3>

                            <p>
                                <strong>📍 {t("privacy_address_label")}:</strong> {t("privacy_address_value")}
                            </p>

                            <p>
                                <strong>🌐 {t("privacy_website_label")}:</strong>{" "}
                                <a
                                    href="https://www.daisam.sa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    https://www.daisam.sa
                                </a>
                            </p>

                            <p>
                                <strong>📧 {t("privacy_email_label")}:</strong>
                            </p>

                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="mailto:info@daisam.sa"
                                        className="text-primary hover:underline"
                                    >
                                        info@daisam.sa
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="mailto:sales@daisam.sa"
                                        className="text-primary hover:underline"
                                    >
                                        sales@daisam.sa
                                    </a>
                                </li>
                            </ul>

                            <p>
                                <strong>📞 {t("privacy_phone_label")}:</strong> 920020535
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;