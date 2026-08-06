import type { CSSProperties } from "react";
import { ACCENT, GRAY } from "./data";

export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const bubbleVisual = (
  accent: boolean,
  opts: { maxWidth?: string; fontSize?: string; lineHeight?: string } = {},
): CSSProperties => ({
  display: "inline-block",
  maxWidth: opts.maxWidth || "640px",
  padding: "18px 26px",
  borderRadius: "32px",
  borderBottomRightRadius: accent ? "10px" : "32px",
  borderBottomLeftRadius: accent ? "32px" : "10px",
  fontSize: opts.fontSize || "29px",
  lineHeight: opts.lineHeight || "1.36",
  fontWeight: 400,
  letterSpacing: "0.1px",
  whiteSpace: "pre-wrap",
  textAlign: "left",
  background: accent ? ACCENT : GRAY,
  color: "#111b21",
  boxShadow:
    "0 4px 14px -5px rgba(11,20,26,0.16), 0 1px 2px rgba(11,20,26,0.10)",
  wordBreak: "break-word",
});

export const imgVisual = (): CSSProperties => ({
  display: "inline-block",
  padding: "7px",
  borderRadius: "26px",
  background: GRAY,
  boxShadow:
    "0 6px 18px -7px rgba(40,44,80,0.18), 0 1px 4px rgba(40,44,80,0.08)",
});

export const tsVisual = (accent: boolean): CSSProperties => ({
  fontSize: "15px",
  color: "#9aa0ad",
  letterSpacing: "0.2px",
  padding: accent ? "8px 10px 0 0" : "8px 0 0 10px",
});
