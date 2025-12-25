import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, FileText } from "lucide-react";
import profileImage from "/profile.png";
import myResume from "/Mohammad Qudah-Resume.pdf";
import { useState, useEffect, useRef } from "react";

interface Symbol {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  size: number;
  mass: number;
}

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
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize symbols with physics properties
  useEffect(() => {
    const symbolTexts = ["{}", "[]", "JS", "Git", "AWS", "GO", "API"];
    const initialSymbols: Symbol[] = symbolTexts.map((text, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth - 100) + 50,
      y: Math.random() * (window.innerHeight - 100) + 50,
      vx: (Math.random() - 0.5) * 2, // Random velocity between -1 and 1
      vy: (Math.random() - 0.5) * 2,
      text,
      size: 60,
      mass: 1,
    }));
    setSymbols(initialSymbols);
  }, []);

  // Physics engine with collision detection
  useEffect(() => {
    const updatePhysics = () => {
      setSymbols((prevSymbols) => {
        const newSymbols = [...prevSymbols];
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        // Update positions
        newSymbols.forEach((symbol) => {
          symbol.x += symbol.vx;
          symbol.y += symbol.vy;

          // Boundary collisions with damping
          if (
            symbol.x <= symbol.size / 2 ||
            symbol.x >= containerWidth - symbol.size / 2
          ) {
            symbol.vx *= -0.8; // Damping factor
            symbol.x = Math.max(
              symbol.size / 2,
              Math.min(containerWidth - symbol.size / 2, symbol.x)
            );
          }
          if (
            symbol.y <= symbol.size / 2 ||
            symbol.y >= containerHeight - symbol.size / 2
          ) {
            symbol.vy *= -0.8;
            symbol.y = Math.max(
              symbol.size / 2,
              Math.min(containerHeight - symbol.size / 2, symbol.y)
            );
          }

          // Apply slight friction
          symbol.vx *= 0.999;
          symbol.vy *= 0.999;

          // Add small random force to keep movement interesting
          symbol.vx += (Math.random() - 0.5) * 0.01;
          symbol.vy += (Math.random() - 0.5) * 0.01;

          // Limit maximum velocity
          const maxVel = 3;
          if (Math.abs(symbol.vx) > maxVel)
            symbol.vx = Math.sign(symbol.vx) * maxVel;
          if (Math.abs(symbol.vy) > maxVel)
            symbol.vy = Math.sign(symbol.vy) * maxVel;
        });

        // Check for collisions between symbols
        for (let i = 0; i < newSymbols.length; i++) {
          for (let j = i + 1; j < newSymbols.length; j++) {
            const symbol1 = newSymbols[i];
            const symbol2 = newSymbols[j];

            const dx = symbol2.x - symbol1.x;
            const dy = symbol2.y - symbol1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (symbol1.size + symbol2.size) / 2;

            if (distance < minDistance && distance > 0) {
              // Collision detected - calculate collision response
              const overlap = minDistance - distance;
              const separationX = (dx / distance) * overlap * 0.5;
              const separationY = (dy / distance) * overlap * 0.5;

              // Separate the symbols
              symbol1.x -= separationX;
              symbol1.y -= separationY;
              symbol2.x += separationX;
              symbol2.y += separationY;

              // Calculate collision velocities (elastic collision)
              const normalX = dx / distance;
              const normalY = dy / distance;

              const relativeVelocityX = symbol2.vx - symbol1.vx;
              const relativeVelocityY = symbol2.vy - symbol1.vy;

              const velocityAlongNormal =
                relativeVelocityX * normalX + relativeVelocityY * normalY;

              if (velocityAlongNormal > 0) continue; // Objects separating

              const restitution = 0.8; // Bounciness factor
              const impulse =
                (-(1 + restitution) * velocityAlongNormal) /
                (symbol1.mass + symbol2.mass);

              const impulseX = impulse * normalX;
              const impulseY = impulse * normalY;

              symbol1.vx -= impulseX * symbol2.mass;
              symbol1.vy -= impulseY * symbol2.mass;
              symbol2.vx += impulseX * symbol1.mass;
              symbol2.vy += impulseY * symbol1.mass;
            }
          }
        }

        return newSymbols;
      });

      animationRef.current = requestAnimationFrame(updatePhysics);
    };

    if (symbols.length > 0) {
      animationRef.current = requestAnimationFrame(updatePhysics);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [symbols.length]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-16 overflow-hidden"
    >
      {/* Enhanced grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/5 via-transparent to-pink-500/5" />

      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-blue-900/5 to-transparent" />
      {/* Professional animated background with physics */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Physics-based floating code symbols with collision */}
        {symbols.map((symbol) => (
          <div
            key={symbol.id}
            className="absolute text-blue-300/15 font-mono text-6xl select-none pointer-events-none transition-all duration-75 ease-linear"
            style={{
              left: symbol.x - symbol.size / 2,
              top: symbol.y - symbol.size / 2,
              width: symbol.size,
              height: symbol.size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${symbol.vx * 10}deg)`, // Rotate based on velocity
              filter: `blur(${Math.abs(symbol.vx + symbol.vy) * 0.5}px)`, // Motion blur effect
            }}
          >
            {symbol.text}
          </div>
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
