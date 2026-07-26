import { Download, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { personalInfo } from "../../data/personal";
import { siteConfig } from "../../config/site";
import { scrollToSection } from "../../hooks/useActiveSection";
import Button from "../ui/Button";
import HeroVisual from "../ui/HeroVisual";
import ScrollReveal from "../ui/ScrollReveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center section-padding pt-28 md:pt-32 overflow-hidden section-surface"
    >
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-[120px] animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/15 to-transparent rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.15),transparent_50%)]" />
      </div>

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium text-sm text-cyan-300 glow-cyan fade-in-up">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="gradient-text animate-pulse">{personalInfo.name}</span>
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text">
                {personalInfo.role}
              </p>

              <p className="text-zinc-300 text-lg leading-relaxed max-w-xl">
                {personalInfo.headline}
              </p>

              <div className="flex items-center gap-2 text-zinc-400 text-sm glow-cyan p-3 rounded-lg glass">
                <MapPin size={16} className="text-cyan-400" />
                {personalInfo.location}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button onClick={() => scrollToSection("projects")}>
                  View My Projects
                </Button>
                <Button variant="secondary" onClick={() => scrollToSection("contact")}>
                  Contact Me
                </Button>
                <Button
                  variant="outline"
                  href={siteConfig.resumePath}
                  download={siteConfig.resumeFileName}
                >
                  <Download size={18} />
                  Download Resume
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-3 rounded-xl glass-premium glass-hover text-zinc-300 hover:text-cyan-300 glow-cyan transition-all duration-300"
                  title="GitHub — replace URL in src/config/site.js"
                >
                  <GitHubIcon size={24} />
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-3 rounded-xl glass-premium glass-hover text-zinc-300 hover:text-cyan-300 glow-cyan transition-all duration-300"
                  title="LinkedIn — replace URL in src/config/site.js"
                >
                  <LinkedInIcon size={24} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <HeroVisual />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
