const LicensedSection = () => {
  const logos = [
    { src: "/images/images.png", name: "Fal" },
    { src: "/images/images-2.png", name: "الهيئة العامة للعقار" },
    { src: "/images/images-1.png", name: "المركز السعودي للأعمال" },
  ];

  return (
    <section className="py-8 md:py-16 bg-muted">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          مرخصة من
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          نلتزم في ديسم بأعلى معايير الجودة والشفافية، حيث نعمل تحت إشراف الجهات الرسمية 
          والمعتمدة في المملكة العربية السعودية، مما يضمن لك استثمارًا آمنًا وموثوقًا.
        </p>

        {/* Logos */}
       <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center 
          [&>img:last-child]:col-span-2 
          [&>img:last-child]:justify-self-center
          sm:[&>img:last-child]:col-span-1
        ">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.name}
              data-aos="zoom-in"
              data-aos-delay={200 + index * 50}
              className="h-20 object-contain mx-auto"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LicensedSection;