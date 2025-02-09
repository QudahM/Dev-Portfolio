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
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description:
      "Modern web application development with React and its ecosystem",
    details: [
      {
        title: "Core Concepts",
        items: [
          "Components",
          "Hooks",
          "Context",
          "Props & State",
          "Virtual DOM",
        ],
      },
      {
        title: "Related Technologies",
        items: [
          "Redux",
          "React Query",
          "React Router",
          "Styled Components",
          "Framer Motion",
        ],
      },
      {
        title: "Development Tools",
        items: ["Create React App", "Vite", "React DevTools", "ESLint", "Jest"],
      },
    ],
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Type-safe JavaScript development with TypeScript",
    details: [
      {
        title: "Core Features",
        items: [
          "Static Typing",
          "Interfaces",
          "Generics",
          "Decorators",
          "Type Inference",
        ],
      },
      {
        title: "Advanced Concepts",
        items: [
          "Union Types",
          "Utility Types",
          "Type Guards",
          "Mapped Types",
          "Conditional Types",
        ],
      },
    ],
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "Server-side JavaScript development with Node.js",
    details: [
      {
        title: "Core Modules",
        items: ["HTTP", "File System", "Events", "Streams", "Buffer"],
      },
      {
        title: "Frameworks & Tools",
        items: ["Express.js", "NestJS", "PM2", "Jest", "Socket.IO"],
      },
    ],
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    description: "The React Framework for Production",
    details: [
      {
        title: "Key Features",
        items: [
          "Server Components",
          "App Router",
          "API Routes",
          "Static Generation",
          "Image Optimization",
        ],
      },
      {
        title: "Full Stack Features",
        items: [
          "Server Actions",
          "Route Handlers",
          "Middleware",
          "Edge Runtime",
          "Data Fetching",
        ],
      },
    ],
  },
  {
    name: "TailwindCSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    description: "Utility-first CSS framework for rapid UI development",
    details: [
      {
        title: "Core Concepts",
        items: [
          "Utility Classes",
          "Responsive Design",
          "Dark Mode",
          "Custom Variants",
          "JIT Compiler",
        ],
      },
      {
        title: "Ecosystem",
        items: [
          "Plugins",
          "Configuration",
          "PostCSS",
          "Headless UI",
          "Forms Plugin",
        ],
      },
    ],
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    description: "Containerization and deployment of applications",
    details: [
      {
        title: "Core Concepts",
        items: [
          "Containers",
          "Images",
          "Dockerfile",
          "Docker Compose",
          "Networks",
        ],
      },
      {
        title: "Orchestration",
        items: [
          "Kubernetes",
          "Swarm",
          "Load Balancing",
          "Service Discovery",
          "Volumes",
        ],
      },
    ],
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    description: "Cloud computing and infrastructure services",
    details: [
      {
        title: "Core Services",
        items: ["EC2", "S3", "Lambda", "RDS", "DynamoDB"],
      },
      {
        title: "DevOps Tools",
        items: [
          "CloudFormation",
          "CodePipeline",
          "CodeBuild",
          "CloudWatch",
          "Route 53",
        ],
      },
    ],
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: "Version control and collaboration",
    details: [
      {
        title: "Core Operations",
        items: ["Branching", "Merging", "Rebasing", "Cherry Picking", "Tags"],
      },
      {
        title: "Collaboration",
        items: [
          "Pull Requests",
          "Code Review",
          "CI/CD",
          "Git Flow",
          "Trunk Based",
        ],
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
