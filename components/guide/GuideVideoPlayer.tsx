"use client";

import { Player, Thumbnail, type PlayerRef } from "@remotion/player";
import { Play } from "lucide-react";

import type { GuideVideo } from "@/remotion/types";

/**
 * Thin wrapper around the Remotion player. Split into its own module so the
 * stage can load it with `ssr: false` — the player measures the DOM on mount
 * and has nothing useful to render on the server.
 *
 * `next/dynamic` does not forward refs, so the player ref arrives as a prop.
 */
export default function GuideVideoPlayer({
  video,
  attachPlayer,
  showPoster,
}: {
  video: GuideVideo;
  attachPlayer: (player: PlayerRef | null) => void;
  /** False once the viewer has moved off frame 0, so scrubbing is visible. */
  showPoster: boolean;
}) {
  return (
    <Player
      ref={attachPlayer}
      component={video.component}
      durationInFrames={video.durationInFrames}
      fps={video.fps}
      compositionWidth={video.width}
      compositionHeight={video.height}
      style={{ width: "100%", height: "100%" }}
      // Controls are ours (GuideVideoControls) — the built-in seek bar is one
      // undividable strip and cannot show the chapter segments.
      controls={false}
      clickToPlay
      spaceKeyToPlayOrPause
      moveToBeginningWhenEnded
      acknowledgeRemotionLicense
      // Frame 0 of a looping composition is a blank fade-in, which reads as a
      // broken player. Hold a still from the middle until playback starts.
      showPosterWhenUnplayed={showPoster}
      showPosterWhenEnded={showPoster}
      renderPoster={() => (
        <div className="relative size-full">
          <Thumbnail
            component={video.component}
            frameToDisplay={video.posterFrame}
            durationInFrames={video.durationInFrames}
            fps={video.fps}
            compositionWidth={video.width}
            compositionHeight={video.height}
            style={{ width: "100%", height: "100%" }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-twiga-text/10">
            <span className="flex size-16 items-center justify-center rounded-full bg-twiga-forest/90 text-twiga-cream shadow-lg backdrop-blur-sm">
              <Play className="ml-0.5 size-6 fill-current" strokeWidth={0} />
            </span>
          </div>
        </div>
      )}
      renderLoading={() => (
        <div className="flex size-full items-center justify-center bg-twiga-cream-mid text-sm text-twiga-text-muted">
          Loading video…
        </div>
      )}
    />
  );
}
