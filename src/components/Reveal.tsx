"use client";

import { domAnimation, LazyMotion, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  amount = 0.2,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Keep server output visible if hydration is delayed or absent. */}
      <m.div
        className={className}
        initial={{ opacity: 1, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 0.6,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }
        }
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
