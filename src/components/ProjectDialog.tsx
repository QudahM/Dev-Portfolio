import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, CheckCircle2 } from "lucide-react";

interface ProjectDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly project: {
    readonly title: string;
    readonly description: string;
    readonly imageUrls: readonly string[];
    readonly demoUrl: string;
    readonly githubUrl: string;
    readonly technologies: readonly string[];
    readonly category: string;
    readonly features?: readonly string[];
    readonly challenges?: readonly string[];
    readonly date?: string;
  };
}

export function ProjectDialog({
  isOpen,
  onClose,
  project,
}: ProjectDialogProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % project.imageUrls.length);
  const prevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? project.imageUrls.length - 1 : prev - 1
    );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto px-4 sm:px-6"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Carousel Image Section */}
          <div className="relative h-[300px] rounded-lg overflow-hidden group">
            <img
              src={project.imageUrls[currentImage]}
              alt={`${project.title} - Slide ${currentImage + 1}`}
              className="w-full h-full object-contain border border-black bg-white rounded-md"
            />
            {/* Carousel controls */}
            {project.imageUrls.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 flex items-center justify-center rounded-full z-20">
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 flex items-center justify-center rounded-full z-20">
                  ›
                </button>
              </>
            )}
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{project.date || "2024"}</span>
              <Badge variant="secondary" className="ml-2">
                {project.category}
              </Badge>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Overview</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>

            {/* Features */}
            {project.features && (
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
