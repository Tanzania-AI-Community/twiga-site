import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaNoMaterialsVideo: GuideVideo = {
  id: "TwigaNoMaterials",
  title: "Teaching with no materials",
  routes: ["/guide/teachers/improvisation/no-materials"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // The payoff is the last message, not the first reply: the poster has to show
  // the strategies standing beside the clause that produced them, because the
  // first reply on its own is the equipment list this page exists to fix.
  posterFrame: posterFrame(SCRIPT, 4),
  whatsappCta: {
    label: "Ask for no-materials strategies",
    message:
      "i'm looking for alternatives on how to explain to students longitudes and latitudes, as right now i dont have any materials to explain to them physically",
  },
  component: makeChatScene(SCRIPT),
};
