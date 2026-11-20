import { Suspense } from "react";

import { checkAdminAuth } from "@/lib/auth";
import { capitalize, chartRangeLabel, isValidDay, parseAsOf, rangeLabel, TIME_ZONE, TIME_ZONE_OFFSET } from "@/lib/telemetry";
import { env } from "@/env.mjs";
import { DateRangeFilter } from "@/components/admin/telemetry/DateRangeFilter";
import {
  ChurnCard,
  ErrorsCard,
  RegionsCard,
  RegWeekdayCard,
  ReplySpeedCard,
  ScienceDemandCard,
  StuckCard,
  UsageTimingCard,
} from "@/components/admin/telemetry/CompletenessCards";
import { AdminNav } from "@/components/admin/AdminNav";
import { OverviewStrip } from "@/components/admin/telemetry/OverviewStrip";
import { FunnelCard } from "@/components/admin/telemetry/FunnelCard";
import { RetentionCard } from "@/components/admin/telemetry/RetentionCard";
import { SubjectsTable } from "@/components/admin/telemetry/SubjectsTable";
import { GrowthCharts, PeaksCard } from "@/components/admin/telemetry/GrowthCards";
import { RepliesCard, ToolsCard, ToolTrendCard } from "@/components/admin/telemetry/ReliabilityCards";
import {
  SessionActivityCard,
  SessionLengthCard,
  SessionLogCard,
  SessionMonthsCard,
  SessionStrip,
} from "@/components/admin/telemetry/SessionsCards";
import {
  ChartSkeleton,
  MiniCardSkeleton,
  StatStripSkeleton,
  TableSkeleton,
} from "@/components/admin/metrics/skeletons";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const eat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function SectionTitle({
  children,
  hint,
  range,
}: {
  children: React.ReactNode;
  hint: string;
  /** Which data the section covers for the selected range. */
  range: string;
}) {
  return (
    <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h2 className="text-sm font-bold uppercase tracking-wider text-green-700">{children}</h2>
      <p className="text-xs text-muted-foreground">{hint}</p>
      <span className="rounded-full border border-green-200 bg-white px-2 py-px text-[11px] text-green-800">{range}</span>
    </div>
  );
}

const DAY = /^\d{4}-\d{2}-\d{2}$/;
/** A real calendar day ("2026-02-31" and "2026-13-01" are ignored), or "". */
const one = (v: string | string[] | undefined) =>
  typeof v === "string" && DAY.test(v) && isValidDay(v) ? v : "";

/**
 * Telemetry: onboarding, retention, subjects and agent reliability for real
 * teachers. Same definitions as the teacher analytics report. Each section
 * streams in its own Suspense boundary; fetchers are cached per request.
 *
 * ?from= and ?to= (Tanzania days) set the range for the whole page. Teacher
 * figures cover teachers who registered in the range; activity figures cover
 * what happened in it. ?asOf=<time> pins the end exactly (for example to the
 * last message of a snapshot) so the page can be checked against the report.
 */
export default async function TelemetryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await checkAdminAuth();
  const params = await searchParams;
  // Range: ?from=YYYY-MM-DD&to=YYYY-MM-DD, whole days in Tanzania time.
  // An empty or future "to" means now. ?asOf= (exact time) overrides the end.
  const fromDay = one(params.from);
  const toDay = one(params.to);
  const pinned = parseAsOf(params.asOf);
  const now = new Date();
  const toEnd = toDay ? new Date(`${toDay}T23:59:59.999${TIME_ZONE_OFFSET}`) : null;
  const asOf = (pinned ?? (toEnd && toEnd < now ? toEnd : now)).toISOString();
  const from = fromDay ? new Date(`${fromDay}T00:00:00${TIME_ZONE_OFFSET}`).toISOString() : "";
  const range = rangeLabel(from, asOf);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <AdminNav active="telemetry" />

      <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Telemetry</h1>
            <p className="text-xs text-muted-foreground">
              Real teachers only: excluded accounts (tests, the Twiga team, partners)
              {env.TELEMETRY_PHONE_PREFIX ? ` and numbers not starting +${env.TELEMETRY_PHONE_PREFIX}` : ""} are left out.
            </p>
          </div>
          <span className="text-[11px] text-muted-foreground">
            {pinned ? "Pinned to " : "Data up to "}
            {eat.format(new Date(asOf))} EAT
          </span>
        </div>

        <div className="sticky top-[53px] z-20 -mx-4 border-y border-green-100 bg-white/95 px-4 py-2 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <DateRangeFilter from={fromDay} to={toDay} />
            <span className="text-xs font-medium text-slate-700">Showing: {capitalize(range)}</span>
          </div>
        </div>

        <Suspense fallback={<StatStripSkeleton />}>
          <OverviewStrip asOf={asOf} from={from} />
        </Suspense>

        <SectionTitle hint="Who gets started, and who comes back" range={`Teachers registered ${range}`}>Onboarding &amp; retention</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          <Suspense fallback={<MiniCardSkeleton />}>
            <FunnelCard asOf={asOf} from={from} />
          </Suspense>
          <Suspense fallback={<MiniCardSkeleton />}>
            <RetentionCard asOf={asOf} from={from} />
          </Suspense>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Suspense fallback={<MiniCardSkeleton />}>
            <StuckCard asOf={asOf} from={from} />
          </Suspense>
          <Suspense fallback={<MiniCardSkeleton />}>
            <ChurnCard asOf={asOf} from={from} />
          </Suspense>
        </div>

        <SectionTitle hint="New and active teachers over time" range={chartRangeLabel(from, asOf)}>Growth</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <Suspense
            fallback={
              <>
                <ChartSkeleton />
                <ChartSkeleton />
              </>
            }
          >
            <GrowthCharts asOf={asOf} from={from} />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <RegWeekdayCard asOf={asOf} from={from} />
          </Suspense>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Suspense fallback={<MiniCardSkeleton />}>
            <PeaksCard asOf={asOf} from={from} />
          </Suspense>
          <Suspense fallback={<MiniCardSkeleton />}>
            <RegionsCard asOf={asOf} from={from} />
          </Suspense>
        </div>

        <SectionTitle hint="What teachers do when they sit down with Twiga" range={`Sessions started ${range}`}>Sessions</SectionTitle>
        <Suspense fallback={<StatStripSkeleton />}>
          <SessionStrip asOf={asOf} from={from} />
        </Suspense>
        <div className="grid gap-4 lg:grid-cols-2">
          <Suspense fallback={<MiniCardSkeleton />}>
            <SessionActivityCard asOf={asOf} from={from} />
          </Suspense>
          <Suspense fallback={<MiniCardSkeleton />}>
            <SessionLengthCard asOf={asOf} from={from} />
          </Suspense>
        </div>
        <div className="grid gap-4 xl:grid-cols-[1fr_1.6fr]">
          <Suspense fallback={<ChartSkeleton />}>
            <SessionMonthsCard asOf={asOf} from={from} />
          </Suspense>
          <Suspense fallback={<TableSkeleton />}>
            <SessionLogCard asOf={asOf} from={from} />
          </Suspense>
        </div>
        <Suspense fallback={<ChartSkeleton />}>
          <UsageTimingCard asOf={asOf} from={from} />
        </Suspense>

        <SectionTitle hint="Is Twiga answering well?" range={`Tool runs and replies ${range}`}>Agent reliability</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          <Suspense fallback={<MiniCardSkeleton />}>
            <ToolsCard asOf={asOf} from={from} />
          </Suspense>
          <Suspense fallback={<MiniCardSkeleton />}>
            <RepliesCard asOf={asOf} from={from} />
          </Suspense>
        </div>
        <Suspense fallback={<ChartSkeleton />}>
          <ToolTrendCard asOf={asOf} from={from} />
        </Suspense>
        <div className="grid gap-4 xl:grid-cols-2">
          <Suspense fallback={<ChartSkeleton />}>
            <ReplySpeedCard asOf={asOf} from={from} />
          </Suspense>
          <Suspense fallback={<MiniCardSkeleton />}>
            <ErrorsCard asOf={asOf} from={from} />
          </Suspense>
        </div>

        <SectionTitle hint="Where teachers are, and where they stay" range={`Teachers registered ${range}`}>Subjects</SectionTitle>
        <Suspense fallback={<TableSkeleton />}>
          <SubjectsTable asOf={asOf} from={from} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ScienceDemandCard asOf={asOf} from={from} />
        </Suspense>
      </div>
    </div>
  );
}
