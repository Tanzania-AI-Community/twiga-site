import { getMessageWindowStats } from "@/lib/data";
import { WindowKpiColumn } from "@/components/admin/metrics/GrowthKpis";

/**
 * Teacher messages today / last 7 days / last 30 days, each compared with the
 * window right before it. Counted in the database over the last 60 days, so
 * this column does not wait for the year chart.
 */
export async function MessagesKpis() {
  const stats = await getMessageWindowStats();

  return (
    <WindowKpiColumn
      emptyLabel={stats.total === 0 ? "No messages yet" : null}
      segments={[
        {
          label: "Today",
          data: stats.today,
          sub: `today vs yesterday (${stats.today.previous})`,
          infoKey: "kpi_messages_today",
        },
        {
          label: "Last 7 days",
          data: stats.week,
          sub: `this week vs prior 7d (${stats.week.previous})`,
          infoKey: "kpi_messages_week",
        },
        {
          label: "Last 30 days",
          data: stats.month,
          sub: `this month vs prior 30d (${stats.month.previous})`,
          infoKey: "kpi_messages_month",
        },
      ]}
    />
  );
}
