import React from "react";

const MainHero = ({ title, subtitle, description, bgImage }) => {
  return (
    <section
      className="relative w-full h-[60vh] sm:min-h-[85vh] flex items-center justify-center text-center text-text "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 "></div>

      <div className="relative max-w-4xl px-4">
        {subtitle && (
          <span className="inline-block mb-4 px-4 py-2 text-sm font-semibold bg-primary/20 rounded-full"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {subtitle}
          </span>
        )}
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 text-white"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {title}
        </h1>
        {description && (
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default MainHero;
