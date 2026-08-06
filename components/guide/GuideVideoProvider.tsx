"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PlayerRef } from "@remotion/player";

import { chapterAtFrame, type GuideVideo } from "@/remotion/types";

type GuideVideoValue = {
  video: GuideVideo;
  /** Callback ref handed to the player once it mounts. */
  attachPlayer: (player: PlayerRef | null) => void;
  frame: number;
  isPlaying: boolean;
  isMuted: boolean;
  activeChapterId: string;
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
 */
export default function GuideVideoProvider({
  video,
  children,
}: {
  video?: GuideVideo;
  children: ReactNode;
}) {
  const [player, setPlayer] = useState<PlayerRef | null>(null);
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Must be stable: an unstable callback ref is detached and reattached on
  // every render, which would reset playback continuously.
  const attachPlayer = useCallback((next: PlayerRef | null) => {
    setPlayer(next);
    setFrame(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!player) return;

    const onFrame = ({ detail }: { detail: { frame: number } }) =>
      setFrame(detail.frame);
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
  }, [player]);

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
      frame,
      isPlaying,
      isMuted,
      activeChapterId: chapterAtFrame(video, frame).id,
      seekToChapter,
      seekToFrame,
      togglePlay,
      toggleMute,
    };
  }, [
    video,
    frame,
    isPlaying,
    isMuted,
    attachPlayer,
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
