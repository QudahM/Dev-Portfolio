import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Calendar, Building2, Trophy } from "lucide-react";

interface ExperienceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string[];
    technologies: string[];
    achievements?: string[];
    responsibilities?: string[];
  };
}

export function ExperienceDialog({
  isOpen,
  onClose,
  experience,
}: ExperienceDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {experience.role}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-5 h-5" />
            <span>{experience.company}</span>
            <span className="mx-2">•</span>
            <Calendar className="w-5 h-5" />
            <span>{experience.duration}</span>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Key Achievements
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {experience.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {experience.responsibilities && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Core Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {experience.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, i) => (
                <Badge key={i} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
