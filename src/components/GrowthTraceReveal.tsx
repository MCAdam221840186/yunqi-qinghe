"use client";

import { LazyMotion, domAnimation, useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";
import styles from "./GrowthTrace.module.css";

const transition = {
  duration: 0.64,
  ease: [0.16, 1, 0.3, 1] as const,
};

const lineVariants: Record<"spine" | "turn" | "branch", Variants> = {
  spine: { grown: { scaleY: [0, 1], transition } },
  branch: { grown: { scaleX: [0, 1], transition } },
  turn: { grown: { opacity: [0, 1], transition } },
};

const nodeVariants: Variants = {
  grown: {
    scale: [0.8, 1.08, 1],
    transition: { ...transition, delay: 0.12 },
  },
};

/** Only the accent line moves; the underlying line is always visible in SSR. */
export function GrowthTraceReveal({
  variant,
}: {
  readonly variant: "spine" | "turn" | "branch";
}) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <m.span
        className={styles.reveal}
        initial={false}
        inherit={false}
        whileInView={reduceMotion ? undefined : "grown"}
        viewport={{ once: true, amount: 0.15 }}
      >
        <m.span
          className={styles.line}
          variants={reduceMotion ? undefined : lineVariants[variant]}
        />
        <m.span
          className={styles.node}
          variants={reduceMotion ? undefined : nodeVariants}
        />
      </m.span>
    </LazyMotion>
  );
}
