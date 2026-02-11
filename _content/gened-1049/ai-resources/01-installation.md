# Installing ffmpeg and yt-dlp

These two command-line tools are the foundation of your video-essay toolkit. They let you download, trim, compress, and transform media files with a few lines of code.

## What Are Command-Line Tools?

- **The command line** is like a minimalist creative studio: no interface, just direct control
- You type commands into a terminal window, and the computer executes them
- Perfect for video essays because it:
  - Speeds up media prep (compressing, clipping, converting)
  - Enables reproducibility (same commands = same results)
  - Integrates easily with code notebooks, AI tools, or web apps

## What You're Installing

### `ffmpeg`
A Swiss Army knife for video manipulation. Use it to:
- Extract frames from video
- Create gifs
- Compress and transcode files
- Pull audio tracks
- Detect scene changes
- Generate visualizations

### `yt-dlp`
A command-line YouTube downloader (and much more). Use it to:
- Download clips from YouTube, Vimeo, and hundreds of other sites
- Specify video quality and format
- Extract audio only
- Download entire playlists or channels

---

## macOS Installation (using Homebrew)

### 1. Install Homebrew

Homebrew is a package manager for macOS—think of it as an app store for command-line tools.

Open **Terminal** (Applications → Utilities → Terminal) and paste this command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen instructions. You may be asked to enter your password.

> **Note:** You may need to add Homebrew to your PATH. The terminal will show you how—usually something like:
>
> ```bash
> echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
> eval "$(/opt/homebrew/bin/brew shellenv)"
> ```

### 2. Install ffmpeg and yt-dlp

Once Homebrew is installed, run:

```bash
brew install ffmpeg yt-dlp
```

This will download and install both tools along with their dependencies. It may take a few minutes.

### 3. Verify Installation

Check that everything is working:

```bash
ffmpeg -version
yt-dlp --version
```

If both print version numbers, you're good to go! 🎉

---

## Windows Installation (using Chocolatey)

### 1. Install Chocolatey

Chocolatey is a package manager for Windows—like Homebrew for macOS.

Open **PowerShell as Administrator**:
1. Click Start
2. Type "PowerShell"
3. Right-click "Windows PowerShell"
4. Select "Run as administrator"

Then paste this command:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; `
[System.Net.ServicePointManager]::SecurityProtocol = `
[System.Net.ServicePointManager]::SecurityProtocol -bor 3072; `
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### 2. Install ffmpeg and yt-dlp

Still in PowerShell (as Administrator), run:

```powershell
choco install ffmpeg yt-dlp -y
```

The `-y` flag automatically answers "yes" to prompts.

### 3. Verify Installation

Check that everything is working:

```powershell
ffmpeg -version
yt-dlp --version
```

If both print version numbers, you're all set! 🎉

---

## Troubleshooting

### "Command not found" error

**On macOS:**
- Make sure you added Homebrew to your PATH (see step 1 above)
- Close and reopen Terminal
- Try running `brew doctor` to diagnose issues

**On Windows:**
- Close and reopen PowerShell
- Make sure you ran the installation as Administrator
- Check that Chocolatey is installed: `choco --version`

### Permission errors

- On macOS: You may need to preface commands with `sudo` (e.g., `sudo brew install ffmpeg`)
- On Windows: Make sure PowerShell is running as Administrator

### Still stuck?

Paste the error message into ChatGPT, Claude, or Gemini and ask for help. Include:
- Your operating system (macOS or Windows)
- The exact command you ran
- The full error message

---

## Next Steps

Now that you have the tools installed:

1. **Learn to use yt-dlp** → [02-yt-dlp.md](./02-yt-dlp.md)
2. **Explore ffmpeg workflows** → [03-ffmpeg.md](./03-ffmpeg.md)
3. **Practice with a real clip** from one of the films we're studying

Remember: you don't need to memorize these commands. Use AI to help you write them, then save the ones you use frequently.
