import type { GuideVideo } from "../../types";
import {
  chaptersFrom,
  durationInFrames,
  makeChatScene,
  posterFrame,
} from "../../shared";
import { MESSAGES, SCRIPT } from "./data";

export const twigaRegistrationVideo: GuideVideo = {
  id: "TwigaRegistration",
  title: "Registering on WhatsApp",
  routes: ["/guide/teachers/getting-started/registration"],
  fps: SCRIPT.fps,
  durationInFrames: durationInFrames(SCRIPT),
  width: 1920,
  height: 1080,
  chapters: chaptersFrom(SCRIPT),
  // Index 4: the class picker, a beat after it lands and while the literal `ok`
  // that summoned it is still on screen above. Choosing your classes is the only
  // decision setup asks a teacher to make, so it is the frame worth showing.
  posterFrame: posterFrame(SCRIPT, 4),
  whatsappCta: {
    label: "Send your first message",
    // Verbatim from the script's CTA block, and the same word the video opens
    // on: the button performs the registration the viewer just watched.
    message: MESSAGES[0].kind === "text" ? MESSAGES[0].text : "",
  },
  component: makeChatScene(SCRIPT),
};
