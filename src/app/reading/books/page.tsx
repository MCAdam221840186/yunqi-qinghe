import { DownloadSimple, FilePdf, Printer } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import DisplayHeading from "@/components/DisplayHeading";
import headingStyles from "@/components/DisplayHeading.module.css";
import { NatureOrnament } from "@/components/NatureOrnament";
import ReadingBreadcrumbs from "@/components/ReadingBreadcrumbs";
import { readingBooks } from "@/lib/reading";
import { gradeBandLabels, gradeBands } from "@/lib/reading-types";
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/site";
import ReadingCatalogExplorer from "./ReadingCatalogExplorer";
import styles from "./page.module.css";

const pdfDownloadPath =
  "/downloads/shuangbai-primary-school-graded-reading-list.pdf";

export const metadata = createPageMetadata({
  title: "分级阅读书单",
  description:
    "按年级段、类别和关键词浏览云南省双柏县乡村小学分级阅读书单，并下载团队成果 PDF。",
  path: "/reading/books/",
});

const gradeCounts = gradeBands.map((gradeBand) => ({
  gradeBand,
  label: gradeBandLabels[gradeBand],
  count: readingBooks.filter((book) => book.gradeBand === gradeBand).length,
}));

export default function ReadingBooksPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "阅读共建", path: "/reading/" },
    { name: "分级阅读书单", path: "/reading/books/" },
  ]);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      <ReadingBreadcrumbs current="分级阅读书单" />

      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <p className={headingStyles.eyebrow}>团队调研成果</p>
          <DisplayHeading
            as="h1"
            variant="pageHero"
            lines={[
              { before: "一份书单，" },
              { before: "陪伴", accent: "三段成长" },
            ]}
          />
          <p>
            书目按原 PDF 的年级段、类别和顺序完整呈现。你可以搜索书名与署名，也可以组合筛选后打印当前页面。
          </p>
        </div>

        <aside className={styles.summary} aria-label="书单摘要">
          <div className={styles.summaryHeading}>
            <FilePdf size={25} weight="regular" aria-hidden="true" />
            <div>
              <p>云南省双柏县乡村小学分级阅读书单</p>
              <strong>{readingBooks.length} 条书目</strong>
            </div>
          </div>
          <dl>
            {gradeCounts.map(({ gradeBand, label, count }) => (
              <div key={gradeBand}>
                <dt>{label}</dt>
                <dd>{count}</dd>
              </div>
            ))}
          </dl>
          <Link
            className={styles.downloadLink}
            href={pdfDownloadPath}
            download
            prefetch={false}
          >
            <DownloadSimple size={18} weight="bold" aria-hidden="true" />
            下载完整 PDF
          </Link>
          <p className={styles.printHint}>
            <Printer size={16} weight="regular" aria-hidden="true" />
            浏览器打印可保留当前筛选结果
          </p>
          <NatureOrnament
            variant="bookLeaf"
            className={styles.summaryOrnament}
          />
        </aside>
      </header>

      <ReadingCatalogExplorer books={readingBooks} />

      <aside className={styles.sourceNote} aria-labelledby="source-note-title">
        <h2 id="source-note-title">关于这份书单</h2>
        <p>
          书单由南京大学“云启青禾”支教团结合双柏县鄂嘉镇彝族山区调研整理，参考“快乐读书吧”与教育部基础教育课程教材发展中心《中小学生阅读指导目录（2020年版）》，并关注民族特色读物。
        </p>
        <p>
          网页没有擅自补充封面、ISBN、出版社或简介。PDF 未设置完整文档结构，因此本站优先提供可搜索、可复制的语义化网页版本。
        </p>
      </aside>
    </div>
  );
}
