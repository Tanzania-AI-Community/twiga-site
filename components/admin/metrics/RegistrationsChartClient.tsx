"use client";

import * as React from "react";
import {
  BarChart3,
  CalendarX2,
  LineChart as LineChartIcon,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  bucketRegistrations,
  type Granularity,
  type RegistrationBucket,
} from "@/lib/metrics";
import { MetricInfo } from "@/components/admin/MetricInfo";
import type { MetricInfoKey } from "@/lib/metric-info";

type Mode = "bars" | "line" | "cumulative";

const GREEN = "#16a34a";
const GREEN_DARK = "#15803d";

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "h-8 gap-1.5 rounded-md px-3 text-xs",
        active &&
          "border-green-600 bg-green-600 text-white hover:bg-green-700 hover:text-white"
      )}
    >
      {children}
    </Button>
  );
}

const tooltipStyle: React.CSSProperties = {
  borderRadius: 6,
  border: "1px solid #e4ebe0",
  fontSize: 12,
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
};

const axisTick = { fontSize: 11, fill: "#8a988e" } as const;

/**
 * Interactive registrations chart: Day/Week/Month granularity and
 * Bars/Line/Cumulative modes, all local state so switching never refetches.
 */
export function RegistrationsChartClient({
  timestamps = [],
  buckets,
  title = "Registrations over time",
  description = "Sign-ups per period. Follows the dashboard filters.",
  seriesName = "Sign-ups",
  emptyTitle = "No sign-ups in this period",
  emptyHint = "Try clearing your filters to see all registrations.",
  infoKey = "registrations_chart",
}: {
  timestamps?: number[];
  /** Pre-bucketed series. Day/week/month switches stay local either way. */
  buckets?: Record<Granularity, RegistrationBucket[]>;
  title?: string;
  description?: string;
  seriesName?: string;
  emptyTitle?: string;
  emptyHint?: string;
  infoKey?: MetricInfoKey;
}) {
  const [granularity, setGranularity] = React.useState<Granularity>("week");
  const [mode, setMode] = React.useState<Mode>("bars");

  const data = React.useMemo(
    () => buckets?.[granularity] ?? bucketRegistrations(timestamps, granularity),
    [buckets, timestamps, granularity]
  );
  const hasData = buckets
    ? (["day", "week", "month"] as const).some((g) =>
        buckets[g].some((bucket) => bucket.count > 0)
      )
    : timestamps.length > 0;

  return (
    <div className="group relative flex flex-col rounded-md border bg-card p-4 shadow-xs">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <BarChart3 className="h-4 w-4" />
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1" role="group" aria-label="Granularity">
            {(["day", "week", "month"] as const).map((g) => (
              <ToggleButton
                key={g}
                active={granularity === g}
                onClick={() => setGranularity(g)}
              >
                {g[0].toUpperCase() + g.slice(1)}
              </ToggleButton>
            ))}
          </div>
          <div className="flex gap-1" role="group" aria-label="Chart type">
            <ToggleButton active={mode === "bars"} onClick={() => setMode("bars")}>
              <BarChart3 className="h-3.5 w-3.5" />
              Bars
            </ToggleButton>
            <ToggleButton active={mode === "line"} onClick={() => setMode("line")}>
              <LineChartIcon className="h-3.5 w-3.5" />
              Line
            </ToggleButton>
            <ToggleButton
              active={mode === "cumulative"}
              onClick={() => setMode("cumulative")}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Cumulative
            </ToggleButton>
          </div>
        </div>
      </div>

      <div className="h-[240px]">
        {!hasData ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <CalendarX2 className="h-8 w-8 text-slate-300" />
            <p className="text-sm font-medium text-slate-600">
              {emptyTitle}
            </p>
            <p className="text-xs text-muted-foreground">{emptyHint}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {mode === "bars" ? (
              <BarChart data={data} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#eef2ec" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={axisTick}
                  minTickGap={24}
                  interval="preserveStartEnd"
                />
                <YAxis tickLine={false} axisLine={false} tick={axisTick} allowDecimals={false} />
                <Tooltip cursor={{ fill: "rgba(22,163,74,0.06)" }} contentStyle={tooltipStyle} />
                <Bar dataKey="count" name={seriesName} fill={GREEN} radius={[3, 3, 0, 0]} maxBarSize={36} />
              </BarChart>
            ) : mode === "line" ? (
              <LineChart data={data} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#eef2ec" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={axisTick}
                  minTickGap={24}
                  interval="preserveStartEnd"
                />
                <YAxis tickLine={false} axisLine={false} tick={axisTick} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="count"
                  name={seriesName}
                  stroke={GREEN}
                  strokeWidth={2.5}
                  dot={{ r: 2.5, fill: GREEN_DARK, strokeWidth: 0 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <AreaChart data={data} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#eef2ec" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={axisTick}
                  minTickGap={24}
                  interval="preserveStartEnd"
                />
                <YAxis tickLine={false} axisLine={false} tick={axisTick} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  name="Total"
                  stroke={GREEN}
                  strokeWidth={2.5}
                  fill={GREEN}
                  fillOpacity={0.1}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      <MetricInfo infoKey={infoKey} />
    </div>
  );
}
