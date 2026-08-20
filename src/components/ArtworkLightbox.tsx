"use client";

import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import Image, { type ImageProps } from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import displayHeadingStyles from "./DisplayHeading.module.css";
import styles from "./ArtworkLightbox.module.css";

export interface ArtworkLightboxItem {
  readonly id: string;
  readonly src: ImageProps["src"];
  readonly alt: string;
  readonly medium: string;
  readonly width: number;
  readonly height: number;
}

interface ArtworkLightboxContextValue {
  readonly dialogId: string;
  readonly itemCount: number;
  openAt: (index: number, trigger: HTMLButtonElement) => void;
}

interface ArtworkLightboxProviderProps {
  readonly items: readonly ArtworkLightboxItem[];
  readonly children: ReactNode;
}

interface ArtworkTriggerProps {
  readonly index: number;
  readonly className?: string;
  readonly children: ReactNode;
}

const ArtworkLightboxContext =
  createContext<ArtworkLightboxContextValue | null>(null);

export function ArtworkLightboxProvider({
  items,
  children,
}: ArtworkLightboxProviderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const previousOverflowRef = useRef("");
  const bodyScrollLockedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const componentId = useId();
  const dialogId = `${componentId}-dialog`;
  const titleId = `${componentId}-title`;

  const activeItem =
    activeIndex === null ? null : (items[activeIndex] ?? null);
  const hasMultipleItems = items.length > 1;

  const restoreBodyScroll = useCallback(() => {
    if (!bodyScrollLockedRef.current) return;

    document.body.style.overflow = previousOverflowRef.current;
    bodyScrollLockedRef.current = false;
  }, []);

  const openAt = useCallback(
    (index: number, trigger: HTMLButtonElement) => {
      const dialog = dialogRef.current;
      const indexIsValid =
        Number.isInteger(index) && index >= 0 && index < items.length;

      if (!dialog || dialog.open || !indexIsValid) return;

      lastTriggerRef.current = trigger;
      setActiveIndex(index);

      if (!bodyScrollLockedRef.current) {
        previousOverflowRef.current = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        bodyScrollLockedRef.current = true;
      }

      try {
        dialog.showModal();
        closeButtonRef.current?.focus();
      } catch {
        setActiveIndex(null);
        restoreBodyScroll();
        lastTriggerRef.current = null;
      }
    },
    [items.length, restoreBodyScroll],
  );

  const closeLightbox = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || items.length < 2) return currentIndex;
      return (currentIndex - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || items.length < 2) return currentIndex;
      return (currentIndex + 1) % items.length;
    });
  }, [items.length]);

  const handleDialogClose = useCallback(() => {
    setActiveIndex(null);
    restoreBodyScroll();

    const trigger = lastTriggerRef.current;
    lastTriggerRef.current = null;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  }, [restoreBodyScroll]);

  const handleDialogClick = useCallback(
    (event: ReactMouseEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) closeLightbox();
    },
    [closeLightbox],
  );

  const handleDialogKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDialogElement>) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    },
    [showNext, showPrevious],
  );

  useEffect(() => {
    const dialog = dialogRef.current;

    return () => {
      restoreBodyScroll();
      if (dialog?.open) dialog.close();
    };
  }, [restoreBodyScroll]);

  const contextValue = useMemo<ArtworkLightboxContextValue>(
    () => ({ dialogId, itemCount: items.length, openAt }),
    [dialogId, items.length, openAt],
  );

  return (
    <ArtworkLightboxContext.Provider value={contextValue}>
      {children}

      <dialog
        ref={dialogRef}
        id={dialogId}
        className={styles.dialog}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          closeLightbox();
        }}
        onClose={handleDialogClose}
        onClick={handleDialogClick}
        onKeyDown={handleDialogKeyDown}
      >
        <div className={styles.panel}>
          <header className={styles.toolbar}>
            <div className={styles.titleGroup} aria-live="polite" aria-atomic="true">
              <p
                className={`${displayHeadingStyles.eyebrow} ${styles.kicker}`}
              >
                作品大图
              </p>
              <h2
                id={titleId}
                className={`${displayHeadingStyles.utilityTitle} ${styles.medium}`}
              >
                {activeItem?.medium ?? "孩子们的创作"}
              </h2>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              aria-label="关闭作品大图"
              onClick={closeLightbox}
            >
              <X size={22} weight="regular" aria-hidden="true" />
            </button>
          </header>

          <div className={styles.imageArea}>
            {activeItem ? (
              <Image
                key={activeItem.id}
                className={styles.artwork}
                src={activeItem.src}
                alt={activeItem.alt}
                width={activeItem.width}
                height={activeItem.height}
                sizes="(max-width: 48rem) calc(100vw - 2rem), calc(100vw - 10rem)"
                draggable={false}
              />
            ) : (
              <p
                className={`${displayHeadingStyles.stateTitle} ${styles.emptyState}`}
              >
                暂时没有可查看的作品
              </p>
            )}
          </div>

          <footer className={styles.controls}>
            <button
              type="button"
              className={styles.navButton}
              aria-label="查看上一件作品"
              disabled={!activeItem || !hasMultipleItems}
              onClick={showPrevious}
            >
              <ArrowLeft size={20} weight="regular" aria-hidden="true" />
              <span className={styles.navLabel}>上一件</span>
            </button>

            <p className={styles.position} aria-live="polite" aria-atomic="true">
              {activeItem && activeIndex !== null
                ? `${activeIndex + 1} / ${items.length}`
                : "0 / 0"}
            </p>

            <button
              type="button"
              className={styles.navButton}
              aria-label="查看下一件作品"
              disabled={!activeItem || !hasMultipleItems}
              onClick={showNext}
            >
              <span className={styles.navLabel}>下一件</span>
              <ArrowRight size={20} weight="regular" aria-hidden="true" />
            </button>
          </footer>
        </div>
      </dialog>
    </ArtworkLightboxContext.Provider>
  );
}

export function ArtworkTrigger({
  index,
  className,
  children,
}: ArtworkTriggerProps) {
  const context = useContext(ArtworkLightboxContext);
  const indexIsValid =
    context !== null &&
    Number.isInteger(index) &&
    index >= 0 &&
    index < context.itemCount;
  const triggerClassName = className
    ? `${styles.trigger} ${className}`
    : styles.trigger;

  return (
    <button
      type="button"
      className={triggerClassName}
      aria-haspopup="dialog"
      aria-controls={context?.dialogId}
      disabled={!indexIsValid}
      onClick={(event) => context?.openAt(index, event.currentTarget)}
    >
      {children}
    </button>
  );
}
