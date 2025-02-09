import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import myResume from "../assets/Mohammad Qudah-Resume.pdf";

interface ContactSectionProps {
  email?: string;
  github?: string;
  linkedin?: string;
  resume?: string;
}

const ContactSection = ({
  email = "hello@example.com",
  github = "https://github.com",
  linkedin = "https://linkedin.com",
  resume = myResume,
}: ContactSectionProps) => {
  return (
    <section className="w-full min-h-screen bg-gray-900 py-20 px-4 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      {/* Connection lines animation */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${["rgba(59,130,246,0.2)", "rgba(147,51,234,0.2)", "rgba(236,72,153,0.2)"][i % 3]} 50%, transparent 100%)`,
              top: `${20 + i * 15}%`,
              animation: `pulse-glow ${4 + i}s infinite`,
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white relative z-10">
            Get In Touch
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto relative z-10">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {/* Contact Form */}
          <Card className="p-6 bg-white">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Your Message"
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="p-6 bg-white">
            <CardHeader>
              <CardTitle>Connect With Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center space-x-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                  <span>{email}</span>
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-6 h-6" />
                  <span>GitHub</span>
                </a>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FileText className="w-6 h-6" />
                  <span>Resume</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
