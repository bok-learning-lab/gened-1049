# Setting up shadcn/ui in nextjs with tailwind 4

Here’s a **clean markdown rewrite** of the official **shadcn/ui Next.js install guide**, updated for your workflow — i.e. **Next.js with Tailwind v4**, keeping the `dark mode` setup and the corrected PostCSS config.

---

# Setting up **shadcn/ui** with **Tailwind v4** in Next.js

This guide assumes you already have a **Next.js** project and **Tailwind v4** installed and working.

---

## 1. Initialize shadcn/ui

Run the `init` command in your existing Next.js project:

```bash
npx shadcn@latest init
```

You’ll be prompted to choose between:

* **Next.js project** or **Monorepo** → choose **Next.js**
* **Tailwind version** → choose **v4**
* **Base directory** → press Enter for default (`src`)
* **Components directory** → press Enter for default (`src/components/ui`)
* **Use TypeScript?** → Yes
* **Path alias** → confirm your alias (e.g. `@/*`)

This sets up the shadcn CLI and creates a few helper files (like `lib/utils.ts`).

---

## 2. Fix your PostCSS config (for Tailwind v4)

Edit `postcss.config.js` (or `.ts`, `.mjs`) to match the new Tailwind v4 plugin syntax:

```js
// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

> ✅ This replaces the older `tailwindcss` and `autoprefixer` plugin setup used in Tailwind v3.

---

## 3. Define your theme tokens in global CSS

Open or create `src/app/globals.css` (or wherever your global styles live):

```css
@import "tailwindcss";

/* Theme tokens */
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(222.2 84% 4.9%);
  --primary: hsl(222.2 47.4% 11.2%);
  --primary-foreground: hsl(210 40% 98%);
  --border: hsl(214.3 31.8% 91.4%);
  --radius: 0.5rem;
}

.dark {
  --background: hsl(0 0% 3.9%);
  --foreground: hsl(0 0% 98%);
  --card: hsl(0 0% 3.9%);
  --card-foreground: hsl(0 0% 98%);
  --primary: hsl(0 0% 98%);
  --primary-foreground: hsl(222.2 47.4% 11.2%);
  --border: hsl(217.2 32.6% 17.5%);
}

/* Map tokens to Tailwind variables */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-border: var(--border);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);

  @keyframes accordion-down {
    from { height: 0 }
    to { height: var(--radix-accordion-content-height) }
  }
  @keyframes accordion-up {
    from { height: var(--radix-accordion-content-height) }
    to { height: 0 }
  }

  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
}

/* Base styles */
@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}
```

---

## 4. Add a dark mode toggle

Install and set up [`next-themes`](https://github.com/pacocoursey/next-themes):

```bash
pnpm add next-themes
```

Create a theme provider:

```tsx
// src/components/theme-provider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

Wrap your app in it:

```tsx
// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

You can now toggle dark mode by setting the `.dark` class on `<html>` — `next-themes` handles this automatically.

---

## 5. Add components

Once initialized, you can start adding components with the shadcn CLI.

```bash
npx shadcn@latest add button
```

This adds a prebuilt `Button` component to `src/components/ui/button.tsx`.

Use it in your app:

```tsx title="src/app/page.tsx"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-6">
      <Button>Click me</Button>
    </div>
  );
}
```

---

## 6. Add more components

```bash
npx shadcn@latest add card input dialog dropdown-menu sheet tooltip
```

Each component gets generated under `src/components/ui/`.

---

## 7. Verify your setup

Run your app:

```bash
pnpm dev
```

✅ You should see your `Button` styled correctly (matching the tokens in your `globals.css`).

If the component renders unstyled:

* Make sure `globals.css` is imported in `app/layout.tsx`.
* Verify you’re using the Tailwind v4 PostCSS plugin.
* Ensure your `@theme inline` block exists (it defines the token mappings shadcn/ui expects).

---

## 8. Optional: Add fonts

```tsx
// src/app/layout.tsx
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

Expose the font to Tailwind by pointing your token at the new CSS variable:

```css
@theme inline {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-geist-mono);
  /* …rest of your tokens */
}
```

Once `--font-sans` is set, Tailwind utilities such as `font-sans` automatically resolve to Inter. Combine them with weights (`font-black`) and size utilities (`text-5xl`) to render headings like “The Template” in Inter 900.

### Why no `fontFamily` entry?

In Tailwind v3 you extended `theme.fontFamily` in `tailwind.config.js`:

```ts
// Tailwind v3 pattern
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
    },
  },
};
```

Tailwind v4 moves theme authoring into CSS. Tokens such as `--font-sans`, `--font-mono`, or any custom variant live inside `@theme` (or `@layer theme`) blocks, and utilities reference those tokens directly. Because Tailwind reads your CSS tokens at build time, you no longer need to synchronize values between `tailwind.config` and your styles—the CSS definition above is the single source of truth.

---

## ✅ Final Checklist

| Item                   | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `@tailwindcss/postcss` | Confirmed in `postcss.config.js`                                         |
| `globals.css`          | Includes `@import "tailwindcss";`, `:root`, `.dark`, and `@theme inline` |
| `app/layout.tsx`       | Imports `globals.css` and wraps with `ThemeProvider`                     |
| Components             | Added via `npx shadcn@latest add <component>`                            |
| Dark mode              | Toggle works (`system` default via `next-themes`)                        |

---

### You’re done!

You now have a working **Next.js + Tailwind v4 + shadcn/ui** setup — fully compatible with dark mode, token-based theming, and Tailwind’s new CSS-first architecture.

## Recommended Customizations

- **Color tokens**: Group Learning Lab palettes under domain-friendly names (`--color-dashboard-surface`, `--color-lesson-accent`) in `@theme inline`, then alias them to shadcn primitives like `--color-primary`. That keeps generated components on-brand without editing each file.
- **Motion cues**: Expand the `@keyframes` block with reusable easing profiles (e.g. `--animate-toast-slide`, `--animate-drawer-pop`) so transitions stay consistent across the app.
- **Component naming**: Reserve `src/components/ui/*` for shadcn primitives and place higher-order, product-specific shells in `src/components/(domain)/*`. Update `components.json` aliases if you add new namespaces.
- **Documentation loop**: Whenever you introduce a new token or animation, add a note in `_context/how-to/shadcn-nextjs-tailwind4.md` so the Learning Lab team retains context on why it exists and how to use it.
- **Upstream drift checks**: Run `npx shadcn@latest diff` after Tailwind or shadcn releases to see whether upstream fixes should be backported into your locally copied components.
