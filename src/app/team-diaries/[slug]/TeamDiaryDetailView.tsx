import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NatureOrnament } from "@/components/NatureOrnament";
import TeamDiaryGallery from "@/components/TeamDiaryGallery";
import {
  getAdjacentTeamDiaries,
  getTeamDiaryImages,
  type TeamDiaryRecord,
} from "@/lib/content";
import styles from "./page.module.css";

type TeamDiaryImages = ReturnType<typeof getTeamDiaryImages>;
type AdjacentTeamDiaries = ReturnType<typeof getAdjacentTeamDiaries>;

const chineseDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

function formatDate(value: string): string {
  const normalized = /^\d{4}-\d{2}-\d{2}$/u.test(value)
    ? `${value}T12:00:00+08:00`
    : value;
  const date = new Date(normalized);

  return Number.isNaN(date.getTime())
    ? value
    : chineseDateFormatter.format(date);
}

function AdjacentLink({
  diary,
  direction,
}: {
  diary: TeamDiaryRecord;
  direction: "previous" | "next";
}) {
  const cover = getTeamDiaryImages(diary)[0];
  const isPrevious = direction === "previous";

  return (
    <Link
      href={`/team-diaries/${diary.slug}/`}
      className={styles.adjacentLink}
      data-direction={direction}
    >
      <span className={styles.adjacentImage} aria-hidden="true">
        {cover ? (
          <Image
            src={cover.thumbnail}
            alt=""
            sizes="(max-width: 47.99rem) 34vw, 11rem"
          />
        ) : null}
      </span>

      <span className={styles.adjacentCopy}>
        <small>{isPrevious ? "上一篇" : "下一篇"}</small>
        <strong>{diary.title}</strong>
        <span>Day {diary.dayNumber}</span>
      </span>

      {isPrevious ? (
        <ArrowLeftIcon size={20} weight="regular" aria-hidden="true" />
      ) : (
        <ArrowRightIcon size={20} weight="regular" aria-hidden="true" />
      )}
    </Link>
  );
}

export default function TeamDiaryDetailView({
  diary,
  images,
  adjacent,
}: {
  diary: TeamDiaryRecord;
  images: TeamDiaryImages;
  adjacent: AdjacentTeamDiaries;
}) {
  const hasAdjacentDiary = Boolean(adjacent.previous || adjacent.next);

  return (
    <div className={styles.page}>
      <Link href="/team-diaries/" className={styles.backLink}>
        <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" />
        返回八日旅程
      </Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.dayMarker} aria-label={`旅程第 ${diary.dayNumber} 天`}>
            <span className={styles.dayLabel}>Day</span>
            <strong>{String(diary.dayNumber).padStart(2, "0")}</strong>
            <small>八日旅程</small>
            <NatureOrnament
              variant="sprig"
              className={styles.detailSprig}
            />
          </div>

          <div className={styles.headerCopy}>
            <p className={styles.eyebrow}>NJU 云启青禾团队日志</p>
            <h1>{diary.title}</h1>

            <dl className={styles.meta}>
              <div>
                <dt>作者</dt>
                <dd>{diary.author}</dd>
              </div>
              <div>
                <dt>发布时间</dt>
                <dd>
                  <time dateTime={diary.publishedOn}>
                    {formatDate(diary.publishedOn)}
                  </time>
                </dd>
              </div>
              {diary.updatedOn ? (
                <div>
                  <dt>编辑时间</dt>
                  <dd>
                    <time dateTime={diary.updatedOn}>
                      {formatDate(diary.updatedOn)}
                    </time>
                  </dd>
                </div>
              ) : null}
              {diary.location ? (
                <div>
                  <dt>发布地</dt>
                  <dd>{diary.location}</dd>
                </div>
              ) : null}
            </dl>

            <a
              className={styles.sourceLink}
              href={diary.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              查看小红书原帖
              <ArrowSquareOutIcon size={18} weight="regular" aria-hidden="true" />
            </a>
          </div>
        </header>

        <TeamDiaryGallery
          items={images}
          title={diary.title}
          dayNumber={diary.dayNumber}
        />

        <section className={styles.reading} aria-labelledby="diary-body-title">
          <div className={styles.readingIntro}>
            <p>当天手记</p>
            <h2 id="diary-body-title">写在现场</h2>
          </div>

          <div className={`markdown-body ${styles.markdown}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {diary.markdown}
            </ReactMarkdown>
          </div>

          {diary.tags.length > 0 ? (
            <ul className={styles.tags} aria-label="原帖话题">
              {diary.tags.map((tag, index) => (
                <li key={`${tag}-${index}`}>
                  #{tag.replace(/^#/u, "")}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </article>

      {hasAdjacentDiary ? (
        <nav className={styles.adjacentNav} aria-labelledby="journey-nav-title">
          <div className={styles.adjacentHeading}>
            <p>继续阅读</p>
            <h2 id="journey-nav-title">沿着旅程向前</h2>
          </div>
          <div className={styles.adjacentGrid}>
            {adjacent.previous ? (
              <AdjacentLink diary={adjacent.previous} direction="previous" />
            ) : null}
            {adjacent.next ? (
              <AdjacentLink diary={adjacent.next} direction="next" />
            ) : null}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
