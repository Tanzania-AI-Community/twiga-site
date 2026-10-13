import { getMessageDayCounts } from "@/lib/data";
import { bucketRegistrations } from "@/lib/metrics";
import { RegistrationsChartClient } from "@/components/admin/metrics/RegistrationsChartClient";

/**
 * Teacher messages over time. The database returns one count per day; week
 * and month are summed from those days. Independent of the cards beside it.
 */
export async function MessagesChart() {
  const days = await getMessageDayCounts();

  return (
    <RegistrationsChartClient
      buckets={{
        day: bucketRegistrations(days, "day"),
        week: bucketRegistrations(days, "week"),
        month: bucketRegistrations(days, "month"),
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
