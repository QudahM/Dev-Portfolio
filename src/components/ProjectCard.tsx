import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[];
}

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project and its key features. This showcases the main functionality and purpose of the project.",
  imageUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  demoUrl = "https://example.com",
  githubUrl = "https://github.com",
  technologies = ["React", "TypeScript", "Tailwind"],
}: ProjectCardProps) => {
  return (
    <Card className="w-[360px] h-[400px] bg-white overflow-hidden flex flex-col relative z-10">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <CardHeader className="space-y-1 p-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <CardDescription className="text-sm text-gray-600 line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 mt-auto">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Demo
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
