"use client";

import { type HTMLMotionProps, type Variants } from "motion/react";
import * as m from "motion/react-m";
import { useMemo, type ReactNode } from "react";

const sceneEase = [0.16, 1, 0.3, 1] as const;

type WorksMotionSceneElement = "div" | "footer" | "header" | "section";

export interface WorksMotionSceneProps
  extends Omit<
    HTMLMotionProps<"div">,
    "animate" | "children" | "initial" | "variants" | "viewport" | "whileInView"
  > {
  readonly children: ReactNode;
  readonly as?: WorksMotionSceneElement;
  readonly amount?: number;
  readonly once?: boolean;
  readonly stagger?: number;
  readonly delayChildren?: number;
}

/**
 * Coordinates one chapter with a single IntersectionObserver-backed viewport
 * trigger. `initial={false}` keeps the exported HTML in its complete, visible
 * state when JavaScript is unavailable or hydration is delayed.
 */
export function WorksMotionScene({
  children,
  as = "div",
  amount = 0.18,
  once = true,
  stagger = 0.055,
  delayChildren = 0,
  ...rest
}: WorksMotionSceneProps) {
  const variants = useMemo<Variants>(
    () => ({
      visible: {
        transition: { delayChildren, staggerChildren: stagger },
      },
    }),
    [delayChildren, stagger],
  );

  const motionProps = {
    ...rest,
    "data-works-motion-scene": "",
    initial: false,
    whileInView: "visible",
    viewport: { amount, once },
    variants,
  } as const;

  if (as === "header") {
    return (
      <m.header {...(motionProps as HTMLMotionProps<"header">)}>
        {children}
      </m.header>
    );
  }

  if (as === "section") {
    return (
      <m.section {...(motionProps as HTMLMotionProps<"section">)}>
        {children}
      </m.section>
    );
  }

  if (as === "footer") {
    return (
      <m.footer {...(motionProps as HTMLMotionProps<"footer">)}>
        {children}
      </m.footer>
    );
  }

  return <m.div {...motionProps}>{children}</m.div>;
}

export interface WorksMotionLayerProps
  extends Omit<
    HTMLMotionProps<"div">,
    | "animate"
    | "children"
    | "initial"
    | "transition"
    | "variants"
    | "viewport"
    | "whileInView"
  > {
  readonly children: ReactNode;
  readonly fromX?: number;
  readonly fromY?: number;
  readonly fromRotate?: number;
  readonly fromScale?: number;
  readonly toX?: number;
  readonly toY?: number;
  readonly toRotate?: number;
  readonly toScale?: number;
  readonly delay?: number;
  readonly duration?: number;
}

/**
 * A composited transform layer driven by its nearest WorksMotionScene.
 * Keyframes begin only after the scene enters the viewport, so the server
 * output never receives a hidden or displaced initial style.
 */
export function WorksMotionLayer({
  children,
  fromX = 0,
  fromY = 18,
  fromRotate = 0,
  fromScale = 0.99,
  toX = 0,
  toY = 0,
  toRotate = 0,
  toScale = 1,
  delay = 0,
  duration = 0.72,
  ...rest
}: WorksMotionLayerProps) {
  const variants = useMemo<Variants>(
    () => ({
      visible: {
        x: [fromX, toX],
        y: [fromY, toY],
        rotate: [fromRotate, toRotate],
        scale: [fromScale, toScale],
        transition: {
          delay,
          duration,
          ease: sceneEase,
        },
      },
    }),
    [
      delay,
      duration,
      fromRotate,
      fromScale,
      fromX,
      fromY,
      toRotate,
      toScale,
      toX,
      toY,
    ],
  );

  return (
    <m.div {...rest} data-works-motion-layer="" variants={variants}>
      {children}
    </m.div>
  );
}
