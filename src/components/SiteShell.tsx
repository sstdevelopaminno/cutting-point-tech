"use client";

import { useEffect, type ReactNode } from "react";
import Footer from "@/components/Footer";
import { LangProvider, useLang } from "@/components/LangContext";
import Navbar from "@/components/Navbar";
import { getCopy, type Lang } from "@/lib/i18n";

function useAutoHideScrollbar() {
  useEffect(() => {
    let hideTimer: number | undefined;
    const root = document.documentElement;

    const showScrollbar = () => {
      root.classList.add("is-scrolling");
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        root.classList.remove("is-scrolling");
      }, 900);
    };

    window.addEventListener("scroll", showScrollbar, { passive: true });
    window.addEventListener("wheel", showScrollbar, { passive: true });
    window.addEventListener("touchmove", showScrollbar, { passive: true });

    return () => {
      window.clearTimeout(hideTimer);
      root.classList.remove("is-scrolling");
      window.removeEventListener("scroll", showScrollbar);
      window.removeEventListener("wheel", showScrollbar);
      window.removeEventListener("touchmove", showScrollbar);
    };
  }, []);
}

function Chrome({ children }: { children: ReactNode }) {
  useAutoHideScrollbar();
  const { lang, toggleLang } = useLang();
  const copy = getCopy(lang);

  return (
    <div className="min-h-screen">
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        labels={copy.nav}
        cta={copy.nav.contact}
      />
      {children}
      <Footer {...copy.footer} />
    </div>
  );
}

export default function SiteShell({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  return (
    <LangProvider initialLang={initialLang}>
      <Chrome>{children}</Chrome>
    </LangProvider>
  );
}
