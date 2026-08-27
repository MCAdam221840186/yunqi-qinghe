import { ArrowRight, Books } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import qingheBlackboardImage from "@/assets/hero-qinghe-blackboard.webp";
import qiyunBlackboardImage from "@/assets/hero-qiyun-blackboard.webp";
import openingCeremonyImage from "@/assets/opening-ceremony-group.webp";
import booklistPreview from "@/assets/reading/booklist-page-1.webp";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import { NatureOrnament } from "@/components/NatureOrnament";
import { getArtwork } from "@/content/works";
import {
  contentStats,
  getDiaryAuthor,
  getDiaryBySlug,
  getDiaryPreview,
  getGrowthCardAsset,
  getTeamDiaryImages,
  teamDiaries,
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

function getFeaturedTeamDiary(dayNumber: 1 | 4 | 8) {
  const diary = teamDiaries.find((item) => item.dayNumber === dayNumber);
  if (!diary) {
    throw new Error(`首页团队日志缺少 Day ${dayNumber}`);
  }

  const cover = getTeamDiaryImages(diary)[0];
  if (!cover) {
    throw new Error(`首页团队日志 Day ${dayNumber} 缺少封面图片`);
  }

  return { diary, cover };
}

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
  const dayOne = getFeaturedTeamDiary(1);
  const dayFour = getFeaturedTeamDiary(4);
  const dayEight = getFeaturedTeamDiary(8);
  const teamDiaryChapters = [
    {
      ...dayEight,
      chapterLabel: "结营回望",
      className: `${styles.journeyEntry} ${styles.journeyClosing}`,
      imageSizes:
        "(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 61vw, 38vw",
    },
    {
      ...dayOne,
      chapterLabel: "开营起点",
      className: `${styles.journeyEntry} ${styles.journeyOpening}`,
      imageSizes:
        "(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 30vw, 20vw",
    },
    {
      ...dayFour,
      chapterLabel: "旅程中段",
      className: `${styles.journeyEntry} ${styles.journeyMidpoint}`,
      imageSizes:
        "(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 30vw, 20vw",
    },
  ] as const;
  const websiteJsonLd = createWebsiteJsonLd();

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
      />

      <section
        className={styles.openingMoment}
        aria-labelledby="home-title"
      >
        <h1 className={styles.openingTitle} id="home-title">
          云启青禾支教团队开营仪式合照
        </h1>
        <div className={styles.openingStage}>
          <figure className={styles.openingPhoto}>
            <Image
              src={openingCeremonyImage}
              alt="开营仪式上，云启青禾支教团志愿者与孩子们在写有‘启云心童梦’和‘看青禾生长’的黑板前合影"
              sizes="(max-width: 900px) calc(100vw - 1.25rem), calc(100vw - 3rem)"
              placeholder="blur"
              preload
            />
          </figure>
        </div>
      </section>

      <section
        className={styles.hero}
        aria-labelledby="blackboard-story-title"
      >
        <div className={styles.heroCopy}>
          <p className={headingStyles.eyebrow}>云启青禾支教团队</p>
          <DisplayHeading
            as="h2"
            id="blackboard-story-title"
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
              loading="lazy"
            />
          </figure>
          <figure className={`${styles.heroFrame} ${styles.heroFrameQinghe}`}>
            <Image
              src={qingheBlackboardImage}
              alt="云启青禾团队绘制的“看青禾生长”主题黑板报"
              sizes="(max-width: 900px) calc(100vw - 2rem), 52vw"
              placeholder="blur"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section
        className={styles.teamDiaryJourney}
        aria-labelledby="team-diary-journey-title"
      >
        <div className={styles.journeyIntroduction}>
          <NatureOrnament
            variant="sprig"
            className={styles.journeyOrnament}
          />
          <h2
            id="team-diary-journey-title"
            className={headingStyles.sectionTitle}
          >
            {teamDiarySection.label}，八日旅程
          </h2>
          <p className={styles.journeySummary}>
            从第一天的相遇到第八天的告别，课堂、陪伴与心情被一页页留在现场。
          </p>

          <dl className={styles.journeyStats} aria-label="团队日志统计">
            <div>
              <dt>旅程档案</dt>
              <dd>
                <strong>{contentStats.teamDiaries}</strong>
                <span>篇记录</span>
              </dd>
            </div>
            <div>
              <dt>现场影像</dt>
              <dd>
                <strong>{contentStats.teamDiaryAssets}</strong>
                <span>张现场影像</span>
              </dd>
            </div>
          </dl>

          <Link href={teamDiarySection.href} className={styles.journeyAction}>
            从 Day 1 读到 Day 8
            <ArrowRight aria-hidden="true" size={19} weight="bold" />
          </Link>
        </div>

        <div
          className={styles.journeyVisual}
          role="group"
          aria-label="Day 1、Day 4 与 Day 8 影像章节"
        >
          {teamDiaryChapters.map(
            ({ diary, cover, chapterLabel, className, imageSizes }) => (
              <Link
                key={diary.slug}
                className={className}
                href={`/team-diaries/${diary.slug}/`}
                aria-label={`阅读 Day ${diary.dayNumber} 团队日志《${diary.title}》`}
              >
                <figure>
                  <div className={styles.journeyPhoto}>
                    <Image
                      src={cover.thumbnail}
                      alt={cover.alt}
                      fill
                      sizes={imageSizes}
                      placeholder="blur"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className={styles.journeyCaption}>
                    <span className={styles.journeyChapter}>
                      <strong>Day {diary.dayNumber}</strong>
                      <span>{chapterLabel}</span>
                    </span>
                    <h3>{diary.title}</h3>
                  </figcaption>
                </figure>
              </Link>
            ),
          )}
        </div>
      </section>

      <section className={styles.latest} aria-labelledby="latest-title">
        <span className={styles.latestOrnamentFrame}>
          <NatureOrnament
            variant="sprig"
            className={styles.latestOrnament}
          />
        </span>
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
        <div className={styles.readingPaperStage}>
          <NatureOrnament
            variant="leafSeal"
            className={styles.readingLeafSeal}
          />
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
        </div>

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
