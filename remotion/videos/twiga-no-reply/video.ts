import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { MESSAGES, SCRIPT } from "./data";

export const twigaNoReplyVideo: GuideVideo = {
  id: "TwigaNoReply",
  title: "When Twiga does not reply",
  routes: ["/guide/teachers/troubleshooting/no-reply"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // The last message, a beat after it lands. The sliding window is holding two
  // bubbles at that moment and they are exactly the two the page is about: the
  // teacher's "just write it here, no need to generate the exercise" and the
  // practice activity it produced. The default poster (Twiga's first answer)
  // would be the holding message, which is the problem, not the payoff.
  posterFrame: posterFrame(SCRIPT, MESSAGES.length - 1),
  whatsappCta: {
    label: "Ask for it written inline",
    // The magic sentence with the request folded into it, so a teacher who
    // taps the button has already skipped the tool that breaks.
    message:
      "just write it here, no need to generate the exercise — a practice activity for producing short and coherent oral messages, english form 1",
  },
  component: makeChatScene(SCRIPT),
};
