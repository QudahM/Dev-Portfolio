import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
//import { Badge } from "./ui/badge";
//import { SkillDialog } from "./SkillDialog";

interface Skill {
  name: string;
  icon: string;
  description: string[];
  experience: string[];
  gradient: string;
}

interface SkillsSectionProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    description: [
      "**Experience:**",
      "• Developed scalable microservice pipelines using Java and Apache Kafka",
      "• Created RESTful APIs using Java and Spring Boot to handle real-time data processing",
    ],
    experience: ["Spring Boot", "JUnit", "Maven", "Microservices"],
    gradient:
      "hover:bg-gradient-to-r hover:from-red-500/10 hover:to-orange-500/10",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    description: [
      "**Experience:**",
      "• Built a multi-functional Discord bot using Python and MongoDB, automating moderation for 2,000+ users.",
      "• Automated data processing workflows using Python, streamlining ETL pipelines",
    ],
    experience: ["Django", "FastAPI", "NumPy", "Pandas"],
    gradient:
      "hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-yellow-200/20",
  },
  {
    name: "Go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    description: [
      "**Experience:**",
      "• Developed a real-time data processing pipeline using Go and Apache Kafka",
    ],
    experience: ["Goroutines"],
    gradient:
      "hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-teal-300/10",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: [
      "**Experience:**",
      "• Built an AI-powered room change request manager, using TypeScript, React, and Vite.",
      "• Developed a website integrating smart search and interactive leaderboards, using TypeScript, React, and Tailwind CSS.",
    ],
    experience: ["Interfaces", "Generics", "Next.js"],
    gradient:
      "hover:bg-gradient-to-r hover:from-blue-700/10 hover:to-sky-400/10",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: [
      "**Experience:**",
      "• Refactored React web components for modularity and CI/CD integration",
      "• Developed a task management solution using JavaScript, React, and Node.js, ensuring real-time synchronization",
    ],
    experience: ["ES6+", "Async/Await", "DOM", "Webpack"],
    gradient:
      "hover:bg-gradient-to-r hover:from-yellow-300/10 hover:to-amber-600/10",
  },
  {
    name: "Spring Boot",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    description: [
      "**Experience:**",
      "• Deployed and managed containerized applications using Kubernetes",
      "• Implemented CI/CD pipelines for automated deployment and scaling",
    ],
    experience: ["Helm", "Ingress", "Monitoring", "Scaling", "Networking"],
    gradient:
      "hover:bg-gradient-to-r hover:from-green-700/10 hover:to-lime-600/10",
  },
  {
    name: "Google Cloud Platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    description: [
      "**Experience:**",
      "• Created responsive web designs using modern CSS techniques like Flexbox and Grid.",
      "• Enhanced user experience by implementing CSS animations and transitions for smooth UI interactions.",
    ],
    experience: ["Flexbox", "Grid", "Animations", "Tailwind", "SASS"],
    gradient:
      "hover:bg-gradient-to-r hover:from-amber-900/40 hover:to-blue-900/40",
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    description: [
      "**Experience:**",
      "• Architected and deployed cloud-native applications on AWS",
      "• Managed serverless architectures using Lambda and API Gateway",
    ],
    experience: ["EC2", "S3", "Lambda", "ECS", "CloudFormation"],
    gradient:
      "hover:bg-gradient-to-r hover:from-orange-400/10 hover:to-yellow-500/10",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    description: [
      "**Experience:**",
      "• Designed and optimized MongoDB schemas for various applications",
      "• Implemented data aggregation pipelines and indexing strategies",
    ],
    experience: ["Mongoose", "Atlas", "Aggregation", "Indexing", "Replication"],
    gradient:
      "hover:bg-gradient-to-r hover:from-green-700/10 hover:to-green-400/10",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: [
      "**Experience:**",
      "• Developed React-based user interfaces for task management and HR systems, enhancing responsiveness",
      "• Built reusable component libraries and implemented state management solutions",
    ],
    experience: ["Hooks", "Next.js", "React Query", "Testing"],
    gradient:
      "hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-blue-600/10",
  },
  {
    name: "Node JS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: [
      "**Experience:**",
      "• Built scalable backend services using Node.js and Express",
      "• Implemented real-time features using WebSocket and GraphQL",
    ],
    experience: [
      "Express",
      "REST APIs",
      "GraphQL",
      "WebSocket",
      "Microservices",
    ],
    gradient:
      "hover:bg-gradient-to-r hover:from-lime-500/10 hover:to-emerald-500/10",
  },
  {
    name: "Next JS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    description: [
      "**Experience:**",
      "• Implemented responsive UIs with HTML5 for React and FastAPI applications, improving user",
      "• Utilized HTML5 to implement many features like a new pop-up page for rotating documents",
    ],
    experience: [
      "Semantic Elements",
      "Forms",
      "Canvas",
      "Audio/Video",
      "Web Components",
    ],
    gradient:
      "hover:bg-gradient-to-r hover:from-stone-700/30 hover:to-slate-800/70",
  },
  {
    name: "Express JS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    description: [
      "**Experience:**",
      "• Implemented responsive UIs with HTML5 for React and FastAPI applications, improving user",
      "• Utilized HTML5 to implement many features like a new pop-up page for rotating documents",
    ],
    experience: [
      "Semantic Elements",
      "Forms",
      "Canvas",
      "Audio/Video",
      "Web Components",
    ],
    gradient:
      "hover:bg-gradient-to-r hover:from-gray-800/10 hover:to-gray-100/10",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    description: [
      "**Experience:**",
      "• Containerized multiple applications and set up CI/CD pipelines",
      "• Managed container orchestration with Docker Compose and Kubernetes",
    ],
    experience: ["Containers", "Compose", "Kubernetes", "CI/CD", "Monitoring"],
    gradient:
      "hover:bg-gradient-to-r hover:from-blue-400/10 hover:to-sky-500/10",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    description: [
      "**Experience:**",
      "• Managed version control for multiple team projects",
      "• Implemented GitFlow workflows and automated CI/CD processes",
    ],
    experience: [
      "GitFlow",
      "GitHub Actions",
      "CI/CD",
      "Code Review",
      "Branching",
    ],
    gradient:
      "hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-red-400/10",
  },
];

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);

  const getCustomAnimation = (index: number) => ({
    y: [0, -15 * ((index % 3) + 1), 0, 15 * ((index % 3) + 1), 0],
    x: [0, 15 * ((index % 4) - 1.5), 0, -15 * ((index % 4) - 1.5), 0],
    rotate: [0, index % 2 ? 3 : -3, 0, index % 2 ? -3 : 3, 0],
    scale: [1, 1 + (index % 3) * 0.1, 1, 1 - (index % 2) * 0.1, 1],
    filter: [
      "brightness(1) blur(0px)",
      "brightness(1.1) blur(0px)",
      "brightness(1) blur(0px)",
      "brightness(0.9) blur(0px)",
      "brightness(1) blur(0px)",
    ],
    transition: {
      duration: 8 + (index % 5),
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut",
    },
  });

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
            style={{
              top: `${(i + 1) * 12}%`,
              left: 0,
              right: 0,
              transform: `rotate(${i % 2 ? 1 : -1}deg)`,
              animation: `pulse-glow ${3 + i}s infinite`,
            }}
          />
        ))}
        {[...Array(10)].map(() => {
          const uniqueKey = `particle-${Math.random()}`;
          return (
            <motion.div
              key={uniqueKey}
              className="absolute w-1 h-1 rounded-full bg-blue-400/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4" ref={containerRef}>
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
            My technology stack and expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
          {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  ref={(el) => (skillsRef.current[index] = el)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  animate={getCustomAnimation(index)}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className={`p-6 transition-all duration-300 cursor-pointer bg-white/5 backdrop-blur-sm border-white/10 
                    ${skill.gradient} hover:shadow-lg hover:shadow-${skill.name.toLowerCase()}-500/20 hover:scale-105`}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 rounded-xl bg-white/10 p-2 backdrop-blur-sm overflow-hidden border-2 border-black/50">
                        <motion.img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                          animate={{
                            rotate: [0, 0, 10, -10, 0],
                            scale: [1, 1.1, 1, 0.9, 1],
                            filter: [
                              "drop-shadow(0 0 0 transparent)",
                              "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                              "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
                              "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                              "drop-shadow(0 0 0 transparent)",
                            ]
                          }}
                          transition={{
                            duration: 5 + (index % 3),
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                      <h3 className="font-medium text-lg text-center text-white">
                        {skill.name}
                      </h3>
                    </div>
                  </Card>
                </motion.div>
                ))}
            </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
            width: 100%;
          }
          50% {
            opacity: 0.8;
            width: 95%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(0) translateX(10px);
          }
          75% {
            transform: translateY(10px) translateX(5px);
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
