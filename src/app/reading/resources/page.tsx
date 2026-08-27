import {
  ArrowSquareOut,
  GlobeHemisphereWest,
  IdentificationCard,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import ReadingBreadcrumbs from "@/components/ReadingBreadcrumbs";
import { formatReadingDate, readingResources } from "@/lib/reading";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/site";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "合法阅读资源",
  description:
    "浏览经核验的公共图书馆、官方文化机构与版权状态明确的合法阅读服务入口。",
  path: "/reading/resources/",
});

const activeResources = readingResources.filter(
  (resource) => resource.status === "active",
);

export default function ReadingResourcesPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "阅读共建", path: "/reading/" },
    { name: "合法阅读资源", path: "/reading/resources/" },
  ]);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <ReadingBreadcrumbs current="合法阅读资源" />

      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={headingStyles.eyebrow}>合法阅读资源</p>
          <DisplayHeading
            as="h1"
            variant="pageHero"
            lines={[
              { before: "去可信的地方，" },
              { before: "安心", accent: "打开一本书" },
            ]}
          />
          <p>
            这里仅收录公共图书馆、官方文化机构或版权状态明确的平台。每个入口都标明服务方式与访问条件，方便学生、教师和公益关注者判断是否适合自己。
          </p>
        </div>

        <aside className={styles.criteria} aria-labelledby="criteria-title">
          <ShieldCheck size={25} weight="regular" aria-hidden="true" />
          <div>
            <h2 id="criteria-title">我们的收录边界</h2>
            <p>
              不收录广告密集、来源不明，或要求未成年人提供不必要个人信息的网站。外部平台的注册与使用规则以其官方说明为准。
            </p>
          </div>
        </aside>
      </header>

      <section className={styles.directory} aria-labelledby="directory-title">
        <div className={styles.directoryHeading}>
          <div>
            <p className={headingStyles.eyebrow}>已核验入口</p>
            <h2 id="directory-title" className={headingStyles.sectionTitle}>
              精选阅读服务
            </h2>
          </div>
          <p>当前收录 {activeResources.length} 个入口</p>
        </div>

        {activeResources.length === 0 ? (
          <div className={styles.empty}>
            <h3>资源正在核验中</h3>
            <p>确认机构归属、版权状态与访问条件后，入口会出现在这里。</p>
          </div>
        ) : (
          <ul className={styles.resourceGrid}>
            {activeResources.map((resource) => (
              <li key={resource.id}>
                <article className={styles.resourceCard}>
                  <div className={styles.cardTopline}>
                    <span className={styles.kind}>
                      <GlobeHemisphereWest
                        size={17}
                        weight="regular"
                        aria-hidden="true"
                      />
                      {resource.kind}
                    </span>
                    <span className={styles.checked}>
                      核验于 {formatReadingDate(resource.lastCheckedOn)}
                    </span>
                  </div>

                  <h3>{resource.name}</h3>
                  <p className={styles.summary}>{resource.summary}</p>

                  <ul className={styles.modes} aria-label="服务方式与适用对象">
                    {resource.serviceModes.map((mode) => (
                      <li key={mode}>{mode}</li>
                    ))}
                  </ul>

                  <div className={styles.accessNote}>
                    <IdentificationCard
                      size={19}
                      weight="regular"
                      aria-hidden="true"
                    />
                    <div>
                      <strong>访问说明</strong>
                      <p>{resource.accessNote}</p>
                    </div>
                  </div>

                  <a
                    className={styles.externalLink}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`访问${resource.name}官方网站，在新窗口打开`}
                  >
                    访问官方网站（新窗口）
                    <ArrowSquareOut
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </a>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
