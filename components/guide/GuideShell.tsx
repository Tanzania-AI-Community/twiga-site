"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { getGuideTrack } from "@/lib/guide/navigation";
import { findGuideVideo } from "@/remotion/registry";
import GuideSidebar from "./GuideSidebar";
import GuideToc from "./GuideToc";
import GuideBreadcrumbs from "./GuideBreadcrumbs";
import GuidePager from "./GuidePager";
import GuideVideoProvider from "./GuideVideoProvider";
import GuideVideoStage from "./GuideVideoStage";
import GuideVideoChapters from "./GuideVideoChapters";
import { guideColumn } from "./layout";

/** Header height, and the distance it travels when it hides. */
const HEADER_HEIGHT = "64px";
/**
 * The header only ever hides below this point. It is what keeps the sticky
 * header's band of the document from showing as an empty gap at the top of
 * the page: above the zone the header is always in place, filling it.
 */
const REVEAL_ZONE = 96;
/**
 * Distance the reader has to travel *since reversing direction* before the
 * header responds. Asymmetric on purpose — coming back for the nav should
 * feel immediate, while hiding it should take a deliberate scroll. Anchoring
 * to the reversal point rather than to the last frame is what stops trackpad
 * jitter and rubber-banding from toggling the header.
 */
const HIDE_AFTER = 32;
const SHOW_AFTER = 12;

export default function GuideShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerTucked, setHeaderTucked] = useState(false);
  /** Reveal without the slide — see the reveal-zone branch below. */
  const [snapHeaderBack, setSnapHeaderBack] = useState(false);
  const resetScrollTracking = useRef<() => void>(() => {});

  const track = getGuideTrack(pathname);
  const video = findGuideVideo(pathname);

  /**
   * Hide the header on the way down and bring it back on the way up, so
   * reading gets the full viewport. The sticky columns follow it through
   * --guide-header-h rather than each tracking scroll themselves.
   *
   * Nothing here ever scrolls the page — the reader's scroll position is
   * theirs. The header is only allowed to hide past REVEAL_ZONE, which is
   * what keeps its sticky band from ever showing as a gap at the top.
   */
  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    /** Where the current direction of travel began. */
    let anchorY = lastY;
    let direction = 0;

    const measure = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      if (delta === 0) return;

      const heading = delta > 0 ? 1 : -1;
      // A reversal restarts the count, so the reader has to commit to the new
      // direction before the header moves.
      if (heading !== direction) {
        direction = heading;
        anchorY = lastY;
      }
      lastY = y;

      if (y <= REVEAL_ZONE) {
        anchorY = y;
        // Back at the top, the header's own band of the document is on screen
        // again. Sliding it back in over 300ms would leave that band empty for
        // the length of the slide — visible as a gap after a jump straight to
        // the top — so at this end of the page the header just reappears.
        setSnapHeaderBack(true);
        setHeaderTucked(false);
        return;
      }

      const travelled = y - anchorY;
      if (heading > 0) {
        if (travelled >= HIDE_AFTER) {
          setSnapHeaderBack(false);
          setHeaderTucked(true);
        }
      } else if (-travelled >= SHOW_AFTER) {
        setSnapHeaderBack(false);
        setHeaderTucked(false);
      }
    };

    // Reads are batched into a frame: scroll fires far more often than the
    // header can meaningfully change, and one measurement per paint is enough.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    resetScrollTracking.current = () => {
      lastY = anchorY = window.scrollY;
      direction = 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Every guide page opens on its video, so a new page always starts from the
  // top rather than wherever the last one was left.
  useEffect(() => {
    setMenuOpen(false);
    setHeaderTucked(false);
    setSnapHeaderBack(true);
    window.scrollTo({ top: 0, behavior: "instant" });
    resetScrollTracking.current();
  }, [pathname]);

  // The drawer sits under the header, so the header has to stay put with it open.
  const headerHidden = headerTucked && !menuOpen;

  // Lock the page behind the drawer and allow Escape to dismiss it.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div
      // Not cn(): tailwind-merge reads bg-twiga-texture — a plain CSS class for
      // the paper grain, not a Tailwind colour — as conflicting with
      // bg-twiga-cream and would drop the background colour.
      className={clsx(
        "guide-shell min-h-screen bg-twiga-cream bg-twiga-texture text-twiga-text",
        // Opening the drawer must not slide the header back in — the drawer
        // itself is already animating from the same edge.
        (snapHeaderBack || menuOpen) && "guide-shell--snap",
      )}
      style={
        {
          "--guide-header-h": headerHidden ? "0px" : HEADER_HEIGHT,
        } as CSSProperties
      }
    >
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-twiga-cream-dark bg-twiga-cream/90 backdrop-blur-md transition-transform duration-300 ease-out",
          headerHidden && "-translate-y-full",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open guide navigation"
            aria-expanded={menuOpen}
            className="-ml-1 flex size-9 shrink-0 items-center justify-center rounded-md text-twiga-forest transition-colors hover:bg-twiga-cream-mid lg:hidden"
          >
            <Menu className="size-5" strokeWidth={1.75} />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2.5 text-twiga-forest no-underline"
          >
            <Image
              src="/logos/twiga_icon.png"
              alt="Twiga"
              width={32}
              height={32}
              className="size-8"
              priority
            />
            <span className="font-sans text-xl font-semibold tracking-tight">
              Twiga
            </span>
          </Link>
          {/* Which guide you are in. A label, not a link — there is no track
              chooser to go back to. */}
          {track ? (
            <span className="hidden rounded-full border border-twiga-cream-dark bg-white/60 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-twiga-text-muted sm:inline-block">
              {`Guide · ${track.shortTitle}`}
            </span>
          ) : null}

          <div className="flex-1" />

          <nav className="flex items-center gap-5 sm:gap-6">
            <Link
              href="/"
              className="hidden text-sm font-medium text-twiga-text-muted transition-colors hover:text-twiga-forest sm:inline"
            >
              Home
            </Link>
            <Link
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-twiga-forest px-3.5 py-2 text-sm font-semibold text-twiga-cream transition-colors hover:bg-twiga-forest-mid sm:px-[18px]"
            >
              Chat with Twiga
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          menuOpen ? "visible" : "invisible",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-twiga-text/40 transition-opacity duration-200",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Guide navigation"
          className={cn(
            "absolute inset-y-0 left-0 flex w-[86%] max-w-80 flex-col border-r border-twiga-cream-dark bg-twiga-cream shadow-xl transition-transform duration-200 ease-out",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-twiga-cream-dark px-4">
            <span className="font-sans text-lg font-semibold tracking-tight text-twiga-forest">
              Guide
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close guide navigation"
              className="flex size-9 items-center justify-center rounded-md text-twiga-text-muted transition-colors hover:bg-twiga-cream-mid hover:text-twiga-forest"
            >
              <X className="size-5" strokeWidth={1.75} />
            </button>
          </div>
          <div className="min-h-0 flex-1">
            {menuOpen ? (
              <GuideSidebar onNavigate={() => setMenuOpen(false)} />
            ) : null}
          </div>
        </div>
      </div>

      <GuideVideoProvider video={video}>
        <div className="mx-auto flex max-w-[1600px] items-start">
          {/* Desktop sidebar. Sticks below the header and reclaims that
              space as the header tucks away — driven by top/height rather
              than padding, since the column already sits under the header
              in normal flow. --guide-header-h is a registered property that
              animates on .guide-shell, so top and height interpolate in
              lockstep with the header instead of each running their own
              transition and drifting out of sync with it. */}
          <aside className="sticky top-[var(--guide-header-h)] hidden h-[calc(100vh-var(--guide-header-h))] w-[17rem] shrink-0 border-r border-twiga-cream-dark lg:block">
            <GuideSidebar />
          </aside>

          {/* The video sits flush at the top of <main> and spans its full
              width; the document proper starts below it, in the reading
              column. */}
          <main className="min-w-0 flex-1 border-twiga-cream-dark bg-white xl:border-r">
            <GuideVideoStage />
            <div className={cn(guideColumn, "py-9 sm:py-12")}>
              <GuideBreadcrumbs />
              <article id="guide-article" className="guide-prose">
                {children}
              </article>
              <GuidePager />
            </div>
          </main>

          {/* Video segments where there is a video, page headings otherwise */}
          {/* No horizontal padding: the rail's rows carry their own, so the
              active row's highlight can run the full width of the column
              instead of stopping short of it. */}
          <aside className="sticky top-[var(--guide-header-h)] hidden h-[calc(100vh-var(--guide-header-h))] w-[17rem] shrink-0 overflow-y-auto pb-10 pt-4 xl:block">
            {video ? <GuideVideoChapters /> : <GuideToc />}
          </aside>
        </div>
      </GuideVideoProvider>
    </div>
  );
}
