"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type GaPageViewTrackerProps = {
  gaId: string;
};

export default function GaPageViewTracker({ gaId }: GaPageViewTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) {
      return;
    }

    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) {
      return;
    }

    const queryString = searchParams.toString();
    const pagePath = queryString ? `${pathname}?${queryString}` : pathname;

    gtag("config", gaId, {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [gaId, pathname, searchParams]);

  return null;
}
