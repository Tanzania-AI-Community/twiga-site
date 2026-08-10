import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaQuizzesAndExercisesVideo: GuideVideo = {
  id: "TwigaQuizzesAndExercises",
  title: "Quizzes, exercises and exit tickets",
  routes: ["/guide/teachers/assessment/quizzes-and-exercises"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Message 3: the exit ticket itself, one second after it lands, with the
  // tired request that produced it still on screen above it. That pairing is
  // the whole page, so it is what the still has to show.
  posterFrame: posterFrame(SCRIPT, 3),
  whatsappCta: {
    label: "Set a 3-question exit ticket",
    message:
      "set me a quick 3 question exit ticket on Newton's First Law for Form 2, mixed difficulty",
  },
  component: makeChatScene(SCRIPT),
};
