"use client";

import * as React from "react";
import { AlertTriangle, Check } from "lucide-react";

import type { SessionEntry } from "@/lib/telemetry";
import { formatMinutes, gradeLabel, subjectLabel, TOOL_LABELS } from "@/lib/telemetry-format";
import { cn } from "@/lib/utils";
import { td, th } from "@/components/admin/telemetry/shared";


/** Recent / longest sessions with a two-way toggle. No message text is shown. */
export function SessionLog({ recent, longest }: { recent: SessionEntry[]; longest: SessionEntry[] }) {
  const [view, setView] = React.useState<"recent" | "longest">("recent");
  const rows = view === "recent" ? recent : longest;

  return (
    <div>
      <div className="mb-2 flex gap-1" role="group" aria-label="Sessions shown">
        {(["recent", "longest"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={cn(
              "h-7 rounded-md border px-2.5 text-xs font-medium",
              view === v
                ? "border-green-600 bg-green-600 text-white"
                : "bg-white text-slate-700 hover:bg-green-50"
            )}
          >
            {v === "recent" ? "Most recent" : "Longest"}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b">
              <th className={th}>Started (EAT)</th>
              <th className={th}>Teacher</th>
              <th className={th}>Subject and grade</th>
              <th className={th}>What Twiga did</th>
              <th className={`${th} text-right`}>Messages</th>
              <th className={`${th} text-right`}>Length</th>
              <th className={`${th} text-right`}>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.started}-${r.teacher}-${i}`} className="border-b last:border-0 hover:bg-green-50/40">
                <td className={`${td} whitespace-nowrap`}>{r.started}</td>
                <td className={`${td} font-medium text-slate-900`}>{r.teacher}</td>
                <td className={td}>
                  {r.subjects.length === 0 ? (
                    <span className="text-muted-foreground">–</span>
                  ) : (
                    r.subjects
                      .map((sg) => {
                        const [subject, grade] = sg.split(":");
                        return `${subjectLabel(subject)} · ${gradeLabel(grade)}`;
                      })
                      .join(", ")
                  )}
                </td>
                <td className={td}>
                  {r.tools.length === 0 ? (
                    <span className="text-muted-foreground">Chat only</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {r.tools.map((t) => (
                        <span key={t} className="rounded-full border border-green-200 bg-green-50 px-1.5 py-px text-[10.5px] text-green-800">
                          {TOOL_LABELS[t] ?? t}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className={`${td} text-right`}>{r.messages}</td>
                <td className={`${td} text-right whitespace-nowrap`}>{formatMinutes(r.minutes)}</td>
                <td className={`${td} text-right`}>
                  {r.hadFailure ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600">
                      <AlertTriangle className="h-3 w-3" />
                      Failure
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-green-700">
                      <Check className="h-3 w-3" />
                      OK
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
