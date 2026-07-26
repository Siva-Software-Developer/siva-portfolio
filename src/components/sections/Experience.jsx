import { Briefcase, CheckCircle2 } from "lucide-react";
import { experiences } from "../../data/experience";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import ExperienceBackground3D from "../three/ExperienceBackground3D";
import { Suspense } from "react";

export default function Experience() {
  return (
    <section id="experience" className="relative section-padding section-surface overflow-hidden">
      <Suspense fallback={null}>
        <ExperienceBackground3D />
      </Suspense>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <SectionHeading
            label="Experience"
            title="Professional Journey"
            description="Hands-on software development experience building scalable applications in professional environments."
          />
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/80 via-cyan-500/40 to-violet-500/40 shadow-lg shadow-cyan-500/30" />

          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 0.1}>
              <article className="relative pl-16 md:pl-20 pb-12 last:pb-0">
                <div className="absolute left-3 md:left-5 top-1 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/40 border border-cyan-300/50">
                  <Briefcase size={14} className="text-white font-bold" />
                </div>

                <div className="glass-premium glass-hover rounded-2xl p-6 md:p-8 group border-cyan-500/30 shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">{exp.role}</h3>
                      <p className="text-cyan-300 font-semibold text-sm">{exp.company}</p>
                    </div>
                    <span className="inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-sm text-cyan-200 w-fit shadow-lg shadow-cyan-500/10 font-medium">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300 hover:text-zinc-200 transition-colors duration-300">
                        <CheckCircle2 size={18} className="text-cyan-400 shrink-0 mt-0.5 shadow-lg shadow-cyan-500/30" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
