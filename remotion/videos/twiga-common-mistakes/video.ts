import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaCommonMistakesVideo: GuideVideo = {
  id: "TwigaCommonMistakes",
  title: "Common mistakes to expect",
  routes: ["/guide/teachers/teaching-practice/common-mistakes"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Message 2 (index 1), a beat after it lands: the named mistake in its quote
  // block, with why the class is confused and how to correct it under it. That
  // reply is the whole reason the page exists, so it is what a teacher sees
  // before they press play. The two targeted questions at the end are the
  // follow-up, not the payoff — poster them and the still shows an answer to a
  // question the viewer has not seen yet.
  posterFrame: posterFrame(SCRIPT, 1),
  whatsappCta: {
    label: "Ask where students go wrong",
    // The script's CTA block, which is also MESSAGES[0] verbatim. Unlike most
    // videos in this track the button and the opening bubble are the same
    // sentence on purpose: the page's goal is that the teacher leaves with one
    // reusable line, so what he watches being typed is exactly what the button
    // sends. Swap the topic, subject and form and it works for any lesson.
    message:
      "before i teach this tomorrow, where do students usually go wrong? trial balance, book keeping form 1",
  },
  component: makeChatScene(SCRIPT),
};
