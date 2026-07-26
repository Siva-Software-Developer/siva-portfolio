import { useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { GitHubIcon } from "../ui/SocialIcons";
import { projects } from "../../data/projects";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import Button from "../ui/Button";
import ProjectModal from "./ProjectModal";
import ProjectsBackground3D from "../three/ProjectsBackground3D";
import { Suspense } from "react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative section-padding section-surface overflow-hidden">
      <Suspense fallback={null}>
        <ProjectsBackground3D />
      </Suspense>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <SectionHeading
            label="Projects"
            title="Featured Work"
            description="End-to-end applications spanning full-stack web development, AI/ML, and innovative solutions."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <article className="group glass-premium glass-hover rounded-2xl p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 border-cyan-500/20 shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/30">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-cyan-400/80 mb-4 font-semibold">{project.period}</p>
                  <p className="text-zinc-300 leading-relaxed mb-5 group-hover:text-zinc-200 transition-colors duration-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-xs text-cyan-200 border border-cyan-500/30 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/15 transition-all duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-cyan-500/20">
                  {project.githubUrl ? (
                    <Button href={project.githubUrl} external variant="ghost" size="sm">
                      <GitHubIcon size={16} /> GitHub
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" disabled title="Add URL in src/data/projects.js">
                      <GitHubIcon size={16} /> GitHub
                    </Button>
                  )}
                  {project.showLiveDemo && project.liveDemoUrl ? (
                    <Button href={project.liveDemoUrl} external variant="ghost" size="sm">
                      <ExternalLink size={16} /> Live Demo
                    </Button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs text-zinc-500">
                      Live Demo Coming Soon
                    </span>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                    <Eye size={16} /> View Details
                  </Button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
