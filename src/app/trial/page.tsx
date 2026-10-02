import { ArrowRight, BadgeCheck, Hotel, MonitorSmartphone, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointinnovation.vercel.app";

const copy = {
  th: {
    title: "ทดลองใช้งานระบบ | CUTTING POINT INNOVATION",
    description: "เลือกทดลองใช้งานระบบของ CUTTING POINT INNOVATION เริ่มจาก CpiPOS ระบบ POS สำหรับร้านอาหาร คาเฟ่ และร้านค้าปลีก",
    eyebrow: "TRY OUR SYSTEMS",
    heading: "ทดลองระบบก่อนตัดสินใจใช้งานจริง",
    subtitle: "เลือกผลิตภัณฑ์ที่ต้องการทดลอง ระบบที่เปิดให้ทดลองแล้วสามารถเริ่มใช้งานผ่านเว็บเบราว์เซอร์ได้ทันที",
    available: "พร้อมทดลอง",
    coming: "เร็ว ๆ นี้",
    posTitle: "CpiPOS · ระบบ POS",
    posDesc: "ทดลองระบบขายหน้าร้าน ดูยอดขาย สินค้า สต๊อก และการทำงานสำหรับร้านอาหาร คาเฟ่ และร้านค้าปลีก",
    aiTitle: "CpiPOS AI",
    aiDesc: "ผู้ช่วยวิเคราะห์ยอดขาย สต๊อก ต้นทุน และข้อมูลร้านจากระบบ POS",
    stayTitle: "ระบบหอพัก / รีสอร์ท",
    stayDesc: "ระบบจัดการที่พัก การจอง ห้องพัก ลูกค้า และงานหลังบ้าน",
    open: "ดูรายละเอียดการทดลอง",
    note: "ระบบทดลองอาจใช้ข้อมูลตัวอย่างและมีการจำกัดสิทธิ์บางส่วนเพื่อความปลอดภัย",
  },
  en: {
    title: "Try Our Systems | CUTTING POINT INNOVATION",
    description: "Explore product trials from CUTTING POINT INNOVATION, starting with CpiPOS for restaurants, cafés, and retail stores.",
    eyebrow: "TRY OUR SYSTEMS",
    heading: "Try the system before you decide",
    subtitle: "Choose a product to explore. Available trials can be launched from your browser.",
    available: "Available",
    coming: "Coming soon",
    posTitle: "CpiPOS · POS System",
    posDesc: "Explore sales, products, inventory and store operations for restaurants, cafés and retail.",
    aiTitle: "CpiPOS AI",
    aiDesc: "AI assistance for sales, stock, cost and store-data analysis inside CpiPOS.",
    stayTitle: "Dormitory / Resort System",
    stayDesc: "Accommodation, reservation, room, guest and back-office management.",
    open: "View trial details",
    note: "Trial environments may use sample data and limited permissions for security.",
  },
  lo: {
    title: "ທົດລອງໃຊ້ງານ | CUTTING POINT INNOVATION",
    description: "ເລືອກທົດລອງລະບົບຂອງ CUTTING POINT INNOVATION ເລີ່ມຈາກ CpiPOS.",
    eyebrow: "TRY OUR SYSTEMS",
    heading: "ທົດລອງລະບົບກ່ອນຕັດສິນໃຈ",
    subtitle: "ເລືອກລະບົບທີ່ຕ້ອງການທົດລອງ ແລະ ເລີ່ມຜ່ານເວັບໄດ້.",
    available: "ພ້ອມທົດລອງ",
    coming: "ໄວໆນີ້",
    posTitle: "CpiPOS · ລະບົບ POS",
    posDesc: "ທົດລອງການຂາຍ ສິນຄ້າ ສະຕັອກ ແລະ ການຈັດການຮ້ານ.",
    aiTitle: "CpiPOS AI",
    aiDesc: "AI ຊ່ວຍວິເຄາະຍອດຂາຍ ສະຕັອກ ແລະ ຕົ້ນທຶນ.",
    stayTitle: "ລະບົບຫໍພັກ / ຣີສອດ",
    stayDesc: "ຈັດການຫ້ອງພັກ ການຈອງ ລູກຄ້າ ແລະ ຫຼັງບ້ານ.",
    open: "ເບິ່ງລາຍລະອຽດ",
    note: "ລະບົບທົດລອງອາດໃຊ້ຂໍ້ມູນຕົວຢ່າງ ແລະ ຈຳກັດບາງສິດ.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const item = copy[locale];
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: item.title },
    description: item.description,
    alternates: { canonical: "/trial" },
    openGraph: { title: item.title, description: item.description, url: `${baseUrl}/trial`, type: "website" },
  };
}

export default async function TrialPage() {
  const locale = await getRequestedLocale();
  const t = copy[locale];

  const cards = [
    {
      title: t.posTitle,
      description: t.posDesc,
      status: t.available,
      active: true,
      href: "/trial/pos",
      icon: MonitorSmartphone,
      tone: "from-blue-600 to-cyan-500",
    },
    {
      title: t.aiTitle,
      description: t.aiDesc,
      status: t.coming,
      active: false,
      href: "",
      icon: Sparkles,
      tone: "from-violet-600 to-indigo-500",
    },
    {
      title: t.stayTitle,
      description: t.stayDesc,
      status: t.coming,
      active: false,
      href: "",
      icon: Hotel,
      tone: "from-emerald-600 to-teal-500",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#091a35] text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,.22),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,.20),transparent_34%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="text-xs font-bold tracking-[0.28em] text-sky-300">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">{t.heading}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            const content = (
              <article className={`group flex h-full min-h-[330px] flex-col rounded-[28px] border bg-white p-6 shadow-[0_16px_44px_rgba(15,23,42,.08)] transition ${card.active ? "border-blue-100 hover:-translate-y-1 hover:shadow-[0_20px_54px_rgba(37,99,235,.14)]" : "border-slate-200"}`}>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone} text-white shadow-lg`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${card.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {card.status}
                  </span>
                  {card.active ? <BadgeCheck className="h-4 w-4 text-emerald-600" /> : null}
                </div>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">{card.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{card.description}</p>
                <div className={`mt-6 inline-flex items-center gap-2 text-sm font-black ${card.active ? "text-blue-700" : "text-slate-400"}`}>
                  {card.active ? t.open : card.status}
                  {card.active ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /> : null}
                </div>
              </article>
            );
            return card.active ? <Link key={card.title} href={card.href} className="block h-full">{content}</Link> : <div key={card.title}>{content}</div>;
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-6 text-blue-950">
          {t.note}
        </div>
      </section>
    </main>
  );
}
