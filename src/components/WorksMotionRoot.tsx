"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

interface WorksMotionRootProps {
  readonly children: ReactNode;
}

/**
 * One route-scoped Motion boundary for the works exhibition.
 *
 * Server Components can be passed through `children`; only the small motion
 * wrappers imported by the page are hydrated on the client.
 */
export default function WorksMotionRoot({ children }: WorksMotionRootProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
