"use client";

import { useEffect, useRef, useState } from "react";
import { ListVideo } from "lucide-react";

import { cn } from "@/lib/utils";
import { chapterEnd, formatFrames, type GuideVideo } from "@/remotion/types";
import { useGuideVideo } from "./GuideVideoProvider";

/** Estimated row height, used only until the real rows can be measured. */
const WHEEL_ROW = 78;
/** Rows visible in the wheel at once — the active one plus a neighbour each side. */
const WHEEL_ROWS = 3;

type ChapterListProps = {
  video: GuideVideo;
  activeChapterId: string;
  seekToChapter: (chapterId: string) => void;
  subscribeFrame: (listener: (frame: number) => void) => () => void;
};

/**
 * The follow-along list: one entry per video segment, tracking playback and
 * seeking on click. Replaces the table of contents on pages that have a
 * video — the video is the spine of those pages, so it is what you navigate.
 *
 * `rail` is the sticky right column, where the whole list fits at once.
 * `inline` is for screens with no room for that column: there it becomes a
 * three-row wheel centred on the segment playing, like a lyrics view.
 */
export default function GuideVideoChapters({
  variant = "rail",
}: {
  variant?: "rail" | "inline";
}) {
  const context = useGuideVideo();
  if (!context) return null;

  const { video, activeChapterId, seekToChapter, subscribeFrame } = context;
  const props = { video, activeChapterId, seekToChapter, subscribeFrame };

  if (variant === "inline") {
    // No card around it — the rows fade out at both edges instead, so the
    // wheel reads as part of the page rather than a box sat on top of it.
    return (
      <div>
        <Heading />
        <ChapterWheel {...props} />
      </div>
    );
  }

  return (
    <div className="pl-2">
      <Heading />
      <ChapterRail {...props} />
    </div>
  );
}

function Heading() {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-twiga-text-light">
      <ListVideo className="size-3.5" strokeWidth={2} />
      Follow along
    </p>
  );
}

/** Full list — every segment visible, the active one accented. */
function ChapterRail({
  video,
  activeChapterId,
  seekToChapter,
  subscribeFrame,
}: ChapterListProps) {
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Written straight to the DOM — see subscribeFrame in the provider.
  useEffect(
    () =>
      subscribeFrame((frame) => {
        video.chapters.forEach((chapter, index) => {
          const fill = fillRefs.current[index];
          if (!fill) return;
          const span = Math.max(chapterEnd(video, index) - chapter.from, 1);
          const progress = Math.min(
            Math.max((frame - chapter.from) / span, 0),
            1,
          );
          fill.style.width = `${progress * 100}%`;
        });
      }),
    [subscribeFrame, video],
  );

  return (
    // No shared spine: chapters are flat, so each one is its own block and
    // the active block carries the accent bar.
    <ol className="space-y-1.5">
      {video.chapters.map((chapter, index) => {
        const isActive = chapter.id === activeChapterId;

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
                  ref={(node) => {
                    fillRefs.current[index] = node;
                  }}
                  className="block h-full w-0 rounded-full bg-twiga-amber"
                />
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Three rows at a time, centred on the segment playing: the active row is
 * full size, its neighbours shrink back and fade, and the list slides as
 * playback moves on.
 *
 * Rows size to their own copy rather than to a fixed height, so a
 * description that wraps to three lines on a narrow screen is not clipped.
 * That means the slide distance and the window height have to be measured —
 * `WHEEL_ROW` is only the estimate used for the first paint.
 */
function ChapterWheel({
  video,
  activeChapterId,
  seekToChapter,
}: ChapterListProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const rows = () => Array.from(list.children) as HTMLElement[];
    const measure = () => {
      const next = rows().map((row) => row.offsetHeight);
      setHeights((previous) =>
        previous.length === next.length &&
        previous.every((value, index) => value === next[index])
          ? previous
          : next,
      );
    };

    measure();
    // Rows reflow when the column narrows, not only when chapters change.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    rows().forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [video.id]);

  const activeIndex = Math.max(
    0,
    video.chapters.findIndex((chapter) => chapter.id === activeChapterId),
  );
  // Centre the active row, but never scroll past either end — otherwise the
  // first and last chapters leave an empty slot above or below them.
  const offset = Math.min(
    Math.max(activeIndex - 1, 0),
    Math.max(video.chapters.length - WHEEL_ROWS, 0),
  );

  const measured = heights.length === video.chapters.length;
  const sum = (values: number[]) => values.reduce((total, n) => total + n, 0);
  const slide = measured ? sum(heights.slice(0, offset)) : offset * WHEEL_ROW;
  const windowHeight = measured
    ? sum(heights.slice(offset, offset + WHEEL_ROWS))
    : WHEEL_ROW * WHEEL_ROWS;

  const fade =
    "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        // Only animate once measured, so the correction after first paint
        // does not read as a deliberate resize.
        measured && "transition-[height] duration-500 ease-out",
      )}
      style={{
        height: windowHeight,
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    >
      <ol
        ref={listRef}
        className="transition-transform duration-500 ease-out"
        style={{ transform: `translateY(${-slide}px)` }}
      >
        {video.chapters.map((chapter, index) => {
          const isActive = index === activeIndex;
          const inWindow = index >= offset && index < offset + WHEEL_ROWS;

          return (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => seekToChapter(chapter.id)}
                aria-current={isActive ? "true" : undefined}
                aria-hidden={!inWindow}
                tabIndex={inWindow ? undefined : -1}
                style={{ transform: `scale(${isActive ? 1 : 0.92})` }}
                className={cn(
                  "flex w-full origin-left flex-col py-2.5 pr-2 text-left transition-all duration-500 ease-out",
                  isActive ? "opacity-100" : inWindow ? "opacity-45" : "opacity-0",
                )}
              >
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
                    "mt-0.5 block leading-snug transition-all duration-500",
                    isActive
                      ? "text-[1.0625rem] font-semibold text-twiga-forest"
                      : "text-[0.9375rem] font-medium text-twiga-text-muted",
                  )}
                >
                  {chapter.title}
                </span>
                <span className="mt-1 block text-[0.8125rem] font-light leading-snug text-twiga-text-muted">
                  {chapter.description}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
