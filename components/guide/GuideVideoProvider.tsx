"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PlayerRef } from "@remotion/player";

import { chapterAtFrame, type GuideVideo } from "@/remotion/types";

type FrameListener = (frame: number) => void;

type GuideVideoValue = {
  video: GuideVideo;
  /** Callback ref handed to the player once it mounts. */
  attachPlayer: (player: PlayerRef | null) => void;
  isPlaying: boolean;
  isMuted: boolean;
  /** True until playback or a scrub moves off frame 0. */
  isAtStart: boolean;
  activeChapterId: string;
  /**
   * Per-frame updates, delivered straight from the player's frameupdate
   * event. Subscribers write to the DOM themselves — routing 30 values a
   * second through React state puts the UI a render behind the picture.
   * The callback fires once on subscribe with the current frame.
   */
  subscribeFrame: (listener: FrameListener) => () => void;
  seekToChapter: (chapterId: string) => void;
  seekToFrame: (frame: number) => void;
  togglePlay: () => void;
  toggleMute: () => void;
};

const GuideVideoContext = createContext<GuideVideoValue | null>(null);

/** Null on pages that have no video — callers render their fallback instead. */
export function useGuideVideo(): GuideVideoValue | null {
  return useContext(GuideVideoContext);
}

/**
 * Holds the playback state shared by the player, its custom control bar and
 * the follow-along rail. The rail lives in a different column of the guide
 * shell from the other two, so the shell owns the provider.
 *
 * State here is deliberately limited to things that change a handful of
 * times across a video — play/pause, mute, which chapter is running. The
 * frame itself is broadcast instead of stored, so nothing re-renders at
 * 30fps and the chapter switch lands on the frame it belongs to.
 */
export default function GuideVideoProvider({
  video,
  children,
}: {
  video?: GuideVideo;
  children: ReactNode;
}) {
  const [player, setPlayer] = useState<PlayerRef | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [activeChapterId, setActiveChapterId] = useState(
    video?.chapters[0]?.id ?? "",
  );

  const frameRef = useRef(0);
  const listeners = useRef(new Set<FrameListener>());

  // Must be stable: an unstable callback ref is detached and reattached on
  // every render, which would reset playback continuously.
  const attachPlayer = useCallback((next: PlayerRef | null) => {
    setPlayer(next);
    setIsPlaying(false);
    setIsAtStart(true);
    frameRef.current = 0;
    listeners.current.forEach((listener) => listener(0));
  }, []);

  const subscribeFrame = useCallback((listener: FrameListener) => {
    listeners.current.add(listener);
    listener(frameRef.current);
    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  useEffect(() => {
    if (!player || !video) return;

    const onFrame = ({ detail }: { detail: { frame: number } }) => {
      const frame = detail.frame;
      frameRef.current = frame;
      listeners.current.forEach((listener) => listener(frame));

      // Both setters bail out when the value is unchanged, so across a whole
      // video this re-renders once per chapter rather than once per frame.
      const chapterId = chapterAtFrame(video, frame).id;
      setActiveChapterId((previous) =>
        previous === chapterId ? previous : chapterId,
      );
      setIsAtStart((previous) => (previous === (frame === 0) ? previous : frame === 0));
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onMuteChange = ({ detail }: { detail: { isMuted: boolean } }) =>
      setIsMuted(detail.isMuted);

    setIsMuted(player.isMuted());

    player.addEventListener("frameupdate", onFrame);
    player.addEventListener("seeked", onFrame);
    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);
    player.addEventListener("ended", onEnded);
    player.addEventListener("mutechange", onMuteChange);

    return () => {
      player.removeEventListener("frameupdate", onFrame);
      player.removeEventListener("seeked", onFrame);
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
      player.removeEventListener("ended", onEnded);
      player.removeEventListener("mutechange", onMuteChange);
    };
  }, [player, video]);

  const seekToFrame = useCallback(
    (next: number) => {
      if (!player || !video) return;
      const last = video.durationInFrames - 1;
      player.seekTo(Math.min(Math.max(Math.round(next), 0), last));
    },
    [player, video],
  );

  const seekToChapter = useCallback(
    (chapterId: string) => {
      const chapter = video?.chapters.find((entry) => entry.id === chapterId);
      if (!chapter || !player) return;
      player.seekTo(chapter.from);
      player.play();
    },
    [player, video],
  );

  const togglePlay = useCallback(() => player?.toggle(), [player]);

  const toggleMute = useCallback(() => {
    if (!player) return;
    if (player.isMuted()) player.unmute();
    else player.mute();
  }, [player]);

  const value = useMemo<GuideVideoValue | null>(() => {
    if (!video) return null;
    return {
      video,
      attachPlayer,
      isPlaying,
      isMuted,
      isAtStart,
      activeChapterId,
      subscribeFrame,
      seekToChapter,
      seekToFrame,
      togglePlay,
      toggleMute,
    };
  }, [
    video,
    isPlaying,
    isMuted,
    isAtStart,
    activeChapterId,
    attachPlayer,
    subscribeFrame,
    seekToChapter,
    seekToFrame,
    togglePlay,
    toggleMute,
  ]);

  return (
    <GuideVideoContext.Provider value={value}>
      {children}
    </GuideVideoContext.Provider>
  );
}
