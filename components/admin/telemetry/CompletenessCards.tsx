import { Atom, Bug, CalendarDays, Clock3, MapPin, PauseCircle, Repeat2, Sun } from "lucide-react";

import {
  capitalize,
  chartRangeLabel,
  dayLabel,
  getErrorMessages,
  getGeography,
  getOnboardingDetail,
  getReplySpeed,
  getScienceDemand,
  getUsageTiming,
  monthLabel,
  rangeLabel,
  TOOL_LABELS,
  CHART_COLORS,
} from "@/lib/telemetry";
import { MonthlyBars, MonthlyLines } from "@/components/admin/telemetry/TelemetryCharts";
import { UnfinishedTeachersLink } from "@/components/admin/telemetry/UnfinishedTeachersPanel";
import { EmptyState, Ratio, TelemetryCard, td, th } from "@/components/admin/telemetry/shared";
import { getReportingTimeZone } from "@/lib/time-zone-server";
import { zoneName } from "@/lib/time-zone";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const STAGE: Record<string, string> = { new: "Never gave details", personal_info_submitted: "Stopped at subjects" };

function Stat({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-xl font-bold leading-tight text-slate-900">{value}</div>
      {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function seconds(s: number | null): string {
  if (s === null) return "–";
  return s < 60 ? `${s.toFixed(1)} s` : `${(s / 60).toFixed(1)} min`;
}

/** "Failed to …. Error: … {'error': {…" -> the readable part only. */
function errorLabel(raw: string): string {
  let s = raw.replace(/^\{\s*"error":\s*"/, "").replace(/"\s*\}\s*$/, "");
  const cut = s.search(/\s[{[]|\s-\s\{/);
  if (cut > 0) s = s.slice(0, cut);
  return s.length > 110 ? `${s.slice(0, 107)}…` : s;
}

// ---------------------------------------------------------------------------
// Onboarding & retention
// ---------------------------------------------------------------------------

export async function StuckCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const { stuck } = await getOnboardingDetail(asOf, from);
  const total = stuck.reduce((s, r) => s + r.teachers, 0);
  return (
    <TelemetryCard
      icon={<PauseCircle className="h-4 w-4" />}
      title="Where unfinished teachers stopped"
      description={`Teachers registered ${rangeLabel(from, asOf, tz)} who didn't finish onboarding`}
      infoKey="tel_stuck"
    >
      {total === 0 ? (
        <EmptyState title="Everyone finished onboarding" hint="Nobody in this range is stuck." />
      ) : (
        <>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className={th}>Stopped at</th>
                <th className={th}>Account status</th>
                <th className={`${th} text-right`}>Teachers</th>
              </tr>
            </thead>
            <tbody>
              {stuck.map((r) => (
                <tr key={`${r.stoppedAt}-${r.accountState}`} className="border-b last:border-0">
                  <td className={`${td} text-slate-900`}>{STAGE[r.stoppedAt] ?? r.stoppedAt}</td>
                  <td className={`${td} capitalize`}>{r.accountState.replace(/_/g, " ")}</td>
                  <td className={`${td} text-right`}>
                    <Ratio kept={r.teachers} of={total} min={1} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-auto pt-3 text-[11.5px]">
            <UnfinishedTeachersLink asOf={asOf} from={from} className="font-medium text-green-700">
              {`Open the list of all ${total} to follow up`}
            </UnfinishedTeachersLink>
          </p>
        </>
      )}
    </TelemetryCard>
  );
}

export async function ChurnCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const { churn } = await getOnboardingDetail(asOf, from);
  const hit = churn.find((r) => r.hadFailure);
  const clean = churn.find((r) => !r.hadFailure);
  const rows = [
    { label: "Something failed in their first session", r: hit },
    { label: "First session went fine", r: clean },
  ];
  return (
    <TelemetryCard
      icon={<Repeat2 className="h-4 w-4" />}
      title="Do early failures drive teachers away?"
      description={`Onboarded teachers registered ${rangeLabel(from, asOf, tz)}, started at least 14 days before its end`}
      infoKey="tel_churn"
    >
      {!hit && !clean ? (
        <EmptyState title="Not enough history yet" hint="Teachers need 14 days to have a chance to come back." />
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className={th}>First session</th>
              <th className={`${th} text-right`}>Teachers</th>
              <th className={`${th} text-right`}>Had another session</th>
              <th className={`${th} text-right`}>Came back another day</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, r }) => (
              <tr key={label} className="border-b last:border-0">
                <td className={`${td} text-slate-900`}>{label}</td>
                <td className={`${td} text-right font-semibold text-slate-900`}>{r?.teachers ?? 0}</td>
                <td className={`${td} text-right`}>
                  <Ratio kept={r?.cameBack ?? 0} of={r?.teachers ?? 0} min={1} />
                </td>
                <td className={`${td} text-right`}>
                  <Ratio kept={r?.secondDay ?? 0} of={r?.teachers ?? 0} min={1} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TelemetryCard>
  );
}

// ---------------------------------------------------------------------------
// Growth
// ---------------------------------------------------------------------------

export async function RegionsCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const { regions, regionCount } = await getGeography(asOf, from);
  const top = regions.slice(0, 12);
  const max = Math.max(...top.map((r) => r.teachers), 1);
  return (
    <TelemetryCard
      icon={<MapPin className="h-4 w-4" />}
      title="Teachers by region"
      description={`Registered ${rangeLabel(from, asOf, tz)} · top ${top.length} of ${regionCount} regions as typed`}
      infoKey="tel_regions"
    >
      {top.length === 0 ? (
        <EmptyState title="No registrations in this range" hint="Regions appear once teachers register." />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[120px_1fr_110px] gap-2.5 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
            <span>Region</span>
            <span>Teachers</span>
            <span className="text-right">Finished onboarding</span>
          </div>
          {top.map((r) => (
            <div key={r.region} className="grid grid-cols-[120px_1fr_110px] items-center gap-2.5">
              <span className="truncate text-xs text-slate-900" title={r.region}>
                {r.region}
              </span>
              <div className="flex h-4 items-center gap-1.5">
                <div className="h-full overflow-hidden rounded border bg-gray-50" style={{ width: `${(r.teachers / max) * 100}%`, minWidth: 4 }}>
                  <div className="h-full bg-green-600" style={{ width: `${(r.finished / Math.max(r.teachers, 1)) * 100}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-900">{r.teachers}</span>
              </div>
              <span className="text-right text-xs">
                <Ratio kept={r.finished} of={r.teachers} min={1} />
              </span>
            </div>
          ))}
          <p className="mt-1 text-[11px] text-muted-foreground">
            Dark part of each bar: teachers who finished onboarding. &ldquo;(Not Given)&rdquo; is mostly teachers who
            stopped before giving details.
          </p>
        </div>
      )}
    </TelemetryCard>
  );
}

export async function RegWeekdayCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const { weekdays } = await getGeography(asOf, from);
  const data = WEEKDAYS.map((label, i) => ({ label, teachers: weekdays.find((w) => w.day === i + 1)?.teachers ?? 0 }));
  return (
    <TelemetryCard
      icon={<CalendarDays className="h-4 w-4" />}
      title="Registrations by weekday"
      description={`Registered ${rangeLabel(from, asOf, tz)} · ${zoneName(tz, "long")}`}
      infoKey="tel_reg_weekday"
    >
      {weekdays.length === 0 ? (
        <EmptyState title="No registrations in this range" hint="Weekdays appear once teachers register." />
      ) : (
        <MonthlyBars data={data} series={[{ key: "teachers", name: "New teachers", color: CHART_COLORS.primary }]} />
      )}
    </TelemetryCard>
  );
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export async function UsageTimingCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const { weekdays, hours } = await getUsageTiming(asOf, from);
  const dayData = WEEKDAYS.map((label, i) => {
    const w = weekdays.find((x) => x.day === i + 1);
    return { label, messages: w?.messages ?? 0 };
  });
  const hourData = Array.from({ length: 24 }, (_, h) => ({
    label: `${String(h).padStart(2, "0")}h`,
    messages: hours.find((x) => x.hour === h)?.messages ?? 0,
  }));
  const busiest = [...hourData].sort((a, b) => b.messages - a.messages)[0];
  return (
    <TelemetryCard
      icon={<Sun className="h-4 w-4" />}
      title="When teachers use Twiga"
      description={`Teacher messages ${rangeLabel(from, asOf, tz)} · ${zoneName(tz, "long")}`}
      infoKey="tel_usage_timing"
    >
      {weekdays.length === 0 ? (
        <EmptyState title="No messages in this range" hint="Patterns appear once teachers message Twiga." />
      ) : (
        <div className="grid gap-4 md:grid-cols-[1fr_1.6fr]">
          <div>
            <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">By weekday</div>
            <MonthlyBars data={dayData} series={[{ key: "messages", name: "Messages", color: CHART_COLORS.primary }]} height={180} />
          </div>
          <div>
            <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              By hour · busiest {busiest?.label}
            </div>
            <MonthlyBars data={hourData} series={[{ key: "messages", name: "Messages", color: CHART_COLORS.primary }]} height={180} />
          </div>
        </div>
      )}
    </TelemetryCard>
  );
}

// ---------------------------------------------------------------------------
// Agent reliability
// ---------------------------------------------------------------------------

export async function ReplySpeedCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const r = await getReplySpeed(asOf, from);
  const data = r.months.map((m) => ({
    label: monthLabel(m.month, true),
    median: m.medianS === null ? null : Math.round(m.medianS * 10) / 10,
    p90: m.p90S === null ? null : Math.round(m.p90S * 10) / 10,
  }));
  return (
    <TelemetryCard
      icon={<Clock3 className="h-4 w-4" />}
      title="Reply speed"
      description={`Teacher messages ${rangeLabel(from, asOf, tz)}`}
      infoKey="tel_reply_speed"
    >
      {r.messages === 0 ? (
        <EmptyState title="No messages in this range" hint="Reply times appear once teachers message Twiga." />
      ) : (
        <>
          <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Typical reply" value={seconds(r.medianS)} sub="median" />
            <Stat label="Slow replies" value={seconds(r.p90S)} sub="1 in 10 take longer" />
            <Stat label="Over 1 minute" value={<Ratio kept={r.over60} of={r.messages} min={1} />} />
            <Stat
              label="No reply"
              value={<Ratio kept={r.noReply} of={r.messages} min={1} />}
              sub={`${r.noReplyLast} left without an answer`}
            />
          </div>
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Per month · {chartRangeLabel(from, asOf, tz)}
          </div>
          <MonthlyLines
            data={data}
            unit="s"
            series={[
              { key: "median", name: "Typical", color: CHART_COLORS.primary },
              { key: "p90", name: "Slow (1 in 10)", color: CHART_COLORS.warning },
            ]}
          />
        </>
      )}
    </TelemetryCard>
  );
}

export async function ErrorsCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const errors = await getErrorMessages(asOf, from);
  return (
    <TelemetryCard
      icon={<Bug className="h-4 w-4" />}
      title="Most common errors"
      description={`Failed tool runs ${rangeLabel(from, asOf, tz)} · Twiga's error text, not the teacher's words`}
      infoKey="tel_errors"
    >
      {errors.length === 0 ? (
        <EmptyState title="No tool errors in this range" hint="Every tool run succeeded." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b">
                <th className={th}>Tool</th>
                <th className={th}>Error</th>
                <th className={`${th} text-right`}>Times</th>
                <th className={`${th} text-right`}>First seen</th>
                <th className={`${th} text-right`}>Last seen</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((e, i) => (
                <tr key={`${e.tool}-${i}`} className="border-b last:border-0">
                  <td className={`${td} whitespace-nowrap font-medium text-slate-900`}>{TOOL_LABELS[e.tool] ?? e.tool}</td>
                  <td className={`${td} font-mono text-[11px] text-slate-600`}>{errorLabel(e.message)}</td>
                  <td className={`${td} text-right font-semibold text-red-600`}>{e.count}</td>
                  <td className={`${td} whitespace-nowrap text-right text-muted-foreground`}>{dayLabel(e.firstSeen)}</td>
                  <td className={`${td} whitespace-nowrap text-right text-muted-foreground`}>{dayLabel(e.lastSeen)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </TelemetryCard>
  );
}

// ---------------------------------------------------------------------------
// Subjects
// ---------------------------------------------------------------------------

export async function ScienceDemandCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const tz = await getReportingTimeZone();
  const d = await getScienceDemand(asOf, from);
  const data = d.months.map((m) => ({ label: monthLabel(m.month, true), physics: m.physics, chemistry: m.chemistry }));
  return (
    <TelemetryCard
      icon={<Atom className="h-4 w-4" />}
      title="Asked for, not offered: physics and chemistry"
      description={`${capitalize(rangeLabel(from, asOf, tz))} · teachers who mentioned them in their messages (counts only)`}
      infoKey="tel_science_demand"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <div className="grid grid-cols-2 content-start gap-3">
          <Stat label="Mentioned physics" value={d.physics} sub="teachers" />
          <Stat label="Mentioned chemistry" value={d.chemistry} sub="teachers" />
          <Stat
            label="Either"
            value={<Ratio kept={d.either} of={d.messaged} min={1} />}
            sub="of teachers who messaged"
          />
          <Stat label="Said they couldn't find it" value={d.askedMissing} sub={`${d.eitherOnboarded} of the ${d.either} are onboarded`} />
        </div>
        <div>
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Teachers per month · {chartRangeLabel(from, asOf, tz)}
          </div>
          {data.length === 0 ? (
            <EmptyState title="No mentions" hint="Nobody mentioned physics or chemistry in this range." />
          ) : (
            <MonthlyBars
              data={data}
              height={180}
              stacked={false}
              series={[
                { key: "physics", name: "Physics", color: CHART_COLORS.primary },
                { key: "chemistry", name: "Chemistry", color: CHART_COLORS.secondary },
              ]}
            />
          )}
        </div>
      </div>
    </TelemetryCard>
  );
}
