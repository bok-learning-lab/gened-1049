---
name: scroll-video-prep
description: Prepare videos for smooth scroll-scrubbing web applications using ffmpeg. This skill should be used when users want to optimize videos for scroll-driven experiences where the video playback is controlled by scroll position (scroll-jacking, scroll-triggered video). It handles encoding with appropriate keyframe intervals (All-I, short GOP) to enable smooth, lag-free seeking as users scroll. Use when users request video preparation, optimization, or conversion for scroll-based web experiences, parallax scroll effects, or any scenario requiring frame-accurate video seeking.
---

# Scroll Video Prep

## Overview

Prepare videos for smooth scroll-scrubbing web applications. Normal video encoding optimizes for streaming, not random access, which causes lag when users control video playback via scroll position. This skill uses ffmpeg to encode videos with short GOP (Group of Pictures) structures or All-I (intra-only) encoding, ensuring smooth, instant seeking as users scroll.

## When to Use This Skill

Use this skill when users request:
- "Optimize this video for scroll scrubbing"
- "Prepare video for smooth scrolling website"
- "Convert video for scroll-driven experience"
- "Make this video work with scroll position"
- "Optimize for parallax scroll video"
- "Fix laggy scroll video"
- Any scenario involving scroll-controlled video playback

## Quick Start

Execute the `scripts/prep_scroll_video.sh` script with the user's input file:

```bash
# Default: All-I encoding, output to _output/
./scripts/prep_scroll_video.sh input.mp4

# Specify output directory
./scripts/prep_scroll_video.sh input.mp4 ./videos

# Choose specific preset
./scripts/prep_scroll_video.sh input.mp4 _output all-i      # Maximum smoothness
./scripts/prep_scroll_video.sh input.mp4 _output gop-0.5s  # Very smooth (recommended)
./scripts/prep_scroll_video.sh input.mp4 _output gop-1s    # Smooth, smaller size
```

The script automatically:
- ✅ Creates output directory if it doesn't exist
- ✅ Adds `_output/` to `.gitignore` (if using default location)
- ✅ Removes audio (web scroll apps don't need it)
- ✅ Scales to 1280px width for web
- ✅ Uses H.264 with yuv420p for maximum browser compatibility
- ✅ Adds faststart flag for progressive download
- ✅ Shows file size comparison

## Workflow

### 1. Identify User's Input File

Ask for or confirm the video file path if not provided. Common patterns:
- User provides explicit path: `"Optimize video.mp4"`
- User references file in project: `"Prepare the hero video for scrolling"`
- User uploads/shares file: Use the provided path

### 2. Determine Optimal Preset

Choose preset based on user's needs (or ask if unclear):

**all-i** (keyframe every frame)
- ✅ Use when: Maximum smoothness required, premium experience
- ❌ Avoid when: File size is a concern (5-10x larger)
- Examples: Short hero videos (<10s), high-end portfolios

**gop-0.5s** (keyframe every 0.5 seconds) **← RECOMMENDED DEFAULT**
- ✅ Use when: Most scroll-scrubbing scenarios
- ✅ Balance: Very smooth with reasonable file size
- Examples: Product showcases, story-driven scroll

**gop-1s** (keyframe every 1 second)
- ✅ Use when: Mobile-first, long videos, bandwidth-limited
- ⚠️ Trade-off: Slightly less smooth, smallest file size
- Examples: Long-form scroll (>30s), mobile experiences

If unsure, use **gop-0.5s** as the default.

### 3. Execute the Script

Run the `prep_scroll_video.sh` script with appropriate parameters:

```bash
cd /Users/mk/.claude/skills/scroll-video-prep
./scripts/prep_scroll_video.sh <user_input_file> [output_dir] [preset]
```

The script will:
1. Validate input file exists
2. Check ffmpeg is installed (provide install instructions if not)
3. Create output directory
4. Update .gitignore if needed
5. Run ffmpeg with optimized settings
6. Show file size comparison

### 4. Verify Output

After encoding, inform the user:
- ✅ Output file location
- 📊 File size comparison (input vs output)
- 🎬 Preset used and its characteristics
- 💡 Testing recommendations

### 5. Troubleshooting

**If ffmpeg is not installed:**
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg
```

**If file size is too large:**
- Suggest trying `gop-0.5s` or `gop-1s` preset
- Mention resolution/quality trade-offs

**If video still feels laggy:**
- Suggest moving to shorter GOP or `all-i` preset
- Recommend testing on actual devices (especially mobile Safari)

**If Safari/iOS compatibility issues:**
- Script already uses `yuv420p` (required for Safari)
- Ensure `faststart` flag is present (script includes this)

## Technical Details

For deeper understanding, consult `references/scroll_video_guide.md`:
- Why normal video is bad for scroll-scrubbing
- GOP structure explanation
- When to use each preset
- Browser compatibility notes
- Advanced customization options

Key technical points:
- **GOP (Group of Pictures)**: Distance between keyframes
- **Shorter GOP = smoother seeking** but larger files
- **All-I = zero GOP** (every frame is keyframe)
- **H.264 + yuv420p** = maximum compatibility
- **faststart** = progressive download for web

## Example Interactions

**Example 1: Simple optimization**
```
User: "Optimize hero-video.mp4 for smooth scrolling"
Claude: I'll prepare that video for smooth scroll-scrubbing using the recommended gop-0.5s preset.
→ Executes: ./scripts/prep_scroll_video.sh hero-video.mp4 _output gop-0.5s
→ Reports: Output location, file sizes, testing recommendations
```

**Example 2: Premium experience**
```
User: "Make this video perfect for our homepage - smoothness is critical"
Claude: For maximum smoothness, I'll use All-I encoding (keyframe every frame).
→ Executes: ./scripts/prep_scroll_video.sh homepage.mov _output all-i
→ Warns: File size will be larger, explains trade-off
```

**Example 3: Mobile-first**
```
User: "Prepare this for mobile, need to keep size down"
Claude: I'll use the gop-1s preset for smooth scrubbing with minimal file size.
→ Executes: ./scripts/prep_scroll_video.sh promo.mp4 _output gop-1s
→ Reports: Size savings, mobile testing suggestions
```

**Example 4: Custom output location**
```
User: "Put the output in public/videos/"
Claude: I'll encode to the public/videos/ directory.
→ Executes: ./scripts/prep_scroll_video.sh input.mp4 public/videos gop-0.5s
→ Notes: .gitignore only updated if using _output/
```

## Resources

### scripts/prep_scroll_video.sh
Bash script that handles the complete video preparation workflow:
- Input validation
- Output directory creation
- .gitignore management
- ffmpeg execution with optimized settings for each preset
- File size reporting

Execute directly from the skill directory or copy to project if needed.

### references/scroll_video_guide.md
Comprehensive technical documentation covering:
- The problem: Why normal video encoding causes scroll lag
- GOP structure and keyframe intervals
- Detailed preset comparison and use cases
- Browser compatibility notes (Safari, iOS, Chrome, Firefox)
- Advanced customization (custom GOP intervals, frame rates)
- Troubleshooting common issues

Load this reference when:
- User asks technical questions about encoding
- Debugging playback issues
- Choosing between presets is unclear
- Custom requirements beyond standard presets
