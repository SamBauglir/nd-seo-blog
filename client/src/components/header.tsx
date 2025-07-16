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
      <nav className={`py-4 px-4 md:px-8 backdrop-blur-custom shadow-sm transition-all ${
        scrolled ? "bg-white/95" : "bg-white/80"
      }`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-[#165DFF] to-[#165DFF]/80 text-white p-2.5 rounded-xl shadow-lg">
              <i className="fa fa-bolt text-xl"></i>
            </div>
            <div>
              <span className="text-xl font-bold text-[#165DFF]">BESSEcho</span>
              <p className="text-xs text-gray-500 hidden sm:block">Advanced BESS Knowledge Platform</p>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="font-medium hover:text-[#165DFF] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#165DFF] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#contact"
              className="bg-[#165DFF] hover:bg-[#165DFF]/90 text-white font-medium py-2.5 px-6 rounded-lg transition-all shadow-lg hover:shadow-[#165DFF]/30"
            >
              Contact Experts
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggle}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            <i className="fa fa-bars text-2xl"></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden bg-white/95 backdrop-blur-custom shadow-lg absolute w-full transition-all ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}>
        <div className="container mx-auto py-6 px-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="font-medium hover:text-[#165DFF] transition-colors py-2"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact"
            className="font-medium hover:text-[#165DFF] transition-colors py-2"
          >
            Contact Experts
          </a>
        </div>
      </div>
    </header>
  );
}
