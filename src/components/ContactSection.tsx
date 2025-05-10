import React, {useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import myResume from "/Mohammad Qudah-Resume.pdf";
import { motion } from "framer-motion";

interface ContactSectionProps {
  email?: string;
  github?: string;
  linkedin?: string;
  resume?: string;
}

const ContactSection = ({
  email = "qudahmohammad2002@gmail.com",
  github = "https://github.com/QudahM",
  linkedin = "https://linkedin.com/in/QudahM",
  resume = myResume,
}: ContactSectionProps) => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      size: number;
      color: string;
      x: number;
      y: number;
      tx: number;
      ty: number;
      r: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const newParticles = [];
    const colors = [
      "rgba(59,130,246,0.4)",
      "rgba(147,51,234,0.4)",
      "rgba(236,72,153,0.4)",
    ];

    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 100; // random x position (0-100%)
      const y = Math.random() * 100; // random y position (0-100%)
      const tx = (Math.random() - 0.5) * 200; // random x translation (-100px to 100px)
      const ty = (Math.random() - 0.5) * 200; // random y translation (-100px to 100px)
      const r = Math.random() * 360; // random rotation (0-360deg)
      const size = Math.random() * 6 + 2; // random size (2-8px)
      const duration = Math.random() * 10 + 15; // random duration (15-25s)
      newParticles.push({
        id: i,
        size,
        color: colors[i % colors.length],
        x,
        y,
        tx,
        ty,
        r,
        duration,
      });
    }
    setParticles(newParticles);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const socialLinkVariants = {
    initial: { x: 0 },
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="w-full bg-gray-900 py-20 px-4 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: `translate(-50%, -50%) rotate(${particle.r}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: `${particle.tx}%`,
              y: `${particle.ty}%`,
              rotate: particle.r,
              transition: {
                duration: particle.duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
          />
        ))}
      </div>
      
      {/* Connection lines animation */}
      <div className="absolute inset-0">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${["rgba(59,130,246,0.2)", "rgba(147,51,234,0.2)", "rgba(236,72,153,0.2)"][i % 3]} 50%, transparent 100%)`,
              top: `${20 + i * 15}%`,
              animation: `pulse-glow ${4 + i * 0.5}s infinite`,
              transform: `rotate(${i * 22.5}deg)`,
            }}
          />
        ))}
      </div>
      
      <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <motion.h2
                className="text-3xl font-bold mb-4 text-white relative z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
              >
              Get In Touch
              </motion.h2>
                <motion.p
                  className="text-gray-300 max-w-2xl mx-auto relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.4 }}
                >
                Have a question or want to work together? Feel free to reach out!
              </motion.p>
            </motion.div>

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {/* Contact Form */}
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
          >
            <Card className="p-6 bg-white overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 rounded-lg" />
              <CardHeader className="relative z-10">
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <motion.form className="space-y-6" variants={containerVariants}>
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      className="w-full transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="w-full transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Textarea
                      placeholder="Your Message"
                      className="w-full min-h-[150px] transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>
                    <motion.div variants={itemVariants}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full relative overflow-hidden group">
                          <span className="relative z-10">Send Message</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
          >
            <Card className="p-6 bg-white overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 opacity-50" />
              <CardHeader className="relative z-10">
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <motion.div className="space-y-6" variants={containerVariants}>
                  <motion.a
                    href={`mailto:${email}`}
                    className="flex items-center space-x-4 text-gray-600 hover:text-red-400 transition-colors p-3 rounded-lg hover:bg-red-100 group"
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <motion.div
                      className="bg-red-100 p-2 rounded-full text-red-400"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Mail className="w-6 h-6" />
                    </motion.div>
                    <motion.span variants={socialLinkVariants}>
                      {email}
                    </motion.span>
                  </motion.a>
                  <motion.a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-gray-600 hover:text-gray-900 transition-colors p-3 rounded-lg hover:bg-gray-300 group"
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <motion.div
                      className="bg-gray-300 p-2 rounded-full text-gray-700"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Github className="w-6 h-6" />
                    </motion.div>
                    <motion.span variants={socialLinkVariants}>
                      GitHub
                    </motion.span>
                  </motion.a>
                  <motion.a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-gray-600 hover:text-blue-700 transition-colors p-3 rounded-lg hover:bg-blue-100 group"
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <motion.div
                      className="bg-blue-100 p-2 rounded-full text-blue-700"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Linkedin className="w-6 h-6" />
                    </motion.div>
                    <motion.span variants={socialLinkVariants}>
                      LinkedIn
                    </motion.span>
                  </motion.a>
                  <motion.a
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 text-gray-600 hover:text-green-700 transition-colors p-3 rounded-lg hover:bg-green-100 group"
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <motion.div
                      className="bg-green-100 p-2 rounded-full text-green-700"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <FileText className="w-6 h-6" />
                    </motion.div>
                    <motion.span variants={socialLinkVariants}>
                      Resume
                    </motion.span>
                  </motion.a>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
