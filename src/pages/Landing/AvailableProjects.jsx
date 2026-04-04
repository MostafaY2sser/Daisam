import React, { useEffect, useState } from 'react'
import MainHero from '../../components/common/MainHero'
import ProjectCard from '../../components/landing/ProjectCard'
import { supabase } from '../../lib/supabase'; 


const AvailableProjects = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchProjects = async () => {
        setLoading(true);
        try {
        const { data, error } = await supabase
            .from("projects") 
            .select("*"); 

        if (error) throw error;

        setProjects(data || []);
        } catch (err) {
        console.log("Error fetching projects:", err.message);
        } finally {
        setLoading(false);
        }
    };

    fetchProjects();
    }, []);


    // Filter projects to only include those with status "available"
    const availableProjects = projects.filter(project => project.status === "available");

    
      if (loading) return <p className="text-center py-10">جاري تحميل المشاريع...</p>;

 
  return (
   <>
        {/* ===== Hero Section ===== */}
        <MainHero
            title="المشاريع المتاحة لدينا"
            description="اكتشف أحدث المشاريع العقارية التي نقدمها، سواء للسكن أو الاستثمار، مع تفاصيل كاملة لتسهيل اختيارك."
            bgImage="/images/main_bg_hero.png"
        />

        {/* ===== Projects Section ===== */}
        <section className="py-12 md:py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-4">

            {/* Section Title */}
            <div className="text-center mb-12">
                <h2
                className="text-2xl md:text-4xl font-extrabold text-text mb-4"
                data-aos="fade-up"
                data-aos-delay="100"
                >
                مشاريعنا المميزة
                </h2>
                <p
                className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="150"
                >
                نقدم وحدات سكنية وتجارية متكاملة تجمع بين الراحة والفخامة، مع مراعاة الخصوصية والمساحات العملية لتلبية كافة احتياجاتك.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {availableProjects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>

            </div>
        </section>
    </>
  )
}

export default AvailableProjects