import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ProjectDialog } from "./ProjectDialog";
import discord from "/tartarus-bot.jpg";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  category: string;
  features?: string[];
  challenges?: string[];
  date?: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: 1,
    date: "2024",
    title: "Room Change AI",
    description:
      "An AI-powered room change request manager that streamlines the process of handling student accommodation changes. Built with modern web technologies and integrated with OpenAI's GPT for intelligent request processing.",
    imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
    demoUrl: "https://roomchangeai.demo.com",
    githubUrl: "https://github.com/QudahM/RoomChangeAI",
    category: "AI/Web App",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "OpenAI",
      "TailwindCSS",
      "ShadcnUI",
    ],
    features: [
      "AI-powered request analysis and processing",
      "Smart room matching algorithm",
      "Real-time request tracking",
      "User-friendly interface for students and staff",
      "Automated email notifications",
    ],
  },
  {
    id: 2,
    date: "2024",
    title: "Valentine Project",
    description:
      "An interactive Valentine's Day web application featuring engaging animations and a playful user interface. Created with React and modern animation libraries for a delightful user experience.",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
    demoUrl: "https://valentine-project.vercel.app",
    githubUrl: "https://github.com/QudahM/valentine-project",
    category: "Frontend",
    technologies: ["React", "JavaScript", "CSS", "Framer Motion", "Vercel"],
    features: [
      "Interactive animations and transitions",
      "Responsive design for all devices",
      "Engaging user interactions",
      "Custom animation sequences",
      "Seamless deployment on Vercel",
    ],
  },
  {
    id: 3,
    date: "2023",
    title: "Tartarus Discord Bot",
    description:
      "A feature-rich Discord bot built with Python, offering moderation tools, custom commands, and automated tasks for server management. Handles moderation for 2,000+ users efficiently.",
    imageUrl: discord,
    demoUrl:
      "https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot",
    githubUrl: "https://github.com/QudahM/TartarusBot",
    category: "Bot",
    technologies: ["Python", "Discord.py", "MongoDB", "asyncio", "Docker"],
    features: [
      "Advanced moderation commands",
      "Custom server management tools",
      "Automated welcome messages",
      "Role management system",
      "Logging and analytics",
    ],
  },
];

const ProjectsSection = ({
  projects = defaultProjects,
}: ProjectsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
              background: `radial-gradient(circle at center, ${
                [
                  "rgba(59,130,246,0.1)",
                  "rgba(147,51,234,0.1)",
                  "rgba(236,72,153,0.1)",
                ][i % 3]
              } 0%, transparent 70%)`,
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center relative z-10 max-w-[1800px] mx-auto"
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
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {selectedProject && (
          <ProjectDialog
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            project={selectedProject}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
