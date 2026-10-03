import type { Metadata } from "next";
import CpiposPricingCheckout from "@/components/CpiposPricingCheckout";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cuttingpointinnovation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL.replace(/\/+$/, "")),
  title: "ราคาแพ็กเกจ CpiPOS | CUTTING POINT INNOVATION",
  description: "เปรียบเทียบแพ็กเกจ CpiPOS Starter, Growth, Business และ CUSTOM พร้อมซื้อแพ็กเกจด้วยรหัสร้านและ PIN Owner/Manager โดยไม่ต้องล็อกอินเข้า POS",
  alternates: { canonical: "/packages/pos" },
  openGraph: {
    title: "ราคาแพ็กเกจ CpiPOS",
    description: "เลือกแพ็กเกจ CpiPOS ยืนยันรหัสร้านและ PIN Owner/Manager แล้วแนบสลิปส่งให้ฝ่าย IT ตรวจสอบได้จากเว็บไซต์",
    url: SITE_URL.replace(/\/+$/, "") + "/packages/pos",
    type: "website",
  },
};

export default function PosPackagesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <CpiposPricingCheckout />
    </main>
  );
}
