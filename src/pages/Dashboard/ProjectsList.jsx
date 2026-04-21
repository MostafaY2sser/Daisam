import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCardAdmin from "../../components/dashboard/ProjectCardAdmin";
import { supabase } from "../../lib/supabase"; 
import Loader from "../../components/common/Loader";
import { useTranslation } from "react-i18next";
import { useProjects } from "../../hooks/useProjects";

const ProjectsList = () => {
  const { t } = useTranslation();
  const {data: projects = [], isLoading, error,} = useProjects();
  const [filter, setFilter] = useState("all"); 
  
 

    const filteredProjects =
      filter === "all"
        ? projects
        : projects.filter((p) => p.status === filter);


  //  Delete project handler :------
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;

      // after successful deletion, update the local state to remove the deleted project
      setProjects(projects.filter((p) => p.id !== id));
      // alert("Project deleted successfully!");
    } catch (err) {
      console.log("Error deleting project:", err.message);
      alert(t("delete_project_error"));
    }
  };
  //  Delete project handler :------


  // Loader :------ 
  if (isLoading) return <Loader />;

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex md:items-center justify-between flex-col md:flex-row mb-2 md:mb-6 gap-4">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-text md:text-center">
            {t("projects_page_title")}
          </h2>

          <div className="flex flex-row items-center gap-2 md:gap-6">
              {/* Filter Buttons */}
              <div className="mb-6 flex items-center gap-3">
                <label className="text-sm font-medium text-gray-600">
                  {t("filter_label")}
                </label>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-1 rounded-lg border border-primary border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">{t("filter_all")}</option>
                  <option value="available">{t("status_available")}</option>
                  <option value="sold">{t("status_sold")}</option>
                </select>
              </div>
              {/* Filter Buttons */}


              {/* Add Project Button */}
              <div className="flex justify-end mb-6">
                <Link to="/dashboard/add-project" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
                  {t("add_new_project_btn")}
                </Link>
              </div>
              {/* Add Project Button */}
            </div>  
        </div>
        

        {/* Grid Projects */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            {t("no_projects_found")}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCardAdmin
              key={project.id}
              id={project.id}
              name_ar={project.name_ar}
              name_en={project.name_en}
              city_ar={project.city_ar}
              city_en={project.city_en}
              units_count={project.units_count}
              type_ar={project.type_ar}
              type_en={project.type_en}
              building_type_ar={project.building_type_ar}
              building_type_en={project.building_type_en}
              description_ar={project.description_ar}
              description_en={project.description_en}
              cover_image={project.cover_image}
              models={project.models}
              status={project.status}
              onDelete={handleDelete}
            />
          ))}
        </div>
        {/* Grid Projects */}


      </div>
    </section>
  );
};

export default ProjectsList;