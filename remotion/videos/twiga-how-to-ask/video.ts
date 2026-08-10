import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { MESSAGES, SCRIPT } from "./data";

/**
 * The request that satisfies Twiga's checklist — message index 2, not index 0.
 *
 * `MESSAGES[0]` is the bare "i would like to have a practice activity" that the
 * video exists to show failing, so prefilling the WhatsApp button with it would
 * hand the teacher the mistake. The CTA sends the repaired line instead, which
 * is also what the script's CTA block specifies. Read off the message rather
 * than retyped, so the button and the bubble can never drift apart.
 */
const CTA_MESSAGE = MESSAGES[2].kind === "text" ? MESSAGES[2].text : "";

export const twigaHowToAskVideo: GuideVideo = {
  id: "TwigaHowToAsk",
  title: "How to ask Twiga",
  routes: ["/guide/teachers/getting-started/how-to-ask"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // A beat after the fully-specified request lands, while Twiga's checklist is
  // still on screen above it. The list and the one line that answers every item
  // on it, in the same frame, is the whole page — the default (index 1) would
  // poster the checklist beside the ask that stalled, which is the problem
  // rather than the answer.
  posterFrame: posterFrame(SCRIPT, 2),
  whatsappCta: {
    label: "Ask with all five ingredients",
    message: CTA_MESSAGE,
  },
  component: makeChatScene(SCRIPT),
};
