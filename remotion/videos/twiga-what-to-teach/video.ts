import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaWhatToTeachVideo: GuideVideo = {
  id: "TwigaWhatToTeach",
  title: "Finding what to teach",
  routes: ["/guide/teachers/teaching-content/what-to-teach"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // A beat after Twiga's positional answer lands. That bubble — the next topic
  // plus its subtopics — is the payoff of the page, not the ten-item list.
  posterFrame: posterFrame(SCRIPT, 1),
  whatsappCta: {
    label: "Find your next topic",
    // The script's CTA block. It is the video's opening question rewritten as
    // something a stranger can send cold: subject, form, and the topic they
    // just finished.
    message:
      "I teach Form 1 Mathematics. What topic comes after Integers, and what are its subtopics?",
  },
  component: makeChatScene(SCRIPT),
};
