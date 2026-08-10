import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaTopicExplanationsVideo: GuideVideo = {
  id: "TwigaTopicExplanations",
  title: "Explaining topics from the textbook",
  routes: ["/guide/teachers/teaching-content/topic-explanations"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Message 5: the cited explanation, a beat after it lands. That bubble is the
  // page — the inline markers and the Sources block naming book and chapter —
  // and it is the only frame where the payoff and its defect are both visible.
  posterFrame: posterFrame(SCRIPT, 5),
  whatsappCta: {
    label: "Explain a topic before you teach it",
    // The script's own CTA, not MESSAGES[0]. The video opens on an ask that
    // comes back empty, so prefilling that would send a teacher straight into
    // the gap message. This is the narrowed version the video ends up at, and
    // it is the one that returns a cited answer.
    message: "explain types of maps for form 3 geography",
  },
  component: makeChatScene(SCRIPT),
};
