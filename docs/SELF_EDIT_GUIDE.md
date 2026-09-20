# Cutting Point Innovation Self-Edit Guide

คู่มือนี้ทำไว้สำหรับเจ้าของโปรเจคที่ต้องการแก้เว็บเองโดยไม่ต้องไล่หาไฟล์ใหม่ทุกครั้ง และช่วยลดการใช้โทเคนเวลาขอให้ AI ช่วยตรวจเฉพาะจุด

## เปิดโปรเจค

```bash
cd /d E:\Cutting-Point-Tech
npm run dev
```

เปิดเว็บที่ `http://localhost:3000`

ถ้าใช้ VS Code:

```bash
code E:\Cutting-Point-Tech
```

## ก่อนแก้ทุกครั้ง

1. เปิด `README.md`, `docs/DEVELOPMENT_LOG.md`, และ `docs/AI_CONTEXT.md` อ่าน guardrails สั้น ๆ
2. แก้ทีละจุด อย่าแก้หลาย section พร้อมกัน
3. หลังแก้ ดูหน้าเว็บที่ `localhost:3000`
4. ถ้าเป็นงานจริงจัง ให้รัน `npm run lint` และ `npm run build`
5. จดสิ่งที่แก้ใน `docs/DEVELOPMENT_LOG.md`

## แผนที่ไฟล์สำคัญ

| อยากแก้ | เปิดไฟล์ |
| --- | --- |
| หน้าแรกทั้งหมด | `src/components/HomePage.tsx` |
| แถบเมนูด้านบน / ปุ่มติดต่อ / dropdown | `src/components/Navbar.tsx` |
| footer ด้านล่าง | `src/components/Footer.tsx` |
| ข้อความกลางที่ใช้หลายที่ เช่น hero, services, packages, contact | `src/lib/i18n.ts` |
| โครง wrapper ที่เรียก Navbar + Footer | `src/components/SiteShell.tsx` |
| global CSS, สีพื้น, scrollbar, font base | `src/app/globals.css` |
| metadata/SEO หลักทั้งเว็บ | `src/app/layout.tsx` |
| หน้า contact | `src/app/contact/page.tsx`, `src/app/contact/ContactPageClient.tsx` |
| หน้าประเมินราคา | `src/app/estimate/page.tsx`, `src/app/estimate/EstimateClient.tsx` |
| หน้าบริการรวม | `src/app/services/page.tsx` |
| หน้าบริการรับทำเว็บ | `src/app/services/website/page.tsx` |
| หน้าบริการระบบหอพัก/รีสอร์ท | `src/app/services/dormitory-system/page.tsx` |
| หน้าบริการจดทะเบียนบริษัท | `src/app/services/company-registration/page.tsx` |
| หน้าแพ็กเกจ | `src/app/packages/page.tsx` |
| หน้าบทความ | `src/app/articles/page.tsx` |
| รูป hero slideshow | `public/hero-slides/` |
| รูปบริการหลัก 6 รูป | `public/main-services/` |
| โลโก้บริษัท | `public/brand/` |

## จุดที่ตรงกับภาพหน้าแรก

| ส่วนบนจอ | ไฟล์ / คำค้น |
| --- | --- |
| โลโก้ + ชื่อบริษัท | `src/components/Navbar.tsx`, ค้น `logo-icon.png` หรือ `CUTTING POINT INNOVATION` |
| เมนู หน้าแรก/จุดเด่น/บริการ/แพ็กเกจ | `src/components/Navbar.tsx`, ค้น `navItems` |
| ข้อความในเมนู dropdown | `src/components/Navbar.tsx`, ค้น `servicesOverview`, `packagesWebsite` |
| ปุ่มเปลี่ยนภาษา | `src/components/Navbar.tsx`, ค้น `langFlagSrcResolved` |
| ปุ่มติดต่อด้านขวาบน | `src/components/Navbar.tsx`, ค้น `contactPhoneHref` |
| รูปพื้นหลัง hero | `src/components/HomePage.tsx`, ค้น `heroSlides` |
| หัวข้อ hero | `src/lib/i18n.ts`, ค้น `hero:` แล้วแก้ `title`, `subtitle`, `trust` |
| ระยะสูงของ hero | `src/components/HomePage.tsx`, แถว section แรกหลัง `<main id="top">` |

## วิธีค้นหาเร็ว

ใน VS Code กด `Ctrl + Shift + F` แล้วค้นคำที่เห็นบนเว็บ เช่น:

```text
ยกระดับธุรกิจของคุณ
บริการ
0843374982
main-services
heroSlides
```

ถ้าค้นภาษาไทยไม่เจอ ให้ค้นชื่อ key ภาษาอังกฤษแทน:

```text
copy.hero.title
copy.services.title
copy.packages.items
copy.footer.phone
```

ใน terminal ใช้:

```bash
rg -n "คำที่ต้องการค้น" src
```

## สูตรแก้บ่อย

### แก้หัวข้อใหญ่หน้าแรก

เปิด `src/lib/i18n.ts` แล้วหา:

```ts
hero: {
  title: "...",
  subtitle: "...",
  trust: "...",
}
```

แก้ให้ครบอย่างน้อยภาษาไทย (`th`) ถ้าต้องการให้ภาษาอังกฤษ/ลาวตรงกัน ให้แก้ใน `en` และ `lo` ด้วย

### เปลี่ยนรูป hero

วางรูปใหม่ใน `public/hero-slides/` แล้วเปิด `src/components/HomePage.tsx` หา:

```ts
const heroSlides = [
  { src: "/hero-slides/01.png", alt: "..." },
]
```

ถ้าเปลี่ยนชื่อไฟล์ ต้องให้ `src` ตรงกับชื่อไฟล์จริง

### แก้เมนูด้านบน

เปิด `src/components/Navbar.tsx` หา:

```ts
const navItems = [
  { href: "/#top", key: "home" },
]
```

`href` คือปลายทาง, `key` คือชื่อที่ไปดึงข้อความจาก `src/lib/i18n.ts`

อย่าลบ key แบบสุ่ม เพราะบาง key ถูกใช้กับ dropdown และภาษา

### แก้เบอร์โทร / อีเมล / LINE

เริ่มจาก `src/lib/i18n.ts` หา:

```ts
footer: {
  phone: "0843374982",
  email: "cuttingpointtech@gmail.com",
  line: "ไลน์: @974qhtym",
}
```

จากนั้นตรวจไฟล์นี้ด้วย:

```text
src/components/StructuredData.tsx
```

เพราะเป็นข้อมูล SEO/schema ที่ search engine อ่าน

### แก้ section หน้าแรก

เปิด `src/components/HomePage.tsx` แล้วค้น `section id`

| Section | คำค้น |
| --- | --- |
| SEO/content section | `id="seo"` |
| landing บริการ | `id="service-landing"` |
| รูปบริการหลัก | `id="main-services"` |
| จุดเด่น | `id="features"` |
| บริการ | `id="services"` |
| แพ็กเกจ | `id="package-list"` |
| portfolio/templates | `id="portfolio"` |
| ลูกค้า | `id="our-customers"` |
| ติดต่อ | `id="contact"` |
| บริการเพิ่มเติม | `id="additional"` |
| บทความ | `id="articles"` |

ถ้าแค่แก้ข้อความ ให้แก้ `src/lib/i18n.ts` ก่อนเสมอ ถ้าจะย้าย layout/card/spacing ค่อยแก้ `HomePage.tsx`

## ข้อควรระวัง

- อย่าแก้ไฟล์ `.env` หรือ `.env.local` แล้ว commit
- อย่าเปลี่ยน `SUPABASE_SERVICE_ROLE_KEY` หรือ secrets ใน browser code
- อย่าดึงระบบ POS/admin จากโปรเจคอื่นกลับมาในเว็บนี้
- ระวัง `src/lib/i18n.ts`: มีข้อความหลายภาษาและยาวมาก แก้เฉพาะบล็อกที่ต้องการ
- ถ้า PowerShell แสดงภาษาไทยเพี้ยน ไม่ได้แปลว่าไฟล์เสียเสมอ ให้ดูใน VS Code เป็นหลัก
- เปลี่ยนรูปแล้วชื่อไฟล์ต้องตรงทั้งตัวพิมพ์เล็ก/ใหญ่
- ถ้าแก้ class Tailwind แล้วหน้ามือถือเพี้ยน ให้ดู prefix `sm:`, `md:`, `lg:` ก่อน

## ตรวจหลังแก้

เร็วสุด:

```bash
npm run lint
```

ตรวจก่อน deploy:

```bash
npm run build
```

ดูไฟล์ที่เปลี่ยน:

```bash
git status
git diff --stat
```

ถ้าจะดู diff เฉพาะไฟล์:

```bash
git diff src/components/HomePage.tsx
```

## วิธีถาม AI แบบประหยัดโทเคน

```text
โหมดประหยัดโทเคน ตรวจเฉพาะไฟล์นี้:
src/components/HomePage.tsx

ผมแก้ section id="features"
ช่วยดูว่ามี bug หรือ responsive พังไหม ไม่ต้องเสนอ refactor ใหญ่
```

```text
โหมดประหยัดโทเคน ผมต้องการเปลี่ยนข้อความ hero
บอกแค่ไฟล์และคำค้นที่ต้องแก้ ไม่ต้องแก้แทน
```

```text
โหมดประหยัดโทเคน ช่วยตรวจ git diff ปัจจุบันแบบ review
เน้น bug, responsive, build error เท่านั้น
```

## Flow แนะนำเวลาจะปรับ UI เอง

1. เปิดหน้าเว็บและระบุ section ที่จะเปลี่ยน
2. ใช้ `Ctrl + Shift + F` ค้นข้อความหรือ `id="..."`
3. แก้ทีละไฟล์
4. refresh browser
5. เช็ค desktop และ mobile width
6. รัน `npm run lint`
7. จด `docs/DEVELOPMENT_LOG.md`
8. commit เมื่อมั่นใจ
