import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import {
  TWIGA_WHATSAPP_GREETING,
  formatWhatsappNumber,
  whatsappLink,
} from "@/lib/whatsapp";

const steps = [
  {
    n: 1,
    title: "Tap the button",
    desc: "WhatsApp opens with your first message to Twiga already written.",
  },
  {
    n: 2,
    title: "Send it and answer three questions",
    desc: "Your name, your school, and the subjects you teach.",
  },
  {
    n: 3,
    title: "Start planning lessons",
    desc: "Chat with Twiga on WhatsApp, just like texting a colleague.",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function Registration() {
  const href = whatsappLink();

  return (
    <section
      id="register"
      className="bg-twiga-cream-mid px-6 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-20">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-twiga-amber">
              Get Started
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-normal leading-tight text-twiga-forest">
              Join hundreds of teachers already using Twiga
            </h2>
            <p className="mt-4 max-w-md font-light leading-relaxed text-twiga-text-muted">
              There is no form to fill in. You register inside the chat itself,
              in under two minutes, with no app to install.
            </p>
            <ol className="mt-10 flex flex-col gap-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-twiga-forest text-xs font-bold text-twiga-cream">
                    {s.n}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-twiga-text">
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm font-light text-twiga-text-muted">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="overflow-hidden rounded-2xl border border-twiga-cream-dark bg-white">
            <div className="flex items-center gap-3 bg-twiga-wa-dark px-6 py-4 md:px-8">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-twiga-wa font-display text-base font-semibold text-white">
                T
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Twiga</div>
                <div className="text-xs text-white/70">
                  AI Teaching Assistant · Online
                </div>
              </div>
            </div>

            <div className="px-6 py-8 md:px-8 md:py-10">
              <h3 className="font-display text-2xl text-twiga-forest">
                Start on WhatsApp
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-twiga-text-muted">
                Tap below and we&apos;ll open WhatsApp with this message ready to
                send. Twiga takes it from there.
              </p>

              <div className="mt-6 rounded-xl bg-[#E8F5E9] p-3.5">
                <p className="ml-auto max-w-[92%] rounded-[10px] rounded-br-[3px] bg-twiga-wa-bubble px-3 py-2 text-[0.85rem] leading-snug text-twiga-text">
                  {TWIGA_WHATSAPP_GREETING}
                  <span className="mt-1 block text-right text-[0.65rem] text-[#8a8a8a]">
                    Ready to send
                  </span>
                </p>
              </div>

              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2.5 rounded-md bg-twiga-wa-dark text-base font-semibold text-white transition-colors hover:bg-twiga-wa"
              >
                <WhatsAppIcon className="size-5" />
                Chat with Twiga on WhatsApp
              </Link>

              <p className="mt-3 text-center text-sm font-light text-twiga-text-muted">
                or message{" "}
                <span className="font-medium text-twiga-forest">
                  {formatWhatsappNumber()}
                </span>
              </p>

              <div className="mt-6 flex gap-2 rounded-lg border border-[#f4cda0] bg-twiga-amber-pale px-3.5 py-3 text-xs leading-relaxed text-[#7a4a15]">
                <ShieldCheck className="mt-px size-4 shrink-0" strokeWidth={1.9} />
                <span>
                  Message from the number you teach with — it becomes your Twiga
                  account. Only Tanzanian numbers are supported, and changing it
                  later requires re-registration.
                </span>
              </div>

              <p className="mt-5 text-center text-xs font-light leading-relaxed text-twiga-text-light">
                Free for all Tanzanian teachers. By messaging Twiga you agree to
                receive WhatsApp messages from us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
