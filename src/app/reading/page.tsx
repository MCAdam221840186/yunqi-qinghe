import {
  ArrowRight,
  Books,
  CalendarDots,
  DownloadSimple,
  GlobeHemisphereWest,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import booklistPreview from "@/assets/reading/booklist-page-1.webp";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import ReadingBreadcrumbs from "@/components/ReadingBreadcrumbs";
import { readingBooks } from "@/lib/reading";
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

const gradeCounts = gradeBands.map((gradeBand) => ({
  gradeBand,
  label: gradeBandLabels[gradeBand],
  count: readingBooks.filter((book) => book.gradeBand === gradeBand).length,
}));

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
        </div>

        <figure className={styles.preview}>
          <div className={styles.previewPaper}>
            <Image
              src={booklistPreview}
              alt="云南省双柏县乡村小学分级阅读书单第一页预览"
              sizes="(max-width: 880px) min(76vw, 32rem), 34vw"
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
          <Link className={styles.bookPath} href="/reading/books/">
            <span className={styles.pathIcon} aria-hidden="true">
              <Books size={30} weight="regular" />
            </span>
            <div className={styles.pathCopy}>
              <p className={styles.pathLabel}>团队原创分级书单</p>
              <h3>先按年级，找到下一本适合读的书</h3>
              <p>
                将 PDF 中的完整书目转为可搜索、可筛选、可打印的网页内容，不额外补造封面或图书信息。
              </p>
            </div>
            <dl className={styles.gradeCounts}>
              {gradeCounts.map(({ gradeBand, label, count }) => (
                <div key={gradeBand}>
                  <dt>{label}</dt>
                  <dd>{count} 条</dd>
                </div>
              ))}
            </dl>
            <span className={styles.pathAction}>
              浏览完整书单
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </span>
          </Link>

          <div className={styles.secondaryPaths}>
            <Link className={styles.secondaryPath} href="/reading/resources/">
              <span className={styles.smallIcon} aria-hidden="true">
                <GlobeHemisphereWest size={24} weight="regular" />
              </span>
              <div>
                <p className={styles.pathLabel}>合法阅读资源</p>
                <h3>去可信的地方读</h3>
                <p>精选公共图书馆与官方文化机构的阅读入口。</p>
              </div>
              <ArrowRight
                className={styles.cornerArrow}
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </Link>

            <Link className={styles.secondaryPath} href="/reading/activities/">
              <span className={styles.smallIcon} aria-hidden="true">
                <CalendarDots size={24} weight="regular" />
              </span>
              <div>
                <p className={styles.pathLabel}>双柏相关阅读活动</p>
                <h3>阅读正在当地发生</h3>
                <p>从官方原始报道中整理近期活动与行动线索。</p>
              </div>
              <ArrowRight
                className={styles.cornerArrow}
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      <aside className={styles.rightsNote} aria-label="版权与隐私说明">
        <ShieldCheck size={25} weight="regular" aria-hidden="true" />
        <div>
          <h2>清楚标明内容边界</h2>
          <p>
            本站不上传受版权保护的图书全文，也不采集学生身份、阅读行为或设备数据。外部资源均保留原始机构入口与核验日期。
          </p>
        </div>
      </aside>
    </div>
  );
}
