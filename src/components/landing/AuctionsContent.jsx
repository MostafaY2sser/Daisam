import {
  FaGavel,
  FaBullhorn,
  FaPhotoVideo,
  FaUsers,
  FaClipboardCheck,
  FaHandshake,
  FaShieldAlt,
  FaChartBar,
  FaBuilding,
  FaLandmark,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";

const AuctionsContent = () =>{

    const services = [
        {
        icon: <FaGavel />,
        title: "إدارة وتنظيم المزادات العقارية",
        desc: "إدارة متكاملة للمزاد من مرحلة الإعداد والتجهيز وحتى مرحلة الطرح وإتمام إجراءات البيع، مع تنظيم جميع مراحل العمل وفق خطة واضحة.",
        },
        {
        icon: <FaChartLine />,
        title: "دراسة وتحليل الأصول",
        desc: "دراسة العقارات والأصول المستهدف طرحها، وتحليل موقعها ومميزاتها والفرص الاستثمارية المرتبطة بها؛ لبناء استراتيجية طرح مناسبة لكل أصل.",
        },
        {
        icon: <FaBullhorn />,
        title: "التسويق المتخصص للمزادات",
        desc: "إعداد وتنفيذ حملات تسويقية تستهدف الشرائح الأكثر اهتماماً بالأصل المطروح، باستخدام مزيج من القنوات الرقمية والمباشرة للوصول إلى أكبر شريحة ممكنة من المشترين المحتملين.",
        },
        {
        icon: <FaPhotoVideo />,
        title: "صناعة المحتوى العقاري",
        desc: "إعداد الهوية التسويقية الخاصة بالمزاد، وتصميم المواد الإعلانية، وإنتاج المحتوى المرئي والتعريفي الذي يبرز القيمة الحقيقية للعقار والفرص الاستثمارية المرتبطة به.",
        },
        {
        icon: <FaUsers />,
        title: "استقطاب المستثمرين والمشترين",
        desc: "الوصول إلى المستثمرين والمهتمين بالفرص العقارية، وبناء قاعدة مستهدفة لكل مزاد بما يعزز مستوى المنافسة على الأصول المطروحة.",
        },
        {
        icon: <FaHandshake />,
        title: "إدارة يوم المزاد",
        desc: "تنظيم تجربة المزاد ومتابعة مراحل التنفيذ والتنسيق بين الأطراف المعنية لضمان سير العملية بكفاءة واحترافية.",
        },
        {
        icon: <FaClipboardCheck />,
        title: "متابعة ما بعد المزاد",
        desc: "متابعة الإجراءات المرتبطة بالأصول المباعة والتنسيق مع الأطراف ذات العلاقة حتى استكمال الإجراءات المطلوبة وفق نطاق العمل المتفق عليه.",
        },
    ];

    const methodology = [
        { step: "01", title: "دراسة الأصل", desc: "فهم العقار، موقعه، خصائصه، قيمته الاستثمارية والفئة الأكثر اهتماماً به." },
        { step: "02", title: "بناء استراتيجية المزاد", desc: "تحديد آلية الطرح، الجمهور المستهدف، الرسائل التسويقية وخطة الوصول للمستثمرين." },
        { step: "03", title: "التجهيز والتسويق", desc: "إعداد الهوية والمحتوى والحملة الإعلانية وإطلاق عمليات الاستقطاب والتواصل." },
        { step: "04", title: "إدارة المزاد", desc: "إدارة وتنظيم مراحل المزاد ومتابعة تجربة المشاركين باحترافية." },
        { step: "05", title: "إتمام الصفقة", desc: "متابعة نتائج المزاد والإجراءات اللاحقة بالتنسيق مع جميع الأطراف ذات العلاقة." },
    ];

    const marketingChannels = [
        "الحملات الإعلانية الرقمية المستهدفة",
        "التسويق عبر منصات التواصل الاجتماعي",
        "التواصل المباشر مع المستثمرين والمهتمين",
        "إنتاج الفيديوهات والمواد البصرية للعقارات",
        "التغطية الإعلامية للمزادات",
        "التسويق الميداني عند الحاجة",
        "إدارة بيانات العملاء والمستثمرين المحتملين",
        "إعادة الاستهداف للحملات الرقمية",
        "إعداد صفحات وحملات تعريفية خاصة بالمزادات",
    ];

    const whyUs = [
        { icon: <FaLandmark />, title: "خبرة عقارية", desc: "فهم للسوق والأصول والفرص الاستثمارية." },
        { icon: <FaBullhorn />, title: "قوة تسويقية", desc: "حملات مصممة خصيصاً للوصول إلى الجمهور المستهدف." },
        { icon: <FaUsers />, title: "شبكة مستثمرين", desc: "استهداف وبناء علاقات مع المهتمين بالفرص العقارية." },
        { icon: <FaClipboardCheck />, title: "إدارة احترافية", desc: "متابعة دقيقة لمراحل المزاد من البداية وحتى إتمام الصفقة." },
        { icon: <FaChartBar />, title: "تقنية وبيانات", desc: "استخدام الأدوات الرقمية والبيانات لتحسين الاستهداف ورفع كفاءة الحملات." },
        { icon: <FaShieldAlt />, title: "شفافية وثقة", desc: "تجربة واضحة ومهنية تعزز ثقة المالك والمستثمر والمشتري." },
    ];

    const whoWeServe = [
        { title: "ملاك العقارات والأصول", desc: "الراغبين في طرح أصولهم من خلال المزادات." },
        { title: "المستثمرين والمطورين العقاريين", desc: "الباحثين عن فرص وأصول عقارية واعدة." },
        { title: "الشركات والمؤسسات", desc: "التي تمتلك أصولاً عقارية وترغب في تسويقها وبيعها." },
        { title: "المحافظ والصناديق العقارية", desc: "وفق طبيعة ونطاق الخدمات والتعاقدات." },
        { title: "الجهات ذات العلاقة بالأصول العقارية", desc: "وفق الأنظمة والتراخيص والاعتمادات ذات الصلة." },
    ];

    const values = ["الثقة", "الشفافية", "الاحترافية", "الكفاءة", "الابتكار", "تحقيق القيمة"];

    return(
        <>
            {/* Intro Section */}
            <section className="py-12 md:py-20 bg-secondary">
                <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-6" data-aos="fade-up">
                    من نحن
                </h2>
                <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="150">
                    دَيسم للمزادات ذراع متخصص في قطاع المزادات العقارية، يعمل على تقديم حلول متكاملة لإدارة
                    وتنظيم وتسويق المزادات، وفق منهجية احترافية تهدف إلى تحقيق أعلى قيمة ممكنة للأصول
                    المطروحة والوصول إلى الشريحة المناسبة من المستثمرين والمشترين. ننطلق من خبرتنا في السوق
                    العقاري وفهمنا لسلوك المستثمر والعميل، لنحوّل عملية طرح العقار في المزاد من مجرد عملية بيع
                    إلى حملة استثمارية متكاملة تبدأ بدراسة الأصل وتنتهي بإتمام الصفقة.
                </p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-12 md:py-20">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
                <div
                    className="bg-white rounded-xl shadow-md p-8 text-center"
                    data-aos="fade-up"
                >
                    <h3 className="text-xl font-bold text-primary mb-4">رؤيتنا</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                    أن تكون دَيسم للمزادات من الأسماء الموثوقة والرائدة في قطاع المزادات العقارية بالمملكة
                    العربية السعودية، من خلال تقديم تجربة احترافية تجمع بين الثقة، الكفاءة، التقنية، والتسويق
                    المؤثر.
                    </p>
                </div>
                <div
                    className="bg-white rounded-xl shadow-md p-8 text-center"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <h3 className="text-xl font-bold text-primary mb-4">رسالتنا</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                    إدارة وتسويق المزادات العقارية بمنهجية احترافية ترفع من فرص نجاح المزاد، وتحقق أفضل قيمة
                    ممكنة للأصول، وتوفر تجربة واضحة وفعّالة لجميع الأطراف.
                    </p>
                </div>
                </div>
            </section>


            {/* What We Offer */}
            <section className="py-12 md:py-20 bg-secondary">
                <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
                    ماذا نقدم؟
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
                        data-aos="fade-up"
                        data-aos-delay={100 + index * 50}
                    >
                        <div className="text-primary text-3xl mb-4">{item.icon}</div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    ))}
                </div>
                </div>
            </section>


            {/* Methodology */}
            <section className="py-12 md:py-20">
                <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
                    منهجية دَيسم
                    </h2>
                </div>
                <div className="grid md:grid-cols-5 gap-6">
                    {methodology.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-6 text-center"
                        data-aos="fade-up"
                        data-aos-delay={100 + index * 50}
                    >
                        <div className="text-primary text-3xl font-extrabold mb-3">{item.step}</div>
                        <h3 className="font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            {/* Marketing Power */}
            <section className="py-12 md:py-20 bg-secondary">
                <div className="max-w-4xl mx-auto px-4 text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
                    قوتنا في التسويق
                </h2>
                <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                    نحن لا نعلن عن عقار فقط… نحن نصنع حوله فرصة استثمارية. تعتمد دَيسم للمزادات على استراتيجية
                    تسويقية متعددة القنوات تشمل:
                </p>
                </div>
                <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {marketingChannels.map((item, index) => (
                    <div
                    key={index}
                    className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4"
                    data-aos="fade-up"
                    data-aos-delay={100 + index * 30}
                    >
                    <FaCheckCircle className="text-primary mt-1 shrink-0" />
                    <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                    </div>
                ))}
                </div>
            </section>

            {/* Why Us */}
            <section className="py-12 md:py-20">
                <div className="max-w-4xl mx-auto px-4 text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
                    لماذا دَيسم للمزادات؟
                </h2>
                <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                    لأن نجاح المزاد لا يعتمد فقط على قيمة العقار، بل على القدرة على تقديم هذه القيمة إلى
                    المشتري المناسب، في الوقت المناسب، وبالطريقة المناسبة.
                </p>
                </div>
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
                {whyUs.map((item, index) => (
                    <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-6 text-center"
                    data-aos="fade-up"
                    data-aos-delay={100 + index * 50}
                    >
                    <div className="text-primary text-3xl mb-4 flex justify-center">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
                </div>
            </section>

            {/* Who We Serve */}
            <section className="py-12 md:py-20 bg-secondary">
                <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-4" data-aos="fade-up">
                    نخدم
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whoWeServe.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-6"
                        data-aos="fade-up"
                        data-aos-delay={100 + index * 50}
                    >
                        <div className="text-primary text-2xl mb-3">
                        <FaBuilding />
                        </div>
                        <h3 className="font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            {/* Asset Types */}
            <section className="py-12 md:py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-6" data-aos="fade-up">
                    أنواع الأصول المستهدفة
                </h2>
                <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="150">
                    الأراضي السكنية والتجارية والاستثمارية، العمائر والمباني، المجمعات السكنية والتجارية،
                    العقارات المدرة للدخل، المشاريع والفرص التطويرية، وغيرها من الأصول العقارية المؤهلة للطرح.
                </p>
                </div>
            </section>

            {/* Values */}
            <section className="py-12 md:py-20 bg-secondary">
                <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-4xl font-extrabold text-text mb-6" data-aos="fade-up">
                    قيمنا
                </h2>
                <div className="flex flex-wrap justify-center gap-3 mb-8" data-aos="fade-up" data-aos-delay="100">
                    {values.map((value, index) => (
                    <span
                        key={index}
                        className="px-5 py-2 rounded-full bg-white shadow-sm text-primary font-semibold text-sm"
                    >
                        {value}
                    </span>
                    ))}
                </div>
                <p className="text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="150">
                    نؤمن أن كل أصل عقاري يمتلك قيمة، ومهمتنا هي إظهار هذه القيمة والوصول بها إلى السوق بالشكل
                    الذي تستحقه.
                </p>
                </div>
            </section>
        </>
    )
}

export default AuctionsContent;