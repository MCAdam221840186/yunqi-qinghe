import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import teamNotebooksImage from "@/assets/team-notebooks.webp";
import DisplayHeading from "@/components/DisplayHeading";
import displayHeadingStyles from "@/components/DisplayHeading.module.css";
import { teamDiaries } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "团队日志",
  description: "浏览云启青禾团队按时间记录的工作日志。",
  path: "/team-diaries/",
});

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

const monthDayFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "numeric",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

const weekdayFormatter = new Intl.DateTimeFormat("zh-CN", {
  weekday: "long",
  timeZone: "Asia/Shanghai",
});

const updatedFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Shanghai",
});

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h3 className={displayHeadingStyles.contentTitle}>{children}</h3>
  ),
  h2: ({ children }) => (
    <h3 className={displayHeadingStyles.contentTitle}>{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className={displayHeadingStyles.utilityTitle}>{children}</h4>
  ),
  h4: ({ children }) => (
    <h4 className={displayHeadingStyles.utilityTitle}>{children}</h4>
  ),
};

export default function TeamDiariesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={displayHeadingStyles.eyebrow}>团队日志</p>
          <DisplayHeading
            as="h1"
            variant="pageHero"
            lines={[
              { before: "一起走过的日子，" },
              {
                before: "也有自己的",
                accent: "年轮",
                tone: "primary",
              },
            ]}
          />
        </div>
        <figure className={styles.visual}>
          <Image
            src={teamNotebooksImage}
            alt="窗边叠放的旧笔记本上覆着一枝绿叶"
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 900px) min(calc(100vw - 2.5rem), 42rem), 38vw"
            preload
          />
        </figure>
      </header>

      {teamDiaries.length === 0 ? (
        <section className={styles.empty} aria-labelledby="empty-title">
          <h2 id="empty-title" className={displayHeadingStyles.stateTitle}>
            团队日志正在整理中
          </h2>
          <p>完成第一篇记录后，它会出现在这里。</p>
        </section>
      ) : (
        <ol className={styles.timeline} aria-label="团队日志时间线">
          {teamDiaries.map((diary, index) => {
            const date = new Date(diary.date);
            const title = diary.title || dateFormatter.format(date);

            return (
              <li key={`${diary.date}-${index}`} className={styles.timelineItem}>
                <div className={styles.dateBlock}>
                  <time dateTime={diary.date}>
                    <strong>{monthDayFormatter.format(date)}</strong>
                    <span>{weekdayFormatter.format(date)}</span>
                  </time>
                </div>

                <article className={styles.entry}>
                  <h2 className={displayHeadingStyles.contentTitle}>{title}</h2>
                  <div className={styles.markdown}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {diary.markdown}
                    </ReactMarkdown>
                  </div>
                  <p className={styles.updated}>
                    更新于{" "}
                    <time dateTime={diary.updatedAt}>
                      {updatedFormatter.format(new Date(diary.updatedAt))}
                    </time>
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
