import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { MESSAGES, SCRIPT } from "./data";

export const twigaRequestingLessonPlanVideo: GuideVideo = {
  id: "TwigaRequestingLessonPlan",
  title: "Requesting a lesson plan",
  routes: ["/guide/teachers/lesson-plans/requesting"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // A beat after the plan lands, while the request that produced it is still on
  // screen beside it — the two together are the point of the page.
  posterFrame: posterFrame(SCRIPT),
  whatsappCta: {
    label: "Request a lesson plan",
    // The opening line verbatim, so the button sends the fully-specified
    // request the viewer just watched being answered.
    message: MESSAGES[0].kind === "text" ? MESSAGES[0].text : "",
  },
  component: makeChatScene(SCRIPT),
};
