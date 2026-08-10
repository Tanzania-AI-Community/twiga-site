// The conversation and its timing for /guide/teachers/getting-started/faq.
//
// Source: content/video-scripts/teachers/getting-started/faq.md
//
// An FAQ is the hard shape here, because a list of questions is not a
// conversation and the engine holds two messages on screen — a viewer only ever
// sees a pair, so the pairs have to follow each other. The through-line chosen
// is the one the transcript actually contains: a teacher vetting Twiga *for
// somebody else*. He opens with the question you ask before you recommend a
// thing ("do i need to download anything?"), gets an answer that costs nothing
// to repeat in the staff room, then hits the two walls in the order a real
// teacher hits them — he replies by voice, because that is what a phone is for,
// and only after being refused does he type; and the thing he types is a test
// of how much it remembers, which errors and so hands him the support address.
//
// Read as pairs that is: question → answer, habit → refusal, test → failure.
// Each of the page's four staff-room facts lands inside one of those pairs, so
// nothing has to be recited as a list.
//
// The two long silences the page cares about are carried in the clock labels
// (10:19 → 10:20 → 10:22), not in dwell, so the video never plays dead air.
//
// Everything else — the look, the camera, the bubble motion and the voice-note
// bubble — comes from `remotion/shared`.

import { buildScript, type Message } from "../../shared";

/**
 * Twiga's standing introduction, verbatim from the script.
 *
 * Left at the default bubble size rather than spread with `LONG_MESSAGE`: it is
 * ~11 rendered lines, so it fits beside the opening question without the column
 * dollying out, and it is the poster frame — the one still a teacher sees before
 * pressing play. Shrinking it to the long-reply preset would buy nothing and
 * cost the legibility of the sentence the whole page rests on.
 *
 * The `_italic_` markers are the script's own; `shared/richText.tsx` renders
 * them. Every line survives from the script.
 */
const INTRODUCTION = [
  "I'm Twiga, your teaching assistant bot developed by the Tanzania AI Community. Everything happens right here in this chat — there's nothing to install.",
  "",
  "I can:",
  "- Explain concepts from the official TIE textbooks",
  "- Create NECTA-style practice questions",
  "- Provide teaching tips and lesson ideas",
  "",
  "Just tell me the subject and topic — _Book Keeping_, _Mathematics_ or _Physics_, Form 1 and 2. 📚",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "hi. before i tell the other teachers about this — do i need to download anything?",
    time: "10:19",
    // 0.5 + 0.011 × 80 chars = 1.38s.
    typingDur: 1.4,
    // ~2 rendered lines = 0.7s → floored to 1.5, plus a beat because it ends on
    // a question and that pause is the viewer registering it was asked.
    dwell: 2.0,
    chapter: {
      id: "the-staffroom-question",
      title: "The staffroom question",
      description:
        "This is the question you ask before you tell other teachers. There is no account to make and no form to fill.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: INTRODUCTION,
    time: "10:19",
    // Twiga is an AI: fast and constant, whatever the reply length. A long
    // typing indicator would read as a slow bot.
    typingDur: 1.2,
    // ~11 rendered lines × 0.35s = 3.85s, taken up to 4.4 — this is the answer
    // the teacher will repeat to somebody else, so it gets the extra half-beat.
    dwell: 4.4,
    chapter: {
      id: "nothing-to-install",
      title: "Nothing to install",
      description:
        "Everything happens in the WhatsApp thread you already have. There is no fee beyond data charges, and it covers Form 1 and 2.",
    },
  },
  {
    side: "right",
    kind: "voice",
    // The eight-second voice note of _chat.txt L45.
    duration: "0:08",
    time: "10:20",
    // Not thumb-typing — the dots stand in for "recording audio…", which is
    // quick to start. The eight seconds of speech live in the bubble, not here.
    typingDur: 1.0,
    // Floor 1.5, raised to 2.0: the script asks for a visible beat of
    // separation so the refusal that follows reads as a consequence of this.
    dwell: 2.0,
    chapter: {
      id: "answering-by-voice",
      title: "Answering by voice",
      description:
        "Eight seconds of speech, the way you would message a colleague. Nothing warns you that this will not work.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: "Sorry, I only understand textual messages.",
    time: "10:20",
    typingDur: 0.9,
    // 1 rendered line = 0.35s → floor 1.5, held to 2.2: this is one of the four
    // facts a teacher has to be able to repeat, and it is one short line.
    dwell: 2.2,
    chapter: {
      id: "text-messages-only",
      title: "Text messages only",
      description:
        "The voice note is gone, with no transcript. Photos fail too, and any caption you type on them is lost.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "ok, typing. do you remember the first question i've ever asked you?",
    time: "10:22",
    // 0.5 + 0.011 × 67 chars = 1.24s.
    typingDur: 1.2,
    // ~2 rendered lines = 0.7s → floor 1.5, plus the question beat.
    dwell: 1.9,
    chapter: {
      id: "testing-the-memory",
      title: "Testing the memory",
      description:
        "Twiga follows the chat you are in. Your very first message is a much bigger ask.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: "Sorry, something went wrong on my end. Please try again later. If the problem persists, contact support (dev@ai.or.tz).",
    time: "10:22",
    typingDur: 1.0,
    // ~3 rendered lines = 1.05s → floor 1.5, raised to 4.0. It is the last
    // message and the tail after it is only 0.7s, and it carries an email
    // address a viewer may want to copy off the screen.
    dwell: 4.0,
    chapter: {
      id: "where-to-write",
      title: "Where to write",
      description:
        "This error is the only place dev@ai.or.tz appears. Save it, and report the time, your number and the message you sent.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
