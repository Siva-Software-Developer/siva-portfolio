import { Suspense, lazy, useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, LoaderCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { siteConfig } from "../../config/site";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import Button from "../ui/Button";
const ContactBackground3D = lazy(() => import("../three/ContactBackground3D"));

const initialFormState = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [formState, setFormState] = useState(initialFormState);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildMailtoLink = (values) => {
    const subject = `Portfolio contact: ${values.subject || "Hello"}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      "",
      values.message,
    ].join("\n");

    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const { provider, formspreeEndpoint, emailjs } = siteConfig.contactForm;
    const trimmedFormState = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      subject: formState.subject.trim(),
      message: formState.message.trim(),
    };

    if (!trimmedFormState.name || !trimmedFormState.email || !trimmedFormState.subject || !trimmedFormState.message) {
      setStatus("error");
      setIsSubmitting(false);
      return;
    }

    if (provider === "formspree" && formspreeEndpoint) {
      try {
        const res = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(trimmedFormState),
        });
        if (res.ok) {
          setStatus("success");
          setFormState(initialFormState);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (provider === "emailjs" && emailjs.serviceId && emailjs.templateId && emailjs.publicKey) {
      try {
        if (typeof window !== "undefined" && typeof window.emailjs?.send === "function") {
          await window.emailjs.send(
            emailjs.serviceId,
            emailjs.templateId,
            {
              from_name: trimmedFormState.name,
              from_email: trimmedFormState.email,
              subject: trimmedFormState.subject,
              message: trimmedFormState.message,
              to_email: siteConfig.email,
            },
            emailjs.publicKey,
          );

          setStatus("success");
          setFormState(initialFormState);
          setIsSubmitting(false);
          return;
        }
      } catch {
        setStatus("error");
        setIsSubmitting(false);
        return;
      }
    }

    if (typeof window !== "undefined") {
      window.location.href = buildMailtoLink(trimmedFormState);
      setStatus("success");
      setFormState(initialFormState);
    } else {
      setStatus("error");
    }

    setIsSubmitting(false);
  };

  const contactLinks = [
    { Icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, lucide: true },
    { Icon: LinkedInIcon, label: "LinkedIn", value: "Connect on LinkedIn", href: siteConfig.linkedin },
    { Icon: GitHubIcon, label: "GitHub", value: "View my repositories", href: siteConfig.github },
  ];

  return (
    <section id="contact" className="relative section-padding section-surface overflow-hidden">
      <Suspense fallback={null}>
        <ContactBackground3D />
      </Suspense>

      <div className="section-container relative z-10">
        <ScrollReveal>
          <SectionHeading
            label="Contact"
            title="Let's Connect"
            description="Interested in collaborating? Reach out via email or the contact form below."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <ScrollReveal className="lg:col-span-2 space-y-6">
            {contactLinks.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-4 rounded-xl glass-premium glass-hover group border-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-all duration-300 shadow-lg shadow-cyan-500/10">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">{label}</p>
                  <p className="text-zinc-200 group-hover:text-cyan-300 transition-colors duration-300 text-sm">{value}</p>
                </div>
              </a>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-premium rounded-2xl p-6 md:p-8 space-y-5 border-cyan-500/20 shadow-lg shadow-cyan-500/15">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-cyan-300 mb-2 font-semibold">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-cyan-300 mb-2 font-semibold">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-cyan-300 mb-2 font-semibold">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-cyan-300 mb-2 font-semibold">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle size={16} /> Your email app should open with your message ready. If it does not, send it directly to {siteConfig.email}.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={16} /> Please complete every field and try again. If the form still fails, email me directly at {siteConfig.email}.
                </div>
              )}

              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
