"use client";

import { Leaf } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type DayJourneyNavItem = {
  readonly slug: string;
  readonly dayNumber: number;
};

export default function DayJourneyNav({
  items,
}: {
  readonly items: readonly DayJourneyNavItem[];
}) {
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? "");
  const visibleEntriesRef = useRef(
    new Map<string, IntersectionObserverEntry>(),
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = items
      .map((item) => document.getElementById(item.slug))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const visibleEntries = visibleEntriesRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleEntries.set(entry.target.id, entry);
          } else {
            visibleEntries.delete(entry.target.id);
          }
        });

        const closestEntry = [...visibleEntries.values()].sort(
          (left, right) => {
            const leftAnchor = left.rootBounds?.top ?? 0;
            const rightAnchor = right.rootBounds?.top ?? 0;

            return (
              Math.abs(left.boundingClientRect.top - leftAnchor) -
              Math.abs(right.boundingClientRect.top - rightAnchor)
            );
          },
        )[0];

        if (closestEntry) setActiveSlug(closestEntry.target.id);
      },
      {
        root: null,
        rootMargin: "-24% 0px -64% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      visibleEntries.clear();
    };
  }, [items]);

  return (
    <nav className={styles.dayNav} aria-label="Day 章节导航">
      <span className={styles.dayNavLabel}>沿途章节</span>
      <ol>
        {items.map((item) => {
          const isActive = activeSlug === item.slug;

          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveSlug(item.slug)}
              >
                <Leaf
                  className={styles.dayNavLeaf}
                  size={12}
                  weight="fill"
                  aria-hidden="true"
                />
                <span>Day</span>
                <strong>{item.dayNumber}</strong>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
