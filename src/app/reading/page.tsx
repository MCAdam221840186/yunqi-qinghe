import {
  ArrowRight,
  Books,
  CalendarDots,
  DownloadSimple,
  GlobeHemisphereWest,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import booklistPreview from "@/assets/reading/booklist-page-1.webp";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import { GrowthTrace } from "@/components/GrowthTrace";
import { NatureOrnament } from "@/components/NatureOrnament";
import ReadingBreadcrumbs from "@/components/ReadingBreadcrumbs";
import {
  formatReadingDate,
  readingActivities,
  readingBooks,
  readingResources,
} from "@/lib/reading";
import { gradeBandLabels, gradeBands } from "@/lib/reading-types";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/site";
import styles from "./page.module.css";

const pdfDownloadPath =
  "/downloads/shuangbai-primary-school-graded-reading-list.pdf";

export const metadata = createPageMetadata({
  title: "阅读共建",
  description:
    "按年级浏览云启青禾分级阅读书单，寻找合法阅读资源，并了解双柏相关阅读行动。",
  path: "/reading/",
});

const gradePreviews = gradeBands.map((gradeBand) => {
  const books = readingBooks.filter((book) => book.gradeBand === gradeBand);

  return {
    gradeBand,
    label: gradeBandLabels[gradeBand],
    count: books.length,
    books: books.slice(0, 2),
  };
});

const resourcePreviews = readingResources
  .filter((resource) => resource.status === "active")
  .slice(0, 2);
const latestActivity = readingActivities.find(
  (activity) => activity.status === "active",
);

export default function ReadingPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "阅读共建", path: "/reading/" },
  ]);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <ReadingBreadcrumbs />

      <section className={styles.hero} aria-labelledby="reading-title">
        <div className={styles.heroCopy}>
          <p className={headingStyles.eyebrow}>阅读共建</p>
          <DisplayHeading
            as="h1"
            id="reading-title"
            variant="pageHero"
            lines={[
              { before: "从一本书出发，" },
              { before: "让", accent: "阅读", after: "有路可循" },
            ]}
          />
          <p className={styles.lede}>
            按年级选书，连接合法阅读资源，看见双柏正在发生的阅读行动。
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/reading/books/">
              按年级找书
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
            <Link
              className={styles.secondaryAction}
              href={pdfDownloadPath}
              download
              prefetch={false}
            >
              <DownloadSimple size={18} weight="bold" aria-hidden="true" />
              下载完整书单
            </Link>
          </div>
          <div className={styles.heroRoute} aria-hidden="true">
            <GrowthTrace
              variant="turn"
              reveal
              className={styles.heroTrace}
            />
            <NatureOrnament
              variant="sprig"
              className={styles.heroSprig}
            />
          </div>
        </div>

        <figure className={styles.preview}>
          <div className={styles.previewPaper}>
            <Image
              src={booklistPreview}
              alt="云南省双柏县乡村小学分级阅读书单第一页预览"
              sizes="(max-width: 767px) min(82vw, 27rem), (max-width: 880px) min(66vw, 28rem), 34vw"
              placeholder="blur"
              preload
            />
          </div>
          <figcaption>
            团队调研成果
            <span>{readingBooks.length} 条书目</span>
          </figcaption>
        </figure>
      </section>

      <section className={styles.paths} aria-labelledby="reading-paths-title">
        <div className={styles.sectionIntro}>
          <p className={headingStyles.eyebrow}>从这里开始</p>
          <h2 id="reading-paths-title" className={headingStyles.sectionTitle}>
            选书、找入口、看见行动
          </h2>
        </div>

        <div className={styles.pathGrid}>
          <GrowthTrace variant="spine" className={styles.mobileTrace} />
          <Link
            className={styles.bookPath}
            href="/reading/books/"
            aria-labelledby="reading-books-path-title"
          >
            <GrowthTrace variant="branch" className={styles.entryStem} />
            <div className={styles.pathHeading}>
              <span className={styles.pathIcon} aria-hidden="true">
                <Books size={28} weight="regular" />
              </span>
              <p className={styles.pathLabel}>团队原创分级书单</p>
              <span className={styles.pathNode} aria-hidden="true">
                <NatureOrnament
                  variant="bookLeaf"
                  className={styles.bookPathOrnament}
                />
              </span>
            </div>
            <div className={styles.pathCopy}>
              <h3 id="reading-books-path-title">
                先按年级，找到下一本适合读的书
              </h3>
              <p>
                将 PDF 中的完整书目转为可搜索、可筛选、可打印的网页内容，不额外补造封面或图书信息。
              </p>
            </div>
            <div className={styles.gradePapers}>
              {gradePreviews.map(({ gradeBand, label, count, books }) => (
                <section
                  className={styles.gradePaper}
                  key={gradeBand}
                  aria-labelledby={`reading-preview-${gradeBand}`}
                >
                  <div className={styles.paperHeading}>
                    <h4 id={`reading-preview-${gradeBand}`}>{label}</h4>
                    <span>{count} 条</span>
                  </div>
                  <ol aria-label={`${label}原书单前两条书目`}>
                    {books.map((book) => (
                      <li key={book.id}>《{book.title}》</li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
            <span className={styles.pathAction}>
              浏览完整书单
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </span>
          </Link>

          <div className={styles.pathJunction} aria-hidden="true">
            <GrowthTrace
              variant="turn"
              reveal
              className={styles.upperBranch}
            />
            <GrowthTrace
              variant="turn"
              reveal
              className={styles.lowerBranch}
            />
          </div>

          <div className={styles.secondaryPaths}>
            <Link
              className={styles.secondaryPath}
              href="/reading/resources/"
              aria-labelledby="reading-resources-path-title"
            >
              <GrowthTrace variant="branch" className={styles.entryStem} />
              <div className={styles.pathHeading}>
                <span className={styles.smallIcon} aria-hidden="true">
                  <GlobeHemisphereWest size={23} weight="regular" />
                </span>
                <p className={styles.pathLabel}>合法阅读资源</p>
                <span className={styles.pathNode} aria-hidden="true">
                  <NatureOrnament
                    variant="leafSeal"
                    className={styles.resourceOrnament}
                  />
                </span>
              </div>
              <div className={styles.secondaryCopy}>
                <h3 id="reading-resources-path-title">去可信的地方读</h3>
                <p>精选公共图书馆与官方文化机构的阅读入口。</p>
              </div>
              {resourcePreviews.length > 0 && (
                <ul className={styles.resourcePreview} aria-label="阅读资源节选">
                  {resourcePreviews.map((resource) => (
                    <li key={resource.id}>{resource.name}</li>
                  ))}
                </ul>
              )}
              <span className={styles.secondaryArrow} aria-hidden="true">
                <ArrowRight size={20} weight="bold" />
              </span>
            </Link>

            <Link
              className={styles.secondaryPath}
              href="/reading/activities/"
              aria-labelledby="reading-activities-path-title"
            >
              <GrowthTrace variant="branch" className={styles.entryStem} />
              <div className={styles.pathHeading}>
                <span className={styles.smallIcon} aria-hidden="true">
                  <CalendarDots size={23} weight="regular" />
                </span>
                <p className={styles.pathLabel}>双柏相关阅读活动</p>
                <span className={styles.pathNode} aria-hidden="true">
                  <NatureOrnament
                    variant="sprig"
                    className={styles.activityOrnament}
                  />
                </span>
              </div>
              <div className={styles.secondaryCopy}>
                <h3 id="reading-activities-path-title">阅读正在当地发生</h3>
                <p>从官方原始报道中整理近期活动与行动线索。</p>
              </div>
              {latestActivity && (
                <div className={styles.activityPreview}>
                  <time dateTime={latestActivity.publishedOn}>
                    {formatReadingDate(latestActivity.publishedOn)}
                  </time>
                  <p>{latestActivity.title}</p>
                </div>
              )}
              <span className={styles.secondaryArrow} aria-hidden="true">
                <ArrowRight size={20} weight="bold" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
