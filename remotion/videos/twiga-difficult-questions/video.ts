import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaDifficultQuestionsVideo: GuideVideo = {
  id: "TwigaDifficultQuestions",
  title: "Answering difficult student questions",
  routes: ["/guide/teachers/teaching-practice/difficult-questions"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Message 1: the quoted paragraph the teacher can say out loud. That bubble
  // is the page, so it is the still.
  posterFrame: posterFrame(SCRIPT, 1),
  whatsappCta: {
    label: "Ask what to say",
    message:
      "a student asked me why girls where never taught in the early days. what do i respond with? form 2 civics",
  },
  component: makeChatScene(SCRIPT),
};
