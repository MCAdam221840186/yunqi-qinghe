import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsOutSimpleIcon,
  QuotesIcon,
} from "@phosphor-icons/react/ssr";
import displayHeadingStyles from "@/components/DisplayHeading.module.css";
import GrowthCardLightbox, {
  GrowthCardTrigger,
  type GrowthCardLightboxItem,
} from "@/components/GrowthCardLightbox";
import {
  getDiaryBySlug,
  getGrowthCardAsset,
  getGrowthCardImageAlt,
  type ChildRecord,
  type DiaryDateRange,
  type DiaryRecord,
} from "@/lib/content";
import styles from "./page.module.css";

function formatDateRange(dateRange: DiaryDateRange | undefined): string {
  if (!dateRange) return "暂无日期记录";
  return dateRange.earliestLabel === dateRange.latestLabel
    ? dateRange.earliestLabel
    : `${dateRange.earliestLabel} 至 ${dateRange.latestLabel}`;
}

function buildLightboxItems(
  child: ChildRecord,
  diaries: readonly DiaryRecord[],
): GrowthCardLightboxItem[] {
  return diaries.map((diary) => ({
    id: diary.imageId,
    full: getGrowthCardAsset(diary.imageId).full,
    alt: getGrowthCardImageAlt(child.displayName, diary),
    title: diary.title,
    meta: `${child.displayName}，${child.className}，${diary.dateLabel}`,
    detailHref: `/diaries/${diary.slug}/`,
  }));
}

export default function ChildDiaryListView({
  child,
  diaries,
  dateRange,
}: {
  child: ChildRecord;
  diaries: readonly DiaryRecord[];
  dateRange: DiaryDateRange | undefined;
}) {
  const lightboxItems = buildLightboxItems(child, diaries);
  const featuredDiary = getDiaryBySlug(child.story.featuredDiarySlug);
  if (!featuredDiary) throw new Error(`${child.slug} 缺少代表成长卡`);
  const featuredIndex = diaries.findIndex(
    (diary) => diary.slug === featuredDiary.slug,
  );
  const featuredAsset = getGrowthCardAsset(featuredDiary.imageId);
  const featuredHighlight = child.story.highlights.find(
    (highlight) => highlight.diarySlug === featuredDiary.slug,
  );
  if (!featuredHighlight?.quote) {
    throw new Error(`${child.slug} 的代表成长卡缺少孩子原话`);
  }
  const featuredQuote = featuredHighlight.quote;

  return (
    <div className={styles.page}>
      <Link href="/diaries/" className={styles.backLink}>
        <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" />
        返回成长日志
      </Link>

      <GrowthCardLightbox items={lightboxItems}>
        <div className={styles.layout}>
          <header className={styles.identity}>
            <p className={displayHeadingStyles.eyebrow}>真实成长记录</p>
            <h1 className={displayHeadingStyles.contentHero}>
              {child.displayName}
            </h1>
            <p className={styles.className}>{child.className}</p>

            <p className={styles.summary}>{child.story.summary}</p>

            <dl className={styles.facts}>
              <div>
                <dt>记录数量</dt>
                <dd>{diaries.length} 份</dd>
              </div>
              <div>
                <dt>记录时间</dt>
                <dd>{formatDateRange(dateRange)}</dd>
              </div>
              <div>
                <dt>成长节点</dt>
                <dd>{child.story.highlights.length} 个</dd>
              </div>
            </dl>
          </header>

          <div className={styles.story}>
            <section className={styles.featured} aria-labelledby="featured-title">
              <div className={styles.featuredHeading}>
                <div>
                  <h2 id="featured-title" className={displayHeadingStyles.sectionTitle}>
                    代表成长卡
                  </h2>
                </div>
                <span>{featuredDiary.dateLabel}</span>
              </div>

              <div className={styles.featuredGrid}>
                <figure className={styles.featuredCard}>
                  <GrowthCardTrigger
                    index={featuredIndex}
                    className={styles.imageTrigger}
                    ariaLabel={`放大查看${child.displayName}的代表成长卡`}
                  >
                    <Image
                      src={featuredAsset.full}
                      alt={getGrowthCardImageAlt(
                        child.displayName,
                        featuredDiary,
                        "代表成长卡",
                      )}
                      sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 48vw, 32rem"
                      preload
                    />
                    <span className={styles.zoomHint} aria-hidden="true">
                      <ArrowsOutSimpleIcon size={19} weight="regular" />
                    </span>
                  </GrowthCardTrigger>
                  <figcaption>
                    <span>{featuredDiary.title}</span>
                    <Link href={`/diaries/${featuredDiary.slug}/`}>
                      阅读完整转写
                      <ArrowRightIcon size={17} weight="bold" aria-hidden="true" />
                    </Link>
                  </figcaption>
                </figure>

                <blockquote className={styles.featuredQuote}>
                  <QuotesIcon size={28} weight="regular" aria-hidden="true" />
                  <p>{featuredQuote}</p>
                  <cite>{child.displayName}的原话</cite>
                </blockquote>
              </div>
            </section>

            <section className={styles.timeline} aria-labelledby="timeline-title">
              <div className={styles.timelineHeading}>
                <h2 id="timeline-title" className={displayHeadingStyles.sectionTitle}>
                  几个片段，串起一条成长线索
                </h2>
              </div>

              <ol className={styles.highlightList}>
                {child.story.highlights.map((highlight, index) => {
                  const diary = getDiaryBySlug(highlight.diarySlug);
                  if (!diary) {
                    throw new Error(`${child.slug} 的成长节点缺少记录`);
                  }
                  const asset = getGrowthCardAsset(diary.imageId);
                  const diaryIndex = diaries.findIndex(
                    (candidate) => candidate.slug === diary.slug,
                  );
                  const quote = highlight.quote;

                  return (
                    <li
                      key={highlight.diarySlug}
                      className={styles.highlight}
                      data-layout={(index % 3) + 1}
                    >
                      <div className={styles.highlightImage}>
                        <GrowthCardTrigger
                          index={diaryIndex}
                          className={styles.imageTrigger}
                          ariaLabel={`放大查看成长节点${index + 1}的原卡`}
                        >
                          <Image
                            src={asset.thumbnail}
                            alt={getGrowthCardImageAlt(
                              child.displayName,
                              diary,
                              "成长记录卡缩略图",
                            )}
                            sizes="(max-width: 767px) calc(100vw - 2rem), 18rem"
                            loading="lazy"
                          />
                          <span className={styles.zoomHint} aria-hidden="true">
                            <ArrowsOutSimpleIcon size={18} weight="regular" />
                          </span>
                        </GrowthCardTrigger>
                      </div>

                      <div className={styles.highlightCopy}>
                        <p className={styles.nodeMeta}>{diary.dateLabel}</p>
                        <h3>{highlight.title}</h3>
                        <p>{highlight.note}</p>
                        {quote ? <blockquote>{quote}</blockquote> : null}
                        <Link href={`/diaries/${diary.slug}/`}>
                          查看原卡与转写
                          <ArrowRightIcon size={17} weight="bold" aria-hidden="true" />
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className={styles.archive} aria-labelledby="archive-title">
              <div className={styles.archiveHeading}>
                <div>
                  <h2 id="archive-title" className={displayHeadingStyles.sectionTitle}>
                    全部原卡档案
                  </h2>
                </div>
                <span>{diaries.length} 份</span>
              </div>

              <ol className={styles.archiveGrid}>
                {diaries.map((diary, index) => {
                  const asset = getGrowthCardAsset(diary.imageId);
                  return (
                    <li key={diary.slug}>
                      <GrowthCardTrigger
                        index={index}
                        className={styles.archiveTrigger}
                        ariaLabel={`放大查看${diary.dateLabel}的原卡`}
                      >
                        <span className={styles.archiveImage}>
                          <Image
                            src={asset.thumbnail}
                            alt={getGrowthCardImageAlt(
                              child.displayName,
                              diary,
                              "成长记录卡缩略图",
                            )}
                            sizes="(max-width: 480px) 43vw, (max-width: 767px) 29vw, (max-width: 1100px) 18vw, 10rem"
                            loading="lazy"
                          />
                        </span>
                        <span className={styles.archiveMeta}>
                          <strong>{diary.dateLabel}</strong>
                          <small>{diary.title}</small>
                        </span>
                      </GrowthCardTrigger>
                      <Link
                        className={styles.archiveDetail}
                        href={`/diaries/${diary.slug}/`}
                      >
                        文字详情
                        <ArrowRightIcon size={15} weight="bold" aria-hidden="true" />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>
        </div>
      </GrowthCardLightbox>
    </div>
  );
}
