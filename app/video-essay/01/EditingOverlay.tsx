"use client";

interface EditingOverlayProps {
  shotNumber: number;
  totalShots: number;
  shotType: string;
  title: string;
  summary: string;
  notes: string[];
  scrollProgress: number;
}

export const EditingOverlay = ({
  shotNumber,
  totalShots,
  shotType,
  title,
  summary,
  notes,
  scrollProgress,
}: EditingOverlayProps) => {
  // Phase timing:
  // 0.00–0.08: fade in overlay frame + title
  // 0.08–0.35: summary visible (longer dwell)
  // 0.30–0.90: cycle through notes one at a time (overlap for crossfade)
  // 0.90–1.00: fade out

  const fadeIn = Math.min(1, scrollProgress / 0.08);
  const fadeOut = scrollProgress > 0.9 ? 1 - (scrollProgress - 0.9) / 0.1 : 1;
  const overlayOpacity = Math.min(fadeIn, fadeOut);

  // Summary appears after initial fade-in and stays much longer
  const summaryFadeIn = scrollProgress > 0.06 ? Math.min(1, (scrollProgress - 0.06) / 0.06) : 0;
  const summaryFadeOut = scrollProgress > 0.30 ? Math.max(0, 1 - (scrollProgress - 0.30) / 0.06) : 1;
  const summaryOpacity = summaryFadeIn * summaryFadeOut;

  // Notes progression: each note gets an equal slice of 0.30–0.88
  const notesStart = 0.30;
  const notesEnd = 0.88;
  const notesRange = notesEnd - notesStart;
  const noteProgress =
    scrollProgress < notesStart
      ? 0
      : scrollProgress > notesEnd
        ? notes.length
        : ((scrollProgress - notesStart) / notesRange) * notes.length;

  const activeNoteIndex = Math.floor(noteProgress);
  const noteBlendIn = noteProgress - activeNoteIndex;

  // Fake timecode from scroll progress
  const totalSeconds = Math.floor(scrollProgress * 180);
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  const ff = String(Math.floor((scrollProgress * 180 * 24) % 24)).padStart(2, "0");
  const timecode = `${mm}:${ss}:${ff}`;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: overlayOpacity }}
    >
      {/* Registration / crop marks — corners (larger, bolder) */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Top-left */}
        <line x1="32" y1="16" x2="32" y2="56" stroke="white" strokeWidth="1.5" opacity="0.35" />
        <line x1="16" y1="32" x2="56" y2="32" stroke="white" strokeWidth="1.5" opacity="0.35" />
        {/* Top-right */}
        <line x1="100%" y1="16" x2="100%" y2="56" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(-32, 0)" />
        <line x1="100%" y1="32" x2="100%" y2="32" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(-56, 0)" />
        <line x1="100%" y1="32" x2="100%" y2="32" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(-16, 0)" />
        {/* Bottom-left */}
        <line x1="32" y1="100%" x2="32" y2="100%" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(0, -56)" />
        <line x1="32" y1="100%" x2="32" y2="100%" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(0, -16)" />
        <line x1="16" y1="100%" x2="56" y2="100%" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(0, -32)" />
        {/* Bottom-right */}
        <line x1="100%" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(-32, -56)" />
        <line x1="100%" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(-32, -16)" />
        <line x1="100%" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(-56, -32)" />
        <line x1="100%" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="1.5" opacity="0.35" transform="translate(-16, -32)" />
      </svg>

      {/* Border frame — more inset to cut into the shot */}
      <div className="absolute inset-6 md:inset-8 border border-white/25 rounded-sm" />

      {/* Top bar: timecode + shot info (bigger text) */}
      <div className="absolute top-9 md:top-11 left-10 md:left-12 right-10 md:right-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs md:text-sm text-white/50 tracking-wider">
            {timecode}
          </span>
          <span className="font-mono text-xs md:text-sm text-white/25">|</span>
          <span className="font-mono text-xs md:text-sm text-orange-400/80 uppercase tracking-widest">
            Shot {shotNumber}/{totalShots}
          </span>
        </div>
        <span className="font-mono text-xs md:text-sm text-white/35 uppercase tracking-wider">
          {shotType}
        </span>
      </div>

      {/* Left-side color grading reference bars (bigger) */}
      <div className="absolute left-9 md:left-11 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
        {["#ff4444", "#44ff44", "#4488ff", "#ffff44", "#ff44ff", "#44ffff"].map(
          (color, i) => (
            <div
              key={i}
              className="w-2 h-5 rounded-[1px]"
              style={{ backgroundColor: color, opacity: 0.3 }}
            />
          )
        )}
      </div>

      {/* Bottom-left: title (always visible once faded in, bigger) */}
      <div className="absolute bottom-10 md:bottom-12 left-10 md:left-12 max-w-[50%]">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 leading-tight">
          {title}
        </h2>
      </div>

      {/* Right panel: scrolling text content */}
      <div className="absolute right-10 md:right-12 top-20 md:top-24 bottom-20 md:bottom-24 w-[min(460px,42vw)] flex flex-col justify-center pointer-events-auto">
        {/* Summary */}
        {summaryOpacity > 0 && (
          <div style={{ opacity: summaryOpacity }}>
            <p className="text-base md:text-lg lg:text-xl text-white/85 leading-relaxed font-light">
              {summary}
            </p>
          </div>
        )}

        {/* Notes — one at a time, large and readable */}
        {scrollProgress >= notesStart && scrollProgress <= notesEnd && (
          <div className="relative">
            {notes.map((note, i) => {
              const isActive = i === activeNoteIndex;
              const isPast = i < activeNoteIndex;
              const opacity = isActive
                ? Math.min(1, noteBlendIn * 4)
                : isPast
                  ? 0
                  : 0;
              const translateY = isActive
                ? Math.max(0, (1 - noteBlendIn * 4) * 12)
                : 0;

              if (!isActive && !isPast) return null;
              if (isPast) return null;

              return (
                <div
                  key={i}
                  className="transition-none"
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px)`,
                  }}
                >
                  {/* Note number indicator */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex gap-1.5">
                      {notes.map((_, dotIdx) => (
                        <div
                          key={dotIdx}
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor:
                              dotIdx === i
                                ? "rgb(220, 100, 50)"
                                : dotIdx < i
                                  ? "rgba(180, 70, 40, 0.5)"
                                  : "rgba(120, 50, 30, 0.3)",
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[11px] md:text-xs text-white/30 uppercase tracking-wider">
                      Note {i + 1}/{notes.length}
                    </span>
                  </div>

                  <p className="text-base md:text-lg lg:text-xl text-white/85 leading-relaxed">
                    {note}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-10 md:bottom-12 right-10 md:right-12 left-[55%]">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500/50 rounded-full"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
