import { ArrowLeft, BookOpenText, Plant } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
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
        <span className={styles.icon} aria-hidden="true">
          <Plant size={30} weight="regular" />
        </span>
        <h1 id="not-found-title">这一页还没有长出来</h1>
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
      </section>
    </div>
  );
}
