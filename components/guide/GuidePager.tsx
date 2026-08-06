"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getGuidePager } from "@/lib/guide/navigation";

export default function GuidePager() {
  const { previous, next } = getGuidePager(usePathname());

  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Guide pagination"
      className="mt-14 grid gap-3 border-t border-twiga-cream-dark pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="group flex flex-col gap-1 rounded-xl border border-twiga-cream-dark px-4 py-3.5 transition-colors hover:border-twiga-forest-light hover:bg-twiga-forest-pale/50"
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-twiga-text-light">
            <ArrowLeft className="size-3.5" strokeWidth={2} />
            Previous
          </span>
          <span className="font-sans text-[0.95rem] font-medium text-twiga-forest">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-xl border border-twiga-cream-dark px-4 py-3.5 text-right transition-colors hover:border-twiga-forest-light hover:bg-twiga-forest-pale/50 sm:col-start-2"
        >
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-twiga-text-light">
            Next
            <ArrowRight className="size-3.5" strokeWidth={2} />
          </span>
          <span className="font-sans text-[0.95rem] font-medium text-twiga-forest">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
