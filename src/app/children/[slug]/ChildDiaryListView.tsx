import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/ssr";
import {
  getDiaryPreview,
  type ChildRecord,
  type DiaryRecord,
} from "@/lib/content";
import styles from "./page.module.css";

const fullDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Shanghai",
});

const compactDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Shanghai",
});

type DateRange =
  | {
      readonly earliest: string;
      readonly latest: string;
    }
  | undefined;

function getInitial(displayName: string): string {
  return displayName.match(/[A-Z]$/)?.[0] ?? displayName.slice(-1);
}

function formatDateRange(dateRange: DateRange): string {
  if (!dateRange) return "等待第一篇记录";
  const earliest = compactDateFormatter.format(new Date(dateRange.earliest));
  const latest = compactDateFormatter.format(new Date(dateRange.latest));
  return earliest === latest ? earliest : `${earliest} 至 ${latest}`;
}

export default function ChildDiaryListView({
  child,
  diaries,
  dateRange,
}: {
  child: ChildRecord;
  diaries: readonly DiaryRecord[];
  dateRange: DateRange;
}) {
  return (
    <div className={styles.page}>
      <Link href="/diaries" className={styles.backLink}>
        <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" />
        返回成长日志
      </Link>

      <div className={styles.layout}>
        <header className={styles.identity}>
          <span className={styles.monogram} aria-hidden="true">
            {getInitial(child.displayName)}
          </span>
          <p className={styles.kicker}>匿名成长册</p>
          <h1>{child.displayName}</h1>
          <p className={styles.identityNote}>持续记录真实而具体的成长片段。</p>

          <dl className={styles.facts}>
            <div>
              <dt>记录数量</dt>
              <dd>{diaries.length} 篇</dd>
            </div>
            <div>
              <dt>记录时间</dt>
              <dd>{formatDateRange(dateRange)}</dd>
            </div>
          </dl>
        </header>

        <section className={styles.entries} aria-labelledby="entries-title">
          <div className={styles.entriesHeading}>
            <h2 id="entries-title">日记目录</h2>
            <span>{diaries.length} 篇记录</span>
          </div>

          {diaries.length === 0 ? (
            <div className={styles.empty}>
              <h3>第一篇日记还在路上</h3>
              <p>完成记录后，它会出现在这里。</p>
            </div>
          ) : (
            <ol className={styles.diaryList}>
              {diaries.map((diary) => (
                <li key={diary.slug}>
                  <Link
                    href={`/diaries/${diary.slug}`}
                    className={styles.diaryLink}
                  >
                    <time dateTime={diary.date}>
                      {fullDateFormatter.format(new Date(diary.date))}
                    </time>
                    <span className={styles.diaryCopy}>
                      <strong>{diary.title}</strong>
                      <span>{getDiaryPreview(diary, 96)}</span>
                    </span>
                    <span className={styles.arrow} aria-hidden="true">
                      <ArrowRightIcon size={20} weight="regular" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}
