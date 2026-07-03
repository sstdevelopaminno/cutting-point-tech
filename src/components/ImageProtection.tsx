"use client";

import { useEffect } from "react";

function isImageTarget(target: EventTarget | null): target is Element {
  return Boolean(target) && target instanceof Element;
}

export default function ImageProtection() {
  useEffect(() => {
    const IMG_SELECTOR = "img, picture, figure img, [data-protected-image='true']";

    let hardenTimer: number | null = null;
    const hardenImages = () => {
      const images = document.querySelectorAll<HTMLImageElement>("img");
      images.forEach((img) => {
        if (img.draggable) {
          img.draggable = false;
        }
      });
    };
    const scheduleHardenImages = () => {
      if (hardenTimer !== null) {
        return;
      }
      hardenTimer = window.setTimeout(() => {
        hardenTimer = null;
        hardenImages();
      }, 500);
    };

    const onContextMenu = (event: MouseEvent) => {
      if (!isImageTarget(event.target)) return;
      if (!event.target.closest(IMG_SELECTOR)) return;
      event.preventDefault();
    };

    const onDragStart = (event: DragEvent) => {
      if (!isImageTarget(event.target)) return;
      if (!event.target.closest(IMG_SELECTOR)) return;
      event.preventDefault();
    };

    const onCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;
      const anchor = selection.anchorNode;
      if (!anchor) return;
      const element = anchor instanceof Element ? anchor : anchor.parentElement;
      if (!element) return;
      if (element.closest(IMG_SELECTOR)) {
        event.preventDefault();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const modifier = isMac ? event.metaKey : event.ctrlKey;
      if (!modifier) return;

      const key = event.key.toLowerCase();
      // Deter common save/print shortcuts used to export page assets.
      if (key === "s" || key === "p") {
        event.preventDefault();
      }
    };

    scheduleHardenImages();
    const observer = new MutationObserver(() => {
      scheduleHardenImages();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("contextmenu", onContextMenu, { capture: true });
    document.addEventListener("dragstart", onDragStart, { capture: true });
    document.addEventListener("copy", onCopy, { capture: true });
    document.addEventListener("keydown", onKeyDown, { capture: true });

    return () => {
      observer.disconnect();
      if (hardenTimer !== null) {
        window.clearTimeout(hardenTimer);
      }
      document.removeEventListener("contextmenu", onContextMenu, { capture: true });
      document.removeEventListener("dragstart", onDragStart, { capture: true });
      document.removeEventListener("copy", onCopy, { capture: true });
      document.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, []);

  return null;
}
