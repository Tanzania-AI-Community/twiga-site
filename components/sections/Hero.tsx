import Link from "next/link";

import { whatsappLink } from "@/lib/whatsapp";

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 fill-white"
      aria-hidden
    >
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="px-6 pb-20 pt-16 md:px-8 md:pb-24 md:pt-24">
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <div
            className="twiga-fade-up twiga-fade-up-delay-1 mb-6 inline-flex items-center gap-2 rounded-full border border-[#f4cda0] bg-twiga-amber-pale px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-twiga-amber"
          >
            <span className="size-1.5 rounded-full bg-twiga-amber" />
            Meta Llama Impact Grant Winner 2024
          </div>
          <h1 className="twiga-fade-up twiga-fade-up-delay-2 font-display text-[clamp(2.4rem,4.5vw,3.4rem)] font-normal leading-[1.15] text-twiga-forest">
            Your teaching{" "}
            <em className="font-display italic text-twiga-amber">companion</em>,
            <br />
            always on WhatsApp
          </h1>
          <p className="twiga-fade-up twiga-fade-up-delay-3 mt-5 max-w-[440px] text-[1.05rem] font-light leading-relaxed text-twiga-text-muted">
            Empowering Tanzanian teachers with AI-powered lesson support,
            resources, and guidance, anytime, anywhere.
          </p>
          <div className="twiga-fade-up twiga-fade-up-delay-4 mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-twiga-forest px-7 py-3.5 text-sm font-semibold text-twiga-cream transition-all hover:bg-twiga-forest-mid hover:-translate-y-px"
            >
              <span aria-hidden>💬</span>
              Join the Beta, it&apos;s free
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-twiga-text-muted transition-colors after:content-['↓'] hover:text-twiga-forest"
            >
              See how it works{" "}
            </Link>
          </div>
        </div>

        <div className="twiga-fade-up twiga-fade-up-delay-3 flex justify-center md:justify-end">
          <div className="w-full max-w-[360px] overflow-hidden rounded-[20px] bg-white shadow-[0_4px_40px_rgba(26,61,43,0.12),0_1px_4px_rgba(26,61,43,0.06)] md:max-w-[290px] lg:max-w-[360px]">
            <div className="flex items-center gap-3 bg-twiga-wa-dark px-4 py-3.5 md:px-3 md:py-3 lg:px-4 lg:py-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-twiga-wa font-display text-base font-semibold text-white md:size-9 lg:size-10">
                T
              </div>
              <div>
                <div className="text-sm font-semibold text-white md:text-[0.8125rem] lg:text-sm">
                  Twiga
                </div>
                <div className="text-xs text-white/70 md:text-[0.6875rem] lg:text-xs">
                  AI Teaching Assistant · Online
                </div>
              </div>
            </div>
            <div className="flex min-h-[280px] flex-col gap-2.5 bg-[#E8F5E9] px-4 py-4 md:min-h-[252px] md:gap-2 md:px-3 md:py-3 lg:min-h-[280px] lg:gap-2.5 lg:px-4 lg:py-4">
              <div className="self-center rounded-lg bg-white/70 px-2.5 py-1 text-center text-[0.7rem] text-[#8a8a8a] md:text-[0.65rem] lg:text-[0.7rem]">
                Today
              </div>
              <div className="max-w-[80%] self-end rounded-[10px] rounded-br-[3px] bg-twiga-wa-bubble px-3 py-2 text-[0.82rem] leading-snug md:text-[0.78rem] lg:text-[0.82rem]">
                Generate 10 exercise questions on fractions for Grade 4
                students.
                <div className="mt-1 text-right text-[0.65rem] text-[#8a8a8a] md:text-[0.6rem] lg:text-[0.65rem]">
                  9:14 AM ✓✓
                </div>
              </div>
              <div className="max-w-[80%] self-start rounded-[10px] rounded-bl-[3px] bg-white px-3 py-2 text-[0.82rem] leading-snug md:text-[0.78rem] lg:text-[0.82rem]">
                Here are 10 fraction exercises for Grade 4:
                <br />
                <br />
                1) What is ½ + ¼?
                <br />
                2) Simplify 4/8 to its lowest form
                <br />
                3) Which is larger: ⅓ or ¼? …
                <div className="mt-1 text-[0.65rem] text-[#8a8a8a] md:text-[0.6rem] lg:text-[0.65rem]">
                  9:14 AM
                </div>
              </div>
              <div className="max-w-[80%] self-end rounded-[10px] rounded-br-[3px] bg-twiga-wa-bubble px-3 py-2 text-[0.82rem] leading-snug md:text-[0.78rem] lg:text-[0.82rem]">
                Perfect! Can you make word problems using these?
                <div className="mt-1 text-right text-[0.65rem] text-[#8a8a8a] md:text-[0.6rem] lg:text-[0.65rem]">
                  9:15 AM ✓✓
                </div>
              </div>
              <div className="flex w-fit items-center gap-1 self-start rounded-[10px] bg-white px-3 py-2">
                <span className="twiga-dot-bounce size-[7px] rounded-full bg-[#bbb]" />
                <span className="twiga-dot-bounce twiga-dot-bounce-delay-1 size-[7px] rounded-full bg-[#bbb]" />
                <span className="twiga-dot-bounce twiga-dot-bounce-delay-2 size-[7px] rounded-full bg-[#bbb]" />
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#F0F0F0] px-3 py-2.5 md:px-2.5 md:py-2 lg:px-3 lg:py-2.5">
              <div className="flex-1 rounded-full bg-white px-3.5 py-2 text-[0.78rem] text-[#aaa] md:px-3 md:py-1.5 md:text-[0.72rem] lg:px-3.5 lg:py-2 lg:text-[0.78rem]">
                Message
              </div>
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-twiga-wa md:size-8 lg:size-9"
                aria-hidden
              >
                <SendIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
