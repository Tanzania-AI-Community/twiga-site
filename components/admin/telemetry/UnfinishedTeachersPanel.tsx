"use client";

import * as React from "react";
import { Download, Loader2, Search, ShieldAlert, X } from "lucide-react";

import { loadUnfinishedTeachers } from "@/app/admin/telemetry/actions";
import type { UnfinishedTeacher } from "@/lib/telemetry";
import { monthLabel, rangeLabel } from "@/lib/telemetry-format";
import { buildCsv, formatPhone, STOPPED_AT_LABELS } from "@/components/admin/telemetry/csv";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const STOPPED_AT: Record<string, { label: string; className: string }> = {
  new: { label: STOPPED_AT_LABELS.new, className: "border-red-200 bg-red-50 text-red-700" },
  personal_info_submitted: {
    label: STOPPED_AT_LABELS.personal_info_submitted,
    className: "border-yellow-200 bg-yellow-50 text-yellow-800",
  },
};

function downloadCsv(rows: UnfinishedTeacher[], scope: string) {
  const blob = new Blob([buildCsv(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `twiga-unfinished-onboarding-${scope}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/**
 * Right-hand panel listing teachers who registered but didn't finish
 * onboarding, with month and stage filters, search, and CSV export of
 * exactly what is shown. Data loads on first open.
 */
export function UnfinishedTeachersPanel({
  asOf,
  from = "",
  open,
  onOpenChange,
  month,
  onMonthChange,
}: {
  asOf: string;
  /** Range start (ISO), or "" for all time: only teachers who registered from then on. */
  from?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** YYYY-MM to filter on, or null for every month. */
  month: string | null;
  onMonthChange: (month: string | null) => void;
}) {
  const [rows, setRows] = React.useState<UnfinishedTeacher[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [stage, setStage] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");

  // A new date range means a new list: drop the old one (and any error).
  React.useEffect(() => {
    setRows(null);
    setError(null);
  }, [asOf, from]);

  // Load when opened; reopening after an error retries.
  React.useEffect(() => {
    if (open && error) setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  React.useEffect(() => {
    if (!open || rows !== null || error) return;
    loadUnfinishedTeachers(asOf, from)
      .then(setRows)
      .catch(() => setError("Couldn't load the list. Try signing in again."));
  }, [open, rows, error, asOf, from]);

  const months = React.useMemo(
    () => Array.from(new Set((rows ?? []).map((r) => r.month))).sort().reverse(),
    [rows]
  );

  const shown = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    return (rows ?? []).filter(
      (r) =>
        (!month || r.month === month) &&
        (stage === "all" || r.stoppedAt === stage) &&
        (!q ||
          [r.name, r.waId, r.school, r.region].some((v) => v?.toLowerCase().includes(q)))
    );
  }, [rows, month, stage, search]);

  const select =
    "h-8 rounded-md border bg-white px-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-600/30";

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="w-full data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-5xl">
        <DrawerHeader className="border-b border-green-100 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <DrawerTitle className="text-base font-bold text-slate-900">
                Teachers who didn&apos;t finish onboarding
              </DrawerTitle>
              <DrawerDescription className="text-xs">
                {month ? `Registered in ${monthLabel(month)}` : `Registered ${rangeLabel(from, asOf)}`} · use this list to follow up
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select
              aria-label="Month registered"
              className={select}
              value={month ?? ""}
              onChange={(e) => onMonthChange(e.target.value || null)}
            >
              <option value="">All months</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {monthLabel(m)}
                </option>
              ))}
            </select>
            <select
              aria-label="Where they stopped"
              className={select}
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              <option value="all">Any stage</option>
              <option value="new">Never gave details</option>
              <option value="personal_info_submitted">Stopped at subjects</option>
            </select>
            <div className="relative min-w-[160px] flex-1">
              <Search className="pointer-events-none absolute top-2 left-2 h-4 w-4 text-muted-foreground" />
              <input
                aria-label="Search"
                placeholder="Search name, phone, school, region"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(select, "w-full pl-7")}
              />
            </div>
            <Button
              size="sm"
              disabled={!shown.length}
              onClick={() => downloadCsv(shown, month ?? "all-months")}
              className="h-8 gap-1.5 rounded-md bg-green-600 text-xs text-white hover:bg-green-700"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV ({shown.length})
            </Button>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {error ? (
            <p className="py-10 text-center text-sm text-red-600">{error}</p>
          ) : rows === null ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading teachers…
            </div>
          ) : shown.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">No teachers match these filters.</p>
          ) : (
            <table className="w-full min-w-[640px]">
              <thead className="sticky top-0 z-10 bg-background">
                <tr className="border-b">
                  {["Teacher", "Phone", "Registered", "Stopped at", "Messages", "Last message"].map((h) => (
                    <th
                      key={h}
                      className="h-9 px-2 text-left text-[10.5px] font-bold uppercase tracking-wider whitespace-nowrap text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => {
                  const s = STOPPED_AT[r.stoppedAt];
                  return (
                    <tr key={r.id} className="border-b last:border-0 hover:bg-green-50/40">
                      <td className="px-2 py-2 align-top">
                        <div className="text-xs font-semibold text-slate-900">{r.name || "No name given"}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {[r.school, r.region].filter(Boolean).join(" · ") || "No school or region"}
                        </div>
                      </td>
                      <td className="px-2 py-2 align-top font-mono text-[11.5px] whitespace-nowrap text-slate-700">
                        {formatPhone(r.waId)}
                      </td>
                      <td className="px-2 py-2 align-top text-xs whitespace-nowrap text-slate-700">{r.registered}</td>
                      <td className="px-2 py-2 align-top">
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10.5px] whitespace-nowrap",
                            s?.className ?? "border-gray-200 bg-gray-50 text-slate-600"
                          )}
                        >
                          {s?.label ?? r.stoppedAt}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-right align-top text-xs text-slate-700">{r.messages}</td>
                      <td className="px-2 py-2 align-top text-xs whitespace-nowrap text-muted-foreground">
                        {r.lastMessage ?? "–"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex items-center gap-1.5 border-t px-4 py-2 text-[11px] text-muted-foreground">
          <ShieldAlert className="h-3.5 w-3.5 text-yellow-600" />
          Contains teachers&apos; names and phone numbers. Use it only for follow-up and don&apos;t share the export.
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/** A text button that opens the panel by itself (all months). */
export function UnfinishedTeachersLink({
  asOf,
  from = "",
  children,
  className,
}: {
  asOf: string;
  from?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<string | null>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "underline decoration-dotted underline-offset-2 hover:text-green-700 hover:decoration-solid",
          className
        )}
      >
        {children}
      </button>
      <UnfinishedTeachersPanel
        asOf={asOf}
        from={from}
        open={open}
        onOpenChange={setOpen}
        month={month}
        onMonthChange={setMonth}
      />
    </>
  );
}
