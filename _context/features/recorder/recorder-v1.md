# Recorder v1 Overview

## Current Code Snapshot
- `src/app/tools/recorder/page.tsx` exists but is empty; there is no UI or logic for recording yet.
- The app shell (see `src/app/layout.tsx`) already provides theming, font loading, and a fixed layout we can reuse for the recorder screen.
- Shared UI primitives from shadcn (`src/components/ui`) and the existing theme provider give us consistent styling options for buttons, dropdowns, and dark mode.
- No backend routes or services specific to audio capture, persistence, or transcription are present today.

## Intended v1 Capabilities
- Offer a browser-based audio recorder with pause/resume, waveform/level feedback, and playback controls.
- Persist each capture on the server with metadata (duration, created_at, user/session id).
- Generate a text transcript per recording via OpenAI GPT-4o audio transcription and store it alongside the audio asset.
- Surface a recordings list with search, sort, and basic management (rename, delete, tagging).
- Provide download/share export options and an audit log for compliance.

## High-Level Flow (v1 concept)
1. User visits `/tools/recorder` and grants microphone permissions.
2. Client creates a `MediaRecorder`, streams chunks to the browser, and renders real-time visual feedback.
3. When stopped, the audio blob is uploaded to the server along with metadata.
4. Server persists the audio (likely object storage/S3) and enqueues transcription.
5. Transcription worker calls OpenAI GPT-4o, stores the resulting text, and updates recording status.
6. UI polls or subscribes for status updates and refreshes the recordings list.

## Observations & Gaps
- The actual recorder UI, API routes, storage plumbing, and transcription pipeline are unimplemented.
- There is no queue/worker infrastructure in this repo; any asynchronous transcription would need to be added.
- Authentication and multi-user separation are undefined, so any persistence mechanism must be scoped carefully for local-only usage.
- For a local-first workflow, we can postpone complex dashboards, queueing, and sharing features until later iterations.

## Simplified Version Direction
- Focus on a single-page recorder experience served from `/tools/recorder`.
- Keep the visual design coherent with the rest of the site (theme toggle, shadcn buttons) but reduce advanced controls to basic record/stop.
- Store recordings either locally (IndexedDB/file download) or on the server filesystem since deployment is local-only for now.
- Invoke GPT-4o transcription immediately after each recording and cache the transcript next to the audio asset.
- Defer building list management, waveform visualization, real-time status updates, or sharing until later.

## Steps to Ship the Simpler Version
1. Scaffold the recorder UI in `src/app/tools/recorder/page.tsx` with basic record/stop controls, recording timer, and success states.
2. Implement a lightweight client hook that wraps `navigator.mediaDevices.getUserMedia` and `MediaRecorder`, returning the final audio blob.
3. Add a Next.js Route Handler (`src/app/api/recordings/route.ts`) that accepts audio uploads, saves them to the local filesystem (or a tmp storage directory), and triggers transcription.
4. Integrate OpenAI GPT-4o transcription inside the route handler (or a helper module), storing the transcript as `{recordingId}.json` beside the audio file.
5. Return storage metadata and the transcript to the client; persist it in local state for now so the page can confirm success.
6. Capture minimal metadata (filename, timestamps, duration) in a simple JSON index to make future listing easier.
7. Add smoke tests or manual checklist steps to confirm recording, storage, and transcription all succeed when running `pnpm dev`.
