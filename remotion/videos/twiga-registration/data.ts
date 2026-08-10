// The conversation and its timing for /guide/teachers/getting-started/registration.
//
// Source: content/video-scripts/teachers/getting-started/registration.md
// (itself cut from the WhatsApp log: L2–L3, L6–L14, L16–L18, L20–L23, L938–L941).
//
// The arc is setup as a teacher actually completes it: send one word, wait for
// a human, answer with the literal `ok`, fill in the class picker, get in.
//
// Three edits against the script table, all deliberate:
//
//   * The script's turn 4 (`Start onboarding to Twiga 🦒 / Looks like you are
//     new here`) is dropped. It is a generic Flow preamble that names nothing
//     the teacher has to do. The onboarding step survives in the clock
//     (21:38 → 21:40) and in the class picker's chapter copy.
//
//   * The transcript's "This message can't be displayed here. Please open
//     WhatsApp on your phone to view the message." is dropped, and this page no
//     longer teaches that failure. It is what WhatsApp Web shows in place of an
//     interactive form, so it is a fact about one client rather than about
//     setup, and the guide is read on a phone as often as on a laptop. Building
//     the page's payoff around an error most readers will never see made setup
//     look broken to everyone. The requirement is now stated the positive way
//     on the page itself: the picker opens in the WhatsApp app, so tap it
//     there. Nothing here shows Twiga failing at something it does not fail at.
//
//   * A `ok` turn is added at 21:38. It is the one line the script table skips
//     (its own evidence list runs L14 then L16 — L15 is the teacher's reply),
//     and the page note "`ok` is literal" asks for the exact word to be shown.
//     Without it the form arrives unprompted, which is the opposite of what a
//     teacher needs to learn here. Two lowercase letters; nothing invented
//     about what Twiga does.
//
// The 7h47m approval gap (13:50 → 21:37) is carried entirely by the clock
// labels, per the brief. Nobody watches eight hours of nothing; the jump between
// two bubbles that are on screen together says it in one glance.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, type Message } from "../../shared";


/**
 * The approval notice. `*bold*` and `_italic_` are the transcript's own markers
 * and `shared/richText.tsx` renders them — the italic `ok` is the point of the
 * bubble, so stripping them would cost the beat its emphasis.
 */
const APPROVED = [
  "*You have been approved 🥳*",
  "",
  "Congratulations! We approved your request to use Twiga 🦒, your *artificially intelligent teaching companion*. We support educators teaching the TIE (NECTA) curriculum in Tanzania.",
  "",
  "To get started, please respond to this message with '_ok_'.",
].join("\n");

/** The class picker — the only thing setup actually asks a teacher to choose. */
const CLASS_PICKER = [
  "Select the classes you teach 📚",
  "Select the classes you teach from each of the subjects below",
  "Please follow the instructions.",
].join("\n");

/** The ending: what Twiga is for, and how to reopen the forms later. */
const WELCOME = [
  "Welcome! I'm here to help you with your teaching journey. I'm _Twiga 🦒_, your teaching assistant. I can help you with questions related to the classes you teach, search the content, and generate exercises you can use in your classes.",
  "",
  "To update your personal or subject information, type 'settings' in the chat.",
  "",
  "Let's get started! Just talk to me like a colleague.",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "Hello",
    time: "13:50",
    // 0.5 + 0.011 × 5 chars = 0.56s, raised to the 0.8s thumb-typing floor.
    typingDur: 0.8,
    // 1 rendered line = 0.35s → the 1.5s floor, plus a beat: the viewer has to
    // notice that this one word is the entire sign-up.
    dwell: 1.6,
    chapter: {
      id: "one-word-is-the-signup",
      title: "One word is the sign-up",
      description:
        "No form and no website. The number you message from becomes your account, so whatever you type first signs you up.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: "Thank you for registering! Your account is being reviewed by our team. You'll receive a message once approved. Thank you for your patience!",
    time: "13:50",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.0,
    // 3 rendered lines (measured in the still) × 0.35 = 1.05s → 1.5s floor,
    // then raised so "reviewed by our team" has landed before the clock jumps
    // eight hours in the bubble underneath it.
    dwell: 2.6,
    chapter: {
      id: "a-human-approves-you",
      title: "A human approves you",
      description:
        "A person checks your request. This one took nearly 8 hours, and approval comes as a WhatsApp message, so you can close the chat.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: APPROVED,
    time: "21:37",
    typingDur: 1.2,
    // 1 + 1 + 3 + 1 + 2 = 8 rendered lines × 0.35 = 2.8s, plus a beat because
    // it ends on an instruction the viewer has to read literally.
    dwell: 3.6,
    chapter: {
      id: "approved-hours-later",
      title: "Approved, hours later",
      description:
        "13:50 to 21:37 in one jump, and that gap is normal. Open this chat on your phone app before you reply.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "ok",
    time: "21:38",
    // 0.5 + 0.011 × 2 = 0.52s → 0.8s floor.
    typingDur: 0.8,
    // 1 line → 1.5s floor, plus a beat so the eye can compare it to the word
    // quoted in the bubble above it.
    dwell: 1.6,
    chapter: {
      id: "ok-is-literal",
      title: "ok, exactly that",
      description:
        "Reply with the two letters ok and nothing else. A greeting or a question here goes to normal chat and setup never starts.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: CLASS_PICKER,
    time: "21:40",
    typingDur: 1.1,
    // 1 + 2 + 1 = 4 rendered lines × 0.35 = 1.4s → 1.5s floor, then raised: this
    // is now the last thing the teacher does before they are in, so it is read
    // as a form to fill rather than as a thing about to fail.
    dwell: 3.2,
    chapter: {
      id: "only-your-classes",
      title: "Only your classes",
      description:
        "Tap the picker and choose the classes and subjects you teach. Type settings in the chat to open these forms again later.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: WELCOME,
    time: "21:42",
    typingDur: 1.3,
    // 4 + 1 + 2 + 1 + 1 = 9 rendered lines × 0.35 = 3.15s, taken up to 4.6:
    // this is the ending, the tail behind it is only 0.7s, and it carries the
    // one word (settings) a teacher has to remember months later.
    dwell: 4.6,
    chapter: {
      id: "youre-in",
      title: "You're in",
      description:
        "Send the form and this welcome arrives. Twiga now knows which classes you teach, so you can start asking.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
