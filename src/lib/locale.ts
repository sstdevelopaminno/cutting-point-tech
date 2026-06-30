import { cookies, headers } from "next/headers";

export type Locale = "th" | "en" | "lo";

const DEFAULT_LOCALE: Locale = "th";

function getLocaleFromCookie(value?: string): Locale | null {
  if (!value) return null;
  const normalized = value.toLowerCase();
  return normalized === "th" || normalized === "en" || normalized === "lo" ? normalized : null;
}

function getLocaleFromHeader(value: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  const normalized = value.toLowerCase();
  if (normalized.startsWith("lo")) return "lo";
  if (normalized.startsWith("en")) return "en";
  return "th";
}

export async function getRequestedLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const fromCookie = getLocaleFromCookie(cookieLang);
  if (fromCookie) return fromCookie;
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  return getLocaleFromHeader(acceptLanguage);
}
