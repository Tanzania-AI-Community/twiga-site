import type { GuideVideo } from "../../types";
import { chaptersFrom } from "../../shared";
import {
  chaptersWithPromo,
  durationWithPromo,
  makeChatSceneWithPromo,
  promoPosterFrame,
} from "../../promo/withPromoIntro";
import { SCRIPT } from "./data";

export const twigaIntroductionVideo: GuideVideo = {
  id: "TwigaIntroduction",
  title: "Introduction to Twiga",
  // The landing page of the teachers track itself. The `/guide/teachers/**`
  // wildcard belongs to the fallback video, which covers every page below this
  // one — so this entry is the bare route and nothing else.
  routes: ["/guide/teachers"],
  fps: SCRIPT.fps,

  // This one video opens with the cinematic promo: the logo reveal, the
  // hand-off into WhatsApp, and "for teachers, for you." typing itself out.
  // It is the first thing anyone sees of the guide, so it is the one place
  // worth the extra ten seconds. Every other video starts on the conversation.
  durationInFrames: durationWithPromo(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersWithPromo(chaptersFrom(SCRIPT), SCRIPT.fps),

  // The finished closing line, a beat after the last character lands. The
  // conversation's payoff was the old poster and it is still the best frame in
  // the chat, but a still of message four now misrepresents the opening: press
  // play on it and you get a logo, not that bubble. The poster should be the
  // frame the video actually starts from.
  posterFrame: promoPosterFrame(SCRIPT.fps),

  whatsappCta: {
    label: "Say hello to Twiga",
    // A greeting, not a request. Every other video's button sends the turn that
    // video taught, because its reader came for that one thing. This page is the
    // front door: whoever presses this has never messaged Twiga before, and the
    // first thing it does with a new number is register them. Opening with a
    // syllabus question would put a stranger straight into onboarding with a
    // half asked question stuck behind it.
    message: "hi there twiga, i'm new here",
  },
  component: makeChatSceneWithPromo(SCRIPT),
};
