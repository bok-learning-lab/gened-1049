# Working with ffmpeg

`ffmpeg` is the Swiss Army knife of video processing. It's incredibly powerful, with thousands of possible workflows—but you don't need to master it all. This guide covers the most useful operations for video essay work.

## Philosophy: AI as Your ffmpeg Tutor

You don't need to memorize ffmpeg syntax. Instead:
1. **Describe what you want** to ChatGPT/Claude/Gemini
2. **Copy the command** it gives you
3. **Run it and see the result**
4. **If there's an error**, paste it back into the AI
5. **Save commands that work** for future reference

## Essential Workflows

### 1. Extract Stills for Analysis

Pull frames from a video to study composition, lighting, or mise-en-scène.

#### One Still Every 5 Seconds

```bash
mkdir -p ~/Desktop/godzilla_stills
ffmpeg -i ~/Desktop/godzilla.mp4 -vf fps=1/5 ~/Desktop/godzilla_stills/frame_%03d.jpg
```

**What this does:**
- Creates a folder called `godzilla_stills`
- Extracts one frame every 5 seconds (`fps=1/5`)
- Saves as `frame_001.jpg`, `frame_002.jpg`, etc.

#### Five Stills Per Second (More Granular)

```bash
ffmpeg -i ~/Desktop/godzilla.mp4 -vf fps=5 ~/Desktop/godzilla_stills/frame_%04d.jpg
```

Use this for close analysis of a specific sequence where you need frame-by-frame detail.

#### Extract a Single Frame at a Specific Time

```bash
ffmpeg -ss 01:23:45 -i ~/Desktop/godzilla.mp4 -frames:v 1 ~/Desktop/godzilla_frame.jpg
```

This grabs one frame at 1 hour, 23 minutes, 45 seconds.

---

### 2. Create Gifs for Close Reading

Gifs are perfect for highlighting a specific moment or gesture in your video essay.

#### Basic Gif from a Time Range

```bash
ffmpeg -ss 100 -to 105 -i ~/Desktop/godzilla.mp4 \
  -vf "fps=12,scale=640:-1:flags=lanczos" \
  ~/Desktop/godzilla_clip.gif
```

**What this does:**
- `-ss 100` → Start at 100 seconds (1:40)
- `-to 105` → End at 105 seconds (1:45)
- `fps=12` → 12 frames per second (smooth enough for most uses)
- `scale=640:-1` → Width of 640 pixels, height auto-calculated to preserve aspect ratio
- `flags=lanczos` → High-quality scaling algorithm

#### High-Quality Gif (Larger File)

```bash
ffmpeg -ss 100 -to 105 -i ~/Desktop/godzilla.mp4 \
  -vf "fps=24,scale=1280:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  ~/Desktop/godzilla_clip_hq.gif
```

This creates a custom color palette for better quality, useful for critical moments.

---

### 3. Extract Video Segments

Pull out a specific scene or sequence for editing or analysis.

#### Quick Copy (No Re-encoding)

```bash
ffmpeg -ss 60 -to 90 -i ~/Desktop/godzilla.mp4 -c copy ~/Desktop/godzilla_clip.mp4
```

**What this does:**
- Copies the segment from 1:00 to 1:30
- `-c copy` means no re-encoding (instant and lossless)
- Perfect for isolating a single shot or sequence

#### Re-encode with Compression

```bash
ffmpeg -ss 60 -to 90 -i ~/Desktop/godzilla.mp4 \
  -c:v libx264 -crf 23 -c:a aac \
  ~/Desktop/godzilla_clip_compressed.mp4
```

Use this if you need a smaller file size. `crf` controls quality (lower = better, 18-28 is typical).

---

### 4. Extract Audio

Pull audio tracks for analyzing dialogue, music, or sound design.

#### Extract Entire Audio Track

```bash
ffmpeg -i ~/Desktop/godzilla.mp4 -q:a 0 -map a ~/Desktop/godzilla_audio.mp3
```

#### Extract Audio from a Specific Segment

```bash
ffmpeg -i ~/Desktop/godzilla.mp4 -ss 60 -to 90 -q:a 0 -map a ~/Desktop/godzilla_scene_audio.mp3
```

This pulls just the audio between 1:00 and 1:30.

---

### 5. Compress Video for Web or Sharing

Make files smaller for uploading or embedding.

```bash
ffmpeg -i ~/Desktop/godzilla.mp4 \
  -vcodec libx264 -crf 28 \
  -acodec aac -b:a 128k \
  ~/Desktop/godzilla_compressed.mp4
```

**Quality settings:**
- `crf 18` → Very high quality, larger file
- `crf 23` → Good quality (default)
- `crf 28` → Smaller file, still acceptable quality
- `crf 32` → Low quality, very small file

---

### 6. Transcode to Editing-Friendly Formats

Convert to formats that work better with professional editing software.

#### Apple ProRes (for Final Cut, Premiere, DaVinci Resolve)

```bash
ffmpeg -i ~/Desktop/godzilla.mp4 \
  -c:v prores_ks -profile:v 3 \
  -c:a pcm_s16le \
  ~/Desktop/godzilla_prores.mov
```

This creates a high-quality intermediate file that's easy to edit but takes up more space.

---

### 7. Generate Visualizations

Create visual representations of your video data for analysis.

#### Contact Sheet (Grid of Frames)

```bash
ffmpeg -i ~/Desktop/godzilla.mp4 \
  -vf "fps=1/5,scale=320:-1,tile=5x5" \
  -q:v 2 \
  ~/Desktop/godzilla_contactsheet_%02d.jpg
```

**What this does:**
- Samples one frame every 5 seconds
- Arranges them in a 5×5 grid
- Creates a visual fingerprint of the entire video
- Great for seeing the overall rhythm and visual structure

#### Waveform Visualization (Audio)

```bash
ffmpeg -ss 100 -to 102 -i ~/Desktop/godzilla.mp4 \
  -filter_complex "[0:a]aformat=channel_layouts=mono,showwavespic=s=1280x200" \
  -frames:v 1 ~/Desktop/godzilla_waveform.png
```

Perfect for analyzing sound design or syncing analysis to specific audio moments.

---

### 8. Detect Scene Changes Automatically

Let ffmpeg find cuts and transitions for you.

```bash
ffmpeg -i ~/Desktop/godzilla.mp4 \
  -filter:v "select='gt(scene,0.4)',showinfo" \
  -f null - 2> ~/Desktop/cuts.txt
```

**What this does:**
- Analyzes visual differences between frames
- Logs timestamps where major changes occur (cuts, fades)
- Saves results to `cuts.txt`
- The `0.4` threshold can be adjusted (higher = fewer, more dramatic cuts)

---

### 9. Batch Process Multiple Files

Apply the same operation to many files at once.

```bash
for f in ~/Desktop/*.mp4; do
  ffmpeg -i "$f" -vcodec libx264 -crf 28 "${f%.mp4}_compressed.mp4"
done
```

This compresses all MP4 files in a folder, useful for preparing many clips at once.

---

## Using AI to Generate Commands

Instead of memorizing syntax, use this workflow:

### Step 1: Describe Your Goal

**Example prompt to AI:**
> I have a video at `~/Desktop/godzilla.mp4`. I want to extract one still image every 10 seconds and save them to a folder called `stills` on my Desktop. Give me the ffmpeg command.

### Step 2: Run the Command

Copy the AI's response and paste it into your terminal.

### Step 3: Troubleshoot Errors

If you get an error, paste it back into the AI:

**You:**
> I ran the command and got this error: `No such file or directory`

**AI:**
> The folder doesn't exist yet. Try this:
```bash
mkdir -p ~/Desktop/stills
ffmpeg -i ~/Desktop/godzilla.mp4 -vf fps=1/10 ~/Desktop/stills/frame_%03d.jpg
```

### Step 4: Save Useful Commands

Keep a notes file with commands that worked:

```bash
# Extract stills every 5 seconds
ffmpeg -i INPUT.mp4 -vf fps=1/5 OUTPUT_FOLDER/frame_%03d.jpg

# Create a gif from seconds 100-105
ffmpeg -ss 100 -to 105 -i INPUT.mp4 -vf "fps=12,scale=640:-1:flags=lanczos" OUTPUT.gif

# Extract audio
ffmpeg -i INPUT.mp4 -q:a 0 -map a OUTPUT.mp3
```

Replace `INPUT.mp4`, `OUTPUT_FOLDER`, etc., with your actual paths.

---

## Common Patterns

### Time Specification

You can specify time in multiple formats:

- **Seconds**: `-ss 90` (1:30)
- **Minutes:Seconds**: `-ss 01:30`
- **Hours:Minutes:Seconds**: `-ss 01:23:45`

### Quality Control

- **Video**: Use `-crf` (Constant Rate Factor, 0-51, lower is better)
- **Audio**: Use `-q:a` (0-9, lower is better) or `-b:a` (bitrate, e.g., `128k`)

### Combining Video Filters

Use `-vf` to chain filters with commas:

```bash
-vf "fps=1/5,scale=640:-1,unsharp=5:5:1.0"
```

This extracts frames, scales them, and applies sharpening.

---

## Tips and Best Practices

### 1. Test First on a Short Clip

Before processing a long video, test your command on a short segment:

```bash
ffmpeg -ss 60 -to 65 -i ~/Desktop/godzilla.mp4 -vf fps=1 ~/Desktop/test_frame_%03d.jpg
```

### 2. Use Descriptive Filenames

Instead of `output.mp4`, use:
- `godzilla_opening_scene.mp4`
- `godzilla_roar_moment.gif`
- `godzilla_cityscape_stills`

### 3. Organize by Project

Create folders for each essay:

```
~/Desktop/gened-1049/
├── godzilla/
│   ├── clips/
│   ├── stills/
│   └── gifs/
└── kurosawa/
    ├── clips/
    └── stills/
```

### 4. Keep a Command Log

Save commands in a `commands.txt` file:

```bash
# 2025-02-10: Extracted opening scene
ffmpeg -ss 0 -to 120 -i godzilla.mp4 -c copy opening.mp4

# 2025-02-11: Created gif of roar moment
ffmpeg -ss 305 -to 308 -i godzilla.mp4 -vf "fps=15,scale=800:-1:flags=lanczos" roar.gif
```

---

## Next Steps

Now that you can manipulate video files:

1. **Try the commands** on clips from the films we're studying
2. **Experiment with parameters** (frame rates, quality settings, time ranges)
3. **Combine with yt-dlp** to download and process clips in one workflow
4. **Build interactive essays** → [05-interactive-essays.md](./05-interactive-essays.md)

Remember: ffmpeg is a tool to support your analysis, not replace it. The technical skill of extracting frames or creating gifs is just scaffolding for your critical interpretation.
