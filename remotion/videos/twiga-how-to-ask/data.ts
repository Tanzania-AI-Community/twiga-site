// The conversation and its timing for /guide/teachers/getting-started/how-to-ask.
//
// Source: content/video-scripts/teachers/getting-started/how-to-ask.md
//
// This page is the general skill of asking, so the arc is a request failing and
// then being repaired: a bare ask that names nothing, Twiga publishing the list
// it needs, the same teacher answering every item in one lowercase line, the
// usable answer that comes back, and then a short follow-up that works precisely
// because the thread already carries the subject and topic.
//
// The sibling video at videos/twiga-requesting-lesson-plan covers what belongs
// in a lesson-plan request line and is deliberately not repeated: nothing here
// is about lesson plans, the ingredients are named in Twiga's own words rather
// than a page author's, and turns 5–6 make an argument that video does not — a
// follow-up can be short once context exists, but it must still name what it
// wants instead of answering an open offer with "yes".
//
// Honesty note. The real "i would like to have a practice activity" turn
// (chat.txt L1424–L1432) produced eight identical holding messages and then a
// flat refusal. The script replaces that with the clarifying question on
// purpose — Twiga does publish exactly this checklist, three separate times
// (L730–L735, L896–L899, L1040–L1044) — and the holding-message loop belongs to
// the troubleshooting page. Nothing here shows the bot succeeding at something
// the transcript shows it failing.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * Twiga's own checklist, verbatim from the script.
 *
 * Left at the default bubble size rather than the long-message preset: this is
 * the list the page exists to teach, it is four short items, and the viewer has
 * to be able to read it at a glance from the rail. The `_italic_` markers are
 * the script's own and are what make the four ingredients scan as a list of
 * fields rather than a sentence — `shared/richText.tsx` renders them.
 */
const CHECKLIST = [
  "Happy to help with a practice activity! 📑",
  "",
  "To make one you can actually use, just tell me:",
  "- _Subject_",
  "- _Form_ (e.g. Form 1 or 2)",
  "- _Topic_ (e.g. map reading, forces)",
  "- _What you want_ (questions, activity, lesson tips)",
  "",
  "And I'll send it right away!",
].join("\n");

/**
 * The activity that comes back off one fully-specified line.
 *
 * The script sets the five questions as `>` blockquote lines and they stay that
 * way. `richText.tsx` groups consecutive `> ` lines into one WhatsApp quote
 * block with the green rule down its left edge, which is what makes the five
 * questions read as a thing to copy onto the board rather than as prose. Every
 * line survives from the script, in its original order.
 *
 * Question 3 is the one to watch: "use your arms" is there because the request
 * said there were no materials. That is the clause a teacher would think to
 * leave out, so it stays legible here.
 */
const ACTIVITY = [
  "_Practice Activity: Longitudes and Latitudes_",
  "_Geography — Form 1 — no materials needed_",
  "",
  "> 1. In your own words, what is a line of latitude?",
  "> 2. Which line divides the Earth into Northern and Southern hemispheres?",
  "> 3. Use your arms to show the class the direction longitudes run. Explain why.",
  "> 4. Dar es Salaam is near 7°S, 39°E. Which number is the latitude?",
  "> 5. _Challenge:_ Why do we need both longitude and latitude to find one place?",
  "",
  "Want the marking guide or a printable version? Just say which.",
].join("\n");

/**
 * The exit ticket. Three questions, so it stays at the default bubble size —
 * it is the ending and it has to be readable while the loop fade comes up.
 */
const EXIT_TICKET = [
  "Of course! A 3-question exit ticket on _Longitudes and Latitudes_ — easy, medium, challenge:",
  "",
  "> 1. Latitude lines run in which direction — east–west or north–south?",
  "> 2. Name the 0° line of longitude.",
  "> 3. _True or False:_ All longitudes are the same length. Explain.",
  "",
  "Let me know if you want the marking guide — I can send it in 10 seconds! 💪",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "i would like to have a practice activity",
    time: "12:07",
    // 0.5 + 0.011 × 40 chars = 0.94s.
    typingDur: 0.9,
    // 1 rendered line = 0.35s, floored to 1.5 — then a shade over, because the
    // beat is the viewer noticing how little is in it.
    dwell: 1.7,
    chapter: {
      id: "the-ask-that-stalls",
      title: "The ask that stalls",
      description:
        "No subject, no form, no topic. Twiga has nothing to work with, so it has to ask.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: CHECKLIST,
    time: "12:07",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.1,
    // 9 authored lines, ~10 rendered at 29px in the 760px column = 3.5s. Raised
    // to 4.2: this list is the page, and a viewer reading it to remember it
    // needs longer than a viewer reading it to follow along.
    dwell: 4.2,
    chapter: {
      id: "twiga-names-what-it-needs",
      title: "Twiga names its terms",
      description:
        "Subject, form, topic, what you want. Twiga asks the same four things every time, so send them first.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "geography form 1, map reading — longitudes and latitudes. i need a practice activity, 5 questions mixed difficulty. i have no materials to show them physically",
    time: "12:09",
    // 0.5 + 0.011 × 159 chars = 2.25s, capped at the 2.2s thumb-typing ceiling.
    typingDur: 2.2,
    // ~4 rendered lines = 1.4s, floored to 1.5 — then raised to 2.6, because the
    // viewer has to pick five separate fields back out of one sentence and
    // match them against the list still sitting above it.
    dwell: 2.6,
    chapter: {
      id: "five-ingredients-one-line",
      title: "Five ingredients, one line",
      description:
        "One line answers all four and adds the count. It also says there are no materials, which Twiga never asks about.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: ACTIVITY,
    ...LONG_MESSAGE,
    time: "12:10",
    typingDur: 1.2,
    // ~12 rendered lines at the long-message preset = 4.2s; taken to 5.0 because
    // five questions is real reading, not scanning. Inside the brief's 5–7s band
    // for a structured reply, at the bottom — this is shorter than a lesson plan.
    dwell: 5.0,
    chapter: {
      id: "usable-on-the-first-try",
      title: "Usable first try",
      description:
        "Five questions on the first try, and question 3 uses arms because there is nothing to show. Check it before you teach.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "can you set me a quick 3 question exit ticket on this? mixed difficulty",
    time: "12:16",
    // 0.5 + 0.011 × 71 chars = 1.28s.
    typingDur: 1.3,
    // 2 rendered lines = 0.7s → floor 1.5, plus a beat because it ends on a
    // question. The six-minute gap it follows is carried by the clock, 12:10 →
    // 12:16, not by dwell — nobody watches a real pause.
    dwell: 1.9,
    chapter: {
      id: "name-it-dont-say-yes",
      title: "Name it, don't say yes",
      description:
        "Saying \"yes\" to an open offer costs you another message. Name what you want and let \"on this\" carry the topic.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: EXIT_TICKET,
    time: "12:16",
    typingDur: 1.2,
    // ~10 rendered lines at 29px = 3.5s. The ending, and the tail after it is
    // only 0.7s, so 4.4 — enough to finish the third question and the offer.
    dwell: 4.4,
    chapter: {
      id: "short-asks-work-later",
      title: "Short asks work later",
      description:
        "A short line is enough now. The thread already carries the subject and topic for you.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
