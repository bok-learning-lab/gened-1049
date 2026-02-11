# Using AI for Technical Help

This guide covers best practices for working with ChatGPT, Claude, Gemini, and other LLMs to accelerate technical workflows while maintaining your creative control and analytical voice.

## Core Principle: Technical, Not Conceptual

AI is your **lab partner** for mechanical tasks, not your **ghostwriter** for film analysis.

### ✅ Good Uses of AI

**Technical assistance:**
- "Give me the ffmpeg command to extract frames from this video"
- "Why is my yt-dlp command returning a 403 error?"
- "Write a bash script to rename all files in a folder"
- "How do I compress this video to under 10MB?"

**Coding scaffolding:**
- "Generate a Next.js component that displays a video with custom controls"
- "Help me fix this TypeScript error: [paste error message]"
- "Show me the Tailwind classes for a gradient text effect"
- "Write a function to convert timestamps to minutes:seconds format"

**Workflow automation:**
- "Create a script to batch-process all MP4 files in a folder"
- "Generate HTML to embed this video with a custom player"
- "Write a regex to extract YouTube video IDs from a list of URLs"

### ❌ Bad Uses of AI

**Conceptual work (this is YOUR job):**
- ❌ "Analyze this scene from Godzilla"
- ❌ "What does this shot mean?"
- ❌ "Write an argument about Kurosawa's use of lighting"
- ❌ "Interpret the symbolism in this sequence"

**Essay writing:**
- ❌ "Write my video essay script"
- ❌ "Generate analysis of this film's themes"
- ❌ "Create voiceover narration for my video"

The rule: **Use AI to help you execute your ideas, not to generate the ideas themselves.**

---

## Effective Prompts

### 1. Be Specific About Your Goal

**Weak prompt:**
> "How do I use ffmpeg?"

**Strong prompt:**
> "I have a video at ~/Desktop/godzilla.mp4. I want to extract one frame every 5 seconds and save them as JPG files to ~/Desktop/godzilla_frames/. Give me the ffmpeg command."

### 2. Include Context

**Better:**
> "I'm on macOS using ffmpeg 6.0. I have a video at ~/Desktop/godzilla.mp4. I want to extract one frame every 5 seconds and save them as JPG files to ~/Desktop/godzilla_frames/. Give me the ffmpeg command."

### 3. Specify the Format You Want

**Example:**
> "Give me the command in a code block I can copy-paste into Terminal, with comments explaining each flag."

### 4. Paste Error Messages in Full

**Don't paraphrase errors.** Copy the entire error message:

**Good:**
> I ran this command:
> ```bash
> yt-dlp "https://youtube.com/watch?v=abc123"
> ```
>
> And got this error:
> ```
> ERROR: unable to download video data: HTTP Error 403: Forbidden
> ```

---

## Troubleshooting Workflow

### Step 1: Try the Command
Run what the AI gave you.

### Step 2: If It Fails, Paste the Error Back
Don't try to fix it yourself first—let the AI see the actual error.

### Step 3: Follow the Revised Command
Try the AI's fix.

### Step 4: If Multiple Fixes Fail, Provide More Context
- What version of the tool are you using? (`ffmpeg -version`, `yt-dlp --version`)
- What OS? (macOS, Windows, Linux)
- Where is the file located? (Desktop, Documents, external drive)

### Step 5: Ask for Alternatives
If a solution isn't working, ask:
> "This approach isn't working. Is there a different way to accomplish this goal?"

---

## Working with AI on Coding Tasks

### 1. Start with Structure

**Example:**
> "I want to create a Next.js page that displays a video with scrollable annotations below it. Show me the basic file structure and component skeleton."

### 2. Iterate on Specific Problems

Once you have the skeleton, ask about specific issues:
> "The video isn't responsive on mobile. How do I make it scale to container width using Tailwind?"

### 3. Paste Error Messages

TypeScript and build errors can be cryptic. Paste them in full:

**Example:**
> I'm getting this TypeScript error:
> ```
> Type '{ src: string; alt: undefined; }' is not assignable to type 'IntrinsicAttributes & ImageProps'.
>   Property 'alt' is optional in type 'ImageProps' but required in type '{ src: string; alt: undefined; }'.
> ```

### 4. Ask for Explanations, Not Just Fixes

**Better prompt:**
> "Fix this error and explain why it occurred so I can avoid it in the future."

---

## Prompts That Work Well

### For Command-Line Tasks

**Template:**
> I'm on [OS] using [tool version]. I have [description of files/situation]. I want to [goal]. Give me the command with comments explaining each part.

**Example:**
> I'm on macOS using ffmpeg 6.0. I have a video called godzilla.mp4 on my Desktop. I want to create a gif of seconds 100-105 at 15fps, scaled to 800px wide. Give me the command with comments.

### For Coding Tasks

**Template:**
> I'm building a [project type] using [tech stack]. I want to [feature description]. Show me [what you want: code, structure, example, etc.].

**Example:**
> I'm building a Next.js app using TypeScript and Tailwind. I want to create a video player component that pauses/plays when the user clicks it. Show me the component code with prop types.

### For Debugging

**Template:**
> I'm trying to [goal]. I ran [command/code]. I got this error: [full error]. How do I fix it?

**Example:**
> I'm trying to download a YouTube video as MP4. I ran:
> ```bash
> yt-dlp "https://youtube.com/watch?v=abc123" -f mp4
> ```
> I got this error:
> ```
> ERROR: requested format not available
> ```
> How do I fix it?

### For Learning

**Template:**
> Explain [concept/command] in simple terms, then show me a practical example for [use case].

**Example:**
> Explain ffmpeg's `-vf` flag in simple terms, then show me an example of using it to extract frames from a video.

---

## Maintaining Your Voice

### 1. Keep a Changelog

Track what came from AI vs. your own work:

**Example:**
```
# Project Log

## 2025-02-10
- Downloaded Godzilla clip using yt-dlp (AI-assisted command)
- Extracted frames 0-120 using ffmpeg (AI-assisted)
- Analyzed framing and composition of frames 21-23 (my work)
- Wrote analysis of opening shot structure (my work)

## 2025-02-11
- Created ScrollVideo component (AI scaffolding, my styling)
- Built essay page with 5 clips (my content structure)
- Debugged TypeScript error (AI help)
- Wrote interpretive notes for each clip (my work)
```

### 2. Use AI for Plumbing, Not Interpretation

**Plumbing (AI is great):**
- File organization scripts
- Format conversions
- Error debugging
- Component structure

**Interpretation (your job):**
- What does this shot mean?
- How does lighting create mood?
- What is the director's argument?
- How do these clips relate to course themes?

### 3. Review and Modify AI Suggestions

Don't blindly accept code or commands:
- Read the comments/explanations
- Understand what each part does
- Modify to fit your specific needs
- Test thoroughly

### 4. Cite AI Assistance Appropriately

If you're submitting work that involved AI:
- Note which technical tasks used AI (commands, scaffolding)
- Emphasize that analysis and interpretation are your own
- Follow your instructor's citation policies

**Example citation:**
> Technical implementation (video download, frame extraction, web component structure) assisted by Claude AI. Film analysis, interpretive framework, and critical argument are original work.

---

## When to Use AI vs. Learn Directly

### Use AI When:
- ✅ You need to **get something done quickly** (downloading a clip, fixing a bug)
- ✅ The task is **mechanical** (batch renaming files, format conversion)
- ✅ You're **stuck on a specific error** and need to unblock yourself
- ✅ You need **scaffolding** for a larger project (component structure, script template)

### Learn Directly When:
- 📚 You'll use this skill **repeatedly** (worth memorizing common commands)
- 📚 You want to **understand deeply** (not just get a quick fix)
- 📚 The tool is **core to your workflow** (worth reading official docs)
- 📚 You're **building foundational knowledge** (understanding video codecs, web architecture)

---

## Practical Examples

### Example 1: Downloading and Processing a Clip

**Your goal:** Get a clip from YouTube, extract key frames, analyze composition.

**Step 1: Download (AI-assisted)**
> "Give me the yt-dlp command to download this video as MP4 to my Desktop: [URL]"

**Step 2: Extract frames (AI-assisted)**
> "I have godzilla.mp4 on my Desktop. Give me the ffmpeg command to extract one frame every 5 seconds to a folder called frames."

**Step 3: Analyze (your work)**
- Look at the frames
- Identify key moments
- Write about composition, lighting, framing
- Connect to course themes

### Example 2: Building a Video Essay Page

**Step 1: Get scaffolding (AI-assisted)**
> "Create a Next.js page that displays a video at the top and a list of text annotations below. Use TypeScript and Tailwind."

**Step 2: Customize (your work)**
- Replace placeholder content with your clips
- Write your analysis and interpretive notes
- Adjust styling to match your aesthetic vision

**Step 3: Debug (AI-assisted as needed)**
> "I'm getting this error when I run `npm run build`: [paste error]"

**Step 4: Refine (your work)**
- Test on mobile
- Adjust typography
- Ensure it communicates your argument clearly

### Example 3: Batch Processing Files

**Your goal:** Compress 10 video clips for web upload.

**Step 1: Get the command (AI-assisted)**
> "Write a bash script to compress all MP4 files in ~/Desktop/clips/ to CRF 28 using ffmpeg, saving them as [filename]_compressed.mp4"

**Step 2: Review the script**
- Read each line
- Understand what it does
- Verify the output names make sense

**Step 3: Run it**
- Test on one file first
- If it works, run on all files

**Step 4: Organize the results (your work)**
- Sort clips in essay order
- Rename for clarity
- Integrate into your project

---

## Common Pitfalls

### 1. Trusting AI Blindly
- AI can be confidently wrong
- Always test commands before running on important files
- Verify code actually works before building on it

### 2. Over-Relying on AI
- If you're asking AI for every single step, you're not learning
- Build foundational knowledge so you can work independently

### 3. Using AI for Conceptual Work
- The course is about YOUR film analysis
- AI can't (and shouldn't) do your critical thinking

### 4. Not Documenting Your Process
- Keep track of what you tried
- Save commands that worked
- Note which parts were AI-assisted

---

## Tools and Resources

### AI Tools
- **ChatGPT** (OpenAI): Excellent for coding and command-line help
- **Claude** (Anthropic): Great for longer, more nuanced conversations
- **Gemini** (Google): Good for research and multi-step workflows
- **GitHub Copilot**: Inline code suggestions (paid, for VS Code)

### When to Use Each
- **Quick command:** Any of the above
- **Debugging session:** Claude (longer context window)
- **Code scaffolding:** ChatGPT or Copilot
- **Learning explanations:** Any of the above, but ask for explanations explicitly

---

## Next Steps

1. **Try a workflow**: Download a clip → extract frames → analyze composition
2. **Document your process**: Keep notes on which parts used AI
3. **Build your command library**: Save useful ffmpeg and yt-dlp commands
4. **Experiment with interactive essays** → [05-interactive-essays.md](./05-interactive-essays.md)

Remember: AI is a powerful tool for technical acceleration, but your critical voice and analytical skills are irreplaceable. Use AI to handle the plumbing so you can focus on the interpretation.
