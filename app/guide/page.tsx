import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { guideTracks } from "@/lib/guide/navigation";

export const metadata: Metadata = {
  title: "Twiga Guide",
  description:
    "Documentation for Twiga — one track for teachers using it in the classroom, one for developers running the project.",
};

export default function GuideLandingPage() {
  return (
    <>
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-twiga-amber">
          Documentation
        </p>
        <h1 className="font-sans text-[clamp(2rem,3.6vw,2.7rem)] font-semibold leading-tight tracking-tight text-twiga-forest">
          The Twiga guide
        </h1>
        <p className="mt-4 text-[1.05rem] font-normal leading-relaxed text-twiga-text-muted">
          Everything about Twiga in two tracks. Pick the one that matches what
          you are here to do — each is self-contained, so you never have to read
          around the other.
        </p>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {guideTracks.map((track) => (
          <Link
            key={track.slug}
            href={track.href}
            className="group flex flex-col rounded-2xl border-2 border-twiga-cream-dark bg-white px-6 py-7 transition-all hover:-translate-y-0.5 hover:border-twiga-forest-light hover:shadow-[0_4px_30px_rgba(26,61,43,0.08)]"
          >
            <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-twiga-forest-pale text-twiga-forest">
              <track.icon className="size-[22px]" strokeWidth={1.75} />
            </span>
            <span className="flex items-center gap-2 font-sans text-lg font-semibold tracking-tight text-twiga-forest">
              {track.title}
              <ArrowRight
                className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                strokeWidth={2}
              />
            </span>
            <span className="mt-2.5 text-sm font-normal leading-relaxed text-twiga-text-muted">
              {track.tagline}
            </span>

            <span className="mt-6 border-t border-twiga-cream-dark pt-4">
              <span className="mb-2.5 block text-[0.6875rem] font-semibold uppercase tracking-widest text-twiga-text-light">
                Covers
              </span>
              <span className="flex flex-wrap gap-1.5">
                {track.sections.map((section) => (
                  <span
                    key={section.title}
                    className="rounded-full bg-twiga-cream px-2.5 py-1 text-xs font-medium text-twiga-text-muted"
                  >
                    {section.title}
                  </span>
                ))}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm font-normal text-twiga-text-muted">
        Not sure where to start? Teachers should open{" "}
        <Link
          href="/guide/teachers/getting-started/quick-start"
          className="text-twiga-forest-mid underline decoration-twiga-forest-light/40 underline-offset-[3px] hover:decoration-twiga-forest-mid"
        >
          Quick Start
        </Link>
        . If you want to run Twiga yourself, go to{" "}
        <Link
          href="/guide/developers/getting-started/architecture"
          className="text-twiga-forest-mid underline decoration-twiga-forest-light/40 underline-offset-[3px] hover:decoration-twiga-forest-mid"
        >
          Architecture
        </Link>
        .
      </p>
    </>
  );
}
