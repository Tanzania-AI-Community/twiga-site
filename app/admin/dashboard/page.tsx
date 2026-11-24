import { Suspense } from "react";

import { checkAdminAuth } from "@/lib/auth";
import { adminDashboardSearchParamsCache } from "@/lib/search-params";
import { AdminNav } from "@/components/admin/AdminNav";
import { UsersSection } from "@/components/admin/UsersSection";
import { AgeCard } from "@/components/admin/metrics/AgeCard";
import { ClassesCard } from "@/components/admin/metrics/ClassesCard";
import { GrowthKpis } from "@/components/admin/metrics/GrowthKpis";
import { MessagesChart } from "@/components/admin/metrics/MessagesChart";
import { MessagesKpis } from "@/components/admin/metrics/MessagesKpis";
import { RegistrationsChart } from "@/components/admin/metrics/RegistrationsChart";
import { StatStrip } from "@/components/admin/metrics/StatStrip";
import { SubjectsCard } from "@/components/admin/metrics/SubjectsCard";
import { VelocityCard } from "@/components/admin/metrics/VelocityCard";
import {
  ChartSkeleton,
  GrowthKpisSkeleton,
  MiniCardSkeleton,
  StatStripSkeleton,
  TableSkeleton,
} from "@/components/admin/metrics/skeletons";

// Force dynamic rendering so filter changes always re-render with fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Admin dashboard shell. Every section below fetches its own data inside its
 * own Suspense boundary, so each part loads (and shimmers) independently.
 * React cache() deduplicates the underlying user query per request.
 */
export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await checkAdminAuth();

  // Parse filters once; sections read them via the shared cache.
  adminDashboardSearchParamsCache.parse(await searchParams);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <AdminNav />

      <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
        {/* State counts */}
        <Suspense fallback={<StatStripSkeleton />}>
          <StatStrip />
        </Suspense>

        {/* Registrations chart + global growth KPIs */}
        <div className="grid gap-4 lg:grid-cols-[2.4fr_1fr]">
          <Suspense fallback={<ChartSkeleton />}>
            <RegistrationsChart />
          </Suspense>
          <Suspense fallback={<GrowthKpisSkeleton />}>
            <GrowthKpis />
          </Suspense>
        </div>

        {/* Teacher messages: same chart and comparison cards, own query */}
        <div className="grid gap-4 lg:grid-cols-[2.4fr_1fr]">
          <Suspense fallback={<ChartSkeleton />}>
            <MessagesChart />
          </Suspense>
          <Suspense fallback={<GrowthKpisSkeleton />}>
            <MessagesKpis />
          </Suspense>
        </div>

        {/* Analytics quad: one segmented card, each cell streams on its own */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border bg-border shadow-xs sm:grid-cols-2 xl:grid-cols-4">
          <Suspense fallback={<MiniCardSkeleton />}>
            <VelocityCard />
          </Suspense>
          <Suspense fallback={<MiniCardSkeleton />}>
            <AgeCard />
          </Suspense>
          <Suspense fallback={<MiniCardSkeleton />}>
            <SubjectsCard />
          </Suspense>
          <Suspense fallback={<MiniCardSkeleton />}>
            <ClassesCard />
          </Suspense>
        </div>

        {/* User management (table unchanged) */}
        <Suspense fallback={<TableSkeleton />}>
          <UsersSection />
        </Suspense>
      </div>
    </div>
  );
}
