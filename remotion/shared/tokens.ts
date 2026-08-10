/**
 * Design tokens for every guide video.
 *
 * These are WhatsApp's own values. They are shared rather than copied because
 * the videos read as fake the moment they drift apart — a bubble green that is
 * a shade off in one video is more noticeable across a guide track than it
 * would ever be in isolation.
 *
 * Change one of these and every video changes. That is the point.
 */

export const FONT_FAMILY = "'Helvetica Neue',Helvetica,Arial,sans-serif";

export const COLOR = {
  /** Outgoing (teacher) bubble. */
  outgoing: "#d9fdd3",
  /** Incoming (Twiga) bubble. */
  incoming: "#ffffff",
  bubbleText: "#111b21",
  timestamp: "#9aa0ad",
  typingDot: "#73737f",
  canvas: "#e5ddd5",
  backdrop: "linear-gradient(155deg,#efeae2 0%,#e7e0d6 52%,#ded5c8 100%)",
  /** Flat two-stop version of the backdrop, for the loop-fade overlay. */
  backdropFlat: "linear-gradient(155deg,#efeae2,#ded5c8)",
  bloomTopLeft: "rgba(37,211,102,0.18)",
  bloomBottomRight: "rgba(0,128,105,0.16)",
  /** Brand ramp used on card headers and any accent chrome. */
  brandRamp: "linear-gradient(135deg,#008069,#25d366)",
  /** WhatsApp's own client chrome — "this message can't be displayed here". */
  systemBackground: "#f0f2f5",
  systemText: "#667781",
  /** The rule down the left of a quoted block. */
  quoteRule: "#25d366",
} as const;

/**
 * Canvas and column geometry.
 *
 * CONTENT_WIDTH is load-bearing: the hidden measuring layer must be exactly as
 * wide as the rendered column, or bubbles measure at one wrap width and render
 * at another. The original video measured at 820 while rendering at 760, which
 * left long copy one bad line-break away from being silently cropped by the
 * row's `overflow: hidden`. Derived here so the two can never disagree.
 */
export const CANVAS = { width: 1920, height: 1080 } as const;
export const COLUMN = { width: 900, padding: 70 } as const;
export const CONTENT_WIDTH = COLUMN.width - COLUMN.padding * 2; // 760

/** Bubble geometry. `maxWidth` must never exceed CONTENT_WIDTH. */
export const BUBBLE = {
  padding: "18px 26px",
  radius: 32,
  tailRadius: 10,
  fontSize: "29px",
  lineHeight: "1.36",
  maxWidth: `${CONTENT_WIDTH}px`,
  shadow:
    "0 4px 14px -5px rgba(11,20,26,0.16), 0 1px 2px rgba(11,20,26,0.10)",
} as const;

/**
 * Preset for a long structured reply — a syllabus breakdown, a marking scheme.
 * Spread it into a message rather than hand-tuning sizes per bubble; the point
 * of a preset is that every long reply across all the videos looks alike.
 */
export const LONG_MESSAGE = {
  fontSize: "21px",
  lineHeight: "1.4",
  maxWidth: `${CONTENT_WIDTH}px`,
} as const;

export const TYPING = { dotSize: 19, dotGap: 10, padding: "20px 26px" } as const;
