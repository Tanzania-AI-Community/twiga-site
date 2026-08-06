"use client";

import { ListVideo } from "lucide-react";

import { cn } from "@/lib/utils";
import { chapterEnd, formatFrames } from "@/remotion/types";
import { useGuideVideo } from "./GuideVideoProvider";

/**
 * The follow-along rail: one entry per video segment, tracking playback and
 * seeking on click. Replaces the table of contents on pages that have a
 * video — the video is the spine of those pages, so it is what you navigate.
 *
 * `rail` is the sticky right column; `inline` is the card shown under the
 * player on screens too narrow for that column.
 */
export default function GuideVideoChapters({
  variant = "rail",
}: {
  variant?: "rail" | "inline";
}) {
  const context = useGuideVideo();
  if (!context) return null;

  const { video, frame, activeChapterId, seekToChapter } = context;

  return (
    <div
      className={cn(
        variant === "rail"
          ? "pl-2"
          : "rounded-xl border border-twiga-cream-dark bg-twiga-cream/60 p-4",
      )}
    >
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-twiga-text-light">
        <ListVideo className="size-3.5" strokeWidth={2} />
        Follow along
      </p>

      {/* No shared spine: chapters are flat, so each one is its own block and
          the active block carries the accent bar. */}
      <ol className="space-y-1.5">
        {video.chapters.map((chapter, index) => {
          const isActive = chapter.id === activeChapterId;
          const end = chapterEnd(video, index);
          const span = Math.max(end - chapter.from, 1);
          const progress = isActive
            ? Math.min(Math.max((frame - chapter.from) / span, 0), 1)
            : 0;

          return (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => seekToChapter(chapter.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative block w-full py-3 pl-4 pr-4 text-left transition-colors",
                  isActive
                    ? "bg-twiga-forest-pale/60"
                    : "hover:bg-twiga-cream-mid/60",
                )}
              >
                {/* A rounded bar standing at the left of a square block —
                    the radius belongs to the accent, not the card. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-1 left-0 w-1 rounded-full transition-colors",
                    isActive
                      ? "bg-twiga-amber"
                      : "bg-transparent group-hover:bg-twiga-forest-light",
                  )}
                />

                {/* tabular-nums keeps the timestamp from jittering as it plays */}
                <span
                  className={cn(
                    "block text-[0.6875rem] font-semibold tabular-nums tracking-wide",
                    isActive ? "text-twiga-amber" : "text-twiga-text-light",
                  )}
                >
                  {formatFrames(chapter.from, video.fps)}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[0.8125rem] leading-snug",
                    isActive
                      ? "font-semibold text-twiga-forest"
                      : "font-medium text-twiga-text-muted",
                  )}
                >
                  {chapter.title}
                </span>
                <span className="mt-1 block text-[0.75rem] font-light leading-snug text-twiga-text-muted">
                  {chapter.description}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "mt-2.5 block h-0.5 overflow-hidden rounded-full bg-twiga-cream-dark transition-opacity",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                >
                  <span
                    className="block h-full rounded-full bg-twiga-amber"
                    style={{ width: `${progress * 100}%` }}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
