import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Building2, ChevronRight } from "lucide-react";
import { ExperienceDialog } from "./ExperienceDialog";

interface WorkExperience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
  responsibilities?: string[];
}

interface WorkExperienceSectionProps {
  experiences?: WorkExperience[];
}

const defaultExperiences: WorkExperience[] = [
  {
    id: 1,
    role: "Senior Software Engineer",
    company: "Tech Solutions Inc.",
    duration: "2021 - Present",
    description: [
      "Led development of microservices architecture improving system scalability by 200%",
      "Mentored 5 junior developers and established code review guidelines",
      "Improved system performance by 40% through optimization and caching",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
    responsibilities: [
      "Lead a team of 6 developers across multiple projects",
      "Design and implement scalable microservices architecture",
      "Conduct technical interviews and code reviews",
      "Establish coding standards and best practices",
    ],
    technologies: [
      "React",
      "Node.js",
      "AWS",
      "Docker",
      "Kubernetes",
      "MongoDB",
    ],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Digital Innovations Ltd",
    duration: "2019 - 2021",
    description: [
      "Developed and maintained 10+ client applications with 99.9% uptime",
      "Implemented CI/CD pipelines reducing deployment errors by 75%",
      "Reduced application loading times by 60% through code splitting",
      "Built real-time analytics dashboard used by 50K+ users",
    ],
    responsibilities: [
      "Full stack development of web applications",
      "Database design and optimization",
      "API development and integration",
      "Performance optimization and monitoring",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "PostgreSQL",
      "Redis",
      "AWS",
    ],
  },
  {
    id: 3,
    role: "Software Developer",
    company: "StartUp Tech",
    duration: "2017 - 2019",
    description: [
      "Built responsive web applications serving 100K+ monthly users",
      "Collaborated with UX team to improve user satisfaction by 45%",
      "Integrated 15+ third-party APIs reducing development time",
      "Implemented automated testing improving code coverage to 85%",
    ],
    responsibilities: [
      "Frontend development using React and TypeScript",
      "Implementation of responsive designs",
      "Integration of third-party services",
      "Unit testing and documentation",
    ],
    technologies: ["JavaScript", "React", "Node.js", "MongoDB", "Jest"],
  },
];

const WorkExperienceSection = ({
  experiences = defaultExperiences,
}: WorkExperienceSectionProps) => {
  const [selectedExperience, setSelectedExperience] =
    useState<WorkExperience | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Animated lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
            style={{
              top: `${(i + 1) * 15}%`,
              left: 0,
              right: 0,
              transform: `rotate(${i % 2 ? 1 : -1}deg)`,
              animation: `pulse-glow ${3 + i}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white relative z-10">
            Work Experience
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto relative z-10">
            Click on any role to learn more about my professional journey and
            contributions
          </p>
        </motion.div>

        <div className="space-y-6 relative z-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Card
                className={`bg-white transform transition-all duration-300 cursor-pointer ${hoveredId === exp.id ? "scale-[1.02] shadow-lg" : ""}`}
                onClick={() => setSelectedExperience(exp)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        {exp.role}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                        <span className="mx-1">•</span>
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`transition-transform duration-300 ${hoveredId === exp.id ? "translate-x-2" : ""}`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                    {exp.description.slice(0, 3).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 4).map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                    {exp.technologies.length > 4 && (
                      <Badge variant="secondary">
                        +{exp.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedExperience && (
        <ExperienceDialog
          isOpen={!!selectedExperience}
          onClose={() => setSelectedExperience(null)}
          experience={selectedExperience}
        />
      )}
    </section>
  );
};

export default WorkExperienceSection;
