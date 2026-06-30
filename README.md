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
    layout.tsx
    page.tsx
  components/
    Footer.tsx
    Navbar.tsx
    PackageCard.tsx
    PlatformCard.tsx
  lib/
    i18n.ts
```

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

## Environment variables

Do not commit `.env` or `.env.local` files. Use `.env.example` for reference only.
