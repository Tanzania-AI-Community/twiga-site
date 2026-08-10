import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Info, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

/** Page title block — every guide page opens with one. */
export function GuideHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="not-prose mb-9">
      {eyebrow ? (
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-twiga-red-dark">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-sans text-[clamp(1.8rem,3vw,2.35rem)] font-semibold leading-tight tracking-tight text-twiga-forest">
        {title}
      </h1>
      {description ? (
        <p className="mt-3.5 text-[1.0625rem] font-normal leading-relaxed text-twiga-text-muted">
          {description}
        </p>
      ) : null}
    </header>
  );
}

/**
 * The bar at the left edge is the only thing that carries the colour. The
 * block itself stays neutral, the same as the active row in the chapter rail,
 * so several callouts on one page do not turn it into a patchwork of tints.
 */
const calloutStyles = {
  note: {
    icon: Info,
    bar: "bg-twiga-forest-light",
    accent: "text-twiga-forest-mid",
  },
  tip: {
    icon: Lightbulb,
    bar: "bg-twiga-forest-mid",
    accent: "text-twiga-forest-mid",
  },
  warning: {
    icon: AlertTriangle,
    bar: "bg-twiga-red",
    accent: "text-twiga-red-dark",
  },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const style = calloutStyles[type];
  const Icon = style.icon;

  return (
    // Square block, rounded bar: the radius belongs to the accent, so the bar
    // reads as standing beside the text rather than as a boxed panel.
    <div className="guide-callout not-prose relative my-6 flex gap-3 bg-twiga-cream py-3.5 pl-5 pr-4">
      <span
        aria-hidden
        className={cn("absolute inset-y-1 left-0 w-1 rounded-full", style.bar)}
      />
      <Icon
        className={cn("mt-0.5 size-[17px] shrink-0", style.accent)}
        strokeWidth={1.9}
      />
      <div className="min-w-0 text-sm font-normal leading-relaxed text-twiga-text [&>p+p]:mt-2.5 [&>ul]:mt-1.5 [&>ul]:list-disc [&>ul]:space-y-1 [&>ul]:pl-4">
        {title ? (
          <p className="mb-1 font-semibold text-twiga-forest">{title}</p>
        ) : null}
        {children}
      </div>
    </div>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="guide-steps not-prose my-6 space-y-5">{children}</ol>;
}

export function Step({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <li className="relative pl-10">
      <h3 className="font-sans text-base font-semibold tracking-tight text-twiga-forest">
        {title}
      </h3>
      {children ? (
        <div className="mt-1.5 text-sm font-normal leading-relaxed text-twiga-text-muted">
          {children}
        </div>
      ) : null}
    </li>
  );
}

/** Cards used on section landing pages to point at the next reads. */
export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-7 grid gap-3 sm:grid-cols-2">{children}</div>
  );
}

export function GuideCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-md border border-twiga-cream-dark bg-white px-4 py-4 transition-all hover:-translate-y-px hover:border-twiga-forest-light hover:bg-twiga-forest-pale/40"
    >
      <span className="flex items-center gap-1.5 font-sans text-[0.95rem] font-semibold tracking-tight text-twiga-forest">
        {title}
        <ArrowRight
          className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
          strokeWidth={2}
        />
      </span>
      {description ? (
        <span className="mt-1.5 text-sm font-normal leading-relaxed text-twiga-text-muted">
          {description}
        </span>
      ) : null}
    </Link>
  );
}

/** Sample WhatsApp exchange — the site's signature visual, reused inline. */
export function ChatSample({
  messages,
}: {
  messages: { from: "teacher" | "twiga"; text: string }[];
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-md border border-twiga-cream-dark">
      <div className="flex items-center gap-2.5 bg-twiga-wa-dark px-3.5 py-2.5">
        <span className="flex size-7 items-center justify-center rounded-full bg-twiga-wa font-sans text-xs font-semibold text-white">
          T
        </span>
        <span className="text-[0.8125rem] font-semibold text-white">Twiga</span>
      </div>
      <div className="flex flex-col gap-2 bg-[#E8F5E9] px-3.5 py-3.5">
        {messages.map((message, index) => (
          <p
            key={index}
            className={cn(
              "max-w-[85%] whitespace-pre-line rounded-[10px] px-3 py-2 text-[0.82rem] leading-snug text-twiga-text",
              message.from === "teacher"
                ? "self-end rounded-br-[3px] bg-twiga-wa-bubble"
                : "self-start rounded-bl-[3px] bg-white",
            )}
          >
            {message.text}
          </p>
        ))}
      </div>
    </div>
  );
}
