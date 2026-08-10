"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";
import { chapterEnd, formatFrames } from "@/remotion/types";
import { useGuideVideo } from "./GuideVideoProvider";

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

/**
 * Replaces the player's built-in controls, whose seek bar is a single
 * undividable strip. Here the bar is split one pill per chapter, so the shape
 * of the video — how many segments, how long each runs — is visible before
 * you press play, and matches the follow-along rail beside it.
 *
 * Fullscreen goes through the container rather than the player's own
 * fullscreen, so these controls come along with it.
 */
export default function GuideVideoControls({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const context = useGuideVideo();
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timeRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [containerRef]);

  const subscribeFrame = context?.subscribeFrame;
  const video = context?.video;

  // Paint the fills and the clock straight onto the DOM. These change every
  // frame, and going through React would put them behind the picture.
  useEffect(() => {
    if (!subscribeFrame || !video) return;
    return subscribeFrame((frame) => {
      frameRef.current = frame;

      video.chapters.forEach((chapter, index) => {
        const fill = fillRefs.current[index];
        if (!fill) return;
        const span = Math.max(chapterEnd(video, index) - chapter.from, 1);
        fill.style.width = `${clamp01((frame - chapter.from) / span) * 100}%`;
      });

      if (timeRef.current) {
        timeRef.current.textContent = formatFrames(frame, video.fps);
      }
      trackRef.current?.setAttribute("aria-valuenow", String(frame));
    });
  }, [subscribeFrame, video]);

  const seekToClientX = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect || !context) return;
      const ratio = clamp01((clientX - rect.left) / rect.width);
      context.seekToFrame(ratio * (context.video.durationInFrames - 1));
    },
    [context],
  );

  if (!context || !video) return null;

  const { isPlaying, isMuted, seekToFrame, togglePlay, toggleMute } = context;

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsScrubbing(true);
    seekToClientX(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isScrubbing) seekToClientX(event.clientX);
  };

  const endScrub = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isScrubbing) return;
    setIsScrubbing(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current?.requestFullscreen();
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-twiga-text/70 via-twiga-text/35 to-transparent px-3 pb-2.5 pt-10 sm:px-4">
      {/* One pill per chapter. The track is continuous and the gaps are
          transparent borders drawn inside each pill, so pointer position maps
          linearly onto the timeline with no gap correction. */}
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={video.durationInFrames - 1}
        aria-valuenow={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endScrub}
        onPointerCancel={endScrub}
        onKeyDown={(event) => {
          const frame = frameRef.current;
          if (event.key === "ArrowRight") seekToFrame(frame + video.fps);
          else if (event.key === "ArrowLeft") seekToFrame(frame - video.fps);
          else return;
          event.preventDefault();
        }}
        className="group/track pointer-events-auto flex h-5 w-full cursor-pointer touch-none items-center outline-none"
      >
        {video.chapters.map((chapter, index) => {
          const end = chapterEnd(video, index);
          const span = Math.max(end - chapter.from, 1);
          const isLast = index === video.chapters.length - 1;

          return (
            <span
              key={chapter.id}
              title={chapter.title}
              style={{ width: `${(span / video.durationInFrames) * 100}%` }}
              className={cn(
                "h-[6px] overflow-hidden rounded-full bg-white/35 transition-[height] duration-150 group-hover/track:h-[9px] group-focus-visible/track:h-[9px]",
                !isLast && "border-r-4 border-transparent bg-clip-padding",
              )}
            >
              {/* Width is written by the frame subscription, not rendered. */}
              <span
                ref={(node) => {
                  fillRefs.current[index] = node;
                }}
                className="block h-full w-0 rounded-full bg-twiga-red-light"
              />
            </span>
          );
        })}
      </div>

      <div className="pointer-events-auto mt-1.5 flex items-center gap-1">
        <ControlButton
          onClick={togglePlay}
          label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-4 fill-current" strokeWidth={0} />
          ) : (
            <Play className="ml-px size-4 fill-current" strokeWidth={0} />
          )}
        </ControlButton>

        <ControlButton
          onClick={toggleMute}
          label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="size-4" strokeWidth={2} />
          ) : (
            <Volume2 className="size-4" strokeWidth={2} />
          )}
        </ControlButton>

        <span className="ml-1.5 text-xs font-medium tabular-nums text-white/90">
          <span ref={timeRef}>{formatFrames(0, video.fps)}</span>
          <span className="text-white/50">
            {" / "}
            {formatFrames(video.durationInFrames, video.fps)}
          </span>
        </span>

        <span className="flex-1" />

        <ControlButton
          onClick={toggleFullscreen}
          label={isFullscreen ? "Exit full screen" : "Full screen"}
        >
          {isFullscreen ? (
            <Minimize className="size-4" strokeWidth={2} />
          ) : (
            <Maximize className="size-4" strokeWidth={2} />
          )}
        </ControlButton>
      </div>
    </div>
  );
}

function ControlButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex size-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/15 focus-visible:bg-white/15 focus-visible:outline-none"
    >
      {children}
    </button>
  );
}
