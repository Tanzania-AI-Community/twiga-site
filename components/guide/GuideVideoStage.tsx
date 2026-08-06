"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import GuideVideoChapters from "./GuideVideoChapters";
import GuideVideoControls from "./GuideVideoControls";
import { useGuideVideo } from "./GuideVideoProvider";
import { guideColumn } from "./layout";

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

  const { video, attachPlayer, frame } = context;

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
          showPoster={frame === 0}
        />
        <GuideVideoControls containerRef={containerRef} />
      </div>

      {/* The rail is xl-only; below that the segments live under the player. */}
      <div className={cn(guideColumn, "mt-6 xl:hidden")}>
        <GuideVideoChapters variant="inline" />
      </div>
    </section>
  );
}
