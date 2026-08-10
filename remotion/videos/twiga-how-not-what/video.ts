import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaHowNotWhatVideo: GuideVideo = {
  id: "TwigaHowNotWhat",
  title: "Ask how to teach it, not what it is",
  routes: ["/guide/teachers/teaching-practice/how-not-what"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Message 3, not the default 1: the payoff is the second answer, not the
  // first. A beat after it lands the frame holds the reframed ask above the
  // words it produced, which is the whole comparison in one still.
  posterFrame: posterFrame(SCRIPT, 3),
  whatsappCta: {
    label: "Ask for words you can say",
    // The script's CTA block: the turn that reframes the topic as a teaching
    // move, so the button sends the move the video is teaching rather than the
    // syllabus request it opens with.
    message:
      "one of my students just asked why we even need fractions in real life. how do i answer that without sounding like a robot?",
  },
  component: makeChatScene(SCRIPT),
};
