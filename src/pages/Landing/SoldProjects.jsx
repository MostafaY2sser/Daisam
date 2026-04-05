import React, { useEffect, useState } from 'react'
import MainHero from '../../components/common/MainHero'
import ProjectCard from '../../components/landing/ProjectCard'
import { supabase } from '../../lib/supabase';


const SoldProjects = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
        
    useEffect(() => {
    const fetchProjects = async () => {
        setLoading(true);
        try {
        const { data, error } = await supabase
            .from("projects") 
            .select("*")
            .eq("status", "sold");

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



  return (
   <>
        {/* ===== Hero Section ===== */}
        <MainHero
            title="المشاريع المباعة لدينا"
            description="تعرّف على المشاريع التي تم بيعها بالكامل، والتي أثبتت نجاحها بين عملائنا والمستثمرين."
            bgImage="/images/main_bg_hero.png"
        />

        {/* ===== Sold Projects Section ===== */}
        <section className="py-12 md:py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-4">

            {/* Section Title */}
            <div className="text-center mb-12">
                <h2
                className="text-2xl md:text-4xl font-extrabold text-text mb-4"
                data-aos="fade-up"
                data-aos-delay="100"
                >
                مشاريعنا المباعة
                </h2>
                <p
                className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="150"
                >
                جميع المشاريع التالية تم بيعها بالكامل، وهي دليل على جودة مشاريعنا ورضا العملاء.
                </p>
            </div>

            {/* Projects Grid */}
            {projects.length !== 0 && (
                loading 
                    ? <p className="text-center py-10 text-xl ">جاري تحميل المشاريع...</p>
                    :(
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                            ))}
                        </div>
                    )
            )}
            

            </div>
        </section>
    </>
  )
}

export default SoldProjects