import { cache } from "react";
import { cookies } from "next/headers";

import { resolveTimeZone, TIME_ZONE_COOKIE } from "@/lib/time-zone";

/**
 * The signed-in admin's reporting time zone (cookie set from the admin nav),
 * or the default. Read once per request.
 */
export const getReportingTimeZone = cache(async (): Promise<string> => {
  const cookieStore = await cookies();
  return resolveTimeZone(cookieStore.get(TIME_ZONE_COOKIE)?.value);
});
