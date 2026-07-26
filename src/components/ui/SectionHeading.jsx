export default function SectionHeading({ label, title, description }) {
  return (
    <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
      {label && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
      {description && (
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
