import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection.tsx";
import SkillsSection from "./SkillsSection";
import WorkExperienceSection from "./WorkExperience";
import ContactSection from "./ContactSection";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const navbarHeight = 64; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSectionClick={handleSectionClick} isScrolled={isScrolled} />

      <main>
        <div id="hero">
          <HeroSection />
        </div>

        <div id="skills">
          <SkillsSection />
        </div>

        <div id="experience">
          <WorkExperienceSection />
        </div>

        <div id="projects">
          <ProjectsSection />
        </div>

        <div id="contact">
          <ContactSection />
        </div>
      </main>
    </div>
  );
};

export default Home;
