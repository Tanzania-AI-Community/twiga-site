// The conversation and its timing for
// /guide/teachers/teaching-practice/difficult-questions.
//
// Source: content/video-scripts/teachers/teaching-practice/difficult-questions.md,
// itself cut from the WhatsApp log (L1181–L1205).
//
// The beat this page exists for is the *shape* of the ask. A student had
// already asked the teacher why girls were not educated in the past, in front
// of the class, and the teacher did not know what to say. Ending the message
// with "what do i respond with?" is what turned a history essay into a script:
// a paragraph set off as a quote that a teacher can speak out loud. So the
// video is question → words to say → the reasoning behind them → the follow-up
// the teacher actually needed.
//
// What is deliberately NOT here:
//   - Any suggestion that Twiga handles the room. The teacher's real constraint
//     was answering "without upsetting others in the class" (L567) and neither
//     of Twiga's replies addressed it. That gap belongs in the page prose, and
//     showing it solved here would be showing the bot doing something the
//     transcript shows it never did.
//   - Anything about which language Twiga answers in. It supports English and
//     Kiswahili; the "I currently support English only" refusal in the
//     transcript (L1179–L1180) was a product bug and has been fixed, so it is
//     not a caution and appears in no video. The language page owns what is
//     left of that subject, which is proofreading Kiswahili terminology.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The payoff: words the teacher can say out loud.
 *
 * The `> ` prefixes are the transcript's own and the engine renders them as a
 * proper WhatsApp quote block, with a rule down the left edge. That rule is
 * most of the point — it is what says "this part is the thing you say", as
 * opposed to Twiga talking about the topic. The `_italic_` markers are the
 * transcript's too (L1188–L1192).
 *
 * Two cuts, both of them removals, no rewriting:
 *   - The opening "That's a thoughtful and important question..." pleasantry.
 *     It reads as warmth in a chat and as filler in a 28-second video, and it
 *     pushed the quote block off the readable part of the bubble.
 *   - The closing sentence "Today, more girls are in school than ever before."
 *     The page has to tell teachers to date-check any claim like that before
 *     class, so leaving it out of the spoken script is the honest cut.
 */
const SPOKEN_ANSWER = [
  "Here's a balanced and curriculum-aligned way you can respond:",
  "",
  "> _Historically, in many societies — including some communities in Tanzania before and during the colonial period — education was mainly given to boys. This was because of cultural beliefs that saw boys as future leaders, breadwinners, or representatives of the family, while girls were expected to focus on home and family roles._",
  ">",
  "> _However, these views have changed over time. Today we understand that both boys and girls have equal rights to education — and educating girls strengthens families, communities, and the whole nation._",
  ">",
  "> _It's also important to know that some communities always valued learning for girls, and there were women who broke barriers to get educated even when it was difficult._",
].join("\n");

/**
 * The half teachers keep: four reasons the wording is safe, then a named local
 * example, then the offer.
 *
 * These four bullets (L1196–L1200) transfer to any sensitive question, which is
 * why they get their own bubble rather than being tacked onto the one above.
 * The paragraph runs out after thirty seconds in front of a class; the
 * reasoning is what lets a teacher answer the follow-up nobody scripted.
 *
 * Hyphen bullets, not the "•" used elsewhere in the track, because that is what
 * this script carries.
 */
const WHY_IT_WORKS = [
  "This response:",
  "- Explains the historical context without blaming any group.",
  "- Aligns with civic education and social values in the Tanzanian curriculum.",
  "- Promotes gender equality, which is supported by TIE and NECTA.",
  "- Keeps the focus on progress and national development.",
  "",
  "You can add a short example like:",
  "> _Think of leaders like Samia Suluhu Hassan — her education helped her rise to serve our country. That shows why every girl's education matters._",
  "",
  "Let me know if you'd like a simple class discussion activity or a short reading passage on this topic!",
].join("\n");

/**
 * The offer at L1205, taken up. Three timed steps and nothing else: the real
 * replies of this kind run longer, and the script is already cut to this shape.
 */
const DISCUSSION = [
  "_Class Discussion — 10 minutes_",
  "_Civics, Form 2 — Education and equal rights_",
  "",
  "> 1. _In pairs (3 min):_ Name one thing that is easier for a learner today than it was for your grandmother.",
  ">",
  "> 2. _Whole class (5 min):_ What does a community gain when every learner finishes school? Take three answers.",
  ">",
  '> 3. _Closing (2 min):_ Each learner writes one sentence — _"Education matters to me because…"_',
  "",
  "Want this as a short reading passage instead? Just say so.",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "what if students ask me why girls where never taught in the early days, what do i respond with?",
    time: "14:42",
    // 0.5 + 0.011 × 94 chars = 1.53s.
    typingDur: 1.5,
    // 2 rendered lines × 0.35s = 0.7s → the 1.5s floor, plus 0.5s because the
    // whole page turns on the four words at the end of it and the viewer has to
    // read them before the answer starts arriving.
    dwell: 2.0,
    chapter: {
      id: "ask-what-to-say",
      title: "Ask what to say",
      description:
        "End the question with what do i respond with. That turns a topic into words you can say out loud.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: SPOKEN_ANSWER,
    ...LONG_MESSAGE,
    time: "14:43",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.3,
    // 14 rendered lines × 0.35s = 4.9s, taken to 5.8. This is the payoff and it
    // is not skim copy — the viewer is reading a paragraph they may be about to
    // say to twenty faces, so they read it at speaking speed.
    dwell: 5.8,
    chapter: {
      id: "words-you-can-speak",
      title: "Words you can speak",
      description:
        "Twiga sends back a short script, set off as a quote. You can read it or say it in your own words.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: WHY_IT_WORKS,
    ...LONG_MESSAGE,
    time: "14:43",
    typingDur: 1.2,
    // 12 rendered lines × 0.35s = 4.2s, taken to 4.6. Bulleted, so it scans
    // faster than the paragraph above, but this is the half a teacher keeps.
    dwell: 4.6,
    chapter: {
      id: "why-the-answer-is-safe",
      title: "Why the answer is safe",
      description:
        "Four reasons the wording works, plus a local example. Keep these for the follow up nobody scripted.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "yes the class discussion activity please, form 2 civics. i have about 10 minutes",
    time: "14:46",
    // 0.5 + 0.011 × 79 chars = 1.37s.
    typingDur: 1.4,
    // 2 rendered lines × 0.35s = 0.7s → the 1.5s floor, plus 0.3s of the beat
    // that follows a request.
    dwell: 1.8,
    chapter: {
      id: "take-up-the-offer",
      title: "Take up the offer",
      description:
        "Twiga offers an activity. Say yes and add the form, the subject and the minutes you have.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: DISCUSSION,
    ...LONG_MESSAGE,
    time: "14:47",
    typingDur: 1.2,
    // 13 rendered lines × 0.35s = 4.55s, taken to 5.2 because this is the
    // ending and the tail after it is only 0.7s.
    dwell: 5.2,
    chapter: {
      id: "ten-minutes-of-class",
      title: "Ten minutes of class",
      description:
        "Three timed steps that fit the lesson. Check the example and the wording before you use it in class.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
