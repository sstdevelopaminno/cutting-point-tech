# AI Context for Cutting Point Tech

Use this file as the first project guardrail before any AI-assisted development. Keep responses and investigation concise to save tokens.

## Required Reading Order
1. Read README.md.
2. Read docs/DEVELOPMENT_LOG.md.
3. Read this file before touching code, UI, configuration, Git, or Vercel.
4. After every change, update docs/DEVELOPMENT_LOG.md with what changed and how it was verified.

## Project Identity
- Project: Cutting Point Tech website.
- Company TH: บริษัท คัตติ้งพอยท์ เทค จำกัด.
- Company EN: CUTTING POINT TECH COMPANY LIMITED.
- GitHub: https://github.com/sstdevelopaminno/cutting-point-tech.git.
- Production URL: https://cuttingpointtech.vercel.app.
- Deployment target: Vercel, GitHub main branch.

## Scope Guardrails
- Work only on the Cutting Point Tech website unless the owner explicitly names another project.
- Do not bring back SST INNOVATION branding, POS Preview logic, SST iPOS backend flows, or unrelated admin/POS features.
- Keep changes narrow and aligned with the current Next.js App Router marketing website.
- Do not replace existing working flows unless the owner explicitly requests it.
- Do not change phone number or Line ID until the owner provides new values.
- Keep Vercel public access enabled for external visitors; avoid enabling SSO/password protection on production.

## Development Workflow
- Inspect docs first, then inspect the relevant source files with targeted searches.
- Prefer existing project patterns, components, routes, styles, and i18n structure.
- Before editing, explain briefly what will be changed.
- After editing, verify with the smallest useful command: targeted search, type/build check, HTTP check, or Vercel inspect as appropriate.
- For user-facing changes, update docs/DEVELOPMENT_LOG.md in the same work session.
- If release is requested, commit intentionally, push to GitHub, deploy/check Vercel, and record the result in docs.

## Token-Saving Mode
- Keep chat updates short and high signal.
- Use rg or targeted file reads instead of broad full-project dumps.
- Avoid repeating long command output unless it changes the decision.
- Summarize findings instead of pasting large files.
- Ask only when blocked; otherwise make conservative choices from project context.
- Prefer one focused plan and one focused verification pass.

## Current Contact Baseline
- Address: บ้านเลขที่ 66/497 หมู่บ้านคันทรีพาร์ค 14 หมู่ 5 ซอย 2 ถนนปทุมธานีลาดหลุมแก้ว ตำบลบางเตย อำเภอสามโคก จังหวัดปทุมธานี 12160.
- Email: cuttingpointtech@gmail.com.
- Phone: 0843374982, unchanged until owner updates it.
- Line: @974qhtym, unchanged until owner updates it.
