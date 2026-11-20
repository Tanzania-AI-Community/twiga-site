import { BookOpen } from "lucide-react";

import { getGradeBreakdown, getSubjects, gradeRange, rangeLabel, subjectLabel } from "@/lib/telemetry";
import { SubjectsTableClient } from "@/components/admin/telemetry/SubjectsTableClient";
import { EmptyState, TelemetryCard } from "@/components/admin/telemetry/shared";

/**
 * One row per subject set up in Twiga: grades, onboarded teachers, activity,
 * retention, textbook use and the longest session. Below: subjects set up
 * without teachers, and subjects Twiga knows that aren't set up at all.
 */
export async function SubjectsTable({ asOf, from = "" }: { asOf: string; from?: string }) {
  const [{ rows, notSetUp }, grades] = await Promise.all([getSubjects(asOf, from), getGradeBreakdown(asOf, from)]);
  const withTeachers = rows.filter((r) => r.teachers > 0);
  const noTeachers = rows.filter((r) => r.teachers === 0);

  return (
    <TelemetryCard
      icon={<BookOpen className="h-4 w-4" />}
      title="Subjects"
      description={`Teachers registered ${rangeLabel(from, asOf)}; textbook help and sessions in the same range`}
      infoKey="tel_subjects"
    >
      {withTeachers.length === 0 ? (
        <EmptyState title="No subjects chosen yet" hint="Subjects appear once teachers finish onboarding." />
      ) : (
        <SubjectsTableClient rows={withTeachers} grades={grades} />
      )}

      {(noTeachers.length > 0 || notSetUp.length > 0) && (
        <div className="mt-4 grid gap-3 border-t pt-3 sm:grid-cols-2">
          {noTeachers.length > 0 && (
            <div>
              <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Set up, but no teachers
              </div>
              <div className="flex flex-wrap gap-1.5">
                {noTeachers.map((s) => (
                  <span key={s.subject} className="rounded-full border border-yellow-200 bg-yellow-50 px-2 py-0.5 text-xs text-yellow-800">
                    {subjectLabel(s.subject)}
                    {s.grades.length > 0 && <span className="text-yellow-700/70"> · {gradeRange(s.grades)}</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
          {notSetUp.length > 0 && (
            <div>
              <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Known to Twiga, not set up
              </div>
              <div className="flex flex-wrap gap-1.5">
                {notSetUp.map((s) => (
                  <span key={s} className="rounded-full border bg-gray-50 px-2 py-0.5 text-xs text-slate-600">
                    {subjectLabel(s)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </TelemetryCard>
  );
}
