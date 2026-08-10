import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaFaqVideo: GuideVideo = {
  id: "TwigaFaq",
  title: "Frequently asked questions",
  routes: ["/guide/teachers/getting-started/faq"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Message 1: "there's nothing to install", sitting beside the question that
  // asked for it. The two later beats are a refusal and an error — true, and
  // the point of the page, but a poster of an error bubble reads as a broken
  // player rather than as an answer worth pressing play for.
  posterFrame: posterFrame(SCRIPT, 1),
  whatsappCta: {
    label: "Ask what Twiga can do",
    message: "what can you do for a Form 1 Physics teacher?",
  },
  component: makeChatScene(SCRIPT),
};
