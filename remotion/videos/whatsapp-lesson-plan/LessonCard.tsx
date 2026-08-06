import React from "react";
import { CARD_ROWS } from "./data";

// The "ANDALIO LA SOMO" lesson-plan card sent as an image bubble.
export const LessonCard: React.FC = () => {
  return (
    <div
      style={{
        width: 330,
        height: 418,
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
          background: "linear-gradient(135deg,#008069,#25d366)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 20px",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.4px" }}>
          LESSON PLAN
        </div>
        <div style={{ fontSize: 12, opacity: 0.86, marginTop: 3 }}>
          Mathematics &middot; Algebra &middot; Form 1
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {CARD_ROWS.map((row, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              borderBottom:
                i < CARD_ROWS.length - 1 ? "1px solid #eef0f5" : undefined,
            }}
          >
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
              <div
                style={{
                  height: 8,
                  width: `${row.label}%`,
                  borderRadius: 2,
                  background: "#dfe2ec",
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                padding: "11px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 7,
              }}
            >
              <div
                style={{
                  height: 7,
                  width: `${row.lineA}%`,
                  borderRadius: 2,
                  background: "#e9ebf2",
                }}
              />
              <div
                style={{
                  height: 7,
                  width: `${row.lineB}%`,
                  borderRadius: 2,
                  background: "#eef0f5",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
