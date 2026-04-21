import React, { useEffect, useState } from 'react'
import MainHero from '../../components/common/MainHero'
import { useTranslation } from "react-i18next";
import ProjectCard from '../../components/landing/ProjectCard'
import { supabase } from '../../lib/supabase'; 
import { useProjects } from '../../hooks/useProjects';


const AvailableProjects = () => {
    const { t } = useTranslation();
    const {data: projects = [], isLoading, error,} = useProjects();

    const availableProjects = projects.filter(
        (project) => project.status === "available"
    );
    
 
  return (
   <>
        {/* ===== Hero Section ===== */}
        <MainHero
            title={t("available_projects_hero_title")}
            description={t("available_projects_hero_desc")}
            bgImage="/images/main_bg_hero.png"
        />

        {/* ===== Projects Section ===== */}
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">

            {/* Section Title */}
            <div className="text-center mb-12">
                <h2
                className="text-2xl md:text-4xl font-extrabold text-text mb-4"
                data-aos="fade-up"
                data-aos-delay="100"
                >
                {t("featured_projects")}
                </h2>
                <p
                className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="150"
                >
                {t("featured_projects_desc")}
                </p>
            </div>

            {/* Projects Grid */}
            {isLoading 
                ? <p className="text-center py-10">{t("loading_projects")}</p>
                : (
                availableProjects.length === 0 ? (
                    <p className="text-center py-10">{t("no_projects_available")}</p>
                ) : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {availableProjects.map((project, index) => (
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

export default AvailableProjects