"use client";

import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import { LangProvider, useLang } from "@/components/LangContext";
import Navbar from "@/components/Navbar";
import { getCopy, type Lang } from "@/lib/i18n";

function Chrome({ children }: { children: ReactNode }) {
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

