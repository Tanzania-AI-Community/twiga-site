import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaMockExamsVideo: GuideVideo = {
  id: "TwigaMockExams",
  title: "Full NECTA mock exams",
  routes: ["/guide/teachers/assessment/mock-exams"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Index 5 is the marking scheme landing, which is the only stretch of the
  // video with both PDFs on screen at once. That pair is the payoff of the
  // page: two files, in order, and you need both.
  posterFrame: posterFrame(SCRIPT, 5),
  whatsappCta: {
    label: "Generate a mock exam and marking scheme",
    message:
      "please create a NECTA style final exam for my form 1 students for their year end",
  },
  component: makeChatScene(SCRIPT),
};
