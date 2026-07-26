import { Award, ExternalLink } from "lucide-react";
import { certifications } from "../../data/certifications";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import CertificationsBackground3D from "../three/CertificationsBackground3D";
import { Suspense } from "react";

export default function Certifications() {
  return (
    <section id="certifications" className="relative section-padding section-surface overflow-hidden">
      <Suspense fallback={null}>
        <CertificationsBackground3D />
      </Suspense>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <SectionHeading
            label="Certifications"
            title="Continuous Learning"
            description="Professional certifications in full-stack development, AI, cloud, and databases demonstrating expertise."
          />
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.title} delay={index * 0.06}>
              <article className="glass-premium glass-hover rounded-2xl p-5 h-full flex flex-col group border-amber-500/20 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-400 shrink-0 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300 border border-amber-500/30">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white leading-snug group-hover:text-amber-300 transition-colors duration-300">{cert.title}</h3>
                    <p className="text-sm text-zinc-400 mt-1 group-hover:text-zinc-300 transition-colors duration-300">
                      {cert.issuer}
                      {cert.year && ` · ${cert.year}`}
                    </p>
                  </div>
                </div>
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 transition-colors duration-300 font-semibold"
                  >
                    View Certificate <ExternalLink size={14} />
                  </a>
                ) : (
                  <span className="mt-auto text-xs text-zinc-600">
                    Add certificate URL in src/data/certifications.js
                  </span>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
