import React from "react";
import type { DocCardRow, DocCardSpec } from "./schedule";
import { COLOR } from "./tokens";

/**
 * The document bubble: a lesson plan, an exam paper, a marking scheme, a
 * printable worksheet. Everything Twiga sends as an attachment.
 *
 * The body is a *skeleton*, not readable text, and that is deliberate — a
 * legible document at bubble scale would be either unreadable or a lie about
 * what the bot produced. The header carries the meaning; the skeleton says
 * "structured document" and gets out of the way.
 */
export const DocCard: React.FC<{ spec: DocCardSpec }> = ({ spec }) => {
  const width = spec.width ?? 330;
  const height = spec.height ?? 418;
  const rows = resolveRows(spec.rows ?? 5);
  const prose = spec.layout === "prose";

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "inset 0 0 0 1px rgba(20,22,40,0.07)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 62,
          flex: "0 0 62px",
          background: COLOR.brandRamp,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          color: "#fff",
        }}
      >
        {/* The header is a fixed 62px, so both lines are clamped to one line
            each and ellipsised. A long lesson title used to wrap and crowd the
            badge, which every video would otherwise have to discover and work
            around by shortening its own copy. */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.4px",
              ...ONE_LINE,
            }}
          >
            {spec.title}
          </div>
          <div
            style={{ fontSize: 12, opacity: 0.86, marginTop: 3, ...ONE_LINE }}
          >
            {spec.subtitle}
          </div>
        </div>
        {spec.badge && (
          <div
            style={{
              flex: "0 0 auto",
              marginLeft: 10,
              padding: "4px 9px",
              borderRadius: 6,
              background: "rgba(255,255,255,0.22)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.6px",
            }}
          >
            {spec.badge}
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {rows.map((row, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              borderBottom:
                i < rows.length - 1 ? "1px solid #eef0f5" : undefined,
            }}
          >
            {!prose && (
              <div
                style={{
                  width: 104,
                  flex: "0 0 104px",
                  borderRight: "1px solid #eef0f5",
                  padding: "11px 14px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Bar width={row.label} height={8} color="#dfe2ec" />
              </div>
            )}
            <div
              style={{
                flex: 1,
                padding: prose ? "11px 20px" : "11px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 7,
              }}
            >
              <Bar width={row.lineA} height={7} color="#e9ebf2" />
              <Bar width={row.lineB} height={7} color="#eef0f5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ONE_LINE: React.CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const Bar: React.FC<{ width: number; height: number; color: string }> = ({
  width,
  height,
  color,
}) => (
  <div
    style={{
      height,
      width: `${width}%`,
      borderRadius: 2,
      background: color,
    }}
  />
);

/**
 * Row widths from a row count. Deterministic — a hash of the index, never
 * `Math.random()`, so every frame of every render is identical. Varied enough
 * that the skeleton does not read as a barcode.
 */
function resolveRows(rows: number | DocCardRow[]): DocCardRow[] {
  if (Array.isArray(rows)) return rows;
  return Array.from({ length: rows }, (_, i) => ({
    label: 50 + Math.round(hash(i * 3 + 1) * 24),
    lineA: 78 + Math.round(hash(i * 3 + 2) * 16),
    lineB: 46 + Math.round(hash(i * 3 + 3) * 26),
  }));
}

const hash = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};
