import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import type {
  ChildRecord,
  DiaryRecord,
  StructuredDiaryFields,
} from "@/lib/content";
import displayHeadingStyles from "@/components/DisplayHeading.module.css";
import styles from "./page.module.css";

const chineseDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

const structuredFields: ReadonlyArray<{
  key: keyof StructuredDiaryFields;
  label: string;
}> = [
  { key: "learned", label: "今天我学会了" },
  { key: "happiest", label: "今天我最开心的事情" },
  { key: "message", label: "我想对明天的自己说" },
  { key: "comment", label: "老师评语" },
];

type AdjacentDiaries = {
  readonly previous: DiaryRecord | undefined;
  readonly next: DiaryRecord | undefined;
};

function StructuredDiary({ fields }: { fields: StructuredDiaryFields }) {
  const sections = structuredFields.filter((field) => fields[field.key]);

  if (sections.length === 0) {
    return <p className={styles.emptyBody}>暂无正文内容。</p>;
  }

  return (
    <div className={styles.structuredBody}>
      {sections.map((field) => (
        <section key={field.key} className={styles.structuredSection}>
          <h2 className={displayHeadingStyles.utilityTitle}>{field.label}</h2>
          <p>{fields[field.key]}</p>
        </section>
      ))}
    </div>
  );
}

function AdjacentLink({
  diary,
  label,
  direction,
}: {
  diary: DiaryRecord;
  label: string;
  direction: "previous" | "next";
}) {
  return (
    <Link
      href={`/diaries/${diary.slug}`}
      className={styles.adjacentLink}
      data-direction={direction}
    >
      <span>{label}</span>
      <strong className={displayHeadingStyles.utilityTitle}>
        {diary.title}
      </strong>
    </Link>
  );
}

export default function DiaryDetailView({
  diary,
  child,
  adjacent,
}: {
  diary: DiaryRecord;
  child: ChildRecord;
  adjacent: AdjacentDiaries;
}) {
  const hasAdjacentDiary = Boolean(adjacent.previous || adjacent.next);

  return (
    <div className={styles.page}>
      <Link href={`/children/${child.slug}`} className={styles.backLink}>
        <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" />
        返回{child.displayName}的成长册
      </Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <p className={displayHeadingStyles.eyebrow}>成长日记</p>
          <h1 className={displayHeadingStyles.contentHero}>{diary.title}</h1>
          <div className={styles.meta}>
            <Link href={`/children/${child.slug}`}>{child.displayName}</Link>
            <time dateTime={diary.date}>
              {chineseDateFormatter.format(new Date(diary.date))}
            </time>
          </div>
        </header>

        <div className={styles.body}>
          {diary.kind === "plain" ? (
            <p className={styles.plainBody}>{diary.body || "暂无正文内容。"}</p>
          ) : (
            <StructuredDiary fields={diary.fields} />
          )}
        </div>
      </article>

      {hasAdjacentDiary && (
        <nav className={styles.adjacentNav} aria-label="同一成长册的相邻日记">
          {adjacent.previous ? (
            <AdjacentLink
              diary={adjacent.previous}
              label="上一篇"
              direction="previous"
            />
          ) : null}
          {adjacent.next && (
            <AdjacentLink
              diary={adjacent.next}
              label="下一篇"
              direction="next"
            />
          )}
        </nav>
      )}
    </div>
  );
}
