"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ListTree } from "lucide-react";

import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: 2 | 3 };

/** Offset (px) that accounts for the sticky guide header when tracking headings. */
const HEADER_OFFSET = 96;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Reads headings straight out of the rendered article, so any page — hand
 * written or generated — gets a table of contents without extra wiring.
 */
export default function GuideToc() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.getElementById("guide-article");
    if (!article) return;

    let spy: IntersectionObserver | null = null;

    const collect = () => {
      const nodes = Array.from(
        article.querySelectorAll<HTMLHeadingElement>("h2, h3"),
      );

      const used = new Set<string>();
      const collected = nodes.map((node) => {
        const text = node.textContent?.trim() ?? "";
        if (!node.id) {
          const base = slugify(text) || "section";
          let id = base;
          let n = 2;
          while (used.has(id) || document.getElementById(id)) {
            id = `${base}-${n++}`;
          }
          node.id = id;
        }
        used.add(node.id);
        return {
          id: node.id,
          text,
          level: node.tagName === "H3" ? (3 as const) : (2 as const),
        };
      });

      // Same headings as last time means the mutation was elsewhere in the
      // article, so leave state (and the active entry) alone.
      setHeadings((previous) =>
        previous.length === collected.length &&
        previous.every((heading, index) => heading.id === collected[index].id)
          ? previous
          : collected,
      );
      setActiveId((previous) => previous || collected[0]?.id || "");

      spy?.disconnect();
      if (nodes.length === 0) return;

      const update = () => {
        let current = nodes[0];
        for (const node of nodes) {
          if (node.getBoundingClientRect().top <= HEADER_OFFSET) {
            current = node;
          } else {
            break;
          }
        }
        setActiveId(current.id);
      };

      spy = new IntersectionObserver(update, {
        rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px`,
        threshold: [0, 1],
      });
      nodes.forEach((node) => spy?.observe(node));
    };

    collect();

    // The article can arrive after this effect runs, since the page streams in
    // and hydration does not wait for it. Without this the list would be built
    // from an empty article once and never rebuilt.
    //
    // Rebuilding is deferred rather than immediate because collecting stamps
    // ids onto the headings, and writing to nodes React has not hydrated yet
    // is a hydration mismatch. Waiting for the commit to settle also coalesces
    // the burst of mutations that streaming produces.
    let queued: ReturnType<typeof setTimeout>;
    const content = new MutationObserver(() => {
      clearTimeout(queued);
      queued = setTimeout(collect, 50);
    });
    content.observe(article, { childList: true, subtree: true });

    return () => {
      clearTimeout(queued);
      content.disconnect();
      spy?.disconnect();
    };
  }, [pathname]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 88,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      window.history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    },
    [],
  );

  if (headings.length === 0) return null;

  return (
    // The column itself has no padding — the chapter rail needs to reach its
    // edges — so the table of contents supplies its own.
    <div className="pl-2 pr-6">
      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-twiga-text-light">
        <ListTree className="size-3.5" strokeWidth={2} />
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-twiga-cream-dark">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(event) => handleClick(event, heading.id)}
                className={cn(
                  "-ml-px block border-l-2 py-1 pr-2 text-[0.8125rem] leading-snug transition-colors",
                  heading.level === 3 ? "pl-6" : "pl-3",
                  isActive
                    ? "border-twiga-red font-medium text-twiga-forest"
                    : "border-transparent font-light text-twiga-text-muted hover:border-twiga-forest-light hover:text-twiga-forest",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
