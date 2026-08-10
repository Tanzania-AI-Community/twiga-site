import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaMarkingSchemesVideo: GuideVideo = {
  id: "TwigaMarkingSchemes",
  title: "Marking schemes and answer keys",
  routes: ["/guide/teachers/assessment/marking-schemes"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Message 1: the marking scheme itself, a beat after it lands. It is the only
  // frame in the video where "(2 marks)" and the two swapped matching rows are
  // both on screen, which is the whole page in one still.
  posterFrame: posterFrame(SCRIPT, 1),
  whatsappCta: {
    label: "Generate an exam with its marking scheme",
    message:
      "Form 4 Geography, full NECTA-style mock exam covering the whole syllabus",
  },
  component: makeChatScene(SCRIPT),
};
