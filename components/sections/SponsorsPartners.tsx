"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle, Users } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ROTATE_MS = 13000;

type Entry = {
  name: string;
  desc: string;
  badge: string;
  url: string;
  logo: string;
  logoAlt: string;
  iconBg: string;
  iconRing?: string;
  badgeClass: string;
  icon?: "award" | "users" | "check";
};

const sponsors: Entry[] = [
  {
    name: "Meta",
    desc: "Meta Llama Impact Grant Innovation Award 2024",
    badge: "Grant Award Winner",
    url: "https://www.meta.com/",
    logo: "/logos/meta.png",
    logoAlt: "Meta logo",
    iconBg: "bg-blue-50 ring-blue-100",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
    icon: "award",
  },
  {
    name: "Neon",
    desc: "Database infrastructure sponsor powering Twiga's data layer",
    badge: "Infrastructure Partner",
    url: "https://neon.com/",
    logo: "/logos/neon.png",
    logoAlt: "Neon logo",
    iconBg: "bg-purple-50 ring-purple-100",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
  },
  {
    name: "Tanzania AI Community",
    desc: "Open-source community leading the Twiga project",
    badge: "Community Partner",
    url: "https://ai.or.tz/",
    logo: "/logos/t-ai-c.png",
    logoAlt: "Tanzania AI Community logo",
    iconBg: "bg-slate-900 ring-slate-700",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
  },
];

const partners: Entry[] = [
  {
    name: "KTH AI Society",
    desc: "A participatory community for everyone into AI, KTH Royal Institute of Technology",
    badge: "Development Partner",
    url: "https://kthais.com/",
    logo: "/logos/kthis.png",
    logoAlt: "KTH AI Society logo",
    iconBg: "bg-slate-900 ring-slate-700",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
    icon: "users",
  },
  {
    name: "Aalto AI Society",
    desc: "Student-led AI society at Aalto University, Espoo — connecting academia, industry, and Finnish AI talent",
    badge: "Development Partner",
    url: "https://www.aaltoai.com/",
    logo: "/logos/aaltoai.png",
    logoAlt: "Aalto AI Society logo",
    iconBg: "bg-slate-50 ring-slate-200",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
    icon: "users",
  },
  {
    name: "TIB",
    desc: "Leibniz Information Center for Science and Technology research",
    badge: "MOU Signed",
    url: "https://www.tib.eu/en/",
    logo: "/logos/tib.png",
    logoAlt: "TIB logo",
    iconBg: "bg-amber-50 ring-amber-100",
    badgeClass: "bg-twiga-forest-pale text-twiga-forest",
    icon: "check",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function BadgeIcon({ type }: { type?: Entry["icon"] }) {
  if (type === "award")
    return <Award className="size-3.5 shrink-0" strokeWidth={2} />;
  if (type === "users")
    return <Users className="size-3.5 shrink-0" strokeWidth={2} />;
  if (type === "check")
    return <CheckCircle className="size-3.5 shrink-0" strokeWidth={2} />;
  return null;
}

function SponsorGrid({
  entries,
  cardMotion,
  enterCycle,
}: {
  entries: Entry[];
  cardMotion: boolean;
  enterCycle: number;
}) {
  const baseCard =
    "flex min-w-[200px] flex-1 flex-col gap-2 rounded-xl border border-twiga-cream-dark bg-white p-6 no-underline transition-shadow hover:shadow-[0_4px_20px_rgba(26,61,43,0.08)]";

  return (
    <div className="flex flex-wrap gap-4 md:gap-6">
      {entries.map((s, i) => (
        <Link
          key={`${enterCycle}-${s.name}`}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            cardMotion && enterCycle > 0
              ? `${baseCard} twiga-sponsor-card-enter`
              : baseCard
          }
          style={
            cardMotion && enterCycle > 0
              ? { animationDelay: `${150 + i * 75}ms` }
              : undefined
          }
        >
          <div
            className={`mb-1 flex size-14 shrink-0 items-center justify-center rounded-xl shadow-inner ring-1 ${s.iconBg}`}
          >
            <Image
              src={s.logo}
              alt={s.logoAlt}
              width={48}
              height={48}
              className="size-12 object-contain"
            />
          </div>
          <span className="font-semibold text-twiga-text">{s.name}</span>
          <span className="text-sm font-light leading-snug text-twiga-text-muted">
            {s.desc}
          </span>
          <span
            className={`mt-1 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide ${s.badgeClass}`}
          >
            <BadgeIcon type={s.icon} />
            {s.badge}
          </span>
        </Link>
      ))}
    </div>
  );
}

function layerMotionClass(motionReady: boolean) {
  if (!motionReady) return "";
  return `transition-[opacity,transform] duration-[850ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]`;
}

export default function SponsorsPartners() {
  const reducedMotion = usePrefersReducedMotion();
  const [view, setView] = useState<"sponsors" | "partners">("sponsors");
  const [motionReady, setMotionReady] = useState(false);
  const [sponsorsStacked, setSponsorsStacked] = useState(false);
  const [partnersStacked, setPartnersStacked] = useState(true);
  const [sponsorCycle, setSponsorCycle] = useState(0);
  const [partnerCycle, setPartnerCycle] = useState(0);
  const skipFirstCycleBump = useRef(true);
  const skipFirstStackReset = useRef(true);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMotionReady(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setView((v) => (v === "sponsors" ? "partners" : "sponsors"));
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  useEffect(() => {
    if (skipFirstStackReset.current) {
      skipFirstStackReset.current = false;
      return;
    }
    setSponsorsStacked(false);
    setPartnersStacked(false);
  }, [view]);

  useEffect(() => {
    if (!motionReady || reducedMotion) return;
    if (skipFirstCycleBump.current) {
      skipFirstCycleBump.current = false;
      return;
    }
    if (view === "sponsors") setSponsorCycle((c) => c + 1);
    if (view === "partners") setPartnerCycle((c) => c + 1);
  }, [view, motionReady, reducedMotion]);

  const viewRef = useRef(view);
  viewRef.current = view;

  const onSponsorsTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "opacity") return;
    if (viewRef.current === "partners") {
      setSponsorsStacked(true);
    }
  };

  const onPartnersTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "opacity") return;
    if (viewRef.current === "sponsors") {
      setPartnersStacked(true);
    }
  };

  const motion = layerMotionClass(motionReady);

  const sponsorsLayerClass =
    view === "sponsors"
      ? `${motion} z-10 translate-y-0 opacity-100 pointer-events-auto`
      : sponsorsStacked
        ? "z-0 translate-y-6 opacity-0 pointer-events-none transition-none"
        : `${motion} z-0 -translate-y-4 opacity-0 pointer-events-none`;

  const partnersLayerClass =
    view === "partners"
      ? `${motion} z-10 translate-y-0 opacity-100 pointer-events-auto`
      : partnersStacked
        ? "z-0 translate-y-6 opacity-0 pointer-events-none transition-none"
        : `${motion} z-0 -translate-y-4 opacity-0 pointer-events-none`;

  const cardMotion = motionReady && !reducedMotion;

  return (
    <section className="bg-twiga-cream-mid px-6 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-10 md:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-twiga-red-dark">
            Partners &amp; Sponsors
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-normal leading-tight text-twiga-forest">
            Supported by those who
            <br />
            believe in Tanzanian education
          </h2>
        </header>

        {reducedMotion ? (
          <div className="flex flex-col gap-14">
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-twiga-forest">
                Sponsors
              </h3>
              <SponsorGrid
                entries={sponsors}
                cardMotion={false}
                enterCycle={0}
              />
            </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-twiga-forest">
                Partners
              </h3>
              <SponsorGrid
                entries={partners}
                cardMotion={false}
                enterCycle={0}
              />
            </div>
          </div>
        ) : (
          <>
            <div
              className="mb-2 flex flex-wrap items-center gap-4 border-b border-twiga-cream-dark pb-1"
              role="tablist"
              aria-label="Sponsors and partners"
            >
              <div className="flex gap-0">
                <button
                  type="button"
                  role="tab"
                  id="tab-sponsors"
                  aria-selected={view === "sponsors"}
                  aria-controls="sponsors-partners-panel"
                  className={`border-b-2 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    view === "sponsors"
                      ? "border-twiga-forest text-twiga-forest"
                      : "border-transparent text-twiga-text-muted hover:text-twiga-forest"
                  }`}
                  onClick={() => setView("sponsors")}
                >
                  Sponsors
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-partners"
                  aria-selected={view === "partners"}
                  aria-controls="sponsors-partners-panel"
                  className={`border-b-2 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    view === "partners"
                      ? "border-twiga-forest text-twiga-forest"
                      : "border-transparent text-twiga-text-muted hover:text-twiga-forest"
                  }`}
                  onClick={() => setView("partners")}
                >
                  Partners
                </button>
              </div>
            </div>

            <div
              id="sponsors-partners-panel"
              role="tabpanel"
              aria-labelledby={
                view === "sponsors" ? "tab-sponsors" : "tab-partners"
              }
              aria-live="polite"
              aria-atomic="true"
              className="relative min-h-[300px] overflow-hidden pt-6 md:min-h-[320px]"
            >
              <div
                className={`absolute inset-x-0 top-6 ${sponsorsLayerClass}`}
                onTransitionEnd={onSponsorsTransitionEnd}
              >
                <SponsorGrid
                  entries={sponsors}
                  cardMotion={cardMotion}
                  enterCycle={sponsorCycle}
                />
              </div>
              <div
                className={`absolute inset-x-0 top-6 ${partnersLayerClass}`}
                onTransitionEnd={onPartnersTransitionEnd}
              >
                <SponsorGrid
                  entries={partners}
                  cardMotion={cardMotion}
                  enterCycle={partnerCycle}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
