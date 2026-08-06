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

import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { getGuideTrack, normalizeGuidePath } from "@/lib/guide/navigation";
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
const HEADER_HEIGHT = "4rem";
const HEADER_HEIGHT_PX = 64;
/** Ignore scroll jitter below this, so the header does not flicker. */
const SCROLL_THRESHOLD = 8;
/** Always keep the header out near the top of the page. */
const REVEAL_ZONE = 96;
/** Sitting still this long also tucks the header away. */
const IDLE_DELAY = 10_000;
/** Anything here counts as the reader still being present. */
const ACTIVITY_EVENTS = [
  "pointermove",
  "pointerdown",
  "keydown",
  "wheel",
  "touchstart",
  "scroll",
  "focusin",
] as const;

export default function GuideShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerTucked, setHeaderTucked] = useState(false);
  const [idle, setIdle] = useState(false);
  const lastScrollY = useRef(0);
  const idleRef = useRef(false);
  /** Set while closing the header's gap, so that scroll is not read as intent. */
  const adjustingScroll = useRef(false);

  // /guide is the track chooser — it renders full width, with no doc chrome.
  const track = getGuideTrack(pathname);
  const isLanding = !track && normalizeGuidePath(pathname) === "/guide";
  const video = findGuideVideo(pathname);

  // Close the drawer and bring the header back whenever navigation happens.
  useEffect(() => {
    setMenuOpen(false);
    setHeaderTucked(false);
    setIdle(false);
    idleRef.current = false;
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  /**
   * Hide the header on the way down and bring it back on the way up, so
   * reading gets the full viewport. The sticky columns follow it through
   * --guide-header-h rather than each tracking scroll themselves.
   */
  useEffect(() => {
    const onScroll = () => {
      if (adjustingScroll.current) return;
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      // Below the threshold this is jitter, and reacting to it would make the
      // header flicker; leaving lastScrollY alone lets small moves accumulate.
      if (Math.abs(delta) < SCROLL_THRESHOLD) return;
      lastScrollY.current = y;
      setHeaderTucked(delta > 0 && y > REVEAL_ZONE);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Reading without touching anything also hands the header's space back;
   * the next sign of life brings it straight back.
   */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const sleepLater = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        idleRef.current = true;
        setIdle(true);
      }, IDLE_DELAY);
    };

    const wake = () => {
      // Guarded so a mouse sweep does not queue a state update per pixel.
      if (idleRef.current) {
        idleRef.current = false;
        setIdle(false);
      }
      sleepLater();
    };

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, wake, { passive: true }),
    );
    sleepLater();

    return () => {
      clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, wake),
      );
    };
  }, []);

  // The drawer sits under the header, so the header has to stay put with it open.
  const headerHidden = (headerTucked || idle) && !menuOpen;

  /**
   * The header is sticky, so it keeps its band of the document even when it
   * slides away. Past that band the empty space is already scrolled off, but
   * at the top of the page it would show as a gap — so close it by scrolling
   * the band out of view, and give it back when the header returns.
   */
  useEffect(() => {
    if (window.scrollY > HEADER_HEIGHT_PX) return;
    const target = headerHidden ? HEADER_HEIGHT_PX : 0;
    if (Math.abs(window.scrollY - target) < 1) return;

    adjustingScroll.current = true;
    window.scrollTo({ top: target, behavior: "smooth" });
    const settled = setTimeout(() => {
      adjustingScroll.current = false;
      lastScrollY.current = window.scrollY;
    }, 600);

    return () => clearTimeout(settled);
  }, [headerHidden]);

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
      className="guide-shell min-h-screen bg-twiga-cream bg-twiga-texture text-twiga-text"
      style={
        {
          "--guide-header-h": headerHidden ? "0rem" : HEADER_HEIGHT,
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
            className={cn(
              "-ml-1 flex size-9 shrink-0 items-center justify-center rounded-lg text-twiga-forest transition-colors hover:bg-twiga-cream-mid lg:hidden",
              isLanding && "hidden",
            )}
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
          <Link
            href="/guide"
            className="hidden rounded-full border border-twiga-cream-dark bg-white/60 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-twiga-text-muted transition-colors hover:border-twiga-forest-light hover:text-twiga-forest sm:inline-block"
          >
            {track ? `Guide · ${track.shortTitle}` : "Guide"}
          </Link>

          <div className="flex-1" />

          <nav className="flex items-center gap-5 sm:gap-6">
            <Link
              href="/"
              className="hidden text-sm font-medium text-twiga-text-muted transition-colors hover:text-twiga-forest sm:inline"
            >
              Home
            </Link>
            <Link
              href="https://github.com/Tanzania-AI-Community/twiga"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-medium text-twiga-text-muted transition-colors hover:text-twiga-forest sm:inline"
            >
              GitHub ↗
            </Link>
            <Link
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-twiga-forest px-3.5 py-2 text-sm font-semibold text-twiga-cream transition-colors hover:bg-twiga-forest-mid sm:px-[18px]"
            >
              Register Free
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
              className="flex size-9 items-center justify-center rounded-lg text-twiga-text-muted transition-colors hover:bg-twiga-cream-mid hover:text-twiga-forest"
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

      {isLanding ? (
        <main className="mx-auto w-full max-w-[64rem] px-5 py-12 sm:px-8 sm:py-16">
          {children}
        </main>
      ) : (
        <GuideVideoProvider video={video}>
          <div className="mx-auto flex max-w-[1600px] items-start">
            {/* Desktop sidebar. Sticks below the header and reclaims that
                space as the header tucks away — driven by top/height rather
                than padding, since the column already sits under the header
                in normal flow. */}
            <aside className="sticky top-[var(--guide-header-h)] hidden h-[calc(100vh-var(--guide-header-h))] w-[17rem] shrink-0 border-r border-twiga-cream-dark transition-[top,height] duration-300 ease-out lg:block">
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
            <aside className="sticky top-[var(--guide-header-h)] hidden h-[calc(100vh-var(--guide-header-h))] w-[17rem] shrink-0 overflow-y-auto pb-10 pr-6 pt-4 transition-[top,height] duration-300 ease-out xl:block">
              {video ? <GuideVideoChapters /> : <GuideToc />}
            </aside>
          </div>
        </GuideVideoProvider>
      )}
    </div>
  );
}
