// The conversation and its timing for /guide/teachers/teaching-content/topic-explanations.
//
// Source: content/video-scripts/teachers/teaching-content/topic-explanations.md,
// itself cut from the WhatsApp log (the gap message at L943, the narrowing menu
// at L945–L953, the Types of Maps answer and its Form Three citations at
// L955–L981).
//
// The page is "what is it", not "how do I teach it": a teacher checking her own
// understanding against the book before she stands in front of the class. So the
// arc here is the recovery, not the failure. The first ask returns nothing, the
// teacher narrows instead of retrying, and the narrowed ask comes back with
// inline markers and a Sources block naming book and chapter. That block is the
// payoff and the poster frame.
//
// It is also the trap, and the video shows the trap. The teacher asked about
// Form 1; the answer opens "for _Form 3_" and every source line reads "Form
// Three". Twiga never announces the level change. The video ends on the teacher
// catching it, with no reply, because the transcript contains no case where
// Twiga acknowledged a level swap and inventing one would be the one thing this
// page cannot afford.
//
// Sibling video: twiga-checking-answers uses a two-line extract of the same
// Types of Maps answer to make a narrower point (a citation from the wrong
// subject, then the wrong form). This one is the fuller reply — the offer line
// and four source entries — because here the Sources block is the subject rather
// than the evidence. The two must not disagree, and they do not: in both, the
// citations exist, they are real book and chapter names, and they have to be
// read.
//
// Seven turns, and the pairing matters because the engine keeps two messages on
// screen (VISIBLE = 2 in shared/ChatScene.tsx):
//   0+1  the ask, and the honest "not in the textbook for your class"
//   1+2  that gap beside the teacher asking what IS covered
//   2+3  the question beside the menu it earns
//   3+4  the menu beside the two words that pick from it
//   4+5  the small ask beside the cited answer — the payoff pair
//   5+6  every source saying Form Three, beside the teacher naming it
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The narrowing menu, quoted from the script (L945–L953).
 *
 * Left at the default bubble size rather than the long-message preset: it is a
 * clarifying question with a list, not a document, and the five subtopics are
 * scanned rather than read. All five are kept — the one the teacher picks next
 * has to be visibly on the list for the narrowing to read as narrowing.
 *
 * `_Map Reading_` is the script's own marker and is rendered by
 * `shared/richText.tsx`.
 */
const SUBTOPIC_MENU = [
  "Could you please clarify which specific topic or subtopic under _Map Reading_ you'd like materials for? For example:",
  "",
  "- Types of maps",
  "- Map scales",
  "- Grid references",
  "- Compass directions",
  "- Features on topographic maps",
  "",
  "Let me know so I can provide accurate, curriculum-aligned support!",
].join("\n");

/**
 * The Types of Maps answer, quoted from the script (L955–L981).
 *
 * Trimmed to fit the bubble, and the trims are all cuts: the man-made-features
 * sentence carrying marker [3] is dropped, as is the "population, rainfall, crop
 * production, mineral deposits" list. The surviving markers are left at 1, 2, 4
 * and 5 rather than renumbered, so the bubble reads as an extract of a longer
 * answer rather than an answer that numbers its citations oddly. Every marker
 * that appears in the body has a source line, and every source line has a marker
 * — no dangling numbers in either direction.
 *
 * Four identical source entries look like a mistake and are not: that is what
 * the log shows (L976–L981, where all five resolve to the same chapter), and
 * "every line says Form Three" is precisely the observation the next message
 * makes. The closing offer is kept because "for Form 3?" is the only other place
 * Twiga hints the level changed, and it hints it in passing.
 *
 * The `_italic_` markers are the script's own.
 */
const TYPES_OF_MAPS = [
  "Based on the official TIE Geography textbook for _Form 3_, the two main types of maps are:",
  "",
  "- _Topographical Maps_",
  "These show both natural (physical) and man-made (cultural) features of an area [1]. Natural features include mountains, valleys, rivers, lakes and forests [2].",
  "",
  "- _Statistical Maps_",
  "These give quantitative information about the distribution of a phenomenon [4]. They are also called _distribution maps_, and dot maps are a common example [5].",
  "",
  "Would you like me to create a practice exercise or a lesson plan on _Types of Maps_ for Form 3?",
  "",
  "Sources:",
  "- [1] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying",
  "- [2] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying",
  "- [4] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying",
  "- [5] Geography for Secondary Schools Student's Book Form Three, Elementary Surveying",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "explain map reading for form 1 geography. im teaching it tomorrow and i want to check what i know is right first",
    time: "12:19",
    // 0.5 + 0.011 × 112 chars = 1.73s.
    typingDur: 1.8,
    // 3 rendered lines × 0.35s = 1.05 → floor 1.5, plus a touch. It is a
    // request, not a question the viewer has to hold, and the interesting
    // thing is what comes back.
    dwell: 1.7,
    chapter: {
      id: "ask-about-one-topic",
      title: "Ask about one topic",
      description:
        "One line names the topic, the form and the subject. It also says why, to check what you already know first.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: "I could not find this information in the textbook content for your class. If you want, I can help with a related topic that is covered.",
    time: "12:19",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.1,
    // 3 rendered lines = 1.05 → floor 1.5, raised. This is the beat where a
    // teacher decides whether to retry the same words or narrow, so it needs
    // to be read rather than glanced at.
    dwell: 2.2,
    chapter: {
      id: "the-gap-message",
      title: "The gap message",
      description:
        "Twiga says the topic is not in the textbook for your class. That gap message is honest and it is where the fix starts.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "yes — which subtopics under map reading are covered?",
    time: "12:19",
    // 0.5 + 0.011 × 52 chars = 1.07s.
    typingDur: 1.1,
    // 2 rendered lines = 0.7 → floor 1.5, plus a beat: a question earns a
    // little silence before the answer.
    dwell: 1.7,
    chapter: {
      id: "ask-what-is-covered",
      title: "Ask what is covered",
      description:
        "Instead of a bare yes, the teacher asks which subtopics are covered. That question saves a whole turn.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: SUBTOPIC_MENU,
    time: "12:20",
    typingDur: 1.2,
    // ~12 rendered lines at the default size, but five of them are three-word
    // bullets. Scanned, not read: 3.4s finds the list and picks off it.
    dwell: 3.4,
    chapter: {
      id: "a-menu-of-subtopics",
      title: "A menu of subtopics",
      description:
        "Twiga offers five subtopics it does have. Pick one and the ask becomes small enough to answer.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "types of maps",
    time: "12:20",
    // 0.5 + 0.011 × 13 chars = 0.64 → floor 0.8s.
    typingDur: 0.8,
    // 1 rendered line → floor 1.5, plus a touch so the smallness of the ask
    // registers against the size of what it gets back.
    dwell: 1.6,
    chapter: {
      id: "narrow-the-ask",
      title: "Narrow the ask",
      description:
        "Two words is enough now. The subject, form and topic are already in the thread above.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: TYPES_OF_MAPS,
    ...LONG_MESSAGE,
    time: "12:22",
    typingDur: 1.3,
    // ~25 rendered lines at the long-message preset. 25 × 0.35 = 8.75s is more
    // than this earns, because eight of those lines are four repetitions of one
    // citation. 7.0s is the top of the brief's 5–7s band for a structured
    // reply, and the Sources block sits at the bottom where the eye arrives
    // last — it has to still be on screen when the eye gets there.
    dwell: 7.0,
    chapter: {
      id: "read-the-sources-block",
      title: "Read the Sources block",
      description:
        "The answer arrives with markers and a Sources block naming the book and chapter. No Sources block means no textbook.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "hold on — every source here says form three. i asked for form 1",
    time: "12:23",
    // 0.5 + 0.011 × 62 chars = 1.18s.
    typingDur: 1.2,
    // The ending, and there is deliberately no reply after it: the transcript
    // has no case of Twiga acknowledging a level swap, so the page prose picks
    // it up from here. The tail after this dwell is only 0.7s, so 3.0s is the
    // whole of the reading time.
    dwell: 3.0,
    chapter: {
      id: "check-the-form",
      title: "Check the form",
      description:
        "The teacher asked for Form 1 but every source says Form Three. Twiga never said the level had changed.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
