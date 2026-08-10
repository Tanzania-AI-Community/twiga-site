import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaQuickStartVideo: GuideVideo = {
  id: "TwigaQuickStart",
  title: "Quick start",
  routes: ["/guide/teachers/getting-started/quick-start"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // The last message, not the first reply. The payoff of this page is that
  // naming a format changes the shape of the answer, and the only frame that
  // shows it is the one where the request saying "1-line" is still on screen
  // above the single line it produced.
  posterFrame: posterFrame(SCRIPT, 3),
  whatsappCta: {
    label: "Ask what comes next in your syllabus",
    // The script's CTA line rather than the opening message verbatim: it is the
    // same request with the panic taken out, so it still names the form level
    // and the topic, which is the part a teacher should copy.
    message:
      "I have my Form 1 maths class in 15 minutes — what topic comes after integers?",
  },
  component: makeChatScene(SCRIPT),
};
