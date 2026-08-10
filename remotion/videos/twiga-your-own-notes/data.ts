// The conversation and its timing for /guide/teachers/improvisation/your-own-notes.
//
// Source: content/video-scripts/teachers/improvisation/your-own-notes.md
//
// The page has one claim and the transcript hands it to us as a matched pair,
// four days apart: the same teacher, the same topic, two request shapes. The
// bare ask ("i would like to have a practice activity") sent Twiga looking in
// the course content, stalled through eight identical holding bubbles and then
// refused outright. The paste of the teacher's own Form 1 English notes came
// back with seven complete games in twenty-six seconds. The script collapses the
// four days into one sitting because that is how the contrast reads; the clock
// labels carry the real gap (11:24 → 11:25 → 11:31), so the video never plays
// dead air.
//
// The engine holds two messages on screen, so the beats land as pairs:
// ask → stall, refusal → paste, paste → games. The last pair is the whole page:
// the teacher's wall of notes still on screen underneath the games that were
// built out of it.
//
// Two things the neighbouring videos already own and this one deliberately does
// not re-argue: twiga-faq covers the voice-note refusal and photo handling, and
// activities-and-games covers what makes a good classroom activity. This video's
// only subject is the input.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The stall. Eight of these fired in twenty seconds (_chat.txt L1424–L1431);
 * three plus an ellipsis is the same beat at a length a viewer will sit through,
 * and the repeated 📑 is what makes it read as stuck rather than as working.
 *
 * Left at the default bubble size: the holding line names the mechanism the page
 * cares about — "from the *course content*" — and that phrase has to be legible,
 * because it is the reason a paste cannot stall.
 */
const HOLDING = [
  "📑 Generating exercises from the course content, please hold...",
  "📑 Generating exercises from the course content, please hold...",
  "📑 Generating exercises from the course content, please hold...",
  "…",
].join("\n");

/**
 * The paste, trimmed from roughly 175 pasted lines (_chat.txt L1485–L1622).
 * Every line survives from the script; the cuts are whole blocks, never
 * rewrites, and the teacher's own "quizes" typo stays.
 *
 * What had to survive is what Twiga's reply reaches back for: the minimal pairs,
 * the two flat Column A / Column B lists, the textbook's own game names, the
 * word-stress examples, and the closing "this part" that scopes the answer to
 * two sections instead of the whole topic.
 *
 * `LONG_MESSAGE` because it is a wall of notes — the shape is the message here,
 * not the individual words.
 */
const PASTE = [
  "i have these summary notes",
  "",
  "PRODUCING SHORT AND COHERENT ORAL MESSAGES",
  "Pronounce the following pair of words:",
  "Pray - play",
  "Crowd - cloud",
  "Rice - lice",
  "Air - hair",
  "...",
  "",
  "COLUMN A / COLUMN B",
  "Sick, Flesh, Gate, Glow, Road, Ten...",
  "seek, fresh, get, grow, load, pen...",
  "",
  "NOTE: Revise Minimal pairs games in topic two. Such games are:",
  "Is it a pair? / Odd one out / Minimal pair up ...",
  "",
  "PRACTISING PRONUNCIATION WITH PROPER WORD STRESS",
  "proDUCE - He works on a farm and helps to proDUCE fresh vegetables.",
  "PROduce - The local store sells a variety of fresh PROduce.",
  "reCORD / REcord / DEsert / deSERT / PERmit / perMIT ...",
  "",
  "help me create fun short game quizes that are interactive and memorable for the students to learn this part",
].join("\n");

/**
 * The payoff, cut from the seven games at _chat.txt L1660–L1780 to the four that
 * carry the argument, with the remaining three named on one line so the count
 * still reads.
 *
 * The `_italic_` markers are the script's own and `shared/richText.tsx` renders
 * them: the game titles are what make this read as a document rather than a
 * paragraph. Game 2 and Game 4 are named out of the teacher's own notes, and
 * every drill word in Game 1 and Game 4 appears in the bubble above.
 */
const GAMES = [
  "Here are some fun, interactive, and memorable game quizzes for your Form 1 English class on _Producing Short and Coherent Oral Messages_:",
  "",
  "_Game 1: Minimal Pair Showdown_ 🎯",
  '- Two teams. Teacher says one word of a pair ("pray"), students shout the match ("play").',
  "- Rounds: Crowd → ? · Rice → ? · Air → ?",
  "",
  "_Game 2: Odd One Out_ 🔍",
  "- Read three words — two are a minimal pair, one is not.",
  "- _Pray, play, table_ → _table_",
  "",
  "_Game 3: Stress Detective_ 🕵️",
  '- "He works on a farm and helps to proDUCE fresh vegetables." Students say it aloud, then give the other meaning — _PROduce_.',
  "",
  "_Game 4: Minimal Pair Pelmanism_ 🃏",
  "- Cards face down: sick/seek, flesh/fresh, gate/get, glow/grow, road/load, ten/pen.",
  "",
  "_Also: Stress Shift Charades 🎭 · Sentence Sprint 🏃 · Stress Clap Challenge 👏_",
  "",
  "Would you like me to turn any of these into a printable worksheet, or add more rounds for a longer lesson activity?",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "i would like to have a practice activity",
    time: "11:24",
    // 0.5 + 0.011 × 39 chars = 0.93s.
    typingDur: 0.9,
    // 1 rendered line = 0.35s → floor 1.5, nudged to 1.6. It is a short ask and
    // the interesting thing is what comes back, so it does not linger.
    dwell: 1.6,
    chapter: {
      id: "the-bare-request",
      title: "The bare request",
      description:
        "The teacher asks for an activity with nothing attached. Twiga has to go and find the content first.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: HOLDING,
    time: "11:24",
    // Twiga speaking, so short and constant. The wait lives in the dwell, not
    // in the dots.
    typingDur: 0.9,
    // ~7 rendered lines × 0.35s = 2.45s → 2.6. Long enough to feel stuck,
    // short enough that nobody reaches for the scrub bar.
    dwell: 2.6,
    chapter: {
      id: "it-goes-looking",
      title: "It goes looking",
      description:
        "Twiga goes looking in the course content. The same holding message fires over and over for twenty seconds.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: "Sorry, I can't help with that request. If you have another question or need help with a different topic, I'm happy to assist.",
    time: "11:25",
    typingDur: 0.9,
    // ~3 rendered lines = 1.05s → floor 1.5, held to 2.4. This is the pivot of
    // the whole video and it needs a beat of silence to land before the paste.
    dwell: 2.4,
    chapter: {
      id: "then-it-refuses",
      title: "Then it refuses",
      description:
        "No activity arrives. The request is dropped, and nothing about the question was wrong.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: PASTE,
    ...LONG_MESSAGE,
    time: "11:31",
    // A paste, not thumb-typing. The character formula would cap out at 2.2s and
    // pretend the teacher typed 175 lines into the box; 1.4s is the pause before
    // hitting send.
    typingDur: 1.4,
    // 24 rendered lines would ask for 8.4s, which is reading time this bubble
    // does not need — a viewer registers its shape and then reads the one line
    // at the bottom. 3.4s covers both.
    dwell: 3.4,
    chapter: {
      id: "paste-the-notes",
      title: "Paste the notes",
      description:
        "The teacher pastes the pages they are teaching from and asks for games on this part. Now there is nothing to look up.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: GAMES,
    ...LONG_MESSAGE,
    time: "11:31",
    typingDur: 1.2,
    // ~26 rendered lines, and a structured reply of this size is the 5–7s band.
    // 6.0s: it is the last message, the tail after it is only 0.7s, and the four
    // game titles are what a teacher will want to read off the screen.
    dwell: 6.0,
    chapter: {
      id: "games-from-your-words",
      title: "Games from your words",
      description:
        "Seven games come back in half a minute. They use the teacher's own word lists, so nothing needs checking against the book.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
