"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatMinutes, gradeLabel, gradeRange, subjectLabel } from "@/lib/telemetry-format";
import type { ClassExtras, GradeRow, SubjectRow } from "@/lib/telemetry";
import { Ratio, td, th } from "@/components/admin/telemetry/shared";


type Extra = { textbooks: number; exams: number; runs: number; failedRuns: number };
const NO_EXTRA: Extra = { textbooks: 0, exams: 0, runs: 0, failedRuns: 0 };

/** The measure cells shared by subject rows and grade rows. */
function Measures({ r, x, strong }: { r: SubjectRow | GradeRow; x: Extra; strong?: boolean }) {
  return (
    <>
      <td className={cn(td, "text-right", strong ? "font-semibold text-slate-900" : "text-slate-700")}>
        {r.teachers}
      </td>
      <td className={`${td} text-right`}>
        {r.teachers ? <Ratio kept={r.active30} of={r.teachers} min={1} /> : <span className="text-muted-foreground">–</span>}
      </td>
      <td className={`${td} text-right`}>
        <Ratio kept={r.keptW2} of={r.eligibleW2} />
      </td>
      <td className={`${td} text-right`}>
        <Ratio kept={r.keptM2} of={r.eligibleM2} />
      </td>
      <td className={`${td} text-right`}>{r.usingTeachers}</td>
      <td className={`${td} text-right`}>{r.sessions}</td>
      <td className={`${td} text-right`}>{formatMinutes(r.longestMin)}</td>
      <td className={cn(td, "text-right", x.textbooks === 0 && "text-red-600")}>{x.textbooks}</td>
      <td className={`${td} text-right`}>{x.exams}</td>
      <td className={`${td} text-right`}>
        {x.failedRuns === 0 ? (
          <span className="text-muted-foreground">{x.runs ? `0 of ${x.runs}` : "–"}</span>
        ) : (
          <span className="whitespace-nowrap">
            <span className="font-semibold text-red-600">{x.failedRuns}</span>
            <span className="text-muted-foreground"> of {x.runs}</span>
          </span>
        )}
      </td>
    </>
  );
}

/**
 * Subjects with a click-to-expand breakdown per grade. Several subjects can
 * be open at once; "Expand all" opens every subject.
 */
export function SubjectsTableClient({
  rows,
  grades,
  extras,
}: {
  rows: SubjectRow[];
  grades: GradeRow[];
  extras: ClassExtras[];
}) {
  const [open, setOpen] = React.useState<Set<string>>(new Set());
  const bySubject = React.useMemo(() => {
    const map = new Map<string, GradeRow[]>();
    for (const g of grades) map.set(g.subject, [...(map.get(g.subject) ?? []), g]);
    return map;
  }, [grades]);

  // Textbooks, exams and tool runs per grade, and summed per subject.
  const extra = React.useMemo(() => {
    const byGrade = new Map<string, Extra>();
    const bySubj = new Map<string, Extra>();
    for (const e of extras) {
      byGrade.set(`${e.subject}:${e.grade}`, e);
      const t = bySubj.get(e.subject) ?? { ...NO_EXTRA };
      bySubj.set(e.subject, {
        textbooks: t.textbooks + e.textbooks,
        exams: t.exams + e.exams,
        runs: t.runs + e.runs,
        failedRuns: t.failedRuns + e.failedRuns,
      });
    }
    return { byGrade, bySubj };
  }, [extras]);

  const toggle = (subject: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(subject)) next.delete(subject);
      else next.add(subject);
      return next;
    });
  const allOpen = open.size === rows.length;

  return (
    <div className="overflow-x-auto">
      <div className="mb-1 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(rows.map((r) => r.subject)))}
          className="rounded px-1.5 py-0.5 text-[11px] font-medium text-green-700 hover:bg-green-50"
        >
          {allOpen ? "Collapse all" : "Expand all grades"}
        </button>
      </div>
      <table className="w-full min-w-[1080px]">
        <thead>
          <tr className="border-b">
            <th className={th}>Subject</th>
            <th className={th}>Grades set up</th>
            <th className={`${th} text-right`}>Teachers</th>
            <th className={`${th} text-right`}>Active 30d</th>
            <th className={`${th} text-right`}>Back in week 2</th>
            <th className={`${th} text-right`}>Back in month 2</th>
            <th className={`${th} text-right`}>Got textbook help</th>
            <th className={`${th} text-right`}>Sessions</th>
            <th className={`${th} text-right`}>Longest session</th>
            <th className={`${th} text-right`}>Textbooks</th>
            <th className={`${th} text-right`}>Exams</th>
            <th className={`${th} text-right`}>Failed runs</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => {
            const isOpen = open.has(s.subject);
            const subGrades = bySubject.get(s.subject) ?? [];
            return (
              <React.Fragment key={s.subject}>
                <tr
                  className={cn(
                    "cursor-pointer border-b hover:bg-green-50/50",
                    isOpen && "border-b-0 bg-green-50/60"
                  )}
                  onClick={() => toggle(s.subject)}
                >
                  <td className={`${td} font-semibold text-slate-900`}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? "Hide" : "Show"} grades for ${subjectLabel(s.subject)}`}
                      className="inline-flex items-center gap-1 text-left"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(s.subject);
                      }}
                    >
                      <ChevronRight
                        className={cn("h-3.5 w-3.5 flex-none text-green-700 transition-transform", isOpen && "rotate-90")}
                      />
                      {subjectLabel(s.subject)}
                    </button>
                  </td>
                  <td className={`${td} text-muted-foreground`}>
                    {s.grades.length ? gradeRange(s.grades) : <span className="text-red-600">none active</span>}
                  </td>
                  <Measures r={s} x={extra.bySubj.get(s.subject) ?? NO_EXTRA} strong />
                </tr>
                {isOpen &&
                  subGrades.map((g, i) => (
                    <tr
                      key={`${s.subject}-${g.grade}`}
                      className={cn("bg-green-50/60", i === subGrades.length - 1 ? "border-b" : "")}
                    >
                      <td className={`${td} pl-8`}>
                        <span className="border-l-2 border-green-300 pl-2 text-slate-700">{gradeLabel(g.grade)}</span>
                      </td>
                      <td className={td}>
                        {g.active ? (
                          <span className="text-[11px] text-green-700">active</span>
                        ) : (
                          <span className="rounded bg-gray-100 px-1.5 py-px text-[10.5px] text-muted-foreground">
                            switched off
                          </span>
                        )}
                      </td>
                      <Measures r={g} x={extra.byGrade.get(`${g.subject}:${g.grade}`) ?? NO_EXTRA} />
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Click a subject to see each grade. A teacher who teaches several grades counts in each one, so grades can add
        up to more than the subject. Retention shows a dash when fewer than 5 teachers have had the full window.
        Textbooks are the books linked to each grade (red when none); exams and failed runs are in the selected range.
      </p>
    </div>
  );
}
