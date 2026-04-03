import React from "react";
import { projects } from "../../data/projects"; // تأكد إن عندك البيانات هنا
import { Link } from "react-router-dom";
import ProjectCardAdmin from "../../components/dashboard/ProjectCardAdmin";

const ProjectsList = () => {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between mb-6">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-text text-center">
            Projects
          </h2>

          {/* Add Project Button */}
          <div className="flex justify-end mb-6">
            <Link to="/dashboard/add-project" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
              Add New Project
            </Link>
          </div>

        </div>

        {/* Grid Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
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
            />
          ))}
        </div>


      </div>
    </section>
  );
};

export default ProjectsList;