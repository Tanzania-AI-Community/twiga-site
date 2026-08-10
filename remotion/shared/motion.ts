import type { CSSProperties } from "react";
import { Easing, interpolate } from "remotion";

/**
 * The motion vocabulary, shared so every video moves the same way.
 *
 * The rule it exists to enforce: **opacity is its own channel, it is never
 * linear, and it never animates alone.** A bubble that fades in on a straight
 * line while a curve moves it reads as two separate events. Here the alpha runs
 * a front-loaded curve over a *shorter* window than the transform, so the
 * element is solid while it is still settling — which is what makes the promo's
 * motion feel filmed rather than tweened.
 *
 * Ported from the promo project's `src/motion/track.ts`, minus the springs:
 * chat rows have `overflow: hidden` and an animated height, so an overshooting
 * entrance would be clipped by its own row. Curves only here, on purpose.
 */
export const CURVE = {
  /** Strong ease-out. The default entrance. */
  entrance: Easing.bezier(0.23, 1, 0.32, 1),
  /** M3 "emphasized" — hero moves. */
  emphasized: Easing.bezier(0.2, 0, 0, 1),
  /** M3 emphasized-accelerate — leaves eagerly. */
  exit: Easing.bezier(0.3, 0, 0.8, 0.15),
  /** M3 emphasized-decelerate — front-loaded, no overshoot. OPACITY ONLY. */
  effects: Easing.bezier(0.05, 0.7, 0.1, 1),
} as const;

export type Pose = { x?: number; y?: number; scale?: number; blur?: number };

export type Track = {
  /** Entrance: `at` seconds, `dur` seconds, and the pose to arrive from. */
  in: { at: number; dur: number; from: Pose; curve?: (n: number) => number };
  /** Exit. Keep `dur` around 60% of the entrance so leaving feels quicker. */
  out?: { at: number; dur: number; to: Pose; curve?: (n: number) => number };
  /** Alpha windows. Default: in = 55% of the entrance, out = 60% of the exit. */
  alpha?: { in?: number; out?: number };
  /** Blur resolves over this fraction of the entrance (default 0.7). */
  blurFrac?: number;
};

const ZERO: Required<Pose> = { x: 0, y: 0, scale: 1, blur: 0 };
const pose = (p: Pose): Required<Pose> => ({ ...ZERO, ...p });
const mix = (a: number, b: number, p: number) => a + (b - a) * p;

const curveAt = (
  t: number,
  at: number,
  dur: number,
  curve: (n: number) => number,
) =>
  interpolate(t, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: curve,
  });

/** Resolve one element's entrance/exit to a style. `t` is scene seconds. */
export const track = (t: number, tr: Track): CSSProperties => {
  const from = pose(tr.in.from);
  const pIn = curveAt(t, tr.in.at, tr.in.dur, tr.in.curve ?? CURVE.entrance);

  const to = tr.out ? pose(tr.out.to) : ZERO;
  const pOut = tr.out
    ? curveAt(t, tr.out.at, tr.out.dur, tr.out.curve ?? CURVE.exit)
    : 0;

  const aIn = tr.alpha?.in ?? tr.in.dur * 0.55;
  const aOut = tr.alpha?.out ?? (tr.out ? tr.out.dur * 0.6 : 0);
  const alphaIn = curveAt(t, tr.in.at, aIn, CURVE.effects);
  // The exit's alpha trails its transform: the element starts leaving, then fades.
  const alphaOut = tr.out
    ? curveAt(t, tr.out.at + (tr.out.dur - aOut), aOut, CURVE.effects)
    : 0;

  const x = mix(from.x, 0, pIn) + mix(0, to.x, pOut);
  const y = mix(from.y, 0, pIn) + mix(0, to.y, pOut);
  const scale = mix(from.scale, 1, pIn) * mix(1, to.scale, pOut);

  // Blur resolves faster than the move, so the focus-pull lands before it settles.
  const blurFrac = tr.blurFrac ?? 0.7;
  const pBlur = curveAt(t, tr.in.at, tr.in.dur * blurFrac, CURVE.effects);
  const blur = mix(from.blur, 0, pBlur) + mix(0, to.blur, pOut);

  return {
    opacity: Number((alphaIn * (1 - alphaOut)).toFixed(4)),
    transform: `translateY(${y.toFixed(2)}px) translateX(${x.toFixed(
      2,
    )}px) scale(${scale.toFixed(4)})`,
    ...(blur > 0.01 ? { filter: `blur(${blur.toFixed(2)}px)` } : {}),
    willChange: "transform, opacity",
  };
};

/**
 * Layout progress: monotonic 0→1, for anything that drives *space* rather than
 * appearance — row heights, depth ranking, the column's scroll offset.
 *
 * Deliberately separate from `track`. Layout must never overshoot or a row's
 * height would exceed its content and the column would jitter.
 */
export const layoutProgress = (t: number, at: number, dur: number) =>
  easeOutCubicClamped((t - at) / dur);

const easeOutCubicClamped = (x: number) => {
  const c = x < 0 ? 0 : x > 1 ? 1 : x;
  return 1 - Math.pow(1 - c, 3);
};
