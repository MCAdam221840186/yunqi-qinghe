"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  X,
} from "@phosphor-icons/react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  MediaLightbox,
  MediaLightboxTrigger,
} from "./MediaLightbox";
import styles from "./GrowthCardLightbox.module.css";

export interface GrowthCardLightboxItem {
  readonly id: string;
  readonly full: StaticImageData;
  readonly alt: string;
  readonly title: string;
  readonly meta: string;
  readonly detailHref: string;
}

export interface GrowthCardLightboxProps {
  readonly items: readonly GrowthCardLightboxItem[];
  readonly children: ReactNode;
}

export interface GrowthCardTriggerProps {
  readonly index: number;
  readonly children: ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
}

export function GrowthCardLightbox({
  items,
  children,
}: GrowthCardLightboxProps) {
  return (
    <MediaLightbox
      items={items}
      dialogClassName={styles.dialog}
      idPrefix="growth-card"
      navigation="bounded"
      hasDescription
      renderDialog={({
        activeItem,
        activeIndex,
        itemCount,
        hasPrevious,
        hasNext,
        titleId,
        descriptionId,
        closeButtonRef,
        close,
        showPrevious,
        showNext,
      }) => (
        <div className={styles.panel}>
          <header className={styles.toolbar}>
            <div className={styles.titleGroup}>
              <h2 id={titleId} className={styles.title}>
                {activeItem?.title ?? "成长记录原卡"}
              </h2>
              <p id={descriptionId} className={styles.meta}>
                {activeItem?.meta ?? "暂无记录信息"}
              </p>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              className={styles.iconButton}
              aria-label="关闭成长记录卡"
              onClick={close}
            >
              <X size={22} weight="regular" aria-hidden="true" />
            </button>
          </header>

          <div className={styles.imageArea}>
            {activeItem ? (
              <Image
                key={activeItem.id}
                className={styles.cardImage}
                src={activeItem.full}
                alt={activeItem.alt}
                width={activeItem.full.width}
                height={activeItem.full.height}
                sizes="(max-width: 48rem) calc(100vw - 2rem), calc(100vw - 12rem)"
                placeholder="blur"
                draggable={false}
              />
            ) : (
              <p className={styles.dialogEmpty} role="status">
                暂无可查看的成长记录卡
              </p>
            )}
          </div>

          <footer className={styles.controls}>
            <button
              type="button"
              className={styles.navButton}
              aria-label="查看上一张成长记录卡"
              disabled={!activeItem || !hasPrevious}
              onClick={showPrevious}
            >
              <ArrowLeft size={20} weight="regular" aria-hidden="true" />
              <span className={styles.navLabel}>上一张</span>
            </button>

            <p className={styles.position} aria-hidden="true">
              {activeItem && activeIndex !== null
                ? `第 ${activeIndex + 1} 张，共 ${itemCount} 张`
                : "暂无原卡"}
            </p>

            <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
              {activeItem && activeIndex !== null
                ? `${activeItem.title}，第 ${activeIndex + 1} 张，共 ${itemCount} 张`
                : ""}
            </p>

            <button
              type="button"
              className={styles.navButton}
              aria-label="查看下一张成长记录卡"
              disabled={!activeItem || !hasNext}
              onClick={showNext}
            >
              <span className={styles.navLabel}>下一张</span>
              <ArrowRight size={20} weight="regular" aria-hidden="true" />
            </button>

            {activeItem ? (
              <Link className={styles.detailLink} href={activeItem.detailHref}>
                <span className={styles.detailLong}>查看日志详情</span>
                <span className={styles.detailShort}>详情</span>
                <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
              </Link>
            ) : (
              <span className={styles.detailPlaceholder} aria-hidden="true" />
            )}
          </footer>
        </div>
      )}
    >
      {children}

      {items.length === 0 ? (
        <p className={styles.providerEmpty} role="status">
          暂无可查看的成长记录卡
        </p>
      ) : null}
    </MediaLightbox>
  );
}

export const GrowthCardLightboxProvider = GrowthCardLightbox;

export function GrowthCardTrigger({
  index,
  children,
  className,
  ariaLabel,
}: GrowthCardTriggerProps) {
  const triggerClassName = className
    ? `${styles.trigger} ${className}`
    : styles.trigger;

  return (
    <MediaLightboxTrigger
      index={index}
      className={triggerClassName}
      ariaLabel={ariaLabel}
    >
      {children}
    </MediaLightboxTrigger>
  );
}

export default GrowthCardLightbox;
