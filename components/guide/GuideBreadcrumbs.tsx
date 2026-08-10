"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { findGuidePage, getGuideTrack } from "@/lib/guide/navigation";

export default function GuideBreadcrumbs() {
  const pathname = usePathname();
  const page = findGuidePage(pathname);
  const track = getGuideTrack(pathname);

  if (!page || !track) return null;

  // The trail starts at the track, not at /guide — there is no chooser above
  // it to walk back to. On the track's own index that leaves a single crumb
  // repeating the heading right below it, so there is nothing worth showing.
  if (page.href === track.href) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-twiga-text-light">
        <li>
          <Link
            href={track.href}
            className="transition-colors hover:text-twiga-forest"
          >
            {track.title}
          </Link>
        </li>
        <li aria-hidden>
          <ChevronRight className="size-3" strokeWidth={2.5} />
        </li>
        <li className="text-twiga-text-muted">{page.section}</li>
        <li aria-hidden>
          <ChevronRight className="size-3" strokeWidth={2.5} />
        </li>
        <li className="text-twiga-forest">{page.title}</li>
      </ol>
    </nav>
  );
}
