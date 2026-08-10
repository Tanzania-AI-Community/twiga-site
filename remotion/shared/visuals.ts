import type { CSSProperties } from "react";
import { BUBBLE, COLOR, CONTENT_WIDTH } from "./tokens";

export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export type BubbleOpts = {
  maxWidth?: string;
  fontSize?: string;
  lineHeight?: string;
};

/**
 * A chat bubble. `accent` = outgoing (the teacher), which is the green one with
 * its tail on the bottom right.
 *
 * maxWidth is clamped to the column's content width. A wider bubble would wrap
 * differently in the measuring layer than on screen and get cropped, and that
 * failure is invisible until someone writes one long enough to trip it.
 */
export const bubbleVisual = (
  accent: boolean,
  opts: BubbleOpts = {},
): CSSProperties => ({
  display: "inline-block",
  maxWidth: clampWidth(opts.maxWidth) ?? BUBBLE.maxWidth,
  padding: BUBBLE.padding,
  borderRadius: `${BUBBLE.radius}px`,
  borderBottomRightRadius: accent
    ? `${BUBBLE.tailRadius}px`
    : `${BUBBLE.radius}px`,
  borderBottomLeftRadius: accent
    ? `${BUBBLE.radius}px`
    : `${BUBBLE.tailRadius}px`,
  fontSize: opts.fontSize || BUBBLE.fontSize,
  lineHeight: opts.lineHeight || BUBBLE.lineHeight,
  fontWeight: 400,
  letterSpacing: "0.1px",
  whiteSpace: "pre-wrap",
  textAlign: "left",
  background: accent ? COLOR.outgoing : COLOR.incoming,
  color: COLOR.bubbleText,
  boxShadow: BUBBLE.shadow,
  wordBreak: "break-word",
});

/**
 * The frame around a card sent as an image/document bubble.
 *
 * `accent` tints it like any other outgoing bubble. Without it an attachment
 * the *teacher* sends renders in Twiga's white, so the only thing separating a
 * sent document from a received one is which edge it sits against — which is
 * not how WhatsApp draws it, and reads as a bug the moment both appear in one
 * video.
 */
export const imgVisual = (accent = false): CSSProperties => ({
  display: "inline-block",
  padding: "7px",
  borderRadius: "26px",
  background: accent ? COLOR.outgoing : COLOR.incoming,
  boxShadow:
    "0 6px 18px -7px rgba(40,44,80,0.18), 0 1px 4px rgba(40,44,80,0.08)",
});

/**
 * WhatsApp's own grey chrome: a notice from the client, not from a speaker.
 *
 * `divider` is the centred date pill ("13 July"). It is smaller, tighter and
 * fully rounded, because it has to read as a seam in the thread rather than as
 * a short message somebody sent — a gap of days is only convincing if the thing
 * announcing it clearly belongs to WhatsApp.
 */
export const systemVisual = (divider = false): CSSProperties => ({
  display: "inline-block",
  maxWidth: BUBBLE.maxWidth,
  padding: divider ? "10px 22px" : "16px 24px",
  borderRadius: divider ? "999px" : `${BUBBLE.radius}px`,
  fontSize: divider ? "21px" : "23px",
  letterSpacing: divider ? "0.6px" : undefined,
  lineHeight: "1.4",
  fontStyle: divider ? "normal" : "italic",
  whiteSpace: "pre-wrap",
  textAlign: "center",
  background: COLOR.systemBackground,
  color: COLOR.systemText,
  wordBreak: "break-word",
});

export const tsVisual = (accent: boolean): CSSProperties => ({
  fontSize: "15px",
  color: COLOR.timestamp,
  letterSpacing: "0.2px",
  padding: accent ? "8px 10px 0 0" : "8px 0 0 10px",
});

/** px string → clamped px string. Anything unparseable is passed through. */
function clampWidth(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const px = Number.parseFloat(value);
  if (!Number.isFinite(px)) return value;
  return `${Math.min(px, CONTENT_WIDTH)}px`;
}
