import {
  ArrowRight,
  Books,
  Notebook,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import qingheBlackboardImage from "@/assets/hero-qinghe-blackboard.webp";
import qiyunBlackboardImage from "@/assets/hero-qiyun-blackboard.webp";
import booklistPreview from "@/assets/reading/booklist-page-1.webp";
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

const teamDiarySection = (() => {
  const section = siteSections.find((item) => item.id === "team-diaries");

  if (!section) {
    throw new Error("首页缺少团队日志导航配置");
  }

  return section;
})();

const readingSection = (() => {
  const section = siteSections.find((item) => item.id === "reading");

  if (!section) {
    throw new Error("首页缺少阅读共建导航配置");
  }

  return section;
})();

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
              { before: "启云心童梦，" },
              {
                before: "看",
                accent: "青禾",
                after: "生长",
              },
            ]}
          />
          <div className={styles.heroActions}>
            <Link className={styles.primaryLink} href="/about/">
              认识我们
              <ArrowRight aria-hidden="true" size={19} weight="bold" />
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <figure className={`${styles.heroFrame} ${styles.heroFrameQiyun}`}>
            <Image
              src={qiyunBlackboardImage}
              alt="云启青禾团队绘制的“启云心童梦”主题黑板报"
              sizes="(max-width: 900px) calc(100vw - 2rem), 52vw"
              placeholder="blur"
              preload
            />
          </figure>
          <figure className={`${styles.heroFrame} ${styles.heroFrameQinghe}`}>
            {/* React 19 otherwise promotes eager images to preloads. */}
            <Image
              src={qingheBlackboardImage}
              alt="云启青禾团队绘制的“看青禾生长”主题黑板报"
              sizes="(max-width: 900px) calc(100vw - 2rem), 52vw"
              placeholder="blur"
              loading="eager"
              fetchPriority="low"
            />
          </figure>
        </div>
      </section>

      <section
        className={styles.teamDiaryGateway}
        aria-labelledby="team-diary-gateway-title"
      >
        <Link href={teamDiarySection.href} className={styles.teamDiaryLink}>
          <span className={styles.teamDiaryIcon} aria-hidden="true">
            <Notebook size={32} weight="regular" />
          </span>
          <div className={styles.teamDiaryCopy}>
            <h2
              id="team-diary-gateway-title"
              className={headingStyles.sectionTitle}
            >
              {teamDiarySection.label}
            </h2>
            <p>{teamDiarySection.description}</p>
          </div>
          <span className={styles.teamDiaryAction}>
            阅读团队日志
            <ArrowRight aria-hidden="true" size={19} weight="bold" />
          </span>
        </Link>
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

      <section
        className={styles.readingPreview}
        aria-labelledby="reading-preview-title"
      >
        <figure className={styles.readingPaper}>
          <Image
            src={booklistPreview}
            alt="云南省双柏县乡村小学分级阅读书单第一页预览"
            sizes="(max-width: 767px) min(82vw, 28rem), (max-width: 900px) 42vw, 33vw"
            placeholder="blur"
            loading="lazy"
          />
          <figcaption>团队调研成果，110 条分级书目</figcaption>
        </figure>

        <div className={styles.readingCopy}>
          <span className={styles.readingIcon} aria-hidden="true">
            <Books size={29} weight="regular" />
          </span>
          <p className={headingStyles.eyebrow}>{readingSection.label}</p>
          <h2
            id="reading-preview-title"
            className={headingStyles.sectionTitle}
          >
            从适合此刻的一本书开始
          </h2>
          <p>{readingSection.description}</p>
          <div className={styles.readingActions}>
            <Link className={styles.readingPrimary} href="/reading/">
              进入阅读共建
              <ArrowRight aria-hidden="true" size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
