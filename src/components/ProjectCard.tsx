import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrls?: string[];
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  date?: string;
  onClick?: () => void;
}

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project and its key features. This showcases the main functionality and purpose of the project.",
  imageUrls = ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97"],
  demoUrl = "https://example.com",
  githubUrl = "https://github.com",
  technologies = ["React", "TypeScript", "Tailwind"],
  date = "2025",
  onClick,
}: ProjectCardProps) => {
  return (
    <Card
      className="w-full max-w-[800px] h-[480px] overflow-hidden flex flex-col relative z-10 cursor-pointer border-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm"
      onClick={onClick}
    >
      {/* Image Section with Overlay */}
      <div className="relative h-[260px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10" />
        <img
          src={imageUrls[0]}
          alt={title}
              className="mx-auto max-h-[300px] w-auto object-contain transition-transform duration-500"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Badge
              variant="outline"
              className="bg-white/10 text-white border-white/20 backdrop-blur-sm"
            >
              {technologies[0]}
            </Badge>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/10 border-white/20 text-white backdrop-blur-sm"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Tech Stack */}
      <div className="flex-grow p-6 space-y-4">
        <CardDescription className="text-base text-gray-300 line-clamp-3">
          {description}
        </CardDescription>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-white/5 text-gray-300 border-white/10"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Footer */}
      <CardFooter className="p-6 border-t border-white/10 bg-white/5">
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-white/5 border-white/10 text-white"
            asChild
          >
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-white/5 border-white/10 text-white"
            asChild
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
