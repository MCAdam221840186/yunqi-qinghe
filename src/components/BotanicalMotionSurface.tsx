"use client";

import {
  domAnimation,
  LazyMotion,
  MotionConfig,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import * as m from "motion/react-m";
import type { MotionStyle, TargetAndTransition } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import styles from "./BotanicalMotionSurface.module.css";

export type BotanicalMotionSurfaceProps = {
  readonly mode: "reveal" | "immersive";
  readonly className?: string;
  readonly children: ReactNode;
};

const spring = {
  stiffness: 120,
  damping: 24,
  mass: 0.8,
} as const;

/**
 * A small client boundary that only publishes decorative motion variables.
 * Page content remains server-rendered and is never moved by this wrapper.
 */
export function BotanicalMotionSurface({
  mode,
  className,
  children,
}: BotanicalMotionSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const nearXTarget = useMotionValue(0);
  const nearYTarget = useMotionValue(0);
  const farXTarget = useMotionValue(0);
  const farYTarget = useMotionValue(0);
  const rotateTarget = useMotionValue(0);

  const nearX = useSpring(nearXTarget, spring);
  const nearY = useSpring(nearYTarget, spring);
  const farX = useSpring(farXTarget, spring);
  const farY = useSpring(farYTarget, spring);
  const rotate = useSpring(rotateTarget, spring);

  const nearXCss = useMotionTemplate`${nearX}px`;
  const nearYCss = useMotionTemplate`${nearY}px`;
  const farXCss = useMotionTemplate`${farX}px`;
  const farYCss = useMotionTemplate`${farY}px`;
  const rotateCss = useMotionTemplate`${rotate}deg`;

  const { scrollYProgress } = useScroll({
    target: surfaceRef,
    offset: ["start end", "end start"],
  });

  const desktopNearScroll = useTransform(
    scrollYProgress,
    [0, 1],
    mode === "immersive" ? ["-16px", "16px"] : ["0px", "0px"],
  );
  const desktopFarScroll = useTransform(
    scrollYProgress,
    [0, 1],
    mode === "immersive" ? ["-5px", "5px"] : ["0px", "0px"],
  );
  const tabletNearScroll = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "0px"],
  );
  const tabletFarScroll = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "0px"],
  );

  const resetPointer = () => {
    nearXTarget.set(0);
    nearYTarget.set(0);
    farXTarget.set(0);
    farYTarget.set(0);
    rotateTarget.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      shouldReduceMotion ||
      mode !== "immersive" ||
      event.pointerType !== "mouse" ||
      (event.currentTarget.ownerDocument.defaultView?.innerWidth ?? 0) < 1024
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    nearXTarget.set(x * 22);
    nearYTarget.set(y * 14);
    farXTarget.set(x * -10);
    farYTarget.set(y * -7);
    rotateTarget.set(x * 1.2);
  };

  const motionStyle = {
    "--botanical-near-x": shouldReduceMotion ? "0px" : nearXCss,
    "--botanical-near-y": shouldReduceMotion ? "0px" : nearYCss,
    "--botanical-far-x": shouldReduceMotion ? "0px" : farXCss,
    "--botanical-far-y": shouldReduceMotion ? "0px" : farYCss,
    "--botanical-near-rotate": shouldReduceMotion ? "0deg" : rotateCss,
    "--botanical-scroll-near": shouldReduceMotion
      ? "0px"
      : desktopNearScroll,
    "--botanical-scroll-far": shouldReduceMotion ? "0px" : desktopFarScroll,
    "--botanical-scroll-tablet-near": shouldReduceMotion
      ? "0px"
      : tabletNearScroll,
    "--botanical-scroll-tablet-far": shouldReduceMotion
      ? "0px"
      : tabletFarScroll,
  } as MotionStyle;

  const revealInitial = shouldReduceMotion
    ? false
    : ({
        "--botanical-reveal-y": "14px",
      } as TargetAndTransition);
  const revealTarget = {
    "--botanical-reveal-y": "0px",
  } as TargetAndTransition;

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <m.div
          ref={surfaceRef}
          className={[styles.surface, className].filter(Boolean).join(" ")}
          data-botanical-motion={mode}
          initial={revealInitial}
          whileInView={revealTarget}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={motionStyle}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          onPointerCancel={resetPointer}
        >
          {children}
        </m.div>
      </LazyMotion>
    </MotionConfig>
  );
}

export default BotanicalMotionSurface;
