"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { stills } from "./stills";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200 group"
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/70 transition-colors">
          <polyline points="4 14 10 14 10 20" />
          <polyline points="20 10 14 10 14 4" />
          <line x1="14" y1="10" x2="21" y2="3" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/70 transition-colors">
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      )}
    </button>
  );
};

export default function ThreePointLightingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <FullscreenButton />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center space-y-6">
          <span className="font-mono text-xs md:text-sm text-orange-400/80 uppercase tracking-[0.3em]">
            Lighting Fundamentals
          </span>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-300 via-amber-400 to-red-400 bg-clip-text text-transparent">
            Three-Point Lighting
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            The foundation of cinematic lighting — key, fill, and back light working together
            to sculpt a face, separate subject from background, and control emotional tone.
          </p>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            From Akira Kurosawa&apos;s <em>Rashomon</em> (1950), cinematography by Kazuo Miyagawa:
            three frames of Toshiro Mifune as the bandit Tajōmaru, each lit with the same
            three-point foundation but tuned to radically different emotional registers.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 animate-bounce mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
              <path d="m6 9 6 6 6-6" />
            </svg>
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Three-Point Lighting Explanation */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white/90">
            What Is Three-Point Lighting?
          </h2>
          <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
            <p>
              Three-point lighting is the standard method used in visual media — film, television,
              photography, and stage design. It uses three separate light sources, each with a
              distinct purpose, to shape how a subject appears on screen.
            </p>
            <div className="grid md:grid-cols-3 gap-6 my-12">
              <div className="border border-white/10 rounded-xl p-6 space-y-3 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-amber-300/80" />
                <h3 className="text-lg font-semibold text-white">Key Light</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The primary and brightest source. Positioned to one side of the camera,
                  it creates the dominant shadows that model the face and establish the scene&apos;s
                  contrast ratio. In <em>Rashomon</em>, Miyagawa used mirrors to redirect
                  harsh sunlight as his key — an innovation born from necessity in the dense forest.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6 space-y-3 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-blue-300/60" />
                <h3 className="text-lg font-semibold text-white">Fill Light</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  A softer, less intense light placed opposite the key to control shadow
                  depth. The ratio between key and fill is the single most expressive
                  variable in the system. Kurosawa kept fill minimal for Tajōmaru, yielding
                  harsh contrast that made the bandit appear wild and unpredictable.
                </p>
              </div>
              <div className="border border-white/10 rounded-xl p-6 space-y-3 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-yellow-100/50" />
                <h3 className="text-lg font-semibold text-white">Back Light</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Positioned behind the subject, aimed toward the camera, it creates a
                  rim or halo of light along edges — separating the figure from the
                  background. In the forest scenes, dappled sunlight through the canopy
                  naturally served this role, giving Mifune a luminous silhouette edge.
                </p>
              </div>
            </div>
            <p>
              What makes <em>Rashomon</em> extraordinary is how consistently Miyagawa applies
              three-point principles to Tajōmaru across different shots, while varying the
              ratios to track the character&apos;s emotional arc. Click any frame below to
              explore its lighting interactively.
            </p>
          </div>
        </div>
      </section>

      {/* Stills Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stills.map((still, index) => (
              <Link
                key={still.id}
                href={`/three-point-lighting/${still.id}`}
                className="group relative block"
              >
                {/* Editing-floor frame */}
                <div className="relative overflow-hidden rounded-sm border border-white/15 group-hover:border-white/30 transition-colors duration-300">
                  {/* Corner crop marks */}
                  <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="4" x2="12" y2="20" stroke="white" strokeWidth="1" opacity="0.3" />
                    <line x1="4" y1="12" x2="20" y2="12" stroke="white" strokeWidth="1" opacity="0.3" />
                    <line x1="100%" y1="4" x2="100%" y2="20" stroke="white" strokeWidth="1" opacity="0.3" transform="translate(-12,0)" />
                    <line x1="100%" y1="12" x2="100%" y2="12" stroke="white" strokeWidth="1" opacity="0.3" transform="translate(-20,0)" />
                    <line x1="100%" y1="12" x2="100%" y2="12" stroke="white" strokeWidth="1" opacity="0.3" transform="translate(-4,0)" />
                  </svg>

                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={still.src}
                      alt={still.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  </div>

                  {/* Info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] text-orange-400/70 uppercase tracking-widest">
                        Frame {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white/90">{still.title}</h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{still.shotDescription}</p>
                  </div>

                  {/* Color grading dots */}
                  <div className="absolute top-3 right-3 flex gap-1 z-10">
                    {["#ff6644", "#44cc44", "#4488ff"].map((c, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c, opacity: 0.35 }} />
                    ))}
                  </div>

                  {/* Hover prompt */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="font-mono text-sm text-white/80 tracking-wider uppercase">
                      Explore Lighting →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
