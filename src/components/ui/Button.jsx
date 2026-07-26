const variants = {
  primary:
    "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:brightness-110",
  secondary:
    "glass text-white hover:bg-white/10 border border-white/15",
  ghost:
    "text-zinc-300 hover:text-white hover:bg-white/5",
  outline:
    "border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/60",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  external = false,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
