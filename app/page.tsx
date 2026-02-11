import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-5xl text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              GENED 1049
            </h1>
            <p className="text-2xl md:text-4xl font-semibold text-foreground">
              East Asian Cinema
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Video Production Workshop &amp; Interactive Film Analysis
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mt-16">
            {/* Video Essay Card */}
            <Link
              href="/video-essay/02"
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-2xl hover:border-primary"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm uppercase tracking-[0.4em] text-primary font-semibold">
                    Interactive Essay
                  </span>
                </div>
                <h2 className="text-3xl font-bold group-hover:text-primary transition-colors">
                  Shot by Shot
                </h2>
                <p className="text-muted-foreground">
                  Analyzing Zhang Yimou&apos;s dialogue scene from <em>To Live</em> (1994).
                  Explore how frame size, lighting, and editing create emotional intensity.
                </p>
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <span>Explore the analysis</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Workshop Resources Card */}
            <Link
              href="/gened-1049/workshop-overview"
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-2xl hover:border-primary"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm uppercase tracking-[0.4em] text-muted-foreground font-semibold">
                    Resources
                  </span>
                </div>
                <h2 className="text-3xl font-bold">
                  Workshop Guide
                </h2>
                <p className="text-muted-foreground">
                  Lighting, dialogue shooting, and AI tools for media production.
                  Hands-on techniques for creating video essays.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Three-point lighting fundamentals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>Shot-reverse-shot techniques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>AI-assisted workflows</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <span>View workshop guide</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Key Concepts Section */}
          <div className="max-w-3xl mx-auto mt-24 space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold text-center">Key Concepts</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-4xl">🎬</div>
                <p className="text-sm font-medium">180-Degree Rule</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">💡</div>
                <p className="text-sm font-medium">Three-Point Lighting</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">🎭</div>
                <p className="text-sm font-medium">Shot-Reverse-Shot</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">🤖</div>
                <p className="text-sm font-medium">AI Workflows</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
