import { AlertTriangle, MessageSquareWarning, Wrench } from "lucide-react";

import {
  capitalize,
  chartRangeLabel,
  dayLabel,
  getReliability,
  last30Label,
  monthLabel,
  rangeLabel,
  REPLY_LABELS,
  TOOL_LABELS,
} from "@/lib/telemetry";
import { ToolTrend } from "@/components/admin/telemetry/TelemetryCharts";
import { EmptyState, TelemetryCard, td, th } from "@/components/admin/telemetry/shared";

const toolLabel = (t: string) => TOOL_LABELS[t] ?? t.replace(/_/g, " ");

function Failed({ errors, calls }: { errors: number; calls: number }) {
  if (errors === 0) return <span className="text-muted-foreground">0</span>;
  return (
    <span className="inline-flex items-center gap-1 font-semibold text-red-600">
      <AlertTriangle className="h-3 w-3" />
      {errors}
      <span className="font-normal text-red-600/80">{calls ? Math.round((100 * errors) / calls) : 0}%</span>
    </span>
  );
}

/** Tool runs and failures in the selected range, plus the last 30 days to its end. */
export async function ToolsCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const { tools } = await getReliability(asOf, from);

  return (
    <TelemetryCard
      icon={<Wrench className="h-4 w-4" />}
      title="Agent tools"
      description={`Runs and failures · ${rangeLabel(from, asOf)}`}
      infoKey="tel_tools"
    >
      {tools.length === 0 ? (
        <EmptyState title="No tool runs yet" hint="Tools run when teachers ask for textbook help." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b">
                <th className={th}>Tool</th>
                <th className={`${th} text-right`}>Runs</th>
                <th className={`${th} text-right`}>Failed</th>
                <th className={`${th} text-right`} title={last30Label(asOf)}>Runs 30d</th>
                <th className={`${th} text-right`} title={last30Label(asOf)}>Failed 30d</th>
                <th className={`${th} text-right`}>Last failure</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.tool} className="border-b last:border-0">
                  <td className={`${td} font-semibold text-slate-900`}>{toolLabel(t.tool)}</td>
                  <td className={`${td} text-right`}>{t.calls}</td>
                  <td className={`${td} text-right`}>
                    <Failed errors={t.errors} calls={t.calls} />
                  </td>
                  <td className={`${td} text-right`}>{t.calls30}</td>
                  <td className={`${td} text-right`}>
                    <Failed errors={t.errors30} calls={t.calls30} />
                  </td>
                  <td className={`${td} text-right text-muted-foreground`}>{dayLabel(t.lastFailure)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-[11px] text-muted-foreground">
            30d columns: {last30Label(asOf)}. Fixed outages stay in the range totals, so check the 30d columns and the
            monthly chart for the current state.
          </p>
        </div>
      )}
    </TelemetryCard>
  );
}

/** Interactive monthly trend of successful vs failed runs, per tool. */
export async function ToolTrendCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const { tools, monthly } = await getReliability(asOf, from);
  const points = monthly.map((m) => ({
    label: monthLabel(m.month, true),
    tool: m.tool,
    succeeded: m.calls - m.errors,
    failed: m.errors,
  }));

  return (
    <TelemetryCard
      icon={<Wrench className="h-4 w-4" />}
      title="Tool runs per month"
      description={`Succeeded and failed · ${chartRangeLabel(from, asOf)}`}
      infoKey="tel_tool_trend"
    >
      {points.length === 0 ? (
        <EmptyState title="No tool runs yet" hint="Tools run when teachers ask for textbook help." />
      ) : (
        <ToolTrend points={points} tools={tools.map((t) => ({ key: t.tool, label: toolLabel(t.tool) }))} />
      )}
    </TelemetryCard>
  );
}

/** Replies where Twiga apologised, refused or couldn't help. */
export async function RepliesCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const { replies, replies30 } = await getReliability(asOf, from);
  const problems30 = replies.reduce((s, r) => s + r.last30, 0);

  return (
    <TelemetryCard
      icon={<MessageSquareWarning className="h-4 w-4" />}
      title="Problem replies"
      description={`${capitalize(rangeLabel(from, asOf))} · ${problems30} of ${replies30} replies were problems in the ${last30Label(asOf)}`}
      infoKey="tel_replies"
    >
      {replies.length === 0 ? (
        <EmptyState title="No problem replies" hint="Every reply was a normal answer." />
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className={th}>Reply</th>
              <th className={`${th} text-right`}>In range</th>
              <th className={`${th} text-right`} title={last30Label(asOf)}>Last 30d</th>
              <th className={`${th} text-right`} title={last30Label(asOf)}>Teachers 30d</th>
              <th className={`${th} text-right`}>Last seen</th>
            </tr>
          </thead>
          <tbody>
            {replies.map((r) => (
              <tr key={r.type} className="border-b last:border-0">
                <td className={`${td} text-slate-900`}>{REPLY_LABELS[r.type] ?? r.type}</td>
                <td className={`${td} text-right`}>{r.total}</td>
                <td className={`${td} text-right font-semibold ${r.last30 ? "text-red-600" : "text-muted-foreground"}`}>
                  {r.last30}
                </td>
                <td className={`${td} text-right`}>{r.teachers30}</td>
                <td className={`${td} text-right text-muted-foreground`}>{dayLabel(r.lastSeen)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TelemetryCard>
  );
}
