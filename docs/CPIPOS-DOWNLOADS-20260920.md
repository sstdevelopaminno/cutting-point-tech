# CpIPOS download center release staging (2026-09-20)

The website displays a compact top-navigation `สมัครใช้งาน ▼` dropdown. The former separate Downloads item is removed. Children:

1. สมัครใช้งาน CpIPOS → separately deployed CpIPOS-IT `/register-store` form (release gate: CpIPOS-IT PR #40 ready and merged).
2. ดาวน์โหลด Windows → `/downloads#windows`.
3. ดาวน์โหลด Android → `/downloads#android`.

Uploaded binary originals, verified by local SHA-256 and staged in a **private** Drive folder; they are not yet publicly downloadable. Never set public release URL variables to private Drive links and do not commit installer bytes to git.

| File staged | Size bytes | SHA-256 |
|---|---:|---|
| CpIPOS.Desktop_0.3.3_x64-setup.exe | 4292035 | 4c77c2a9cee8be9264a4b974900b3bede5e1721576d70df9dcd955f223ef8afd |
| CpIPOS-Android-POS-1.0.23-MDM-RC-DEBUG.apk | 9631690 | be39040de53bbd134ff958ef62faa932f1c48784906ef1f4d4216d1546e85d73 |

**The Android file is named RC-DEBUG and must be clearly labeled test-only**, not promoted as a production/release-signed APK. Validate its actual signing key/application ID and MDM behavior with a real test Android device before making it public.

The server-rendered `/downloads` page uses HTTPS URLs from `CPIPOS_WINDOWS_DOWNLOAD_URL` and `CPIPOS_ANDROID_DOWNLOAD_URL`, explicitly showing "กำลังจัดเตรียมลิงก์ดาวน์โหลด" when absent. Set the two environment variables only after confirming both URLs work in a browser without being signed in; never use a ChatGPT sandbox link or a private Drive file URL. Deploy/refresh after setting environment values.

Website component uses the existing `/brand/logo-icon.png`; no mock logo assets or main POS web repo edits. Verify `npm run lint`, `npx tsc --noEmit`, `npm run build`, desktop/mobile submenu, and target anchors before merging the PR.

## Company website production release gate

Safe partial release approved 2026-09-20: publish signup dropdown, local signup landing (/register-store) and download catalog while binary buttons remain disabled until public URLs are verified. Do not link the menu to the still-Draft IT application form, and do not misrepresent a private Drive file as accessible to customers. The core POS customer application and IT repository are untouched by the company-site deployment.
