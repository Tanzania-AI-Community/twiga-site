import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaLanguageVideo: GuideVideo = {
  id: "TwigaLanguage",
  title: "Language: English and Kiswahili",
  routes: ["/guide/teachers/troubleshooting/language"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // A beat after the Kiswahili lesson plan lands, with the Kiswahili request
  // still on screen above it. Kiswahili in, Kiswahili out, in one still.
  posterFrame: posterFrame(SCRIPT, 1),
  whatsappCta: {
    // The script's own CTA block was written for the superseded version of this
    // page: it asked for an exam "for their year end", phrased in English on
    // purpose because the video ended on an English-only refusal. That refusal
    // was a bug and is fixed, so the button now sends what this video actually
    // demonstrates — a request in Kiswahili.
    label: "Ask for a lesson plan in Kiswahili",
    // A verbatim clause of MESSAGES[0] (L500), cut to stand on its own as an
    // opening message.
    message:
      "Nipe lesson plan fupi ya somo la trial balance, kiswahili tafadhali",
  },
  component: makeChatScene(SCRIPT),
};
