import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import styles from "./AppShell.module.css";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">
        跳到主要内容
      </a>
      <SiteHeader />
      <main className={styles.main} id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
