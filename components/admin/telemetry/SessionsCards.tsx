import { Clock, Hourglass, ListChecks, MessagesSquare, Timer, Wrench, AlertTriangle, Users } from "lucide-react";

import { CHART_COLORS, capitalize, formatMinutes, chartRangeLabel, getSessions, monthLabel, rangeLabel, TOOL_LABELS } from "@/lib/telemetry";
import { MetricInfo } from "@/components/admin/MetricInfo";
import { MonthlyBars } from "@/components/admin/telemetry/TelemetryCharts";
import { SessionLog } from "@/components/admin/telemetry/SessionLog";
import { EmptyState, TelemetryCard } from "@/components/admin/telemetry/shared";
import type { MetricInfoKey } from "@/lib/metric-info";
import { getReportingTimeZone } from "@/lib/time-zone-server";

export const ACTIVITY_LABELS: Record<string, string> = {
  chat_only: "Chat only (no tool used)",
  ...TOOL_LABELS,
};

/** "1.5 min", "<1 min", "1 h 54 min". */
const duration = (min: number | null) => formatMinutes(min, true);

/** Headline session figures: all time, with the last 30 days underneath. */
export async function SessionStrip({ asOf, from = "" }: { asOf: string; from?: string }) {
  const { summary: s } = await getSessions(asOf, from);
  const pct = (a: number, b: number) => (b ? ` (${Math.round((100 * a) / b)}%)` : "");
  const tiles: { label: string; value: string; sub: string; icon: React.ReactNode; infoKey: MetricInfoKey }[] = [
    {
      label: "Sessions",
      value: String(s.sessions),
      sub: `${s.sessions30} in the last 30 days`,
      icon: <MessagesSquare className="h-4 w-4 flex-none text-blue-500" />,
      infoKey: "tel_sessions",
    },
    {
      label: "Teachers with a session",
      value: String(s.teachers),
      sub: `${s.teachers30} in the last 30 days`,
      icon: <Users className="h-4 w-4 flex-none text-blue-500" />,
      infoKey: "tel_sessions",
    },
    {
      label: "Typical length",
      value: duration(s.medianMin),
      sub: `median · last 30d ${duration(s.medianMin30)}`,
      icon: <Timer className="h-4 w-4 flex-none text-green-500" />,
      infoKey: "tel_session_length",
    },
    {
      label: "Long sessions",
      value: duration(s.p90Min),
      sub: `1 in 10 last longer · max ${duration(s.maxMin)}`,
      icon: <Hourglass className="h-4 w-4 flex-none text-green-500" />,
      infoKey: "tel_session_length",
    },
    {
      label: "Messages per session",
      value: s.avgMessages.toFixed(1),
      sub: "teacher messages, on average",
      icon: <Clock className="h-4 w-4 flex-none text-green-500" />,
      infoKey: "tel_sessions",
    },
    {
      label: "Used a textbook tool",
      value: `${s.withTools} of ${s.sessions}`,
      sub: `last 30d: ${s.withTools30} of ${s.sessions30}${pct(s.withTools30, s.sessions30)}`,
      icon: <Wrench className="h-4 w-4 flex-none text-purple-500" />,
      infoKey: "tel_session_activity",
    },
    {
      label: "Hit a failure",
      value: `${s.withFailure} of ${s.sessions}`,
      sub: `last 30d: ${s.withFailure30} of ${s.sessions30}${pct(s.withFailure30, s.sessions30)}`,
      icon: <AlertTriangle className="h-4 w-4 flex-none text-red-500" />,
      infoKey: "tel_session_failures",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border shadow-xs sm:grid-cols-4 xl:grid-cols-7">
      {tiles.map((t) => (
        <div key={t.label} className="group relative flex gap-2.5 bg-card px-3.5 py-3">
          <div className="pt-0.5">{t.icon}</div>
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-slate-600">{t.label}</div>
            <div className="text-xl font-bold leading-tight whitespace-nowrap text-slate-900">{t.value}</div>
            <div className="truncate text-[11px] text-muted-foreground">{t.sub}</div>
          </div>
          <MetricInfo infoKey={t.infoKey} />
        </div>
      ))}
    </div>
  );
}

function HBars({
  rows,
}: {
  rows: { label: string; value: number; recent: number; note?: string }[];
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-[170px_1fr_120px] gap-2.5 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
        <span />
        <span>In range</span>
        <span className="text-right">In range · last 30d</span>
      </div>
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[170px_1fr_120px] items-center gap-2.5">
          <span className="truncate text-xs text-slate-900" title={r.note}>
            {r.label}
          </span>
          <div className="h-4 overflow-hidden rounded border bg-gray-50">
            <div className="h-full rounded-r bg-green-600" style={{ width: `${(r.value / max) * 100}%` }} />
          </div>
          <span className="text-right text-xs">
            <span className="font-semibold text-slate-900">{r.value}</span>
            <span className="text-muted-foreground"> · {r.recent}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/** What teachers do in their sessions: which tools ran, or just chat. */
export async function SessionActivityCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const { activities, summary } = await getSessions(asOf, from);
  return (
    <TelemetryCard
      icon={<ListChecks className="h-4 w-4" />}
      title="What happens in a session"
      description={`Sessions ${rangeLabel(from, asOf, tz)} that used each tool. A session can use several.`}
      infoKey="tel_session_activity"
    >
      {summary.sessions === 0 ? (
        <EmptyState title="No sessions yet" hint="Sessions appear once teachers message Twiga." />
      ) : (
        <HBars
          rows={activities.map((a) => ({
            label: ACTIVITY_LABELS[a.activity] ?? a.activity,
            value: a.sessions,
            recent: a.sessions30,
            note: `${a.teachers} teachers`,
          }))}
        />
      )}
    </TelemetryCard>
  );
}

/** How long sessions last, in buckets. */
export async function SessionLengthCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const { lengths, summary } = await getSessions(asOf, from);
  return (
    <TelemetryCard
      icon={<Timer className="h-4 w-4" />}
      title="How long sessions last"
      description={`Sessions ${rangeLabel(from, asOf, tz)}, first to last teacher message`}
      infoKey="tel_session_length"
    >
      {summary.sessions === 0 ? (
        <EmptyState title="No sessions yet" hint="Sessions appear once teachers message Twiga." />
      ) : (
        <HBars rows={lengths.map((l) => ({ label: l.bucket, value: l.sessions, recent: l.sessions30 }))} />
      )}
    </TelemetryCard>
  );
}

/** Sessions per month, split by whether a textbook tool was used. */
export async function SessionMonthsCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const { months } = await getSessions(asOf, from);
  const data = months.map((m) => ({
    label: monthLabel(m.month, true),
    withTools: m.withTools,
    chatOnly: m.sessions - m.withTools,
  }));
  return (
    <TelemetryCard
      icon={<MessagesSquare className="h-4 w-4" />}
      title="Sessions per month"
      description={`${chartRangeLabel(from, asOf, tz)} · by whether Twiga used a textbook tool`}
      infoKey="tel_session_months"
    >
      {data.length === 0 ? (
        <EmptyState title="No sessions yet" hint="Sessions appear once teachers message Twiga." />
      ) : (
        <MonthlyBars
          data={data}
          series={[
            { key: "withTools", name: "Used a textbook tool", color: CHART_COLORS.primary },
            { key: "chatOnly", name: "Chat only", color: CHART_COLORS.light },
          ]}
        />
      )}
    </TelemetryCard>
  );
}

/** Recent and longest sessions, one row each. */
export async function SessionLogCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const { recent, longest } = await getSessions(asOf, from);
  return (
    <TelemetryCard
      icon={<ListChecks className="h-4 w-4" />}
      title="Session log"
      description={`${capitalize(rangeLabel(from, asOf, tz))} · subject and grade, tools used, length and whether anything failed`}
      infoKey="tel_session_log"
    >
      {recent.length === 0 ? (
        <EmptyState title="No sessions yet" hint="Sessions appear once teachers message Twiga." />
      ) : (
        <SessionLog recent={recent} longest={longest} />
      )}
    </TelemetryCard>
  );
}
