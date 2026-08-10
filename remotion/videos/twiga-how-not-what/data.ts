// The conversation and its timing for /guide/teachers/teaching-practice/how-not-what.
//
// Source: content/video-scripts/teachers/teaching-practice/how-not-what.md
//
// The page turns on a contrast, so the video is built as two asks about the same
// topic and the two different things that come back. Turn 1 names the topic and
// gets the syllabus: correct, and nothing a teacher can say at the board. Turn 3
// names the teaching move and gets sentences in quote marks. Turns 5–6 then show
// the same lever pointed at a different subject, to prove it was the phrasing and
// not the topic.
//
// The engine keeps two messages on screen, so the pairs are chosen deliberately.
// The syllabus is still sitting there while the teacher types "ok wait" — that
// adjacency is the argument. It leaves as the usable answer lands, and the poster
// frame catches the reframed ask beside the words it produced.
//
// The sibling video at videos/twiga-how-to-ask is the general skill of asking and
// is deliberately not repeated: nothing here is about naming subject, form and
// topic, and no request in this video is under-specified. Every ask here is
// complete. What changes is what is being asked *for*.
//
// Honesty note. Every line is verbatim from the script, which is verbatim from
// chat.txt. Turn 6 really is one sentence with no follow-up offer (L489), and it
// really does drop "constant speed" and "net force" — the rail copy says so
// rather than letting the video sell it as syllabus wording. Nothing here shows
// the bot doing anything the transcript does not show it doing.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The answer to a topic-name request: the TIE curriculum, accurately quoted.
 *
 * This is the weaker half of the comparison and it has to look genuinely useful,
 * or the contrast is a straw man. So it keeps its numbering, its sub-bullets, its
 * citation markers and its closing menu — everything that makes it read as a
 * competent reply — and the video lets the viewer notice on their own that there
 * is no sentence in it they could say out loud.
 *
 * The `_italic_` markers are the script's own; `shared/richText.tsx` renders
 * them, and they are what make the two headings scan as curriculum headings.
 */
const SYLLABUS = [
  "Based on the official TIE curriculum for _Mathematics Form 1_:",
  "",
  "3. _Fractions and Decimals_",
  " - Conversion between fractions and decimals",
  " - Operations on fractions and decimals",
  " - Rounding off numbers and decimals [2]",
  "",
  "4. _Ratios, Proportions and Percentages_",
  " - Meaning and application of ratios",
  " - Converting between fractions, decimals and percentages [3]",
  "",
  "Would you like detailed notes or practice questions on any of these? 📚➗",
].join("\n");

/**
 * The payoff: the same topic, asked as a teaching move, coming back as speech.
 *
 * The script sets the three examples as one `> ` quoted block and the class hook
 * as a second one. That is not decoration — the engine draws a green rule down
 * the left of a quoted block, so the words the teacher is meant to *say* are
 * visibly a different kind of thing from the words explaining them. Keep the
 * prefixes.
 *
 * The local examples are verbatim and must stay that way: pawpaw at 1,000/=,
 * ugali for four, halftime at 45 of 90 minutes. The familiarity is the mechanism.
 *
 * One line is cut — the script's closing "Then say: ..." — purely for height, so
 * the bubble and the ask above it fit the plane without the column dollying out.
 * The class hook it followed survives, and it is the line the notes single out.
 */
const WORDS_TO_SAY = [
  "Great question from your student — many learners wonder this. Here's a natural way to respond:",
  "",
  '> "Imagine you\'re at the market with a friend, and you buy _one big pawpaw_ for 1,000/= to share. You cut it into _two equal parts_ — each of you gets _½_. That half? That\'s a fraction!',
  ">",
  "> Or think about _ugali_ — if your mum cooks for four people, she uses _¼_ of the flour for each plate.",
  ">",
  '> Even in football — if a match is 90 minutes, halftime is at _45 minutes_, which is _½_ of the game."',
  "",
  "You can turn it into a quick class activity:",
  '> Ask: "Who here has shared a soda, a piece of cake, or airtime?"',
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "fractions maths form 1 — what does the syllabus cover",
    time: "10:41",
    // 0.5 + 0.011 × 53 chars = 1.08s.
    typingDur: 1.1,
    // 1 rendered line = 0.35s, floored to 1.5 — then 1.8, because it ends on a
    // question and the pause is the viewer registering what was asked for.
    dwell: 1.8,
    chapter: {
      id: "ask-what-it-is",
      title: "Ask what it is",
      description:
        "The topic named on its own. This is a question about the syllabus, not about the lesson you have to teach.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: SYLLABUS,
    ...LONG_MESSAGE,
    time: "10:41",
    // Twiga is an AI: fast and constant, whatever the reply length.
    typingDur: 1.2,
    // 12 authored lines, ~13 rendered at the long-message preset = 4.6s. Cut to
    // 3.4: this one is meant to be recognised, not studied, and it stays on
    // screen through the whole of the next turn anyway — it does not leave until
    // the usable answer lands.
    dwell: 3.4,
    chapter: {
      id: "the-syllabus-comes-back",
      title: "The syllabus comes back",
      description:
        "Curriculum headings and bullets, all correct. There is nothing here you can say out loud to a class.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "ok wait one of my students just asked why we even need fractions in real life. how do i answer that without sounding like a robot?",
    time: "10:43",
    // 0.5 + 0.011 × 130 chars = 1.93s.
    typingDur: 1.9,
    // ~3 rendered lines = 1.05s, floored to 1.5 — then 2.3, because this is the
    // turn the page is about and it lands while the syllabus is still on screen.
    // The extra beat is the comparison being made.
    dwell: 2.3,
    chapter: {
      id: "ask-how-to-say-it",
      title: "Ask how to say it",
      description:
        "Same topic, different ask. It names the teacher's own words, a real student question, and the tone to use.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: WORDS_TO_SAY,
    ...LONG_MESSAGE,
    time: "10:43",
    typingDur: 1.2,
    // ~15 rendered lines at the long-message preset = 5.25s, taken to 5.6. This
    // is the payoff and it is speech, not a list — a viewer has to hear it, not
    // scan it. Bottom of the brief's 5–7s band for a structured reply.
    dwell: 5.6,
    chapter: {
      id: "words-you-can-say",
      title: "Words you can say",
      description:
        "The answer comes back in quote marks. Pawpaw, ugali, halftime, and a question to open the whole class with.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "ok im now going to physics form 2. give me a 1-line intro for newtons first law that 14 year olds will actually remember",
    time: "10:45",
    // 0.5 + 0.011 × 120 chars = 1.82s.
    typingDur: 1.8,
    // ~3 rendered lines = 1.05s → floor 1.5, plus a beat for the request to
    // register as a request. New subject, so the viewer is also resetting.
    dwell: 1.9,
    chapter: {
      id: "name-the-format",
      title: "Name the format",
      description:
        "New subject, one line asked for, and the age of the class. Twiga obeys all three.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: '"An object will stay still or keep moving in a straight line unless a force — like a push, pull, or stop — makes it change!"',
    time: "10:45",
    typingDur: 1.0,
    // ~3 rendered lines = 1.05s → floor 1.5. This is the ending and the tail
    // after it is only 0.7s, so 3.6: long enough to read the sentence and then
    // to notice that nothing follows it. The missing follow-up menu is the beat.
    dwell: 3.6,
    chapter: {
      id: "one-line-back",
      title: "One line back",
      description:
        "One sentence, no bullets, no offer of more. It trades exact wording for something a class will remember, so check it before marking.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
