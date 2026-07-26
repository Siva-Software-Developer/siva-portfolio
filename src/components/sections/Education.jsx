import { Suspense, lazy } from "react";
import { GraduationCap } from "lucide-react";
import { education } from "../../data/education";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
const EducationBackground3D = lazy(() => import("../three/EducationBackground3D"));

export default function Education() {
  return (
    <section id="education" className="relative section-padding section-surface overflow-hidden">
      <Suspense fallback={null}>
        <EducationBackground3D />
      </Suspense>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <SectionHeading
            label="Education"
            title="Academic Background"
            description="Formal education in computer science and engineering with strong academic performance."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((item, index) => (
            <ScrollReveal key={item.degree} delay={index * 0.08}>
              <article className="glass-premium glass-hover rounded-2xl p-6 h-full group border-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300 border border-cyan-500/30">
                  <GraduationCap className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" size={28} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">{item.degree}</h3>
                <p className="text-zinc-300 text-sm mb-4 leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">{item.institution}</p>
                <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-300">
                  <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors duration-300">{item.year}</span>
                  <span className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors duration-300">Aggregate: {item.aggregate}</span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
