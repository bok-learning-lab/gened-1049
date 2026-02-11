# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application built with TypeScript, Tailwind CSS v4, shadcn/ui, and MDX support, using the App Router architecture.

## CRITICAL: Package Manager

**ALWAYS use pnpm for all package operations.** Never use npm or yarn.

```bash
# Install packages
pnpm add <package>

# Install dev dependencies
pnpm add -D <package>

# Install all dependencies
pnpm install
```

## Development Commands

```bash
# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Add shadcn/ui components
pnpx shadcn@latest add <component-name>
```

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui (New York style)
- **Content**: MDX support enabled
- **Theme**: next-themes with class-based dark mode
- **Icons**: Lucide React
- **Package Manager**: pnpm (required)
- **Fonts**: Geist Sans and Geist Mono (via next/font/google)

## Project Structure

- `app/` - Next.js App Router directory
  - `components/` - App-specific components
    - `theme-provider.tsx` - Theme provider wrapper
  - `layout.tsx` - Root layout with fonts and theme provider
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind and shadcn variables
- `components/` - Reusable components
  - `ui/` - shadcn/ui components (auto-generated via CLI)
- `lib/` - Utility functions
  - `utils.ts` - cn() helper for class merging
- `public/` - Static assets (images, SVGs)
- `mdx-components.tsx` - Custom MDX component overrides
- `components.json` - shadcn/ui configuration
- `@/*` path alias maps to the root directory

## shadcn/ui Setup

This project uses shadcn/ui with the following configuration:

- **Style**: New York
- **Base color**: Neutral
- **CSS variables**: Enabled (defined in `app/globals.css`)
- **Icon library**: Lucide React
- **Component aliases**:
  - `@/components` - Root components directory
  - `@/components/ui` - shadcn/ui components
  - `@/lib/utils` - Utility functions
  - `@/hooks` - Custom hooks

### Adding Components

```bash
pnpx shadcn@latest add button
pnpx shadcn@latest add card
# etc.
```

Components are installed to `components/ui/` and use the `cn()` utility from `lib/utils.ts`.

## MDX Configuration

MDX is configured and ready to use:

- MDX files (`.md`, `.mdx`) are supported throughout the app
- Configure in `next.config.ts` using `@next/mdx`
- Custom MDX components can be defined in `mdx-components.tsx`
- Use `@mdx-js/mdx` for runtime MDX compilation if needed

## Tailwind CSS v4 Notes

This project uses Tailwind CSS v4 with shadcn/ui integration:

- Import Tailwind in CSS with `@import "tailwindcss"`
- shadcn/ui CSS variables are defined in `@layer base` blocks
- Custom theme tokens use `@theme inline { }` blocks
- Dark mode uses `.dark` class (managed by next-themes)

## Theme System

- **Provider**: next-themes with class-based theming
- **Attribute**: `class` (adds `.dark` to `<html>`)
- **Default**: System preference
- **Location**: `app/components/theme-provider.tsx`
- Dark mode CSS variables are defined in `app/globals.css`

## TypeScript Configuration

- Strict mode enabled
- JSX runtime: `react-jsx`
- Module resolution: `bundler`
- Path alias: `@/*` → `./*`

## Code Conventions

- Use TypeScript for all new files
- Follow the App Router patterns (React Server Components by default)
- Use the `Metadata` API for SEO configuration in layout/page files
- Leverage path aliases (`@/`) for cleaner imports
- Use `cn()` from `@/lib/utils` for conditional class names
- Mark client components with `"use client"` directive

## Project-Specific Skills

Custom Claude Code skills can be created in `.claude/skills/` for project-specific workflows and domain knowledge. Use the `skill-creator` skill (`/skill-creator`) for guidance on creating effective skills.
