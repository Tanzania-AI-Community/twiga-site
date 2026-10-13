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
} as const satisfies Record<string, MetricInfoEntry>;

export type MetricInfoKey = keyof typeof metricInfo;
