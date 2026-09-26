import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

type BroadcastRow = {
  id: string;
  enabled: boolean;
  severity: "info" | "warning" | "danger" | "emergency";
  title_th: string;
  title_en: string;
  message_th: string;
  message_en: string;
  action_label_th: string;
  action_label_en: string;
  action_url: string | null;
  bar_color: string;
  text_color: string;
  button_color: string;
  button_text_color: string;
  target_company_web: boolean;
  dismissible: boolean;
  starts_at: string | null;
  ends_at: string | null;
  updated_at: string;
};

const SELECT =
  "id,enabled,severity,title_th,title_en,message_th,message_en,action_label_th,action_label_en,action_url,bar_color,text_color,button_color,button_text_color,target_company_web,dismissible,starts_at,ends_at,updated_at";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const result = await supabase
      .from("platform_emergency_broadcast")
      .select(SELECT)
      .eq("id", "global")
      .maybeSingle<BroadcastRow>();

    if (result.error) throw result.error;

    const row = result.data;
    const now = Date.now();
    const active = Boolean(
      row &&
      row.enabled &&
      row.target_company_web &&
      (!row.starts_at || new Date(row.starts_at).getTime() <= now) &&
      (!row.ends_at || new Date(row.ends_at).getTime() > now)
    );

    const broadcast = active && row
      ? {
          id: row.id,
          severity: row.severity,
          title_th: row.title_th,
          title_en: row.title_en,
          message_th: row.message_th,
          message_en: row.message_en,
          action_label_th: row.action_label_th,
          action_label_en: row.action_label_en,
          action_url: row.action_url,
          bar_color: row.bar_color,
          text_color: row.text_color,
          button_color: row.button_color,
          button_text_color: row.button_text_color,
          dismissible: true,
          starts_at: row.starts_at,
          ends_at: row.ends_at,
          updated_at: row.updated_at,
        }
      : null;

    const response = NextResponse.json({ data: { broadcast }, error: null });
    response.headers.set("cache-control", "public, max-age=15, stale-while-revalidate=30");
    return response;
  } catch (error) {
    console.error("Emergency broadcast read failed:", error);
    const response = NextResponse.json(
      { data: { broadcast: null }, error: null },
      { status: 200 }
    );
    response.headers.set("cache-control", "no-store");
    return response;
  }
}
