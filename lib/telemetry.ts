import { cache } from "react";
import { sql, type SQL } from "drizzle-orm";

import { db } from "@/db";
import { GRADE_ORDER, sortGrades } from "@/lib/telemetry-format";

export * from "@/lib/telemetry-format";

/**
 * Telemetry: teacher onboarding, retention, subject and agent-reliability KPIs.
 *
 * Every number follows the definitions of the Twiga teacher analytics report
 * (twiga-analytics/analytics_schema.sql and metrics.py), so the page and the
 * report agree. The report's views don't exist in production, so each query
 * carries its own CTEs (see `base`). Postgres skips the CTEs a query doesn't
 * reference.
 *
 * Privacy: tool-failure and reply-type detection read message content inside
 * SQL. Only counts and dates ever leave the database.
 *
 * Every query takes an "as of" time. Production uses now; passing the time of
 * the last message in a snapshot reproduces the report exactly.
 */

const TZ = "Africa/Dar_es_Salaam";

/**
 * Accounts that are not real Tanzanian teachers: test schools, team and
 * partner schools, pilot users and numbers outside Tanzania. Keep in sync
 * with analytics.excluded_accounts in the analytics repo.
 */
const EXCLUDED_SCHOOLS = [
  "test",
  "vvv",
  "tt",
  "kak",
  "narnia",
  "kth",
  "ai community",
  "enabel",
  "school3",
  "school 2",
];
const EXCLUDED_IDS = [3, 6, 13, 16, 7, 11, 96, 269, 272];

const excludedSchools = sql.join(
  EXCLUDED_SCHOOLS.map((s) => sql`${s}`),
  sql`, `
);
const excludedIds = sql.join(
  EXCLUDED_IDS.map((id) => sql`${id}`),
  sql`, `
);

/** Shared CTEs: the report's analytics views, bounded by the as-of time. */
function base(asOf: Date, from: Date | null): SQL {
  return sql`
p as (
  select ${asOf.toISOString()}::timestamptz as as_of,
    ${from ? from.toISOString() : null}::timestamptz as start_ts,
    -- Monthly charts: the range, or the last 12 months when the range is all time.
    coalesce(${from ? from.toISOString() : null}::timestamptz,
      (date_trunc('month', ${asOf.toISOString()}::timestamptz at time zone ${TZ}) - interval '11 months') at time zone ${TZ}
    ) as chart_from
),
teachers as (
  select u.id, u.onboarding_state::text as ob, u.created_at
  from users u
  where u.role::text = 'teacher'
    and u.created_at <= (select as_of from p)
    and lower(trim(coalesce(u.school_name, ''))) not in (${excludedSchools})
    and u.id not in (${excludedIds})
),
teacher_msgs as (
  select m.user_id, m.created_at
  from messages m join teachers t on t.id = m.user_id
  where m.role::text = 'user'
    and coalesce(m.content, '') not like '[FLOW_COMPLETED]%'
    and m.created_at <= (select as_of from p)
),
tool_calls as (
  select m.user_id, m.created_at, s.name::text as subject, c.id as class_id,
    tc->'function'->>'name' as tool_name
  from messages m
  join teachers t on t.id = m.user_id
  cross join lateral json_array_elements(m.tool_calls::json) tc
  left join classes c on c.id = nullif((tc->'function'->>'arguments')::json->>'class_id', '')::int
  left join subjects s on s.id = c.subject_id
  where m.tool_calls is not null and json_typeof(m.tool_calls::json) = 'array'
    and m.created_at <= (select as_of from p)
),
tool_results as (
  select m.user_id, m.tool_name, m.created_at,
    (m.content ~* '^\\s*(\\{\\s*"error"|error|failed|exception)' or m.content ~* 'error executing') as is_error
  from messages m join teachers t on t.id = m.user_id
  where m.role::text = 'tool' and m.created_at <= (select as_of from p)
),
assistant_replies as (
  select m.user_id, m.created_at,
    case
      when m.content like 'Sorry, something went wrong on my end%' then 'generic_failure'
      when m.content like 'Sorry, I can''t help with that request.%' then 'refusal'
      when m.content like 'Sorry, I only understand textual messages%' then 'non_text_rejected'
      when m.content ~* '^Sorry.{0,40}support English only' then 'english_only'
      when m.content like 'Sorry, the message you sent is too long%' then 'too_long'
      when m.content ~* '^Sorry, I couldn''t generate' then 'tool_failure_apology'
      else 'normal'
    end as reply_type
  from messages m join teachers t on t.id = m.user_id
  where m.role::text = 'assistant' and m.created_at <= (select as_of from p)
),
sessions as (
  select user_id, sess_no, min(created_at) as started_at, max(created_at) as ended_at,
    round(extract(epoch from max(created_at) - min(created_at)) / 60.0, 1) as minutes,
    count(*) as user_messages
  from (
    select *, sum(new_s) over (partition by user_id order by created_at) as sess_no
    from (
      select tm.*, case
        when lag(created_at) over w is null
          or created_at - lag(created_at) over w > interval '30 minutes' then 1 else 0 end as new_s
      from teacher_msgs tm window w as (partition by user_id order by created_at)
    ) x
  ) y
  group by user_id, sess_no
),
facts as (
  select t.id, t.ob, t.created_at, m.first_msg, m.last_msg,
    coalesce(m.msgs, 0) as msgs, coalesce(m.active_days, 0) as active_days,
    coalesce(c.n, 0) as tool_calls
  from teachers t
  left join (
    select user_id, count(*) as msgs, min(created_at) as first_msg, max(created_at) as last_msg,
      count(distinct (created_at at time zone ${TZ})::date) as active_days
    from teacher_msgs group by 1
  ) m on m.user_id = t.id
  left join (select user_id, count(*) as n from tool_calls group by 1) c on c.user_id = t.id
),
teacher_subjects as (
  select distinct tc.teacher_id, s.name::text as subject
  from teachers_classes tc
  join classes c on c.id = tc.class_id
  join subjects s on s.id = c.subject_id
  join teachers t on t.id = tc.teacher_id
),
-- Range scopes. Teacher figures use the cohort (registered in the range);
-- activity figures use the events that happened in the range.
cohort as (select * from facts where created_at >= coalesce((select start_ts from p), '-infinity')),
teacher_msgs_r as (select * from teacher_msgs where created_at >= coalesce((select start_ts from p), '-infinity')),
tool_calls_r as (select * from tool_calls where created_at >= coalesce((select start_ts from p), '-infinity')),
tool_results_r as (select * from tool_results where created_at >= coalesce((select start_ts from p), '-infinity')),
assistant_replies_r as (select * from assistant_replies where created_at >= coalesce((select start_ts from p), '-infinity')),
sessions_r as (select * from sessions where started_at >= coalesce((select start_ts from p), '-infinity')),
session_detail as (
  -- What happened in each session: tools run, subjects worked on, failures.
  -- Tool calls up to 10 minutes after the last teacher message still count.
  select s.user_id, s.sess_no, s.started_at, s.minutes, s.user_messages,
    x.tools, x.subjects,
    (exists(select 1 from tool_results tr where tr.user_id = s.user_id and tr.is_error
        and tr.created_at between s.started_at and s.ended_at + interval '10 minutes')
     or exists(select 1 from assistant_replies ar where ar.user_id = s.user_id
        and ar.reply_type in ('generic_failure', 'tool_failure_apology')
        and ar.created_at between s.started_at and s.ended_at + interval '10 minutes')) as had_failure
  from sessions s
  left join lateral (
    select array_agg(distinct tc.tool_name) filter (where tc.tool_name is not null) as tools,
      array_agg(distinct tc.subject || ':' || g.grade_level::text) filter (where tc.subject is not null) as subjects
    from tool_calls tc left join classes g on g.id = tc.class_id
    where tc.user_id = s.user_id and tc.created_at between s.started_at and s.ended_at + interval '10 minutes'
  ) x on true
),
session_detail_r as (select * from session_detail where started_at >= coalesce((select start_ts from p), '-infinity'))`;
}

async function query<T>(asOf: Date, from: Date | null, body: SQL): Promise<T[]> {
  const rows = await db.execute(sql`with ${base(asOf, from)} ${body}`);
  return rows as unknown as T[];
}

const n = (v: unknown) => {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
};

const fromDate = (fromIso: string) => (fromIso ? new Date(fromIso) : null);

/** Parses a ?asOf= value (date or timestamp). Anything else means now. */
export function parseAsOf(raw: string | string[] | undefined): Date | null {
  if (typeof raw !== "string" || !raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

// ---------------------------------------------------------------------------
// Overview and funnel
// ---------------------------------------------------------------------------

export interface TelemetryOverview {
  teachers: number;
  gaveDetails: number;
  onboarded: number;
  messaged: number;
  gotHelp: number;
  secondDay: number;
  fiveDays: number;
  active30: number;
  active7: number;
  lastMessage: string | null;
}

export const getOverview = cache(async (asOfIso: string, fromIso: string = ""): Promise<TelemetryOverview> => {
  const [r] = await query<Record<string, unknown>>(
    new Date(asOfIso),
    fromDate(fromIso),
    sql`
select
  count(*) as teachers,
  count(*) filter (where ob in ('personal_info_submitted', 'completed')) as gave_details,
  count(*) filter (where ob = 'completed') as onboarded,
  count(*) filter (where msgs > 0) as messaged,
  count(*) filter (where tool_calls > 0) as got_help,
  count(*) filter (where ob = 'completed' and active_days >= 2) as second_day,
  count(*) filter (where ob = 'completed' and active_days >= 5) as five_days,
  count(*) filter (where ob = 'completed' and last_msg >= (select as_of from p) - interval '30 days') as active_30,
  count(*) filter (where ob = 'completed' and last_msg >= (select as_of from p) - interval '7 days') as active_7,
  max(last_msg)::text as last_message
from cohort`
  );
  return {
    teachers: n(r?.teachers),
    gaveDetails: n(r?.gave_details),
    onboarded: n(r?.onboarded),
    messaged: n(r?.messaged),
    gotHelp: n(r?.got_help),
    secondDay: n(r?.second_day),
    fiveDays: n(r?.five_days),
    active30: n(r?.active_30),
    active7: n(r?.active_7),
    lastMessage: (r?.last_message as string | null) ?? null,
  };
});

// ---------------------------------------------------------------------------
// Retention by monthly group (fixed windows, too-recent groups left out)
// ---------------------------------------------------------------------------

export interface Cohort {
  month: string; // YYYY-MM, month of first message (EAT)
  teachers: number;
  w2: number;
  m2: number;
  /** False while the window hasn't finished for every teacher in the group. */
  okW2: boolean;
  okM2: boolean;
}

export interface Retention {
  cohorts: Cohort[];
  week2: { kept: number; of: number };
  month2: { kept: number; of: number };
}

export const getRetention = cache(async (asOfIso: string, fromIso: string = ""): Promise<Retention> => {
  const rows = await query<Record<string, unknown>>(
    new Date(asOfIso),
    fromDate(fromIso),
    sql`,
f as (
  select f.first_msg,
    exists(select 1 from teacher_msgs m where m.user_id = f.id
      and m.created_at >= f.first_msg + interval '7 days' and m.created_at < f.first_msg + interval '14 days') as w2,
    exists(select 1 from teacher_msgs m where m.user_id = f.id
      and m.created_at >= f.first_msg + interval '30 days' and m.created_at < f.first_msg + interval '60 days') as m2
  from cohort f where f.ob = 'completed' and f.first_msg is not null
)
select to_char(date_trunc('month', first_msg at time zone ${TZ}), 'YYYY-MM') as month,
  count(*) as teachers,
  count(*) filter (where w2) as w2,
  count(*) filter (where m2) as m2,
  bool_and(first_msg <= (select as_of from p) - interval '14 days') as ok_w2,
  bool_and(first_msg <= (select as_of from p) - interval '60 days') as ok_m2
from f group by 1 order by 1`
  );
  const cohorts: Cohort[] = rows.map((r) => ({
    month: String(r.month),
    teachers: n(r.teachers),
    w2: n(r.w2),
    m2: n(r.m2),
    okW2: Boolean(r.ok_w2),
    okM2: Boolean(r.ok_m2),
  }));
  const sum = (ok: (c: Cohort) => boolean, k: "w2" | "m2") => {
    const done = cohorts.filter(ok);
    return {
      kept: done.reduce((s, c) => s + c[k], 0),
      of: done.reduce((s, c) => s + c.teachers, 0),
    };
  };
  return {
    cohorts,
    week2: sum((c) => c.okW2, "w2"),
    month2: sum((c) => c.okM2, "m2"),
  };
});

// ---------------------------------------------------------------------------
// Subjects
// ---------------------------------------------------------------------------

export interface SubjectRow {
  subject: string;
  grades: string[];
  teachers: number;
  active30: number;
  eligibleW2: number;
  keptW2: number;
  eligibleM2: number;
  keptM2: number;
  usingTeachers: number;
  sessions: number;
  longestMin: number | null;
}

export interface SubjectStats {
  rows: SubjectRow[];
  /** Subjects Twiga knows about but that aren't set up in the database. */
  notSetUp: string[];
}

export const getSubjects = cache(async (asOfIso: string, fromIso: string = ""): Promise<SubjectStats> => {
  const asOf = new Date(asOfIso);
  const [rows, missing] = await Promise.all([
    query<Record<string, unknown>>(asOf, fromDate(fromIso),
      sql`,
win as (
  select f.id, f.first_msg, f.last_msg,
    exists(select 1 from teacher_msgs m where m.user_id = f.id
      and m.created_at >= f.first_msg + interval '7 days' and m.created_at < f.first_msg + interval '14 days') as w2,
    exists(select 1 from teacher_msgs m where m.user_id = f.id
      and m.created_at >= f.first_msg + interval '30 days' and m.created_at < f.first_msg + interval '60 days') as m2
  from cohort f where f.ob = 'completed'
),
reg as (select ts.subject, w.* from teacher_subjects ts join win w on w.id = ts.teacher_id),
use as (
  select subject, count(distinct user_id) as using_teachers
  from tool_calls_r where subject is not null group by 1
),
sess as (
  select subject, count(*) as sessions, max(minutes) as longest_min from (
    select distinct s.user_id, s.sess_no, s.minutes, tc.subject
    from sessions_r s join tool_calls tc on tc.user_id = s.user_id
      and tc.created_at between s.started_at and s.ended_at + interval '10 minutes'
    where tc.subject is not null
  ) z group by 1
)
select s.name::text as subject,
  (select coalesce(array_agg(c.grade_level::text), '{}') from classes c
     where c.subject_id = s.id and c.status::text = 'active') as grades,
  count(r.id) as teachers,
  count(r.id) filter (where r.last_msg >= (select as_of from p) - interval '30 days') as active_30,
  count(r.id) filter (where r.first_msg <= (select as_of from p) - interval '14 days') as eligible_w2,
  count(r.id) filter (where r.first_msg <= (select as_of from p) - interval '14 days' and r.w2) as kept_w2,
  count(r.id) filter (where r.first_msg <= (select as_of from p) - interval '60 days') as eligible_m2,
  count(r.id) filter (where r.first_msg <= (select as_of from p) - interval '60 days' and r.m2) as kept_m2,
  coalesce(max(u.using_teachers), 0) as using_teachers,
  coalesce(max(se.sessions), 0) as sessions,
  max(se.longest_min) as longest_min
from subjects s
left join reg r on r.subject = s.name::text
left join use u on u.subject = s.name::text
left join sess se on se.subject = s.name::text
group by s.id, s.name
order by count(r.id) desc, s.name`
    ),
    db.execute(sql`
select e.enumlabel as subject from pg_enum e join pg_type t on t.oid = e.enumtypid
where t.typname = 'subjectname' and e.enumlabel not in (select name::text from subjects)
order by 1`),
  ]);

  return {
    rows: rows.map((r) => ({
      subject: String(r.subject),
      grades: sortGrades((r.grades as string[] | null) ?? []),
      teachers: n(r.teachers),
      active30: n(r.active_30),
      eligibleW2: n(r.eligible_w2),
      keptW2: n(r.kept_w2),
      eligibleM2: n(r.eligible_m2),
      keptM2: n(r.kept_m2),
      usingTeachers: n(r.using_teachers),
      sessions: n(r.sessions),
      longestMin: r.longest_min === null ? null : n(r.longest_min),
    })),
    notSetUp: (missing as unknown as { subject: string }[]).map((r) => r.subject),
  };
});

export interface GradeRow {
  subject: string;
  grade: string;
  active: boolean;
  teachers: number;
  active30: number;
  eligibleW2: number;
  keptW2: number;
  eligibleM2: number;
  keptM2: number;
  usingTeachers: number;
  sessions: number;
  longestMin: number | null;
}

/**
 * The subjects table, one level down: the same measures per grade (a class in
 * the database is one subject at one grade). A teacher who teaches several
 * grades of a subject counts in each of them, so grade rows can add up to more
 * than the subject row.
 */
export const getGradeBreakdown = cache(async (asOfIso: string, fromIso: string = ""): Promise<GradeRow[]> => {
  const rows = await query<Record<string, unknown>>(
    new Date(asOfIso),
    fromDate(fromIso),
    sql`,
win as (
  select f.id, f.first_msg, f.last_msg,
    exists(select 1 from teacher_msgs m where m.user_id = f.id
      and m.created_at >= f.first_msg + interval '7 days' and m.created_at < f.first_msg + interval '14 days') as w2,
    exists(select 1 from teacher_msgs m where m.user_id = f.id
      and m.created_at >= f.first_msg + interval '30 days' and m.created_at < f.first_msg + interval '60 days') as m2
  from cohort f where f.ob = 'completed'
),
reg as (select distinct tc.class_id, w.* from teachers_classes tc join win w on w.id = tc.teacher_id),
use as (
  select class_id, count(distinct user_id) as using_teachers
  from tool_calls_r where class_id is not null group by 1
),
sess as (
  select class_id, count(*) as sessions, max(minutes) as longest_min from (
    select distinct s.user_id, s.sess_no, s.minutes, tc.class_id
    from sessions_r s join tool_calls tc on tc.user_id = s.user_id
      and tc.created_at between s.started_at and s.ended_at + interval '10 minutes'
    where tc.class_id is not null
  ) z group by 1
)
select s.name::text as subject, c.grade_level::text as grade, (c.status::text = 'active') as active,
  count(r.id) as teachers,
  count(r.id) filter (where r.last_msg >= (select as_of from p) - interval '30 days') as active_30,
  count(r.id) filter (where r.first_msg <= (select as_of from p) - interval '14 days') as eligible_w2,
  count(r.id) filter (where r.first_msg <= (select as_of from p) - interval '14 days' and r.w2) as kept_w2,
  count(r.id) filter (where r.first_msg <= (select as_of from p) - interval '60 days') as eligible_m2,
  count(r.id) filter (where r.first_msg <= (select as_of from p) - interval '60 days' and r.m2) as kept_m2,
  coalesce(max(u.using_teachers), 0) as using_teachers,
  coalesce(max(se.sessions), 0) as sessions,
  max(se.longest_min) as longest_min
from classes c
join subjects s on s.id = c.subject_id
left join reg r on r.class_id = c.id
left join use u on u.class_id = c.id
left join sess se on se.class_id = c.id
group by s.name, c.id, c.grade_level, c.status`
  );
  return rows
    .map((r) => ({
      subject: String(r.subject),
      grade: String(r.grade),
      active: Boolean(r.active),
      teachers: n(r.teachers),
      active30: n(r.active_30),
      eligibleW2: n(r.eligible_w2),
      keptW2: n(r.kept_w2),
      eligibleM2: n(r.eligible_m2),
      keptM2: n(r.kept_m2),
      usingTeachers: n(r.using_teachers),
      sessions: n(r.sessions),
      longestMin: r.longest_min === null ? null : n(r.longest_min),
    }))
    .sort((a, b) => GRADE_ORDER.indexOf(a.grade) - GRADE_ORDER.indexOf(b.grade));
});

// ---------------------------------------------------------------------------
// Registrations and monthly activity
// ---------------------------------------------------------------------------

export interface MonthPoint {
  month: string; // YYYY-MM
  registered: number;
  finished: number;
  activeTeachers: number;
}

export interface PeakDay {
  day: string; // YYYY-MM-DD (EAT)
  registered: number;
  finished: number;
}

export const getGrowth = cache(
  async (asOfIso: string, fromIso: string = ""): Promise<{ months: MonthPoint[]; peaks: PeakDay[] }> => {
    const asOf = new Date(asOfIso);
    const [months, peaks] = await Promise.all([
      query<Record<string, unknown>>(asOf, fromDate(fromIso),
        sql`,
reg as (
  select to_char(date_trunc('month', created_at at time zone ${TZ}), 'YYYY-MM') as month,
    count(*) as registered, count(*) filter (where ob = 'completed') as finished
  from cohort where created_at >= (select chart_from from p) group by 1
),
act as (
  select to_char(date_trunc('month', m.created_at at time zone ${TZ}), 'YYYY-MM') as month,
    count(distinct m.user_id) as active_teachers
  from teacher_msgs m join teachers t on t.id = m.user_id
  where t.ob = 'completed' and m.created_at >= (select chart_from from p) group by 1
)
select coalesce(reg.month, act.month) as month,
  coalesce(reg.registered, 0) as registered, coalesce(reg.finished, 0) as finished,
  coalesce(act.active_teachers, 0) as active_teachers
from reg full join act on act.month = reg.month
order by 1`
      ),
      query<Record<string, unknown>>(asOf, fromDate(fromIso),
        sql`
select (created_at at time zone ${TZ})::date::text as day, count(*) as registered,
  count(*) filter (where ob = 'completed') as finished
from cohort group by 1 order by 2 desc, 1 desc limit 8`
      ),
    ]);
    return {
      months: months.map((r) => ({
        month: String(r.month),
        registered: n(r.registered),
        finished: n(r.finished),
        activeTeachers: n(r.active_teachers),
      })),
      peaks: peaks.map((r) => ({
        day: String(r.day),
        registered: n(r.registered),
        finished: n(r.finished),
      })),
    };
  }
);

// ---------------------------------------------------------------------------
// Agent reliability
// ---------------------------------------------------------------------------

export interface ToolRow {
  tool: string;
  calls30: number;
  errors30: number;
  calls: number;
  errors: number;
  lastFailure: string | null;
  lastSuccess: string | null;
}

export interface ToolMonth {
  month: string;
  tool: string;
  calls: number;
  errors: number;
}

export interface ReplyTypeRow {
  type: string;
  last30: number;
  teachers30: number;
  total: number;
  lastSeen: string | null;
}

export interface Reliability {
  tools: ToolRow[];
  monthly: ToolMonth[];
  replies: ReplyTypeRow[];
  replies30: number;
}

export const getReliability = cache(async (asOfIso: string, fromIso: string = ""): Promise<Reliability> => {
  const asOf = new Date(asOfIso);
  const [tools, monthly, replies] = await Promise.all([
    query<Record<string, unknown>>(asOf, fromDate(fromIso),
      sql`
select tool_name as tool,
  count(*) filter (where created_at >= (select as_of from p) - interval '30 days') as calls_30,
  count(*) filter (where is_error and created_at >= (select as_of from p) - interval '30 days') as errors_30,
  count(*) filter (where created_at >= coalesce((select start_ts from p), '-infinity')) as calls,
  count(*) filter (where is_error and created_at >= coalesce((select start_ts from p), '-infinity')) as errors,
  (max(created_at) filter (where is_error) at time zone ${TZ})::date::text as last_failure,
  (max(created_at) filter (where not is_error) at time zone ${TZ})::date::text as last_success
from tool_results where tool_name is not null
group by 1 order by 4 desc`
    ),
    query<Record<string, unknown>>(asOf, fromDate(fromIso),
      sql`
select to_char(date_trunc('month', created_at at time zone ${TZ}), 'YYYY-MM') as month, tool_name as tool,
  count(*) as calls, count(*) filter (where is_error) as errors
from tool_results
where tool_name is not null and created_at >= (select chart_from from p)
group by 1, 2 order by 1, 2`
    ),
    query<Record<string, unknown>>(asOf, fromDate(fromIso),
      sql`
select reply_type as type,
  count(*) filter (where created_at >= (select as_of from p) - interval '30 days') as last_30,
  count(distinct user_id) filter (where created_at >= (select as_of from p) - interval '30 days') as teachers_30,
  count(*) filter (where created_at >= coalesce((select start_ts from p), '-infinity')) as total,
  (max(created_at) at time zone ${TZ})::date::text as last_seen
from assistant_replies group by 1 order by 4 desc`
    ),
  ]);

  const replyRows = replies.map((r) => ({
    type: String(r.type),
    last30: n(r.last_30),
    teachers30: n(r.teachers_30),
    total: n(r.total),
    lastSeen: (r.last_seen as string | null) ?? null,
  }));

  return {
    tools: tools.map((r) => ({
      tool: String(r.tool),
      calls30: n(r.calls_30),
      errors30: n(r.errors_30),
      calls: n(r.calls),
      errors: n(r.errors),
      lastFailure: (r.last_failure as string | null) ?? null,
      lastSuccess: (r.last_success as string | null) ?? null,
    })),
    monthly: monthly.map((r) => ({
      month: String(r.month),
      tool: String(r.tool),
      calls: n(r.calls),
      errors: n(r.errors),
    })),
    replies: replyRows.filter((r) => r.type !== "normal"),
    replies30: replyRows.reduce((s, r) => s + r.last30, 0),
  };
});

// ---------------------------------------------------------------------------
// Follow-up list: teachers who didn't finish onboarding
// ---------------------------------------------------------------------------

export interface UnfinishedTeacher {
  id: number;
  name: string | null;
  waId: string;
  school: string | null;
  region: string | null;
  accountState: string;
  /** "new" (never gave details) or "personal_info_submitted" (stopped at subjects). */
  stoppedAt: string;
  month: string; // YYYY-MM of registration (EAT)
  registered: string; // YYYY-MM-DD HH:MM (EAT)
  messages: number;
  lastMessage: string | null; // YYYY-MM-DD HH:MM (EAT)
}

/**
 * Real teachers who registered but never finished onboarding, newest first.
 * Contains personal data (names, phone numbers): only call it from code that
 * has checked the admin session.
 */
export async function getUnfinishedTeachers(asOfIso: string, fromIso: string = ""): Promise<UnfinishedTeacher[]> {
  const rows = await query<Record<string, unknown>>(
    new Date(asOfIso),
    fromDate(fromIso),
    sql`
select u.id, u.name, u.wa_id, u.school_name, u.region, u.state::text as account_state,
  coalesce(f.ob, 'new') as stopped_at,
  to_char(date_trunc('month', f.created_at at time zone ${TZ}), 'YYYY-MM') as month,
  to_char(f.created_at at time zone ${TZ}, 'YYYY-MM-DD HH24:MI') as registered,
  f.msgs as messages,
  to_char(f.last_msg at time zone ${TZ}, 'YYYY-MM-DD HH24:MI') as last_message
from cohort f join users u on u.id = f.id
where f.ob is distinct from 'completed'
order by f.created_at desc`
  );
  return rows.map((r) => ({
    id: n(r.id),
    name: (r.name as string | null) ?? null,
    waId: String(r.wa_id),
    school: (r.school_name as string | null) ?? null,
    region: (r.region as string | null) ?? null,
    accountState: String(r.account_state),
    stoppedAt: String(r.stopped_at),
    month: String(r.month),
    registered: String(r.registered),
    messages: n(r.messages),
    lastMessage: (r.last_message as string | null) ?? null,
  }));
}

// ---------------------------------------------------------------------------
// Sessions: how long teachers stay and what they do
// ---------------------------------------------------------------------------

export interface SessionSummary {
  sessions: number;
  teachers: number;
  medianMin: number;
  p90Min: number;
  maxMin: number;
  avgMessages: number;
  withTools: number;
  withFailure: number;
  sessions30: number;
  teachers30: number;
  medianMin30: number | null;
  withTools30: number;
  withFailure30: number;
}

export interface SessionActivity {
  /** A tool name, or "chat_only" for sessions where no tool ran. */
  activity: string;
  sessions: number;
  sessions30: number;
  teachers: number;
}

export interface SessionMonth {
  month: string;
  sessions: number;
  withTools: number;
  medianMin: number;
}

export interface SessionEntry {
  started: string; // YYYY-MM-DD HH:MM (EAT)
  teacher: string;
  minutes: number;
  messages: number;
  tools: string[];
  /** "subject:grade" pairs. */
  subjects: string[];
  hadFailure: boolean;
}

export interface SessionStats {
  summary: SessionSummary;
  activities: SessionActivity[];
  lengths: { bucket: string; sessions: number; sessions30: number }[];
  months: SessionMonth[];
  longest: SessionEntry[];
  recent: SessionEntry[];
}

const LENGTH_BUCKETS = ["Single message", "Under 5 min", "5–15 min", "15–30 min", "30–60 min", "Over 1 hour"];

export const getSessions = cache(async (asOfIso: string, fromIso: string = ""): Promise<SessionStats> => {
  const asOf = new Date(asOfIso);
  const last30 = sql`started_at >= (select as_of from p) - interval '30 days'`;
  const inRange = sql`started_at >= coalesce((select start_ts from p), '-infinity')`;
  const entry = (order: SQL) => sql`
select to_char(d.started_at at time zone ${TZ}, 'YYYY-MM-DD HH24:MI') as started,
  coalesce(nullif(trim(u.name), ''), 'Teacher #' || u.id) as teacher,
  d.minutes, d.user_messages, d.tools, d.subjects, d.had_failure
from session_detail_r d join users u on u.id = d.user_id
order by ${order} limit 12`;

  const [[summary], activities, lengths, months, longest, recent] = await Promise.all([
    query<Record<string, unknown>>(asOf, fromDate(fromIso), sql`
select count(*) filter (where ${inRange}) as sessions,
  count(distinct user_id) filter (where ${inRange}) as teachers,
  percentile_cont(0.5) within group (order by minutes) filter (where ${inRange}) as median_min,
  percentile_cont(0.9) within group (order by minutes) filter (where ${inRange}) as p90_min,
  max(minutes) filter (where ${inRange}) as max_min,
  avg(user_messages) filter (where ${inRange}) as avg_messages,
  count(*) filter (where ${inRange} and tools is not null) as with_tools,
  count(*) filter (where ${inRange} and had_failure) as with_failure,
  count(*) filter (where ${last30}) as sessions_30,
  count(distinct user_id) filter (where ${last30}) as teachers_30,
  percentile_cont(0.5) within group (order by minutes) filter (where ${last30}) as median_min_30,
  count(*) filter (where ${last30} and tools is not null) as with_tools_30,
  count(*) filter (where ${last30} and had_failure) as with_failure_30
from session_detail`),
    query<Record<string, unknown>>(asOf, fromDate(fromIso), sql`
select coalesce(t.tool, 'chat_only') as activity, count(*) as sessions,
  count(*) filter (where ${last30}) as sessions_30, count(distinct d.user_id) as teachers
from session_detail_r d
left join lateral unnest(coalesce(d.tools, array[null]::text[])) as t(tool) on true
group by 1 order by 2 desc`),
    query<Record<string, unknown>>(asOf, fromDate(fromIso), sql`
select case
    when user_messages = 1 then 0 when minutes < 5 then 1 when minutes < 15 then 2
    when minutes < 30 then 3 when minutes < 60 then 4 else 5 end as bucket,
  count(*) as sessions, count(*) filter (where ${last30}) as sessions_30
from session_detail_r group by 1 order by 1`),
    query<Record<string, unknown>>(asOf, fromDate(fromIso), sql`
select to_char(date_trunc('month', started_at at time zone ${TZ}), 'YYYY-MM') as month,
  count(*) as sessions, count(*) filter (where tools is not null) as with_tools,
  percentile_cont(0.5) within group (order by minutes) as median_min
from session_detail
where started_at >= (select chart_from from p)
group by 1 order by 1`),
    query<Record<string, unknown>>(asOf, fromDate(fromIso), entry(sql`d.minutes desc, d.started_at desc`)),
    query<Record<string, unknown>>(asOf, fromDate(fromIso), entry(sql`d.started_at desc`)),
  ]);

  const toEntry = (r: Record<string, unknown>): SessionEntry => ({
    started: String(r.started),
    teacher: String(r.teacher),
    minutes: n(r.minutes),
    messages: n(r.user_messages),
    tools: ((r.tools as string[] | null) ?? []).filter(Boolean),
    subjects: ((r.subjects as string[] | null) ?? []).filter(Boolean),
    hadFailure: Boolean(r.had_failure),
  });
  const counts = new Map(lengths.map((r) => [n(r.bucket), r]));

  return {
    summary: {
      sessions: n(summary?.sessions),
      teachers: n(summary?.teachers),
      medianMin: n(summary?.median_min),
      p90Min: n(summary?.p90_min),
      maxMin: n(summary?.max_min),
      avgMessages: n(summary?.avg_messages),
      withTools: n(summary?.with_tools),
      withFailure: n(summary?.with_failure),
      sessions30: n(summary?.sessions_30),
      teachers30: n(summary?.teachers_30),
      medianMin30: summary?.median_min_30 === null ? null : n(summary?.median_min_30),
      withTools30: n(summary?.with_tools_30),
      withFailure30: n(summary?.with_failure_30),
    },
    activities: activities.map((r) => ({
      activity: String(r.activity),
      sessions: n(r.sessions),
      sessions30: n(r.sessions_30),
      teachers: n(r.teachers),
    })),
    lengths: LENGTH_BUCKETS.map((bucket, i) => ({
      bucket,
      sessions: n(counts.get(i)?.sessions),
      sessions30: n(counts.get(i)?.sessions_30),
    })),
    months: months.map((r) => ({
      month: String(r.month),
      sessions: n(r.sessions),
      withTools: n(r.with_tools),
      medianMin: n(r.median_min),
    })),
    longest: longest.map(toEntry),
    recent: recent.map(toEntry),
  };
});
