import { useState, useEffect, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../../config/site";
import { useActiveSection, scrollToSection } from "../../hooks/useActiveSection";
import Button from "../ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = useMemo(() => siteConfig.navLinks.map((link) => link.id), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "glass-premium shadow-2xl shadow-cyan-500/10 py-3 border-b border-cyan-500/20" 
          : "bg-transparent py-5"
      }`}
    >
      <nav className="section-container px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 group"
          aria-label="Go to home"
        >
          <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:shadow-cyan-500/50 transition-all duration-300">
            SD
          </span>
          <span className="hidden sm:block font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">{siteConfig.name}</span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {siteConfig.navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeSection === link.id
                    ? "text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 shadow-lg shadow-cyan-500/20"
                    : "text-zinc-300 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button size="sm" onClick={() => handleNavClick("contact")}>
            Let&apos;s Connect
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden glass-premium border-t border-cyan-500/20 mt-2 mx-4 rounded-2xl p-4 animate-in fade-in slide-in-from-top-2 shadow-lg shadow-cyan-500/10">
          <ul className="flex flex-col gap-1">
            {siteConfig.navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeSection === link.id
                      ? "text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40"
                      : "text-zinc-300 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-4 border-t border-cyan-500/20">
              <Button className="w-full" onClick={() => handleNavClick("contact")}>
                Let&apos;s Connect
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
