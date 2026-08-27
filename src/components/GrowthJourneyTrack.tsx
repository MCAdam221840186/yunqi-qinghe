"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import {
  Children,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import styles from "./GrowthJourneyTrack.module.css";

export interface GrowthJourneyTrackProps {
  readonly children: ReactNode;
  readonly ariaLabel?: string;
  readonly controlsLabel?: string;
  readonly className?: string;
}

interface TrackState {
  readonly activeIndex: number;
  readonly itemCount: number;
  readonly canGoPrevious: boolean;
  readonly canGoNext: boolean;
}

function getTrackItems(track: HTMLOListElement) {
  return Array.from(track.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement &&
      !child.hasAttribute("data-growth-track-empty"),
  );
}

export default function GrowthJourneyTrack({
  children,
  ariaLabel = "成长轨迹",
  controlsLabel = "成长轨迹翻页",
  className,
}: GrowthJourneyTrackProps) {
  const renderedItemCount = Children.toArray(children).length;
  const generatedId = useId();
  const trackId = `${generatedId}-growth-journey`;
  const trackRef = useRef<HTMLOListElement>(null);
  const frameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [trackState, setTrackState] = useState<TrackState>({
    activeIndex: renderedItemCount > 0 ? 0 : -1,
    itemCount: renderedItemCount,
    canGoPrevious: false,
    canGoNext: false,
  });

  const syncTrackState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = getTrackItems(track);
    const itemCount = items.length;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft >= maxScroll - 2;
    let activeIndex = itemCount > 0 ? 0 : -1;

    if (itemCount > 0 && !atStart) {
      if (atEnd) {
        activeIndex = itemCount - 1;
      } else {
        const firstOffset = items[0]?.offsetLeft ?? 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        items.forEach((item, index) => {
          const itemScrollLeft = item.offsetLeft - firstOffset;
          const distance = Math.abs(track.scrollLeft - itemScrollLeft);

          if (distance < closestDistance) {
            closestDistance = distance;
            activeIndex = index;
          }
        });
      }
    }

    const nextState: TrackState = {
      activeIndex,
      itemCount,
      canGoPrevious: itemCount > 0 && !atStart,
      canGoNext: itemCount > 0 && !atEnd,
    };

    setTrackState((currentState) => {
      if (
        currentState.activeIndex === nextState.activeIndex &&
        currentState.itemCount === nextState.itemCount &&
        currentState.canGoPrevious === nextState.canGoPrevious &&
        currentState.canGoNext === nextState.canGoNext
      ) {
        return currentState;
      }

      return nextState;
    });
  }, []);

  const scheduleTrackSync = useCallback(() => {
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      syncTrackState();
    });
  }, [syncTrackState]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    syncTrackState();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(scheduleTrackSync);
    observer.observe(track);
    getTrackItems(track).forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [children, scheduleTrackSync, syncTrackState]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const scrollToItem = useCallback(
    (requestedIndex: number) => {
      const track = trackRef.current;
      if (!track) return;

      const items = getTrackItems(track);
      if (items.length === 0) return;

      const targetIndex = Math.min(
        Math.max(requestedIndex, 0),
        items.length - 1,
      );
      const firstOffset = items[0]?.offsetLeft ?? 0;
      const targetOffset = items[targetIndex]?.offsetLeft ?? firstOffset;
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);

      track.scrollTo({
        left: Math.min(Math.max(targetOffset - firstOffset, 0), maxScroll),
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    },
    [shouldReduceMotion],
  );

  const moveTrack = useCallback(
    (direction: -1 | 1) => {
      const currentIndex = Math.max(trackState.activeIndex, 0);
      scrollToItem(currentIndex + direction);
    },
    [scrollToItem, trackState.activeIndex],
  );

  const handleScroll = useCallback(() => {
    scheduleTrackSync();
  }, [scheduleTrackSync]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLOListElement>) => {
      if (
        event.target !== event.currentTarget ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveTrack(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveTrack(1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        scrollToItem(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        scrollToItem(trackState.itemCount - 1);
      }
    },
    [moveTrack, scrollToItem, trackState.itemCount],
  );

  const rootClassName = className
    ? `${styles.root} ${className}`
    : styles.root;
  const currentPosition =
    trackState.itemCount > 0 ? trackState.activeIndex + 1 : 0;

  return (
    <div
      className={rootClassName}
      data-active-index={trackState.activeIndex}
    >
      <ol
        ref={trackRef}
        id={trackId}
        className={styles.track}
        aria-label={ariaLabel}
        tabIndex={trackState.itemCount > 0 ? 0 : -1}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
      >
        {renderedItemCount > 0 ? (
          children
        ) : (
          <li
            className={styles.emptyState}
            data-growth-track-empty
            role="status"
          >
            暂无成长节点
          </li>
        )}
      </ol>

      <div
        className={styles.controls}
        role="group"
        aria-label={controlsLabel}
      >
        <button
          type="button"
          className={styles.controlButton}
          aria-label={`${controlsLabel}，上一个`}
          aria-controls={trackId}
          disabled={!trackState.canGoPrevious}
          onClick={() => moveTrack(-1)}
        >
          <ArrowLeft size={20} weight="regular" aria-hidden="true" />
          <span className={styles.controlLabel}>上一个</span>
        </button>

        <p className={styles.position} aria-live="polite" aria-atomic="true">
          {trackState.itemCount > 0
            ? `第 ${currentPosition} 个，共 ${trackState.itemCount} 个`
            : "暂无节点"}
        </p>

        <button
          type="button"
          className={styles.controlButton}
          aria-label={`${controlsLabel}，下一个`}
          aria-controls={trackId}
          disabled={!trackState.canGoNext}
          onClick={() => moveTrack(1)}
        >
          <span className={styles.controlLabel}>下一个</span>
          <ArrowRight size={20} weight="regular" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
