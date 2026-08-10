import type { ReactNode } from "react";
import type { VideoChapter } from "../types";

/** Rail copy for the beat a message opens. */
export type MessageChapter = {
  /** Kebab-case — it is used as the deep-link hash. */
  id: string;
  title: string;
  description: string;
};

type MessageBase = {
  /**
   * "right" = the teacher (outgoing, green). "left" = Twiga (incoming, white).
   * "center" is WhatsApp's own chrome sitting between the two columns — a date
   * divider, an encryption notice. Use it only with `kind: "system"`.
   */
  side: "left" | "right" | "center";
  /**
   * WhatsApp clock label. Cosmetic, but it must advance plausibly. Set it to
   * `""` on a divider: the row is dropped entirely, because a real date divider
   * carries no clock.
   */
  time: string;
  /** How long the typing indicator bounces before the bubble lands. */
  typingDur: number;
  /** How long the bubble sits before the next message starts typing. */
  dwell: number;
  chapter: MessageChapter;
};

export type TextMessage = MessageBase & {
  kind: "text";
  text: string;
  /** Spread `LONG_MESSAGE` for a long structured reply. */
  fontSize?: string;
  maxWidth?: string;
  lineHeight?: string;
};

/** A document/attachment bubble, rendered by the shared `DocCard`. */
export type CardMessage = MessageBase & {
  kind: "card";
  card: DocCardSpec;
};

/**
 * A voice note. Twiga cannot hear one, so this is nearly always the teacher
 * speaking and being refused — the bubble has to read unmistakably as audio for
 * that beat to land.
 */
export type VoiceMessage = MessageBase & {
  kind: "voice";
  /** Clock length, e.g. "0:08". */
  duration: string;
};

/**
 * WhatsApp's own chrome rather than a message from either speaker. Grey and
 * italic, and it never shows a typing indicator — nobody typed it.
 *
 * Two shapes, and the difference is `side`:
 *   - `side: "center"`, `time: ""` — a date divider ("13 July"), the honest way
 *     to carry a gap of days. The clock labels either side of it stay bare
 *     `HH:MM`, exactly as in the real client.
 *   - `side: "left" | "right"` — a client placeholder that stands in for a
 *     message, like "This message can't be displayed here". It keeps its place
 *     in the column and its clock, because that is where WhatsApp puts it.
 */
export type SystemMessage = MessageBase & {
  kind: "system";
  text: string;
};

/**
 * Escape hatch: a bubble that renders arbitrary content. Reach for this only
 * when nothing above can express the beat — and if what you build is useful to
 * more than one video, move it into `shared/` so the others can have it too.
 * Consistency across the track beats novelty in any one video.
 */
export type NodeMessage = MessageBase & {
  kind: "node";
  node: ReactNode;
};

export type Message =
  | TextMessage
  | CardMessage
  | VoiceMessage
  | SystemMessage
  | NodeMessage;

export type DocCardRow = { label: number; lineA: number; lineB: number };

export type DocCardSpec = {
  /** Header line, e.g. "LESSON PLAN", "MOCK EXAM", "MARKING SCHEME". */
  title: string;
  /** Second header line, e.g. "Mathematics · Algebra · Form 1". */
  subtitle: string;
  /** Corner tag, e.g. "PDF". Omit for a plain card. */
  badge?: string;
  /** Skeleton body: a row count (widths are derived) or explicit widths. */
  rows?: number | DocCardRow[];
  /** Two-column table (default) or full-width prose lines. */
  layout?: "table" | "prose";
  width?: number;
  height?: number;
};

export type Beat = { typingStart: number; bubbleStart: number };

/**
 * The timeline. One cursor accumulation, and everything downstream — the
 * animation, the chapter markers, the rail timestamps — reads off it.
 *
 * Nothing outside this function may compute an absolute time. Retime a message
 * and the bubble, its chapter and its rail entry all move together; that
 * coupling is the whole reason this file exists.
 */
export const buildSchedule = (messages: Message[], intro: number): Beat[] => {
  let cursor = intro;
  return messages.map((message) => {
    const typingStart = cursor;
    const bubbleStart = typingStart + message.typingDur;
    cursor = bubbleStart + message.dwell;
    return { typingStart, bubbleStart };
  });
};

/** Where the conversation ends: the last bubble plus its dwell, in seconds. */
export const scheduleEnd = (messages: Message[], schedule: Beat[]): number => {
  const last = messages.length - 1;
  if (last < 0) return 0;
  return schedule[last].bubbleStart + messages[last].dwell;
};

/**
 * A complete video's timing. `duration` is derived from the script plus a tail
 * for the loop fade-out, so it can never be shorter than the conversation —
 * the failure the original brief could only warn about.
 */
export type ChatScript = {
  messages: Message[];
  intro: number;
  schedule: Beat[];
  /** Seconds. */
  duration: number;
  fps: number;
};

export const FPS = 30;
/** Dead air before the first message is typed. */
export const DEFAULT_INTRO = 1.2;
/** Silence after the last dwell, so the loop fade-out has room to land. */
export const DEFAULT_TAIL = 0.7;

export const buildScript = (
  messages: Message[],
  opts: { intro?: number; tail?: number; fps?: number } = {},
): ChatScript => {
  const intro = opts.intro ?? DEFAULT_INTRO;
  const schedule = buildSchedule(messages, intro);
  const tail = opts.tail ?? DEFAULT_TAIL;
  return {
    messages,
    intro,
    schedule,
    duration: scheduleEnd(messages, schedule) + tail,
    fps: opts.fps ?? FPS,
  };
};

/**
 * Chapters for the follow-along rail, one per message, opening when that
 * message starts being typed. The first is pulled back to frame 0 so the rail
 * covers the opening dead air.
 */
export const chaptersFrom = (script: ChatScript): VideoChapter[] =>
  script.messages.map((message, index) => ({
    ...message.chapter,
    from:
      index === 0
        ? 0
        : Math.round(script.schedule[index].typingStart * script.fps),
  }));

/** Frame count for the composition. */
export const durationInFrames = (script: ChatScript) =>
  Math.round(script.duration * script.fps);

/**
 * A still that shows the payoff. Frame 0 is a blank fade-in and reads as a
 * broken player, so this lands a beat after a chosen bubble arrives — by
 * default the second one, which is Twiga's first answer.
 */
export const posterFrame = (script: ChatScript, messageIndex = 1) => {
  const index = Math.min(messageIndex, script.schedule.length - 1);
  return Math.round((script.schedule[index].bubbleStart + 1) * script.fps);
};
