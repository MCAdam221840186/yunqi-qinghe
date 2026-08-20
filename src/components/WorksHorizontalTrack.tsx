"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useReducedMotion, useScroll } from "motion/react";
import * as m from "motion/react-m";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefObject,
  type UIEvent,
} from "react";
import styles from "./WorksHorizontalTrack.module.css";

interface TrackProgressProps {
  readonly containerRef: RefObject<HTMLUListElement | null>;
  readonly className?: string;
  readonly indicatorClassName?: string;
}

function TrackProgress({
  containerRef,
  className,
  indicatorClassName,
}: TrackProgressProps) {
  const { scrollXProgress } = useScroll({ container: containerRef });
  const progressClassName = className
    ? `${styles.progress} ${className}`
    : styles.progress;
  const resolvedIndicatorClassName = indicatorClassName
    ? `${styles.indicator} ${indicatorClassName}`
    : styles.indicator;

  return (
    <div className={progressClassName} aria-hidden="true">
      <m.span
        className={resolvedIndicatorClassName}
        style={{ scaleX: scrollXProgress }}
      />
    </div>
  );
}

export interface WorksHorizontalTrackProps
  extends Omit<ComponentPropsWithoutRef<"ul">, "children"> {
  readonly children: ReactNode;
  readonly showProgress?: boolean;
  readonly showControls?: boolean;
  readonly progressClassName?: string;
  readonly indicatorClassName?: string;
  readonly controlsClassName?: string;
  readonly controlsLabel?: string;
}

/**
 * Keeps the exhibition's horizontal gallery as a native, keyboard-focusable
 * scroll container. Motion observes this element only; it never subscribes to
 * the window scroll position or replaces native scrolling.
 */
export default function WorksHorizontalTrack({
  children,
  showProgress = true,
  showControls = true,
  progressClassName,
  indicatorClassName,
  controlsClassName,
  controlsLabel = "横向展架",
  id,
  tabIndex,
  onScroll,
  ...rest
}: WorksHorizontalTrackProps) {
  const generatedId = useId();
  const trackId = id ?? generatedId;
  const trackRef = useRef<HTMLUListElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const syncControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (previousButtonRef.current) {
      previousButtonRef.current.disabled = track.scrollLeft <= 2;
    }
    if (nextButtonRef.current) {
      nextButtonRef.current.disabled = track.scrollLeft >= maxScroll - 2;
    }
  }, []);

  useEffect(() => {
    syncControls();

    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(syncControls);
    observer.observe(track);
    return () => observer.disconnect();
  }, [syncControls]);

  const handleScroll = useCallback(
    (event: UIEvent<HTMLUListElement>) => {
      syncControls();
      onScroll?.(event);
    },
    [onScroll, syncControls],
  );

  const moveTrack = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;

      track.scrollBy({
        left: direction * Math.max(280, track.clientWidth * 0.82),
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    },
    [shouldReduceMotion],
  );

  const resolvedControlsClassName = controlsClassName
    ? `${styles.controls} ${controlsClassName}`
    : styles.controls;

  return (
    <>
      <ul
        id={trackId}
        ref={trackRef}
        tabIndex={tabIndex}
        onScroll={handleScroll}
        {...rest}
      >
        {children}
      </ul>
      {showProgress ? (
        <TrackProgress
          containerRef={trackRef}
          className={progressClassName}
          indicatorClassName={indicatorClassName}
        />
      ) : null}
      {showControls ? (
        <div
          className={resolvedControlsClassName}
          role="group"
          aria-label={controlsLabel}
        >
          <button
            ref={previousButtonRef}
            type="button"
            className={styles.controlButton}
            aria-label={`${controlsLabel}上一组`}
            aria-controls={trackId}
            disabled
            onClick={() => moveTrack(-1)}
          >
            <ArrowLeft size={20} weight="regular" aria-hidden="true" />
          </button>
          <button
            ref={nextButtonRef}
            type="button"
            className={styles.controlButton}
            aria-label={`${controlsLabel}下一组`}
            aria-controls={trackId}
            onClick={() => moveTrack(1)}
          >
            <ArrowRight size={20} weight="regular" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
