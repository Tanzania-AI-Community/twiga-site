import { Filter } from "lucide-react";

import { getOverview, rangeLabel } from "@/lib/telemetry";
import { EmptyState, TelemetryCard } from "@/components/admin/telemetry/shared";
import { UnfinishedTeachersLink } from "@/components/admin/telemetry/UnfinishedTeachersPanel";

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Names the step where the most teachers are lost, as a count. */
function BiggestDrop({ steps }: { steps: { label: string; n: number }[] }) {
  let worst = { from: steps[0], to: steps[1], lost: -1 };
  for (let i = 1; i < steps.length; i++) {
    const lost = steps[i - 1].n - steps[i].n;
    if (lost > worst.lost) worst = { from: steps[i - 1], to: steps[i], lost };
  }
  if (worst.lost <= 0) return null;
  return (
    <p className="mt-auto pt-4 text-[11.5px] leading-snug text-muted-foreground">
      <span className="mr-1.5 inline-block h-2.5 w-0.5 translate-y-px bg-yellow-500" />
      Biggest drop: <span className="font-semibold text-slate-700">{worst.lost} teachers</span> stop between “
      {lower(worst.from.label)}” and “{lower(worst.to.label)}”.
    </p>
  );
}

/** Teacher journey from first contact to regular use, each step as a share of the first. */
export async function FunnelCard({ asOf, from = "" }: { asOf: string; from?: string }) {
  const o = await getOverview(asOf, from);
  const steps = [
    { label: "Contacted Twiga", n: o.teachers },
    { label: "Gave their details", n: o.gaveDetails },
    { label: "Finished onboarding", n: o.onboarded },
    { label: "Got textbook help", n: o.gotHelp },
    { label: "Came back on a 2nd day", n: o.secondDay },
    { label: "Used Twiga on 5+ days", n: o.fiveDays },
  ];
  const top = Math.max(o.teachers, 1);

  return (
    <TelemetryCard
      icon={<Filter className="h-4 w-4" />}
      title="Teacher journey"
      description={`Teachers registered ${rangeLabel(from, asOf)}`}
      infoKey="tel_funnel"
    >
      {o.teachers === 0 ? (
        <EmptyState title="No teachers yet" hint="The journey appears once teachers register." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <div key={step.label} className="grid grid-cols-[150px_1fr_92px] items-center gap-2.5">
              <span className="truncate text-xs text-slate-900">{step.label}</span>
              <div className="h-5 overflow-hidden rounded border bg-gray-50">
                <div
                  className="h-full rounded-r bg-green-600"
                  style={{ width: `${(step.n / top) * 100}%`, opacity: 1 - i * 0.09 }}
                />
              </div>
              <span className="text-right text-xs">
                <span className="font-semibold text-slate-900">{step.n}</span>
                <span className="ml-1.5 text-muted-foreground">{Math.round((100 * step.n) / top)}%</span>
              </span>
            </div>
          ))}
        </div>
      )}
      {o.teachers > 0 && <BiggestDrop steps={steps} />}
      {o.teachers > o.onboarded && (
        <p className="pt-1.5 text-[11.5px] text-muted-foreground">
          <UnfinishedTeachersLink asOf={asOf} from={from} className="font-medium text-green-700">
            {`See the ${o.teachers - o.onboarded} teachers who didn't finish onboarding`}
          </UnfinishedTeachersLink>
        </p>
      )}
    </TelemetryCard>
  );
}
