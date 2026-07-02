# Cutting Point Tech Website

Marketing website for บริษัท คัตติ้งพอยท์ เทค จำกัด (CUTTING POINT TECH COMPANY LIMITED), built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
src/
  app/
    api/contact/route.ts
    api/estimate/route.ts
    api/estimate/lead/route.ts
    api/events/route.ts
    articles/page.tsx
    contact/page.tsx
    estimate/page.tsx
    layout.tsx
    packages/page.tsx
    page.tsx
    seo-ai/page.tsx
    services/page.tsx
    services/company-registration/page.tsx
    services/dormitory-system/page.tsx
    services/website/page.tsx
    templates/corporate/page.tsx
    templates/ecommerce/page.tsx
  components/
    Footer.tsx
    HomePage.tsx
    Navbar.tsx
    PackageCard.tsx
    PlatformCard.tsx
    SiteShell.tsx
  lib/
    email.ts
    estimate.ts
    estimateConfig.ts
    eventLogger.ts
    ga.ts
    i18n.ts
    lineWebhook.ts
    supabaseAdmin.ts
```

The home page is composed from `src/components/HomePage.tsx`. Shared language copy lives in `src/lib/i18n.ts`, estimate pricing logic lives in `src/lib/estimate.ts` and `src/lib/estimateConfig.ts`, and server-side lead notification helpers live in `src/lib/email.ts` and `src/lib/lineWebhook.ts`.

## Deploy to Vercel (GitHub)

1) Push this repository to GitHub.
2) Create a new project in Vercel and import the repo.
3) Add environment variables from `.env.example` in the Vercel dashboard.
4) Deploy.

## Supabase setup

Run the following SQL in your Supabase SQL editor before going live:

```sql
create table if not exists estimates (
  id uuid primary key default gen_random_uuid(),
  service text not null,
  inputs jsonb not null,
  price_min integer not null,
  price_max integer not null,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  service text,
  meta jsonb,
  created_at timestamptz not null default now()
);

alter table leads add column if not exists service text;
alter table leads add column if not exists estimate_id uuid references estimates(id);
```


## Documentation workflow

Before development or code changes, review this README, docs/DEVELOPMENT_LOG.md, and docs/AI_CONTEXT.md. After every code, UI, configuration, or deployment change, add a dated note to docs/DEVELOPMENT_LOG.md or another relevant docs file.

## Environment variables

Do not commit `.env` or `.env.local` files. Use `.env.example` for reference only.

Current environment variable surface:

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical site URL used by metadata and structured data. Defaults to `https://cuttingpointtech.vercel.app`. |
| `NEXT_PUBLIC_SUPABASE_URL` | public/server | Supabase project URL used by client/server helpers. |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Supabase service-role key for lead, estimate, and event writes. Never expose in browser code. |
| `SMTP_HOST` | server only | SMTP host for admin lead notifications. |
| `SMTP_PORT` | server only | SMTP port, defaults to `587` when omitted by the mail helper. |
| `SMTP_USER` | server only | SMTP username. |
| `SMTP_PASS` | server only | SMTP password or app password. |
| `MAIL_FROM` | server only | Sender address for admin notification emails. |
| `ADMIN_NOTIFY_EMAIL` | server only | Recipient address for admin notification emails. |
| `CLOUDFLARE_LINE_WEBHOOK_URL` | server only | Optional Cloudflare Worker URL for LINE lead notifications. |
| `CLOUDFLARE_LINE_WEBHOOK_SECRET` | server only | Optional shared secret sent to the Cloudflare webhook. |
| `NEXT_PUBLIC_GA4_ID` | public | Optional GA4 measurement ID. Analytics loads only in production when this matches `G-...`. |
