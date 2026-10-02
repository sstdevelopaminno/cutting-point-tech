"use client";

import { useEffect, useState } from "react";
import { DownloadPlatformCard } from "@/components/downloads/DownloadPlatformCard";

type Platform = "all" | "windows" | "android";

type CardConfig = {
  id: "windows" | "android";
  tone: "windows" | "android";
  icon: "windows" | "android";
  eyebrow: string;
  title: string;
  description: string;
  version: string;
  fileName: string;
  buttonLabel: string;
  noLinkLabel: string;
  href: string | null;
};

type DownloadPlatformSwitcherProps = {
  chooseLabel: string;
  windowsLabel: string;
  androidLabel: string;
  windows: CardConfig;
  android: CardConfig;
};

function platformFromHash(): Platform {
  if (typeof window === "undefined") return "all";
  const hash = window.location.hash.toLowerCase();
  if (hash === "#android") return "android";
  if (hash === "#windows") return "windows";
  return "all";
}

export function DownloadPlatformSwitcher({
  chooseLabel,
  windowsLabel,
  androidLabel,
  windows,
  android,
}: DownloadPlatformSwitcherProps) {
  const [platform, setPlatform] = useState<Platform>("all");

  useEffect(() => {
    const sync = () => setPlatform(platformFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const jumpLinkClass =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-5 text-sm font-extrabold text-white transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300";
  const linkState = (name: Exclude<Platform, "all">) =>
    platform === name
      ? "border-sky-200/60 bg-sky-300/20 ring-1 ring-sky-300/30"
      : "border-white/12 bg-white/[0.08] hover:border-sky-200/50 hover:bg-white/[0.12]";

  return (
    <>
      <nav aria-label={chooseLabel} className="mx-auto mb-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href="#windows"
          aria-current={platform === "windows" ? "page" : undefined}
          className={`${jumpLinkClass} ${linkState("windows")}`}
          onClick={() => setPlatform("windows")}
        >
          <span aria-hidden="true">⊞</span>
          {windowsLabel}
        </a>
        <a
          href="#android"
          aria-current={platform === "android" ? "page" : undefined}
          className={`${jumpLinkClass} ${linkState("android")}`}
          onClick={() => setPlatform("android")}
        >
          <span aria-hidden="true">▣</span>
          {androidLabel}
        </a>
      </nav>

      <div className={`mx-auto grid gap-5 ${platform === "all" ? "max-w-5xl lg:grid-cols-2" : "max-w-3xl"}`}>
        {platform !== "android" ? <DownloadPlatformCard {...windows} /> : null}
        {platform !== "windows" ? <DownloadPlatformCard {...android} /> : null}
      </div>
    </>
  );
}
