import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import DisplayHeading from "@/components/DisplayHeading";
import displayHeadingStyles from "@/components/DisplayHeading.module.css";
import {
  contentStats,
  getTeamDiaryImages,
  teamDiaries,
  type TeamDiaryRecord,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "团队日志｜八日旅程",
  description:
    "从开营到结营，按 Day 1 至 Day 8 阅读云启青禾在云南双柏记录的八篇团队日志与七十张现场影像。",
  path: "/team-diaries/",
});

const dayFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

function getDiary(dayNumber: number): TeamDiaryRecord {
  const diary = teamDiaries.find((item) => item.dayNumber === dayNumber);
  if (!diary) throw new Error(`团队日志缺少 Day ${dayNumber}`);
  return diary;
}

function Chapter({ diary }: { diary: TeamDiaryRecord }) {
  const cover = getTeamDiaryImages(diary)[0];
  if (!cover) throw new Error(`${diary.slug} 缺少封面图片`);

  const layout =
    diary.dayNumber === 1
      ? "opening"
      : diary.dayNumber === 4
        ? "turning"
        : diary.dayNumber === 8
          ? "closing"
          : "chapter";

  return (
    <li className={styles.chapterItem} id={diary.slug}>
      <article className={styles.chapter} data-layout={layout}>
        <div className={styles.chapterIndex} aria-hidden="true">
          <span>Day</span>
          <strong>{String(diary.dayNumber).padStart(2, "0")}</strong>
        </div>

        <figure className={styles.chapterVisual}>
          <Image
            src={cover.thumbnail}
            alt={cover.alt}
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 54vw, 42rem"
            placeholder="blur"
          />
          <figcaption>
            <span>{diary.images.length} 张现场影像</span>
            <span>{dayFormatter.format(new Date(diary.publishedOn))}</span>
          </figcaption>
        </figure>

        <div className={styles.chapterCopy}>
          <p className={styles.chapterDate}>
            <span>第 {diary.dayNumber} 日</span>
            <time dateTime={diary.publishedOn}>
              {dayFormatter.format(new Date(diary.publishedOn))}
            </time>
          </p>
          <h2>{diary.title}</h2>
          <p className={styles.summary}>{diary.summary}</p>
          <ul className={styles.tags} aria-label={`Day ${diary.dayNumber} 原帖话题`}>
            {diary.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
          <Link
            href={`/team-diaries/${diary.slug}/`}
            className={styles.chapterLink}
            aria-label={`进入 Day ${diary.dayNumber}，阅读《${diary.title}》`}
          >
            进入这一日
            <ArrowRightIcon aria-hidden="true" size={18} weight="bold" />
          </Link>
        </div>
      </article>
    </li>
  );
}

export default function TeamDiariesPage() {
  const opening = getDiary(1);
  const middle = getDiary(4);
  const closing = getDiary(8);
  const openingCover = getTeamDiaryImages(opening)[0];
  const middleCover = getTeamDiaryImages(middle)[0];
  const closingCover = getTeamDiaryImages(closing)[0];

  if (!openingCover || !middleCover || !closingCover) {
    throw new Error("团队日志头图不完整");
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={displayHeadingStyles.eyebrow}>团队日志 · 八日旅程</p>
          <DisplayHeading
            as="h1"
            variant="pageHero"
            lines={[
              { before: "从初见出发，" },
              { before: "沿着", accent: "八天" },
              { before: "走向告别" },
            ]}
          />
          <p className={styles.heroLead}>
            八位志愿者、一群山里的孩子，从开营的第一声问候，到结营时舍不得放开的拥抱。每一日，都是这段双向奔赴里不可替代的一章。
          </p>

          <dl className={styles.stats} aria-label="团队日志统计">
            <div>
              <dt>{contentStats.teamDiaries}</dt>
              <dd>篇正式记录</dd>
            </div>
            <div>
              <dt>{contentStats.teamDiaryAssets}</dt>
              <dd>张现场影像</dd>
            </div>
            <div>
              <dt>8</dt>
              <dd>个连续章节</dd>
            </div>
          </dl>
        </div>

        <div
          className={styles.heroCollage}
          role="group"
          aria-label="从开营到结营的旅程影像"
        >
          <figure className={`${styles.heroFigure} ${styles.heroOpening}`}>
            <Image
              src={openingCover.thumbnail}
              alt={openingCover.alt}
              sizes="(max-width: 767px) 58vw, (max-width: 1100px) 34vw, 27rem"
              placeholder="blur"
              preload
            />
            <figcaption>Day 1 · 初见</figcaption>
          </figure>
          <figure className={`${styles.heroFigure} ${styles.heroMiddle}`}>
            <Image
              src={middleCover.thumbnail}
              alt={middleCover.alt}
              sizes="(max-width: 767px) 34vw, (max-width: 1100px) 22vw, 17rem"
              placeholder="blur"
            />
            <figcaption>Day 4 · 相伴</figcaption>
          </figure>
          <figure className={`${styles.heroFigure} ${styles.heroClosing}`}>
            <Image
              src={closingCover.thumbnail}
              alt={closingCover.alt}
              sizes="(max-width: 767px) 40vw, (max-width: 1100px) 25vw, 20rem"
              placeholder="blur"
            />
            <figcaption>Day 8 · 告别</figcaption>
          </figure>
        </div>
      </header>

      <nav className={styles.dayNav} aria-label="Day 章节导航">
        <span className={styles.dayNavLabel}>沿途章节</span>
        <ol>
          {teamDiaries.map((diary) => (
            <li key={diary.slug}>
              <a href={`#${diary.slug}`}>
                <span>Day</span>
                <strong>{diary.dayNumber}</strong>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className={styles.journey} aria-labelledby="journey-title">
        <div className={styles.journeyHeading}>
          <p className={displayHeadingStyles.eyebrow}>按日阅读</p>
          <h2 id="journey-title" className={displayHeadingStyles.sectionTitle}>
            八天，八个无法跳过的章节
          </h2>
          <p>总览只留下通往故事的线索。进入每一日，可按原序读完正文与全部影像。</p>
        </div>

        <ol className={styles.chapters}>
          {teamDiaries.map((diary) => (
            <Chapter key={diary.slug} diary={diary} />
          ))}
        </ol>
      </section>
    </div>
  );
}
