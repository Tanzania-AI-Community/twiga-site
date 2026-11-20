"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { UnfinishedTeachersPanel } from "@/components/admin/telemetry/UnfinishedTeachersPanel";
import { CHART_COLORS } from "@/lib/telemetry-format";
import { cn } from "@/lib/utils";

// Same chart styling as the dashboard's registrations chart.
const tooltipStyle: React.CSSProperties = {
  borderRadius: 6,
  border: "1px solid #e4ebe0",
  fontSize: 12,
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
};
// Chart chrome (axes, grid, tooltip text), same as the dashboard charts.
const INK = { strong: "#0f172a", body: "#334155", muted: "#475569", axis: "#8a988e", grid: "#eef2ec" } as const;
const axisTick = { fontSize: 11, fill: INK.axis } as const;
const legendStyle: React.CSSProperties = { fontSize: 11, paddingTop: 4 };

export interface Series {
  key: string;
  name: string;
  color: string;
}

/** Monthly bars; stacked when there is more than one series. */
export function MonthlyBars({
  data,
  series,
  height = 260,
  onBarClick,
  stacked: stackedProp,
}: {
  data: Record<string, string | number>[];
  series: Series[];
  height?: number;
  /** Stack the series (parts of one total). Defaults to true for 2+ series. */
  stacked?: boolean;
  /** Called with the clicked bar's index; also makes bars show a pointer. */
  onBarClick?: (index: number) => void;
}) {
  const stacked = stackedProp ?? series.length > 1;
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
          onClick={onBarClick ? (state) => {
            const i = state?.activeTooltipIndex;
            if (typeof i === "number") onBarClick(i);
          } : undefined}
          style={onBarClick ? { cursor: "pointer" } : undefined}
        >
          <CartesianGrid vertical={false} stroke={INK.grid} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={axisTick}
            minTickGap={12}
            interval="preserveStartEnd"
          />
          <YAxis tickLine={false} axisLine={false} tick={axisTick} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(22,163,74,0.06)" }}
            contentStyle={tooltipStyle}
            labelStyle={{ color: INK.strong, fontWeight: 600 }}
            itemStyle={{ color: INK.body, padding: 0 }}
          />
          {series.length > 1 && (
            <Legend
              iconType="square"
              iconSize={9}
              wrapperStyle={legendStyle}
              formatter={(value) => <span style={{ color: INK.muted }}>{value}</span>}
            />
          )}
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              fill={s.color}
              stackId={stacked ? "a" : undefined}
              stroke="#fff"
              strokeWidth={stacked ? 1 : 0}
              radius={!stacked || i === series.length - 1 ? [3, 3, 0, 0] : 0}
              maxBarSize={36}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export interface ToolMonthPoint {
  label: string;
  tool: string;
  succeeded: number;
  failed: number;
}

/** Succeeded vs failed runs per month, one tool at a time. */
export function ToolTrend({
  points,
  tools,
}: {
  points: ToolMonthPoint[];
  tools: { key: string; label: string }[];
}) {
  const [tool, setTool] = React.useState(tools[0]?.key ?? "");
  const data = React.useMemo(() => {
    const months = Array.from(new Set(points.map((p) => p.label)));
    return months.map((label) => {
      const p = points.find((x) => x.label === label && x.tool === tool);
      return { label, succeeded: p?.succeeded ?? 0, failed: p?.failed ?? 0 };
    });
  }, [points, tool]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-1" role="group" aria-label="Tool">
        {tools.map((t) => (
          <Button
            key={t.key}
            type="button"
            variant="outline"
            size="sm"
            aria-pressed={tool === t.key}
            onClick={() => setTool(t.key)}
            className={cn(
              "h-7 rounded-md px-2.5 text-xs",
              tool === t.key && "border-green-600 bg-green-600 text-white hover:bg-green-700 hover:text-white"
            )}
          >
            {t.label}
          </Button>
        ))}
      </div>
      <MonthlyBars
        data={data}
        series={[
          { key: "succeeded", name: "Succeeded", color: CHART_COLORS.primary },
          { key: "failed", name: "Failed", color: CHART_COLORS.failure },
        ]}
      />
    </div>
  );
}

/**
 * New teachers per month, stacked by finished / didn't finish. Clicking a
 * month opens the follow-up panel for the teachers who didn't finish then.
 */
export function RegistrationsWithFollowUp({
  asOf,
  from,
  data,
}: {
  asOf: string;
  from: string;
  data: { month: string; label: string; finished: number; notFinished: number }[];
}) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<string | null>(null);
  return (
    <>
      <MonthlyBars
        data={data}
        series={[
          { key: "finished", name: "Finished onboarding", color: CHART_COLORS.primary },
          { key: "notFinished", name: "Didn't finish", color: CHART_COLORS.light },
        ]}
        onBarClick={(i) => {
          setMonth(data[i]?.month ?? null);
          setOpen(true);
        }}
      />
      <p className="mt-2 text-[11.5px] text-muted-foreground">
        Click a month to see who didn&apos;t finish, or{" "}
        <button
          type="button"
          className="font-medium text-green-700 underline decoration-dotted underline-offset-2 hover:decoration-solid"
          onClick={() => {
            setMonth(null);
            setOpen(true);
          }}
        >
          see the full list
        </button>
        .
      </p>
      <UnfinishedTeachersPanel asOf={asOf} from={from} open={open} onOpenChange={setOpen} month={month} onMonthChange={setMonth} />
    </>
  );
}

/** Monthly lines with a unit (for example seconds), e.g. typical and slow reply time. */
export function MonthlyLines({
  data,
  series,
  unit,
  height = 200,
}: {
  data: Record<string, string | number | null>[];
  series: Series[];
  unit: string;
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={INK.grid} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisTick} minTickGap={12} interval="preserveStartEnd" />
          <YAxis tickLine={false} axisLine={false} tick={axisTick} unit={unit} />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={{ color: INK.strong, fontWeight: 600 }}
            itemStyle={{ color: INK.body, padding: 0 }}
            formatter={(v) => (typeof v === "number" ? `${v.toFixed(1)}${unit}` : "–")}
          />
          <Legend
            iconType="plainline"
            iconSize={12}
            wrapperStyle={legendStyle}
            formatter={(value) => <span style={{ color: INK.muted }}>{value}</span>}
          />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={2}
              dot={{ r: 3, fill: s.color, strokeWidth: 0 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
