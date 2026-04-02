import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-muted px-4">
      <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-6">
        404
      </h1>

      <h2 className="text-2xl md:text-4xl font-bold text-text mb-4 text-center">
        {t("notfound_title")}
      </h2>

      <p className="text-center text-text text-base md:text-lg mb-6 max-w-md">
        {t("notfound_message")}
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-primary text-text font-semibold rounded-xl hover:bg-primary-dark transition"
      >
        {t("notfound_home")}
      </Link>
    </section>
  );
};

export default NotFound;
