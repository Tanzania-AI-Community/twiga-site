"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CalendarRange, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const EAT_DAY = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Dar_es_Salaam" });

/** YYYY-MM-DD in Tanzania time, `days` before today. */
function eatDay(daysAgo = 0): string {
  return EAT_DAY.format(new Date(Date.now() - daysAgo * 86_400_000));
}

type Preset = { key: string; label: string; from: () => string; to: () => string };

const PRESETS: Preset[] = [
  { key: "all", label: "All time", from: () => "", to: () => "" },
  { key: "7d", label: "Last 7 days", from: () => eatDay(6), to: () => "" },
  { key: "30d", label: "Last 30 days", from: () => eatDay(29), to: () => "" },
  { key: "90d", label: "Last 90 days", from: () => eatDay(89), to: () => "" },
  { key: "year", label: "This year", from: () => `${eatDay().slice(0, 4)}-01-01`, to: () => "" },
];

/**
 * Date range for the whole telemetry page, kept in the URL (?from=&to=) so a
 * view can be shared. Empty "to" means up to now. Dates are Tanzania days.
 */
export function DateRangeFilter({ from, to }: { from: string; to: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = React.useTransition();
  const [custom, setCustom] = React.useState({ from, to });

  React.useEffect(() => setCustom({ from, to }), [from, to]);

  const active = PRESETS.find((p) => p.from() === from && p.to() === to)?.key ?? "custom";

  const apply = (nextFrom: string, nextTo: string) => {
    const q = new URLSearchParams(params.toString());
    if (nextFrom) q.set("from", nextFrom);
    else q.delete("from");
    if (nextTo) q.set("to", nextTo);
    else q.delete("to");
    startTransition(() => router.push(`${pathname}${q.size ? `?${q}` : ""}`, { scroll: false }));
  };

  const valid = !custom.from || !custom.to || custom.from <= custom.to;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <CalendarRange className="h-4 w-4 text-green-700" />
      <div className="flex flex-wrap gap-1" role="group" aria-label="Date range">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            type="button"
            aria-pressed={active === p.key}
            onClick={() => apply(p.from(), p.to())}
            className={cn(
              "h-8 rounded-md border px-2.5 text-xs font-medium transition-colors",
              active === p.key
                ? "border-green-600 bg-green-600 text-white"
                : "bg-white text-slate-700 hover:bg-green-50"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <form
        className={cn(
          "flex items-center gap-1 rounded-md border bg-white px-1.5 py-0.5",
          active === "custom" && "border-green-600 ring-1 ring-green-600/30"
        )}
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) apply(custom.from, custom.to);
        }}
      >
        <input
          type="date"
          aria-label="From"
          value={custom.from}
          max={custom.to || eatDay()}
          onChange={(e) => setCustom((c) => ({ ...c, from: e.target.value }))}
          className="h-7 bg-transparent text-xs text-slate-700 focus:outline-none"
        />
        <span className="text-xs text-muted-foreground">to</span>
        <input
          type="date"
          aria-label="To"
          value={custom.to}
          min={custom.from || undefined}
          max={eatDay()}
          onChange={(e) => setCustom((c) => ({ ...c, to: e.target.value }))}
          className="h-7 bg-transparent text-xs text-slate-700 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!valid}
          className="h-7 rounded px-2 text-xs font-semibold text-green-700 hover:bg-green-50 disabled:text-muted-foreground"
        >
          Apply
        </button>
      </form>
      {pending && <Loader2 className="h-4 w-4 animate-spin text-green-700" aria-label="Loading" />}
    </div>
  );
}
