# Scroll Video Optimization Guide

This reference provides technical details about preparing videos for smooth scroll-scrubbing web applications.

## The Problem: Why Normal Video is Bad for Scroll-Scrubbing

Normal video encoding (H.264/H.265 with long-GOP) optimizes for file size and streaming, not random access:

- **Long-GOP structure**: Only some frames are keyframes (I-frames). Most frames are P-frames or B-frames that reference other frames.
- **Seeking penalty**: To seek to an arbitrary timestamp, the browser must decode forward from the previous keyframe, which causes jitter and lag.
- **User experience**: Scroll-driven video feels "sticky" or "laggy" because seeking is expensive.

## The Solution: Short GOP or All-I Encoding

To make scroll-scrubbing feel instant, reduce the distance between keyframes:

1. **All-I (Intra-only)**: Every frame is a keyframe → instant random access, but huge file size
2. **Short GOP**: Keyframe every N frames (e.g., every 0.5s or 1s) → smooth seeking without insane size
3. **Long GOP**: Normal encoding → poor scrubbing experience

## When to Use Each Preset

### all-i: Maximum Smoothness
**Use when:**
- Scroll experience must feel absolutely perfect
- File size is not a major concern (e.g., CDN serving, WiFi-only)
- Video is short or resolution is low enough to keep size reasonable

**Trade-offs:**
- ✅ Instant frame-accurate seeking
- ✅ No decoding lag whatsoever
- ❌ File size can be 5-10x larger than normal encoding
- ❌ Higher bandwidth requirements

**Typical use cases:**
- Premium landing pages with hero scroll videos
- Short cinematic scroll sections (<10 seconds)
- High-end portfolio sites

### gop-0.5s: Very Smooth (Recommended Default)
**Use when:**
- You want excellent scroll smoothness with reasonable file size
- Most scroll-scrubbing web applications

**Trade-offs:**
- ✅ Very smooth seeking (keyframe every 15 frames at 30fps)
- ✅ Much smaller than All-I (typically 2-3x smaller)
- ⚠️ Slight delay possible when seeking between keyframes (usually imperceptible)

**Typical use cases:**
- Product showcase scroll videos
- Story-driven scroll experiences
- Most web scroll-jacking implementations

### gop-1s: Smooth with Small Size
**Use when:**
- Bandwidth is limited (mobile networks)
- Video is long or high resolution
- Scroll speed is moderate (not frame-perfect control)

**Trade-offs:**
- ✅ Smooth scrubbing for most users
- ✅ Smallest file size while maintaining quality
- ⚠️ More noticeable lag when seeking between keyframes
- ⚠️ Less suitable for very slow/precise scroll control

**Typical use cases:**
- Mobile-first scroll experiences
- Long-form scroll videos (>30 seconds)
- Bandwidth-constrained scenarios

## Technical Details

### GOP (Group of Pictures)
The GOP structure determines how often keyframes appear:

- **keyint** (GOP size): Number of frames between keyframes
- **min-keyint**: Minimum GOP size (should match keyint for predictable structure)
- **scenecut**: Scene change detection (set to 0 to disable automatic keyframes)

### Why These ffmpeg Flags Matter

**`-an`**: Remove audio
- Web scroll apps typically don't need audio (just visual scrubbing)
- Reduces file size by ~10-20%

**`-vf "scale=1280:-2"`**: Scale to 1280px width
- Keeps video manageable for web
- `-2` maintains aspect ratio with even pixel count

**`-c:v libx264`**: Use H.264 codec
- Maximum browser compatibility (all modern browsers)
- Hardware decoding support on most devices

**`-pix_fmt yuv420p`**: Standard pixel format
- Required for QuickTime/Safari compatibility
- Most widely supported format

**`-movflags +faststart`**: Move moov atom to start
- Enables progressive download (start playing before full download)
- Critical for web video

**`-preset medium`**: Encoding speed/quality trade-off
- `fast`: Faster encoding, slightly larger files
- `medium`: Balanced (recommended)
- `slow`: Slower encoding, slightly smaller files

**`-crf 18-20`**: Constant Rate Factor (quality)
- Lower = better quality, larger file
- 18: Near-lossless (for All-I)
- 20: High quality (for GOP presets)
- 23: Default ffmpeg (generally too lossy for premium web)

**`-g` and `-keyint_min`**: GOP structure
- `-g 15`: Keyframe every 15 frames (0.5s at 30fps)
- `-g 30`: Keyframe every 30 frames (1s at 30fps)
- `-keyint_min`: Should match `-g` for predictable structure

**`-sc_threshold 0`**: Disable scene cut detection
- Ensures consistent GOP structure
- Prevents unexpected keyframes

**`-x264-params "keyint=1:min-keyint=1:scenecut=0"`**: All-I specific
- Forces keyframe every single frame
- Most reliable way to achieve true All-I encoding

## Browser Compatibility Notes

**Safari/iOS:**
- Requires `yuv420p` pixel format
- Benefits most from short GOP (seeking is slower on iOS)
- Test on actual devices (Safari can be quirky with video seeking)

**Chrome/Firefox:**
- Better seeking performance in general
- Can handle longer GOPs more gracefully
- Still benefits from optimization

**General:**
- H.264 is universally supported
- VP9/AV1 have better compression but less universal hardware decode
- Stick with H.264 for maximum compatibility

## Testing Your Video

After encoding, test the scroll experience:

1. **Frame-accurate seeking**: Scroll slowly and verify smooth frame transitions
2. **Fast scrubbing**: Scroll quickly and check for lag or jank
3. **Mobile testing**: Test on actual mobile devices (not just simulators)
4. **File size vs. quality**: Balance smoothness with download time

## Common Issues

**Problem: Video still feels laggy**
- Solution: Use All-I preset or shorter GOP

**Problem: File size is too large**
- Solution: Use longer GOP (gop-1s) or reduce resolution/quality

**Problem: Video won't play in Safari**
- Solution: Ensure `-pix_fmt yuv420p` is set

**Problem: Video loads slowly**
- Solution: Ensure `-movflags +faststart` is set

## Advanced: Custom GOP Intervals

For specific frame rates or custom intervals, calculate GOP size:

```
GOP size = FPS × desired_interval_seconds
```

Examples:
- 24fps, 0.5s interval: `-g 12 -keyint_min 12`
- 60fps, 0.25s interval: `-g 15 -keyint_min 15`
- 30fps, 2s interval: `-g 60 -keyint_min 60`

## Resources

- [ffmpeg H.264 Encoding Guide](https://trac.ffmpeg.org/wiki/Encode/H.264)
- [Web Video Best Practices](https://web.dev/video/)
- [H.264 GOP Structure Explanation](https://en.wikipedia.org/wiki/Group_of_pictures)
