import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, FileText } from "lucide-react";
import profileImage from "/profile.png";
import myResume from "/Mohammad Qudah-Resume.pdf";

interface HeroSectionProps {
  name?: string;
  title?: string;
  location?: string;
  bio?: string;
  imageUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    resume?: string;
  };
}

const HeroSection = ({
  name = "Mohammad Qudah",
  title = "Software Engineer",
  location = "Toronto, Ontario, Canada",
  bio = "I am a B.Sc. Computer Science graduate with hands-on experience in server-side and distributed systems development, including microservices architectures. Skilled in Java, Python, SQL, and modern backend technologies.",
  imageUrl = profileImage,
  socialLinks = {
    github: "https://github.com/QudahM",
    linkedin: "https://www.linkedin.com/in/qudahm/",
    resume: myResume,
  },
}: HeroSectionProps) => {
  return (
    <section className="min-h-screen relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Enhanced grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/5 via-transparent to-pink-500/5" />
      
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-blue-900/5 to-transparent" />
      {/* Professional animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated geometric particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
        
        {/* Floating code symbols with better design */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-blue-300/10 font-mono text-6xl select-none"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            {["{ }", "[ ]", "JS", "Git", "AWS", "GO", "API",][i]}
          </motion.div>
        ))}

        {/* Animated connecting lines */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={Math.random() * 100 + "%"}
              y1={Math.random() * 100 + "%"}
              x2={Math.random() * 100 + "%"}
              y2={Math.random() * 100 + "%"}
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Subtle tech icons floating */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`tech-${i}`}
            className="absolute text-purple-300/8 text-4xl font-bold"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 1,
            }}
            transition={{
              duration: Math.random() * 25 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Main heading with highlight */}
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium text-blue-400"
            >
              Welcome to my portfolio
            </motion.h2>
            <h1 className="text-5xl font-bold text-white relative z-10">
              Hi, I'm {name}
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                {title}
              </h2>
              <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {location}
              </h4>
            </motion.div>
          </div>

          {/* Bio with highlight box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <p className="text-xl text-gray-300 leading-relaxed">{bio}</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-6"
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/10 z-10"
              asChild
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="h-8 w-8" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/10 z-10"
              asChild
            >
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-8 w-8" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/10 z-10"
              asChild
            >
              <a
                href={socialLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="My Resume"
              >
                <FileText className="h-8 w-8" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div
            className="aspect-square rounded-full overflow-hidden border-4 border-white/10 shadow-xl max-w-md mx-auto relative z-10"
            style={{ width: "600px", height: "600px" }}
          >
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 rounded-full blur-2xl" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white/50 hover:text-white hover:bg-white/10 animate-bounce"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
