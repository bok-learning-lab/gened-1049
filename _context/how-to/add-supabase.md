## Add Supabase Backend

This guide sets up Supabase for auth-aware storage and database needs in the Learning Lab template. It complements Clerk by providing a managed Postgres, object storage, and serverless functions that we can leverage for storing recordings and transcripts.

### Prerequisites
- Supabase project created in the [Supabase dashboard](https://supabase.com/).
- Access to the project’s API keys.
- Local `.env.local` ready for new variables.
- `pnpm` available (or substitute npm/yarn).

### 1. Install Dependencies
```bash
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
pnpm add -D @types/node
```

### 2. Configure Environment Variables
Append to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key
```
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` expose the public client.
- `SUPABASE_SERVICE_ROLE_KEY` is only used server-side (API routes, route handlers) and must never be shipped to the browser.

### 3. Initialize Supabase Client Helpers
Create `src/lib/supabase/server.ts` for server components/route handlers:

```ts
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const createServerSupabase = () =>
  createRouteHandlerClient({ cookies });
```

Create `src/lib/supabase/client.ts` for client components:

```ts
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

export const createBrowserSupabase = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

> The auth helper library automatically persists session cookies and keeps Supabase session in sync with Clerk if you connect the user metadata (see integration ideas below).

### 4. Database Schema for Recordings (optional starter)
Create a migration (SQL) or use Supabase SQL editor:

```sql
create table recordings (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  bucket_path text not null,
  transcript text,
  duration_seconds integer,
  created_at timestamptz default now()
);

alter table recordings enable row level security;

create policy "Users access own recordings"
on recordings for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

This schema stores audio metadata and transcript text. `bucket_path` references a file in Supabase Storage.

### 5. Configure Storage Bucket
- In Supabase dashboard, create a Storage bucket named `recordings`.
- Enable public or authenticated access depending on the privacy requirements (likely private).
- If private, add Storage policies:

```sql
create policy "Users access own audio"
on storage.objects for all
using (auth.uid() = owner)
with check (auth.uid() = owner);
```

### 6. Server-side Usage Example
Inside a Next.js route handler that receives recording uploads:

```ts
import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const supabase = createServerSupabase();
  const formData = await req.formData();
  const audioFile = formData.get("audio") as File;

  const filePath = `${userId}/${crypto.randomUUID()}.webm`;
  const { error } = await supabase.storage
    .from("recordings")
    .upload(filePath, audioFile, { contentType: "audio/webm" });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await supabase.from("recordings").insert({
    user_id: userId,
    bucket_path: filePath,
  });

  return NextResponse.json({ filePath });
}
```

### 7. Client-side Usage Example
For client components (if needed), initialise on demand:

```ts
const supabase = createBrowserSupabase();
const { data, error } = await supabase.from("recordings").select("*");
```

> Avoid exposing `SUPABASE_SERVICE_ROLE_KEY` and do not perform privileged operations in the browser.

### 8. How Supabase Complements Clerk
- **Shared user identity**: Use Clerk’s `userId` as the `recordings.user_id` foreign key so the same identity drives authentication (Clerk) and authorization (Supabase Row Level Security).
- **API protection**: Supabase route handlers still rely on Clerk’s `auth()` to confirm the session.
- **Metadata sync**: Optionally mirror Clerk user data into Supabase (using webhooks or background jobs) for analytics or additional relational data.

### 9. Template Coexistence with Clerk
- Ship Supabase samples under a dedicated route group (e.g., `/supabase/*`) while Clerk protects `/tools` and other app areas.
- Provide helper modules in `src/lib/supabase` and client examples so developers can choose between Clerk-only, Supabase-only, or hybrid architectures.
- Call out in docs that downstream teams can delete `/src/app/supabase` (and related helpers) if they stick with Clerk, or remove `/src/app/clerk` if they use Supabase auth exclusively.
- Adjust `middleware.ts` to keep Supabase demo routes accessible even if Clerk middleware runs globally.

### 10. Deployment Considerations
- Set environment variables in the host (Vercel etc.). The service role key must be stored as a secret.
- Supabase Edge Functions can live alongside Next.js if you need serverless jobs (e.g., transcription triggers).
- Ensure RLS policies are enabled before deploying to production to prevent public reads.

### 11. Protection Strategies
Combine Supabase with Clerk depending on how strict you want access to be.

- **API-only protection**: Keep `/tools` pages guarded by Clerk Middleware while API routes double-check `auth()` and use Supabase RLS keyed by `userId`.
- **Storage-first gating**: Even if a user discovers an API endpoint, the Supabase Storage policies stop them from reading other users’ audio.
- **Soft public pages**: Let marketing pages stay public, but fetch user-specific Supabase data only after verifying the session (server components can call `auth()` and pass `userId` as props).
- **Background jobs**: Use Supabase cron or Edge Functions to process transcripts if the Next.js API route should stay lightweight.

### 11. Testing Checklist
- Run `pnpm dev` and ensure environment variables are loaded (restart after updating `.env.local`).
- From a protected route, upload a test file and verify it appears in Supabase Storage.
- Run a `select` on the `recordings` table to confirm row-level policies allow only the authenticated user.
- Check logs in Supabase dashboard for any permission errors during development.

With Supabase hooked up, we can persist audio blobs, transcripts, and any analytics data while Clerk ensures only signed-in users incur transcription costs. Once you approve this plan, we can scaffold the helper modules and route handlers.
