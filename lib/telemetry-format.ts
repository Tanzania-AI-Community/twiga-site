/**
 * Client-safe formatting helpers for the telemetry page (no database imports),
 * so client components can use them. lib/telemetry re-exports everything here.
 */

/** Telemetry reports in Tanzania time (UTC+3, no daylight saving). */
export const TIME_ZONE = "Africa/Dar_es_Salaam";
/** ISO offset for TIME_ZONE, used to turn a Tanzania day into an instant. */
export const TIME_ZONE_OFFSET = "+03:00";

/** Chart colours, matching the dashboard's green. */
export const CHART_COLORS = {
  primary: "#16a34a",
  light: "#bbf7d0",
  failure: "#dc2626",
  warning: "#d97706",
  secondary: "#0ea5e9",
} as const;

/** YYYY-MM-DD of an instant, in Tanzania time. */
export function tzDay(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(d);
}

/** Minutes as "<1 min", "15 min" or "1 h 54 min"; `precise` keeps one decimal under an hour. */
export function formatMinutes(min: number | null, precise = false): string {
  if (min === null) return "–";
  if (min < 1) return "<1 min";
  if (min < 60) return `${precise ? Math.round(min * 10) / 10 : Math.round(min)} min`;
  return `${Math.floor(min / 60)} h ${Math.round(min % 60)} min`;
}

export const GRADE_ORDER = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "os1", "os2", "os3", "os4", "as1", "as2"];

export function sortGrades(grades: string[]): string[] {
  return [...grades].sort((a, b) => GRADE_ORDER.indexOf(a) - GRADE_ORDER.indexOf(b));
}

/** "os1" -> "Form 1", "as2" -> "Form 6", "p5" -> "Standard 5". */
export function gradeLabel(grade: string): string {
  const m = /^(p|os|as)(\d)$/.exec(grade);
  if (!m) return grade;
  const k = Number(m[2]);
  if (m[1] === "p") return `Standard ${k}`;
  return `Form ${m[1] === "os" ? k : k + 4}`;
}

/** Compact range for a sorted grade list: "Form 1–4", "Standard 4–6", "Form 1, 3". */
export function gradeRange(grades: string[]): string {
  if (grades.length === 0) return "";
  const labels = grades.map(gradeLabel);
  const prefix = labels[0].replace(/\s\d+$/, "");
  const nums = labels.map((l) => Number(l.replace(/^\D+/, "")));
  const sameKind = labels.every((l) => l.startsWith(prefix));
  const contiguous = nums.every((x, i) => i === 0 || x === nums[i - 1] + 1);
  if (sameKind && contiguous && nums.length > 1) return `${prefix} ${nums[0]}–${nums[nums.length - 1]}`;
  if (sameKind) return `${prefix} ${nums.join(", ")}`;
  return labels.join(", ");
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-05" -> "May 2026" (or "May 26" when short). */
export function monthLabel(ym: string, short = false): string {
  const [y, m] = ym.split("-");
  return `${MONTHS[Number(m) - 1]} ${short ? y.slice(2) : y}`;
}

/** "2026-09-16" -> "16 Sep 2026". */
export function dayLabel(ymd: string | null): string {
  if (!ymd) return "–";
  const [y, m, d] = ymd.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

export const TOOL_LABELS: Record<string, string> = {
  search_knowledge: "Textbook search",
  generate_exercise: "Exercise generation",
  create_lesson_plan: "Lesson plans",
  generate_necta_style_exam: "NECTA-style exams",
  solve_equation: "Equation solver",
};

export const REPLY_LABELS: Record<string, string> = {
  generic_failure: "“Something went wrong”",
  tool_failure_apology: "“Couldn't generate” apology",
  refusal: "Refused the request",
  non_text_rejected: "Rejected a non-text message",
  english_only: "Told the teacher English only",
  too_long: "Message too long",
};

export function subjectLabel(subject: string): string {
  const s = subject.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Same "17 Nov 2026" style as dayLabel, for a moment in time (Tanzania day). */
const DAY_FMT = { format: (d: Date) => dayLabel(tzDay(d)) };

/** "1 Sep 2026 – 17 Nov 2026", or "any time up to 17 Nov 2026" when there is no start. Reads inside a sentence. */
export function rangeLabel(fromIso: string, asOfIso: string): string {
  const end = DAY_FMT.format(new Date(asOfIso));
  if (!fromIso) return `any time up to ${end}`;
  return `${DAY_FMT.format(new Date(fromIso))} – ${end}`;
}

/** Monthly charts cover this many months when the range is all time. */
export const CHART_MONTHS = 12;
/** The longer "active recently" window, in days back from the end of the range. */
export const ACTIVE_LONG_DAYS = 30;

/** Window used by the monthly charts: the range, or the last CHART_MONTHS months. */
export function chartRangeLabel(fromIso: string, asOfIso: string): string {
  return fromIso
    ? rangeLabel(fromIso, asOfIso)
    : `Last ${CHART_MONTHS} months, up to ${DAY_FMT.format(new Date(asOfIso))}`;
}

/** "last 30 days to 17 Nov 2026". */
export function last30Label(asOfIso: string): string {
  return `last ${ACTIVE_LONG_DAYS} days to ${DAY_FMT.format(new Date(asOfIso))}`;
}

/** First letter upper-case, for a range label that starts a line. */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
