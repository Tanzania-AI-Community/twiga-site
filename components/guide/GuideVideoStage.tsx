"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";
import GuideVideoChapters from "./GuideVideoChapters";
import GuideVideoControls from "./GuideVideoControls";
import { useGuideVideo } from "./GuideVideoProvider";

const GuideVideoPlayer = dynamic(() => import("./GuideVideoPlayer"), {
  ssr: false,
  loading: () => <div className="size-full bg-twiga-cream-mid" />,
});

/**
 * The video half of a guide page: a 16:9 player above the written docs, with
 * the segment list folded in underneath on screens that have no right rail.
 * Renders nothing on routes without a video, so the shell can mount it
 * unconditionally.
 */
export default function GuideVideoStage() {
  const context = useGuideVideo();
  const containerRef = useRef<HTMLDivElement>(null);
  if (!context) return null;

  const { video, attachPlayer, isAtStart } = context;

  return (
    <section aria-label={`Video walkthrough: ${video.title}`}>
      {/* Full-bleed: the player takes the whole main column, not the reading
          measure, so there is as much picture as the layout allows. The
          container — not the player — is what goes fullscreen, so the custom
          controls layered on top come with it. */}
      <div
        ref={containerRef}
        className="relative aspect-video w-full overflow-hidden border-b border-twiga-cream-dark bg-twiga-cream-mid [&:fullscreen]:aspect-auto [&:fullscreen]:h-screen [&:fullscreen]:w-screen [&:fullscreen]:border-0 [&:fullscreen]:bg-black"
      >
        <GuideVideoPlayer
          video={video}
          attachPlayer={attachPlayer}
          showPoster={isAtStart}
        />
        <GuideVideoControls containerRef={containerRef} />
      </div>

      {/* Sends the exact request the video demonstrates. The teacher still
          presses send in WhatsApp — this only opens the thread prefilled.
          Full main width rather than the reading column, so it sits against
          the right edge of the video. */}
      <div className="mt-4 flex justify-end px-5 sm:px-8 xl:px-10">
        <Link
          href={whatsappLink(video.whatsappCta.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-twiga-wa-dark py-2.5 pl-4 pr-3.5 text-sm font-semibold text-white shadow-[0_6px_18px_-8px_rgba(18,140,126,0.9)] transition-colors hover:bg-twiga-wa"
        >
          <WhatsAppIcon className="size-[18px]" />
          {video.whatsappCta.label}
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
            strokeWidth={2.2}
          />
        </Link>
      </div>

      {/* The rail is xl-only; below that the segments live under the player,
          across the full width rather than the reading column. */}
      <div className="mt-6 px-5 sm:px-8 xl:hidden">
        <GuideVideoChapters variant="inline" />
      </div>
    </section>
  );
}
