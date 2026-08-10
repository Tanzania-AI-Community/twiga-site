import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { MESSAGES, SCRIPT } from "./data";

export const twigaChoosingSubjectsVideo: GuideVideo = {
  id: "TwigaChoosingSubjects",
  title: "Choosing your subjects",
  routes: ["/guide/teachers/getting-started/subjects"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // The last message, not the second. Twiga's first reply here is only a menu;
  // the payoff is the read-back, and a beat after it lands the question that
  // produced it ("what subjects am i teaching?") is still on screen beside it.
  // Those two together are the argument of the page: the save is silent, so you
  // ask.
  posterFrame: posterFrame(SCRIPT, MESSAGES.length - 1),
  whatsappCta: {
    label: "Open your subject settings",
    // The opening line verbatim — the bare word, which is the whole point.
    message: MESSAGES[0].kind === "text" ? MESSAGES[0].text : "",
  },
  component: makeChatScene(SCRIPT),
};
