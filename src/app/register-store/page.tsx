import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getRequestedLocale } from "@/lib/locale";

const content = {
  th: {
    title: "สมัครใช้งาน CpIPOS | CUTTING POINT INNOVATION",
    heading: "เริ่มต้นใช้งาน CpIPOS",
    eyebrow: "CPIPOS · STORE ONBOARDING",
    sub: "ระบบสมัครออนไลน์กำลังเตรียมเปิดให้ใช้งาน",
    body: "ระหว่างนี้สามารถติดต่อทีมงานเพื่อขอเปิดร้านและรับข้อมูลแพ็กเกจได้โดยตรง ทีมงานจะช่วยแนะนำการเริ่มต้นใช้งานให้เหมาะกับประเภทร้านของคุณ",
    contact: "ติดต่อทีมงานเพื่อสมัครใช้งาน",
    download: "ดูไฟล์ดาวน์โหลด",
    note: "ยังไม่เริ่มนับวันทดลองใช้ 7 วันจนกว่าจะสร้างร้านและเปิดใช้งานสำเร็จ",
  },
  en: {
    title: "Join CpIPOS | CUTTING POINT INNOVATION",
    heading: "Get started with CpIPOS",
    eyebrow: "CPIPOS · STORE ONBOARDING",
    sub: "Online applications are being prepared",
    body: "Meanwhile, contact our team to discuss store setup and packages. We will guide you through the right setup for your store.",
    contact: "Contact us to get started",
    download: "View downloads",
    note: "Your 7-day trial starts only after your store has been created and activated.",
  },
  lo: {
    title: "ສະໝັກໃຊ້ CpIPOS | CUTTING POINT INNOVATION",
    heading: "ເລີ່ມໃຊ້ CpIPOS",
    eyebrow: "CPIPOS · STORE ONBOARDING",
    sub: "ລະບົບສະໝັກອອນລາຍກຳລັງກຽມເປີດໃຊ້ງານ",
    body: "ລະຫວ່າງນີ້ ຕິດຕໍ່ທີມງານເພື່ອຂໍເປີດຮ້ານ ແລະ ສອບຖາມແພັກເກດໄດ້ໂດຍກົງ",
    contact: "ຕິດຕໍ່ທີມງານ",
    download: "ດູໄຟລ໌ດາວໂຫຼດ",
    note: "ທົດລອງໃຊ້ 7 ມື້ ເລີ່ມນັບເມື່ອຮ້ານເປີດໃຊ້ງານສຳເລັດ",
  },
} as const;
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  return { title: content[locale].title, description: content[locale].sub };
}
export default async function RegistrationLanding() {
  const locale = await getRequestedLocale();
  const t = content[locale];
  return (
    <main className="min-h-[calc(100dvh-80px)] bg-[#090e1c] px-5 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-2xl rounded-[32px] border border-sky-300/20 bg-gradient-to-br from-sky-900/30 via-[#101b30] to-[#0c1220] p-8 text-center shadow-2xl sm:p-12">
        <Image src="/brand/logo-icon.png" alt="CpIPOS" width={64} height={64} className="mx-auto h-16 w-16 object-contain" />
        <span className="mt-6 block text-xs font-bold tracking-[.2em] text-sky-300">{t.eyebrow}</span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">{t.heading}</h1>
        <h2 className="mt-5 text-lg font-bold text-sky-200">{t.sub}</h2>
        <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">{t.body}</p>
        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          <Link href="/contact" className="rounded-xl bg-sky-300 px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-sky-200">{t.contact}</Link>
          <Link href="/downloads" className="rounded-xl border border-sky-300/40 px-5 py-4 text-sm font-bold text-sky-100 transition hover:bg-sky-300/10">{t.download}</Link>
        </div>
        <p className="mt-8 text-xs leading-6 text-slate-400">{t.note}</p>
      </div>
    </main>
  );
}
