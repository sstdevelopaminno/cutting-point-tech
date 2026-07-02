# Development Log

This file records documentation-first development notes for the Cutting Point Tech website.

## Working Rule
- Review existing documentation before starting code, UI, configuration, or deployment work.
- After every code change, UI update, configuration change, deployment, or operational fix, add a dated note here or in a related docs file.
- Each note should include scope, files touched, verification, Git status, and Vercel/deployment status when relevant.

## 2026-07-01
- Added this development log after the owner requested documentation review before future development.
- Reviewed existing documentation: README.md.
- Current production URL: https://cuttingpointtech.vercel.app.
- Current GitHub repository: https://github.com/sstdevelopaminno/cutting-point-tech.git.
- Latest confirmed public-access fix: disabled Vercel SSO/password deployment protection and verified HTTP 200 for public visitors.
- Recent company-contact update recorded: address changed to 66/497 Country Park 14 Village, Moo 5, Soi 2, Pathum Thani-Lat Lum Kaeo Road, Bang Toei, Sam Khok, Pathum Thani 12160; email changed to cuttingpointtech@gmail.com; phone and Line remain unchanged for now.
- Added docs/AI_CONTEXT.md to keep AI-assisted work aligned with project identity, scope guardrails, required documentation checks, and token-saving mode.
- Updated README.md documentation workflow to require reading docs/AI_CONTEXT.md before development.
- Moved the premium metrics card out of the hero section and placed it below the website showcase image as a responsive card row in src/components/HomePage.tsx.
- Verification: targeted source search passed, ESLint passed for src/components/HomePage.tsx, and diff --check passed. Local next build compiled source successfully but failed during generated .next/types validation because local Next generated types could not resolve next/types.js.
- Local preview: dev server started on http://localhost:3000 and returned HTTP 200 after initial compile.
- Added a six-image hero background slideshow using public/hero-slides/01.png through 06.png, with a dark blue overlay for readable hero text.
- Verification: hero slideshow source search passed, public/hero-slides contains 01.png through 06.png, ESLint passed for src/components/HomePage.tsx, diff --check passed, and localhost preview returned HTTP 200.
- Added global auto-hide scrollbar behavior: src/components/SiteShell.tsx toggles an is-scrolling class during scroll/wheel/touch movement, and src/app/globals.css hides the scrollbar thumb while idle.
- Verification: targeted source search passed, ESLint passed for src/components/SiteShell.tsx and src/components/HomePage.tsx, diff --check passed, and localhost preview returned HTTP 200.
- Refined auto-hide scrollbar behavior after owner screenshot showed the scrollbar rail still visible: removed the stable scrollbar gutter, made idle scrollbar width zero/none, and stopped showing the scrollbar on initial page load.
- Verification: targeted source search confirmed idle scrollbar uses scrollbar-width none and WebKit width 0; localhost preview returned HTTP 200.
- Removed the hero CTA button group shown in the owner screenshot, leaving the hero headline, subtitle, trust line, and slideshow background intact.
- Rebuilt src/components/HomePage.tsx from the Git UTF-8 baseline after detecting a PowerShell encoding issue, then reapplied the required hero slideshow, showcase metrics card, and CTA removal changes.
- Verification: targeted source search confirmed no hero CTA references remain, Thai/Laos text samples render as UTF-8 source text, ESLint passed for src/components/HomePage.tsx, diff --check passed, and localhost preview returned HTTP 200.
- Stopped the local dev server on port 3000 before release work, then fixed production build type issues by adding local type shims for Next generated imports, MetadataRoute, and lucide-react icons in src/types/next-types-js.d.ts; also replaced the HomePage styled-jsx-only style tag with a standard style tag for React 19 TypeScript compatibility.
- Verification: npm run build passed and npm run lint passed on 2026-07-01 before commit/push/deploy.
- Released commit 2f73184 to GitHub main and deployed production with Vercel CLI. Deployment inspect URL: https://vercel.com/sstdevelopaminnos-projects/cuttingpointtech/7AU5TSytaYv2LdGFMgQSKz8A6Zvy.
- Verification: https://cuttingpointtech.vercel.app returned HTTP 200 for public access after deployment; https://cutting-point-tech.vercel.app also returned HTTP 200.

## 2026-07-02
- Investigated why https://cuttingpointtech.vercel.app still showed the old hero while https://cutting-point-tech.vercel.app showed the latest hero slideshow. Root cause: the latest production deployment was aliased to the hyphenated project domain, while the preferred primary domain was still serving an older deployment.
- Reassigned https://cuttingpointtech.vercel.app to the newest ready production deployment with Vercel CLI after each deployment, because Vercel's automatic production alias still targets the hyphenated project domain.
- Verification: cache-busted HTML checks for both domains returned the new hero slideshow markup, no old CTA button markup, and no old gradient-only hero markup; https://cuttingpointtech.vercel.app returned HTTP 200.
- Reviewed README.md, docs/AI_CONTEXT.md, and this development log before continuing development setup.
- Updated README.md so the documented source structure matches the current Next.js App Router routes, components, libraries, and environment variable surface.
- Verification: README/log readback confirmed the new documentation entries. No source code behavior was changed. Git status and npm lint could not be checked in the current shell because `git` and `npm` were not available in PATH.
- Removed the dark POS system section shown in the owner screenshot from src/components/HomePage.tsx, including the related POS modal state/rendering and unused icons.
- Changed scrollbar handling to fully hide scrollbars instead of temporarily showing them while scrolling by removing the SiteShell scroll listener and simplifying src/app/globals.css scrollbar rules.
- Verification: targeted readback confirmed no `id="pos-system"`, `pos-modal`, or `is-scrolling` references remain, `ArrowRight` import usage is valid, and global CSS keeps `scrollbar-width: none`. Git status and npm lint could not be checked because `git`, `node`, and `npm` were not available in PATH in this shell.
- Added a new `main-services` image gallery above the features section in src/components/HomePage.tsx with the owner-provided six service images arranged as a responsive 3-column desktop grid.
- Copied the provided service images into public/main-services as service-01-pos.png through service-06-registration.png.
- Verification: targeted readback confirmed six image references and six copied images; `npm run build` passed with Node.js added to PATH for the shell session. `npm run lint` timed out without returning diagnostics.