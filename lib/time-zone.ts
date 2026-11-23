/**
 * Reporting time zone: the zone admin reports count days in (the dashboard's
 * daily counts and chart grouping, and the telemetry page). Each admin picks
 * it in the admin nav; the choice lives in a cookie. Server code reads it with
 * getReportingTimeZone (lib/time-zone-server), client code with
 * useReportingTimeZone (components/admin/TimeZoneProvider).
 *
 * Client-safe and dependency-free: only Intl, so the server and the browser
 * do the same calendar math.
 */

/** Zone used until an admin picks another one. */
export const DEFAULT_TIME_ZONE = "Africa/Dar_es_Salaam";

/** Cookie holding the admin's chosen zone. */
export const TIME_ZONE_COOKIE = "admin_time_zone";

/** Zones offered in the picker. A valid zone outside this list still works. */
export const TIME_ZONE_CHOICES: readonly string[] = [
  "Africa/Dar_es_Salaam",
  "Africa/Nairobi",
  "Africa/Kampala",
  "Africa/Kigali",
  "Africa/Johannesburg",
  "Africa/Lagos",
  "Africa/Cairo",
  "UTC",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Helsinki",
  "Asia/Dubai",
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
];

const formatters = new Map<string, Intl.DateTimeFormat>();

/** One cached formatter per zone that returns every wall-clock field. */
function wallFormatter(timeZone: string): Intl.DateTimeFormat {
  let f = formatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    formatters.set(timeZone, f);
  }
  return f;
}

/** True for an IANA zone name the runtime knows, e.g. "Africa/Dar_es_Salaam". */
export function isTimeZone(name: unknown): name is string {
  if (typeof name !== "string" || name === "" || name.length > 64) return false;
  try {
    wallFormatter(name);
    return true;
  } catch {
    return false;
  }
}

/** A stored value if it is a valid zone, otherwise the default. */
export function resolveTimeZone(name: string | null | undefined): string {
  return isTimeZone(name) ? name : DEFAULT_TIME_ZONE;
}

/** Calendar fields (month 1-12) of an instant, as a clock in `timeZone` shows it. */
export function wallClock(d: Date, timeZone: string) {
  const parts: Record<string, number> = {};
  for (const p of wallFormatter(timeZone).formatToParts(d)) {
    if (p.type !== "literal") parts[p.type] = Number(p.value);
  }
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
    second: parts.second,
  };
}

/** How far `timeZone` is ahead of UTC at an instant, in ms. */
function offsetMs(t: number, timeZone: string): number {
  const w = wallClock(new Date(t), timeZone);
  const wholeSecond = t - (((t % 1000) + 1000) % 1000);
  return Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute, w.second) - wholeSecond;
}

/**
 * The instant a clock in `timeZone` shows the given wall time. Out-of-range
 * fields roll over like Date.UTC (day 0 is the last day of the month before).
 */
export function zonedTime(timeZone: string, year: number, month: number, day: number, hour = 0, minute = 0, second = 0): Date {
  const asUtc = Date.UTC(year, month - 1, day, hour, minute, second);
  // Two passes so a DST change between the guess and the answer is honoured.
  const first = asUtc - offsetMs(asUtc, timeZone);
  return new Date(asUtc - offsetMs(first, timeZone));
}

/** YYYY-MM-DD of an instant in `timeZone`. */
export function tzDay(d: Date, timeZone: string): string {
  const w = wallClock(d, timeZone);
  return `${w.year}-${String(w.month).padStart(2, "0")}-${String(w.day).padStart(2, "0")}`;
}

/** Midnight that starts the day containing `d`, in `timeZone`. */
export function startOfZonedDay(d: Date, timeZone: string): Date {
  const w = wallClock(d, timeZone);
  return zonedTime(timeZone, w.year, w.month, w.day);
}

/** Midnight at the start of a YYYY-MM-DD day in `timeZone`. */
export function zonedDayStart(day: string, timeZone: string): Date {
  const [year, month, date] = day.split("-").map(Number);
  return zonedTime(timeZone, year, month, date);
}

/** Last millisecond of a YYYY-MM-DD day in `timeZone`. */
export function zonedDayEnd(day: string, timeZone: string): Date {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(zonedTime(timeZone, year, month, date + 1).getTime() - 1);
}

/** Zone name for labels: "long" gives "East Africa Time", "short" gives "GMT+3". */
export function zoneName(timeZone: string, style: "long" | "short"): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: style }).formatToParts(new Date());
  return parts.find((p) => p.type === "timeZoneName")?.value ?? timeZone;
}

/** "Africa/Dar_es_Salaam" -> "Dar es Salaam", for the picker. */
export function cityName(timeZone: string): string {
  return (timeZone.split("/").pop() ?? timeZone).replace(/_/g, " ");
}
