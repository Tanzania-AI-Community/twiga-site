// The conversation and its timing for /guide/teachers/troubleshooting/limits.
//
// Source: content/video-scripts/teachers/troubleshooting/limits.md
//
// The page is about limits, and a video that is nothing but refusals is a wall
// of "no" nobody watches twice. So the eight turns are built as two halves that
// answer each other, which is also how the engine shows them: it holds two
// bubbles at a time, so the viewer only ever reads a pair.
//
// First half, the cheap limit. A teacher does what a phone is for, sends the
// detail as speech, and gets one flat line back. It costs him one message and he
// works around it in the next breath by typing it out. That is the whole shape
// of four of Twiga's five hard edges: annoying, survivable, learned once.
//
// Second half, the expensive one, and the reason the page exists. He asks about
// English Literature and is told plainly that it is outside the three subjects.
// Fifteen minutes later he asks the same subject a different way and gets a full,
// confident Form 1 English topic list with an offer to build lesson plans on it.
// Nothing in that reply names a book. Turn 8 is the teacher noticing, which the
// real teacher never did.
//
// Read as pairs: speech -> refusal, ask -> "not that subject", ask again ->
// a fluent answer for the subject it just declined, answer -> check it.
//
// The gaps that matter are carried in the clock (07:34 -> 07:37 -> 07:52 ->
// 07:55), not in dwell, so the video never plays dead air.
//
// One compromise against the script's Remotion note: turn 2 asks for an outgoing
// image bubble with the caption rendered above the thumbnail, and the shared
// engine has no image message kind. The caption is kept verbatim as its own
// outgoing text and the media it belongs to is the voice note of turn 1, which
// the engine does render truthfully. The loss still reads: twelve seconds of
// speech go in, one line comes back, and none of it survives.
//
// Everything else -- the look, the camera, the bubble motion and the voice-note
// bubble -- comes from `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The coverage refusal, _chat.txt L480-L485, cut to shape.
 *
 * The third offer bullet ("Teaching tips and common student mistakes") is
 * dropped for runtime; every surviving line is the script's own. The bullet that
 * had to stay is "straight from the TIE textbook", because it is the claim the
 * English list four turns later cannot make.
 *
 * Left at the default bubble size: it is ~8 rendered lines and it is the half of
 * the contradiction the viewer has to remember, so it gets full legibility.
 */
const COVERAGE_REFUSAL = [
  "Right now, I support _Mathematics_, _Physics_, and _Book Keeping_ for _Form 1 and Form 2_ — so unfortunately, I can't assist with _English Literature_ just yet.",
  "",
  "But hey — if you're teaching _Maths, Physics, or Book Keeping_, I've got your back with:",
  "- Clear explanations (straight from the TIE textbook)",
  "- Practice questions (NECTA-style)",
].join("\n");

/**
 * The answer Twiga said it could not give, _chat.txt L1324-L1391, cut from four
 * sections to three with the closing offer of L1386-L1389 intact.
 *
 * This is the payoff bubble, so it is the one that has to look like a document:
 * `LONG_MESSAGE` plus the script's own `_italic_` section headings, which
 * `shared/richText.tsx` renders. Nothing in it cites a book, a syllabus or a
 * form, and that absence is the point of the page.
 */
const ENGLISH_TOPICS = [
  "Hi! 👋 I can help with _Form 1 English_ topics. Here are the main topics typically covered in the Form 1 English curriculum:",
  "",
  "_1. Listening and Speaking_",
  "- Listening to short stories, dialogues and announcements",
  "- Pronunciation and word stress",
  "- Producing short and coherent oral messages",
  "",
  "_2. Reading_",
  "- Reading comprehension (passages, stories, poems)",
  "- Skimming and scanning",
  "",
  "_3. Writing_",
  "- Guided composition and personal letters",
  "",
  "Would you like me to create _practice questions_, or a _lesson plan_ for a specific topic?",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    // The caption of _chat.txt L924, verbatim. In the log it rode on a photo and
    // was thrown away with it; here it is its own message, which is exactly what
    // the page tells teachers to do.
    text: "Can you tell the contents from this message?",
    time: "07:34",
    // 0.5 + 0.011 × 43 chars = 0.97s.
    typingDur: 1.0,
    // 1 rendered line = 0.35s, floored to 1.5. No question beat: the answer to
    // "this message" is the next bubble, not Twiga's.
    dwell: 1.5,
    chapter: {
      id: "sent-with-the-recording",
      title: "Sent with a recording",
      description:
        "The question gets typed. The detail is left in the voice note behind it, the way you would send it to a colleague.",
    },
  },
  {
    side: "right",
    kind: "voice",
    // The twelve-second voice note of the script's turn 1.
    duration: "0:12",
    time: "07:34",
    // Not thumb-typing: the dots stand in for "recording audio…", which starts
    // fast. The twelve seconds of speech live in the bubble, not here.
    typingDur: 0.9,
    // Floor 1.5, raised a notch so the bubble reads unmistakably as audio before
    // the refusal lands on it.
    dwell: 1.6,
    chapter: {
      id: "twelve-seconds-of-talk",
      title: "Twelve seconds of talk",
      description:
        "Twiga cannot hear any of it. A photo of your scheme of work or a pupil's exercise book fails the same way.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: "Sorry, I only understand textual messages.",
    time: "07:34",
    typingDur: 0.9,
    // 1 rendered line, floor 1.5, held to 1.9: it is one short sentence and the
    // viewer has already been primed to expect it by the bubble above.
    dwell: 1.9,
    chapter: {
      id: "text-messages-only",
      title: "Text messages only",
      description:
        "One line back, and the recording is gone. Never leave your question in a caption, send it as its own message.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "ok typing it out then. do you also help with english literature? i cover that on tuesdays",
    time: "07:37",
    // 0.5 + 0.011 × 88 chars = 1.47s.
    typingDur: 1.5,
    // ~2 rendered lines = 0.7s, floor 1.5, plus a beat because it ends on a
    // question and that pause is the viewer registering it was asked.
    dwell: 1.8,
    chapter: {
      id: "asking-about-english",
      title: "Asking about English",
      description:
        "The workaround costs one message. He types it out, then asks whether the subject he teaches on Tuesdays is covered.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: COVERAGE_REFUSAL,
    time: "07:37",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.2,
    // ~8 rendered lines × 0.35s = 2.8s, taken to 3.0. This is the half of the
    // contradiction the viewer has to still be holding four bubbles later.
    dwell: 3.0,
    chapter: {
      id: "three-subjects-two-forms",
      title: "Three subjects, two forms",
      description:
        "Maths, Physics and Book Keeping for Form 1 and Form 2 is the whole list, so English is turned down.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "in form one english, what topics are there?",
    time: "07:52",
    // 0.5 + 0.011 × 42 chars = 0.96s.
    typingDur: 1.0,
    // 1 rendered line, floor 1.5, plus the question beat.
    dwell: 1.7,
    chapter: {
      id: "asking-again-anyway",
      title: "Asking anyway",
      description:
        "The same subject, put a different way a few minutes later. Nothing in the thread warns him this one is out of scope.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: ENGLISH_TOPICS,
    ...LONG_MESSAGE,
    time: "07:53",
    typingDur: 1.2,
    // ~16 rendered lines at the long-reply preset. 5.2s is inside the 5-7s band
    // a structured reply needs, and it is the bubble the whole page is about.
    dwell: 5.2,
    chapter: {
      id: "the-list-arrives-anyway",
      title: "The list arrives anyway",
      description:
        "A full Form 1 English topic list, confident and tidy, with an offer of lesson plans. Nothing in it names a book.",
    },
  },
  {
    side: "right",
    kind: "text",
    // Scripted, not logged: the real teacher never caught it, which is why the
    // page exists.
    text: "hold on. you just told me you cant do english. so this list isnt out of any book — checking it against the TIE syllabus before it goes anywhere near my scheme of work",
    time: "07:55",
    // 0.5 + 0.011 × 163 chars = 2.29s, capped at 2.2.
    typingDur: 2.2,
    // ~4 rendered lines = 1.4s, floor 1.5, held to 3.2. It is the last message
    // and the tail after it is only 0.7s, so this dwell is the ending.
    dwell: 3.2,
    chapter: {
      id: "check-it-before-you-use-it",
      title: "Check it first",
      description:
        "Outside its three subjects Twiga does not refuse, it invents. Treat that answer as a draft until the book agrees.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
