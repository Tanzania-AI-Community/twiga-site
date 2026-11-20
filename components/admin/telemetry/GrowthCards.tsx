import { Activity, CalendarDays, TrendingUp } from "lucide-react";

import { CHART_COLORS, capitalize, chartRangeLabel, dayLabel, getGeography, getGrowth, monthLabel, rangeLabel } from "@/lib/telemetry";
import { MonthlyBars, RegistrationsWithFollowUp } from "@/components/admin/telemetry/TelemetryCharts";
import { EmptyState, TelemetryCard, td, th } from "@/components/admin/telemetry/shared";

/** Last 12 months of new teachers (finished vs not) and of active teachers. */
export async function GrowthCharts({ asOf, from = "" }: { asOf: string; from?: string }) {
  const { months } = await getGrowth(asOf, from);
  const recent = months;
  const regData = recent.map((m) => ({
    month: m.month,
    label: monthLabel(m.month, true),
    finished: m.finished,
    notFinished: m.registered - m.finished,
  }));
  const actData = recent.map((m) => ({ label: monthLabel(m.month, true), active: m.activeTeachers }));

  return (
    <>
      <TelemetryCard
        icon={<TrendingUp className="h-4 w-4" />}
        title="New teachers per month"
        description={`${chartRangeLabel(from, asOf)} · by whether they finished onboarding`}
        infoKey="tel_registrations"
      >
        {recent.length === 0 ? (
          <EmptyState title="No registrations yet" hint="Months appear once teachers register." />
        ) : (
          <RegistrationsWithFollowUp asOf={asOf} from={from} data={regData} />
        )}
      </TelemetryCard>
      <TelemetryCard
        icon={<Activity className="h-4 w-4" />}
        title="Active teachers per month"
        description={`${chartRangeLabel(from, asOf)} · onboarded teachers who messaged Twiga that month`}
        infoKey="tel_active_monthly"
      >
        {recent.length === 0 ? (
          <EmptyState title="No activity yet" hint="Months appear once teachers use Twiga." />
        ) : (
          <MonthlyBars data={actData} series={[{ key: "active", name: "Active teachers", color: CHART_COLORS.primary }]} />
        )}
      </TelemetryCard>
    </>
  );
}

/** The busiest registration days and how many of those teachers finished onboarding. */
export async function PeaksCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const [{ peaks }, { peakRegions }] = await Promise.all([getGrowth(asOf, from), getGeography(asOf, from)]);
  const regionsOf = (day: string) =>
    peakRegions
      .filter((r) => r.day === day)
      .slice(0, 2)
      .map((r) => `${r.region} ${r.teachers}`)
      .join(", ");

  return (
    <TelemetryCard
      icon={<CalendarDays className="h-4 w-4" />}
      title="Registration peaks"
      description={`${capitalize(rangeLabel(from, asOf))} · usually trainings or outreach drives`}
      infoKey="tel_peaks"
    >
      {peaks.length === 0 ? (
        <EmptyState title="No registrations yet" hint="Peaks appear once teachers register." />
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className={th}>Day</th>
              <th className={`${th} text-right`}>New</th>
              <th className={th}>Main regions</th>
              <th className={`${th} text-right`}>Finished onboarding</th>
            </tr>
          </thead>
          <tbody>
            {peaks.map((p) => (
              <tr key={p.day} className="border-b last:border-0">
                <td className={`${td} whitespace-nowrap`}>{dayLabel(p.day)}</td>
                <td className={`${td} text-right font-semibold text-slate-900`}>{p.registered}</td>
                <td className={`${td} max-w-[260px] truncate text-[11px] text-muted-foreground`} title={regionsOf(p.day)}>
                  {regionsOf(p.day)}
                </td>
                <td className={`${td} text-right`}>
                  {p.finished}
                  <span className="ml-1.5 text-[11px] text-muted-foreground">
                    {Math.round((100 * p.finished) / p.registered)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TelemetryCard>
  );
}
