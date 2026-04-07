"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const inferMimeType = (path: string | undefined) => {
  if (!path) return "video/mp4";
  if (path.endsWith(".webm")) return "video/webm";
  if (path.endsWith(".mov")) return "video/quicktime";
  if (path.endsWith(".mkv")) return "video/x-matroska";
  if (path.endsWith(".ogv")) return "video/ogg";
  return "video/mp4";
};

interface VideoSource {
  src: string;
  type?: string;
}

interface ScrollVideoProps {
  videoSrc: string;
  sources?: VideoSource[];
  className?: string;
  containerClassName?: string;
  stickyClassName?: string;
  renderContent?: (args: {
    video: React.ReactNode;
    isVideoLoaded: boolean;
    hadError: boolean;
    scrollProgress: number;
  }) => React.ReactNode;
}

export const ScrollVideo = ({
  videoSrc,
  sources,
  className = "",
  containerClassName,
  stickyClassName,
  renderContent,
}: ScrollVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hadError, setHadError] = useState(false);
  const targetTimeRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isActive, setIsActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const resolvedSources = useMemo(() => {
    const providedSources =
      sources?.filter((source): source is VideoSource => Boolean(source?.src)) ?? [];
    const list =
      providedSources.length > 0
        ? providedSources
        : typeof videoSrc === "string" && videoSrc.length > 0
          ? [{ src: videoSrc }]
          : [];

    return list.map((source) => ({
      src: source.src,
      type: source.type ?? inferMimeType(source.src),
    }));
  }, [videoSrc, sources]);

  const sourcesKey = useMemo(
    () => resolvedSources.map((source) => `${source.src}:${source.type ?? ""}`).join("|"),
    [resolvedSources],
  );

  useEffect(() => {
    const video = videoRef.current;
    setIsVideoLoaded(false);
    setHadError(false);
    targetTimeRef.current = 0;

    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.load();

    if (video.readyState >= 2) {
      setIsVideoLoaded(true);
    }
  }, [sourcesKey]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const handleScroll = () => {
      if (!video || !isVideoLoaded || !isActive) return;

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the container
      // When container top is at windowHeight, progress = 0
      // When container top is at -containerHeight, progress = 1
      const scrollStart = windowHeight;
      const scrollEnd = -containerHeight;
      const scrollDistance = scrollStart - scrollEnd;
      const currentScroll = containerTop - scrollEnd;
      const scrollProgress = Math.max(0, Math.min(1, 1 - currentScroll / scrollDistance));

      setScrollProgress(scrollProgress);

      // Set video time based on scroll progress
      if (video.duration) {
        targetTimeRef.current = scrollProgress * video.duration;
      }
    };

    // Initial check
    handleScroll();
    if (video.readyState >= 2) {
      setIsVideoLoaded(true);
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVideoLoaded, isActive]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isActive) return;

    const updateCurrentTime = () => {
      const targetTime = targetTimeRef.current;
      const currentTime = video.currentTime;

      if (!Number.isNaN(targetTime)) {
        const delta = targetTime - currentTime;

        if (Math.abs(delta) > 0.001) {
          video.currentTime = currentTime + delta * 0.25;
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    };

    animationFrameRef.current = requestAnimationFrame(updateCurrentTime);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };
  }, [isActive, sourcesKey]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsActive(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20% 0px",
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const videoNode = (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={cn("h-full w-full object-contain", className)}
        preload="auto"
        muted
        playsInline
        onLoadedMetadata={() => setIsVideoLoaded(true)}
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
        onError={() => setHadError(true)}
      >
        {resolvedSources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="text-center">
            {!hadError ? (
              <>
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
                <p className="text-muted-foreground">Loading video...</p>
              </>
            ) : (
              <p className="text-muted-foreground">Unable to load video.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className={cn("relative h-[300vh]", containerClassName)}>
      <div className={cn("sticky top-0 h-screen", stickyClassName)}>
        {renderContent ? renderContent({ video: videoNode, isVideoLoaded, hadError, scrollProgress }) : videoNode}
      </div>
    </div>
  );
};
