"use client";

import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import Image, { type StaticImageData } from "next/image";
import {
  MediaLightbox,
  MediaLightboxTrigger,
} from "./MediaLightbox";
import styles from "./TeamDiaryGallery.module.css";

export interface TeamDiaryGalleryItem {
  readonly id: string;
  readonly alt: string;
  readonly full: StaticImageData;
  readonly thumbnail: StaticImageData;
}

export interface TeamDiaryGalleryProps {
  readonly items: readonly TeamDiaryGalleryItem[];
  readonly title: string;
  readonly dayNumber: number;
}

export default function TeamDiaryGallery({
  items,
  title,
  dayNumber,
}: TeamDiaryGalleryProps) {
  const lead = items[0];
  const remaining = items.slice(1);

  if (!lead) {
    return (
      <p className={styles.empty} role="status">
        这篇日志暂时没有可查看的现场影像。
      </p>
    );
  }

  return (
    <MediaLightbox
      items={items}
      dialogClassName={styles.dialog}
      idPrefix={`team-diary-day-${dayNumber}`}
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
        <div className={styles.dialogPanel}>
          <header className={styles.dialogToolbar}>
            <div className={styles.dialogTitleGroup}>
              <p>Day {dayNumber} 现场影像</p>
              <h2 id={titleId}>{title}</h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.iconButton}
              aria-label="关闭图片查看器"
              onClick={close}
            >
              <X size={22} weight="regular" aria-hidden="true" />
            </button>
          </header>

          <div className={styles.dialogImageArea}>
            {activeItem ? (
              <Image
                key={activeItem.id}
                className={styles.dialogImage}
                src={activeItem.full}
                alt={activeItem.alt}
                width={activeItem.full.width}
                height={activeItem.full.height}
                sizes="(max-width: 48rem) calc(100vw - 2rem), calc(100vw - 8rem)"
                placeholder="blur"
                draggable={false}
              />
            ) : (
              <p className={styles.dialogEmpty} role="status">
                暂无可查看的现场影像
              </p>
            )}
          </div>

          <footer className={styles.dialogControls}>
            <button
              type="button"
              className={styles.navButton}
              aria-label="查看上一张现场影像"
              disabled={!activeItem || !hasPrevious}
              onClick={showPrevious}
            >
              <ArrowLeft size={20} weight="regular" aria-hidden="true" />
              <span>上一张</span>
            </button>

            <p id={descriptionId} className={styles.dialogCaption}>
              {activeItem?.alt ?? "暂无图片说明"}
            </p>

            <p className={styles.dialogPosition} aria-hidden="true">
              {activeItem && activeIndex !== null
                ? `${activeIndex + 1} / ${itemCount}`
                : `0 / ${itemCount}`}
            </p>

            <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
              {activeItem && activeIndex !== null
                ? `第 ${activeIndex + 1} 张，共 ${itemCount} 张。${activeItem.alt}`
                : ""}
            </p>

            <button
              type="button"
              className={styles.navButton}
              aria-label="查看下一张现场影像"
              disabled={!activeItem || !hasNext}
              onClick={showNext}
            >
              <span>下一张</span>
              <ArrowRight size={20} weight="regular" aria-hidden="true" />
            </button>
          </footer>
        </div>
      )}
    >
      <section className={styles.gallery} aria-label={`${title}的现场影像`}>
        <figure className={styles.leadFigure}>
          <MediaLightboxTrigger
            index={0}
            className={styles.imageTrigger}
            ariaLabel={`查看第 1 张现场影像大图：${lead.alt}`}
          >
            <span className={styles.leadFrame}>
              <Image
                className={styles.leadImage}
                src={lead.full}
                alt={lead.alt}
                width={lead.full.width}
                height={lead.full.height}
                sizes="(max-width: 80rem) calc(100vw - 2rem), 80rem"
                placeholder="blur"
                preload
              />
            </span>
          </MediaLightboxTrigger>
          <figcaption>
            <span>{lead.alt}</span>
            <small>第 1 张，共 {items.length} 张</small>
          </figcaption>
        </figure>

        {remaining.length > 0 ? (
          <ol className={styles.thumbnailGrid} aria-label="其余现场影像">
            {remaining.map((item, index) => {
              const itemIndex = index + 1;

              return (
                <li key={item.id} className={styles.thumbnailItem}>
                  <MediaLightboxTrigger
                    index={itemIndex}
                    className={styles.imageTrigger}
                    ariaLabel={`查看第 ${itemIndex + 1} 张现场影像大图：${item.alt}`}
                  >
                    <span className={styles.thumbnailFrame}>
                      <Image
                        className={styles.thumbnailImage}
                        src={item.thumbnail}
                        alt={item.alt}
                        width={item.thumbnail.width}
                        height={item.thumbnail.height}
                        sizes="(max-width: 35.99rem) calc(100vw - 2rem), (max-width: 63.99rem) 50vw, 42rem"
                        placeholder="blur"
                      />
                    </span>
                  </MediaLightboxTrigger>
                </li>
              );
            })}
          </ol>
        ) : null}
      </section>
    </MediaLightbox>
  );
}
