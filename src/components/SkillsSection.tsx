import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { SkillDialog } from "./SkillDialog";

interface Skill {
  name: string;
  icon: string;
  description: string;
  details: {
    title: string;
    items: string[];
  }[];
}

interface SkillsSectionProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    description: "Enterprise-level application development with Java",
    details: [
      {
        title: "Core Concepts",
        items: ["OOP", "Collections", "Multithreading", "Stream API", "JVM"],
      },
      {
        title: "Frameworks",
        items: ["Spring Boot", "Hibernate", "JUnit", "Maven", "Gradle"],
      },
    ],
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description: "Versatile programming for web, data science, and automation",
    details: [
      {
        title: "Core Features",
        items: [
          "Data Structures",
          "OOP",
          "Generators",
          "Decorators",
          "Async IO",
        ],
      },
      {
        title: "Libraries",
        items: ["NumPy", "Pandas", "Django", "Flask", "Pytest"],
      },
    ],
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: "Dynamic web development and browser scripting",
    details: [
      {
        title: "Core Concepts",
        items: ["ES6+", "Async/Await", "Closures", "DOM", "Event Loop"],
      },
      {
        title: "Tools",
        items: ["Webpack", "Babel", "ESLint", "Jest", "npm"],
      },
    ],
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Type-safe JavaScript development",
    details: [
      {
        title: "Features",
        items: ["Types", "Interfaces", "Generics", "Decorators", "Modules"],
      },
      {
        title: "Tools",
        items: ["TSC", "TSLint", "Type Definitions", "Debugging", "Testing"],
      },
    ],
  },
  {
    name: "HTML/CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "Web markup and styling fundamentals",
    details: [
      {
        title: "HTML5",
        items: ["Semantics", "Forms", "Canvas", "WebStorage", "Media"],
      },
      {
        title: "CSS3",
        items: ["Flexbox", "Grid", "Animations", "Media Queries", "Variables"],
      },
    ],
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Modern UI development with React",
    details: [
      {
        title: "Core",
        items: ["Components", "Hooks", "Context", "State", "Props"],
      },
      {
        title: "Ecosystem",
        items: ["Redux", "React Query", "Router", "Testing", "Next.js"],
      },
    ],
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "Server-side JavaScript runtime",
    details: [
      {
        title: "Core",
        items: [
          "Express",
          "REST APIs",
          "Authentication",
          "WebSockets",
          "Testing",
        ],
      },
      {
        title: "Database",
        items: ["MongoDB", "PostgreSQL", "Redis", "ORMs", "Migrations"],
      },
    ],
  },
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    description: "Modern Python web framework",
    details: [
      {
        title: "Features",
        items: ["AsyncIO", "Type Hints", "OpenAPI", "WebSockets", "Security"],
      },
      {
        title: "Tools",
        items: ["Pydantic", "SQLAlchemy", "Alembic", "Testing", "Docker"],
      },
    ],
  },
  {
    name: "Apache Kafka",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
    description: "Distributed streaming platform",
    details: [
      {
        title: "Core",
        items: ["Topics", "Partitions", "Producers", "Consumers", "Brokers"],
      },
      {
        title: "Features",
        items: [
          "Streaming",
          "Event Processing",
          "Scaling",
          "Monitoring",
          "Security",
        ],
      },
    ],
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    description: "NoSQL database for modern applications",
    details: [
      {
        title: "Core",
        items: ["CRUD", "Aggregation", "Indexing", "Replication", "Sharding"],
      },
      {
        title: "Tools",
        items: ["Compass", "Atlas", "Mongoose", "Backup", "Security"],
      },
    ],
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    description: "Container platform for modern applications",
    details: [
      {
        title: "Core",
        items: ["Containers", "Images", "Networks", "Volumes", "Compose"],
      },
      {
        title: "Advanced",
        items: ["Swarm", "Registry", "Security", "Monitoring", "CI/CD"],
      },
    ],
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: "Version control system",
    details: [
      {
        title: "Core",
        items: ["Commits", "Branches", "Merging", "Rebasing", "Tags"],
      },
      {
        title: "Collaboration",
        items: ["Pull Requests", "Code Review", "CI/CD", "GitFlow", "GitHub"],
      },
    ],
  },
];

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      {/* Animated circuit lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
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
            Technical Skills
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto relative z-10">
            Click on any skill to learn more about my experience and expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className="p-6 hover:shadow-lg transition-all bg-white cursor-pointer hover:scale-105"
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-16 h-16"
                  />
                  <h3 className="font-medium text-lg text-center">
                    {skill.name}
                  </h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedSkill && (
        <SkillDialog
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          skill={selectedSkill}
        />
      )}
    </section>
  );
};

export default SkillsSection;
