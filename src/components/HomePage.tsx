"use client";
import {
  Award,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/components/LangContext";
import { getCopy } from "@/lib/i18n";
import BusinessPartnerSection from "@/components/sections/business-partner-section";

const featureIcons = [ShieldCheck, Sparkles, Award, Layers];

const heroProductSlides = [
  {
    src: "/home-hero/hero-slide-pos-ui.png",
    altTh: "หน้าจอระบบ CpIPOS บนแท็บเล็ต",
    altEn: "CpIPOS tablet interface",
  },
  {
    src: "/home-hero/hero-slide-pos-system.png",
    altTh: "ชุดระบบ POS สำหรับร้านค้า",
    altEn: "POS system product set",
  },
  {
    src: "/home-hero/hero-slide-pos-devices.png",
    altTh: "อุปกรณ์ POS สองหน้าจอ",
    altEn: "Dual-screen POS devices",
  },
  {
    src: "/home-hero/hero-slide-payment.png",
    altTh: "ระบบชำระเงินหลายช่องทาง",
    altEn: "Multi-channel payment system",
  },
  {
    src: "/home-hero/hero-slide-cloud-security.png",
    altTh: "คลาวด์เซิร์ฟเวอร์และระบบความปลอดภัย",
    altEn: "Cloud server and security system",
  },
] as const;

export default function HomePage() {
  const { lang } = useLang();

  const copy = getCopy(lang);
  const [loadedImageMap, setLoadedImageMap] = useState<Record<string, boolean>>({});
  const [heroProductSlideIndex, setHeroProductSlideIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [serviceStatsVisible, setServiceStatsVisible] = useState(false);
  const [c20LiteVisible, setC20LiteVisible] = useState(false);
  const [serviceStatsCount, setServiceStatsCount] = useState({ groups: 0, support: 0 });
  const c20LiteRef = useRef<HTMLElement>(null);
  const serviceStatsRef = useRef<HTMLDivElement>(null);
  const markImageLoaded = useCallback((src: string) => {
    setLoadedImageMap((prev) => (prev[src] ? prev : { ...prev, [src]: true }));
  }, []);
  const isImageLoaded = (src: string) => Boolean(loadedImageMap[src]);
  const productShowcase = useMemo(
    () =>
      [
        {
          src: "/product-showcase/service-cloud.png",
          titleTh: "บริการคลาวด์และโฮสติ้ง",
          titleEn: "Cloud and Hosting Service",
          altTh: "บริการคลาวด์เซิร์ฟเวอร์และโฮสติ้งสำหรับธุรกิจ",
          altEn: "Cloud server and hosting service artwork",
        },
        {
          src: "/product-showcase/service-hotel-booking.png",
          titleTh: "ระบบจองที่พัก",
          titleEn: "Hotel and Resort Booking System",
          altTh: "ระบบจองที่พักสำหรับหอพัก โรงแรม และรีสอร์ท",
          altEn: "Hotel and resort booking system artwork",
        },
        {
          src: "/product-showcase/service-payment-api.png",
          titleTh: "ระบบชำระเงิน Payment API",
          titleEn: "Payment API",
          altTh: "ระบบชำระเงินและเชื่อมต่อ Payment API",
          altEn: "Payment API service artwork",
        },
        {
          src: "/product-showcase/service-business-system.png",
          titleTh: "ระบบจัดการธุรกิจ",
          titleEn: "Business Management System",
          altTh: "ระบบจัดการธุรกิจสำหรับงานบริหารทั่วไป",
          altEn: "Business management system artwork",
        },
        {
          src: "/product-showcase/service-pos.png",
          titleTh: "บริการระบบขายหน้าร้าน",
          titleEn: "POS Sales System",
          altTh: "บริการระบบขายหน้าร้านและเครื่อง POS",
          altEn: "POS sales system service artwork",
        },
        {
          src: "/product-showcase/service-website.png",
          titleTh: "บริการออกแบบเว็บไซต์",
          titleEn: "Website Design Service",
          altTh: "บริการออกแบบเว็บไซต์สำหรับองค์กรและร้านค้าทั่วไป",
          altEn: "Website design service artwork",
        },
      ] as const,
    []
  );
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
      ? "text-xs font-semibold text-slate-600"
      : "text-xs uppercase tracking-[0.3em] text-slate-600";

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroProductSlideIndex((current) => (current + 1) % heroProductSlides.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveProductIndex((current) => (current + 1) % productShowcase.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [productShowcase.length]);

  useEffect(() => {
    const node = serviceStatsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setServiceStatsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setServiceStatsCount({ groups: 0, support: 0 });
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = c20LiteRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setC20LiteVisible(entry.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px", threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!serviceStatsVisible) {
      return;
    }

    let frame = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = window.requestAnimationFrame(() => {
        setServiceStatsCount({ groups: 5, support: 24 });
      });
      return () => window.cancelAnimationFrame(frame);
    }
    const start = performance.now();
    const duration = 520;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setServiceStatsCount({
        groups: Math.round(progress * 5),
        support: Math.round(progress * 24),
      });
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [serviceStatsVisible]);

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
        <section className="relative -mt-[78px] flex min-h-[calc(100svh-12px)] overflow-hidden bg-[#030609] pt-[78px] text-white sm:-mt-[84px] sm:min-h-[calc(100svh-18px)] sm:pt-[84px]">
          <Image
            src="/home-hero/hero-bg-tech-banner.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-95"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,6,16,0.42)_0%,rgba(8,18,34,0.28)_40%,rgba(18,42,72,0.10)_72%,rgba(8,18,32,0)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_66%_48%,rgba(50,143,230,0.16),transparent_44%),radial-gradient(ellipse_at_55%_82%,rgba(37,209,138,0.14),transparent_34%),linear-gradient(180deg,rgba(2,8,18,0.12)_0%,rgba(2,8,18,0)_46%,rgba(2,8,18,0.24)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(8,18,32,0.18))]" />

          <div className="relative mx-auto grid min-h-[calc(100svh-96px)] w-full max-w-7xl items-center gap-8 px-6 py-12 sm:min-h-[calc(100svh-112px)] lg:grid-cols-[0.88fr_1.12fr] lg:px-12 xl:px-4">
            <div className="z-10 max-w-[620px] pt-8 lg:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#20a4ff] sm:text-sm">
                CUTTING POINT TECH
              </p>
              <h1 className="mt-6 font-[var(--font-body)] text-[34px] font-extrabold leading-[1.08] tracking-normal text-white sm:text-[46px] lg:text-[56px]">
                {seoContent.h1}
              </h1>
              <div className="mt-5 h-1 w-32 rounded-full bg-[linear-gradient(90deg,#149bff_0%,#25d18a_58%,#ffd166_100%)] shadow-[0_0_28px_rgba(37,209,138,0.28)]" />
              <p className="mt-6 max-w-xl text-lg font-semibold leading-snug text-white sm:text-xl lg:text-2xl">
                {copy.hero.subtitle}
              </p>
              <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-slate-100 sm:text-base">
                {copy.hero.trust}
              </p>
            </div>

            <div className="relative min-h-[310px] sm:min-h-[410px] lg:min-h-[540px]">
              <div className="hero-light-line absolute inset-x-[8%] bottom-14 h-px bg-gradient-to-r from-transparent via-[#8abfff]/80 to-[#25d18a]/45" />
              <div className="absolute bottom-10 right-[14%] h-px w-[36%] bg-gradient-to-r from-transparent via-[#ffd166]/60 to-transparent" />
              <div className="absolute bottom-7 left-[22%] h-7 w-[56%] rounded-full bg-black/55 blur-2xl" />
              {heroProductSlides.map((slide, index) => {
                const isActive = index === heroProductSlideIndex;
                const isPrevious =
                  index ===
                  (heroProductSlideIndex - 1 + heroProductSlides.length) % heroProductSlides.length;
                return (
                  <div
                    key={slide.src}
                    className={`hero-product-float absolute inset-0 flex items-center justify-center transition duration-1000 ease-out ${
                      isActive
                        ? "z-20 translate-x-0 scale-100 opacity-100"
                        : isPrevious
                          ? "z-10 -translate-x-8 scale-95 opacity-0"
                          : "z-0 translate-x-8 scale-95 opacity-0"
                    }`}
                    aria-hidden={!isActive}
                  >
                    <Image
                      src={slide.src}
                      alt={lang === "th" ? slide.altTh : slide.altEn}
                      width={860}
                      height={720}
                      priority={index === 0}
                      sizes="(min-width: 1024px) 46vw, 88vw"
                      className="hero-product-image max-h-[290px] w-auto max-w-[92%] object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.36)] sm:max-h-[390px] lg:max-h-[520px]"
                    />
                  </div>
                );
              })}
              <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
                {heroProductSlides.map((slide, index) => (
                  <span
                    key={`${slide.src}-dot`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === heroProductSlideIndex ? "w-8 bg-[#0a91ff]" : "w-2 bg-white/35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="seo" className="bg-white py-20 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            {seoContent.sections.slice(0, 1).map((section) => (
              <div key={section.h2} className="space-y-6 text-center">
                <h2 className="font-[var(--font-body)] text-3xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-4xl md:text-[44px]">
                  {section.h2}
                </h2>
                {section.intro.slice(0, 1).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mx-auto max-w-4xl text-lg font-semibold leading-9 tracking-normal text-slate-700 sm:text-xl">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
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
                className="text-sm font-semibold text-slate-700"
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

        <section
          ref={c20LiteRef}
          id="c20-lite-pos"
          data-c20-active={c20LiteVisible ? "true" : "false"}
          className="relative isolate min-h-[520px] overflow-hidden bg-white py-16 sm:min-h-[560px] md:min-h-[620px] md:py-20"
        >
          <Image
            src="/products/c20-lite-bg.png"
            alt=""
            fill
            className="-z-20 object-cover object-center"
            sizes="100vw"
            priority={false}
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.92)_34%,rgba(255,255,255,0.58)_58%,rgba(255,255,255,0.12)_100%)]" />
          <div className="c20-highlight-sweep pointer-events-none absolute inset-y-0 left-[-25%] z-0 w-1/3 bg-gradient-to-r from-transparent via-slate-300/45 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16 bg-gradient-to-b from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-white via-white/75 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-10 bg-gradient-to-r from-white/95 to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-10 bg-gradient-to-l from-white/90 to-transparent sm:w-16" />
          <div className="mx-auto flex min-h-[410px] w-full max-w-[1500px] flex-col justify-center px-6 sm:block sm:px-10 lg:px-16 xl:px-20">
            <div className="relative z-10 max-w-xl pt-4 text-slate-950">
              <h2 className="c20-copy c20-copy-1 font-[var(--font-body)] text-5xl font-extrabold leading-none tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
                C20 Lite
              </h2>
              <p className="c20-copy c20-copy-2 mt-5 max-w-[15ch] font-[var(--font-body)] text-2xl font-extrabold leading-tight tracking-normal text-slate-950 sm:max-w-none sm:text-3xl lg:text-4xl">
                Android Desktop POS <span className="block sm:inline">Terminal</span>
              </p>
              <p className="c20-copy c20-copy-3 mt-6 max-w-[19rem] text-base font-medium leading-8 text-slate-700 sm:max-w-lg sm:text-lg">
                เครื่อง POS พร้อมระบบขาย ที่รองรับรูปแบบขนาดร้านอาหาร สำหรับโต๊ะ และร้านค้าทั่วไป แบบ 2 จอ
              </p>
            </div>
            <div className="pointer-events-none relative z-[1] mx-auto mt-8 w-[64%] max-w-[280px] self-end sm:absolute sm:bottom-[-2%] sm:right-[2%] sm:mt-0 sm:w-[48%] sm:max-w-[560px] lg:right-[8%] lg:w-[36%] xl:right-[10%] xl:w-[34%]">
              <div className="c20-device relative aspect-[1242/1177] w-full">
                <Image
                  src="/products/c20-lite-device-cutout.png"
                  alt="C20 Lite Android Desktop POS Terminal"
                  fill
                  className="object-contain object-bottom"
                  sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 36vw, 64vw"
                  priority={false}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        <section id="main-services" className="relative isolate overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20">
          <Image
            src="/hero-slides/12.jpg"
            alt=""
            fill
            className="-z-10 object-cover opacity-[0.08]"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.86)_45%,rgba(255,255,255,0.97))]" />
          <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className={eyebrowClass}>{lang === "th" ? "ผลิตภัณฑ์และบริการ" : "Products and Services"}</p>
              <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                {lang === "th" ? "โซลูชันที่ต่อยอดได้ตามธุรกิจของคุณ" : "Solutions Built Around Your Business"}
              </h2>
              <p className="mt-3 text-slate-600">
                {lang === "th"
                  ? "เว็บไซต์ ระบบ POS เครื่อง POS ระบบจองที่พัก และระบบบริหารธุรกิจ วางเป็นชุดบริการเดียวที่ขยายต่อได้"
                  : "Websites, POS systems, POS hardware, booking systems, and business tools arranged as a scalable service suite."}
              </p>
            </div>

            <div ref={serviceStatsRef} className="mx-auto flex max-w-5xl items-center justify-center gap-10 border-y border-slate-200/80 bg-white/45 py-7 text-center backdrop-blur-sm md:gap-16">
              <div>
                <p className="font-[var(--font-heading)] text-4xl font-semibold text-slate-950 md:text-5xl">{serviceStatsCount.groups}+</p>
                <p className="mt-2 text-sm text-slate-500">{lang === "th" ? "กลุ่มบริการหลัก" : "Core service groups"}</p>
              </div>
              <div className="h-16 w-px bg-slate-200" />
              <div>
                <p className="font-[var(--font-heading)] text-4xl font-semibold text-slate-950 md:text-5xl">{serviceStatsCount.support}/7</p>
                <p className="mt-2 text-sm text-slate-500">{lang === "th" ? "พร้อมดูแลระบบ" : "Support ready"}</p>
              </div>
            </div>

            <div className="relative mx-auto mt-12 h-[min(96vw,800px)] min-h-[440px] w-full overflow-hidden md:h-[830px]">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
              <div className="product-showcase-stage relative h-full">
                {productShowcase.map((item, index) => {
                  const rawOffset = index - activeProductIndex;
                  const half = productShowcase.length / 2;
                  const offset =
                    rawOffset > half
                      ? rawOffset - productShowcase.length
                      : rawOffset < -half
                        ? rawOffset + productShowcase.length
                        : rawOffset;
                  const distance = Math.abs(offset);
                  const isActive = offset === 0;
                  const isVisible = distance <= 2;
                  const shift = offset * 360;
                  const depth = isActive ? 110 : -distance * 95;
                  const rotate = offset * -16;
                  const scale = isActive ? 1 : 0.82 - Math.min(distance * 0.05, 0.12);
                  const title = lang === "th" ? item.titleTh : item.titleEn;

                  return (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setActiveProductIndex(index)}
                      className={`absolute left-1/2 top-0 flex h-[min(92vw,760px)] w-[min(92vw,760px)] overflow-hidden rounded-[8px] bg-transparent transition duration-700 ${
                        !isVisible
                          ? "pointer-events-none opacity-0"
                          : isActive
                            ? "opacity-100 shadow-[0_28px_80px_rgba(14,116,144,0.18)]"
                            : "opacity-30 shadow-[0_18px_55px_rgba(15,23,42,0.10)] saturate-75"
                      }`}
                      style={{
                        zIndex: 20 - distance,
                        transform: `translateX(calc(-50% + ${shift}px)) translateZ(${depth}px) rotateY(${rotate}deg) scale(${scale})`,
                      }}
                      aria-label={title}
                    >
                      <div className="relative h-full w-full overflow-hidden bg-transparent">
                        {!isImageLoaded(item.src) ? (
                          <div className="absolute inset-0 animate-pulse bg-slate-200/80" />
                        ) : null}
                        <Image
                          src={item.src}
                          alt={lang === "th" ? item.altTh : item.altEn}
                          width={1254}
                          height={1254}
                          className={`h-full w-full object-contain transition duration-700 ${
                            isImageLoaded(item.src) ? "opacity-100" : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : "low"}
                          sizes="(max-width: 768px) 92vw, 760px"
                          onLoad={() => markImageLoaded(item.src)}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        <section id="features" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F7FBFF_42%,#FFFFFF_100%)] py-16 sm:py-20 md:py-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-slate-50/90 via-white/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-20 bg-gradient-to-r from-slate-50/85 to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-20 bg-gradient-to-l from-slate-50/85 to-transparent md:w-32" />
          <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.56fr)] md:items-end">
              <div>
                <p className={eyebrowClass}>{copy.nav.features}</p>
                <h2 className="mt-3 max-w-4xl font-[var(--font-body)] text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-[56px]">
                  {copy.features.title}
                </h2>
                <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700 sm:text-xl">{copy.features.subtitle}</p>
              </div>
              <div className="rounded-[8px] border border-slate-200/90 bg-white/72 px-5 py-4 text-sm font-semibold leading-7 text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur">
                {lang === "th"
                  ? "ยกระดับเว็บไซต์ให้เป็นสินทรัพย์เชิงธุรกิจ"
                  : "Turn your website into a strategic business asset."}
              </div>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5">
              {copy.features.items.map((item, index) => {
                const Icon = featureIcons[index] ?? ShieldCheck;
                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-[8px] border border-slate-200/90 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_28px_80px_rgba(15,23,42,0.13)]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-50/90 to-transparent opacity-80" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.07),transparent_42%,rgba(10,145,255,0.08))] opacity-0 transition group-hover:opacity-100" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#0a91ff] text-white shadow-[0_12px_28px_rgba(10,145,255,0.24)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="relative mt-5 text-lg font-extrabold leading-snug tracking-normal text-slate-950">{item.title}</h3>
                    <p className="relative mt-3 text-sm font-medium leading-7 text-slate-600">{item.description}</p>
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"
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

        <section id="additional" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_48%,#ffffff_100%)] py-20 md:py-24">
          <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#0a91ff]/45 to-transparent" />
          <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-[linear-gradient(135deg,transparent_0%,rgba(10,145,255,0.08)_44%,rgba(37,209,138,0.08)_100%)]" />
          <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10 xl:px-14">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] lg:items-end">
              <div>
                <p className="text-xs font-bold text-[#0a91ff]">
                  {lang === "th" ? "บริการเสริม" : "Add-ons"}
                </p>
                <h2 className="mt-4 max-w-3xl font-[var(--font-body)] text-4xl font-extrabold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-[56px]">
                  {copy.additional.title}
                </h2>
                <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-slate-600">{copy.additional.subtitle}</p>
              </div>
              <div className="rounded-[8px] border border-slate-200/90 bg-white/78 px-5 py-4 text-sm font-semibold leading-7 text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur">
                {lang === "th" ? "ยืดหยุ่นตามแผนและต่อยอดตามการใช้งานจริง" : "Flexible add-ons that scale with real operations"}
              </div>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
              {copy.additional.items.map((item, index) => (
                <div
                  key={item}
                  className="group relative min-h-32 overflow-hidden rounded-[8px] border border-slate-200/90 bg-white/84 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#0a91ff]/35 hover:shadow-[0_28px_80px_rgba(10,145,255,0.12)]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#e8f4ff] to-transparent opacity-80" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#0a91ff] text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(10,145,255,0.22)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="relative mt-5 text-base font-bold leading-7 text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BusinessPartnerSection companyLogoSrc="/brand/business-partner-company-logo-transparent.png" partnerLogoSrc="/brand/business-partner-clexpert-logo-transparent.png" partnerName="CLEXPERT" />

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
              <Link href="/articles" className="text-sm font-semibold text-slate-700">
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
                    className="mt-4 inline-flex text-sm text-slate-700"
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

        .hero-product-float {
          will-change: opacity, transform;
        }

        .hero-product-image {
          animation: hero-product-float 6s ease-in-out infinite;
          will-change: transform;
        }


        @keyframes hero-product-float {
          0%, 100% {
            transform: translateY(0) rotate(-1deg);
          }
          50% {
            transform: translateY(-14px) rotate(1deg);
          }
        }

        .customers-logo-track {
          animation: customers-pan 18s ease-in-out infinite alternate;
          will-change: transform;
        }

        .product-showcase-stage {
          perspective: 1400px;
          transform-style: preserve-3d;
        }


        .c20-copy {
          opacity: 0;
          transform: translateY(24px);
        }

        #c20-lite-pos[data-c20-active="true"] .c20-copy {
          animation: c20-copy-reveal 760ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        #c20-lite-pos[data-c20-active="true"] .c20-copy-2 {
          animation-delay: 120ms;
        }

        #c20-lite-pos[data-c20-active="true"] .c20-copy-3 {
          animation-delay: 220ms;
        }

        .c20-device {
          opacity: 0;
          transform: translateX(42px) scale(0.96);
          filter: drop-shadow(0 24px 42px rgba(15, 23, 42, 0.22));
        }

        #c20-lite-pos[data-c20-active="true"] .c20-device {
          animation: c20-device-pop 880ms cubic-bezier(0.18, 0.9, 0.24, 1) forwards,
            c20-device-float 5.8s ease-in-out 900ms infinite;
        }

        .c20-highlight-sweep {
          opacity: 0;
          transform: skewX(-16deg) translateX(0);
        }

        #c20-lite-pos[data-c20-active="true"] .c20-highlight-sweep {
          animation: c20-sweep 1150ms ease-out forwards;
        }

        @keyframes c20-copy-reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes c20-device-pop {
          0% {
            opacity: 0;
            transform: translateX(42px) scale(0.96);
          }
          68% {
            opacity: 1;
            transform: translateX(-4px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes c20-device-float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.004);
          }
        }

        @keyframes c20-sweep {
          0% {
            opacity: 0;
            transform: skewX(-16deg) translateX(0);
          }
          25% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: skewX(-16deg) translateX(430%);
          }
        }


        @media (max-width: 768px) {
          .customers-logo-track {
            animation-duration: 14s;
          }

          #c20-lite-pos[data-c20-active="true"] .c20-device {
            animation: c20-device-pop 880ms cubic-bezier(0.18, 0.9, 0.24, 1) forwards;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-product-image,
          #c20-lite-pos[data-c20-active="true"] .c20-copy,
          #c20-lite-pos[data-c20-active="true"] .c20-device,
          #c20-lite-pos[data-c20-active="true"] .c20-highlight-sweep {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
