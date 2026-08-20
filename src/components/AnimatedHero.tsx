"use client";

import { domAnimation, LazyMotion, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";

interface AnimatedHeroProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedHero({ children, className }: AnimatedHeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Keep the static export readable before Motion hydrates. */}
      <m.div
        className={className}
        initial={{ opacity: 1, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 0.78,
                ease: [0.16, 1, 0.3, 1],
              }
        }
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
