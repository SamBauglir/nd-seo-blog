import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMobileMenu } from "@/hooks/use-mobile-menu";

export default function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, toggle, close } = useMobileMenu();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    close();
  }, [location, close]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/knowledge", label: "Knowledge Base" },
    { href: "#search", label: "Search" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      <nav className={`bg-white/90 backdrop-blur-sm shadow-sm py-4 px-4 md:px-8 transition-all`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo - Exact match from HTML file */}
          <a href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <i className="fa fa-bolt text-xl"></i>
            </div>
            <span className="text-xl font-bold text-primary">BESSEcho</span>
          </a>
          
          {/* Desktop Navigation - Exact match from HTML file */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="font-medium hover:text-primary transition-colors">Home</a>
            <a href="/blog" className="font-medium hover:text-primary transition-colors">Blog</a>
            <a href="/knowledge" className="font-medium hover:text-primary transition-colors">Knowledge</a>
            <a href="#inquire" className="font-medium hover:text-primary transition-colors">Inquire</a>
            <a href="#contact" className="font-medium hover:text-primary transition-colors">Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggle}
            className="md:hidden text-dark focus:outline-none"
          >
            <i className="fa fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white shadow-lg absolute w-full transition-all ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}>
        <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
          <a href="/" className="font-medium hover:text-primary transition-colors py-2">Home</a>
          <a href="/blog" className="font-medium hover:text-primary transition-colors py-2">Blog</a>
          <a href="/knowledge" className="font-medium hover:text-primary transition-colors py-2">Knowledge</a>
          <a href="#inquire" className="font-medium hover:text-primary transition-colors py-2">Inquire</a>
          <a href="#contact" className="font-medium hover:text-primary transition-colors py-2">Contact</a>
        </div>
      </div>
    </header>
  );
}
