import React, { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(
        `Portfolio Contact from ${formData.name}`
      );
      const body = encodeURIComponent(`Message:\n${formData.message}`);
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoLink;

      // Reset form and show success
      setFormData({ name: "", message: "" });
      setSubmitStatus("success");

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };
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
    },
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
              background: `linear-gradient(90deg, transparent 0%, ${
                [
                  "rgba(59,130,246,0.2)",
                  "rgba(147,51,234,0.2)",
                  "rgba(236,72,153,0.2)",
                ][i % 3]
              } 50%, transparent 100%)`,
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
            <Card className="p-6 bg-slate-100 overflow-hidden relative h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 rounded-lg" />
              <CardHeader className="relative z-10">
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <motion.form
                  className="space-y-6"
                  variants={containerVariants}
                  onSubmit={handleSubmit}
                >
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full min-h-[200px] transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={
                          isSubmitting || !formData.name || !formData.message
                        }
                        className="w-full relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10">
                          {isSubmitting
                            ? "Opening Email..."
                            : submitStatus === "success"
                            ? "Email Opened!"
                            : submitStatus === "error"
                            ? "Try Again"
                            : "Send Message"}
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </motion.div>
                    {submitStatus === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-sm mt-2 text-center"
                      >
                        Something went wrong. Please try again or email
                        directly.
                      </motion.p>
                    )}
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
            <Card className="p-6 bg-slate-100 overflow-hidden relative">
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
