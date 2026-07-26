import { useEffect } from "react";
import { X, ExternalLink, Calendar } from "lucide-react";
import { GitHubIcon } from "../ui/SocialIcons";
import Button from "../ui/Button";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 id="project-modal-title" className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <Calendar size={14} />
              {project.period}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        <p className="text-zinc-400 leading-relaxed mb-6">{project.longDescription}</p>

        {project.highlights?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">
              Key Highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((item, i) => (
                <li key={i} className="text-zinc-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.githubUrl ? (
            <Button href={project.githubUrl} external variant="secondary" size="sm">
              <GitHubIcon size={16} /> GitHub
            </Button>
          ) : (
            <Button variant="secondary" size="sm" disabled title="Add URL in src/data/projects.js">
              <GitHubIcon size={16} /> GitHub — Add URL
            </Button>
          )}
          {project.showLiveDemo && project.liveDemoUrl ? (
            <Button href={project.liveDemoUrl} external size="sm">
              <ExternalLink size={16} /> Live Demo
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Live Demo Coming Soon
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
