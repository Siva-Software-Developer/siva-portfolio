import { skillCategories } from "../../data/skills";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import SkillsBackground3D from "../three/SkillsBackground3D";
import { Suspense } from "react";

export default function Skills() {
  return (
    <section id="skills" className="relative section-padding section-surface overflow-hidden">
      <Suspense fallback={null}>
        <SkillsBackground3D />
      </Suspense>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <SectionHeading
            label="Skills"
            title="Technical Expertise"
            description="Mastering technologies and tools to build cutting-edge full-stack applications."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.08}>
              <article className="glass-premium glass-hover rounded-2xl p-6 h-full group border-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3 group-hover:text-cyan-300 transition-colors duration-300">
                  <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-cyan-400 via-blue-400 to-violet-400 shadow-lg shadow-cyan-500/30" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-sm text-cyan-200 hover:border-cyan-400/50 hover:text-cyan-100 hover:bg-cyan-500/20 transition-all duration-300 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/15"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
