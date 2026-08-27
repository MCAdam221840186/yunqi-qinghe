import {
  ArrowSquareOut,
  CalendarDots,
  MapPin,
  NewspaperClipping,
} from "@phosphor-icons/react/ssr";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import { NatureOrnament } from "@/components/NatureOrnament";
import ReadingBreadcrumbs from "@/components/ReadingBreadcrumbs";
import { formatReadingDate, readingActivities } from "@/lib/reading";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/site";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "双柏相关阅读活动",
  description:
    "浏览近 24 个月双柏县、当地学校及楚雄州内与双柏直接相关的阅读活动精选。",
  path: "/reading/activities/",
});

const activeActivities = readingActivities.filter(
  (activity) => activity.status === "active",
);

export default function ReadingActivitiesPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "阅读共建", path: "/reading/" },
    { name: "双柏相关阅读活动", path: "/reading/activities/" },
  ]);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <ReadingBreadcrumbs current="双柏相关阅读活动" />

      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={headingStyles.eyebrow}>阅读行动</p>
          <DisplayHeading
            as="h1"
            variant="pageHero"
            lines={[
              { before: "书页之外，" },
              { before: "阅读正在", accent: "双柏发生" },
            ]}
          />
          <p>
            我们从政府、学校、图书馆等原始来源中，整理近 24 个月与双柏直接相关的阅读活动。摘要均由本站重新撰写，完整信息请回到原报道查看。
          </p>
        </div>

        <aside className={styles.windowNote} aria-labelledby="window-note-title">
          <CalendarDots size={25} weight="regular" aria-hidden="true" />
          <div>
            <h2 id="window-note-title">滚动近 24 个月</h2>
            <p>
              仅保留可确认日期、地区与原始来源的内容。每季度复核链接，无法继续访问的报道会暂停展示。
            </p>
          </div>
          <NatureOrnament
            variant="sprig"
            className={styles.windowNoteOrnament}
          />
        </aside>
      </header>

      <section className={styles.activitySection} aria-labelledby="activity-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={headingStyles.eyebrow}>近期精选</p>
            <h2 id="activity-title" className={headingStyles.sectionTitle}>
              当地阅读活动线索
            </h2>
          </div>
          <p>按报道日期倒序，共 {activeActivities.length} 条</p>
        </div>

        {activeActivities.length === 0 ? (
          <div className={styles.empty}>
            <h3>活动来源正在核验中</h3>
            <p>只有能够确认日期、地点与官方原始链接的内容才会展示。</p>
          </div>
        ) : (
          <ol className={styles.timeline}>
            {activeActivities.map((activity, index) => (
              <li key={activity.id}>
                <article className={styles.activity}>
                  <div className={styles.dateBlock}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <time dateTime={activity.publishedOn}>
                      {formatReadingDate(activity.publishedOn)}
                    </time>
                  </div>

                  <div className={styles.activityCopy}>
                    <p className={styles.region}>
                      <MapPin size={16} weight="fill" aria-hidden="true" />
                      {activity.region}
                    </p>
                    <h3>{activity.title}</h3>
                    <p className={styles.summary}>{activity.summary}</p>
                    <div className={styles.sourceRow}>
                      <p>
                        <NewspaperClipping
                          size={17}
                          weight="regular"
                          aria-hidden="true"
                        />
                        来源：{activity.sourceName}
                      </p>
                      <span>
                        核验于 {formatReadingDate(activity.lastCheckedOn)}
                      </span>
                    </div>
                    <a
                      className={styles.externalLink}
                      href={activity.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`阅读原报道《${activity.title}》，在新窗口打开`}
                    >
                      阅读原报道（新窗口）
                      <ArrowSquareOut
                        size={18}
                        weight="bold"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
