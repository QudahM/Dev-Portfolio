import React from "react";
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
  bio = "I am a Computer Science graduate with experience in server-side and distributed systems development, with proficiency in microservices architecture. My expertise includes utilizing Java, Python, TypeScript, and More.",
  imageUrl = profileImage,
  socialLinks = {
    github: "https://github.com/QudahM",
    linkedin: "https://www.linkedin.com/in/qudahm/",
    resume: myResume,
  },
}: HeroSectionProps) => {
  return (
    <section className="min-h-screen relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10" />
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.2,
            }}
          >
            {["JS", "TS", "Java", "Git", "AWS", "GO", "API",
              "<> </>", "==", "fn", "src", "dev"].map((symbol, index) => (
              <div
                key={index}
                className="text-purple-200 text-opacity-50 text-xl font-mono"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                  position: "absolute",
                  left: `${Math.random() * 400 - 200}px`,
                  top: `${Math.random() * 400 - 200}px`,
                }}
              >
                {symbol}
              </div>
            ))}
          </div>
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
