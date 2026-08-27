"use client";

import { Leaf } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import styles from "./SectionJourneyNav.module.css";

export type SectionJourneyNavProps = {
  readonly items: readonly { readonly id: string; readonly label: string }[];
  readonly ariaLabel: string;
  readonly className?: string;
};

/** Native anchors work without JS; enhancement only identifies the section. */
export function SectionJourneyNav({
  items,
  ariaLabel,
  className,
}: SectionJourneyNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    let observer: IntersectionObserver | undefined;
    let activationTop = 0;

    const updateCurrent = () => {
      // Read only at section intersections, never on continuous window scroll.
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationTop + 2) {
          current = section;
        } else {
          break;
        }
      }
      setActiveId(current.id);
    };

    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      const section = sections.find(({ id }) => id === hash);
      if (section) setActiveId(section.id);
    };

    const observeSections = () => {
      observer?.disconnect();
      const height = document.documentElement.clientHeight;
      const nav = navRef.current;
      const stickyTop = nav ? Number.parseFloat(getComputedStyle(nav).top) : 0;
      const clearance = (Number.isFinite(stickyTop) ? stickyTop : 72)
        + (nav?.getBoundingClientRect().height ?? 0) + 24;
      activationTop = Math.min(height * 0.55, Math.max(height * 0.25, clearance));

      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(updateCurrent, {
          rootMargin: `-${activationTop}px 0px -${Math.max(0, height - activationTop - 2)}px 0px`,
          threshold: 0,
        });
        sections.forEach((section) => observer?.observe(section));
      }
      updateCurrent();
    };

    observeSections();
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("resize", observeSections);

    return () => {
      observer?.disconnect();
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("resize", observeSections);
    };
  }, [items]);

  return (
    <nav
      ref={navRef}
      className={[styles.navigation, className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      data-section-journey=""
    >
      <ol>
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeId === id ? "location" : undefined}
            >
              <span className={styles.marker} aria-hidden="true">
                <Leaf size={19} weight="regular" />
              </span>
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
