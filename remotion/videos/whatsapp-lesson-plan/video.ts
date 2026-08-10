import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { MESSAGES, SCRIPT } from "./data";

export const whatsappLessonPlanVideo: GuideVideo = {
  id: "ChatDemoScene",
  title: "A lesson plan, start to finish",
  // The whole teachers track — this is the fallback for any page without its
  // own video, so it must stay LAST in the registry.
  routes: ["/guide/teachers/**"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // A beat after the lesson-plan card lands, so the still shows the payoff.
  posterFrame: posterFrame(SCRIPT),
  whatsappCta: {
    label: "Create a lesson plan on WhatsApp",
    // The request the video opens with, so the button sends exactly what the
    // viewer just watched being asked.
    message: MESSAGES[0].kind === "text" ? MESSAGES[0].text : "",
  },
  component: makeChatScene(SCRIPT),
};
