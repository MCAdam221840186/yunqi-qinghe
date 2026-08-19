import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import journalImage from "@/assets/journal-light.webp";
import {
  children,
  getDiaryCountForChild,
  getLatestDiaryForChild,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "成长日志",
  description: "按小朋友浏览云启青禾保存的匿名成长日记。",
  path: "/diaries/",
});

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

function getInitial(displayName: string): string {
  return displayName.match(/[A-Z]$/)?.[0] ?? displayName.slice(-1);
}

export default function DiariesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={styles.kicker}>成长日志</p>
          <h1>每一段成长，都值得被认真看见</h1>
        </div>
        <figure className={styles.visual}>
          <Image
            src={journalImage}
            alt="阳光照在打开的空白笔记本、铅笔和绿叶上"
            sizes="(max-width: 767px) calc(100vw - 2rem), 38vw"
            preload
          />
        </figure>
      </header>

      {children.length === 0 ? (
        <section className={styles.empty} aria-labelledby="empty-title">
          <h2 id="empty-title">成长册正在准备中</h2>
          <p>还没有可以展示的成长记录。</p>
        </section>
      ) : (
        <ol className={styles.roster} aria-label="小朋友成长册">
          {children.map((child) => {
            const diaryCount = getDiaryCountForChild(child.slug);
            const latestDiary = getLatestDiaryForChild(child.slug);

            return (
              <li key={child.slug} className={styles.rosterItem}>
                <Link
                  href={`/children/${child.slug}`}
                  className={styles.childLink}
                  aria-label={`浏览${child.displayName}的 ${diaryCount} 篇日记`}
                >
                  <span className={styles.monogram} aria-hidden="true">
                    {getInitial(child.displayName)}
                  </span>

                  <span className={styles.identity}>
                    <strong>{child.displayName}</strong>
                    <span>
                      {latestDiary
                        ? `最近记录：${latestDiary.title}`
                        : "等待第一篇成长记录"}
                    </span>
                  </span>

                  <span className={styles.summary}>
                    <strong>{diaryCount}</strong>
                    <span>篇日记</span>
                  </span>

                  <span className={styles.latestDate}>
                    {latestDiary ? (
                      <time dateTime={latestDiary.date}>
                        {dateFormatter.format(new Date(latestDiary.date))}
                      </time>
                    ) : (
                      "尚未更新"
                    )}
                  </span>

                  <span className={styles.arrow} aria-hidden="true">
                    <ArrowRightIcon size={24} weight="regular" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
