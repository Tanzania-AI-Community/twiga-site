import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { getRegistrationStats } from "@/lib/data";
import { percentChange, type WindowComparison } from "@/lib/metrics";
import { MetricInfo } from "@/components/admin/MetricInfo";
import type { MetricInfoKey } from "@/lib/metric-info";

function Trend({ window }: { window: WindowComparison }) {
  const pct = percentChange(window);

  // No prior data to compare against.
  if (pct === null) {
    if (window.current === 0) return null;
    return (
      <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-green-600">
        <ArrowUpRight className="h-3.5 w-3.5" />
        new
      </span>
    );
  }

  const up = pct >= 0;
  const Arrow = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-sm font-semibold ${
        up ? "text-green-600" : "text-red-600"
      }`}
    >
      <Arrow className="h-3.5 w-3.5" />
      {pct >= 0 ? "+" : ""}
      {pct.toFixed(0)}%
    </span>
  );
}

export interface WindowSegment {
  label: string;
  data: WindowComparison;
  sub: string;
  infoKey: MetricInfoKey;
}

/**
 * Today / 7-day / 30-day comparison column shared by sign-ups and messages.
 * One segmented card: a column beside the chart on large screens, a row when
 * the layout stacks. The Global pill marks figures that ignore filters.
 */
export function WindowKpiColumn({
  segments,
  emptyLabel,
}: {
  segments: WindowSegment[];
  emptyLabel: string | null;
}) {
  return (
    <div className="grid h-full gap-px overflow-hidden rounded-md border bg-border shadow-xs lg:grid-rows-3 max-lg:grid-cols-3 max-sm:grid-cols-1">
      {segments.map((segment) => (
        <div
          key={segment.label}
          className="group relative flex flex-col justify-center bg-card px-4 py-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-600">
              {segment.label}
            </span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              Global
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold leading-none text-slate-900">
              {segment.data.current}
            </span>
            <Trend window={segment.data} />
          </div>
          <div className="mt-1 text-[11.5px] text-muted-foreground">
            {emptyLabel ?? segment.sub}
          </div>
          <MetricInfo infoKey={segment.infoKey} className="right-16" />
        </div>
      ))}
    </div>
  );
}

/**
 * Global growth KPIs: new sign-ups today / last 7 days / last 30 days, each
 * compared with the window right before it.
 */
export async function GrowthKpis() {
  const stats = await getRegistrationStats();

  return (
    <WindowKpiColumn
      emptyLabel={stats.total === 0 ? "No sign-ups yet" : null}
      segments={[
        {
          label: "Today",
          data: stats.today,
          sub: `today vs yesterday (${stats.today.previous})`,
          infoKey: "kpi_today",
        },
        {
          label: "Last 7 days",
          data: stats.week,
          sub: `this week vs prior 7d (${stats.week.previous})`,
          infoKey: "kpi_week",
        },
        {
          label: "Last 30 days",
          data: stats.month,
          sub: `this month vs prior 30d (${stats.month.previous})`,
          infoKey: "kpi_month",
        },
      ]}
    />
  );
}
