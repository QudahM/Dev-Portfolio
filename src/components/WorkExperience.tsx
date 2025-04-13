import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Building2, ChevronRight } from "lucide-react";
import { ExperienceDialog } from "./ExperienceDialog";

interface WorkExperience {
  id: number;
  role: string;
  company: string;
  logo: string;
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
    role: "Software Engineer Intern",
    company: "Sun Life Financial",
    logo: "assets/logos/sunlife.png",
    duration: "May 2023 - Dec 2023",
    description: [
      "Developed a scalable microservice pipeline to process 10,000+ data files daily, leveraging Apache Kafka to enhance data streaming and JSON processing, reducing data streaming latency by 15%.",
      "Implemented Kafka Stream processing functions and generated unit tests for Java microservices, increasing test coverage and reducing production errors by 8%.",
      "Optimized data storage and retrieval by refining the MongoDB schema design, improving accessibility for more than 100,000 Kafka messages across over 100 topics.",
      "Collaborated with cross-functional teams to implement CI/CD pipelines, reducing deployment time by 60%.",
    ],
    responsibilities: [
      "Develop and maintain Java-based microservices using Spring Boot.",
      "Design and implement data processing pipelines using Apache Kafka.",
      "Write comprehensive unit tests and documentation.",
      "Collaborate in Agile sprints, refining code and development with colleagues.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Apache Kafka",
      "MongoDB",
      "Docker",
      "Jenkins",
    ],
  },
  {
    id: 2,
    role: "Software Developer",
    company: "eWorx Technology",
    logo: "assets/logos/eWorx.jpg",
    duration: "Jan 2023 - May 2023",
    description: [
      "Led the complete refactor for the server-side infrastructure, redesigning API architecture to FastAPI, reducing query latency by 70%, cutting response time by 50% and optimizing data flow for scalable performance.",
      "Engineered a secure database system incorporating SQL injection prevention and streamlined data generation algorithms, improving processing speed by 67% while enhancing user experience and system reliability.",
      "Refactored React web components for modularity and CI/CD integration, eliminating redundant code, improving extensibility by 60%, and enabling faster feature rollouts and scalable future developments.",
    ],
    responsibilities: [
      "Design and implement secure database systems.",
      "Refactoring backend infrastructure using FastAPI.",
      "Maintain code quality and CI/CD pipelines.",
      "Collaborate in an Agile team.",
    ],
    technologies: ["Python", "FastAPI", "React", "MongoDB", "CI/CD", "Git"],
  },
  {
    id: 3,
    role: "Software Developer Intern",
    company: "AIMS",
    logo: "assets/logos/AIMS.jpg",
    duration: "May 2022 - Dec 2022",
    description: [
      "Integrated an external React-based pop-up feature to enable seamless official document rotations, enhancing user interface functionality and resulting in a 12% increase in user engagement and a 20% reduction in paper usage.",
      "Resolved over 100+ bugs in a web-based Human Resource Management System, enhancing system performance and increasing JUnit test coverage by 18%, reducing bug recurrence and improving overall performance.",
      "Refined client-side and server-side components for efficient data storage, updates, and display of employee information, increasing user satisfaction by 15% through streamlined access and enhanced responsiveness.",
    ],
    responsibilities: [
      "Enhance UI functionality and user experience.",
      "Debug and optimize system performance.",
      "Implement efficient data management solutions.",
      "Maintain and improve test coverage.",
    ],
    technologies: ["Java", "React", "JUnit", "SQL", "JavaScript", "Git"],
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
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <Building2 className="w-4 h-4" />
                        )}
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
                      <ChevronRight className="w-9 h-8" />
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
