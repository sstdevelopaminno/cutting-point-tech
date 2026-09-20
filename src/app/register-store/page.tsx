import type { Metadata } from "next";
import RegisterStoreForm from "@/components/RegistrationForm";
import { getRequestedLocale } from "@/lib/locale";

const titles = {
  th: "สมัครใช้งาน CpIPOS · เลือกแพ็กเกจ POS",
  en: "CpIPOS store signup · Select a POS package",
  lo: "ສະໝັກໃຊ້ CpIPOS · ເລືອກແພັກເກດ POS",
} as const;

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestedLocale();
  return {
    title: titles[lang],
    description: "สมัครเปิดร้าน CpIPOS เลือกแพ็กเกจ โหมดขายและทดลองใช้งาน 7 วันหลัง IT อนุมัติ",
    robots: { index: true, follow: true },
  };
}

export default function RegisterStorePage() {
  return <RegisterStoreForm />;
}
