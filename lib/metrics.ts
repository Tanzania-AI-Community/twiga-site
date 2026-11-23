/**
 * Pure aggregation functions for the admin dashboard metrics.
 *
 * Everything here is client-safe (no server imports, no React) so the same
 * functions can run in server components and in the interactive chart client.
 * Days, weeks and months are counted in the admin's reporting time zone
 * (lib/time-zone), passed in by the caller, so the server and the browser
 * group dates the same way.
 */

import { differenceInYears } from "date-fns";

import { startOfZonedDay, wallClock, zonedTime } from "@/lib/time-zone";

// Minimal user shape the metrics need. Matches rows from the users table.
export interface MetricUser {
  state: string;
  onboarding_state: string | null;
  class_info: Record<string, string[]> | null;
  birthday: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

// ---------------------------------------------------------------------------
// State counts (stat strip)
// ---------------------------------------------------------------------------

export interface StateCounts {
  total: number;
  active: number;
  onboarding: number;
  approved: number;
  blocked: number;
  rate_limited: number;
  inactive: number;
  in_review: number;
}

export function stateCounts(users: Pick<MetricUser, "state">[]): StateCounts {
  const counts: StateCounts = {
    total: users.length,
    active: 0,
    onboarding: 0,
    approved: 0,
    blocked: 0,
    rate_limited: 0,
    inactive: 0,
    in_review: 0,
  };
  for (const user of users) {
    if (user.state in counts && user.state !== "total") {
      counts[user.state as keyof Omit<StateCounts, "total">] += 1;
    }
  }
  return counts;
}

// ---------------------------------------------------------------------------
// Registrations over time (chart)
// ---------------------------------------------------------------------------

export type Granularity = "day" | "week" | "month";

export interface RegistrationBucket {
  label: string;
  count: number;
  /** Running total up to and including this bucket. */
  cumulative: number;
}

const DAY_MS = 86_400_000;
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Calendar days are held as UTC-midnight Dates ("civil days"), so day, week
// and month arithmetic never depends on the runtime's own time zone.

/** The calendar day an instant falls on in `timeZone`. */
function civilDay(d: Date, timeZone: string): Date {
  const w = wallClock(d, timeZone);
  return new Date(Date.UTC(w.year, w.month - 1, w.day));
}

const addDays = (day: Date, n: number) => new Date(day.getTime() + n * DAY_MS);
const isoDate = (day: Date) => day.toISOString().slice(0, 10);

/** Monday of the ISO week containing a civil day. */
function weekStart(day: Date): Date {
  return addDays(day, 1 - (day.getUTCDay() || 7));
}

/** ISO week-numbering year and week of a civil day (weeks start Monday). */
function isoWeek(day: Date): { year: number; week: number } {
  const thursday = addDays(weekStart(day), 3);
  const year = thursday.getUTCFullYear();
  const week = Math.floor((thursday.getTime() - Date.UTC(year, 0, 1)) / DAY_MS / 7) + 1;
  return { year, week };
}

type Calendar = {
  /** Periods shown on the chart, oldest first, ending with the current one. */
  periods: (today: Date) => Date[];
  keyOf: (day: Date) => string;
  labelOf: (day: Date) => string;
};

// How far back each granularity looks, to keep the chart readable.
const CALENDARS: Record<Granularity, Calendar> = {
  // Last 90 days.
  day: {
    periods: (today) => Array.from({ length: 90 }, (_, i) => addDays(today, i - 89)),
    keyOf: isoDate,
    labelOf: (day) => `${day.getUTCDate()}/${day.getUTCMonth() + 1}`,
  },
  // Last 26 ISO weeks.
  week: {
    periods: (today) => Array.from({ length: 26 }, (_, i) => addDays(weekStart(today), (i - 25) * 7)),
    keyOf: (day) => {
      const { year, week } = isoWeek(day);
      return `${year}-${String(week).padStart(2, "0")}`;
    },
    labelOf: (day) => `W${isoWeek(day).week}`,
  },
  // Last 12 months.
  month: {
    periods: (today) =>
      Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + i - 11, 1))),
    keyOf: (day) => isoDate(day).slice(0, 7),
    labelOf: (day) => MONTH_NAMES[day.getUTCMonth()],
  },
};

/** Start of the longest chart window (12 months) in `timeZone`. Shorter views sit inside it. */
export function chartHistoryStart(timeZone: string, now: Date = new Date()): Date {
  const w = wallClock(now, timeZone);
  return zonedTime(timeZone, w.year, w.month - 11, 1);
}

/**
 * Buckets registration timestamps by day, week, or month in `timeZone`, with
 * zero-filled gaps so quiet periods still show on the chart.
 */
export function bucketRegistrations(
  createdAt: (Date | number | { at: Date | number; count: number })[],
  granularity: Granularity,
  timeZone: string,
  now: Date = new Date()
): RegistrationBucket[] {
  const { periods, keyOf, labelOf } = CALENDARS[granularity];
  const shown = periods(civilDay(now, timeZone));

  const counts = new Map<string, number>(shown.map((p) => [keyOf(p), 0]));
  for (const raw of createdAt) {
    const weighted = typeof raw === "object" && "count" in raw;
    const key = keyOf(civilDay(new Date(weighted ? raw.at : raw), timeZone));
    // Points outside the window are ignored on purpose.
    if (counts.has(key)) counts.set(key, (counts.get(key) ?? 0) + (weighted ? raw.count : 1));
  }

  let running = 0;
  return shown.map((p) => {
    const count = counts.get(keyOf(p)) ?? 0;
    running += count;
    return { label: labelOf(p), count, cumulative: running };
  });
}

// ---------------------------------------------------------------------------
// Onboarding velocity (proxy)
// ---------------------------------------------------------------------------

export interface OnboardingVelocity {
  medianDays: number;
  averageDays: number;
  completed: number;
}

/**
 * Time from sign-up to completed profile, for users whose onboarding is done.
 * Proxy metric: uses updated_at - created_at, so a later change to the row
 * inflates the duration. Returns null when nobody has completed onboarding.
 */
export function onboardingVelocity(
  users: Pick<MetricUser, "onboarding_state" | "created_at" | "updated_at">[]
): OnboardingVelocity | null {
  const durations = users
    .filter((u) => u.onboarding_state === "completed" && u.created_at && u.updated_at)
    .map((u) => (u.updated_at!.getTime() - u.created_at!.getTime()) / 86_400_000)
    .filter((days) => days >= 0)
    .sort((a, b) => a - b);

  if (durations.length === 0) return null;

  const mid = Math.floor(durations.length / 2);
  const medianDays =
    durations.length % 2 === 1 ? durations[mid] : (durations[mid - 1] + durations[mid]) / 2;
  const averageDays = durations.reduce((sum, d) => sum + d, 0) / durations.length;

  return { medianDays, averageDays, completed: durations.length };
}

/** Formats a duration in days as "18h" below one day, otherwise "2.4d". */
export function formatDuration(days: number): string {
  if (days < 1) return `${Math.round(days * 24)}h`;
  return `${days.toFixed(1)}d`;
}

// ---------------------------------------------------------------------------
// Age distribution
// ---------------------------------------------------------------------------

export interface AgeBands {
  bands: { label: string; count: number }[];
  unknown: number;
}

const AGE_BANDS: { label: string; min: number; max: number }[] = [
  { label: "<25", min: 0, max: 24 },
  { label: "25-34", min: 25, max: 34 },
  { label: "35-44", min: 35, max: 44 },
  { label: "45-54", min: 45, max: 54 },
  { label: "55+", min: 55, max: 200 },
];

export function ageBands(
  users: Pick<MetricUser, "birthday">[],
  now: Date = new Date()
): AgeBands {
  const bands = AGE_BANDS.map((b) => ({ label: b.label, count: 0 }));
  let unknown = 0;

  for (const user of users) {
    if (!user.birthday) {
      unknown += 1;
      continue;
    }
    const birthday = new Date(user.birthday);
    const age = differenceInYears(now, birthday);
    if (Number.isNaN(age) || age < 0 || age > 120) {
      unknown += 1;
      continue;
    }
    const index = AGE_BANDS.findIndex((b) => age >= b.min && age <= b.max);
    if (index >= 0) bands[index].count += 1;
  }

  return { bands, unknown };
}

// ---------------------------------------------------------------------------
// Subject popularity
// ---------------------------------------------------------------------------

export interface SubjectCount {
  subject: string;
  count: number;
}

/** Counts how many teachers mention each subject in class_info, top N first. */
export function subjectCounts(
  users: Pick<MetricUser, "class_info">[],
  top = 8
): SubjectCount[] {
  const counts = new Map<string, { subject: string; count: number }>();

  for (const user of users) {
    if (!user.class_info) continue;
    for (const rawSubject of Object.keys(user.class_info)) {
      const subject = rawSubject.trim();
      if (!subject) continue;
      const key = subject.toLowerCase();
      const entry = counts.get(key);
      if (entry) entry.count += 1;
      else counts.set(key, { subject, count: 1 });
    }
  }

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count || a.subject.localeCompare(b.subject))
    .slice(0, top);
}

// ---------------------------------------------------------------------------
// Classes per teacher
// ---------------------------------------------------------------------------

export interface ClassLoad {
  buckets: { label: string; count: number }[];
  averageClasses: number;
  teachers: number;
}

/** Groups teachers by how many classes they listed (sum of class arrays). */
export function classLoadHistogram(
  users: Pick<MetricUser, "class_info">[]
): ClassLoad {
  const labels = ["0", "1", "2", "3", "4", "5+"];
  const buckets = labels.map((label) => ({ label, count: 0 }));
  let totalClasses = 0;

  for (const user of users) {
    const classes = user.class_info
      ? Object.values(user.class_info).reduce((sum, list) => sum + list.length, 0)
      : 0;
    totalClasses += classes;
    buckets[Math.min(classes, 5)].count += 1;
  }

  return {
    buckets,
    averageClasses: users.length === 0 ? 0 : totalClasses / users.length,
    teachers: users.length,
  };
}

// ---------------------------------------------------------------------------
// Growth windows (shared by KPI cards and acquisition velocity)
// ---------------------------------------------------------------------------

export interface WindowComparison {
  current: number;
  previous: number;
}

export interface RegistrationStats {
  today: WindowComparison;
  week: WindowComparison;
  month: WindowComparison;
  /** Average sign-ups per day over the last 7 and 30 days. */
  perDay7: number;
  perDay30: number;
  total: number;
}

/**
 * Counts registrations for today / last 7 days / last 30 days, each with the
 * equal-length window right before it, plus per-day acquisition rates.
 */
export function registrationWindows(
  createdAt: (Date | null)[],
  timeZone: string,
  now: Date = new Date()
): RegistrationStats {
  const todayStart = startOfZonedDay(now, timeZone).getTime();
  // Midnight before, not 24h before: a DST change day is 23 or 25 hours.
  const yesterdayStart = startOfZonedDay(new Date(todayStart - 1), timeZone).getTime();
  const dayMs = DAY_MS;
  const stats: RegistrationStats = {
    today: { current: 0, previous: 0 },
    week: { current: 0, previous: 0 },
    month: { current: 0, previous: 0 },
    perDay7: 0,
    perDay30: 0,
    total: 0,
  };

  for (const raw of createdAt) {
    if (!raw) continue;
    stats.total += 1;
    const t = raw.getTime();
    if (t >= todayStart) stats.today.current += 1;
    else if (t >= yesterdayStart) stats.today.previous += 1;

    const nowMs = now.getTime();
    if (t >= nowMs - 7 * dayMs) stats.week.current += 1;
    else if (t >= nowMs - 14 * dayMs) stats.week.previous += 1;

    if (t >= nowMs - 30 * dayMs) stats.month.current += 1;
    else if (t >= nowMs - 60 * dayMs) stats.month.previous += 1;
  }

  stats.perDay7 = stats.week.current / 7;
  stats.perDay30 = stats.month.current / 30;
  return stats;
}

/** Percent change between windows; null means "no prior data to compare". */
export function percentChange({ current, previous }: WindowComparison): number | null {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}
