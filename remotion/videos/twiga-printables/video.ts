import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { MESSAGES, SCRIPT } from "./data";

export const twigaPrintablesVideo: GuideVideo = {
  id: "TwigaPrintables",
  title: "Turning chat text into printables",
  routes: ["/guide/teachers/improvisation/printables"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Message 3 — the six steps that turn chat text into a PDF. That reply is the
  // reason this page exists, so the still shows it rather than the lesson plan.
  posterFrame: posterFrame(SCRIPT, 3),
  whatsappCta: {
    label: "Get a printable version",
    // The request the video opens with, so the button sends exactly what the
    // viewer just watched being asked.
    message: MESSAGES[0].kind === "text" ? MESSAGES[0].text : "",
  },
  component: makeChatScene(SCRIPT),
};
