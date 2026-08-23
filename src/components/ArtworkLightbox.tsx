"use client";

import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";
import displayHeadingStyles from "./DisplayHeading.module.css";
import {
  MediaLightbox,
  MediaLightboxTrigger,
} from "./MediaLightbox";
import styles from "./ArtworkLightbox.module.css";

export interface ArtworkLightboxItem {
  readonly id: string;
  readonly src: ImageProps["src"];
  readonly alt: string;
  readonly medium: string;
  readonly width: number;
  readonly height: number;
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

export function ArtworkLightboxProvider({
  items,
  children,
}: ArtworkLightboxProviderProps) {
  return (
    <MediaLightbox
      items={items}
      dialogClassName={styles.dialog}
      idPrefix="artwork"
      navigation="loop"
      renderDialog={({
        activeItem,
        activeIndex,
        itemCount,
        hasPrevious,
        hasNext,
        titleId,
        closeButtonRef,
        close,
        showPrevious,
        showNext,
      }) => (
        <div className={styles.panel}>
          <header className={styles.toolbar}>
            <div className={styles.titleGroup}>
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
              onClick={close}
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
              disabled={!activeItem || !hasPrevious}
              onClick={showPrevious}
            >
              <ArrowLeft size={20} weight="regular" aria-hidden="true" />
              <span className={styles.navLabel}>上一件</span>
            </button>

            <p className={styles.position} aria-hidden="true">
              {activeItem && activeIndex !== null
                ? `第 ${activeIndex + 1} 张，共 ${itemCount} 张`
                : "暂无作品"}
            </p>

            <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
              {activeItem && activeIndex !== null
                ? `${activeItem.medium}，第 ${activeIndex + 1} 张，共 ${itemCount} 张`
                : ""}
            </p>

            <button
              type="button"
              className={styles.navButton}
              aria-label="查看下一件作品"
              disabled={!activeItem || !hasNext}
              onClick={showNext}
            >
              <span className={styles.navLabel}>下一件</span>
              <ArrowRight size={20} weight="regular" aria-hidden="true" />
            </button>
          </footer>
        </div>
      )}
    >
      {children}
    </MediaLightbox>
  );
}

export function ArtworkTrigger({
  index,
  className,
  children,
}: ArtworkTriggerProps) {
  const triggerClassName = className
    ? `${styles.trigger} ${className}`
    : styles.trigger;

  return (
    <MediaLightboxTrigger index={index} className={triggerClassName}>
      {children}
    </MediaLightboxTrigger>
  );
}
