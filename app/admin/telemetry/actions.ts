"use server";

import { isAdminAuthenticated } from "@/lib/auth";
import { getUnfinishedTeachers, type UnfinishedTeacher } from "@/lib/telemetry";

/**
 * Teachers who didn't finish onboarding, for the follow-up panel. Names and
 * phone numbers are only sent when an admin opens the panel, never with the page.
 */
export async function loadUnfinishedTeachers(asOf: string, from = ""): Promise<UnfinishedTeacher[]> {
  if (!(await isAdminAuthenticated())) throw new Error("Not signed in");
  const date = new Date(asOf);
  const start = from ? new Date(from) : null;
  return getUnfinishedTeachers(
    Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString(),
    start && !Number.isNaN(start.getTime()) ? start.toISOString() : ""
  );
}
