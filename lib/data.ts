import { cache } from "react";
import { startOfDay } from "date-fns";
import { and, desc, eq, gte, ilike, lte, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { messages, users } from "@/db/schema";
import {
  chartHistoryStart,
  registrationWindows,
  type RegistrationStats,
} from "@/lib/metrics";
import type { AdminDashboardSearchParams } from "@/lib/search-params";

/**
 * Fetches users matching the dashboard filters.
 *
 * Wrapped in React cache() so independent dashboard sections can each call it
 * with the same filters object and still trigger a single query per request.
 * Errors intentionally propagate so sections show an error state instead of a
 * false "no users" empty state.
 */
export const getUsers = cache(
  async (filters?: Partial<AdminDashboardSearchParams>) => {
    const query = db.select().from(users);

    const conditions = [];

    // Search filter (searches in name, wa_id, school_name, and region)
    if (filters?.search && filters.search.trim()) {
      const searchTerm = `%${filters.search.trim()}%`;
      conditions.push(
        or(
          ilike(users.name, searchTerm),
          ilike(users.wa_id, searchTerm),
          ilike(users.school_name, searchTerm),
          ilike(users.region, searchTerm)
        )
      );
    }

    // Status filter (using user state)
    if (filters?.status && filters.status !== "all") {
      conditions.push(eq(users.state, filters.status));
    }

    // Date range filters
    if (filters?.startDate) {
      conditions.push(gte(users.created_at, new Date(filters.startDate)));
    }

    if (filters?.endDate) {
      // Add 1 day to endDate to include the entire day
      const endDate = new Date(filters.endDate);
      endDate.setDate(endDate.getDate() + 1);
      conditions.push(lte(users.created_at, endDate));
    }

    const finalQuery =
      conditions.length > 0 ? query.where(and(...conditions)) : query;

    return finalQuery.orderBy(desc(users.created_at));
  }
);

/**
 * Global registration counts (today / 7d / 30d with prior windows) plus
 * per-day acquisition rates. Always unfiltered: the growth KPIs and the
 * acquisition velocity must not shrink when dashboard filters are applied.
 */
export const getRegistrationStats = cache(
  async (): Promise<RegistrationStats> => {
    const rows = await db
      .select({ created_at: users.created_at })
      .from(users);

    return registrationWindows(rows.map((row) => row.created_at));
  }
);

const teacherMessage = sql`${messages.role} = 'user'::messagerole`;

function countOf(value: unknown): number {
  const count = Number(value);
  return Number.isFinite(count) ? count : 0;
}

/**
 * Today / 7-day / 30-day message totals, counted in Postgres.
 * Scans the last 60 days only, so the cards can paint before the year chart.
 * Bounds match registrationWindows.
 */
export const getMessageWindowStats = cache(
  async (now: Date = new Date()): Promise<RegistrationStats> => {
    const dayMs = 86_400_000;
    const todayStart = startOfDay(now);
    const yesterdayStart = new Date(todayStart.getTime() - dayMs);
    const weekStart = new Date(now.getTime() - 7 * dayMs);
    const prevWeekStart = new Date(now.getTime() - 14 * dayMs);
    const monthStart = new Date(now.getTime() - 30 * dayMs);
    const prevMonthStart = new Date(now.getTime() - 60 * dayMs);

    const [row] = await db
      .select({
        todayCurrent: sql<number>`count(*) filter (where ${messages.created_at} >= ${todayStart.toISOString()})::int`,
        todayPrevious: sql<number>`count(*) filter (where ${messages.created_at} >= ${yesterdayStart.toISOString()} and ${messages.created_at} < ${todayStart.toISOString()})::int`,
        weekCurrent: sql<number>`count(*) filter (where ${messages.created_at} >= ${weekStart.toISOString()})::int`,
        weekPrevious: sql<number>`count(*) filter (where ${messages.created_at} >= ${prevWeekStart.toISOString()} and ${messages.created_at} < ${weekStart.toISOString()})::int`,
        monthCurrent: sql<number>`count(*) filter (where ${messages.created_at} >= ${monthStart.toISOString()})::int`,
        monthPrevious: sql<number>`count(*) filter (where ${messages.created_at} >= ${prevMonthStart.toISOString()} and ${messages.created_at} < ${monthStart.toISOString()})::int`,
      })
      .from(messages)
      .where(
        and(
          teacherMessage,
          eq(messages.is_present_in_conversation, true),
          gte(messages.created_at, prevMonthStart)
        )
      );

    const weekCurrent = countOf(row?.weekCurrent);
    const monthCurrent = countOf(row?.monthCurrent);
    const monthPrevious = countOf(row?.monthPrevious);

    return {
      today: {
        current: countOf(row?.todayCurrent),
        previous: countOf(row?.todayPrevious),
      },
      week: { current: weekCurrent, previous: countOf(row?.weekPrevious) },
      month: { current: monthCurrent, previous: monthPrevious },
      perDay7: weekCurrent / 7,
      perDay30: monthCurrent / 30,
      total: monthCurrent + monthPrevious,
    };
  }
);

/** One row per local day that had teacher messages, for the 12-month chart. */
export const getMessageDayCounts = cache(
  async (): Promise<{ at: Date; count: number }[]> => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const rows = await db
      .select({
        day: sql<string>`to_char(${messages.created_at} at time zone ${timeZone}, 'YYYY-MM-DD')`,
        count: sql<number>`count(*)::int`,
      })
      .from(messages)
      .where(
        and(
          teacherMessage,
          eq(messages.is_present_in_conversation, true),
          gte(messages.created_at, chartHistoryStart())
        )
      )
      .groupBy(sql`1`)
      .orderBy(sql`1`);

    return rows.map((row) => {
      const [year, month, date] = String(row.day).split("-").map(Number);
      return { at: new Date(year, month - 1, date), count: countOf(row.count) };
    });
  }
);
