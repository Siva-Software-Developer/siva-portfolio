import { Mail, MapPin, GraduationCap, User, Phone } from "lucide-react";
import { personalInfo } from "../../data/personal";
import { siteConfig } from "../../config/site";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import AboutBackground3D from "../three/AboutBackground3D";
import { Suspense } from "react";

const infoItems = [
  { icon: User, label: "Name", value: personalInfo.name },
  { icon: User, label: "Role", value: personalInfo.role },
  { icon: MapPin, label: "Location", value: personalInfo.location },
  { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: GraduationCap, label: "Education", value: personalInfo.education },
  { icon: GraduationCap, label: "Graduation", value: personalInfo.graduation },
  { icon: Phone, label: "Phone", value: personalInfo.phone ?? "Add later in src/data/personal.js" },
];

export default function About() {
  return (
    <section id="about" className="relative section-padding section-surface overflow-hidden">
      <Suspense fallback={null}>
        <AboutBackground3D />
      </Suspense>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <SectionHeading
            label="About Me"
            title="Who I Am"
            description="A software developer focused on building reliable, full-stack applications with modern technologies."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <ScrollReveal className="lg:col-span-3 space-y-5">
            {personalInfo.about.map((paragraph, index) => (
              <p key={index} className="text-zinc-300 text-lg leading-relaxed hover:text-zinc-200 transition-colors duration-300">
                {paragraph}
              </p>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <div className="glass-premium rounded-3xl p-6 md:p-8 space-y-6 glow-cyan border-cyan-500/30">
              {/* Profile image placeholder */}
              <div className="flex flex-col items-center text-center">
                {siteConfig.profileImage ? (
                  <img
                    src={siteConfig.profileImage}
                    alt={personalInfo.name}
                    className="w-32 h-32 rounded-2xl object-cover border-2 border-cyan-500/30 mb-4 shadow-2xl shadow-cyan-500/20"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl glass-premium border-2 border-dashed border-cyan-500/30 flex flex-col items-center justify-center mb-4 glow-cyan">
                    <User size={32} className="text-cyan-400 mb-2" />
                    <span className="text-xs text-cyan-300 px-2">
                      Add photo in public/profile.jpg
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {infoItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3 p-2 rounded-lg hover:bg-cyan-500/5 transition-colors duration-300">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/10">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">{label}</p>
                      {href ? (
                        <a href={href} className="text-zinc-200 hover:text-cyan-300 transition-colors duration-300 text-sm">
                          {value}
                        </a>
                      ) : (
                        <p className={`text-zinc-200 text-sm ${label === "Phone" && !personalInfo.phone ? "text-zinc-500 italic" : ""}`}>
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
