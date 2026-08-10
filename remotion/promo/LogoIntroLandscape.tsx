import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { clamp01, easeInOut, easeOutCubic, lerp } from "../shared/visuals";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ABSORB } from "./timeline";

const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

// Intro beat, landscape (1920×1080): Twiga logo reveals + enlarges to a hero
// app-logo (with its title), then shrinks + travels into the top-right corner of
// a WhatsApp icon — landing as the unread-message badge. Finally the badge
// slides back to centre and tucks BEHIND the icon: Twiga disappears into
// WhatsApp, and the scene ends on the icon alone.
//
// Motion is PHYSICS-BASED: every item is driven by its own Remotion spring() so
// each move has one natural accelerate→settle. Timings + spring feel are tunable
// per item in MOTION below.

// ---- LAYOUT (16:9) ----
// The lockup sits above centre while the title is on screen, then the group
// settles to true centre once the title clears — so the closing frame (icon
// alone) is dead-centred.
const CX = 960;
const CY_HERO = 470; // logo centre while the title lockup is up
const CY_REST = 540; // logo/icon centre after the title clears
const CY_END = 432; // icon centre for the ending, with the closing line below

const L0 = 300; // layout px of the logo box (visual size = L0 * scale)
const WA = 288; // WhatsApp icon layout px
const BADGE_X = 142; // badge offset to WA icon top-right corner
const BADGE_Y = -142;

const S_HERO = 440 / L0; // ~1.467  hero app-logo scale (sized for 1080 height)
const S_BADGE = 112 / L0; // ~0.373 final badge scale

// Hand-off geometry. The badge first hops straight up until it is entirely
// clear of the icon's box (badge radius 56 + its 12px ring = 68, icon half-height
// 144 → 220 clears it with room to spare), so the z-flip below happens while
// nothing overlaps and is therefore invisible. Only then does it dive back down
// into the icon and get progressively swallowed by it.
const HOP_Y = -220;
const HOP = 0.3; // fraction of the hand-off spent on the upward hop

// Per-item motion. start = seconds; damping/stiffness/mass = spring feel.
// Lower damping = more overshoot/pop; higher = calmer settle.
const MOTION = {
  // logo appears + grows to hero in one continuous spring (gentle pop)
  logoIn: { start: 0.3, damping: 13, stiffness: 84, mass: 1 },
  // logo shrinks + travels to the badge corner (settles onto the corner)
  morph: { start: 2.9, damping: 15, stiffness: 72, mass: 1 },
  // title + subtitle rise-in, subtitle staggered a touch later
  title: { start: 0.95, damping: 17, stiffness: 120, mass: 1 },
  subtitle: { start: 1.12, damping: 17, stiffness: 120, mass: 1 },
  // WhatsApp icon pops in as the logo leaves centre
  waIcon: { start: 3.0, damping: 13, stiffness: 94, mass: 1 },
} as const;

// title fade-out window (opacity only — before the morph)
const TITLE_OUT = { start: 2.6, dur: 0.55 };
// the lockup group recentres over the same window the title leaves on
const SETTLE = { start: 2.7, dur: 0.9 };
// white ring around the badge (reads as an app-icon notification dot)
const RING = { start: 3.5, dur: 0.5 };
// the icon's reaction to swallowing the badge: swell, bloom, one outward ring
const ABSORB_SWELL = 0.55; // seconds, 1 → 1.055 → 1
const ABSORB_RIPPLE = 1.0; // seconds for the ring to push out and fade

type SpringCfg = { start: number; damping: number; stiffness: number; mass: number };

export const LogoIntroLandscape: React.FC<{
  opacity: number;
  /** 0→1 hand-off: badge hops off the corner and melts into the WhatsApp icon. */
  morph?: number;
  /** 0→1 ending reframe: the icon rises to make room for the closing line. */
  lift?: number;
}> = ({ opacity, morph = 0, lift = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // ---- HAND-OFF (0→1) ----
  // The badge never dissolves — it is *occluded*. A small anticipation hop lifts
  // it clear of the icon, then it dives back down into the icon and the icon
  // eats it edge-first. Purely geometric: no opacity trickery, so it really does
  // look like Twiga going behind WhatsApp.
  const mo = clamp01(morph);
  const hop = easeInOut(clamp01(mo / HOP)); // up and clear of the icon
  const dive = easeInOut(clamp01((mo - HOP) / (1 - HOP))); // down, behind it
  // z-flip fires at the top of the hop, while there is no overlap to give it away
  const behind = mo >= HOP;

  const sp = (c: SpringCfg) =>
    spring({
      frame: frame - Math.round(c.start * fps),
      fps,
      config: { damping: c.damping, stiffness: c.stiffness, mass: c.mass },
    });

  // ---- GROUP SETTLE + ENDING LIFT ----
  // logo + icon share this offset, so the badge stays locked to the corner
  // while the whole lockup drifts down to centre. The ending lift then raises
  // the icon off centre to open space for the closing line beneath it.
  const groupY =
    lerp(
      0,
      CY_REST - CY_HERO,
      easeInOut(clamp01((t - SETTLE.start) / SETTLE.dur)),
    ) + lerp(0, CY_END - CY_REST, easeInOut(clamp01(lift)));

  // ---- LOGO ----
  // entrance: one spring from tiny → hero (settles ~1.7s, mild overshoot pop)
  const enter = sp(MOTION.logoIn);
  const heroScale = interpolate(enter, [0, 1], [0.16, S_HERO]);
  const logoOpacity = clamp01((t - MOTION.logoIn.start) / 0.42);

  // morph: hero → badge. Position clamped (no corner overshoot); scale keeps a
  // hair of the spring's settle for a soft landing pop.
  const introMorph = sp(MOTION.morph);
  const morphPos = clamp01(introMorph);
  const scale = lerp(heroScale, S_BADGE, introMorph);
  const offX = lerp(0, BADGE_X, morphPos);
  const offY = lerp(0, BADGE_Y, morphPos);

  // hand-off: hop up off the corner, then dive down into the icon.
  const hopY = lerp(offY, HOP_Y, hop);
  const badgeX = lerp(offX, 0, dive);
  const badgeY = lerp(hopY, 0, dive);
  // The melt. Occlusion alone clips the badge against a hard edge, which reads
  // as "hidden", not "absorbed". These curves make it dissolve INTO the app:
  // it collapses inwards, stretches along its line of travel as it's drawn in
  // (a squash-and-stretch bump, peaking mid-melt), goes soft, and thins out.
  //
  // The window matters: the badge is fully behind the tile by dive ≈ 0.55, so
  // the melt is packed into 0.15→0.65 — everything happens while you can still
  // see it. Weighted any later and the effect plays out entirely off-screen.
  const melt = easeInOut(clamp01((dive - 0.15) / 0.5));
  const badgeScale = lerp(scale, S_BADGE * 0.35, melt);
  const stretchY = 1 + 0.3 * Math.sin(Math.PI * melt);
  const badgeBlur = 7 * melt * melt;
  const badgeAlpha = 1 - 0.55 * clamp01((melt - 0.5) / 0.5);

  // ---- GLOW (opacity only) ----
  const glow =
    clamp01((t - MOTION.logoIn.start) / 0.6) *
    (1 - clamp01((t - MOTION.morph.start) / 0.7)) *
    0.9;

  // ---- TITLE + SUBTITLE ----
  const titleOut = 1 - clamp01((t - TITLE_OUT.start) / TITLE_OUT.dur);
  const tIn = sp(MOTION.title);
  const titleY = interpolate(tIn, [0, 1], [40, 0]);
  const titleOpacity = clamp01((t - MOTION.title.start) / 0.4) * titleOut;
  const sInS = sp(MOTION.subtitle);
  const subY = interpolate(sInS, [0, 1], [34, 0]);
  const subOpacity = clamp01((t - MOTION.subtitle.start) / 0.4) * titleOut;

  // ---- WHATSAPP ICON ----
  // Stays a WhatsApp icon end-to-end (no bubble morph): this scene's beat is
  // "Twiga went into WhatsApp", so WhatsApp is what's left standing.
  const wa = sp(MOTION.waIcon);
  const waOpacity = clamp01((t - MOTION.waIcon.start) / 0.34);

  // ---- ABSORB REACTION ----
  // The app takes the message: one soft swell, a green bloom behind the tile,
  // and a single ring pushing outwards. This is what sells the badge as having
  // gone *into* the icon rather than merely behind it.
  const swellP = clamp01((t - ABSORB) / ABSORB_SWELL);
  const swell = Math.sin(Math.PI * swellP) * 0.055;
  const waScale = interpolate(wa, [0, 1], [0.5, 1]) * (1 + swell);
  const bloom = Math.sin(Math.PI * clamp01((t - ABSORB) / 0.9));
  const rippleP = clamp01((t - ABSORB) / ABSORB_RIPPLE);
  // Born already detached from the tile — starting flush at scale 1 would read
  // as a stroke drawn on the icon rather than a wave leaving it.
  const rippleScale = lerp(1.08, 2.15, easeOutCubic(rippleP));
  const rippleAlpha =
    clamp01(rippleP / 0.08) * (1 - rippleP) * (rippleP > 0 ? 0.55 : 0);

  // ---- BADGE RING (opacity only) ----
  // Held all the way through the hand-off: the white rim is what separates the
  // badge from the green tile while it's being swallowed. It goes behind the
  // icon with everything else.
  const ring = clamp01((t - RING.start) / RING.dur);
  const logoShadow =
    `0 30px 70px -24px rgba(40,44,80,0.38), ` +
    `0 0 0 12px rgba(255,255,255,${(ring * 0.96).toFixed(3)})`;

  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      {/* green brand glow behind the hero logo */}
      <div
        style={{
          position: "absolute",
          left: CX,
          top: CY_HERO + groupY,
          width: 820,
          height: 820,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%,rgba(37,211,102,0.30),rgba(37,211,102,0) 62%)",
          opacity: glow,
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />

      {/* absorb bloom — green light swelling out of the tile as it takes the
          message. Behind the icon, so it only shows as a halo. */}
      {bloom > 0.001 && (
        <div
          style={{
            position: "absolute",
            left: CX,
            top: CY_HERO + groupY,
            width: 720,
            height: 720,
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%,rgba(37,211,102,0.42),rgba(37,211,102,0) 60%)",
            opacity: bloom,
            filter: "blur(10px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* absorb ripple — one squircle ring in the icon's own shape, pushed
          outwards and faded. Reads as the impact of the message landing. */}
      {rippleAlpha > 0.002 && (
        <div
          style={{
            position: "absolute",
            left: CX,
            top: CY_HERO + groupY,
            width: WA,
            height: WA,
            transform: `translate(-50%,-50%) scale(${rippleScale.toFixed(3)})`,
            borderRadius: WA * 0.225,
            border: "3px solid rgba(37,211,102,1)",
            opacity: rippleAlpha,
            pointerEvents: "none",
          }}
        />
      )}

      {/* WhatsApp app icon. Sits ABOVE the badge in z once the hand-off starts,
          so the Twiga badge dives in behind it and is occluded — it disappears
          *into* the WhatsApp logo rather than dissolving on top of it. */}
      {waOpacity > 0.001 && (
        <div
          style={{
            position: "absolute",
            left: CX,
            top: CY_HERO + groupY,
            zIndex: 2,
            transform: "translate(-50%,-50%)",
          }}
        >
          <WhatsAppIcon size={WA} scale={waScale} opacity={waOpacity} />
        </div>
      )}

      {/* Twiga logo → becomes the message badge → dives behind the icon.
          Above the icon (z:3) while it reads as a corner badge; drops behind
          (z:1) at the top of the anticipation hop, where nothing overlaps. */}
      <div
        style={{
          position: "absolute",
          left: CX,
          top: CY_HERO + groupY,
          zIndex: behind ? 1 : 3,
          width: L0,
          height: L0,
          transform: `translate(-50%,-50%) translate(${badgeX.toFixed(
            2,
          )}px,${badgeY.toFixed(2)}px) scale(${badgeScale.toFixed(
            4,
          )},${(badgeScale * stretchY).toFixed(4)})`,
          transformOrigin: "center",
          opacity: logoOpacity * badgeAlpha,
          filter: badgeBlur > 0.01 ? `blur(${badgeBlur.toFixed(2)}px)` : undefined,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: logoShadow,
          }}
        >
          <img
            src={staticFile("promo/twiga-logo.png")}
            alt="Twiga"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              // zoom in a touch so the emblem's thin white margin is pushed
              // outside the circular clip (no white halo around the logo).
              transform: "scale(1.11)",
            }}
          />
        </div>
      </div>

      {/* title lockup below the hero logo — springs in, fades before the morph */}
      {titleOpacity > 0.001 && (
        <div
          style={{
            position: "absolute",
            left: CX,
            top: 758 + groupY,
            width: "100%",
            textAlign: "center",
            fontFamily: FONT,
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "#0d5c4c",
              opacity: titleOpacity,
              transform: `translateY(${titleY.toFixed(2)}px)`,
            }}
          >
            Twiga
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 34,
              fontWeight: 400,
              letterSpacing: "0.02em",
              color: "#6e675c",
              opacity: subOpacity,
              transform: `translateY(${subY.toFixed(2)}px)`,
            }}
          >
            for teachers
          </div>
        </div>
      )}
    </div>
  );
};
