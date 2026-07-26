import { Suspense, lazy } from "react";
import { Mail, ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { siteConfig } from "../../config/site";
const FooterBackground3D = lazy(() => import("../three/FooterBackground3D"));

export default function Footer() {
  const socialLinks = [
    { Icon: GitHubIcon, href: siteConfig.github, label: "GitHub" },
    { Icon: LinkedInIcon, href: siteConfig.linkedin, label: "LinkedIn" },
    { Icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-cyan-500/20 section-surface overflow-hidden">
      <Suspense fallback={null}>
        <FooterBackground3D />
      </Suspense>

      <div className="section-container section-padding py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-zinc-200 font-semibold text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              © 2026 {siteConfig.name}
            </p>
            <p className="text-zinc-400 text-sm mt-2 hover:text-cyan-300 transition-colors duration-300">
              Built with React.js, Three.js & Tailwind CSS
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Crafted with ✨ creativity and 🚀 passion
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="p-3 rounded-xl glass-premium glass-hover text-zinc-300 hover:text-cyan-300 border-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300"
                  title={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 hover:text-cyan-300 hover:from-cyan-500/40 hover:to-blue-500/40 border border-cyan-500/30 transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cyan-500/10 text-center text-zinc-500 text-xs">
          <p>© 2026 Siva Dharmalingam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
