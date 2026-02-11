

Here’s a **step-by-step, batteries-included monorepo guide** tuned for your Lab:

- **2 Next.js apps**
    
- **3 Slack bots** (Node/Bolt)
    
- **5 Node CLI tools**
    
- **Pynb zone** (Jupyter notebooks)
    
- **1–2 Python CLI tools**
    
- **FastAPI API**
    

The stack mixes JS/TS + Python cleanly, with fast local dev and predictable CI.

---

# Monorepo Setup (Step-by-Step)

## 0) Prereqs

- **pnpm** (workspace & hoisting)
    
- **Node 20+** (or 22)
    
- **Python 3.11+**
    
- **uv** (fast Python packaging) or **poetry** (pick one; guide uses **uv**)
    
- **Turborepo** (via `pnpm dlx turbo`)
    
- **direnv** (optional but great for envs)
    
- **Docker** (optional; for FastAPI prod parity)
    

```bash
npm i -g pnpm
```

---

## 1) Initialize the repo

```bash
mkdir learninglab-monorepo && cd learninglab-monorepo
git init
pnpm init -y
```

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - apps/*
  - packages/*
  - services/*
  - tools/node/*
  - tools/python/*
  - bots/*
  - notebooks
```

Add a root **.editorconfig**, **.gitignore**, and (optional) **.vscode** defaults.

---

## 2) Folder layout (polyglot, clear boundaries)

```
.
├─ apps/                      # Runnable frontends (Next.js)
│  ├─ studio/                 # Next.js app 1
│  └─ showcase/               # Next.js app 2
├─ bots/                      # Slack bots (Node/Bolt)
│  ├─ bot-orals/              # Slack bot 1
│  ├─ bot-transcripts/        # Slack bot 2
│  └─ bot-announcer/          # Slack bot 3
├─ tools/
│  ├─ node/                   # Node CLIs (5 tools)
│  │  ├─ v2s/                 # video-2-stills (example)
│  │  ├─ media-indexer/
│  │  ├─ transcript-clean/
│  │  ├─ dataset-sampler/
│  │  └─ ll-sync/
│  └─ python/                 # Python CLIs (1–2 tools)
│     ├─ clip-extract/
│     └─ zap-audio/
├─ services/
│  └─ fastapi/                # FastAPI API service
├─ packages/                  # Shared libs/config
│  ├─ ui/                     # shadcn-based component lib
│  ├─ utils/                  # shared TS utils
│  ├─ config/                 # eslint/prettier/ts/tailwind presets
│  └─ types/                  # shared TypeScript types
├─ notebooks/                 # Pynb zone (Jupyter)
│  ├─ pyproject.toml
│  ├─ uv.lock
│  └─ notebooks/
│     ├─ exploration.ipynb
│     └─ film-analysis.ipynb
├─ turbo.json
├─ tsconfig.base.json
├─ .env.example
└─ README.md
```

**Mental model**

- **apps/** & **services/** & **bots/** & **tools/** = runnable things
    
- **packages/** = shared JS/TS libraries & configs
    
- **notebooks/** = self-contained Python env for analysis
    

---

## 3) Turborepo pipeline

`turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env*"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {},
    "test": {},
    "typecheck": {}
  }
}
```

---

## 4) Shared TypeScript & tooling

**tsconfig.base.json** (root):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "jsx": "preserve",
    "strict": true,
    "allowJs": false,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@learninglab/ui": ["packages/ui/src"],
      "@learninglab/utils": ["packages/utils/src"],
      "@learninglab/types": ["packages/types/src"]
    }
  }
}
```

**packages/config** (shared configs):

- `eslint.config.js`, `prettier.config.mjs`, `tailwind-preset.ts`, `tsconfig.json`
    

Example `packages/config/tailwind-preset.ts`:

```ts
import type { Config } from "tailwindcss";
export default {
  theme: {
    extend: {
      // your tokens
    }
  },
  plugins: []
} satisfies Partial<Config>;
```

---

## 5) Shared UI library (shadcn + Tailwind)

`packages/ui/package.json`:

```json
{
  "name": "@learninglab/ui",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": { ".": { "import": "./dist/index.js", "types": "./dist/index.d.ts" } },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.tsx --dts --format esm --splitting false --sourcemap",
    "typecheck": "tsc -p tsconfig.json"
  },
  "peerDependencies": {
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19"
  },
  "devDependencies": {
    "tsup": "^8",
    "typescript": "^5"
  }
}
```

`packages/ui/src/index.ts`:

```ts
export * from "./button";
export * from "./card";
export * from "./theme-toggle";
```

---

## 6) Next.js apps (2 apps)

`apps/studio/next.config.ts` (same idea for `apps/showcase`):

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@learninglab/ui", "@learninglab/utils", "@learninglab/types"],
  experimental: {
    outputFileTracingIncludes: { "/": ["../../packages/ui/**"] }
  }
};

export default nextConfig;
```

`apps/studio/tailwind.config.ts`:

```ts
import shared from "@learninglab/config/tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  presets: [shared],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ]
} satisfies Config;
```

`apps/studio/app/layout.tsx` wires `ThemeProvider` + dark-mode toggle; import shadcn components from `@learninglab/ui`.

---

## 7) Slack bots (3 bots, Node/Bolt)

Each bot is an **independent workspace package**.

`bots/bot-orals/package.json`:

```json
{
  "name": "@learninglab/bot-orals",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsup src/index.ts --format esm --dts",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@slack/bolt": "^3",
    "zod": "^3"
  },
  "devDependencies": {
    "tsup": "^8",
    "tsx": "^4",
    "typescript": "^5"
  }
}
```

`bots/bot-orals/src/index.ts` (socket mode):

```ts
import { App } from "@slack/bolt";

const app = new App({
  appToken: process.env.SLACK_APP_TOKEN!,    // xapp-...
  token: process.env.SLACK_BOT_TOKEN!,       // xoxb-...
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  socketMode: true
});

app.message("hello", async ({ message, say }) => {
  await say(`Hi <@${(message as any).user}> 👋`);
});

await app.start();
console.log("⚡ bot-orals running");
```

> Repeat for `bot-transcripts/`, `bot-announcer/`. Share helpers via `@learninglab/utils`.

---

## 8) Node CLI tools (5 tools)

Each CLI is a small package exposing a `bin`.

`tools/node/v2s/package.json`:

```json
{
  "name": "@learninglab/v2s",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "bin": { "v2s": "cli.js" },
  "scripts": {
    "dev": "tsx watch src/cli.ts",
    "build": "tsup src/cli.ts --format esm --sourcemap --outfile cli.js"
  },
  "dependencies": {
    "yargs": "^18",
    "@learninglab/utils": "workspace:*"
  },
  "devDependencies": { "tsup": "^8", "tsx": "^4", "typescript": "^5" }
}
```

`tools/node/v2s/src/cli.ts`:

```ts
#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .scriptName("v2s")
  .command("run <input>", "process video", y => y.positional("input", { type: "string" }), argv => {
    console.log("Processing:", argv.input);
  })
  .demandCommand()
  .help()
  .parse();
```

> Ensure built `cli.js` is executable (`chmod +x` during build or via tsup option).

---

## 9) Python side: notebooks + CLIs + FastAPI

### a) Pynb zone

`notebooks/pyproject.toml` (uv/PEP 621):

```toml
[project]
name = "ll-notebooks"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
  "ipykernel",
  "pandas",
  "numpy",
  "matplotlib",
  "jupyterlab",
  "openai",
  "fastapi",
  "uvicorn[standard]"
]

[tool.uv]  # uv-specific options if needed
```

Setup kernel:

```bash
cd notebooks
uv sync
uv run python -m ipykernel install --user --name ll-notebooks
```

### b) Python CLIs (1–2 tools)

`tools/python/clip-extract/pyproject.toml`:

```toml
[project]
name = "clip-extract"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = ["typer", "rich", "ffmpeg-python"]

[project.scripts]
clip-extract = "clip_extract.cli:app"  # Typer entrypoint
```

`tools/python/clip-extract/clip_extract/cli.py`:

```py
import typer
app = typer.Typer()

@app.command()
def cut(input: str, start: str, end: str, out: str = "out.mp4"):
    # call ffmpeg here
    typer.echo(f"Cutting {input} {start}-{end} -> {out}")

if __name__ == "__main__":
    app()
```

Install locally:

```bash
cd tools/python/clip-extract
uv sync
uv run clip-extract --help
```

### c) FastAPI service

`services/fastapi/pyproject.toml`:

```toml
[project]
name = "learninglab-api"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = ["fastapi", "uvicorn[standard]", "pydantic", "python-dotenv"]

[project.optional-dependencies]
dev = ["pytest", "httpx", "ruff", "mypy"]
```

`services/fastapi/app/main.py`:

```py
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}
```

Run:

```bash
cd services/fastapi
uv run uvicorn app.main:app --reload --port 8000
```

(Optional) **Dockerfile** for prod parity.

---

## 10) Env management

- Root `.env.example` with **only keys** (no secrets).
    
- Each app/bot/service loads env via `dotenv` or platform settings.
    
- Consider **direnv**: `.envrc` per subproject, auto-loads envs when `cd` into dirs.
    

Example keys:

```
# slack
SLACK_APP_TOKEN=
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=

# nextjs
NEXT_PUBLIC_APP_NAME=Learning Lab

# fastapi
API_LOG_LEVEL=info
```

---

## 11) Import aliases & shared code

- Import shared UI/utils by **package name**:
    
    ```ts
    import { Button } from "@learninglab/ui";
    import { formatDate } from "@learninglab/utils";
    ```
    
- Next apps must set:
    
    ```ts
    transpilePackages: ["@learninglab/ui", "@learninglab/utils", "@learninglab/types"]
    ```
    
- Tailwind in each Next app must **scan** shared UI source or pull shared CSS.
    

(You can develop **without prebuilding** shared packages; build them for CI/deploy.)

---

## 12) Scripts (root `package.json`)

```json
{
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "typecheck": "turbo run typecheck",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "apps:dev": "pnpm --filter ./apps/* dev",
    "bots:dev": "pnpm --filter ./bots/* dev",
    "tools:build": "pnpm --filter ./tools/* build"
  },
  "devDependencies": {
    "turbo": "^2",
    "typescript": "^5"
  }
}
```

---

## 13) Quality gates

- **ESLint + Prettier** (JS/TS) from `packages/config`
    
- **Vitest** for apps/libs; **Playwright** optional
    
- **ruff** + **mypy** for Python projects (configured in each pyproject)
    
- **Husky + lint-staged** (optional pre-commit)
    

Example root **.lintstagedrc**:

```json
{
  "*.{ts,tsx,js,jsx,json,md,css}": ["prettier --write"]
}
```

---

## 14) CI (GitHub Actions)

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  js:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: "pnpm" }
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test --if-present

  py:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: services/fastapi
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v3
      - run: uv sync
      - run: uv run pytest -q || true  # if you add tests
      - run: uv run uvicorn app.main:app --help
```

> If you want Python jobs for **tools/python/** and **notebooks/** too, add matrix entries.

---

## 15) Developer ergonomics

- **Dev containers**: `.devcontainer/` for VS Code (Node + Python toolchain)
    
- **Makefile** or **justfile** with friendly commands:
    
    ```make
    dev: ; pnpm dev
    apps: ; pnpm apps:dev
    bots: ; pnpm bots:dev
    api: ; (cd services/fastapi && uv run uvicorn app.main:app --reload)
    ```
    
- **Renovate** bot to maintain deps (group minor updates; pin major bumps)
    

---

## 16) Day-1 runbook

```bash
# install everything
pnpm i

# start all dev processes in parallel (Next apps + bots)
pnpm dev

# FastAPI dev
cd services/fastapi && uv run uvicorn app.main:app --reload

# try a Node CLI during dev
pnpm --filter @learninglab/v2s dev
# OR build all CLIs
pnpm tools:build

# Python CLI
cd tools/python/clip-extract && uv run clip-extract --help
```

---

## 17) Deployment notes

- **Next.js apps** → Vercel projects (each `apps/*` is its own deploy).
    
- **Bots** → Fly/Render/Heroku/Dokku (Socket Mode or Events API w/ public URL).
    
- **FastAPI** → Fly/Render/Docker on your infra; add `Dockerfile` + health checks.
    
- **CLIs** → internal use (no publish) or publish to GHCR/npm/pypi later.
    

---

## 18) Upgrade path

- If you add more apps, keep naming clear (e.g., `faculty-portal`, `student-hub`).
    
- If shared code grows, split `packages/ui` (design system) vs `packages/blocks` (feature composites).
    
- If notebooks become pipelines, promote to **services/** with schedulers (Airflow/Prefect) or GitHub Actions cron.
    

---

# FAQ (quick hits)

- **Do I need to build shared packages first?**  
    **Dev:** no (use `transpilePackages`). **CI/Deploy:** yes (`pnpm build`).
    
- **How do import aliases work for shared components?**  
    Each shared lib is a workspace package (e.g., `@learninglab/ui`). Apps import by package name; TS `paths` improve editor DX; Next transpiles the source.
    
- **Tailwind with shared UI?**  
    Each app’s `tailwind.config.ts` must scan `packages/ui/src/**` **or** your UI ships its own CSS that the app imports.
    

---

If you want, I can turn this guide into a **ready-to-clone repo skeleton** (with minimal files for each app/bot/tool, working scripts, and CI) so you can `git push` and go.