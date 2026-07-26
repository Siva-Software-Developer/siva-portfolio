import { Suspense, lazy } from "react";

const HeroScene3D = lazy(() => import("../three/HeroScene3D"));

export default function HeroVisual() {
  return (
    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[480px] group">
      {/* Animated glow background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
      
      <Suspense
        fallback={
          <div className="w-full h-full rounded-3xl glass-premium animate-pulse flex items-center justify-center border border-cyan-500/20">
            <span className="text-zinc-400 text-sm animate-pulse">Loading 3D scene...</span>
          </div>
        }
      >
        <HeroScene3D />
      </Suspense>

      {/* Code window overlay */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 glass-premium rounded-xl p-4 font-mono text-xs hidden sm:block glow-cyan border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <span className="ml-2 text-zinc-500">developer.js</span>
        </div>
        <pre className="text-zinc-300 leading-relaxed overflow-hidden">
          <code>
            <span className="text-violet-400">const</span>{" "}
            <span className="text-cyan-300 font-semibold">developer</span> = {"{"}
            {"\n"}  <span className="text-violet-400">name</span>:{" "}
            <span className="text-emerald-400">&apos;Siva&apos;</span>,{"\n"}{" "}
            <span className="text-violet-400">stack</span>: [
            <span className="text-emerald-400">&apos;Java&apos;</span>,{" "}
            <span className="text-emerald-400">&apos;React&apos;</span>],{"\n"}{" "}
            <span className="text-violet-400">passion</span>: <span className="text-emerald-400">&apos;3D Web&apos;</span>,{"\n"}{" "}
            <span className="text-violet-400">building</span>: <span className="text-emerald-400">true</span>
            {"\n"}
            {"}"};
          </code>
        </pre>
      </div>
    </div>
  );
}
