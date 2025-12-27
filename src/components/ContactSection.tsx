import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, Linkedin, Mail, FileText, Send, User, MessageSquare } from "lucide-react";
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
      const body = encodeURIComponent(
        `Name: ${formData.name}\n\nMessage:\n${formData.message}`
      );
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
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="w-full bg-gray-900 py-16 px-4 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5" />
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/3 via-transparent to-pink-500/3" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              background: `radial-gradient(circle at center, ${
                ['rgba(59,130,246,0.3)', 'rgba(147,51,234,0.3)', 'rgba(236,72,153,0.3)'][i % 3]
              } 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h2
            className="text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's Connect!
          </motion.h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Single Unified Card */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={cardVariants}
          >
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-2xl">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-2 gap-8 relative">
                  {/* Contact Form */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <MessageSquare className="w-6 h-6 text-blue-400" />
                        Send a Message
                      </h3>
                    </div>
                    <motion.form className="space-y-6" variants={containerVariants} onSubmit={handleSubmit}>
                      <motion.div className="space-y-2" variants={itemVariants}>
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Your Name
                        </label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                        />
                      </motion.div>
                      
                      <motion.div className="space-y-2" variants={itemVariants}>
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Your Message
                        </label>
                        <Textarea
                          name="message"
                          placeholder="Tell me about your project or idea..."
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 min-h-[120px] transition-all duration-300 resize-none"
                        />
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            disabled={isSubmitting || !formData.name || !formData.message}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border border-slate-600 hover:border-slate-500"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            {isSubmitting ? 'Sending...' : 
                             submitStatus === 'success' ? '✓ Message Sent!' :
                             submitStatus === 'error' ? '✗ Try Again' :
                             'Send Message'}
                          </Button>
                        </motion.div>
                        {submitStatus === 'error' && (
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-3 text-center"
                          >
                            Something went wrong. Please try again or email directly.
                          </motion.p>
                        )}
                      </motion.div>
                    </motion.form>
                  </div>

                  {/* Vertical Dotted Line Separator */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dotted border-slate-600 transform -translate-x-1/2 hidden lg:block"></div>

                  {/* Contact Links */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white">Connect With Me</h3>
                    </div>
                    <motion.div className="space-y-4" variants={containerVariants}>
                      <motion.a
                        href={`mailto:${email}`}
                        className="group flex items-center p-3 bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl hover:bg-slate-600/50 hover:border-red-400/50 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <div className="bg-red-500/20 p-2 rounded-lg text-red-400 group-hover:bg-red-500/30 transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <h4 className="text-white font-semibold text-sm">Email</h4>
                          <p className="text-gray-300 text-xs">{email}</p>
                        </div>
                      </motion.a>

                      <motion.a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center p-3 bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl hover:bg-slate-600/50 hover:border-gray-400/50 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <div className="bg-gray-500/20 p-2 rounded-lg text-gray-400 group-hover:bg-gray-500/30 transition-colors">
                          <Github className="w-5 h-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <h4 className="text-white font-semibold text-sm">GitHub</h4>
                          <p className="text-gray-300 text-xs">View my code and projects</p>
                        </div>
                      </motion.a>

                      <motion.a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center p-3 bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl hover:bg-slate-600/50 hover:border-blue-400/50 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <h4 className="text-white font-semibold text-sm">LinkedIn</h4>
                          <p className="text-gray-300 text-xs">Professional network</p>
                        </div>
                      </motion.a>

                      <motion.a
                        href={resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center p-3 bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl hover:bg-slate-600/50 hover:border-green-400/50 transition-all duration-300"
                        variants={itemVariants}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <div className="bg-green-500/20 p-2 rounded-lg text-green-400 group-hover:bg-green-500/30 transition-colors">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <h4 className="text-white font-semibold text-sm">Resume</h4>
                          <p className="text-gray-300 text-xs">Download my CV</p>
                        </div>
                      </motion.a>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;