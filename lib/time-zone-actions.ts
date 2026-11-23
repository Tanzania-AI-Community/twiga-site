"use server";

import { cookies } from "next/headers";

import { isAdminAuthenticated } from "@/lib/auth";
import { isTimeZone, TIME_ZONE_COOKIE } from "@/lib/time-zone";

/** Saves the admin's reporting time zone. The caller refreshes the page. */
export async function setReportingTimeZone(timeZone: string): Promise<{ error?: string }> {
  if (!(await isAdminAuthenticated())) return { error: "Not signed in" };
  if (!isTimeZone(timeZone)) return { error: "Unknown time zone" };

  const cookieStore = await cookies();
  cookieStore.set(TIME_ZONE_COOKIE, timeZone, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 365,
  });
  return {};
}
