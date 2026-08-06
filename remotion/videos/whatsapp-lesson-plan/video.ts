import type { ComponentType } from "react";

import type { GuideVideo, VideoChapter } from "../../types";
import { ChatScene } from "./ChatScene";
import { DURATION, FPS, MESSAGES, SCHEDULE } from "./data";

/**
 * One chapter per message, opening when that message starts being typed. The
 * first chapter is pulled back to frame 0 so the opening beat is covered.
 */
const chapters: VideoChapter[] = MESSAGES.map((message, index) => ({
  ...message.chapter,
  from: index === 0 ? 0 : Math.round(SCHEDULE[index].typingStart * FPS),
}));

export const whatsappLessonPlanVideo: GuideVideo = {
  id: "ChatDemoScene",
  title: "A lesson plan, start to finish",
  // The whole teachers track — introduction page included.
  routes: ["/guide/teachers/**"],
  fps: FPS,
  durationInFrames: Math.round(DURATION * FPS),
  width: 1920,
  height: 1080,
  chapters,
  // A beat after the lesson-plan card lands, so the still shows the payoff.
  posterFrame: Math.round((SCHEDULE[1].bubbleStart + 1) * FPS),
  component: ChatScene as ComponentType<Record<string, unknown>>,
};
