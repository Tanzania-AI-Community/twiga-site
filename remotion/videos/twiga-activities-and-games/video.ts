import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaActivitiesAndGamesVideo: GuideVideo = {
  id: "TwigaActivitiesAndGames",
  title: "Classroom activities and games",
  routes: ["/guide/teachers/teaching-practice/activities-and-games"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Message 4 (index 3), a beat after it lands: the four games, still sitting
  // under the one-line ask that produced them. That pair is the page — a topic
  // you were going to explain becomes a thing students play, for the price of
  // one message. The default index 1 would poster the practice activity, which
  // is true but is the setup rather than the payoff.
  posterFrame: posterFrame(SCRIPT, 3),
  whatsappCta: {
    label: "Get games for your topic",
    // From the script's CTA block. It is deliberately the two asks folded into
    // one: topic and class constraint from MESSAGES[0], plus the game request
    // from MESSAGES[2]. A teacher pressing this button has already watched the
    // two-step version, so the button skips to the end of it.
    message:
      "form 1 english, producing short and coherent oral messages. make this part into fun short game quizes, interactive and memorable. 40 students and no materials",
  },
  component: makeChatScene(SCRIPT),
};
