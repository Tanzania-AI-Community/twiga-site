import { getMessageDayCounts } from "@/lib/data";
import { bucketRegistrations } from "@/lib/metrics";
import { getReportingTimeZone } from "@/lib/time-zone-server";
import { RegistrationsChartClient } from "@/components/admin/metrics/RegistrationsChartClient";

/**
 * Teacher messages over time. The database returns one count per day; week
 * and month are summed from those days. Independent of the cards beside it.
 */
export async function MessagesChart() {
  const [days, timeZone] = await Promise.all([getMessageDayCounts(), getReportingTimeZone()]);

  return (
    <RegistrationsChartClient
      buckets={{
        day: bucketRegistrations(days, "day", timeZone),
        week: bucketRegistrations(days, "week", timeZone),
        month: bucketRegistrations(days, "month", timeZone),
      }}
      title="Messages over time"
      description="Teacher messages per period. Ignores your filters."
      seriesName="Messages"
      emptyTitle="No messages in this period"
      emptyHint="Messages show up here once teachers write in."
      infoKey="messages_chart"
    />
  );
}
