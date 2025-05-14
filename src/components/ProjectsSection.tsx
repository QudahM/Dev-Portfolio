import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ProjectDialog } from "./ProjectDialog";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrls: string[];
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
  categories: string[];
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
    date: "2025",
    title: "GrantBridge",
    description:
      "GrantBridge is a smart scholarship and grant discovery platform that uses Sonar AI to find the best opportunities, simplify eligibility, and assist with applications, aiming to make funding more accessible for students and creatives.",
    imageUrls: ["/assets/projects/Grantbridge_homepage.png", "/assets/projects/Grantbridge_mainpage.png"],
    demoUrl: "https://grantbridge.online/",
    githubUrl: "https://github.com/QudahM/GrantBridge",
    categories: ["Fullstack", "API", "Cloud Hosted"],
    technologies: ["React", "TypeScript", "Express.js", "Perplexity API", "AWS"],
    features: [
      "AI-powered grant/scholarships discovery based on user profile",
      "Converts complex eligibility criteria into plain, digestible language",
      "Offers AI-generated prompts to help users write application answers",
      "Summarizes requirement sections into concise, user-friendly bullet points",
      "Tracks application progress with a checklist to keep users organized",
    ],
  },
  {
    id: 2,
    date: "2024",
    title: "Room Change AI",
    description:
      "An AI-powered tool that generates a redesigned image of a user's room based on selected dimensions, decor styles, and preferences. Built with modern web technologies and integrated with OpenAI's GPT for intelligent prompt interpretation and concept visualization.",
    imageUrls: ["/assets/projects/roomImage.png", "/assets/projects/roomDesign.png"],
    demoUrl: "https://roomchangeai.qudahm.com/",
    githubUrl: "https://github.com/QudahM/InteriorDecorating",
    categories: ["Fullstack", "API", "Cloud Hosted"],
    technologies: ["TypeScript", "React", "Next.js", "OpenAI API", "AWS"],
    features: [
      "AI-powered request analysis and processing",
      "Smart room matching algorithm",
      "Real-time request tracking",
      "User-friendly interface for students and staff",
      "Automated email notifications",
    ],
  },
  {
    id: 3,
    date: "2025",
    title: "Pixel Shift Daily Puzzle",
    description:
      "A daily color-matching puzzle game built with Devvit and Reddit WebViews. Players rearrange tiles to match a randomly generated pattern using the fewest moves possible. Features leaderboard integration and smooth UI animations.",
    imageUrls: ["/assets/projects/redditHackathon.png", "/assets/projects/redditHackathonDashboard.png"],
    demoUrl: "https://www.reddit.com/r/Pixel0Shift/comments/1jjet6q/pixel_shift_daily_puzzle_can_you_beat_todays/",
    githubUrl: "https://github.com/QudahM/pixel-shift",
    categories: ["Frontend", "API", "Cloud Hosted"],
    technologies: ["JavaScript", "React", "HTML/CSS", "Devvit", "Rddit API"],
    features: [
      "Daily-generated puzzle pattern with seed consistency",
      "Redis-backed leaderboard that stores top scores per post",
      "Interactive tile-shifting game built from scratch in JavaScript",
      "Fully integrated with Reddit's Devvit platform",
      "Participant in the Hack Reddit 2025 Hackathon"
    ],
  },
  {
    id: 4,
    date: "2025",
    title: "Tartarus Discord Bot",
    description:
      "A feature-rich Discord bot built with Python, offering moderation tools, custom commands, and automated tasks for server management. Handles moderation for 2,000+ users efficiently.",
    imageUrls: ["/assets/projects/tartarus-bot.jpg"],
    demoUrl: "https://github.com/QudahM/TartarusBot",
    githubUrl: "https://github.com/QudahM/TartarusBot",
    categories: ["Backend", "API", "Cloud Hosted", "Database"],
    technologies: ["Python", "MongoDB", "AWS", "Docker", "Discord API"],
    features: [
      "Advanced moderation commands",
      "Custom server management tools",
      "Automated welcome messages",
      "Role management system",
      "Logging and analytics",
    ],
  },
   /*{
    id: 5,
    date: "2025",
    title: "Valentine Project",
    description:
      "An interactive Valentine's Day web application featuring engaging animations and a playful user interface. Created with React and modern animation libraries for a delightful user experience.",
    imageUrls: ["https://images.unsplash.com/photo-1518199266791-5375a83190b7"],
    demoUrl: "https://valentine-project.vercel.app",
    githubUrl: "https://github.com/QudahM/valentine-project",
    categories: ["Backend", "API", "Database", "Cloud Hosted"],
    technologies: ["React", "JavaScript", "VITE", "TailWindCSS", "AWS"],
    features: [
      "Interactive animations and transitions",
      "Responsive design for all devices",
      "Engaging user interactions",
      "Custom animation sequences",
      "Seamless deployment on AWS",
    ],
  },*/
];

const ProjectsSection = ({
  projects = defaultProjects,
}: ProjectsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(projects.flatMap((project) => project.categories))),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(selectedCategory));

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
          <p className="text-gray-300 max-w-2xl mx-auto relative z-10">
            (Click on any project to view more details)
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 relative z-10">
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
                imageUrls={project.imageUrls}
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
            project={{
              ...selectedProject,
              category: selectedProject.categories[0] || "Uncategorized"
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
