// The conversation and its timing for
// /guide/teachers/teaching-practice/activities-and-games.
//
// Source: content/video-scripts/teachers/teaching-practice/activities-and-games.md,
// itself cut from the WhatsApp log (L1435–L1484, L1659–L1780).
//
// The page's job is one arc in three asks: turn a topic into something students
// *do*, ask for a game version of the same thing, then ask how to mark it. The
// script gives all three and the video keeps all three, because dropping any
// one of them turns the page into a list of activities rather than a method.
//
// The one real editorial decision here is how much of each reply to show. The
// games reply returned seven games (L1664–L1767) and the activity reply five
// role-play scenarios (L1441–L1472). Both are rendered short, because an
// activity list at bubble scale is a wall of text and a wall of text teaches
// nobody anything. What survives is the part a teacher can picture happening in
// a real room: two teams shouting, three words read aloud, a sentence on the
// board, groups of four or five. Every line that is here is verbatim from the
// script; nothing was rewritten to fit.
//
// What is deliberately NOT here:
//   - The printable worksheet offer that closes the real reply (L1780). The
//     teacher answered it with a bare "yes", which hit the exercise tool and
//     failed outright (L1783). Showing the offer without the failure would be
//     showing the bot succeeding at something the transcript shows it failing,
//     and the recovery belongs to /guide/teachers/improvisation/printables.
//   - The pasted textbook notes at L1485 that gave two of the games their
//     names. That technique is /guide/teachers/improvisation/your-own-notes.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The activity reply, trimmed from five role-play scenarios to two.
 *
 * Two beats have to survive the trim and both do. First, the constraint is
 * echoed back on line two: "no materials needed" is Twiga confirming it heard
 * "40 students and no materials", which is the whole reason the teacher said
 * it. Second, every activity carries a number a teacher can act on — a 1–2
 * minute message, groups of 4–5, five minutes, under two minutes. That is what
 * separates a usable activity from a suggestion.
 *
 * The `_italic_` markers are the transcript's own: Twiga writes activity
 * headings and the structure label in italics, and `shared/richText.tsx`
 * renders them. They are most of what makes this read as three things to run
 * rather than a paragraph about speaking practice.
 *
 * The closing question is kept because the next teacher turn ignores it and
 * asks for games instead, and the turn after that comes back to it. The offer
 * of a marking scheme arriving unasked is a real habit of the bot's
 * (L1474–L1480, L1771–L1776) and the page's third ask is about not relying on
 * it.
 */
const PRACTICE_ACTIVITY = [
  "_Practice Activity: Producing Short and Coherent Oral Messages_",
  "_Form 1 English — no materials needed_",
  "",
  "_1. Role-play in pairs_ — each pair picks one scenario and delivers a 1–2 minute message:",
  "- You lost your school bag during break. Announce it to the class.",
  "- A new student asks the way to the school library.",
  "",
  "_2. One-minute speech_ — each student stands and speaks on a favourite hobby, clean water in our community, or a memorable day at school.",
  "_Structure:_ opening (greet + state the topic) → body (2–3 clear points) → closing (summarise, end politely).",
  "",
  "_3. Group discussion_ — groups of 4–5 discuss one question for 5 minutes, then the spokesperson summarises to the class in under 2 minutes.",
  "",
  "Want a marking scheme for this?",
].join("\n");

/**
 * The payoff bubble: the same lesson content, returned as games.
 *
 * Seven came back. Four are shown, in the order they arrived, and the cut is
 * where it is on purpose. Games 1–3 are the low-prep headline made visible —
 * Showdown is your voice, Odd One Out is three spoken words, Stress Detective
 * is the board — and game 4 is the first one that needs something made
 * beforehand, so a teacher with no printer can see the line between them
 * inside the bubble rather than being told about it afterwards.
 *
 * The header still says seven, because that is what the reply said. Trimming a
 * long structured answer to fit a bubble is what every video in this track
 * does; rewriting the count to match the trim would be inventing.
 *
 * The sample rounds are left in exactly as sent. They mix contrasts, and some
 * of them (rice, crowd) are the l/r pairs Swahili-speaking students actually
 * trip on while others test something else entirely. The page prose is where a
 * teacher is told to pick the rows that match the errors they hear.
 */
const GAME_QUIZZES = [
  "Seven game quizzes for this part 🎯",
  "",
  "_1. Minimal Pair Showdown_ — two teams. You say one word of a pair, students shout the match. First correct team scores.",
  "_Rounds:_ crowd → ? · rice → ? · seal → ? · air → ? · fine → ?",
  "",
  "_2. Odd One Out_ 🔍 — read three words; two are a minimal pair. _Pray, play, table_ → odd one: _table_.",
  "",
  '_3. Stress Detective_ 🕵️ — write sentences on the board with the stress capitalised: "...helps to proDUCE fresh vegetables." Students read it aloud, then give _PROduce_.',
  "",
  "_4. Minimal Pair Pelmanism_ 🃏 — cards face down; flip two to find the pair. _rice/lice, glow/grow, writer/rider_.",
].join("\n");

/**
 * The rubric, and the last thing the viewer sees.
 *
 * Two blocks, because the teacher now has two things to mark: the games and
 * the speaking activity from four messages earlier. The speaking list is cut
 * from five criteria to three — the three that a teacher can judge from the
 * back of the room while a student is still talking.
 *
 * The closing offer is kept. It is the honest next step for anyone who needs a
 * number rather than a tick, and it points at
 * /guide/teachers/assessment/marking-schemes.
 */
const RUBRIC = [
  "_Quick Assessment Rubric — the games_",
  "- ✅ Correct pronunciation of minimal pairs",
  "- ✅ Accurate identification of stressed syllables",
  "- ✅ Clear and coherent sentence construction",
  "- ✅ Active participation and teamwork",
  "",
  "_For the speaking activity, mark on:_",
  "- ✅ Clear greeting and introduction",
  "- ✅ Logical flow of ideas",
  "- ✅ Confident closing statement",
  "",
  "Want me to turn this into a marking scheme out of 10?",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    // Verbatim from the script. Lowercase, no capitals, the constraint tacked
    // on the end the way a teacher types it walking to class.
    text: "form 1 english, producing short and coherent oral messages. i need a practice activity they can actually do, not copy. 40 students and no materials",
    time: "11:22",
    // 0.5 + 0.011 × 145 chars = 2.10s, inside the 2.2s thumb-typing cap. It is
    // a long thing to type and the dots should say so.
    typingDur: 2.1,
    // 4 rendered lines × 0.35s = 1.4s → the 1.5s floor, plus 0.5s because this
    // is the message the whole page is teaching how to write and the viewer is
    // reading it as a template, not as dialogue.
    dwell: 2.0,
    chapter: {
      id: "say-the-class-and-the-limit",
      title: "Say the class and the limit",
      description:
        "Topic, 40 students, no materials. The limit is what stops Twiga handing you something you cannot run.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: PRACTICE_ACTIVITY,
    ...LONG_MESSAGE,
    time: "11:23",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.2,
    // 17 rendered lines × 0.35s = 5.95s. Dense, but half of it is bullets and
    // headings that scan rather than read.
    dwell: 5.9,
    chapter: {
      id: "three-things-students-do",
      title: "Three things students do",
      description:
        "Role play in pairs, a one minute speech, groups of four or five. Nothing to print or buy.",
    },
  },
  {
    side: "right",
    kind: "text",
    // Verbatim, "quizes" and all.
    text: "can you make this part into fun short game quizes, interactive and memorable",
    time: "11:28",
    // 0.5 + 0.011 × 75 chars = 1.33s.
    typingDur: 1.3,
    // 2 rendered lines = 0.7s → the 1.5s floor, plus 0.4s of question silence
    // before the answer lands.
    dwell: 1.9,
    chapter: {
      id: "ask-for-a-game-version",
      title: "Ask for a game version",
      description:
        "Same topic, one more message. Ask for short game quizzes and the activity comes back as something students play.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: GAME_QUIZZES,
    ...LONG_MESSAGE,
    time: "11:29",
    typingDur: 1.3,
    // 15 rendered lines × 0.35s = 5.25s. This is the payoff and it is the
    // bubble the poster frame shows, so it gets read properly rather than
    // skimmed.
    dwell: 5.3,
    chapter: {
      id: "games-that-need-no-prep",
      title: "Games that need no prep",
      description:
        "Two teams shouting answers, three spoken words, stress written on the board. Only the card game needs anything made first.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "and how do i mark it? something simple",
    time: "11:34",
    // 0.5 + 0.011 × 37 chars = 0.91s.
    typingDur: 0.9,
    // 1 rendered line → the 1.5s floor, plus 0.4s of question silence.
    dwell: 1.9,
    chapter: {
      id: "ask-how-to-mark-it",
      title: "Ask how to mark it",
      description:
        "Twiga often adds criteria you never asked for. Asking by name means you always get them.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: RUBRIC,
    ...LONG_MESSAGE,
    time: "11:35",
    typingDur: 1.2,
    // 12 rendered lines × 0.35s = 4.2s, taken to 4.8 because this is the
    // ending — the tail after it is only 0.7s, and the last line is an offer
    // the viewer has to finish reading to know it is there.
    dwell: 4.8,
    chapter: {
      id: "a-rubric-you-can-tick",
      title: "A rubric you can tick",
      description:
        "Short lists for the games and for the speaking task. Twiga then offers to turn them into a mark out of ten.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
