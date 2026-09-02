# Development Log



This file records documentation-first development notes for the Cutting Point Tech website.



## Working Rule

- Review existing documentation before starting code, UI, configuration, or deployment work.

- After every code change, UI update, configuration change, deployment, or operational fix, add a dated note here or in a related docs file.

- Each note should include scope, files touched, verification, Git status, and Vercel/deployment status when relevant.



## 2026-09-03
- Added the owner-provided CLEXPERT partner logo from C:\\Users\\Admins\\Downloads\\55995889.png as public/brand/business-partner-clexpert-logo.png, reduced the business partner section/card/logo sizing further, and kept the paired connector curves throwing inward from both sides toward the center. Verification: source and copied asset SHA256 hashes match, `npm run build` passed, localhost served the PNG with HTTP 200, and agent-browser confirmed two logo images, four active connector curves, two active logo spin elements, and no browser errors. Commit and production deployment are being completed in this run.

## 2026-09-02
- Refined the business partner placeholder section by keeping the CLEXPERT side empty for the real logo file, reducing the partner cards and handshake circle slightly, and changing the connector paths so paired top/bottom curves throw inward from both sides toward the center. Verification: targeted source checks confirmed the reduced card/circle sizing and inward connector paths, `git diff --check` and `npm run build` passed, localhost returned HTTP 200, and agent-browser confirmed the CLEXPERT placeholder remains, four connector paths are visible, logo spin elements are active, and no browser errors were reported. Commit and deployment remain intentionally pending per owner request.
- Removed the incorrect CLEXPERT product image from the business partner section, returned the partner card to a CLEXPERT placeholder until the real logo file path is available, and tightened the connector curves so paired top/bottom lines throw from the center toward both sides without crossing into the logo cards. Verification: targeted source checks confirmed the incorrect partner-logo asset path was removed and the connector curves were tightened to the center gap, `git diff --check` and `npm run build` passed, and agent-browser confirmed only the company logo plus CLEXPERT placeholder render with four active connector lines and no page errors. Commit and deployment remain intentionally pending per owner request.
- Replaced the hand-drawn CLEXPERT SVG with the actual owner-provided image asset copied unchanged to public/brand/business-partner-clexpert-logo.jpg, removed the generated SVG asset, and repositioned the partner connector animation as paired top/bottom curves throwing out to both left and right cards from the center. Verification: copied asset hash matches the source image exactly, targeted source checks confirmed the homepage uses the JPG file and four left/right connector paths, `git diff --check` and `npm run build` passed, localhost served the JPG asset with HTTP 200, and agent-browser confirmed no overlay or page errors. Commit and deployment remain intentionally pending per owner request.
- Corrected the CLEXPERT partner logo SVG to match the provided CLEXPERT wording and updated the business partner connectors to show four visible curved throw lines above and below the handshake circle. Verification: targeted source checks, `git diff --check`, `npm run build`, localhost asset check, and agent-browser DOM checks confirmed the corrected CLEXPERT wording, four visible connector paths, two active logo spin elements, and no browser errors. Commit and deployment remain intentionally pending per owner request.
- Updated the business partner section to use a CLEXPERT partner logo SVG, remove the subtitle and center supporting text, replay the logo spin and connector-line animation every time the section re-enters the viewport, and keep the soft standalone logo presentation. Verification: targeted source checks, `git diff --check`, `npm run build`, localhost HTTP checks, and agent-browser replay/DOM checks passed. Commit and deployment remain intentionally pending per owner request.
- Added a transparent, whitespace-cropped business-partner company logo asset at public/brand/business-partner-company-logo-transparent.png and switched the homepage partner section to render it as a standalone logo with the existing one-time spin treatment. Verification: targeted source checks, logo asset hash check, `git diff --check`, `npm run build`, localhost HTTP checks, and agent-browser DOM/style checks passed. Commit and deployment remain intentionally pending per owner request.
- Refined the business partner section with the new wide company logo artwork, larger standalone logo rendering with mix-blend treatment, rounder soft panels, one-time logo spin animation, and more expressive curved connector-line animation. Verification: targeted source checks, logo asset hash check, `git diff --check`, and `npm run build` passed. Commit and deployment remain intentionally pending per owner request.
- Added a lightweight `BusinessPartnerSection` between the additional-services and articles areas, using native IntersectionObserver scroll-triggered animation, an inline SVG handshake/connector, the owner-provided company logo at `public/brand/business-partner-company-logo.png`, and a clean partner-logo placeholder for later replacement. Verification: targeted source checks, `git diff --check`, and `npm run build` passed. Commit and deployment remain intentionally pending per owner request.
- Refined the product showcase interaction by speeding up slide rotation, enlarging the active artwork canvas while keeping page padding, animating the 5+ and 24/7 stat values quickly when the stats row enters the viewport, and aligning favicon/app icons with `public/brand/logo-icon.png`. Verification: targeted source search confirmed the stat animation, 2.8s rotation, enlarged 760px artwork canvas, explicit metadata icons, and matching app icon hashes; `npm run build` passed. Commit and deployment remain intentionally pending per owner request.
- Restored the homepage company-introduction content above the product showcase by rendering only the first `seoContent` company section; the removed standards, long service detail, carousel controls, and package-list blocks remain hidden as requested. Verification: targeted source search confirmed removed package/control references and `npm run build` passed. Commit and deployment remain intentionally pending per owner request.

- Removed the visible homepage sections shown below the product showcase screenshots: the long SEO/service-detail block with standards cards, the 3D showcase arrow/dot controls, and the homepage package-list cards. Removed the now-unused `PackageCard` import and `servicesShowcase` data. Verification: targeted source search confirmed removed references; `npm run build` passed. Commit and deployment remain intentionally pending per owner request.

- Replaced the `main-services` product showcase with six new owner-provided service artwork images in `public/product-showcase`, removed the old POS showcase image files from that folder, removed the visible card frame/ring styling, and removed the bottom text block so each 3D card displays full artwork only.

- Verification: targeted source search confirmed the new `service-*` product showcase paths and no old card text/ring classes remain in `src/components/HomePage.tsx`; `public/product-showcase` contains only the six new artwork files; `git diff --check` passed with only Windows LF/CRLF warnings; `npm run build` passed. Commit and deployment remain intentionally pending per owner request.
- Added `docs/SELF_EDIT_GUIDE.md` so the owner can find and safely edit common UI/content areas without relying on long AI sessions.

- Updated `README.md` documentation workflow to point self-edit work to `docs/SELF_EDIT_GUIDE.md`.

- Scope: documentation only; no website runtime behavior changed.

- Verification: targeted source/file map search and documentation write completed. Lint/build not run because only Markdown documentation changed.

- Git status and Vercel deployment not changed in this step.

- Compared five owner-provided hero background images against existing `public/hero-slides` images with SHA256 hashes; no exact duplicates were found.

- Added non-duplicate hero images as `public/hero-slides/07.png` through `public/hero-slides/11.png` and registered them in `src/components/HomePage.tsx`.

- Verification: targeted `rg` confirmed slide references in `src/components/HomePage.tsx`, `git diff --check` passed with only existing Windows LF/CRLF warnings, and localhost returned HTTP 200 for `/hero-slides/07.png` and `/hero-slides/11.png`. Full ESLint was attempted but did not complete in time in this shell session.

- Added one more non-duplicate owner-provided data-center hero image as `public/hero-slides/12.jpg`, then reordered the slideshow so new slides display first: `12.jpg`, `07.png`-`11.png`, then older `01.png`-`06.png`. Commit and deployment remain intentionally pending per owner request.



- Reworked the homepage `portfolio` section into a product/service showcase with a 3D-style rotating card stage inspired by the owner's reference image, covering POS hardware, tablet POS, website/online store, hotel/resort booking, and business/accounting systems.

- Added owner-provided POS visuals to `public/product-showcase/cpipos-device.png` and `public/product-showcase/cpipos-tablet.png` for the new showcase.

- Verification: targeted `rg` confirmed the new `productShowcase`, local asset paths, and `.product-showcase-stage`; `git diff --check` passed with only existing Windows LF/CRLF warnings; `npm run build` passed. Commit and deployment remain intentionally pending per owner request.

- Moved the new product/service 3D showcase up to replace the old `main-services` image grid, removed the lower duplicate `portfolio` showcase section, and removed the now-unused `mainServiceShowcase` data block.

- Adjusted showcase image rendering from cropped cover behavior to contained full-image display so POS artwork and service images remain fully visible inside the cards.

- Verification: targeted `rg` confirmed the lower `portfolio` section was removed, `product-showcase-stage` now renders under `main-services`, `mainServiceShowcase` is no longer referenced, showcase images use `object-contain`, `git diff --check` passed with only existing Windows LF/CRLF warnings, and `npm run build` passed. Commit and deployment remain intentionally pending per owner request.

- Refined the `main-services` 3D showcase styling with a pale full-band background image wash, wider `max-w-7xl` canvas, stronger active-card highlight, faded side cards, and full-image `object-contain` rendering for future company/service artwork.

- Verification: targeted readback confirmed the background image layer, widened container, active `ring-2`/shadow styling, side-card `opacity-35`, and `object-contain`; `git diff --check` passed with only existing Windows LF/CRLF warnings; `npm run build` passed. Commit and deployment remain intentionally pending per owner request.

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

- Released commit 6c051c2 to GitHub main and deployed production with Vercel CLI. Deployment inspect URL: https://vercel.com/sstdevelopaminnos-projects/cuttingpointtech/39btyKHpuToNhSwPQhWQ67tFbEM1.

- Reassigned https://cuttingpointtech.vercel.app to the latest deployment https://cuttingpointtech-d61y15nnh-sstdevelopaminnos-projects.vercel.app because the automatic production alias targets https://cutting-point-tech.vercel.app.

- Verification: https://cuttingpointtech.vercel.app returned HTTP 200, and cache-busted HTML for both the direct deployment URL and primary domain contained `main-services`, `service-01-pos`, and `การบริการหลักของเรา`.



## 2026-07-03

- Investigated slow homepage startup, delayed image display, and page jank symptoms.

- Optimized src/components/HomePage.tsx hero slideshow so only the first hero image is rendered during initial paint; secondary slides mount lazily after the page has had time to render, with lower image quality/fetch priority for non-LCP slides.

- Tuned next.config.ts image optimization with AVIF/WebP formats, longer optimizer cache TTL, responsive device/image sizes, and allowed quality values for the hero images.

- Reduced src/components/ImageProtection.tsx startup work by throttling image hardening after DOM mutations instead of scanning all images immediately on every mutation.

- Verification: npm run lint passed, npm run build passed, and a temporary local production server on http://localhost:3004 returned HTTP 200 with the homepage hero/lazy image markers present. The temporary port 3004 process was stopped after verification.

- Released performance commit e72f683 to GitHub main and deployed production with Vercel CLI. Deployment inspect URL: https://vercel.com/sstdevelopaminnos-projects/cuttingpointtech/FUXSs9Fa87NvRdj5Qr4ciaw61LBU.

- Production deployment URL: https://cuttingpointtech-pgiocpubb-sstdevelopaminnos-projects.vercel.app. Reassigned https://cuttingpointtech.vercel.app to this deployment because the automatic production alias targeted https://cutting-point-tech.vercel.app.

- Post-deploy verification: https://cuttingpointtech.vercel.app and https://cutting-point-tech.vercel.app both returned HTTP 200 on 2026-07-03.

- Updated the top navigation contact CTA so both desktop and mobile navbar contact buttons use the contact phone number from `copy.footer.phone` and open `tel:0843374982` instead of navigating to `/contact`.

- Files touched: src/components/Navbar.tsx and src/components/SiteShell.tsx.

- Verification: npm run lint passed, npm run build passed, and a temporary local production server on http://localhost:3004 returned HTTP 200 with `tel:0843374982` present in the homepage markup. The temporary port 3004 process was stopped after verification.

- Released navbar phone CTA commit 20137d3 to GitHub main and deployed production with Vercel CLI. Deployment inspect URL: https://vercel.com/sstdevelopaminnos-projects/cuttingpointtech/B7jVdLGJ96WtjytkAQVyhQDL1sNd.

- Production deployment URL: https://cuttingpointtech-ou9aux0k7-sstdevelopaminnos-projects.vercel.app. Reassigned https://cuttingpointtech.vercel.app to this deployment because the automatic production alias targeted https://cutting-point-tech.vercel.app.

- Post-deploy verification: https://cuttingpointtech.vercel.app returned HTTP 200 and the homepage HTML contained `href="tel:0843374982"` on 2026-07-03.



## 2026-07-10

- Replaced the website logo assets with the owner-provided standalone company logo from `C:\Users\Admins\Downloads\โลโก้บริษัทแบบเดี่ยว.png`.

- Updated brand and app icon assets: `public/brand/logo-icon.png`, `public/brand/logo-navbar.png`, `public/brand/logo-th.png`, `public/brand/logo-en.png`, `src/app/icon.png`, and `src/app/apple-icon.png`.

- Added `scripts/update-brand-logo.ps1` so the same logo source can regenerate the brand assets consistently.

- Verification: generated asset dimensions matched the expected brand/app icon sizes; targeted ESLint passed for `src`; `npm run build` passed; a temporary local production server on `http://localhost:3004` returned HTTP 200 for `/`, `/brand/logo-icon.png`, and `/icon.png`; browser verification confirmed page content, no Next.js error overlay, and navbar image loading from `/brand/logo-icon.png`. The temporary local server was stopped after verification.

- Released logo asset commit `8fe4176` to GitHub main and deployed production with Vercel CLI. Deployment inspect URL: https://vercel.com/sstdevelopaminnos-projects/cuttingpointtech/CjWmiGXrSheypb2YEd7wPX9fzV5M.

- Production deployment URL: https://cuttingpointtech-e5f3h4wik-sstdevelopaminnos-projects.vercel.app. Reassigned https://cuttingpointtech.vercel.app to this deployment because the automatic production alias targeted https://cutting-point-tech.vercel.app.

- Post-deploy verification: https://cuttingpointtech.vercel.app and https://cutting-point-tech.vercel.app returned HTTP 200; `/brand/logo-icon.png` and `/icon.png` returned HTTP 200 with the new 239398-byte assets; production HTML referenced `/brand/logo-icon.png` and `/icon.png`; Vercel error log scan for the deployment returned no logs found.



- Corrected the logo extraction after the deployed navbar/favicon showed a blurred blue glow instead of the intended company mark; tightened `scripts/update-brand-logo.ps1` to ignore low-saturation blue glow and regenerated the brand assets from `D:\บริษัท คัตติ้งพอยท์ จำกัด\โลโก้บริษัทแบบเดี่ยว.png`.

- Verification: regenerated asset dimensions stayed at the expected brand/app icon sizes; `git diff --check` passed; `npm run build` passed; a temporary local production server on `http://localhost:3004` returned HTTP 200 for `/` and `/brand/logo-icon.png`; browser verification confirmed page content, no Next.js error overlay, no browser errors, and navbar image loading from `/brand/logo-icon.png`. The temporary local server was stopped after verification.

- Released corrected logo updates through commit `862cf91` on GitHub main after follow-up logo asset commits `1c7477b` and `5d76c88`.

- Production deployment inspect URL: https://vercel.com/sstdevelopaminnos-projects/cuttingpointtech/DwhTfxAve2UrmZb11hVQVpHF7zcg.

- Production deployment URL: https://cuttingpointtech-mn6k99meq-sstdevelopaminnos-projects.vercel.app. Reassigned https://cuttingpointtech.vercel.app to this deployment because the automatic production alias targeted https://cutting-point-tech.vercel.app.

- Verification on 2026-07-21: `npm run lint` passed, `npm run build` passed, https://cuttingpointtech.vercel.app returned HTTP 200, https://cutting-point-tech.vercel.app returned HTTP 200, the direct deployment URL returned HTTP 200, and https://cuttingpointtech.vercel.app/brand/logo-icon.png returned HTTP 200 with `Content-Length: 69557`, matching the latest local `public/brand/logo-icon.png` asset.
