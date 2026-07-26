import { Trophy, Globe } from "lucide-react";
import { achievements, languages } from "../../data/achievements";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import AchievementsBackground3D from "../three/AchievementsBackground3D";
import { Suspense } from "react";

export default function Achievements() {
  return (
    <section id="achievements" className="relative section-padding section-surface overflow-hidden">
      <Suspense fallback={null}>
        <AchievementsBackground3D />
      </Suspense>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <SectionHeading
            label="More About Me"
            title="Achievements & Languages"
            description="Recognitions and capabilities that define my professional profile"
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="glass-premium rounded-2xl p-6 md:p-8 group border-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300">
              <h3 className="flex items-center gap-3 text-lg font-semibold text-white mb-5 group-hover:text-cyan-300 transition-colors duration-300">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg shadow-cyan-500/20">
                  <Trophy size={24} className="text-cyan-400" />
                </div>
                Achievements
              </h3>
              <ul className="space-y-4">
                {achievements.map((item) => (
                  <li key={item.title} className="border-l-2 border-cyan-500/50 pl-4 hover:border-cyan-400 transition-colors duration-300 hover:bg-cyan-500/5 p-2 rounded">
                    <p className="text-zinc-200 font-semibold hover:text-cyan-300 transition-colors duration-300">{item.title}</p>
                    <p className="text-zinc-400 text-sm hover:text-zinc-300 transition-colors duration-300">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-premium rounded-2xl p-6 md:p-8 group border-violet-500/20 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-300">
              <h3 className="flex items-center gap-3 text-lg font-semibold text-white mb-5 group-hover:text-violet-300 transition-colors duration-300">
                <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 shadow-lg shadow-violet-500/20">
                  <Globe size={24} className="text-violet-400" />
                </div>
                Languages
              </h3>
              <ul className="space-y-4">
                {languages.map((item) => (
                  <li key={item.language} className="flex items-center justify-between p-3 rounded-lg hover:bg-violet-500/5 transition-all duration-300 group/lang">
                    <span className="text-zinc-200 font-semibold group-hover/lang:text-violet-300 transition-colors duration-300">{item.language}</span>
                    <span className="inline-flex px-3 py-1 rounded-full text-sm text-violet-300 bg-violet-500/10 border border-violet-500/30 group-hover/lang:bg-violet-500/20 group-hover/lang:border-violet-400 transition-all duration-300">{item.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
