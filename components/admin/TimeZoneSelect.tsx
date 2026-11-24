"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Globe2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { cityName, TIME_ZONE_CHOICES } from "@/lib/time-zone";
import { setReportingTimeZone } from "@/lib/time-zone-actions";
import { useReportingTimeZone } from "@/components/admin/TimeZoneProvider";

/**
 * Picks the time zone the admin pages count days in. Saved per admin in a
 * cookie; the page reloads its figures in the new zone.
 */
export function TimeZoneSelect() {
  const current = useReportingTimeZone();
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const choices = TIME_ZONE_CHOICES.includes(current) ? TIME_ZONE_CHOICES : [current, ...TIME_ZONE_CHOICES];

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value;
    startTransition(async () => {
      const result = await setReportingTimeZone(next);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <label className="inline-flex h-9 items-center gap-1.5 rounded-md border border-input bg-white px-2 text-sm text-slate-700">
      {pending ? (
        <Loader2 className="h-4 w-4 flex-none animate-spin text-green-600" />
      ) : (
        <Globe2 className="h-4 w-4 flex-none text-green-600" />
      )}
      <span className="sr-only">Report time zone</span>
      <select
        value={current}
        onChange={onChange}
        disabled={pending}
        title="Time zone the admin pages count days in"
        className="max-w-[9.5rem] bg-transparent outline-none max-sm:max-w-[6.5rem]"
      >
        {choices.map((zone) => (
          <option key={zone} value={zone}>
            {cityName(zone)}
          </option>
        ))}
      </select>
    </label>
  );
}
