// The conversation and its timing for /guide/teachers/teaching-content/what-to-teach.
//
// Source: content/video-scripts/teachers/teaching-content/what-to-teach.md,
// itself cut from the WhatsApp log (L442–L458, L600–L657).
//
// The arc is the page's goal in five turns, and the order matters. The most
// useful question in five months of chat was not "give me the syllabus" — it
// was positional: the teacher is twelve minutes from her Form 1 maths class and
// cannot remember what follows integers. So that goes FIRST and gets the
// payoff bubble. The whole-form list arrives second, as the thing she asks for
// once she has time to write a scheme of work, and it arrives with the Sources
// block that makes it checkable.
//
// How this differs from twiga-introduction, which ends on a syllabus list with
// a TIE citation and could otherwise read as a repeat:
//   - There, the list IS the ending and Twiga has the last word. Here the list
//     is the middle, and the last word is the teacher's: she is ticking it off
//     against her own printed syllabus before it goes in the scheme. That is
//     the whole thesis of this page — Twiga finds your place in the sequence,
//     the printed syllabus is the authority on what the sequence is.
//   - There, the ask is "what topics are covered". Here the ask is positional
//     ("what comes after integers"), which is the shape that actually worked.
//
// What is deliberately NOT here:
//   - Any question about terms, months or the school calendar. Twiga's calendar
//     claims are simply wrong (L393, L399, L405) and it contradicted itself on
//     the number of terms inside one minute (L354 vs L382). The page carries an
//     "ask your school, not Twiga" box; the video does not stage the failure
//     because this page is about a thing that works.
//   - A topic COUNT presented as fact. The same question returned six topics in
//     March and ten in May, so the closing chapter says so in the rail rather
//     than letting the ten-item list stand as the syllabus.
//
// Everything else — the look, the camera, the bubble motion — comes from
// `remotion/shared`.

import { buildScript, LONG_MESSAGE, type Message } from "../../shared";

/**
 * The payoff bubble: the positional answer, verbatim from the script.
 *
 * This is the right size as well as the right answer — one topic name and its
 * four subtopics, which is all a teacher walking down a corridor can use. The
 * `_italic_` markers are the transcript's own; `shared/richText.tsx` renders
 * them, and they are what makes _Fractions_ read as a topic name rather than a
 * word in a sentence.
 */
const NEXT_TOPIC = [
  "Mambo! No worries — I've got you covered. 😊",
  "",
  "After _Integers_, the next topic in _Form 1 Mathematics_ is _Fractions_.",
  "",
  "This includes:",
  "•  Meaning and types of fractions (proper, improper, mixed)",
  "•  Converting between improper fractions and mixed numbers",
  "•  Operations on fractions (addition, subtraction, multiplication, division)",
  "•  Solving problems involving fractions",
  "",
  "Let me know if you'd like a quick 2-minute summary for students, or one practice question to start the lesson.",
].join("\n");

/**
 * The whole-form list, and the Sources block under it.
 *
 * All ten topics are kept. Trimming the list to a tidier number would be a lie
 * about what came back, and the point of the rail copy on this beat is that the
 * count is Twiga's, not the syllabus's.
 *
 * The Sources block is cut from three lines to two, and which two is the whole
 * decision. `[2]` stays: it points a topic called _Fractions and Decimals_ at a
 * chapter called Coordinate Geometry, and that mismatch is in the transcript
 * (L652–L657). Keeping only the citations that line up would leave two neat
 * pointers on screen and quietly show the bot doing better than it did. A
 * citation is somewhere to go and check, not proof, and the video has to say so.
 *
 * The cut is also load-bearing for layout: at twenty-two rendered lines this
 * bubble pushed the column tall enough that the NEXT message's typing indicator
 * hung off the bottom of the frame. `ChatScene` accumulates `columnHeight` from
 * message rows only, so the recentre and the dolly-out do not see typing rows —
 * see the report. Twenty lines clears it.
 */
const FORM_ONE_TOPICS = [
  "Based on the official Tanzanian Institute of Education (TIE) curriculum for _Mathematics Form 1_, the main topics covered are:",
  "",
  "1. _Numbers and Operations_ — whole numbers, integers, fractions, decimals; BODMAS [1]",
  "2. _Factors and Multiples_ — prime factors, GCF, LCM",
  "3. _Fractions and Decimals_ — conversion, operations, rounding off [2]",
  "4. _Ratios, Proportions and Percentages_ [3]",
  "5. _Algebra_ — expressions, substitution, simple linear equations [4]",
  "6. _Geometry_ — angles, triangles, quadrilaterals, perimeter and area [5]",
  "7. _Coordinate Geometry_",
  "8. _Measurement_",
  "9. _Approximations_",
  "10. _Statistics_",
  "",
  "Sources:",
  "[1] Mathematics for Secondary Schools Student's Book Form One, Concept of Mathematics",
  "[2] Mathematics for Secondary Schools Student's Book Form One, Coordinate Geometry",
].join("\n");

export const MESSAGES: Message[] = [
  {
    side: "right",
    kind: "text",
    text: "Mambo! I have my Form 1 maths class in 12 minutes and I just realised I forgot what topic comes after integers. Help!!",
    time: "10:42",
    // 0.5 + 0.011 × 117 chars = 1.79s.
    typingDur: 1.8,
    // 3 rendered lines × 0.35s = 1.05s → the 1.5s floor, plus 0.4s because it
    // ends on a question and the viewer needs a beat to register one was asked.
    dwell: 1.9,
    chapter: {
      id: "ask-what-comes-next",
      title: "Ask what comes next",
      description:
        "You do not need the whole syllabus. Name the subject, the form and the topic you just finished.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: NEXT_TOPIC,
    ...LONG_MESSAGE,
    time: "10:42",
    // Twiga is an AI: fast and constant, whatever the reply length. The real
    // one took 13 seconds; a 13-second typing indicator would read as broken.
    typingDur: 1.2,
    // 14 rendered lines × 0.35s = 4.9s, taken to 5.2 because this is the payoff
    // and the four subtopics are the part a teacher will actually copy.
    dwell: 5.2,
    chapter: {
      id: "the-next-topic-lands",
      title: "The next topic lands",
      description:
        "Twiga names Fractions and lists its subtopics. That is enough to walk into class with.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "asante. and the full topic list for form 1 maths? im writing my scheme of work",
    time: "10:44",
    // 0.5 + 0.011 × 77 chars = 1.35s.
    typingDur: 1.3,
    // 2 rendered lines = 0.7s → the 1.5s floor, plus 0.4s of question silence.
    dwell: 1.9,
    chapter: {
      id: "now-the-full-list",
      title: "Now the full list",
      description:
        "Say why you want it. Writing a scheme of work tells Twiga to give you the whole form, not one topic.",
    },
  },
  {
    side: "left",
    kind: "text",
    text: FORM_ONE_TOPICS,
    ...LONG_MESSAGE,
    time: "10:45",
    typingDur: 1.3,
    // 20 rendered lines × 0.35s = 7.0s. The longest dwell here by some way, and
    // it has to be: ten numbered topics plus a Sources block is a document, and
    // the Sources block at the bottom is the part this page exists to teach, so
    // the eye has to get all the way down there before the next bubble starts.
    dwell: 7.0,
    chapter: {
      id: "it-names-the-book",
      title: "It names the book",
      description:
        "Each topic list ends with a Sources block naming the TIE Student's Book and chapter. It tells you where to check.",
    },
  },
  {
    side: "right",
    kind: "text",
    text: "ok. ticking these off against my syllabus copy before i put them in the scheme",
    time: "10:52",
    // 0.5 + 0.011 × 77 chars = 1.35s.
    typingDur: 1.3,
    // The ending, and the tail after it is only 0.7s. 2 rendered lines would
    // give the 1.5s floor; 2.7s so the last line can actually be read. The
    // seven-minute jump from 10:45 is carried by the clock, not by dwell —
    // that gap is her reading the list, and nobody will watch it.
    dwell: 2.7,
    chapter: {
      id: "check-it-yourself",
      title: "Check it yourself",
      description:
        "Twiga counts topics differently on different days. Tick the list against your printed syllabus before it goes in your scheme.",
    },
  },
];

export const SCRIPT = buildScript(MESSAGES);
