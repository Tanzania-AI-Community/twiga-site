"use client";

import * as React from "react";

import { DEFAULT_TIME_ZONE } from "@/lib/time-zone";

const TimeZoneContext = React.createContext<string>(DEFAULT_TIME_ZONE);

/** Gives admin client components the zone the server used for this page. */
export function TimeZoneProvider({ timeZone, children }: { timeZone: string; children: React.ReactNode }) {
  return <TimeZoneContext.Provider value={timeZone}>{children}</TimeZoneContext.Provider>;
}

/** The admin's reporting time zone, matching the server-rendered figures. */
export function useReportingTimeZone(): string {
  return React.useContext(TimeZoneContext);
}
