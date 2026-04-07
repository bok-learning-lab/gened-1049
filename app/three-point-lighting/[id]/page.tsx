"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { stills } from "../stills";
import { LightingDiagram } from "./LightingDiagram";

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

export default function StillDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const still = stills.find((s) => s.id === id);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollStart = windowHeight;
      const scrollEnd = -rect.height;
      const scrollDistance = scrollStart - scrollEnd;
      const currentScroll = rect.top - scrollEnd;
      const progress = Math.max(0, Math.min(1, 1 - currentScroll / scrollDistance));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!still) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-400">Still not found.</p>
          <Link href="/three-point-lighting" className="text-orange-400 hover:underline">
            Back to overview
          </Link>
        </div>
      </div>
    );
  }

  // Image fades as you scroll; diagram fades in
  const imageFade = scrollProgress < 0.15 ? 1 : Math.max(0, 1 - (scrollProgress - 0.15) / 0.2);
  const diagramFade = scrollProgress < 0.25 ? 0 : Math.min(1, (scrollProgress - 0.25) / 0.15);
  // Overlay info fades in early then out as diagram appears
  const infoFade = scrollProgress < 0.05
    ? Math.min(1, scrollProgress / 0.05)
    : scrollProgress > 0.3
      ? Math.max(0, 1 - (scrollProgress - 0.3) / 0.1)
      : 1;

  return (
    <div className="min-h-screen bg-black text-white">
      <FullscreenButton />

      {/* Back link */}
      <Link
        href="/three-point-lighting"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/70 transition-colors">
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors uppercase tracking-wider">
          Back
        </span>
      </Link>

      {/* Scroll container */}
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen">
          {/* Full-screen still image */}
          <div
            className="absolute inset-0 transition-opacity duration-100"
            style={{ opacity: imageFade }}
          >
            <Image
              src={still.src}
              alt={still.title}
              fill
              className="object-contain"
              priority
            />

            {/* Editing-floor frame overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ opacity: infoFade }}>
              {/* Border frame */}
              <div className="absolute inset-6 md:inset-8 border border-white/20 rounded-sm" />

              {/* Corner marks */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="32" y1="16" x2="32" y2="56" stroke="white" strokeWidth="1.5" opacity="0.3" />
                <line x1="16" y1="32" x2="56" y2="32" stroke="white" strokeWidth="1.5" opacity="0.3" />
                <line x1="100%" y1="16" x2="100%" y2="56" stroke="white" strokeWidth="1.5" opacity="0.3" transform="translate(-32,0)" />
                <line x1="100%" y1="32" x2="100%" y2="32" stroke="white" strokeWidth="1.5" opacity="0.3" transform="translate(-56,0)" />
                <line x1="100%" y1="32" x2="100%" y2="32" stroke="white" strokeWidth="1.5" opacity="0.3" transform="translate(-16,0)" />
              </svg>

              {/* Top bar */}
              <div className="absolute top-9 md:top-11 left-10 md:left-12 right-10 md:right-12 flex items-center justify-between">
                <span className="font-mono text-xs md:text-sm text-orange-400/80 uppercase tracking-widest">
                  Frame {still.id} / Three-Point Analysis
                </span>
                <div className="flex gap-1.5">
                  {["#ff6644", "#44cc44", "#4488ff"].map((c, i) => (
                    <div key={i} className="w-2 h-5 rounded-[1px]" style={{ backgroundColor: c, opacity: 0.3 }} />
                  ))}
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-10 md:bottom-12 left-10 md:left-12 max-w-[50%]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 leading-tight">
                  {still.title}
                </h1>
                <p className="text-sm md:text-base text-white/50 mt-3 leading-relaxed max-w-md">
                  {still.shotDescription}
                </p>
              </div>

              {/* Scroll hint */}
              <div className="absolute bottom-10 md:bottom-12 right-10 md:right-12 flex items-center gap-2 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400/60">
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <span className="font-mono text-xs text-white/30 uppercase tracking-wider">
                  Scroll to diagram
                </span>
              </div>
            </div>
          </div>

          {/* Interactive diagram (fades in as image fades out) */}
          <div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: diagramFade, pointerEvents: diagramFade > 0.3 ? "auto" : "none" }}
          >
            <div className="w-full">
              <div className="text-center mb-8">
                <span className="font-mono text-xs text-orange-400/70 uppercase tracking-widest">
                  Interactive Diagram
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white/90 mt-2">
                  {still.title} — Lighting Setup
                </h2>
                <p className="text-sm text-white/40 mt-2 font-mono">
                  Click each light to toggle it on and see how it illuminates the subject
                </p>
              </div>
              <LightingDiagram
                keyLight={still.keyLight}
                fillLight={still.fillLight}
                backLight={still.backLight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
