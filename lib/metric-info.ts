/**
 * Plain-language explainers for every dashboard metric, shown by the
 * MetricInfo "i" popover. Keep the wording simple and non-technical so
 * anyone on the team can read it.
 */

export interface MetricInfoEntry {
  title: string;
  what: string;
  how: string;
}

export const metricInfo = {
  stat_total: {
    title: "Total Users",
    what: "How many people are registered on Twiga in total. If you have filters on, this counts only the people that match your filters.",
    how: "We count every account in the user list.",
  },
  stat_active: {
    title: "Active",
    what: "Teachers who are currently using Twiga normally.",
    how: "Every account has a status. We count the accounts whose status is Active.",
  },
  stat_onboarding: {
    title: "Onboarding",
    what: "Teachers who joined recently and are still finishing their profile setup.",
    how: "We count the accounts whose status is Onboarding.",
  },
  stat_approved: {
    title: "Approved",
    what: "Teachers whose registration was approved but who have not started using the service yet.",
    how: "We count the accounts whose status is Approved.",
  },
  stat_blocked: {
    title: "Blocked",
    what: "Accounts that an admin has blocked from using the service.",
    how: "We count the accounts whose status is Blocked.",
  },
  stat_rate_limited: {
    title: "Rate Limited",
    what: "Accounts that were paused for a while because they sent too many messages in a short time.",
    how: "We count the accounts whose status is Rate Limited.",
  },
  stat_inactive: {
    title: "Inactive",
    what: "Accounts that have gone quiet and are marked as not in use.",
    how: "We count the accounts whose status is Inactive.",
  },
  stat_in_review: {
    title: "In Review",
    what: "New registrations that are waiting for an admin to approve or reject them.",
    how: "We count the accounts whose status is In Review.",
  },
  kpi_today: {
    title: "New sign-ups today",
    what: "How many teachers registered today, and how that compares with yesterday.",
    how: "We count accounts created since midnight, then compare with yesterday to work out the percentage. This number ignores your filters.",
  },
  kpi_week: {
    title: "New sign-ups, last 7 days",
    what: "How many teachers registered in the past week, and whether that is more or less than the week before.",
    how: "We count accounts created in the last 7 days and compare with the 7 days before that. This number ignores your filters.",
  },
  kpi_month: {
    title: "New sign-ups, last 30 days",
    what: "How many teachers registered in the past month, and whether that is more or less than the month before.",
    how: "We count accounts created in the last 30 days and compare with the 30 days before that. This number ignores your filters.",
  },
  kpi_messages_today: {
    title: "Messages today",
    what: "How many messages teachers sent today, and how that compares with yesterday.",
    how: "We count messages teachers sent since midnight, then compare with yesterday. Twiga's own replies and the steps it takes internally are not included. This number ignores your filters.",
  },
  kpi_messages_week: {
    title: "Messages, last 7 days",
    what: "How many messages teachers sent in the past week, and whether that is more or less than the week before.",
    how: "We count messages teachers sent in the last 7 days and compare with the 7 days before that. This number ignores your filters.",
  },
  kpi_messages_month: {
    title: "Messages, last 30 days",
    what: "How many messages teachers sent in the past month, and whether that is more or less than the month before.",
    how: "We count messages teachers sent in the last 30 days and compare with the 30 days before that. This number ignores your filters.",
  },
  messages_chart: {
    title: "Messages over time",
    what: "How many messages teachers sent in each day, week or month, so you can see if usage is going up or down. Bars show each period on its own, Line shows the same numbers as a trend, and Cumulative shows the running total.",
    how: "Each message a teacher sends is stored with the time it arrived. We group those times. Twiga's replies and internal steps are left out. This chart ignores your filters.",
  },
  registrations_chart: {
    title: "Registrations over time",
    what: "How many teachers signed up in each day, week or month, so you can see if growth is going up or down. Bars show each period on its own, Line shows the same numbers as a trend, and Cumulative shows the running total.",
    how: "Every account records the date it was created. We group the sign-ups by that date. This chart follows your filters.",
  },
  velocity: {
    title: "Velocity",
    what: "Two speeds in one card. Teacher acquisition is how many new teachers join per day. Onboarding time is how long it takes a teacher to finish setting up their profile.",
    how: "Joining speed comes from counting sign-ups per day over the last 7 and 30 days. Pace compares the two, so a green arrow means joining is speeding up. Setup time is the gap between when an account was created and when it was last changed, for teachers who finished setup. Setup time is an estimate, because a later change to the account can make it look longer than it really was.",
  },
  age: {
    title: "Age distribution",
    what: "The ages of registered teachers, grouped into ranges.",
    how: "We work out each age from the birthday the teacher shared when registering. Teachers who did not share a birthday are left out, and we show how many were left out below the chart.",
  },
  subjects: {
    title: "Subject popularity",
    what: "Which subjects are taught by the most teachers.",
    how: "Each teacher lists the subjects they teach on their profile. We count how many teachers mention each subject and show the top ones.",
  },
  classes: {
    title: "Classes per teacher",
    what: "How heavy the teaching load is across the base, grouped by number of classes.",
    how: "We count the classes each teacher listed on their profile, then group teachers by that count.",
  },
  // -------------------------------------------------------------------------
  // Telemetry page. Same definitions as the teacher analytics report.
  // -------------------------------------------------------------------------
  tel_teachers: {
    title: "Teachers",
    what: "Everyone who has registered as a teacher on Twiga.",
    how: "We count teacher accounts, leaving out test accounts, the Twiga team, partners and numbers from outside Tanzania.",
  },
  tel_onboarded: {
    title: "Finished onboarding",
    what: "How many teachers completed setup, including choosing their subjects and grades.",
    how: "We count teachers whose onboarding is marked completed, out of all teachers.",
  },
  tel_active30: {
    title: "Active in the last 30 days",
    what: "Onboarded teachers who used Twiga at least once in the last 30 days.",
    how: "We count onboarded teachers who sent Twiga a message in the last 30 days, out of all onboarded teachers.",
  },
  tel_active7: {
    title: "Active in the last 7 days",
    what: "Onboarded teachers who used Twiga at least once in the last 7 days.",
    how: "We count onboarded teachers who sent Twiga a message in the last 7 days, out of all onboarded teachers.",
  },
  tel_week2: {
    title: "Back in week 2",
    what: "Of the teachers who started using Twiga, how many came back in their second week.",
    how: "For each onboarded teacher we look at days 7 to 13 after their first message. Monthly groups whose second week hasn't finished yet are left out, so new teachers don't pull the number down.",
  },
  tel_month2: {
    title: "Back in month 2",
    what: "Of the teachers who started using Twiga, how many were still using it in their second month.",
    how: "For each onboarded teacher we look at days 30 to 59 after their first message. Monthly groups whose second month hasn't finished yet are left out.",
  },
  tel_funnel: {
    title: "Teacher journey",
    what: "How far teachers get, from first contact to using Twiga regularly. Each bar is a share of everyone who contacted Twiga.",
    how: "Gave details and finished onboarding come from each account's setup state. Textbook help means Twiga used one of its tools (search, exercises, lesson plans, exams) for them. Second day and 5+ days count the separate days on which an onboarded teacher sent a message.",
  },
  tel_retention: {
    title: "Retention by start month",
    what: "Teachers grouped by the month they first messaged Twiga, and how many of each group came back in week 2 and in month 2.",
    how: "Week 2 is days 7 to 13 after a teacher's first message, month 2 is days 30 to 59. A group shows 'too recent' until every teacher in it has had the full window.",
  },
  tel_subjects: {
    title: "Subjects",
    what: "For each subject: the grades set up, how many onboarded teachers chose it, how many are still active, how many come back, how many got textbook help in it, and the longest working session.",
    how: "Teachers count once per subject they chose. Textbook help, sessions, exams and tool runs are matched to a subject through the grade Twiga searched or generated content for. Textbooks are the books linked to each grade. A session is a run of messages with no gap longer than 30 minutes. Failed runs are tool runs whose result was an error.",
  },
  tel_registrations: {
    title: "New teachers per month",
    what: "How many teachers registered each month, split by whether they finished onboarding.",
    how: "We group teacher accounts by the month they were created (Tanzania time).",
  },
  tel_active_monthly: {
    title: "Active teachers per month",
    what: "How many onboarded teachers used Twiga at least once in each month.",
    how: "We count the onboarded teachers who sent at least one message that month. All their messages count, including ones the conversation history later hides, so this can differ slightly from the Messages chart on the dashboard.",
  },
  tel_peaks: {
    title: "Registration peaks",
    what: "The days with the most new teachers, usually training sessions or outreach drives.",
    how: "We count teacher accounts created on each day (Tanzania time) and show the busiest days.",
  },
  tel_tools: {
    title: "Agent tools",
    what: "How often each of Twiga's tools ran in the last 30 days and how often it failed, with the last failure date.",
    how: "Each time Twiga runs a tool it stores the result. We count a run as failed when the result is an error. All-time totals include failures that have since been fixed, so look at the last 30 days for the current state.",
  },
  tel_tool_trend: {
    title: "Tool runs per month",
    what: "Successful and failed tool runs each month, so outages and fixes stand out.",
    how: "We group tool results by month (Tanzania time) and mark each one as succeeded or failed.",
  },
  tel_sessions: {
    title: "Sessions",
    what: "A session is one sitting: a teacher messaging Twiga until they stop for more than 30 minutes. This counts sessions, the teachers who had them, and how many messages a teacher sends in one.",
    how: "We take every message a teacher sent and start a new session whenever there is a gap of more than 30 minutes. All teachers count here, including those who never finished onboarding.",
  },
  tel_session_length: {
    title: "Session length",
    what: "How long teachers stay in one sitting. The typical length is the middle session; long sessions shows the length that only 1 in 10 sessions go beyond.",
    how: "Length is the time from a teacher's first to last message in a session. A session with one message has no length, so it counts as a single message.",
  },
  tel_session_activity: {
    title: "What happens in a session",
    what: "Whether Twiga used its textbook tools in a session (search, exercises, lesson plans, exams, equation solver) or the teacher only chatted.",
    how: "We match the tools Twiga ran to the session they happened in, allowing 10 minutes after the teacher's last message for Twiga to finish. This card doesn't look at what the teacher wrote.",
  },
  tel_session_failures: {
    title: "Sessions that hit a failure",
    what: "Sessions where a tool failed, or Twiga had to apologise that something went wrong or it couldn't generate what was asked.",
    how: "A session counts when any tool result in it was an error, or Twiga sent a 'something went wrong' or 'couldn't generate' reply.",
  },
  tel_session_months: {
    title: "Sessions per month",
    what: "How many sessions teachers had each month, split by whether Twiga used a textbook tool in them.",
    how: "Each session counts in the month it started (Tanzania time).",
  },
  tel_session_log: {
    title: "Session log",
    what: "Individual sessions: who, when, which subject and grade, which tools Twiga used, how long it lasted and whether anything failed.",
    how: "Built from the same sessions as the cards above. Subject and grade come from the grade Twiga searched or generated content for. Message text is never shown.",
  },
  tel_stuck: {
    title: "Where unfinished teachers stopped",
    what: "Teachers who registered but didn't finish onboarding, by the step they stopped at and their account status.",
    how: "'Never gave details' means they never sent their name and school; 'Stopped at subjects' means they gave details but never picked their subjects and grades. Open the list to follow up with them.",
  },
  tel_churn: {
    title: "Do early failures drive teachers away?",
    what: "Onboarded teachers split by whether something failed in their very first session, and how many of each group came back.",
    how: "A first-session failure is a tool error or a 'something went wrong' or 'couldn't generate' reply during that session. Came back means a second session; another day means messages on 2 or more days. Only teachers who started at least 14 days before the end of the range count, so everyone had time to return.",
  },
  tel_regions: {
    title: "Teachers by region",
    what: "Where registered teachers say they are, and how many of them finished onboarding.",
    how: "Region is what each teacher typed during onboarding, tidied for spelling of capitals and spaces. Teachers who never gave details have no region.",
  },
  tel_reg_weekday: {
    title: "Registrations by weekday",
    what: "Which days of the week teachers sign up, which shows when trainings and outreach happen.",
    how: "We count teacher accounts by the weekday they were created (Tanzania time).",
  },
  tel_usage_timing: {
    title: "When teachers use Twiga",
    what: "Teacher messages by day of the week and by hour of the day, to plan reminders, trainings and support hours.",
    how: "We count every message teachers sent, by its weekday and hour in Tanzania time.",
  },
  tel_reply_speed: {
    title: "Reply speed",
    what: "How long Twiga takes to answer, and how many teacher messages got no answer at all.",
    how: "A message counts as answered by Twiga's first reply after it, before the teacher wrote again (or within a day). The typical time is the middle answer; 1 in 10 answers take longer than the slow figure. 'Left without an answer' is an unanswered message that was the teacher's last.",
  },
  tel_errors: {
    title: "Most common errors",
    what: "The error messages Twiga's tools returned most often, so engineers know what to fix first.",
    how: "We group failed tool results by their error text. This is Twiga's own system message, never what the teacher wrote; long technical details are cut short.",
  },
  tel_science_demand: {
    title: "Asked for, not offered",
    what: "Teachers who mentioned physics or chemistry, subjects Twiga doesn't offer yet, and how many said outright they couldn't find them.",
    how: "We look for the words physics, fizikia, chemistry and kemia in teachers' messages, and for phrases like 'physics is not there'. Only the number of teachers leaves the database; no message text is shown or stored.",
  },
  tel_replies: {
    title: "Problem replies",
    what: "Replies where Twiga apologised, refused or couldn't help, in the last 30 days.",
    how: "We sort Twiga's replies by their standard wording, for example 'Sorry, something went wrong'. Only the counts are read; message text never leaves the database.",
  },
} as const satisfies Record<string, MetricInfoEntry>;

export type MetricInfoKey = keyof typeof metricInfo;
