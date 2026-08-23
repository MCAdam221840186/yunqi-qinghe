import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react/ssr";
import displayHeadingStyles from "@/components/DisplayHeading.module.css";
import {
  getGrowthCardAsset,
  getGrowthCardImageAlt,
  type AdjacentDiaries,
  type ChildRecord,
  type DiaryRecord,
  type StructuredDiaryFields,
} from "@/lib/content";
import styles from "./page.module.css";

const structuredFields: ReadonlyArray<{
  key: keyof StructuredDiaryFields;
  label: string;
}> = [
  { key: "learned", label: "今天我学会了" },
  { key: "happiest", label: "今天我最开心的事情" },
  { key: "message", label: "我想对明天的自己说" },
  { key: "comment", label: "老师评语" },
];

function StructuredDiary({ fields }: { fields: StructuredDiaryFields }) {
  const sections = structuredFields.filter((field) => fields[field.key]);

  if (sections.length === 0) {
    return <p className={styles.emptyBody}>原卡这一页没有可转写的正文。</p>;
  }

  return (
    <div className={styles.structuredBody}>
      {sections.map((field) => (
        <section key={field.key} className={styles.structuredSection}>
          <div>
            <h3 className={displayHeadingStyles.utilityTitle}>{field.label}</h3>
            <p>{fields[field.key]}</p>
          </div>
        </section>
      ))}
    </div>
  );
}

function PlainDiary({ body }: { body: string }) {
  const paragraphs = body
    .split(/\n\s*\n/gu)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return <p className={styles.emptyBody}>原卡这一页没有可转写的正文。</p>;
  }

  return (
    <div className={styles.plainBody}>
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 16)}`}>{paragraph}</p>
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
      href={`/diaries/${diary.slug}/`}
      className={styles.adjacentLink}
      data-direction={direction}
    >
      <span>{label}</span>
      <strong className={displayHeadingStyles.utilityTitle}>
        {diary.title}
      </strong>
      <small>{diary.dateLabel}</small>
      <ArrowRightIcon size={18} weight="regular" aria-hidden="true" />
    </Link>
  );
}

function OriginalDate({ diary }: { diary: DiaryRecord }) {
  const date = diary.recordedOn ? (
    <time dateTime={diary.recordedOn}>{diary.dateLabel}</time>
  ) : (
    <span>{diary.dateLabel}</span>
  );

  if (diary.dateConfidence === "exact") return date;

  return (
    <span className={styles.dateWithNote}>
      {date}
      <small>
        {diary.dateConfidence === "uncertain"
          ? "原卡日期存在疑问，按原样保留"
          : "原卡未填写日期"}
      </small>
    </span>
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
  const asset = getGrowthCardAsset(diary.imageId);
  const hasAdjacentDiary = Boolean(adjacent.previous || adjacent.next);

  return (
    <div className={styles.page}>
      <Link href={`/children/${child.slug}/`} className={styles.backLink}>
        <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" />
        返回{child.displayName}的成长记录
      </Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <p className={displayHeadingStyles.eyebrow}>原卡与核对转写</p>
          <h1 className={displayHeadingStyles.contentHero}>{diary.title}</h1>

          <dl className={styles.meta}>
            <div>
              <dt>记录者</dt>
              <dd>
                <Link href={`/children/${child.slug}/`}>
                  {child.displayName}
                </Link>
              </dd>
            </div>
            <div>
              <dt>班级</dt>
              <dd>{child.className}</dd>
            </div>
            <div>
              <dt>原始日期</dt>
              <dd>
                <OriginalDate diary={diary} />
              </dd>
            </div>
          </dl>

          <ul className={styles.themes} aria-label="内容主题">
            {diary.themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
        </header>

        <div className={styles.comparison}>
          <figure className={styles.scan}>
            <div className={styles.scanImage}>
              <Image
                src={asset.full}
                alt={getGrowthCardImageAlt(child.displayName, diary)}
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1100px) 48vw, 34rem"
                preload
              />
            </div>
            <figcaption>
              <span>原卡扫描</span>
              <small>保留彩色笔迹与原始版面</small>
            </figcaption>
          </figure>

          <section className={styles.transcription} aria-labelledby="transcription-title">
            <div className={styles.transcriptionHeading}>
              <div>
                <p>文字版本</p>
                <h2 id="transcription-title">人工核对转写</h2>
              </div>
              <CheckCircleIcon size={25} weight="regular" aria-hidden="true" />
            </div>

            <div className={styles.body}>
              {diary.kind === "plain" ? (
                <PlainDiary body={diary.body} />
              ) : (
                <StructuredDiary fields={diary.fields} />
              )}
            </div>

            {diary.transcriptionNotes.length > 0 ? (
              <aside
                className={styles.reviewNotes}
                aria-labelledby="transcription-notes-title"
              >
                <h3 id="transcription-notes-title">核对说明</h3>
                <ul>
                  {diary.transcriptionNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </aside>
            ) : null}

            <p className={styles.transcriptionNote}>
              转写用于清晰阅读，内容与署名以原卡为准。
            </p>
          </section>
        </div>
      </article>

      {hasAdjacentDiary && (
        <nav className={styles.adjacentNav} aria-label="同一孩子的相邻成长记录">
          {adjacent.previous ? (
            <AdjacentLink
              diary={adjacent.previous}
              label="上一篇"
              direction="previous"
            />
          ) : null}
          {adjacent.next ? (
            <AdjacentLink
              diary={adjacent.next}
              label="下一篇"
              direction="next"
            />
          ) : null}
        </nav>
      )}
    </div>
  );
}
