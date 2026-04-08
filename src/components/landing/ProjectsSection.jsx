
import React, { useEffect, useState } from "react";
import ProjectCard from "../../components/landing/ProjectCard";
import { supabase } from "../../lib/supabase"; 
import { useTranslation } from "react-i18next"; 

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("projects") 
          .select("*")
          .order("created_at", { ascending: false }) 
          .limit(6); 

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

  if (loading) return <p className="text-center py-10">{t("loading_projects")}</p>;

  return (
    <section id="projects" className="py-12 md:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-4xl font-extrabold text-text mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("latest_projects")}
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            {t("latest_projects_desc")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;