import { Activity, CalendarCheck, CalendarClock, Repeat, UserCheck, Users } from "lucide-react";

import { getOverview, getRetention } from "@/lib/telemetry";
import { MetricInfo } from "@/components/admin/MetricInfo";
import { UnfinishedTeachersLink } from "@/components/admin/telemetry/UnfinishedTeachersPanel";
import type { MetricInfoKey } from "@/lib/metric-info";

interface Tile {
  label: string;
  value: number;
  of?: number;
  sub: React.ReactNode;
  infoKey: MetricInfoKey;
  icon: React.ReactNode;
}

/**
 * Headline KPIs in one segmented card. Every share is shown with its count
 * and denominator ("24 of 372"), never as a bare percentage.
 */
export async function OverviewStrip({ asOf, from = "" }: { asOf: string; from?: string }) {
  const [o, r] = await Promise.all([getOverview(asOf, from), getRetention(asOf, from)]);

  const tiles: Tile[] = [
    {
      label: "Teachers",
      value: o.teachers,
      sub: `${o.messaged} have messaged Twiga`,
      infoKey: "tel_teachers",
      icon: <Users className="h-4 w-4 flex-none text-blue-500" />,
    },
    {
      label: "Finished onboarding",
      value: o.onboarded,
      of: o.teachers,
      sub: (
        <UnfinishedTeachersLink asOf={asOf} from={from}>{o.teachers - o.onboarded} didn&apos;t finish</UnfinishedTeachersLink>
      ),
      infoKey: "tel_onboarded",
      icon: <UserCheck className="h-4 w-4 flex-none text-green-500" />,
    },
    {
      label: "Active, last 30 days",
      value: o.active30,
      of: o.onboarded,
      sub: "of onboarded teachers",
      infoKey: "tel_active30",
      icon: <Activity className="h-4 w-4 flex-none text-green-500" />,
    },
    {
      label: "Active, last 7 days",
      value: o.active7,
      of: o.onboarded,
      sub: "of onboarded teachers",
      infoKey: "tel_active7",
      icon: <CalendarClock className="h-4 w-4 flex-none text-green-500" />,
    },
    {
      label: "Back in week 2",
      value: r.week2.kept,
      of: r.week2.of,
      sub: "days 7–13 after first use",
      infoKey: "tel_week2",
      icon: <Repeat className="h-4 w-4 flex-none text-purple-500" />,
    },
    {
      label: "Back in month 2",
      value: r.month2.kept,
      of: r.month2.of,
      sub: "days 30–59 after first use",
      infoKey: "tel_month2",
      icon: <CalendarCheck className="h-4 w-4 flex-none text-purple-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border shadow-xs sm:grid-cols-3 xl:grid-cols-6">
      {tiles.map((tile) => (
        <div key={tile.label} className="group relative flex gap-2.5 bg-card px-3.5 py-3">
          <div className="pt-0.5">{tile.icon}</div>
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-slate-600">{tile.label}</div>
            {tile.of === 0 ? (
              <div className="text-xl font-bold leading-tight text-muted-foreground" title="Nobody in this range has had the full window yet">
                –
              </div>
            ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold leading-tight text-slate-900">{tile.value}</span>
              {tile.of !== undefined && (
                <span className="text-xs font-medium text-muted-foreground">
                  of {tile.of}
                  {tile.of > 0 && (
                    <span className="ml-1 font-semibold text-slate-600">
                      {Math.round((100 * tile.value) / tile.of)}%
                    </span>
                  )}
                </span>
              )}
            </div>
            )}
            <div className="truncate text-[11px] text-muted-foreground">
              {tile.of === 0 ? "not measurable yet in this range" : tile.sub}
            </div>
          </div>
          <MetricInfo infoKey={tile.infoKey} />
        </div>
      ))}
    </div>
  );
}
