# Add Clerk Authentication

This guide walks through integrating [Clerk](https://clerk.com/) into this Next.js App Router project. It covers required setup, code changes, and several protection strategies tailored to the Learning Lab template.

## Prerequisites
- Clerk application created in the Clerk dashboard.
- API keys: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
- Local env file (`.env.local`) ready for new variables.

## 1. Install the SDK
```bash
pnpm add @clerk/nextjs
```

## 2. Configure Environment Variables
Add the following to `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

> Update the values with the keys from your Clerk dashboard. The redirect URLs assume the sign-in page lives at `/sign-in` and successful auth returns users to the homepage.

## 3. Add Middleware
Create or update `middleware.ts` at the project root:

```ts
import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", // keep landing page public
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)", // example for a public API subtree
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static assets
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

## 4. Wrap the App with `ClerkProvider`
Update `src/app/layout.tsx` to include `ClerkProvider`. The template already sets up fonts, theme provider, and a mode toggle. Wrap those with Clerk and surface auth controls in the header.

Key points:
- Import `ClerkProvider`, `SignedIn`, `SignedOut`, `UserButton`, and optional `SignInButton`/`SignUpButton`.
- Keep the existing theme and layout structure intact.
- Render `children` inside `ClerkProvider`.

Example (adjust to match current layout):

```tsx
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${geistMono.variable} antialiased font-sans`}>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
              <header className="flex h-16 items-center justify-end gap-3 border-b border-border px-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm">Log in</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm">Sign up</Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>
              <main className="flex flex-1 flex-col">{children}</main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

## 5. Add Sign-In Route
Create `src/app/sign-in/[[...sign-in]]/page.tsx`:

```tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn appearance={{ variables: { fontFamily: "var(--font-inter)" } }} />
    </div>
  );
}
```

Optionally add a sign-up page at `src/app/sign-up/[[...sign-up]]/page.tsx` using `<SignUp />`.

## 6. Use Clerk Hooks in Components
- Server components: `import { auth } from "@clerk/nextjs/server";`
- Client components: `import { useUser, useAuth } from "@clerk/nextjs";`

Example server usage inside a route handler:

```ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // handle the request knowing the user is authenticated
}
```

## 7. Restrict Sign-up to Harvard Emails
- In the Clerk dashboard, open **User & Authentication → Email**.
- Under **Allowed domains**, add:
  - `fas.harvard.edu`
  - `g.harvard.edu`
  - `college.harvard.edu`
  - `harvard.edu`                   
- Disable “Allow sign ups from any email address” so only Harvard-affiliated domains can register.
- Invite one-off exceptions directly from the dashboard or temporarily expand the allowlist when needed.

## 8. Template Coexistence with Supabase
Because this repo serves as a starting point for multiple auth strategies, we can ship both Clerk and Supabase samples side by side:
- Keep Clerk as the primary auth layer (middleware + `/tools` flows) and include the sample pages under `/auth/clerk`.
- Add Supabase examples under a dedicated route group (for example, `/supabase/*`) demonstrating Supabase-specific auth/storage patterns.
- Document in the README that developers may delete either subtree (`/src/app/clerk` or `/src/app/supabase`) depending on their preferred stack.
- Update `middleware.ts` so the Supabase demo routes stay public (or guarded separately) while Clerk still protects the rest of the app.

## 9. Protection Options
Choose one or combine based on cost/scope:

- **Protect the `/tools` section (recommended default)**  
  Update `isPublicRoute` to exclude `/tools(.*)` so any tool (recorder, history, future tools) requires auth. Front page remains public.

- **Protect all API routes**  
  Keep current matcher and rely on `auth.protect()` to enforce login for `/api/**`. For public APIs, add explicit entries to `isPublicRoute`.

- **Selective API protection**  
  Remove the `/(api|trpc)(.*)` matcher and instead guard individual handlers using `auth()` inside each route. Useful if most APIs are public but a few need auth.

- **Role-based gating**  
  Inside your protected pages or route handlers, inspect `auth().sessionClaims` or `useUser()` metadata to differentiate tiers (e.g., free vs. paid) before allowing access to expensive operations like GPT-4o transcription.

## 10. Testing Checklist
- Start the dev server: `pnpm dev`.
- Load `/` to confirm it still renders without signing in.
- Visit `/tools/recorder`; you should be redirected to `/sign-in` when not authenticated (if `/tools` is protected).
- Sign in via Clerk’s modal or dedicated page; verify `/tools/recorder` now loads.
- Trigger any API action (e.g., upcoming recording upload) and confirm `userId` is available server-side.

## 11. Deployment Notes
- Set the env vars in the hosting provider (Vercel, etc.).
- If using Middleware, ensure the deployment platform supports Edge functions (Vercel does).
- Configure Clerk dashboard allowed origins for the deployed domain.

Once the integration is approved, proceed to implement the code updates outlined above and adjust route protection strategy to balance user experience with OpenAI usage costs.
