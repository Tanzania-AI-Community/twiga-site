import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaLimitsVideo: GuideVideo = {
  id: "TwigaLimits",
  title: "What Twiga cannot do",
  routes: ["/guide/teachers/troubleshooting/limits"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // The last message, a beat after it lands. The payoff of this page is not the
  // English list on its own — a still of that would advertise Twiga answering a
  // question it cannot answer. It is the list *with the teacher catching it*,
  // which is the pair the engine holds on screen at this frame.
  posterFrame: posterFrame(SCRIPT, 7),
  whatsappCta: {
    label: "Ask what Twiga covers",
    // From the script's CTA block. Deliberately not the video's opening line:
    // the opener is a caption attached to a voice note, and prefilling that
    // would send a teacher to WhatsApp to be refused.
    message: "which subjects and forms do you support right now?",
  },
  component: makeChatScene(SCRIPT),
};
