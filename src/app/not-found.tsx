import { ArrowLeft, BookOpenText, Plant } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import DisplayHeading from "@/components/DisplayHeading";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "页面未找到",
  description: "你访问的页面不存在，或者已经移动。",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <section className={styles.content} aria-labelledby="not-found-title">
        <div className={styles.graphic} aria-hidden="true">
          <span>404</span>
          <Plant className={styles.plant} size={58} weight="regular" />
        </div>

        <div className={styles.copy}>
          <DisplayHeading
            as="h1"
            id="not-found-title"
            variant="statement"
            lines={[
              { before: "这一页", tone: "muted" },
              { before: "还没有", accent: "长出来", tone: "primary" },
            ]}
          />
          <p>你访问的页面不存在，试试回到首页，或继续浏览成长日志。</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/">
              <ArrowLeft size={18} weight="regular" aria-hidden="true" />
              返回首页
            </Link>
            <Link className={styles.secondary} href="/diaries">
              <BookOpenText size={18} weight="regular" aria-hidden="true" />
              浏览成长日志
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
