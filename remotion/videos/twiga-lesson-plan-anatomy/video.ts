import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { MESSAGES, SCRIPT } from "./data";

export const twigaLessonPlanAnatomyVideo: GuideVideo = {
  id: "TwigaLessonPlanAnatomy",
  title: "What is in a Twiga lesson plan",
  routes: ["/guide/teachers/lesson-plans/anatomy"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // A beat after the plan itself lands. The page is about a plan's anatomy, so
  // the still that names the page is the block of section headings — the
  // narrative payoff two turns later (the missing section arriving) needs its
  // set-up to make sense and does not stand alone as a thumbnail.
  posterFrame: posterFrame(SCRIPT, 1),
  whatsappCta: {
    label: "Start a lesson plan you can extend",
    // The request the video opens with, so the button sends exactly what the
    // viewer just watched being asked.
    message: MESSAGES[0].kind === "text" ? MESSAGES[0].text : "",
  },
  component: makeChatScene(SCRIPT),
};
