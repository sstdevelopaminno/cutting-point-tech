"use client";
import {
  ArrowRight,
  Award,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import PackageCard from "@/components/PackageCard";
import { useLang } from "@/components/LangContext";
import { getCopy } from "@/lib/i18n";

const featureIcons = [ShieldCheck, Sparkles, Award, Layers];

export default function HomePage() {
  const { lang } = useLang();

  const copy = getCopy(lang);
  const [loadedImageMap, setLoadedImageMap] = useState<Record<string, boolean>>({});
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const markImageLoaded = useCallback((src: string) => {
    setLoadedImageMap((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  }, []);
  const isImageLoaded = (src: string) => Boolean(loadedImageMap[src]);
  const portfolioShowcase = [
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/voltatechth.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL3ZvbHRhdGVjaHRoLmpwZyIsImlhdCI6MTc2OTYwMDUwOCwiZXhwIjoxODAxMTM2NTA4fQ.mqTlYZiL5qiVIZpmVmhwXEc_zs-RkY9b2C1DX5mFihc",
      altTh: "ตัวอย่างเว็บไซต์ 1",
      altEn: "Website example 1",
    },
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/webdesign_nack.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL3dlYmRlc2lnbl9uYWNrLmpwZyIsImlhdCI6MTc2OTYwMDUyMSwiZXhwIjoxODAxMTM2NTIxfQ.jknVEfODS-tsWy6ZC5W3iJQscqxfE3-difKO2Sx9JPE",
      altTh: "ตัวอย่างเว็บไซต์ 2",
      altEn: "Website example 2",
    },
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/Youngdo-Clinic.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL1lvdW5nZG8tQ2xpbmljLnBuZyIsImlhdCI6MTc2OTYwMDUzNywiZXhwIjoxODAxMTM2NTM3fQ.0oEhcTtHCUs7KaX23EdKUmFJ5lCGWaRX-QKTQq5G22k",
      altTh: "ตัวอย่างเว็บไซต์ 3",
      altEn: "Website example 3",
    },
  ] as const;
  const customerLogoShowcase = useMemo(
    () =>
      [
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/public/SST%20Our%20customer%20logo/-removebg-preview286820ca7b7bd098.png",
      altTh: "โลโก้ลูกค้า 1",
      altEn: "Customer logo 1",
    },
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/public/SST%20Our%20customer%20logo/170805.jpg",
      altTh: "โลโก้ลูกค้า 2",
      altEn: "Customer logo 2",
    },
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/public/SST%20Our%20customer%20logo/273695421_268573795416400_3348257750053601567_n.jpg",
      altTh: "โลโก้ลูกค้า 3",
      altEn: "Customer logo 3",
    },
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/public/SST%20Our%20customer%20logo/302172088_153656683949594_8561758620400651951_n.jpg",
      altTh: "โลโก้ลูกค้า 4",
      altEn: "Customer logo 4",
    },
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/public/SST%20Our%20customer%20logo/image.png",
      altTh: "โลโก้ลูกค้า 5",
      altEn: "Customer logo 5",
    },
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/public/SST%20Our%20customer%20logo/Kinko-Logo.ai.png",
      altTh: "โลโก้ลูกค้า 6",
      altEn: "Customer logo 6",
    },
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/public/SST%20Our%20customer%20logo/L&P99.png",
      altTh: "โลโก้ลูกค้า 7",
      altEn: "Customer logo 7",
    },
    {
      src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/public/SST%20Our%20customer%20logo/PnnqgLmxn4atAvqhdUA9.png",
      altTh: "โลโก้ลูกค้า 8",
      altEn: "Customer logo 8",
    },
      ] as const,
    []
  );

  const heroSlides = [
    { src: "/hero-slides/01.png", alt: "Cloud database system background" },
    { src: "/hero-slides/02.png", alt: "Data center system background" },
    { src: "/hero-slides/03.png", alt: "Responsive website design background" },
    { src: "/hero-slides/04.png", alt: "Business dashboard system background" },
    { src: "/hero-slides/05.png", alt: "Secure payment system background" },
    { src: "/hero-slides/06.png", alt: "Accounting and business document system background" },
  ] as const;

  const servicesShowcase = {
    src: "https://kyjtswuxuyqzidnxvsax.supabase.co/storage/v1/object/sign/sstinnovation/templates-services.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTI4NThhOC01MWIxLTQ0NTktYTg0My1kMjUzM2EyMTIxMTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzc3Rpbm5vdmF0aW9uL3RlbXBsYXRlcy1zZXJ2aWNlcy5wbmciLCJpYXQiOjE3NzA3NDY4MTcsImV4cCI6MTgwMjI4MjgxN30.7Z2AeIBnYGjZCeZZvCGkxWjsqU379MIqvRRUpU040xg",
    altTh: "ภาพตัวอย่างบริการและเทมเพลตเว็บไซต์",
    altEn: "Services and website templates showcase",
  } as const;
  const mainServiceShowcase = [
    {
      src: "/main-services/service-01-pos.png",
      altTh: "บริการระบบ POS พร้อมเครื่องสำหรับร้านอาหารและธุรกิจหลายสาขา",
      altEn: "POS system and hardware service for restaurants and multi-branch businesses",
    },
    {
      src: "/main-services/service-02-website.png",
      altTh: "บริการรับทำเว็บไซต์องค์กร ร้านค้าออนไลน์ และ Landing Page",
      altEn: "Website, ecommerce, and landing page development service",
    },
    {
      src: "/main-services/service-03-hotel.png",
      altTh: "บริการระบบโรงแรมและรีสอร์ทสำหรับการจองและรายงาน",
      altEn: "Hotel and resort system service for booking and reporting",
    },
    {
      src: "/main-services/service-04-accounting-app.png",
      altTh: "บริการโปรแกรมบัญชีสำหรับจัดการรายรับรายจ่ายและเอกสาร",
      altEn: "Accounting software service for income, expenses, and documents",
    },
    {
      src: "/main-services/service-05-accounting-service.png",
      altTh: "บริการรับทำบัญชีและดูแลงานเอกสารทางการเงิน",
      altEn: "Accounting service and financial document support",
    },
    {
      src: "/main-services/service-06-registration.png",
      altTh: "บริการรับจดบริษัทและจัดเตรียมเอกสารนิติบุคคล",
      altEn: "Company registration and juristic document service",
    },
  ] as const;
  const customerSectionEyebrow = lang === "th" ? "ลูกค้าของเรา" : "Our customers";
  const customerSectionTitle =
    lang === "th" ? "แบรนด์ที่ไว้วางใจเรา" : "Trusted by Leading Brands";
  const customerSectionSubtitle =
    lang === "th"
      ? "พันธมิตรและลูกค้าจากหลากหลายธุรกิจ ที่ร่วมเติบโตไปกับ CUTTING POINT TECH"
      : "Partners and clients across industries who trust CUTTING POINT TECH.";
  const uniqueCustomerLogoShowcase = useMemo(
    () =>
      customerLogoShowcase.filter(
        (logo, index, arr) => arr.findIndex((item) => item.src === logo.src) === index
      ),
    [customerLogoShowcase]
  );
  const eyebrowClass =
    lang === "th"
      ? "text-xs font-semibold text-blue-600"
      : "text-xs uppercase tracking-[0.3em] text-blue-600";
  const pillMutedClass =
    lang === "th"
      ? "rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500"
      : "rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500";
  const pillBlueClass =
    lang === "th"
      ? "rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700"
      : "rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-700";

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);


  const seoContent = useMemo(
    () =>
      lang === "th"
      ? {
          h1: "ยกระดับธุรกิจของคุณ ด้วยเว็บไซต์และระบบบริหารธุรกิจครบวงจร",
          sections: [
            {
              h2: "CUTTING POINT TECH COMPANY LIMITED",
              intro: [
                "CUTTING POINT TECH คือทีมผู้เชี่ยวชาญที่ทำงานแบบครบวงจร ตั้งแต่กลยุทธ์ดิจิทัล การออกแบบ การพัฒนา ไปจนถึงการดูแลหลังส่งมอบ เราเน้นความโปร่งใส คุณภาพ และผลลัพธ์เชิงธุรกิจของเรา และเป็นธุรกิจขนาดเล็กที่เน้นบริการที่ดี ให้บริการด้านไอทีทั้งซอฟต์แวร์ ฮาร์ดแวร์ และระบบอื่น ๆ ของเว็บไซต์ รวมถึงด้านธุรกิจอาหารและเครื่องดื่ม และรีสอร์ท/โรงแรม ครอบคลุมระบบการจองและระบบที่เกี่ยวข้องอื่น ๆ ด้วยทีมงานมืออาชีพและการดูแลหลังการขาย",
              ],
              h3: [],
            },
            {
              h2: "บริการรับทำเว็บไซต์ระดับมืออาชีพ",
              intro: [
                "CUTTING POINT TECH ให้บริการ รับทำเว็บไซต์ สำหรับองค์กรและธุรกิจที่ต้องการภาพลักษณ์พรีเมียม เราเริ่มจากการวิเคราะห์แบรนด์ กลุ่มเป้าหมาย และเส้นทางลูกค้า เพื่อออกแบบโครงสร้างเว็บที่สื่อสารคุณค่าได้ชัดเจนและสร้างความน่าเชื่อถือในระยะยาว เป้าหมายของเราคือทำให้เว็บไซต์เป็นสินทรัพย์ทางธุรกิจ ไม่ใช่แค่หน้าสวย ๆ",
                "ทุกโครงการของเราเน้นมาตรฐาน UX/UI ที่เข้าใจผู้ใช้งานจริง ความเร็วโหลดสูง รองรับ SEO และการแสดงผลบนทุกอุปกรณ์ พร้อมวางระบบที่ขยายได้ในอนาคต ไม่ว่าจะเป็นเว็บไซต์บริษัท เว็บไซต์ธุรกิจขนาดกลาง ไปจนถึงเว็บไซต์องค์กรที่มีหลายภาษาและหลายสาขา เมื่อคุณต้องการทีมมืออาชีพที่ดูแลทั้งกลยุทธ์และเทคนิค การ รับทำเว็บไซต์ กับ CUTTING POINT TECH จะช่วยให้การเริ่มต้นเป็นระบบและคุ้มค่า",
                "เรายังให้ความสำคัญกับเนื้อหาเชิงธุรกิจ ตั้งแต่โครงสร้างข้อความ การจัดลำดับข้อมูล ไปจนถึงการวาง Call-to-Action ที่เหมาะสม เพื่อให้เว็บไซต์ช่วยสร้างโอกาสทางการขายจริง ไม่ว่าจะเป็นการเก็บข้อมูลผู้สนใจ การสร้างความเชื่อมั่น หรือการนำเสนอข้อเสนอที่ชัดเจน ทีมของเราทำงานร่วมกับคุณอย่างใกล้ชิด เพื่อให้เว็บไซต์สะท้อนตัวตนของแบรนด์อย่างถูกต้อง",
              ],
              h3: [
                {
                  title: "เว็บไซต์บริษัท / เว็บไซต์ธุรกิจ",
                  body: [
                    "เราออกแบบเว็บไซต์บริษัทให้สอดคล้องกับภาพลักษณ์และจุดยืนของแบรนด์ พร้อมวางโครงสร้างเนื้อหาที่ชัดเจน ตั้งแต่หน้าแนะนำบริษัท บริการ ผลงาน ไปจนถึงช่องทางติดต่อ เพื่อให้ลูกค้าเชื่อมั่นและตัดสินใจง่ายขึ้น โครงสร้างถูกออกแบบให้รองรับการเติบโต การเพิ่มหน้าใหม่ และการขยายฟีเจอร์ในอนาคตอย่างเป็นระบบ",
                  ],
                },
                {
                  title: "ทีมงานมืออาชีพและการดูแลหลังการขาย",
                  body: [
                    "หลังส่งมอบ เรามีทีมดูแลระบบและปรับปรุงต่อเนื่อง ช่วยตรวจสอบประสิทธิภาพ ความปลอดภัย และการปรับแต่ง SEO อย่างสม่ำเสมอ เพื่อให้เว็บไซต์ของคุณทำงานได้เต็มศักยภาพ ทั้งในมุมภาพลักษณ์และผลลัพธ์เชิงธุรกิจ",
                  ],
                },
              ],
            },
            {
              h2: "โปรแกรมบริหารหอพักและรีสอร์ท",
              intro: [
                "สำหรับผู้ประกอบการที่ต้องการระบบจัดการที่แม่นยำและทันสมัย เรามี โปรแกรมบริหารหอพัก และ โปรแกรมบริหารรีสอร์ท ที่ช่วยจัดการห้องพัก สัญญา การชำระเงิน และรายงานได้ครบในระบบเดียว ลดงานเอกสารซ้ำซ้อน เพิ่มความโปร่งใส และทำให้การบริหารเป็นระบบมากขึ้น",
                "เราออกแบบระบบให้เหมาะกับการใช้งานจริง ทั้งฝ่ายต้อนรับ ฝ่ายบัญชี และผู้บริหาร โดยเน้นความปลอดภัยของข้อมูล รองรับการสำรองข้อมูล และสามารถปรับแต่งให้เข้ากับกฎระเบียบหรือรูปแบบธุรกิจของคุณได้ ระบบของเราช่วยให้เจ้าของกิจการเห็นภาพรวมได้ทันที และตัดสินใจทางธุรกิจได้เร็วขึ้น",
                "ไม่ว่าคุณจะดูแลหอพักรายเดือน รีสอร์ทแบบรายคืน หรือที่พักแบบผสม ระบบของเราถูกวางให้ยืดหยุ่น รองรับการกำหนดสิทธิ์ผู้ใช้งาน และการตรวจสอบย้อนหลังได้ครบถ้วน ช่วยลดความเสี่ยงในการทำงานและเพิ่มคุณภาพการให้บริการแก่ลูกค้า",
              ],
              h3: [
                {
                  title: "ระบบจัดการหอพักออนไลน์",
                  body: [
                    "ระบบจัดการหอพักออนไลน์ช่วยติดตามสถานะห้องพัก การต่อสัญญา การแจ้งชำระ และประวัติผู้เช่าอย่างเป็นระบบ ผู้ดูแลสามารถเข้าถึงข้อมูลที่จำเป็นได้ทันที ลดข้อผิดพลาดจากการจดบันทึกมือ พร้อมสร้างรายงานรายเดือนเพื่อวิเคราะห์รายได้และอัตราการเข้าพักได้อย่างแม่นยำ",
                  ],
                },
                {
                  title: "ระบบบริหารรีสอร์ทแบบครบวงจร",
                  body: [
                    "สำหรับรีสอร์ทและที่พักแบบหลายประเภท เราวางระบบที่รองรับการกำหนดราคาแบบยืดหยุ่น การบริหารโปรโมชั่น และการเชื่อมต่อช่องทางการจองต่าง ๆ ช่วยให้ทีมงานทำงานร่วมกันได้ง่ายขึ้น และยกระดับประสบการณ์ของลูกค้าให้ดีขึ้นอย่างต่อเนื่อง",
                  ],
                },
              ],
            },
            {
              h2: "บริการจดทะเบียนบริษัทครบวงจร",
              intro: [
                "นอกจากงานด้านดิจิทัล เรายังมีบริการ จดทะเบียนบริษัท ที่ดูแลครบตั้งแต่ขั้นตอนเริ่มต้น ให้คำปรึกษาเรื่องชื่อบริษัท วัตถุประสงค์ และเอกสารที่เกี่ยวข้อง ช่วยลดภาระของผู้ประกอบการใหม่ ทำให้การเริ่มต้นธุรกิจเป็นเรื่องง่ายและเป็นระบบ",
                "เราทำงานร่วมกับทีมที่เชี่ยวชาญเรื่องกฎหมายธุรกิจ เพื่อให้กระบวนการถูกต้องตามข้อกำหนด พร้อมให้คำแนะนำเรื่องการจัดโครงสร้างธุรกิจ การจัดการภาษี และการวางระบบเอกสารที่เหมาะสม ช่วยให้บริษัทของคุณเริ่มต้นอย่างมืออาชีพ",
                "บริการของเราครอบคลุมทั้งการเตรียมเอกสาร การยื่นคำขอ และการติดตามผลอย่างเป็นระบบ ลดเวลาที่ผู้ประกอบการต้องใช้ในการประสานงานหลายฝ่าย พร้อมให้คำแนะนำเชิงธุรกิจเพื่อให้บริษัทใหม่พร้อมดำเนินงานอย่างถูกต้องตามกฎหมาย",
              ],
              h3: [
                {
                  title: "ที่ปรึกษาด้านการจดทะเบียนบริษัท",
                  body: [
                    "เราให้คำปรึกษาเชิงลึก เพื่อให้คุณเข้าใจขั้นตอนสำคัญของการจดทะเบียนบริษัท ไม่ว่าจะเป็นการจัดตั้งผู้ถือหุ้น การกำหนดทุนจดทะเบียน หรือการเตรียมเอกสารที่จำเป็น ช่วยลดความเสี่ยงและเพิ่มความมั่นใจตั้งแต่วันแรกของการดำเนินธุรกิจ",
                  ],
                },
              ],
            },
          ],
        }
      : lang === "lo"
        ? {
            h1: "ຍົກລະດັບທຸລະກິດຂອງທ່ານ ດ້ວຍເວັບໄຊແລະລະບົບທຸລະກິດແບບຄົບວົງຈອນ",
            sections: [
              {
                h2: "CUTTING POINT TECH COMPANY LIMITED",
                intro: [
                  "CUTTING POINT TECH ແມ່ນທີມງານຜູ້ຊ່ຽວຊານແບບຄົບວົງຈອນ: ວາງກົນລະຍຸດດິຈິຕອນ, ອອກແບບ, ພັດທະນາ ແລະ ດູແລຫຼັງສົ່ງມອບ. ພວກເຮົາເນັ້ນຄວາມໂປ່ງໃສ, ຄຸນນະພາບ ແລະ ຜົນລັບທາງທຸລະກິດທີ່ວັດໄດ້.",
                ],
                h3: [],
              },
              {
                h2: "ບໍລິການພັດທະນາເວັບໄຊຢ່າງມືອາຊີບ",
                intro: [
                  "ເຮົາພັດທະນາເວັບໄຊທີ່ສື່ສານແບຣນດ໌ຊັດ, ສ້າງຄວາມນ່າເຊື່ອຖື, ແລະ ພ້ອມສຳລັບ SEO ເພື່ອໃຫ້ເກີດຜົນລັບທາງທຸລະກິດຈິງ.",
                  "ໂຄງສ້າງເວັບໄຊຖືກອອກແບບໃຫ້ຂະຫຍາຍຕໍ່ໄດ້: ເພີ່ມໜ້າ, ເພີ່ມພາສາ, ຫຼື ເຊື່ອມຕໍ່ລະບົບອື່ນໆໃນອະນາຄົດ.",
                ],
                h3: [],
              },
              {
                h2: "ລະບົບຫໍພັກ/ຣີສອດ ແລະ ລະບົບບໍລິຫານ",
                intro: [
                  "ລະບົບບໍລິຫານຫ້ອງພັກ, ສັນຍາ, ການຊຳລະເງິນ ແລະ ລາຍງານ ເພື່ອຫຼຸດງານຊ້ຳຊ້ອນ ແລະ ເພີ່ມຄວາມແມ່ນຍຳໃນການຈັດການ.",
                ],
                h3: [],
              },
              {
                h2: "ບໍລິການຈົດທະບຽນບໍລິສັດແບບຄົບວົງຈອນ",
                intro: [
                  "ດູແລຂັ້ນຕອນເອກະສານ ແລະ ການຈົດທະບຽນຢ່າງຖືກຕ້ອງ ພ້ອມຄຳແນະນຳເຊິງທຸລະກິດ ເພື່ອໃຫ້ເລີ່ມຕົ້ນໄດ້ຢ່າງມືອາຊີບ.",
                ],
                h3: [],
              },
            ],
          }
        : {
          h1: "Elevate your business with full-service websites and business systems",
          sections: [
            {
              h2: "CUTTING POINT TECH COMPANY LIMITED",
              intro: [
                "CUTTING POINT TECH is an end-to-end expert team—from digital strategy, design, and development to post-launch support. We emphasize transparency, quality, and real business outcomes. As a small, service-minded company, we provide IT services across software, hardware, and website systems, as well as solutions for food & beverage businesses and resorts/hotels, including complete booking systems and related operational systems—backed by a professional team and after-sales support.",
              ],
              h3: [],
            },
            {
              h2: "Professional website development services",
              intro: [
                "CUTTING POINT TECH delivers professional website development for brands that require premium positioning and measurable outcomes. We start with strategy, audience insights, and user journeys, then translate those into a structure that communicates value, builds trust, and converts visitors into customers. Your website becomes a business asset, not just a digital brochure.",
                "Our builds emphasize performance, SEO readiness, and consistent experience across devices. We design systems that scale as your business grows, whether you need a corporate website, a multi-service business site, or a multilingual platform. If you are looking for a partner that combines strategy and technology, CUTTING POINT TECH provides a reliable end-to-end website development service.",
                "Content structure is part of the strategy. We help shape messaging, information hierarchy, and calls to action so that your website generates real business outcomes, from qualified inquiries to stronger brand credibility. Our team collaborates closely with you to ensure the final experience reflects your identity accurately.",
              ],
              h3: [
                {
                  title: "Corporate websites / business websites",
                  body: [
                    "We craft corporate and business websites that align with your brand identity and clarify your offerings. Clear navigation, strong messaging, and conversion-focused layouts help visitors understand your value quickly. The foundation is built to expand with new pages, features, and integrations as your organization evolves.",
                  ],
                },
                {
                  title: "Professional team and post-launch care",
                  body: [
                    "After launch, we provide ongoing care, performance monitoring, security updates, and SEO refinements. This ensures your website remains fast, secure, and effective as your business priorities change.",
                  ],
                },
              ],
            },
            {
              h2: "Dormitory and resort management systems",
              intro: [
                "For property operators, our dormitory and resort management systems simplify daily operations. Centralized management covers rooms, contracts, billing, and reporting in one place, reducing manual work and improving accuracy. The result is better visibility and faster decisions.",
                "We design these systems with real-world workflows in mind for reception, accounting, and management teams. Data security, backup readiness, and flexibility are built-in so your system adapts to your business rules and operational scale.",
                "Whether you manage monthly dormitories, nightly resorts, or mixed property types, our systems are designed to be flexible, role-based, and auditable. This reduces operational risk while improving service quality for tenants and guests.",
              ],
              h3: [
                {
                  title: "Online dormitory management",
                  body: [
                    "Track occupancy status, renewals, payment history, and tenant records from a single dashboard. Automated notifications and structured reporting reduce mistakes and help you maintain consistent service quality.",
                  ],
                },
                {
                  title: "End-to-end resort management",
                  body: [
                    "For resorts and multi-room properties, we support dynamic pricing, promotions, and operational visibility across teams. The system improves guest experience while keeping management efficient and data-driven.",
                  ],
                },
              ],
            },
            {
              h2: "Complete company registration service",
              intro: [
                "CUTTING POINT TECH also offers end-to-end company registration service. We guide you through naming, objectives, documentation, and required steps to establish your business correctly and efficiently. This reduces friction for new founders and ensures a professional start.",
                "Our advisory team provides practical guidance on business structure, compliance, and documentation so your company begins with a solid foundation. You can focus on growth while we handle the administrative details.",
                "From preparation to submission and follow-up, we keep the process organized and transparent. You gain clarity on legal requirements and practical business considerations, ensuring your company starts with confidence.",
              ],
              h3: [
                {
                  title: "Company registration advisory",
                  body: [
                    "We help you understand shareholder structure, capital requirements, and essential documentation. Our goal is to reduce risk and ensure a smooth, compliant registration process.",
                  ],
                },
              ],
            },
          ],
        },
    [lang]
  );

  /*
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage(null);
    setDebugRequestId(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale: lang }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok: boolean; error?: string; requestId?: string }
        | null;

      if (!response.ok || !data?.ok) {
        if (isDev) {
          console.error("Contact form submit failed", {
            status: response.status,
            requestId: data?.requestId ?? null,
          });
        }
        setDebugRequestId(data?.requestId ?? null);
        setErrorMessage(
          data?.error
            ? data.error
            : lang === "th"
              ? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
              : "Submission failed. Please try again."
        );
        setStatus("error");
        return;
      }

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        company: "",
        startedAt: null,
      });
      setDebugRequestId(null);
      setStatus("success");
    } catch (error) {
      if (isDev) {
        console.error("Contact form submit error", { error: String(error) });
      }
      setDebugRequestId(null);
      setErrorMessage(
        lang === "th"
          ? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
          : "Submission failed. Please try again."
      );
      setStatus("error");
    }
  };

  useEffect(() => {
    if (submitModalTimerRef.current) {
      window.clearTimeout(submitModalTimerRef.current);
      submitModalTimerRef.current = null;
    }

    if (status === "loading") {
      setSubmitModal({
        open: true,
        variant: "sending",
        title: lang === "th" ? "กำลังส่งข้อความ..." : "Sending your message...",
        message:
          lang === "th"
            ? "โปรดรอสักครู่"
            : "Please wait a moment.",
      });
      return;
    }

    if (status === "success") {
      setSubmitModal({
        open: true,
        variant: "success",
        title: lang === "th" ? "ส่งสำเร็จ" : "Sent successfully",
        message:
          lang === "th"
            ? "ขอบคุณสำหรับการติดต่อ เราจะติดต่อกลับโดยเร็ว"
            : "Thanks — we’ll get back to you soon.",
      });
      submitModalTimerRef.current = window.setTimeout(() => {
        setSubmitModal({ open: false });
      }, 1800);
      return;
    }

    if (status === "error") {
      setSubmitModal({
        open: true,
        variant: "error",
        title: lang === "th" ? "ส่งไม่สำเร็จ" : "Submission failed",
        message:
          errorMessage ||
          (lang === "th"
            ? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
            : "Submission failed. Please try again."),
      });
      submitModalTimerRef.current = window.setTimeout(() => {
        setSubmitModal({ open: false });
      }, 3200);
      return;
    }
  }, [copy.contact.success, errorMessage, lang, status]);

  useEffect(() => {
    return () => {
      if (submitModalTimerRef.current) {
        window.clearTimeout(submitModalTimerRef.current);
      }
    };
  }, []);

  */
  return (
    <>
      {/*
      <SubmitStatusModal
        open={submitModal.open}
        variant={submitModal.open ? submitModal.variant : "sending"}
        title={submitModal.open ? submitModal.title : ""}
        message={submitModal.open ? submitModal.message : undefined}
        onClose={() => setSubmitModal({ open: false })}
        closeLabel={lang === "th" ? "ตกลง" : "OK"}
      />
      */}
      <main id="top">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            {heroSlides.map((slide, index) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover transition-opacity duration-1000 ease-out ${
                  index === heroSlideIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/72 to-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/70" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20">
            <div className="max-w-xl space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-blue-100">
                CUTTING POINT TECH
              </p>
              <h1 className="font-[var(--font-heading)] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {seoContent.h1}
              </h1>
              <p className="text-lg text-blue-100">{copy.hero.subtitle}</p>
              <p className="text-sm text-blue-100">{copy.hero.trust}</p>
            </div>
          </div>
        </section>
        <section id="seo" className="bg-white py-20">
          <div className="mx-auto w-full max-w-5xl space-y-12 px-6">
            {seoContent.sections.map((section, sectionIndex) => {
              const illustration =
                sectionIndex === 2
                  ? {
                      src: "/illustrations/service-dormitory.svg",
                      alt:
                        lang === "th"
                          ? "ภาพประกอบโปรแกรมบริหารหอพักและรีสอร์ท"
                          : "Illustration: Dormitory and resort management system",
                    }
                  : sectionIndex === 3
                    ? {
                        src: "/illustrations/service-company.svg",
                        alt:
                          lang === "th"
                            ? "ภาพประกอบบริการจดทะเบียนบริษัทครบวงจร"
                          : "Illustration: Company registration service",
                      }
                    : null;
              const imageOnLeft = Boolean(illustration) && sectionIndex === 2;

              const detailsHref =
                sectionIndex === 1
                  ? "/services/website"
                  : sectionIndex === 2
                    ? "/services/dormitory-system"
                    : sectionIndex === 3
                      ? "/services/company-registration"
                      : null;

              const estimateHref =
                sectionIndex === 2
                  ? "/estimate?service=dormitory"
                  : sectionIndex === 3
                    ? "/estimate?service=company"
                    : null;

              return (
              <div
                key={section.h2}
                className={
                  sectionIndex === 0
                    ? "space-y-6 text-center"
                    : illustration
                      ? `flex flex-col gap-6 md:items-center md:gap-10 ${
                          imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
                        }`
                      : "space-y-6"
                }
              >
                <div className={illustration ? "space-y-6" : undefined}>
                  {sectionIndex === 1 ? (
                    <div className="mb-10 md:mb-12">
                      <div className="relative">
                        {!isImageLoaded(servicesShowcase.src) ? (
                          <div className="absolute inset-0 animate-pulse rounded-2xl bg-slate-200/70" />
                        ) : null}
                        <Image
                          src={servicesShowcase.src}
                          alt={lang === "th" ? servicesShowcase.altTh : servicesShowcase.altEn}
                          width={1400}
                          height={560}
                          unoptimized
                          loading="lazy"
                          fetchPriority="low"
                          className={`h-auto w-full object-cover transition-opacity duration-300 ${
                            isImageLoaded(servicesShowcase.src) ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() => markImageLoaded(servicesShowcase.src)}
                        />
                      </div>
                      <div className="mt-6 rounded-3xl border border-blue-100 bg-white p-5 shadow-card-soft">
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                            {lang === "th"
                              ? "เทคโนโลยีระดับพรีเมียม"
                              : lang === "lo"
                                ? "ເທັກໂນໂລຢີລະດັບພຣີເມຍມ"
                                : "Premium technology"}
                          </p>
                          <h3 className="mt-2 font-[var(--font-heading)] text-2xl font-semibold text-slate-900">
                            {lang === "th"
                              ? "มาตรฐานสากลระดับโลก"
                              : lang === "lo"
                                ? "ມາດຕະຖານລະດັບໂລກ"
                                : "World-standard platform"}
                          </h3>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <p className="text-2xl font-semibold text-blue-700">98%</p>
                            <p className="text-sm text-slate-600">{lang === "th" ? "คะแนนประสิทธิภาพ" : lang === "lo" ? "ຄະແນນປະສິດທິພາບ" : "Performance score"}</p>
                          </div>
                          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <p className="text-2xl font-semibold text-blue-700">24/7</p>
                            <p className="text-sm text-slate-600">{lang === "th" ? "มอนิเตอร์ 24/7" : lang === "lo" ? "ຕິດຕາມ 24/7" : "Monitoring"}</p>
                          </div>
                          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <p className="text-2xl font-semibold text-blue-700">
                              {lang === "th" ? "14 วัน" : lang === "lo" ? "14 ມື້" : "14d"}
                            </p>
                            <p className="text-sm text-slate-600">{lang === "th" ? "ส่งมอบเฉลี่ย" : lang === "lo" ? "ສົ່ງມອບໂດຍສະເລ່ຍ" : "Fast delivery"}</p>
                          </div>
                          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                            <p className="text-2xl font-semibold text-blue-700">100+</p>
                            <p className="text-sm text-slate-600">{lang === "th" ? "มาตรฐาน" : lang === "lo" ? "ມາດຕະຖານ" : "Standards"}</p>
                          </div>
                        </div>
                        <p className="mt-4 rounded-2xl border border-blue-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                          {lang === "th"
                            ? "ระบบครบวงจรและระดับ Supabase Deploy บน Vercel ได้ทันที"
                            : lang === "lo"
                              ? "ລະບົບຄົບວົງຈອນ ແລະ ພ້ອມ Deploy ບົນ Vercel"
                              : "Full-stack system, Supabase-ready, and deployable on Vercel."}
                        </p>
                      </div>
                    </div>
                  ) : null}
                  <h2
                    className={`font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl ${
                      sectionIndex === 1 ? "leading-[1.5]" : ""
                    }`}
                  >
                    {section.h2}
                  </h2>
                  {section.intro.slice(0, 1).map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className={
                        sectionIndex === 0
                          ? "mx-auto max-w-3xl text-base text-slate-600"
                          : "text-base text-slate-600"
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.h3.length ? (
                    <ul
                      className={
                        sectionIndex === 0
                          ? "mx-auto w-fit list-disc space-y-2 pl-5 text-left text-base text-slate-600"
                          : "list-disc space-y-2 pl-5 text-base text-slate-600"
                      }
                    >
                      {section.h3.map((item) => (
                        <li key={item.title}>{item.title}</li>
                      ))}
                    </ul>
                  ) : null}
                  {detailsHref || estimateHref ? (
                    <div className="flex flex-wrap items-center gap-4">
                      {detailsHref ? (
                        <Link
                          href={detailsHref}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
                        >
                          {lang === "th"
                            ? "ดูรายละเอียดบริการ"
                            : "View full service details"}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : null}
                      {estimateHref ? (
                        <Link
                          href={estimateHref}
                          className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                        >
                          {lang === "th" ? "ประมาณราคา" : "Estimate"}
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {illustration ? (
                  <div className="mx-auto w-full max-w-[420px] md:mx-0 md:w-[320px] md:flex-none">
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card-soft">
                      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-3">
                      <Image
                        src={illustration.src}
                        alt={illustration.alt}
                        width={800}
                        height={520}
                        className="h-auto w-full"
                        loading="lazy"
                        fetchPriority="low"
                      />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              );
            })}
          </div>
        </section>

        {/*
        <section id="service-landing" className="bg-mist py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>
                  {lang === "th" ? "บริการของเรา" : "Our services"}
                </p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {lang === "th"
                    ? "เส้นทางบริการเฉพาะทางสำหรับธุรกิจของคุณ"
                    : "Specialized service paths for your business"}
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  {lang === "th"
                    ? "เลือกบริการที่ตรงกับเป้าหมายของคุณ พร้อมลิงก์ไปยังรายละเอียดแบบเต็มและช่องทางติดต่อ"
                    : "Explore each service with full details and direct contact paths."}
                </p>
              </div>
              <Link
                href="/contact"
                className="text-sm font-semibold text-blue-700"
              >
                {lang === "th" ? "ขอใบเสนอราคา" : "Request a quote"}
              </Link>
            </div>
            <div className="mt-10">
              <ServiceLinks locale={lang} />
            </div>
          </div>
        </section>
        */}

        <section id="main-services" className="bg-white pt-20 pb-10">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>{lang === "th" ? "บริการ" : "Services"}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {lang === "th" ? "การบริการหลักของเรา" : "Our Core Services"}
                </h2>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mainServiceShowcase.map((item) => (
                <div
                  key={item.src}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                    {!isImageLoaded(item.src) ? (
                      <div className="absolute inset-0 animate-pulse bg-slate-200/80" />
                    ) : null}
                    <Image
                      src={item.src}
                      alt={lang === "th" ? item.altTh : item.altEn}
                      width={1200}
                      height={1200}
                      className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] ${
                        isImageLoaded(item.src) ? "opacity-100" : "opacity-0"
                      }`}
                      loading="lazy"
                      fetchPriority="low"
                      onLoad={() => markImageLoaded(item.src)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-white pt-10 pb-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>{copy.nav.features}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.features.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.features.subtitle}</p>
              </div>
              <div className="text-sm text-slate-500">
                {lang === "th"
                  ? "ยกระดับเว็บไซต์ให้เป็นสินทรัพย์เชิงธุรกิจ"
                  : "Turn your website into a strategic business asset."}
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {copy.features.items.map((item, index) => {
                const Icon = featureIcons[index] ?? ShieldCheck;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/*
        <section id="services" className="bg-white py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>{copy.nav.services}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.services.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.services.subtitle}</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
              >
                {lang === "th" ? "คุยกับผู้เชี่ยวชาญ" : "Talk to specialists"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {copy.services.items.map((item, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];
                return (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        */}
        <section id="package-list" className="bg-gradient-to-b from-white to-mist py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>{copy.nav.packages}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.packages.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.packages.subtitle}</p>
              </div>
              <div className={pillBlueClass}>
                {lang === "th" ? "ปรับแต่งตามธุรกิจ" : "Customizable"}
              </div>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {copy.packages.items.map((item) => (
                <PackageCard key={item.name} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="bg-white py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-10 text-center">
              <p className={eyebrowClass}>{copy.nav.portfolio}</p>
              <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                {lang === "th" ? "รูปแบบเว็บไซต์ตัวอย่าง" : "Website template examples"}
              </h2>
              <p className="mt-3 text-slate-600">
                {lang === "th"
                  ? "ตัวอย่างเลย์เอาต์และสไตล์เว็บไซต์ เพื่อใช้เป็นแนวทางก่อนเริ่มทำเว็บไซต์"
                  : "Layout and style examples to help you choose a direction before we build."}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {portfolioShowcase.map((item) => (
                <div
                  key={item.src}
                  className="overflow-hidden rounded-3xl transition hover:-translate-y-1"
                >
                  <div className="relative h-56 w-full sm:h-60 md:h-56">
                    {!isImageLoaded(item.src) ? (
                      <div className="absolute inset-0 animate-pulse bg-slate-200/70" />
                    ) : null}
                    <Image
                      src={item.src}
                      alt={lang === "th" ? item.altTh : item.altEn}
                      width={1200}
                      height={800}
                      className={`block h-56 w-full object-cover transition-opacity duration-300 sm:h-60 md:h-56 ${
                        isImageLoaded(item.src) ? "opacity-100" : "opacity-0"
                      }`}
                      unoptimized
                      loading="lazy"
                      fetchPriority="low"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onLoad={() => markImageLoaded(item.src)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="our-customers" className="relative overflow-hidden bg-slate-950 py-20 text-white">
          <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-8 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative mx-auto w-full max-w-6xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                {customerSectionEyebrow}
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {customerSectionTitle}
              </h2>
              <p className="mt-3 text-sm text-slate-300 md:text-base">{customerSectionSubtitle}</p>
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-4 md:p-6">
              <div className="customers-logo-track flex w-max items-center gap-4 md:gap-6">
                {uniqueCustomerLogoShowcase.map((logo) => (
                  <div
                    key={logo.src}
                    className="h-28 w-52 overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-lg md:h-32 md:w-56 md:p-3"
                  >
                    {!isImageLoaded(logo.src) ? (
                      <div className="h-full w-full animate-pulse bg-slate-200/70" />
                    ) : null}
                    <Image
                      src={logo.src}
                      alt={lang === "th" ? logo.altTh : logo.altEn}
                      width={260}
                      height={140}
                      unoptimized
                      loading="lazy"
                      fetchPriority="low"
                      className={`h-full w-full object-contain transition-opacity duration-300 ${
                        isImageLoaded(logo.src) ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => markImageLoaded(logo.src)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/*
        <section id="contact" className="bg-mist py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className={eyebrowClass}>{copy.nav.contact}</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.contact.title}
                </h2>
                <p className="mt-3 text-slate-600">{copy.contact.subtitle}</p>
                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className={formLabelClass} htmlFor="contact-name">
                        {copy.contact.name}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        maxLength={120}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                        value={formData.name}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            name: event.target.value,
                            startedAt: formData.startedAt ?? Date.now(),
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={formLabelClass} htmlFor="contact-phone">
                          {copy.contact.phone}
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          maxLength={50}
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                          value={formData.phone}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              phone: event.target.value,
                              startedAt: formData.startedAt ?? Date.now(),
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className={formLabelClass} htmlFor="contact-email">
                          {copy.contact.email}
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          maxLength={120}
                          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                          value={formData.email}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              email: event.target.value,
                              startedAt: formData.startedAt ?? Date.now(),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className={formLabelClass} htmlFor="contact-message">
                        {copy.contact.message}
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        maxLength={2000}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
                        value={formData.message}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            message: event.target.value,
                            startedAt: formData.startedAt ?? Date.now(),
                          })
                        }
                      />
                    </div>
                    <input
                      type="text"
                      name="company"
                      autoComplete="off"
                      tabIndex={-1}
                      aria-hidden="true"
                      aria-label="Company"
                      className="hidden"
                      value={formData.company}
                      onChange={(event) =>
                        setFormData({ ...formData, company: event.target.value })
                      }
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={submitClass}
                    >
                      {status === "loading" ? copy.contact.sending : copy.contact.submit}
                    </button>
                    {status === "success" ? (
                      <p className="text-sm text-emerald-600">{copy.contact.success}</p>
                    ) : null}
                    {status === "error" ? (
                      <p className="text-sm text-rose-600">
                        {errorMessage ||
                          (lang === "th"
                            ? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
                            : "Submission failed. Please try again.")}
                        {isDev && debugRequestId ? ` (requestId: ${debugRequestId})` : ""}
                      </p>
                    ) : null}
                  </form>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                  <h3 className="font-[var(--font-heading)] text-xl font-semibold text-slate-900">
                    {copy.contact.detailsTitle}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {copy.contact.detailsSubtitle}
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <p>{copy.footer.company}</p>
                    <p>{copy.footer.address}</p>
                    <p>{copy.footer.phone}</p>
                    <p>{copy.footer.email}</p>
                    <p>{copy.footer.line}</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card-soft">
                  <h3 className="font-[var(--font-heading)] text-xl font-semibold text-slate-900">
                    {lang === "th" ? "การดูแลหลังส่งมอบ" : "Post-launch care"}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    {lang === "th"
                      ? "แพ็กเกจดูแลรายเดือน พร้อมทีมงานดูแลความปลอดภัยและอัปเดตระบบให้ต่อเนื่อง"
                      : "Monthly care plans with security monitoring and continuous updates."}
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                    <li>SLA ระดับองค์กร</li>
                    <li>รายงานวิเคราะห์รายเดือน</li>
                    <li>อัปเดตฟีเจอร์แบบยืดหยุ่น</li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-card-soft">
                  <h3 className="font-[var(--font-heading)] text-xl font-semibold">
                    {lang === "th" ? "พร้อมสำหรับ Supabase" : "Supabase-ready"}
                  </h3>
                  <p className="mt-3 text-sm text-slate-200">
                    {lang === "th"
                      ? "วางโครงสร้างเพื่อเชื่อมต่อฐานข้อมูลและระบบ Authentication ได้ทันที"
                      : "Architecture prepared for database, auth, and real-time services."}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                    <span>Vercel</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400" />
                    <span>Supabase</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400" />
                    <span>Next.js 14</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}

        <section id="additional" className="bg-white py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>
                  {lang === "th" ? "บริการเสริม" : "Add-ons"}
                </p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {copy.additional.title}
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">{copy.additional.subtitle}</p>
              </div>
              <div className={pillMutedClass}>
                {lang === "th" ? "ยืดหยุ่นตามแผน" : "Flexible add-ons"}
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {copy.additional.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card-soft"
                >
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="articles" className="bg-mist py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrowClass}>
                  {lang === "th" ? "บทความเชิงกลยุทธ์" : "Strategic articles"}
                </p>
                <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900">
                  {lang === "th"
                    ? "ความรู้ที่ช่วยให้ธุรกิจตัดสินใจได้ดีขึ้น"
                    : "Insights to support better business decisions"}
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  {lang === "th"
                    ? "รวมบทความเชิงลึกเกี่ยวกับเว็บไซต์ ระบบบริหาร และการเริ่มต้นธุรกิจ พร้อมแนวทางที่นำไปใช้ได้จริง"
                    : "Explore practical guides on websites, management systems, and business setup."}
                </p>
              </div>
              <Link href="/articles" className="text-sm font-semibold text-blue-700">
                {lang === "th" ? "ดูบทความทั้งหมด" : "View all articles"}
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  title:
                    lang === "th"
                      ? "แนวทางเลือกผู้พัฒนาเว็บไซต์องค์กรที่เหมาะกับธุรกิจ"
                      : "Choosing the right corporate website partner",
                  excerpt:
                    lang === "th"
                      ? "สรุปเกณฑ์สำคัญในการเลือกทีมรับทำเว็บไซต์ที่ตอบโจทย์ธุรกิจและสร้างผลลัพธ์ระยะยาว"
                      : "Key criteria for selecting a website partner that delivers long-term value.",
                },
                {
                  title:
                    lang === "th"
                      ? "ระบบบริหารหอพักช่วยลดต้นทุนได้อย่างไร"
                      : "How dormitory systems reduce operational cost",
                  excerpt:
                    lang === "th"
                      ? "แนวทางวางระบบที่ลดความซ้ำซ้อน เพิ่มความแม่นยำ และทำให้การบริหารโปร่งใสขึ้น"
                      : "How structured operations improve accuracy, transparency, and efficiency.",
                },
                {
                  title:
                    lang === "th"
                      ? "เตรียมเอกสารจดทะเบียนบริษัทให้พร้อมในครั้งเดียว"
                      : "Preparing company registration documents correctly",
                  excerpt:
                    lang === "th"
                      ? "เช็กลิสต์เอกสารและขั้นตอนสำคัญก่อนเริ่มจดทะเบียนบริษัท"
                      : "A practical checklist of steps and documents before registration.",
                },
              ].map((article) => (
                <div
                  key={article.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card-soft"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">{article.excerpt}</p>
                  <Link
                    href="/articles"
                    className="mt-4 inline-flex text-sm text-blue-700"
                  >
                    {lang === "th" ? "อ่านต่อ" : "Read more"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <style>{`
        @keyframes customers-pan {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-18%);
          }
        }

        .customers-logo-track {
          animation: customers-pan 18s ease-in-out infinite alternate;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .customers-logo-track {
            animation-duration: 14s;
          }
        }
      `}</style>
    </>
  );
}
