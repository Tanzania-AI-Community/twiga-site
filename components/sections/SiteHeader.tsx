import Link from "next/link";
import Image from "next/image";

import { whatsappLink } from "@/lib/whatsapp";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-twiga-cream-dark bg-twiga-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-twiga-forest no-underline"
        >
          <Image
            src="/logos/twiga_icon.png"
            alt="Twiga"
            width={32}
            height={32}
            className="size-8"
          />
          <span className="font-display text-xl font-semibold tracking-tight">
            Twiga
          </span>
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          {/* Each guide track is its own destination — there is no chooser at
              /guide any more. Teachers leads, developers sits beside GitHub
              where that audience is already looking. */}
          <Link
            href="/guide/teachers"
            className="hidden text-sm font-medium text-twiga-text-muted transition-colors hover:text-twiga-forest sm:inline"
          >
            Teachers Guide
          </Link>
          <Link
            href="/guide/developers"
            className="hidden text-sm font-medium text-twiga-text-muted transition-colors hover:text-twiga-forest sm:inline"
          >
            Developers
          </Link>
          <Link
            href="https://github.com/Tanzania-AI-Community/twiga"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-twiga-text-muted transition-colors hover:text-twiga-forest"
          >
            GitHub ↗
          </Link>
          {/* Last, and the only filled control: it opens WhatsApp rather than
              a sign-up, so it says what it does instead of "Register". */}
          <Link
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-twiga-forest px-[18px] py-2 text-sm font-semibold text-twiga-cream transition-colors hover:bg-twiga-forest-mid"
          >
            Chat with Twiga
          </Link>
        </nav>
      </div>
    </header>
  );
}
