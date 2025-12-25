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
  bio = "I hold a B.Sc. in Computer Science and have practical experience in server-side and distributed systems development, including microservices architectures. I am skilled in Java, Python, SQL, and modern backend technologies.",
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
    const constantSpeed = 1; // Fixed speed for all symbols

    const initialSymbols: Symbol[] = symbolTexts.map((text, i) => {
      // Generate random direction but maintain constant speed
      const angle = Math.random() * Math.PI * 2;
      return {
        id: i,
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * (window.innerHeight - 100) + 50,
        vx: Math.cos(angle) * constantSpeed,
        vy: Math.sin(angle) * constantSpeed,
        text,
        size: 60,
        mass: 1,
      };
    });
    setSymbols(initialSymbols);
  }, []);

  // Physics engine with collision detection
  useEffect(() => {
    let lastTime = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;
    const constantSpeed = 1; // Target speed for all symbols

    const normalizeVelocity = (symbol: Symbol) => {
      const currentSpeed = Math.sqrt(
        symbol.vx * symbol.vx + symbol.vy * symbol.vy
      );
      if (currentSpeed > 0) {
        symbol.vx = (symbol.vx / currentSpeed) * constantSpeed;
        symbol.vy = (symbol.vy / currentSpeed) * constantSpeed;
      }
    };

    const updatePhysics = (currentTime: number) => {
      if (currentTime - lastTime >= frameTime) {
        setSymbols((prevSymbols) => {
          const newSymbols = [...prevSymbols];
          const containerWidth = window.innerWidth;
          const containerHeight = window.innerHeight;
          const deltaTime = 0.015; // Fixed time step for consistent physics

          // Update positions with constant speed
          newSymbols.forEach((symbol) => {
            symbol.x += symbol.vx * deltaTime * 60;
            symbol.y += symbol.vy * deltaTime * 60;

            // Boundary collisions - reflect velocity but maintain speed
            if (
              symbol.x <= symbol.size / 2 ||
              symbol.x >= containerWidth - symbol.size / 2
            ) {
              symbol.vx *= -1; // Perfect reflection
              symbol.x = Math.max(
                symbol.size / 2,
                Math.min(containerWidth - symbol.size / 2, symbol.x)
              );
              normalizeVelocity(symbol); // Maintain constant speed
            }
            if (
              symbol.y <= symbol.size / 2 ||
              symbol.y >= containerHeight - symbol.size / 2
            ) {
              symbol.vy *= -1; // Perfect reflection
              symbol.y = Math.max(
                symbol.size / 2,
                Math.min(containerHeight - symbol.size / 2, symbol.y)
              );
              normalizeVelocity(symbol); // Maintain constant speed
            }

            // Add tiny random direction changes for variety (but maintain speed)
            const randomAngle = (Math.random() - 0.5) * 0.02;
            const currentAngle = Math.atan2(symbol.vy, symbol.vx);
            const newAngle = currentAngle + randomAngle;
            symbol.vx = Math.cos(newAngle) * constantSpeed;
            symbol.vy = Math.sin(newAngle) * constantSpeed;
          });

          // Optimized collision detection with speed preservation
          for (let i = 0; i < newSymbols.length; i++) {
            for (let j = i + 1; j < newSymbols.length; j++) {
              const symbol1 = newSymbols[i];
              const symbol2 = newSymbols[j];

              const dx = symbol2.x - symbol1.x;
              const dy = symbol2.y - symbol1.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const minDistance = (symbol1.size + symbol2.size) / 2;

              if (distance < minDistance && distance > 0) {
                // Separate the symbols
                const overlap = minDistance - distance;
                const separationX = (dx / distance) * overlap * 0.6;
                const separationY = (dy / distance) * overlap * 0.6;

                symbol1.x -= separationX;
                symbol1.y -= separationY;
                symbol2.x += separationX;
                symbol2.y += separationY;

                // Calculate collision response with speed preservation
                const normalX = dx / distance;
                const normalY = dy / distance;

                // Reflect velocities along the collision normal
                const dot1 = symbol1.vx * normalX + symbol1.vy * normalY;
                const dot2 = symbol2.vx * normalX + symbol2.vy * normalY;

                symbol1.vx -= 2 * dot1 * normalX;
                symbol1.vy -= 2 * dot1 * normalY;
                symbol2.vx -= 2 * dot2 * normalX;
                symbol2.vy -= 2 * dot2 * normalY;

                // Ensure both symbols maintain constant speed after collision
                normalizeVelocity(symbol1);
                normalizeVelocity(symbol2);
              }
            }
          }

          return newSymbols;
        });
        lastTime = currentTime;
      }

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
            className="absolute text-blue-300/15 font-mono text-6xl select-none pointer-events-none will-change-transform"
            style={{
              width: symbol.size,
              height: symbol.size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translate3d(${symbol.x - symbol.size / 2}px, ${
                symbol.y - symbol.size / 2
              }px, 0) rotate(${symbol.vx * 5}deg)`,
              filter: `blur(${Math.abs(symbol.vx + symbol.vy) * 0.2}px)`,
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
