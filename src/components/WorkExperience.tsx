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
    duration: "Aug. 2023 - Dec. 2023",
    description: [
      "Built a Kafka-powered microservice pipeline handling over 10,000 data files per day, reducing latency by 15% through parallel JSON processing and real-time event streaming.",
      "Developed Java-based Kafka Streams applications to transform and route internal data, expanding test coverage by 25% and improving reliability for 5,000+ internal users.",
      "Redesigned MongoDB schema structures and introduced compound indexing for nested documents, cutting query latency by 32% and improving access to 100K+ Kafka messages.",
      "Actively contributed in Agile sprints and CI/CD development, collaborating cross-functionally to streamline delivery workflows and reduce deployment time by 60%.",
    ],
    responsibilities: [
      "Engineered Java microservices integrated with Apache Kafka.",
      "Architected data pipelines optimized for real-time processing and scale.",
      "Redesigned MongoDB schemas and indexed nested fields for performance.",
      "Worked across teams to deliver in fast-paced Agile environments."
    ],
    technologies: ["Java", "Spring Boot", "Apache Kafka", "Kubernetes", "MongoDB", "Docker", "Jenkins",
    ],
  },
  {
    id: 2,
    role: "Software Developer",
    company: "eWorx Technology",
    logo: "assets/logos/eWorx.jpg",
    duration: "Jan. 2023 - Aug. 2023",
    description: [
      "Migrated a legacy Django API to FastAPI, introducing async request handling and streamlining backend logic, reducing average response latency by 36% across traffic endpoints.",
      "Enhanced database performance through MongoDB schema optimizations and query projection, increasing retrieval speed by 30% while enhancing maintainability for core data.",
      "Contributed to CI/CD pipeline stability by integrating automated builds using Jenkins and containerizing services, reducing deployment friction across staging and production.",
    ],
    responsibilities: [
      "Redesign and implement backend APIs with FastAPI and async logic.",
      "Optimize MongoDB schema and query performance for scale.",
      "Refactor frontend components in React for modularity.",
      "Support CI/CD workflows with Docker and Jenkins in Agile sprints."
    ],
    technologies: ["Python", "FastAPI", "DJango", "React", "MongoDB", "CI/CD", "Git"],
  },
  {
    id: 3,
    role: "Software Developer Intern",
    company: "AIMS",
    logo: "assets/logos/AIMS.jpg",
    duration: "Jan. 2022 - Dec. 2022",
    description: [
      "Refactored Spring Boot service logic to streamline CRUD operations on employee data, applying indexing strategies in MySQL that cut API response time by 22%.",
      "Built a React-based document preview component with rotation and zoom features, modernizing HR workflows and reducing paper usage by over 15% through digital adoption.",
      "Wrote JUnit and Mockito tests to validate service logic and REST API behavior, improving test coverage by 28% and reducing regression risks in future deployments.",
    ],
    responsibilities: [
      "Develop RESTful services with Spring Boot and MySQL.",
      "Build and maintain React components for internal HR tools.",
      "Write unit and integration tests using JUnit and Mockito.",
      "Collaborate with the team to troubleshoot backend performance.",
    ],
    technologies: ["Java", "Spring Boot", "JUnit", "Mockito", "MySQL", "React", "Git"],
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
