import type { Metadata } from "next";
import type { ReactNode } from "react";

import GuideShell from "@/components/guide/GuideShell";

export const metadata: Metadata = {
  title: {
    default: "Twiga Guide",
    template: "%s · Twiga Guide",
  },
  description:
    "Documentation for Twiga — the AI teaching companion Tanzanian educators use on WhatsApp.",
};

export default function GuideLayout({ children }: { children: ReactNode }) {
  return <GuideShell>{children}</GuideShell>;
}
