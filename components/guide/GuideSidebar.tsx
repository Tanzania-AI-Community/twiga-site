"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, CornerDownLeft, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  getGuideTrack,
  guidePages,
  guideTracks,
  normalizeGuidePath,
  type FlatGuidePage,
} from "@/lib/guide/navigation";

type GuideSidebarProps = {
  /** Called after a link is activated so the mobile drawer can close itself. */
  onNavigate?: () => void;
};

export default function GuideSidebar({ onNavigate }: GuideSidebarProps) {
  const pathname = normalizeGuidePath(usePathname());
  const track = getGuideTrack(pathname) ?? guideTracks[0];
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // Search stays inside the active track so results never cross audiences.
  const results = useMemo<FlatGuidePage[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return guidePages
      .filter((page) => page.track === track.slug)
      .filter((page) =>
        `${page.title} ${page.section} ${page.summary ?? ""}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 12);
  }, [query, track.slug]);

  const searching = query.trim().length > 0;

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 space-y-3 bg-twiga-cream/95 px-4 pb-3 pt-4 backdrop-blur-sm lg:px-5">
        <div
          role="tablist"
          aria-label="Guide track"
          className="flex gap-1 rounded-md border border-twiga-cream-dark bg-white/60 p-1"
        >
          {guideTracks.map((entry) => {
            const isActive = entry.slug === track.slug;
            return (
              <Link
                key={entry.slug}
                href={entry.href}
                role="tab"
                aria-selected={isActive}
                onClick={onNavigate}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[0.8125rem] font-semibold transition-colors",
                  isActive
                    ? "bg-twiga-forest text-twiga-cream"
                    : "text-twiga-text-muted hover:bg-twiga-cream-mid hover:text-twiga-forest",
                )}
              >
                <entry.icon className="size-3.5 shrink-0" strokeWidth={2} />
                {entry.shortTitle}
              </Link>
            );
          })}
        </div>

        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-twiga-text-light"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${track.shortTitle.toLowerCase()} docs`}
            aria-label={`Search the ${track.title} guide`}
            className="h-10 w-full rounded-md border border-twiga-cream-dark bg-white/70 pl-9 pr-9 text-sm text-twiga-text placeholder:text-twiga-text-light focus:border-twiga-forest-light focus:outline-none focus:ring-2 focus:ring-twiga-forest-light/20"
          />
          {searching ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-twiga-text-light transition-colors hover:bg-twiga-cream-mid hover:text-twiga-forest"
            >
              <X className="size-3.5" strokeWidth={2} />
            </button>
          ) : null}
        </div>
      </div>

      <nav
        aria-label={`${track.title} guide`}
        className="flex-1 overflow-y-auto overscroll-contain px-3 pb-10 lg:px-4"
      >
        {searching ? (
          <SearchResults
            results={results}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ) : (
          <ul className="space-y-1">
            {track.sections.map((section) => {
              const key = `${track.slug}:${section.title}`;
              const isCollapsed = collapsed[key] ?? false;
              const hasActive = section.items.some(
                (item) => item.href === pathname,
              );

              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() =>
                      setCollapsed((prev) => ({ ...prev, [key]: !isCollapsed }))
                    }
                    aria-expanded={!isCollapsed}
                    className="group flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-twiga-cream-mid"
                  >
                    <section.icon
                      className={cn(
                        "size-4 shrink-0 transition-colors",
                        hasActive
                          ? "text-twiga-red-dark"
                          : "text-twiga-forest-light",
                      )}
                      strokeWidth={1.75}
                    />
                    <span className="flex-1 text-[0.8125rem] font-semibold uppercase tracking-wide text-twiga-forest">
                      {section.title}
                    </span>
                    <ChevronRight
                      className={cn(
                        "size-3.5 shrink-0 text-twiga-text-light transition-transform duration-200",
                        !isCollapsed && "rotate-90",
                      )}
                      strokeWidth={2.25}
                    />
                  </button>

                  {!isCollapsed ? (
                    <ul className="ml-[1.0625rem] mt-0.5 border-l border-twiga-cream-dark pl-2.5">
                      {section.items.map((item) => {
                        const isActive = item.href === pathname;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={onNavigate}
                              aria-current={isActive ? "page" : undefined}
                              className={cn(
                                "relative -ml-[calc(0.625rem+1px)] flex items-center gap-2 border-l-2 py-1.5 pl-3 pr-2 text-sm transition-colors",
                                isActive
                                  ? "border-twiga-red font-semibold text-twiga-forest"
                                  : "border-transparent font-light text-twiga-text-muted hover:border-twiga-forest-light hover:text-twiga-forest",
                              )}
                            >
                              <span className="min-w-0 flex-1 truncate">
                                {item.title}
                              </span>
                              {item.badge ? (
                                <span className="shrink-0 rounded-full bg-twiga-forest-pale px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-twiga-forest-mid">
                                  {item.badge}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </div>
  );
}

function SearchResults({
  results,
  pathname,
  onNavigate,
}: {
  results: FlatGuidePage[];
  pathname: string;
  onNavigate?: () => void;
}) {
  if (results.length === 0) {
    return (
      <p className="px-3 py-6 text-sm font-light leading-relaxed text-twiga-text-muted">
        No pages matched that search in this track. Try a shorter phrase, or
        switch tracks above.
      </p>
    );
  }

  return (
    <ul className="space-y-1 pt-1">
      {results.map((page) => (
        <li key={page.href}>
          <Link
            href={page.href}
            onClick={onNavigate}
            aria-current={page.href === pathname ? "page" : undefined}
            className="group block rounded-md px-2.5 py-2 transition-colors hover:bg-white"
          >
            <span className="flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-twiga-forest">
                {page.title}
              </span>
              <CornerDownLeft
                className="size-3.5 shrink-0 text-twiga-text-light opacity-0 transition-opacity group-hover:opacity-100"
                strokeWidth={2}
              />
            </span>
            <span className="mt-0.5 block truncate text-xs font-light text-twiga-text-muted">
              {page.section}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
