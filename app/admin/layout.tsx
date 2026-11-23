import { TimeZoneProvider } from "@/components/admin/TimeZoneProvider";
import { getReportingTimeZone } from "@/lib/time-zone-server";

/** Shares the admin's reporting time zone with every admin client component. */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const timeZone = await getReportingTimeZone();
  return <TimeZoneProvider timeZone={timeZone}>{children}</TimeZoneProvider>;
}
