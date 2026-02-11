# Working with yt-dlp

`yt-dlp` is a powerful command-line tool for downloading video from YouTube and hundreds of other platforms. It's the same technology that powers those sketchy YouTube downloader websites (but without the pop-ups and malware).

## Why Use yt-dlp?

- **Control**: Choose exactly the format, quality, and filename you want
- **Reliability**: Works when web-based downloaders fail or get blocked
- **Automation**: Easy to script batch downloads or integrate with other tools
- **No ads, no tracking**: Just you and the terminal

## Basic Usage

### Download a Video

Find a YouTube video you want to analyze, copy its URL, and run:

```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" -o ~/Desktop/%(title)s.%(ext)s
```

**What this does:**
- Downloads the video in the best available quality
- Saves it to your Desktop
- Uses the video's title as the filename
- Automatically adds the correct file extension

### Understanding the Output Template

The `-o` (output) flag lets you control where and how the file is saved:

- `~/Desktop/` → Your Desktop folder
- `%(title)s` → The video's title (e.g., "Godzilla 1954 Opening")
- `%(ext)s` → The file extension (e.g., "mp4", "webm")

You can also use:
- `%(id)s` → YouTube video ID
- `%(uploader)s` → Channel name
- `%(upload_date)s` → Date uploaded (YYYYMMDD)

## Choosing Video Formats

The default download format might not work well with your editing software. For example, YouTube often serves `.webm` files, which don't play nicely on macOS.

### Download as MP4 (Mac-Friendly)

```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" \
  -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]" \
  --merge-output-format mp4 \
  -o ~/Desktop/%(title)s.mp4
```

**What this does:**
- `-f` specifies the format selection
- `bv*[ext=mp4]` → best video in MP4 container
- `ba[ext=m4a]` → best audio in M4A container
- `--merge-output-format mp4` → combines video and audio into a single MP4 file

### Download Lower Quality (Smaller Files)

If you don't need full HD:

```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" \
  -f "bestvideo[height<=720]+bestaudio/best[height<=720]" \
  --merge-output-format mp4 \
  -o ~/Desktop/%(title)s_720p.mp4
```

This limits video to 720p, which is often plenty for video essay clips.

## Downloading Audio Only

Perfect for analyzing dialogue, music, or sound design:

```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" \
  -x --audio-format mp3 \
  -o ~/Desktop/%(title)s.mp3
```

**What this does:**
- `-x` → Extract audio only
- `--audio-format mp3` → Convert to MP3
- Saves just the audio track

## Downloading Specific Time Ranges

Download only part of a video:

```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" \
  --download-sections "*60-180" \
  -o ~/Desktop/%(title)s_clip.mp4
```

This downloads seconds 60-180 (1:00 to 3:00) only.

## Useful Flags and Options

### Get Video Information (Without Downloading)

```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" --print "%(title)s | %(duration>%H:%M:%S)s | %(resolution)s"
```

### List All Available Formats

```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" -F
```

This shows every quality and format option available. You can then download a specific format by its code:

```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" -f 137+140
```

### Add Subtitles

```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" \
  --write-auto-subs \
  --sub-lang en \
  --embed-subs \
  -o ~/Desktop/%(title)s.mp4
```

This downloads English auto-generated subtitles and embeds them in the video file.

## Using AI to Help

Don't memorize all these flags! Instead:

1. **Copy the video URL**
2. **Paste it into ChatGPT/Claude/Gemini** with a prompt like:
   - "Give me the yt-dlp command to download this as MP4 to my Desktop"
   - "I need a 480p version of this video for easier editing"
   - "Download just the audio from this video as MP3"
3. **Run the command** in your terminal
4. **If you get an error**, paste the error back into the AI and ask for a fix

### Example AI Conversation

**You:**
> I want to download this video: https://www.youtube.com/watch?v=EjNYWCH-fJw
> Save it to my Desktop as an MP4 file

**AI:**
```bash
yt-dlp "https://www.youtube.com/watch?v=EjNYWCH-fJw" \
  -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]" \
  --merge-output-format mp4 \
  -o ~/Desktop/%(title)s.mp4
```

**You (after trying it):**
> I got an error: "ERROR: unable to download video data: HTTP Error 403: Forbidden"

**AI:**
> Try updating yt-dlp first, then retry:
```bash
brew upgrade yt-dlp  # macOS
choco upgrade yt-dlp -y  # Windows
```

## Tips and Best Practices

### 1. Update Regularly
YouTube changes frequently. Keep yt-dlp current:

```bash
brew upgrade yt-dlp  # macOS
choco upgrade yt-dlp -y  # Windows
```

### 2. Organize Your Downloads
Create a project folder:

```bash
yt-dlp "URL" -o ~/Desktop/gened-1049-clips/%(title)s.%(ext)s
```

### 3. Save Your Commands
Keep a notes file with the commands you use most:

```bash
# Download as MP4 for editing
yt-dlp "URL" -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]" --merge-output-format mp4 -o ~/Desktop/%(title)s.mp4

# Download audio only
yt-dlp "URL" -x --audio-format mp3 -o ~/Desktop/%(title)s.mp3
```

### 4. Respect Copyright
Only download videos for:
- Educational analysis (fair use)
- Personal study
- Clips you have permission to use

Don't redistribute full copyrighted films.

## Common Errors and Solutions

| Error | Solution |
|-------|----------|
| "Command not found" | Make sure yt-dlp is installed (see [01-installation.md](./01-installation.md)) |
| "HTTP Error 403" | Update yt-dlp: `brew upgrade yt-dlp` |
| "Unsupported URL" | Check that the platform is supported: `yt-dlp --list-extractors` |
| "Requested format not available" | Try removing format restrictions: `yt-dlp "URL"` |

## Next Steps

Now that you can download clips:

1. **Extract stills and create gifs** → [03-ffmpeg.md](./03-ffmpeg.md)
2. **Start analyzing clips** from the films we're studying
3. **Experiment with different formats** to see what works best for your workflow

Remember: the technical skill of downloading clips is just the beginning. The real work is your critical analysis and interpretation of what you find.
