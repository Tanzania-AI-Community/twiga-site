import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaYourOwnNotesVideo: GuideVideo = {
  id: "TwigaYourOwnNotes",
  title: "Working from your own notes",
  routes: ["/guide/teachers/improvisation/your-own-notes"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // The fifth message: the games built out of the notes still on screen above
  // them. The default (the second message) would poster the holding bubble, so
  // the still a teacher sees before pressing play would be the failure.
  posterFrame: posterFrame(SCRIPT, 4),
  whatsappCta: {
    label: "Paste your notes and ask for games",
    message:
      "i have these summary notes — [paste the pages you are teaching from]. help me create fun short game quizzes that are interactive and memorable for the students to learn this part",
  },
  component: makeChatScene(SCRIPT),
};
