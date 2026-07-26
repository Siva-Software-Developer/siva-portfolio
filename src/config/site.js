/**
 * Central configuration — update URLs and contact settings here.
 */

export const siteConfig = {
  name: "Siva Dharmalingam",
  title: "Software Developer",
  email: "imsiva32@gmail.com",

  // TODO: Replace with your real profile URLs
  github: "https://github.com/Siva-Software-Developer",
  linkedin: "https://www.linkedin.com/in/sivadharmalingam7",

  // Profile image — place your photo at public/profile.jpg and set path below
  profileImage: "/profile.jpg",

  // Resume PDF — place file at public/resume/Siva_Dharmalingam_Resume.pdf
  resumePath: "/resume/Siva_Dharmalingam_Resume.pdf",
  resumeFileName: "Siva_Dharmalingam_Resume.pdf",

  // Contact form — configure one provider when ready
  contactForm: {
    enabled: true,
    provider: "mailto", // "mailto" | "formspree" | "emailjs"
    formspreeEndpoint: "", // e.g. "https://formspree.io/f/xxxxxxxx"
    emailjs: {
      serviceId: "",
      templateId: "",
      publicKey: "",
    },
  },

  navLinks: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ],
};
