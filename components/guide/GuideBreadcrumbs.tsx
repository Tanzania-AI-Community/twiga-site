"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { findGuidePage, getGuideTrack, guideRoot } from "@/lib/guide/navigation";

export default function GuideBreadcrumbs() {
  const pathname = usePathname();
  const page = findGuidePage(pathname);
  const track = getGuideTrack(pathname);

  if (!page || !track) return null;

  const isTrackIndex = page.href === track.href;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-twiga-text-light">
        <li>
          <Link
            href={guideRoot}
            className="transition-colors hover:text-twiga-forest"
          >
            Guide
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="size-3" strokeWidth={2.5} />
        </li>
        <li>
          {isTrackIndex ? (
            <span className="text-twiga-forest">{track.shortTitle}</span>
          ) : (
            <Link
              href={track.href}
              className="transition-colors hover:text-twiga-forest"
            >
              {track.shortTitle}
            </Link>
          )}
        </li>
        {isTrackIndex ? null : (
          <>
            <li aria-hidden>
              <ChevronRight className="size-3" strokeWidth={2.5} />
            </li>
            <li className="text-twiga-text-muted">{page.section}</li>
            <li aria-hidden>
              <ChevronRight className="size-3" strokeWidth={2.5} />
            </li>
            <li className="text-twiga-forest">{page.title}</li>
          </>
        )}
      </ol>
    </nav>
  );
}
