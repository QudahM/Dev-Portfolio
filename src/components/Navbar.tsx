import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface NavbarProps {
  onSectionClick?: (section: string) => void;
  isScrolled?: boolean;
}

const Navbar = ({
  onSectionClick = () => {},
  isScrolled = false,
}: NavbarProps) => {
  const navItems = [
    { label: "Home", section: "hero" },
    { label: "Skills", section: "skills" },
    { label: "Experience", section: "experience" },
    { label: "Projects", section: "projects" },
    { label: "Contact", section: "contact" },
  ];

  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better trigger point

      // Find the current section
      for (const item of navItems) {
        const element = document.getElementById(item.section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.section}
          variant="ghost"
          className={`text-sm font-medium transition-colors hover:text-white hover:bg-gray-800/50 ${activeSection === item.section ? "text-white bg-gray-800/50" : "text-gray-300"}`}
          onClick={() => onSectionClick(item.section)}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80 ${isScrolled ? "border-b border-gray-800" : ""}`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            className="text-lg font-bold text-white hover:bg-blue-800/50 font-mono"
            onClick={() => onSectionClick("hero")}
          >
            Portfolio
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
