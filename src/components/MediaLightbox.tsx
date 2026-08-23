"use client";

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
  type RefObject,
} from "react";
import { flushSync } from "react-dom";

type MediaLightboxNavigation = "bounded" | "loop";

interface MediaLightboxContextValue {
  readonly dialogId: string;
  readonly itemCount: number;
  openAt: (index: number, trigger: HTMLButtonElement) => void;
}

export interface MediaLightboxRenderState<Item> {
  readonly activeItem: Item | null;
  readonly activeIndex: number | null;
  readonly itemCount: number;
  readonly hasPrevious: boolean;
  readonly hasNext: boolean;
  readonly titleId: string;
  readonly descriptionId: string | undefined;
  readonly closeButtonRef: RefObject<HTMLButtonElement | null>;
  close: () => void;
  showPrevious: () => void;
  showNext: () => void;
}

export interface MediaLightboxProps<Item> {
  readonly items: readonly Item[];
  readonly children: ReactNode;
  readonly dialogClassName: string;
  readonly idPrefix?: string;
  readonly navigation?: MediaLightboxNavigation;
  readonly hasDescription?: boolean;
  renderDialog: (state: MediaLightboxRenderState<Item>) => ReactNode;
}

export interface MediaLightboxTriggerProps {
  readonly index: number;
  readonly children: ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
}

const MediaLightboxContext = createContext<MediaLightboxContextValue | null>(
  null,
);

export function MediaLightbox<Item>({
  items,
  children,
  dialogClassName,
  idPrefix = "media-lightbox",
  navigation = "bounded",
  hasDescription = false,
  renderDialog,
}: MediaLightboxProps<Item>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const previousOverflowRef = useRef("");
  const bodyScrollLockedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const componentId = useId();
  const dialogId = `${componentId}-${idPrefix}-dialog`;
  const titleId = `${componentId}-${idPrefix}-title`;
  const descriptionId = hasDescription
    ? `${componentId}-${idPrefix}-description`
    : undefined;

  const activeItem =
    activeIndex === null ? null : (items[activeIndex] ?? null);
  const hasPrevious =
    activeIndex !== null &&
    items.length > 1 &&
    (navigation === "loop" || activeIndex > 0);
  const hasNext =
    activeIndex !== null &&
    items.length > 1 &&
    (navigation === "loop" || activeIndex < items.length - 1);

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
      flushSync(() => setActiveIndex(index));

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

  const close = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || items.length < 2) return currentIndex;

      if (navigation === "loop") {
        return (currentIndex - 1 + items.length) % items.length;
      }

      return currentIndex > 0 ? currentIndex - 1 : currentIndex;
    });
  }, [items.length, navigation]);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || items.length < 2) return currentIndex;

      if (navigation === "loop") {
        return (currentIndex + 1) % items.length;
      }

      return currentIndex < items.length - 1
        ? currentIndex + 1
        : currentIndex;
    });
  }, [items.length, navigation]);

  const handleDialogClose = useCallback(() => {
    setActiveIndex(null);
    restoreBodyScroll();

    const trigger = lastTriggerRef.current;
    lastTriggerRef.current = null;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  }, [restoreBodyScroll]);

  const handleDialogClick = useCallback(
    (event: ReactMouseEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) close();
    },
    [close],
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

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    },
    [close, showNext, showPrevious],
  );

  useEffect(() => {
    const dialog = dialogRef.current;

    return () => {
      restoreBodyScroll();
      if (dialog?.open) dialog.close();
    };
  }, [restoreBodyScroll]);

  const contextValue = useMemo<MediaLightboxContextValue>(
    () => ({ dialogId, itemCount: items.length, openAt }),
    [dialogId, items.length, openAt],
  );

  return (
    <MediaLightboxContext.Provider value={contextValue}>
      {children}

      <dialog
        ref={dialogRef}
        id={dialogId}
        className={dialogClassName}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={handleDialogClose}
        onClick={handleDialogClick}
        onKeyDown={handleDialogKeyDown}
      >
        {renderDialog({
          activeItem,
          activeIndex,
          itemCount: items.length,
          hasPrevious,
          hasNext,
          titleId,
          descriptionId,
          closeButtonRef,
          close,
          showPrevious,
          showNext,
        })}
      </dialog>
    </MediaLightboxContext.Provider>
  );
}

export function MediaLightboxTrigger({
  index,
  children,
  className,
  ariaLabel,
}: MediaLightboxTriggerProps) {
  const context = useContext(MediaLightboxContext);
  const indexIsValid =
    context !== null &&
    Number.isInteger(index) &&
    index >= 0 &&
    index < context.itemCount;

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      aria-controls={context?.dialogId}
      disabled={!indexIsValid}
      onClick={(event) => context?.openAt(index, event.currentTarget)}
    >
      {children}
    </button>
  );
}
