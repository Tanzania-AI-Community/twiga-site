import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaCheckingAnswersVideo: GuideVideo = {
  id: "TwigaCheckingAnswers",
  title: "Checking Twiga's answers",
  routes: ["/guide/teachers/getting-started/checking-answers"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // A beat after the Trial Balance plan lands, with the request that produced it
  // still beside it. The two later beats are the same lesson told again, so the
  // still that names this page is the first one: a plan that looks entirely
  // correct, ending in a source line from another subject. The Form 3 answer at
  // index 4 makes the same point but needs its Form 1 request on screen to be
  // legible, and by then the request has scrolled off.
  posterFrame: posterFrame(SCRIPT, 1),
  whatsappCta: {
    label: "Check a lesson plan's sources",
    // The script's own CTA block, not the opening line verbatim: the button has
    // to produce an answer the viewer can run the check on, and a tidy request
    // is the one most likely to come back with a Sources block at all.
    message: "Book Keeping Form 2, short lesson plan on Trial Balance",
  },
  component: makeChatScene(SCRIPT),
};
