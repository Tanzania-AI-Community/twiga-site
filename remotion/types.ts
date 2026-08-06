import type { ComponentType } from "react";

/**
 * One segment of a video. Chapters drive the follow-along rail beside the
 * player: a chapter runs from `from` until the next chapter starts (or until
 * the end of the video for the last one).
 */
export type VideoChapter = {
  /** Stable id — also used as the deep-link hash, so keep it kebab-case. */
  id: string;
  title: string;
  /** One or two sentences shown under the title in the rail. */
  description: string;
  /** First frame of this chapter. */
  from: number;
};

/**
 * A programmable guide video. Everything the site needs to render, describe
 * and navigate a video lives in this one object, so adding a video never
 * means touching the guide components.
 */
export type GuideVideo = {
  /** Composition id — also the Remotion Studio entry name. */
  id: string;
  /** Names the video for assistive tech and in Remotion Studio. */
  title: string;
  /**
   * Guide routes this video plays on. An entry ending in `/**` matches that
   * page and everything beneath it, e.g. "/guide/teachers/**".
   */
  routes: string[];
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
  /** Must be ordered by `from`, starting at frame 0. */
  chapters: VideoChapter[];
  /** Frame used as the still shown before playback starts. */
  posterFrame: number;
  component: ComponentType<Record<string, unknown>>;
};

/** Last frame of a chapter (exclusive), i.e. where the next one begins. */
export function chapterEnd(video: GuideVideo, index: number): number {
  return video.chapters[index + 1]?.from ?? video.durationInFrames;
}

/** The chapter playing at `frame`. Falls back to the first chapter. */
export function chapterAtFrame(video: GuideVideo, frame: number): VideoChapter {
  for (let index = video.chapters.length - 1; index >= 0; index--) {
    if (frame >= video.chapters[index].from) return video.chapters[index];
  }
  return video.chapters[0];
}

/** Frame count as `m:ss`, matching the player's own timestamp format. */
export function formatFrames(frame: number, fps: number): string {
  const totalSeconds = Math.floor(frame / fps);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
