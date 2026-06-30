import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceLinks from "@/components/ServiceLinks";
import { getRequestedLocale } from "@/lib/locale";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cutting-point-tech.vercel.app";

const content = {
  th: {
    meta: {
      title: "บทความธุรกิจและดิจิทัล | CUTTING POINT TECH",
      description:
        "บทความเชิงกลยุทธ์เกี่ยวกับการรับทำเว็บไซต์ โปรแกรมบริหารหอพัก/รีสอร์ท และการจดทะเบียนบริษัท เพื่อช่วยธุรกิจตัดสินใจได้อย่างมั่นใจ",
    },
    hero: {
      title: "บทความธุรกิจและดิจิทัลที่นำไปใช้ได้จริง",
      subtitle:
        "รวมแนวคิดและแนวทางที่ช่วยให้คุณวางแผนเว็บไซต์ ระบบบริหาร และการเริ่มต้นธุรกิจอย่างมั่นใจ",
    },
    crumbs: [
      { label: "หน้าแรก", href: "/" },
      { label: "บทความ" },
    ],
    items: [
      {
        title: "เลือกทีมรับทำเว็บไซต์องค์กรอย่างไรให้ได้ผลลัพธ์ระยะยาว",
        excerpt:
          "เกณฑ์สำคัญในการเลือกพาร์ตเนอร์ที่เข้าใจธุรกิจ ตั้งแต่กลยุทธ์ UX ไปจนถึงการดูแลหลังส่งมอบ",
      },
      {
        title: "โปรแกรมบริหารหอพัก/รีสอร์ทช่วยลดต้นทุนและเพิ่มรายได้ได้อย่างไร",
        excerpt:
          "หลักการวางระบบเพื่อให้การบริหารโปร่งใส ลดงานซ้ำซ้อน และวัดผลรายได้ได้แม่นยำ",
      },
      {
        title: "เริ่มจดทะเบียนบริษัทอย่างเป็นระบบใน 4 ขั้นตอน",
        excerpt:
          "คำแนะนำเรื่องเอกสาร โครงสร้างผู้ถือหุ้น และการเตรียมตัวก่อนยื่นจดทะเบียน",
      },
    ],
  },
  en: {
    meta: {
      title: "Business & Digital Articles | CUTTING POINT TECH",
      description:
        "Strategic articles about website development, dormitory/resort management systems, and company registration to support confident business decisions.",
    },
    hero: {
      title: "Business and digital insights you can apply",
      subtitle:
        "Guides and frameworks to help you plan websites, management systems, and company setup with confidence.",
    },
    crumbs: [
      { label: "Home", href: "/" },
      { label: "Articles" },
    ],
    items: [
      {
        title: "How to choose a corporate website partner for long-term results",
        excerpt:
          "Key criteria for selecting a team that aligns strategy, UX, and post-launch support.",
      },
      {
        title: "How management systems reduce cost for dormitories and resorts",
        excerpt:
          "A framework for operational transparency, reduced duplication, and accurate reporting.",
      },
      {
        title: "Company registration in four structured steps",
        excerpt:
          "Practical guidance on documents, shareholder structure, and registration readiness.",
      },
    ],
  },
  lo: {
    meta: {
      title: "ບົດຄວາມທຸລະກິດ ແລະ ດິຈິຕອນ | CUTTING POINT TECH",
      description:
        "ບົດຄວາມແນວກົນລະຍຸດກ່ຽວກັບການພັດທະນາເວັບໄຊ, ລະບົບບໍລິຫານຫໍພັກ/ຣີສອດ, ແລະ ການຈົດທະບຽນບໍລິສັດ ເພື່ອຊ່ວຍໃຫ້ທ່ານຕັດສິນໃຈໄດ້ຢ່າງມັ່ນໃຈ.",
    },
    hero: {
      title: "ບົດຄວາມທຸລະກິດ ແລະ ດິຈິຕອນທີ່ນຳໄປໃຊ້ໄດ້ຈິງ",
      subtitle:
        "ຮວບຮວມແນວຄິດແລະແນວທາງ ສຳລັບການວາງແຜນເວັບໄຊ, ລະບົບບໍລິຫານ, ແລະ ການເລີ່ມທຸລະກິດໃຫ້ມີຄວາມພ້ອມ.",
    },
    crumbs: [
      { label: "ໜ້າຫຼັກ", href: "/" },
      { label: "ບົດຄວາມ" },
    ],
    items: [
      {
        title: "ເລືອກທີມພັດທະນາເວັບໄຊແນວໃດໃຫ້ໄດ້ຜົນລະຍະຍາວ",
        excerpt:
          "ເກນສຳຄັນໃນການເລືອກພາດເນີທີ່ເຂົ້າໃຈທຸລະກິດ: ຕັ້ງແຕ່ກົນລະຍຸດ, UX, ຈົນເຖິງການດູແລຫຼັງສົ່ງມອບ.",
      },
      {
        title: "ລະບົບບໍລິຫານຫໍພັກ/ຣີສອດ ຊ່ວຍຫຼຸດຕົ້ນທຶນ ແລະ ເພີ່ມລາຍຮັບແນວໃດ",
        excerpt:
          "ໂຄງສ້າງການດຳເນີນງານທີ່ໂປ່ງໃສ, ຫຼຸດຄວາມຊ້ຳຊ້ອນ, ແລະ ລາຍງານແມ່ນຍຳ.",
      },
      {
        title: "ຈົດທະບຽນບໍລິສັດ 4 ຂັ້ນຕອນແບບມີໂຄງສ້າງ",
        excerpt:
          "ແນະນຳເອກະສານ, ໂຄງສ້າງຜູ້ຖືຫຸ້ນ, ແລະ ການກະກຽມຄວາມພ້ອມກ່ອນຍື່ນຈົດທະບຽນ.",
      },
    ],
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestedLocale();
  const data = content[locale].meta;
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/articles`;

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: data.title },
    description: data.description,
    alternates: { canonical: "/articles" },
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

export default async function ArticlesPage() {
  const locale = await getRequestedLocale();
  const data = content[locale];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-mist py-10">
        <div className="mx-auto w-full max-w-6xl space-y-4 px-6">
          <Breadcrumbs items={data.crumbs} />
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {data.hero.title}
          </h1>
          <p className="max-w-2xl text-base text-slate-600">{data.hero.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white"
            >
              {locale === "th" ? "ขอใบเสนอราคา" : locale === "lo" ? "ຂໍໃບສະເໜີລາຄາ" : "Request a quote"}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 px-5 py-2 text-xs font-semibold text-slate-700"
            >
              {locale === "th" ? "ปรึกษาฟรี" : locale === "lo" ? "ປຶກສາຟຣີ" : "Free consultation"}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {data.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft"
              >
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{item.excerpt}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex text-sm font-semibold text-blue-700"
                >
                  {locale === "th" ? "ปรึกษาเพื่อเริ่มต้น" : locale === "lo" ? "ປຶກສາເພື່ອເລີ່ມຕົ້ນ" : "Talk to our team"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-slate-900">
                {locale === "th" ? "บริการที่เกี่ยวข้อง" : locale === "lo" ? "ບໍລິການທີ່ກ່ຽວຂ້ອງ" : "Related services"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {locale === "th"
                  ? "เชื่อมโยงบทความกับบริการที่คุณสนใจ"
                  : locale === "lo"
                    ? "ເຊື່ອມໂຍງບົດຄວາມກັບບໍລິການທີ່ທ່ານສົນໃຈ"
                    : "Connect insights to the services you need."}
              </p>
            </div>
            <Link href="/" className="text-sm font-semibold text-blue-700">
              {locale === "th" ? "กลับหน้าแรก" : locale === "lo" ? "ກັບໜ້າຫຼັກ" : "Back to home"}
            </Link>
          </div>
          <div className="mt-8">
            <ServiceLinks locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}

