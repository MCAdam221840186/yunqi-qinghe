import { CaretRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import styles from "./ReadingBreadcrumbs.module.css";

interface ReadingBreadcrumbsProps {
  readonly current?: string;
}

export default function ReadingBreadcrumbs({
  current,
}: ReadingBreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label="面包屑导航">
      <ol>
        <li>
          <Link href="/">首页</Link>
        </li>
        {current ? (
          <>
            <li aria-hidden="true">
              <CaretRight size={14} weight="bold" />
            </li>
            <li>
              <Link href="/reading/">阅读共建</Link>
            </li>
            <li aria-hidden="true">
              <CaretRight size={14} weight="bold" />
            </li>
            <li aria-current="page">{current}</li>
          </>
        ) : (
          <>
            <li aria-hidden="true">
              <CaretRight size={14} weight="bold" />
            </li>
            <li aria-current="page">阅读共建</li>
          </>
        )}
      </ol>
    </nav>
  );
}
