import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CardsThreeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import GrowthJourneyTrack from "@/components/GrowthJourneyTrack";
import {
  contentStats,
  getChildrenGroupedByClass,
  getDiaryAuthor,
  getDiaryBySlug,
  getDiaryCountForChild,
  getGrowthCardAsset,
  getGrowthCardImageAlt,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "成长日志",
  description: `浏览 ${contentStats.children} 位孩子的 ${contentStats.diaries} 份真实成长记录。`,
  path: "/diaries/",
});

const journeyStages = [
  {
    eyebrow: "相遇与尝试",
    title: "先把陌生，变成愿意试一试",
    copy: "从魔方、魔术到合唱和运动，第一步不是立刻做得完美，而是在同伴身边开口、动手，再给自己一次机会。",
    themes: ["新尝试", "同伴关系", "勇气"],
  },
  {
    eyebrow: "文化与创作",
    title: "看见更大的世界，也留下自己的线条",
    copy: "大学、民族文化与科学课打开新的窗口。孩子们把好奇装进小册子，也用画面和文字说出各自看见的世界。",
    themes: ["文化", "科学", "表达"],
  },
  {
    eyebrow: "表达与坚持",
    title: "情绪有了名字，坚持也有了回声",
    copy: "书法、电影、音乐、人工智能和风筝让感受变得具体。一次没完成，可以换一种方法，再耐心向前一点。",
    themes: ["情绪", "创造", "坚持"],
  },
  {
    eyebrow: "收获与告别",
    title: "把被看见的成长，带到明天",
    copy: "奖状不是故事的终点。孩子们在回望中确认自己的变化，也把感谢、不舍和下一次想做的事认真写了下来。",
    themes: ["自我确认", "回应", "告别"],
  },
] as const;

const directoryHeroDiarySlugs = [
  "student-009-session-01-b",
  "student-020-session-02-a",
  "student-018-session-04-a",
] as const;

function selectHeroCards() {
  return directoryHeroDiarySlugs.map((slug) => {
    const diary = getDiaryBySlug(slug);
    if (!diary) throw new Error(`成长日志首屏缺少代表卡 ${slug}`);
    return diary;
  });
}

export default function DiariesPage() {
  const heroCards = selectHeroCards();
  const classGroups = getChildrenGroupedByClass();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={headingStyles.eyebrow}>成长日志</p>
          <DisplayHeading
            as="h1"
            variant="pageHero"
            lines={[
              { before: "每一段成长，" },
              {
                before: "都值得被",
                accent: "认真看见",
                tone: "primary",
              },
            ]}
          />

          <dl className={styles.stats} aria-label="成长日志内容统计">
            <div>
              <dt>
                <UsersThreeIcon size={18} weight="regular" aria-hidden="true" />
                孩子
              </dt>
              <dd>{contentStats.children}</dd>
            </div>
            <div>
              <dt>
                <CardsThreeIcon size={18} weight="regular" aria-hidden="true" />
                真实记录
              </dt>
              <dd>{contentStats.diaries}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.cardStack} aria-label="三张真实成长记录卡节选">
          {heroCards.map((diary, index) => {
            const child = getDiaryAuthor(diary);
            const asset = getGrowthCardAsset(diary.imageId);
            return (
              <figure
                key={diary.slug}
                className={styles.heroCard}
                data-position={index + 1}
              >
                <Image
                  src={asset.thumbnail}
                  alt={getGrowthCardImageAlt(
                    child.displayName,
                    diary,
                    "成长记录卡",
                  )}
                  sizes="(max-width: 767px) 54vw, (max-width: 900px) 36vw, 19rem"
                  preload={index === 1}
                />
                <figcaption>
                  <strong>{child.displayName}</strong>
                  <span>{diary.dateLabel}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </header>

      <section className={styles.journey} aria-labelledby="journey-title">
        <div className={styles.sectionIntro}>
          <h2 id="journey-title" className={headingStyles.sectionTitle}>
            四个片段，串起 {contentStats.diaries} 份记录里的变化
          </h2>
        </div>

        <GrowthJourneyTrack ariaLabel="夏令营成长阶段" controlsLabel="切换成长阶段">
          {journeyStages.map((stage) => (
            <li key={stage.eyebrow} className={styles.stageCard}>
              <p>{stage.eyebrow}</p>
              <h3>{stage.title}</h3>
              <div className={styles.stageCopy}>{stage.copy}</div>
              <ul aria-label="这一阶段的主题">
                {stage.themes.map((theme) => (
                  <li key={theme}>{theme}</li>
                ))}
              </ul>
            </li>
          ))}
        </GrowthJourneyTrack>
      </section>

      <section className={styles.archive} aria-labelledby="archive-title">
        <div className={styles.archiveHeading}>
          <div>
            <h2 id="archive-title" className={headingStyles.sectionTitle}>
              每个名字，都有一条自己的成长线索
            </h2>
          </div>
          <p>
            {contentStats.classes} 个班级，{contentStats.children} 位孩子
          </p>
        </div>

        <div className={styles.classGrid}>
          {classGroups.map((group) => (
            <section key={group.className} className={styles.classGroup}>
              <header>
                <h3>{group.className}</h3>
                <span>{group.children.length} 人</span>
              </header>
              <ol>
                {group.children.map((child) => {
                  const count = getDiaryCountForChild(child.slug);
                  return (
                    <li key={child.slug}>
                      <Link
                        href={`/children/${child.slug}/`}
                        aria-label={`浏览${child.displayName}的${count}份成长记录`}
                      >
                        <span className={styles.childIdentity}>
                          <strong>{child.displayName}</strong>
                          <small>{child.className}</small>
                        </span>
                        <span className={styles.childSummary}>
                          {child.story.summary}
                        </span>
                        <span className={styles.recordCount}>{count} 份</span>
                        <ArrowRightIcon
                          className={styles.rowArrow}
                          size={19}
                          weight="regular"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
