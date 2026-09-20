# Pre-Development Review - 2026-09-03

This document records the current project state before further improvement or feature development. No runtime code changes are included in this review.

## Scope

- Project: Cutting Point Tech marketing website.
- Workspace: `E:\Cutting-Point-Tech`.
- Branch/status at review time: `main...origin/main`, clean working tree.
- Required docs reviewed first: `README.md`, `docs/DEVELOPMENT_LOG.md`, `docs/AI_CONTEXT.md`, and `docs/SELF_EDIT_GUIDE.md`.

## Current Stack

- Next.js App Router on Next `16.1.6`.
- React `19.2.3`.
- TypeScript `5`.
- Tailwind CSS `4`.
- Supabase client/admin helpers for lead, estimate, and event writes.
- Nodemailer for email lead notifications.
- Optional Cloudflare Worker webhook for LINE notifications.
- Vercel is the deployment target, with GitHub `main` as the release branch.

## Current Source Map

- `src/app/page.tsx` renders the homepage through `src/components/HomePage.tsx`.
- `src/components/SiteShell.tsx` wraps the shared `Navbar`, footer, analytics, structured data, and image protection behavior.
- `src/components/HomePage.tsx` owns the homepage hero slideshow, main service showcase, product/service areas, lead form, and business partner section.
- `src/components/sections/business-partner-section.tsx` owns the recent business partner logo and connector animation.
- `src/lib/i18n.ts` is the main shared copy source across Thai, English, and Lao.
- `src/lib/estimate.ts` and `src/lib/estimateConfig.ts` own estimate logic and pricing configuration.
- `src/app/api/contact/route.ts` handles contact form lead creation.
- `src/app/api/estimate/route.ts` handles estimate calculation persistence.
- `src/app/api/estimate/lead/route.ts` handles estimate-to-lead submission.
- `src/app/api/events/route.ts` handles allowed client event logging.

## API And Data Flow Notes

- Contact lead submission validates name, email, message length, honeypot company field, submit timing, and an in-memory per-IP rate limit of 5 requests per 60 seconds. It inserts into Supabase `leads`, sends best-effort email/LINE notifications, and records `lead_notify` status in `events` when available.
- Estimate submission validates the estimator service, normalizes input by service type, calculates price ranges, inserts into Supabase `estimates`, and records `estimate_submit` in `events`.
- Estimate lead submission uses similar validation, anti-spam, and rate limiting as contact leads. It stores estimate context in the lead message and `estimate_id`, sends notifications, and records `lead_submit` plus `lead_notify` event rows.
- Client event logging allows `service_click`, `estimate_start`, `estimate_submit`, and `lead_submit`, then writes to Supabase `events`.

## Environment Surface

Environment variables currently present in `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `ADMIN_NOTIFY_EMAIL`
- `CLOUDFLARE_LINE_WEBHOOK_URL`
- `CLOUDFLARE_LINE_WEBHOOK_SECRET`

Note: `README.md` documents most of this surface, but it currently omits `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_FACEBOOK_URL`. Add them before or during the next documentation cleanup.

## Recent Development Context

- The latest development log entries focus on homepage visual refinements, product showcase assets, favicon/app icon alignment, and the business partner CLEXPERT logo section.
- Several recent entries intentionally left commit and deployment pending per owner request until the final partner-logo update on 2026-09-03.
- Historical production behavior: after Vercel production deploys, the preferred primary domain `https://cuttingpointinnovation.vercel.app` may need manual alias reassignment because automatic aliasing often targets `https://cuttingpointinnovation.vercel.app`.

## Guardrails For Next Work

- Continue using the docs-first workflow before code, UI, config, Git, or Vercel changes.
- Keep work scoped to this marketing website. Do not reintroduce SST Innovation branding, POS Preview logic, SST iPOS backend flows, or unrelated admin/POS features.
- Do not change the phone number, Line ID, or production access protection without owner direction.
- Prefer existing components, i18n keys, App Router route patterns, and current asset folders.
- For user-facing edits, update `docs/DEVELOPMENT_LOG.md` in the same session.
- For release work, verify both the deployed URL and the preferred primary domain HTML/HTTP response.

## Recommended Next Improvements

1. Update `README.md` environment variable table for `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_FACEBOOK_URL`.
2. Confirm whether the 2026-09-03 business partner change has already been committed and deployed; the log says release completion was in progress.
3. If the next work touches forms, verify both frontend behavior and API route behavior because lead submission depends on Supabase, SMTP, and optional LINE webhook configuration.
4. If the next work touches homepage imagery or animation, run a local browser check in desktop and mobile widths after `npm run build`.
5. If the next work is deployable, finish with GitHub push, Vercel production deployment, manual primary alias check when needed, and production HTML/HTTP verification.

## Verification Performed For This Review

- Read required project documentation.
- Listed repository files with `rg --files`.
- Checked package scripts and dependencies from `package.json`.
- Checked environment template from `.env.example`.
- Checked current Git status with `git status -sb`.
- Targeted-searched source files for route exports, environment variable usage, Supabase writes, notification helpers, homepage hero/partner references, and TODO/FIXME markers.
- Read core API routes for contact leads, estimate persistence, estimate leads, and event logging.

No lint/build was run because this review only adds documentation and does not change website runtime behavior.
