"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Same offset the table of contents uses — the sticky guide header. Prose
 * headings also carry `scroll-mt-24` (96px) in globals.css, which covers the
 * browser's own fragment scroll; this constant is for the cases where the
 * browser never gets to do one.
 */
const HEADER_OFFSET = 96;

/**
 * Makes `/guide/...#some-heading` land on the heading.
 *
 * Search results link into the middle of a page, and the article sits behind a
 * Suspense boundary (app/guide/loading.tsx). On a slow connection the router
 * commits the navigation while the fallback is still showing, looks for the
 * fragment, does not find it, and gives up — the prose then streams in with
 * the reader parked at the top. This waits for the heading to exist and
 * scrolls once, and stands down the moment the reader touches the page.
 */
export default function GuideHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let observer: MutationObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const stop = () => {
      if (timer) clearTimeout(timer);
      observer?.disconnect();
      observer = null;
      for (const event of ["wheel", "touchstart", "keydown"] as const) {
        window.removeEventListener(event, stop);
      }
    };

    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
        behavior: "auto",
      });
      stop();
      return true;
    };

    if (scrollToTarget()) return;

    // The reader's scroll position is theirs the instant they ask for it.
    for (const event of ["wheel", "touchstart", "keydown"] as const) {
      window.addEventListener(event, stop, { passive: true });
    }

    observer = new MutationObserver(() => {
      scrollToTarget();
    });
    observer.observe(document.getElementById("guide-article") ?? document.body, {
      childList: true,
      subtree: true,
    });
    // Nothing arrived. Stop watching rather than pounce on a later render.
    timer = setTimeout(stop, 3000);

    return stop;
  }, [pathname]);

  return null;
}
