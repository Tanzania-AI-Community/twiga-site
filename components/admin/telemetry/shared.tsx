import { MetricInfo } from "@/components/admin/MetricInfo";
import type { MetricInfoKey } from "@/lib/metric-info";
import { cn } from "@/lib/utils";

/** Bordered card with the dashboard's header pattern (icon, title, subtitle, "i"). */
export function TelemetryCard({
  icon,
  title,
  description,
  infoKey,
  className,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  infoKey: MetricInfoKey;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "group relative flex flex-col rounded-md border bg-card p-4 shadow-xs",
        className
      )}
    >
      <h2 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900">
        {icon}
        {title}
      </h2>
      <p className="mt-0.5 mb-3 text-xs text-muted-foreground">{description}</p>
      {children}
      <MetricInfo infoKey={infoKey} />
    </section>
  );
}

export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 py-8 text-center">
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

/** "16 / 214" with the share underneath, or a muted dash when too few. */
export function Ratio({
  kept,
  of,
  min = 5,
}: {
  kept: number;
  of: number;
  min?: number;
}) {
  if (of < min) return <span className="text-muted-foreground">–</span>;
  return (
    <span className="whitespace-nowrap">
      <span className="font-semibold text-slate-900">{kept}</span>
      <span className="text-muted-foreground"> / {of}</span>
      <span className="ml-1.5 text-[11px] text-muted-foreground">
        {Math.round((100 * kept) / of)}%
      </span>
    </span>
  );
}

/** Small uppercase table header cell text. */
export const th =
  "h-8 px-2 text-left text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap";
export const td = "px-2 py-2 text-xs text-slate-700 align-middle";
