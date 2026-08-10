import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { SCRIPT } from "./data";

export const twigaFixingProfileVideo: GuideVideo = {
  id: "TwigaFixingProfile",
  title: "Fixing your profile",
  routes: ["/guide/teachers/troubleshooting/profile"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Index 5: a beat after "You are teaching _Geography_" lands, with the
  // verification question that pulled it still on screen above. That pair is
  // the page — the fake confirmation four bubbles back said Computer Science.
  // The still has to show the proof, not the trap.
  posterFrame: posterFrame(SCRIPT, 5),
  whatsappCta: {
    label: "Open the real settings menu",
    // Verbatim from the script's CTA block, and deliberately NOT MESSAGES[0].
    // This video opens on `/settings`, which is the mistake it exists to warn
    // about; prefilling that would hand the teacher the trap. The button sends
    // the bare word, which is turn 7 and the only thing that opens the menu.
    message: "settings",
  },
  component: makeChatScene(SCRIPT),
};
