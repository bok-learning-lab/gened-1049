# Building Interactive Video Essays

The video essay of the future isn't just linear narration over clips—it's a **web-based, interactive, multimodal experience** where readers control the pace, video responds to scrolling, and analysis lives alongside moving images.

This guide introduces the technical foundations for building scroll-synced video presentations using modern web technologies.

## Example: The Godzilla Essay

Check out [this interactive essay about Godzilla](https://gened-1145.vercel.app/video-essay/02) to see what's possible:

- Video playback synced to scroll position
- Analysis appears as you move through the essay
- Responsive design that works on phones and laptops
- Archival footage integrated with critical commentary

## Why Build Interactive Essays?

### Advantages Over Traditional Video Essays

**Traditional video essay (uploaded to YouTube/Vimeo):**
- Linear—viewer can't easily jump around
- Analysis delivered via voiceover (time-consuming to produce)
- Limited interactivity (just play/pause/scrub)
- Hard to update or revise

**Interactive web-based essay:**
- Reader controls the pace through scrolling
- Text and video coexist (multiple modes of engagement)
- Easy to update, revise, or add content
- Can embed primary sources, images, and supplementary materials
- Accessible to screen readers and keyboard navigation

### Academic Advantages

- **Close reading**: Pause at any frame to examine composition
- **Non-linear structure**: Link between related moments across the essay
- **Source transparency**: Embed citations and archival context directly
- **Multimodal argument**: Combine video, text, stills, and audio

---

## Technology Stack

This project uses modern web technologies. Don't worry if you're not familiar—AI can help you with the technical parts while you focus on the analysis.

### Core Technologies

**Next.js 16**
- A React framework for building web applications
- Handles routing, server rendering, and optimization automatically

**TypeScript**
- JavaScript with type checking
- Helps catch errors before they happen

**Tailwind CSS v4**
- A utility-first CSS framework
- Style with classes like `text-blue-500` and `p-4`

**shadcn/ui**
- Pre-built UI components
- Buttons, cards, and layout primitives

**MDX**
- Markdown with embedded React components
- Write in a familiar format with the power of interactivity

### What You Don't Need to Know

You don't need to be a professional developer to build this. AI can:
- Generate component code
- Debug errors
- Suggest styling
- Explain how pieces fit together

Your job: provide the analysis, structure the argument, and make aesthetic decisions.

---

## Getting Started

### 1. Set Up Your Development Environment

**Prerequisites:**
- Install [Node.js](https://nodejs.org/) (18 or later)
- Install [pnpm](https://pnpm.io/installation)

**Clone the starter repo:**
```bash
git clone https://github.com/your-university/gened-1049-video-essays.git
cd gened-1049-video-essays
pnpm install
pnpm dev
```

Open http://localhost:3000 in your browser to see the development server.

### 2. Understand the File Structure

```
your-project/
├── app/
│   ├── video-essay/
│   │   ├── 01/           # Your first essay
│   │   │   └── page.tsx
│   │   └── 02/           # Your second essay
│   │       └── page.tsx
│   ├── layout.tsx        # Site-wide layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # shadcn/ui components
│   └── scroll-video.tsx  # The scroll-synced video component
├── public/
│   └── video/            # Your video files go here
├── _scripts/
│   └── extract-clips.sh  # Script for preparing videos with ffmpeg
└── package.json
```

### 3. Prepare Your Video Clips

Use ffmpeg to prepare clips for the web:

```bash
# Extract a specific segment
ffmpeg -ss 00:00:30 -to 00:01:45 -i ~/Desktop/godzilla.mp4 -c copy public/video/godzilla-opening.mp4

# Or use the provided script for optimized web encoding
bash _scripts/extract-clips.sh ~/Desktop/godzilla.mp4 30 75 public/video/godzilla-opening.mp4
```

See [03-ffmpeg.md](./03-ffmpeg.md) for more video preparation techniques.

---

## Building Your Essay

### Step 1: Map Your Story

Before touching code, outline your essay:

**Example structure:**
1. **Clip 001**: Opening shot (0:00-0:15) → "Post-war ruins"
2. **Clip 002**: Witnesses react (0:15-0:30) → "Collective trauma"
3. **Clip 003**: First Godzilla appearance (0:30-1:00) → "Nuclear metaphor"
4. **Clip 004**: City destruction (1:00-1:30) → "Visual spectacle of annihilation"
5. **Clip 005**: Silent aftermath (1:30-1:45) → "Absence and memory"

Keep this outline in a Google Doc or notes file. It becomes your data structure.

### Step 2: Ask AI for Scaffolding

**Example prompt:**

> I'm building a Next.js video essay page using TypeScript and Tailwind CSS. I need:
>
> 1. A page component that imports a `ScrollVideo` component
> 2. An array of clips, where each clip has:
>    - `id` (string)
>    - `src` (video path)
>    - `title` (string)
>    - `summary` (short description)
>    - `notes` (longer analysis)
> 3. The page should render a hero section, then map over the clips
>
> Here's an example clip entry from an existing essay:
> ```typescript
> {
>   id: "clip-001",
>   src: "/video/godzilla-clip-001.mp4",
>   title: "Witnesses to Ruin",
>   summary: "The camera pans across destroyed buildings...",
>   notes: "Honda's opening establishes visual continuity with wartime newsreels..."
> }
> ```

AI will generate a page like `app/video-essay/03/page.tsx` with the structure you need.

### Step 3: Fill In Your Content

Replace the AI's placeholder content with your actual analysis:

```typescript
const clips = [
  {
    id: "clip-001",
    src: "/video/godzilla-opening.mp4",
    title: "Post-War Ruins",
    summary: "The opening shot surveys a devastated Tokyo streetscape.",
    notes: `Honda's opening shot deliberately echoes newsreel footage of
            post-war Tokyo. The slow pan across rubble establishes visual
            continuity between the historical trauma of 1945 and the
            fictional kaiju attack. This is your critical analysis—
            drawn from close viewing, course readings, and your interpretive
            framework. AI didn't write this; you did.`
  },
  // ... more clips
];
```

### Step 4: Test and Iterate

Run the development server:

```bash
pnpm dev
```

Visit http://localhost:3000/video-essay/03 to see your page.

**Common issues:**
- **TypeScript errors**: Copy the error message into AI and ask for a fix
- **Video not loading**: Check the file path in `public/video/`
- **Styling looks off**: Ask AI for Tailwind classes that match your vision

---

## The ScrollVideo Component

The magic of scroll-synced video comes from the `ScrollVideo` component:

```typescript
<ScrollVideo src="/video/godzilla-clip-001.mp4" />
```

This component:
- Plays/pauses the video based on scroll position
- Smoothly syncs video time to how far you've scrolled
- Works on mobile and desktop
- Automatically handles loading and buffering

You don't need to understand how it works internally—just use it like any other component.

---

## Styling Your Essay

### Using Tailwind CSS

Style with utility classes:

```tsx
<h2 className="text-3xl font-bold text-blue-600 mb-4">
  Post-War Ruins
</h2>

<p className="text-lg leading-relaxed text-gray-700">
  Honda's opening shot deliberately echoes newsreel footage...
</p>
```

### Example: Gradient Text (Godzilla's Electric Blues)

**Ask AI:**
> I want the essay title to have a blue-to-cyan gradient that echoes Godzilla's atomic breath. Give me the Tailwind classes.

**AI response:**
```tsx
<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
  Godzilla: Witnessing Catastrophe
</h1>
```

### Example: Dark Theme with Film Noir Aesthetic

**Ask AI:**
> Make the page background dark with light text, evoking classic noir cinematography. The background should be deep charcoal, text should be off-white with slightly reduced contrast for readability.

---

## Prompt Patterns That Work

### Pattern 1: Read and Explain

**Prompt:**
> Read this file and explain the structure: [paste page.tsx]

Use this to understand how the pieces fit together before modifying them.

### Pattern 2: Transform Notes into Structured Data

**Prompt:**
> Transform these notes into a TypeScript array of clip objects:
>
> - Opening shot (0:00-0:15): destroyed buildings, slow pan
> - Witnesses react (0:15-0:30): collective trauma on faces
> - Godzilla appears (0:30-1:00): emerging from water, nuclear metaphor

AI will generate the clip array structure you can paste into your code.

### Pattern 3: Suggest UI Flourishes

**Prompt:**
> Suggest UI flourishes that amplify the theme of witnessing and collective memory. Consider: scroll cues, ambient audio toggles, split-screen comparisons, or annotation overlays.

AI might suggest ideas you hadn't considered, which you can then evaluate and implement.

---

## Staying in Creative Control

### 1. Reserve Interpretation for Yourself

**AI can:**
- ✅ Generate component structure
- ✅ Debug TypeScript errors
- ✅ Suggest layout patterns
- ✅ Provide Tailwind styling options

**AI cannot (and should not):**
- ❌ Interpret the film for you
- ❌ Develop your argument
- ❌ Write your critical analysis
- ❌ Make aesthetic decisions that reflect your vision

### 2. Keep a Changelog

Document what came from where:

**Example:**
```
# Essay 03: Godzilla and Post-War Memory

## 2025-02-12
- Generated initial page scaffold with Claude (component structure)
- Wrote analysis for clips 001-003 (my work)
- Debugged video path error with ChatGPT (technical help)

## 2025-02-13
- Refined styling to evoke noir aesthetic (my decisions, AI execution)
- Added fourth clip with analysis (my work)
- Built responsive layout with shadcn components (AI scaffolding)
```

### 3. Run Quality Checks

Before considering your essay done:

```bash
# Check for errors
pnpm lint

# Build for production to catch issues
pnpm build

# Test on mobile
# (use browser dev tools to simulate)
```

---

## Example Workflow: Start to Finish

### Day 1: Planning and Preparation
1. Watch the film segment multiple times
2. Take notes on key moments and your analysis
3. Create a rough outline of 4-6 clips
4. Download clips with yt-dlp (or use provided materials)

### Day 2: Technical Setup
1. Use ffmpeg to extract and prepare video segments
2. Place video files in `public/video/`
3. Ask AI to generate page scaffold
4. Verify the page loads at http://localhost:3000/video-essay/03

### Day 3: Content and Analysis
1. Fill in clip titles and summaries
2. Write detailed interpretive notes for each clip
3. Connect analysis to course readings and themes
4. Add citations and sources

### Day 4: Styling and Refinement
1. Ask AI for styling suggestions
2. Adjust typography, spacing, colors
3. Test on mobile and desktop
4. Run `pnpm build` to check for errors

### Day 5: Final Review
1. Read through your entire essay
2. Check that video syncs smoothly
3. Ensure analysis is clear and well-supported
4. Submit or publish

---

## Advanced Features (Optional)

Once you're comfortable with the basics, consider:

### Split-Screen Comparisons

Show two clips side-by-side:

**Ask AI:**
> Create a component that displays two videos side-by-side, both synced to scroll, to compare Honda's 1954 Godzilla with the 2014 remake.

### Annotation Overlays

Highlight specific visual elements:

**Ask AI:**
> Generate a component that overlays a semi-transparent annotation box on a video at a specific timestamp, pointing out a detail in the composition.

### Reader-Controlled Branching

Let readers choose which sequence to explore next:

**Ask AI:**
> Create a navigation component that lets readers choose between "Destruction" and "Aftermath" paths through the essay.

---

## Accessibility Considerations

Make your essay accessible to all readers:

### Alt Text for Images

```tsx
<img
  src="/stills/godzilla-frame-021.jpg"
  alt="Godzilla emerging from Tokyo Bay, filmed from low angle with human figures in foreground"
/>
```

### Video Captions

Ask AI to generate a VTT caption file:

**Prompt:**
> Create a WebVTT caption file for this clip with timestamps and transcribed dialogue: [paste dialogue]

### Keyboard Navigation

Ensure the page works without a mouse:
- Test with Tab key
- Check that videos are keyboard-accessible

---

## Deployment (Publishing Your Essay)

When your essay is ready to share:

### Option 1: Vercel (Easiest)

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Vercel automatically builds and deploys
4. Share the URL with your class

### Option 2: GitHub Pages

1. Build the static export: `pnpm build && pnpm export`
2. Push the `out/` folder to a `gh-pages` branch
3. Enable GitHub Pages in your repo settings

### Option 3: University Server

1. Build the static export: `pnpm build && pnpm export`
2. Upload the `out/` folder to your university web space
3. Share the URL

---

## Troubleshooting

### Videos Won't Play

- Check file paths (they're case-sensitive!)
- Verify files are in `public/video/`
- Try a different video format (see [03-ffmpeg.md](./03-ffmpeg.md))

### Scroll-Sync Feels Jerky

- Reduce video file size (see compression in [03-ffmpeg.md](./03-ffmpeg.md))
- Ensure videos are encoded with frequent keyframes:
  ```bash
  ffmpeg -i input.mp4 -c:v libx264 -g 12 -crf 23 output.mp4
  ```

### TypeScript Errors

Paste the error into AI:

**Example:**
> I'm getting this error: `Property 'src' does not exist on type 'IntrinsicAttributes'`. How do I fix it?

### Styling Not Applying

- Check that Tailwind classes are spelled correctly
- Verify you're using Tailwind v4 syntax (see project docs)
- Try clearing the cache: `rm -rf .next && pnpm dev`

---

## Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)

### Inspiration
- [The New York Times: Snow Fall](https://www.nytimes.com/projects/2012/snow-fall/) (pioneering multimedia story)
- [The Pudding](https://pudding.cool/) (visual essays on culture)
- [Film Analysis Websites](https://www.criterion.com/current) (Criterion's video essays)

### Community
- Ask questions in section or office hours
- Share works-in-progress with classmates
- Collaborate on technical challenges (while keeping analysis original)

---

## Bringing It Back to the Course

The scroll-synced video essay demonstrates how:

1. **Reader agency** shapes the experience (pace, re-viewing, jumping around)
2. **Multimodal assets** (video, text, stills) enrich critical analysis
3. **Critical storytelling** fuses with technological affordances
4. **Generative AI** accelerates technical tasks so you can focus on interpretation

You're not just writing about East Asian cinema—you're **imagining the future of film criticism itself**, where computational tools and humanistic inquiry meet.

When you combine your analytical lens with AI-assisted coding, you're literally vibe-coding the video essay of the future: a living document where film history, computation, and collaborative authorship converge.

---

## Next Steps

1. **Start small**: Build a simple 3-clip essay to learn the workflow
2. **Experiment boldly**: Try unusual layouts or interactive elements
3. **Iterate based on feedback**: Show drafts to peers and instructors
4. **Share your work**: Publish online and add it to your portfolio

The goal isn't perfection—it's exploration. Use AI to handle the plumbing so you can focus on what matters: your critical voice and analytical insights.
