"use client";

import { domAnimation, LazyMotion, m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedHeroProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedHero({ children, className }: AnimatedHeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={{ opacity: 0, y: 28 }}
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
