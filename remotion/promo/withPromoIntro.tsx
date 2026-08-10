import React, { type ComponentType } from "react";
import { AbsoluteFill, Sequence } from "remotion";

import { ChatScene } from "../shared/ChatScene";
import type { ChatScript } from "../shared/schedule";
import type { VideoChapter } from "../types";
import { PromoIntro } from "./PromoIntro";
import { DURATION as PROMO_SECONDS } from "./data";
import { TYPE_START } from "./timeline";

export { PROMO_SECONDS };

/** Frames the promo occupies ahead of the conversation. */
export const promoFrames = (fps: number) => Math.round(PROMO_SECONDS * fps);

/**
 * The rail entry for the opener. Without it the first ten seconds of the video
 * would sit under whatever chapter happens to be first, and the rail would
 * describe a conversation that has not started.
 */
export const PROMO_CHAPTER: Omit<VideoChapter, "from"> = {
  id: "meet-twiga",
  title: "Meet Twiga",
  description:
    "Twiga is a teaching assistant that lives inside WhatsApp. Nothing to install.",
};

/**
 * A poster a beat after the closing line finishes typing, so the still under
 * the play button is the finished frame rather than a half typed one.
 */
export const promoPosterFrame = (fps: number) =>
  Math.round((PROMO_SECONDS - 0.6) * fps);

/**
 * Chapters for a script that runs behind the promo: the opener's own entry at
 * frame 0, then every conversation chapter pushed back by the promo's length.
 *
 * `chaptersFrom` pulls a script's first chapter to frame 0 to cover the opening
 * dead air. That is right when the conversation is the whole video and wrong
 * here, so the shift is applied to the raw times and the promo takes frame 0.
 */
export const chaptersWithPromo = (
  chapters: VideoChapter[],
  fps: number,
): VideoChapter[] => {
  const offset = promoFrames(fps);
  return [
    { ...PROMO_CHAPTER, from: 0 },
    ...chapters.map((chapter, index) => ({
      ...chapter,
      // The script's own first chapter was pulled to 0; put it back at the
      // moment the conversation starts, which is where the promo ends.
      from: index === 0 ? offset : chapter.from + offset,
    })),
  ];
};

/** Total frames for a promo plus a conversation. */
export const durationWithPromo = (script: ChatScript) =>
  promoFrames(script.fps) + Math.round(script.duration * script.fps);

/**
 * Bind a script to the engine behind the cinematic opener.
 *
 * The chat scene is premounted through the promo so its hidden measuring pass
 * has finished before it is ever shown. Without that, the conversation would
 * mount at the cut and hold the first frame while it measured, which in the
 * browser player reads as a stall exactly where the video should feel fastest.
 */
export const makeChatSceneWithPromo = (
  script: ChatScript,
): ComponentType<Record<string, unknown>> => {
  const offset = promoFrames(script.fps);

  const Scene: React.FC = () => (
    <AbsoluteFill>
      <Sequence durationInFrames={offset} name="Promo">
        <PromoIntro fadeOut />
      </Sequence>
      <Sequence from={offset} premountFor={offset} name="Conversation">
        <ChatScene script={script} />
      </Sequence>
    </AbsoluteFill>
  );

  Scene.displayName = "ChatSceneWithPromo";
  return Scene as ComponentType<Record<string, unknown>>;
};

/** Where the closing line starts typing. Exported for anyone timing against it. */
export { TYPE_START as PROMO_TYPE_START };
