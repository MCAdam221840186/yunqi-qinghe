import {
  ArrowRight,
  Notebook,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/hero-growth.webp";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import { getArtwork } from "@/content/works";
import {
  getDiaryAuthor,
  getDiaryBySlug,
  getDiaryPreview,
  getGrowthCardAsset,
} from "@/lib/content";
import { siteSections } from "@/lib/navigation";
import { createWebsiteJsonLd, serializeJsonLd } from "@/lib/site";
import styles from "./page.module.css";

const homeSections = siteSections.filter(
  (section) => section.id === "about" || section.id === "team-diaries",
);

const curatedGrowthDiarySlugs = [
  "student-009-session-01-b",
  "student-006-session-01-a",
  "student-018-session-04-a",
] as const;

const worksPreview = {
  leaf: getArtwork("leaf-17"),
  kite: getArtwork("kite-03"),
  emotion: getArtwork("emotion-13"),
} as const;

export default function HomePage() {
  const growthHighlights = curatedGrowthDiarySlugs.map((slug) => {
    const diary = getDiaryBySlug(slug);
    if (!diary) {
      throw new Error(`首页成长高光缺少记录：${slug}`);
    }

    const author = getDiaryAuthor(diary);
    const storyHighlight = author.story.highlights.find(
      (highlight) => highlight.diarySlug === diary.slug,
    );

    return {
      diary,
      author,
      image: getGrowthCardAsset(diary.imageId).thumbnail,
      note: storyHighlight?.note ?? getDiaryPreview(diary, 72),
      quote: storyHighlight?.quote ?? getDiaryPreview(diary, 48),
    };
  });
  const websiteJsonLd = createWebsiteJsonLd();

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
      />

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={headingStyles.eyebrow}>云启青禾支教团队</p>
          <DisplayHeading
            as="h1"
            id="home-title"
            variant="brandHero"
            lines={[
              { before: "向光而行，" },
              {
                before: "与",
                accent: "成长",
                after: "同行",
                tone: "primary",
              },
            ]}
          />
          <div className={styles.heroActions}>
            <Link className={styles.primaryLink} href="/about/">
              认识我们
              <ArrowRight aria-hidden="true" size={19} weight="bold" />
            </Link>
            <Link className={styles.secondaryLink} href="/team-diaries/">
              团队日志
              <ArrowRight aria-hidden="true" size={19} weight="bold" />
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <Image
            src={heroImage}
            alt="晨光中的绿色幼苗从层叠纸页之间生长"
            fill
            sizes="(max-width: 767px) calc(100vw - 2rem), 56vw"
            preload
          />
          <p className={styles.imageCaption}>向光生长</p>
        </div>
      </section>

      <section className={styles.routes} aria-labelledby="routes-title">
        <div className={styles.routesIntro}>
          <DisplayHeading
            as="h2"
            id="routes-title"
            variant="section"
            lines={[{ before: "从认识团队开始" }]}
          />
        </div>

        <div className={styles.routeList}>
          {homeSections.map((section) => {
            const Icon = section.id === "about" ? UsersThree : Notebook;
            return (
              <div key={section.id}>
                <Link href={section.href} className={styles.routeLink}>
                  <Icon aria-hidden="true" size={24} weight="regular" />
                  <span>
                    <strong className={headingStyles.contentTitle}>
                      {section.label}
                    </strong>
                    <small>{section.description}</small>
                  </span>
                  <ArrowRight
                    className={styles.routeArrow}
                    aria-hidden="true"
                    size={19}
                    weight="bold"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className={styles.worksPreview}
        aria-labelledby="works-preview-title"
      >
        <div className={styles.worksCopy}>
          <DisplayHeading
            as="h2"
            id="works-preview-title"
            variant="section"
            lines={[
              { before: "课桌展开，" },
              {
                before: "就是一座",
                accent: "美术馆",
                tone: "primary",
              },
            ]}
          />
          <p>
            叶片、颜色与纸上的线条，记录着孩子们怎样观察、感受和讲故事。
          </p>
          <Link className={styles.worksLink} href="/works/">
            创作展
            <ArrowRight aria-hidden="true" size={19} weight="bold" />
          </Link>
        </div>

        <div className={styles.worksDesk}>
          <figure className={`${styles.workSheet} ${styles.workLeaf}`}>
            <Image
              src={worksPreview.leaf.image}
              alt={worksPreview.leaf.alt}
              sizes="(max-width: 767px) 55vw, (max-width: 900px) 48vw, 31vw"
              placeholder="blur"
              loading="lazy"
            />
          </figure>
          <figure className={`${styles.workSheet} ${styles.workKite}`}>
            <Image
              src={worksPreview.kite.image}
              alt={worksPreview.kite.alt}
              sizes="(max-width: 767px) 48vw, (max-width: 900px) 43vw, 27vw"
              placeholder="blur"
              loading="lazy"
            />
          </figure>
          <figure className={`${styles.workSheet} ${styles.workEmotion}`}>
            <Image
              src={worksPreview.emotion.image}
              alt={worksPreview.emotion.alt}
              sizes="(max-width: 767px) 62vw, (max-width: 900px) 50vw, 30vw"
              placeholder="blur"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className={styles.latest} aria-labelledby="latest-title">
        <div className={styles.sectionHeading}>
          <DisplayHeading
            as="h2"
            id="latest-title"
            variant="section"
            lines={[{ before: "三张卡，看见成长发生" }]}
          />
          <Link href="/diaries/" className={styles.textLink}>
            查看成长日志
            <ArrowRight aria-hidden="true" size={17} weight="bold" />
          </Link>
        </div>

        <div className={styles.highlightGrid}>
          {growthHighlights.map(
            ({ diary, author, image, note, quote }, index) => {
              const isLead = index === 0;
              return (
                <div
                  key={diary.slug}
                  className={
                    isLead ? styles.highlightLeadSlot : styles.highlightSideSlot
                  }
                >
                  <article
                    className={`${styles.diaryPreview} ${
                      isLead ? styles.diaryLead : styles.diaryCompact
                    }`}
                  >
                    <Link
                      className={styles.diaryCard}
                      href={`/diaries/${diary.slug}/`}
                      aria-label={`查看${author.displayName}的成长记录卡《${diary.title}》`}
                    >
                      <figure className={styles.diaryImage}>
                        <Image
                          src={image}
                          alt={`${author.displayName}的成长记录卡《${diary.title}》`}
                          sizes={
                            isLead
                              ? "(max-width: 900px) calc(100vw - 2rem), 46vw"
                              : "(max-width: 900px) calc(100vw - 2rem), 17vw"
                          }
                          placeholder="blur"
                        />
                      </figure>

                      <div className={styles.diaryCopy}>
                        <div className={styles.diaryMeta}>
                          <span className={styles.diaryIdentity}>
                            <strong>{author.displayName}</strong>
                            <span>{author.className}</span>
                          </span>
                          <span>{diary.dateLabel}</span>
                        </div>
                        <h3 className={headingStyles.contentTitle}>
                          {diary.title}
                        </h3>
                        <blockquote>“{quote}”</blockquote>
                        <p>{note}</p>
                        <span className={styles.diaryRead}>
                          查看原卡与转写
                          <ArrowRight
                            aria-hidden="true"
                            size={17}
                            weight="bold"
                          />
                        </span>
                      </div>
                    </Link>
                  </article>
                </div>
              );
            },
          )}
        </div>
      </section>
    </div>
  );
}
