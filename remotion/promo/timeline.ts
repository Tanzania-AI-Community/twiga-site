// Landscape promo-intro timeline. The phase choreography lives in
// LogoIntroLandscape.tsx (reveal → enlarge → morph → badge). This carries the
// scene length, the hand-off/ending windows and the loop-fade.
import { DURATION } from "./data";

export const D = DURATION;

// Hand-off: the Twiga badge hops off the icon's corner and melts INTO the
// WhatsApp icon — occlusion doing the work, with a shrink/soften/dissolve on the
// sliver that's still showing so it reads as absorbed rather than clipped.
// "Twiga just messaged you on WhatsApp", then it's gone. Unlike the 9:16 promo
// the icon does NOT morph into a chat bubble here: WhatsApp is what's left.
export const HANDOFF = { start: 4.6, dur: 1.1 };

// The moment the last of the badge is inside. The icon reacts here: a soft
// scale swell, a green bloom and one ring pushing outwards — the app "taking"
// the message. Derived from the HOP/dive geometry in LogoIntroLandscape.
export const ABSORB = 5.35;

// Reframe for the ending: the icon rises to make room for the closing line.
export const LIFT = { start: 5.85, dur: 1.1 };

// Closing line types itself out under the icon, then the caret blinks a few
// beats and fades so the last frame is a clean poster.
export const TYPE_START = 6.55;
export const CARET_OUT = { start: 9.5, dur: 0.5 };

// Loop fade-in (seconds). No fade-out — the scene ends ON the finished line.
export const FADE_IN = 0.4;
