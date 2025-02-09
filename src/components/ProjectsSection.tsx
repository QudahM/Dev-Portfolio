import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  category: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c",
    demoUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description: "Real-time weather tracking application with interactive maps",
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b",
    demoUrl: "https://example.com/weather",
    githubUrl: "https://github.com/example/weather",
    technologies: ["React", "TypeScript", "APIs"],
    category: "Frontend",
  },
  {
    id: 3,
    title: "Task Management API",
    description: "RESTful API for task management with authentication",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
    demoUrl: "https://example.com/tasks-api",
    githubUrl: "https://github.com/example/tasks-api",
    technologies: ["Node.js", "Express", "PostgreSQL"],
    category: "Backend",
  },
];

const ProjectsSection = ({
  projects = defaultProjects,
}: ProjectsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section className="py-16 px-4 bg-gray-900 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      {/* Tech pattern overlay */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: "150px",
              height: "150px",
              background: `radial-gradient(circle at center, ${["rgba(59,130,246,0.1)", "rgba(147,51,234,0.1)", "rgba(236,72,153,0.1)"][i % 3]} 0%, transparent 70%)`,
              borderRadius: "50%",
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white relative z-10">
            Projects
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto relative z-10">
            Explore my latest projects and technical work across different
            domains
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8 relative z-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="min-w-[100px]"
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center relative z-10"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                demoUrl={project.demoUrl}
                githubUrl={project.githubUrl}
                technologies={project.technologies}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
