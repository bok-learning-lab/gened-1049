import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl w-full space-y-16">
          {/* Header with editing-floor frame */}
          <div className="relative">
            {/* Crop marks */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <line x1="24" y1="8" x2="24" y2="36" stroke="white" strokeWidth="1" opacity="0.2" />
              <line x1="8" y1="24" x2="36" y2="24" stroke="white" strokeWidth="1" opacity="0.2" />
              <line x1="100%" y1="8" x2="100%" y2="36" stroke="white" strokeWidth="1" opacity="0.2" transform="translate(-24,0)" />
              <line x1="100%" y1="24" x2="100%" y2="24" stroke="white" strokeWidth="1" opacity="0.2" transform="translate(-36,0)" />
              <line x1="100%" y1="24" x2="100%" y2="24" stroke="white" strokeWidth="1" opacity="0.2" transform="translate(-8,0)" />
            </svg>

            <div className="text-center space-y-6 py-12">
              <span className="font-mono text-xs text-white/30 uppercase tracking-[0.4em]">
                Harvard University
              </span>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-300 via-amber-400 to-red-400 bg-clip-text text-transparent">
                GENED 1049
              </h1>
              <p className="text-2xl md:text-4xl font-semibold text-white/90">
                East Asian Cinema
              </p>
              <p className="text-lg md:text-xl text-white/40 max-w-3xl mx-auto">
                Video Production Workshop &amp; Interactive Film Analysis
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Video Essay Card */}
            <Link
              href="/video-essay/01"
              className="group relative overflow-hidden rounded-sm border border-white/10 hover:border-white/25 bg-white/[0.02] p-7 transition-all duration-300"
            >
              {/* Color grading dots */}
              <div className="absolute top-4 right-4 flex gap-1">
                {["#ff6644", "#44cc44", "#4488ff"].map((c, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c, opacity: 0.3 }} />
                ))}
              </div>

              <div className="space-y-4">
                <span className="font-mono text-[10px] text-orange-400/70 uppercase tracking-[0.3em]">
                  Interactive Essay
                </span>
                <h2 className="text-2xl font-bold text-white/90 group-hover:text-orange-300 transition-colors">
                  Shot by Shot
                </h2>
                <p className="text-sm text-white/40 leading-relaxed">
                  Analyzing Zhang Yimou&apos;s dialogue scene from <em className="text-white/50">To Live</em> (1994).
                  Explore how frame size, lighting, and editing create emotional intensity.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-orange-400/60 group-hover:text-orange-400/90 transition-colors uppercase tracking-wider">
                  <span>Explore</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Three-Point Lighting Card */}
            <Link
              href="/three-point-lighting"
              className="group relative overflow-hidden rounded-sm border border-white/10 hover:border-white/25 bg-white/[0.02] p-7 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 flex gap-1">
                {["#ff6644", "#44cc44", "#4488ff"].map((c, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c, opacity: 0.3 }} />
                ))}
              </div>

              <div className="space-y-4">
                <span className="font-mono text-[10px] text-orange-400/70 uppercase tracking-[0.3em]">
                  Interactive Lesson
                </span>
                <h2 className="text-2xl font-bold text-white/90 group-hover:text-orange-300 transition-colors">
                  Three-Point Lighting
                </h2>
                <p className="text-sm text-white/40 leading-relaxed">
                  How key, fill, and back light sculpt a face in Kurosawa&apos;s <em className="text-white/50">Rashomon</em> (1950).
                  Toggle lights on an interactive diagram.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-orange-400/60 group-hover:text-orange-400/90 transition-colors uppercase tracking-wider">
                  <span>Explore</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Workshop Resources Card */}
            <Link
              href="/gened-1049/workshop-overview"
              className="group relative overflow-hidden rounded-sm border border-white/10 hover:border-white/25 bg-white/[0.02] p-7 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 flex gap-1">
                {["#ff6644", "#44cc44", "#4488ff"].map((c, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c, opacity: 0.3 }} />
                ))}
              </div>

              <div className="space-y-4">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
                  Resources
                </span>
                <h2 className="text-2xl font-bold text-white/90 group-hover:text-orange-300 transition-colors">
                  Workshop Guide
                </h2>
                <p className="text-sm text-white/40 leading-relaxed">
                  Lighting, dialogue shooting, and AI tools for media production.
                  Hands-on techniques for creating video essays.
                </p>
                <div className="space-y-1.5 text-xs text-white/30 font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-400/40" />
                    <span>Three-point lighting fundamentals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-400/40" />
                    <span>Shot-reverse-shot techniques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-orange-400/40" />
                    <span>AI-assisted workflows</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-orange-400/60 group-hover:text-orange-400/90 transition-colors uppercase tracking-wider">
                  <span>View guide</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Key Concepts — editing-floor style */}
          <div className="max-w-3xl mx-auto mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-[0.4em]">Key Concepts</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-orange-400/50" />
                </div>
                <p className="text-xs font-mono text-white/40 uppercase tracking-wider">180-Degree Rule</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400/50" />
                </div>
                <p className="text-xs font-mono text-white/40 uppercase tracking-wider">Three-Point Lighting</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-400/50" />
                </div>
                <p className="text-xs font-mono text-white/40 uppercase tracking-wider">Shot-Reverse-Shot</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 mx-auto rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                </div>
                <p className="text-xs font-mono text-white/40 uppercase tracking-wider">AI Workflows</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
