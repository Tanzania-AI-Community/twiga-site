import { Repeat } from "lucide-react";

import { getRetention, monthLabel, rangeLabel } from "@/lib/telemetry";
import { EmptyState, Ratio, TelemetryCard, td, th } from "@/components/admin/telemetry/shared";

function TooRecent() {
  return <span className="text-[11px] text-muted-foreground">too recent</span>;
}

/** Monthly start groups and how many came back in week 2 and month 2. */
export async function RetentionCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const { cohorts, week2, month2 } = await getRetention(asOf, from);
  const rows = [...cohorts].reverse();

  return (
    <TelemetryCard
      icon={<Repeat className="h-4 w-4" />}
      title="Retention by start month"
      description={`Teachers registered ${rangeLabel(from, asOf)}, by the month of their first message`}
      infoKey="tel_retention"
    >
      {rows.length === 0 ? (
        <EmptyState title="No teachers have started yet" hint="Groups appear after a first message." />
      ) : (
        <div className="max-h-[300px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-card">
              <tr className="border-b">
                <th className={th}>Started</th>
                <th className={`${th} text-right`}>Teachers</th>
                <th className={`${th} text-right`}>Back in week 2</th>
                <th className={`${th} text-right`}>Back in month 2</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.month} className="border-b last:border-0">
                  <td className={td}>{monthLabel(c.month)}</td>
                  <td className={`${td} text-right font-semibold text-slate-900`}>{c.teachers}</td>
                  <td className={`${td} text-right`}>
                    {c.okW2 ? <Ratio kept={c.w2} of={c.teachers} min={1} /> : <TooRecent />}
                  </td>
                  <td className={`${td} text-right`}>
                    {c.okM2 ? <Ratio kept={c.m2} of={c.teachers} min={1} /> : <TooRecent />}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="sticky bottom-0 bg-green-50">
              <tr className="border-t">
                <td className={`${td} font-semibold text-slate-900`}>All finished groups</td>
                <td className={td} />
                <td className={`${td} text-right`}>
                  <Ratio kept={week2.kept} of={week2.of} min={1} />
                </td>
                <td className={`${td} text-right`}>
                  <Ratio kept={month2.kept} of={month2.of} min={1} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </TelemetryCard>
  );
}
